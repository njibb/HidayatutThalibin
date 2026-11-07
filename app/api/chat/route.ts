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

    // 2. Ubah pertanyaan user menjadi vektor 384 dimensi
    const queryVector = await getSemanticEmbedding(latestMessage);

    // 3. Jalankan Atlas Vector Search
    const pipeline = [
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: queryVector,
          numCandidates: 100,
          limit: 8,
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

    // 4. PENGAMAN HYBRID (TRUE HYBRID BOOSTER): SELALU JALANKAN TANPA SYARAT IF
    const stopWords = ["siapa", "apa", "kapan", "dimana", "bagaimana", "berapa", "dan", "yang", "di", "ke", "dari", "untuk", "adalah"];
    const keywords = latestMessage.toLowerCase().replace(/[?.,]/g, '').split(" ")
      .filter((w: string) => w.length >= 2 && !stopWords.includes(w));
    
    if (keywords.length > 0) {
      // Gunakan $and agar dokumen yang ditarik harus mengandung SEMUA kata kunci pencarian
      const andConditions = keywords.map((kw: string) => ({
        $or: [
          { title: { $regex: kw, $options: 'i' } },
          { content: { $regex: kw, $options: 'i' } }
        ]
      }));

      const textResults = await collection.find({
        $and: andConditions
      }).limit(3).toArray();
      
      // Gabungkan hasil vector search dan text search secara unik
      const existingIds = new Set(searchResults.map((d: any) => d._id.toString()));
      for (const doc of textResults) {
        if (!existingIds.has((doc._id as any).toString())) {
          searchResults.push(doc); // Tambahkan dokumen pasti ke dalam konteks AI
        }
      }
    }

    // 5. Susun konteks pengetahuan untuk diumpankan ke AI dari hasil chunks
    const contextText = searchResults
      .map((doc: any) => `\n${doc.title}:\n${doc.content}`)
      .join('\n\n');

    // 6. Panggil Groq API (Model Qwen)
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
        model: 'qwen/qwen3.8-27b',
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

    return new NextResponse(replyText);

  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}