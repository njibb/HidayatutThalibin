/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/sync-single/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb'; // Ganti dari clientPromise ke dbConnect Mongoose
import mongoose from 'mongoose';

function chunkText(text: string, maxLength: number = 400): string[] {
  if (!text) return [];
  const chunks: string[] = [];
  let index = 0;
  while (index < text.length) {
    chunks.push(text.slice(index, index + maxLength));
    index += maxLength;
  }
  return chunks;
}

function generateEmbedding(text: string): number[] {
  const vector = new Array(384).fill(0);
  if (!text) return vector;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const index = i % 384;
    vector[index] += charCode / 255.0;
  }
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return magnitude === 0 ? vector : vector.map(val => val / magnitude);
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const secretKey = process.env.ADMIN_SYNC_SECRET;
    
    if (secretKey && authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Invalid Token' }, { status: 401 });
    }

    const body = await request.json();
    const { action, collectionName, data } = body; 

    const docId = data?._id || data?.identifier;
    if (!data || !docId) {
      return NextResponse.json({ success: false, message: 'Invalid payload: missing identifier/_id' }, { status: 400 });
    }

    // 1. Hubungkan database menggunakan dbConnect Mongoose
    await dbConnect();
    
    // 2. Akses koleksi langsung via mongoose.connection.db
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const knowledgeCollection = db.collection('knowledge_bases');

    if (action === 'DELETE') {
      await knowledgeCollection.deleteMany({ identifier: String(docId) });
      return NextResponse.json({ success: true, message: 'Knowledge chunks deleted successfully' });
    }

    // 3. Bersihkan chunk lama berdasarkan identifier agar tidak duplikat
    await knowledgeCollection.deleteMany({ identifier: String(docId) });

    // 4. Gabungkan teks penting
    const rawText = `Kategori: ${collectionName}\nJudul/Nama: ${data.title || data.name || ''}\nIsi: ${data.content || data.description || ''}`;
    
    // 5. Lakukan Chunking & Embedding
    const textChunks = chunkText(rawText, 400);
    const bulkOperations = [];

    for (let i = 0; i < textChunks.length; i++) {
      const chunk = textChunks[i];
      const embedding = generateEmbedding(chunk);

      bulkOperations.push({
        insertOne: {
          document: {
            identifier: String(docId),
            title: data.title || data.name || '',
            content: chunk,
            source: 'admin-sync-single',
            collectionSource: collectionName,
            chunkIndex: i,
            embedding: embedding,
            updatedAt: new Date(),
          }
        }
      });
    }

    if (bulkOperations.length > 0) {
      await knowledgeCollection.bulkWrite(bulkOperations);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully synced ${textChunks.length} chunks for ID: ${docId}` 
    });

  } catch (error: any) {
    console.error('Sync Single Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}