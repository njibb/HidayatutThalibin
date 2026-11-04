/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import { getSemanticEmbedding } from '../../lib/embedding';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    // Ambil pesan terakhir dari pengguna
    const latestMessage = messages[messages.length - 1]?.content;

    if (!latestMessage) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    // 1. Hubungkan ke database menggunakan Mongoose admin
    await dbConnect();
    const collection = mongoose.connection.db!.collection('knowledge_bases');

    // 2. Ubah pertanyaan user menjadi vektor 384 dimensi secara semantik
    const queryVector = await getSemanticEmbedding(latestMessage);

    // 3. Jalankan Atlas Vector Search (Limit dinaikkan agar potongan chunks tersapu maksimal)
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: queryVector,
          numCandidates: 100,
          limit: 8, // Naikkan ke 8 agar banyak potongan chunk relevan yang ikut tertarik
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          score: { $meta: 'vectorSearchScore' },
        },
      },
    ];

    const searchResults = await collection.aggregate(pipeline).toArray();

    // 4. Susun konteks pengetahuan untuk diumpankan ke AI dari hasil chunks
    const contextText = searchResults
      .map((doc: any) => `- ${doc.title}:\n${doc.content}`)
      .join('\n\n');

    // 5. Panggil Groq API (Model Qwen)
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY belum disetel di .env.local');
    }

    const systemPrompt = `Anda adalah A.B.I (Asisten Belajar Interaktif), asisten virtual resmi Yayasan Hidayatut Thalibin. 
Gunakan informasi konteks dari basis data yayasan berikut untuk menjawab pertanyaan pengguna dengan ramah, akurat, dan sopan. 

ATURAN PENULISAN JAWABAN:
- Jawablah dengan kalimat naratif, mengalir, dan berbentuk paragraf yang natural. 
- Jangan menggunakan daftar poin-poin (bullet points/tanda bintang) yang berlebihan kecuali jika benar-benar diminta atau berupa daftar benda/agenda.
- Sampaikan informasi dengan jelas dan langsung pada intinya.

Jika informasi tidak ada di konteks, jawablah secara wajar sebagai asisten yayasan.

KONTÉKS PENGETAHUAN:
${contextText}`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.8-27b', // Model Qwen yang sesuai dengan Groq Playground Anda
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ],
        stream: false,
      }),
    });

    if (!groqResponse.ok) {
      const errData = await groqResponse.text();
      throw new Error(`Groq API Error: ${errData}`);
    }

    const groqData = await groqResponse.json();
    const replyText = groqData.choices[0]?.message?.content || 'Maaf, saya tidak dapat menghasilkan jawaban saat ini.';

    // Kembalikan respons teks langsung
    return new NextResponse(replyText);

  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}