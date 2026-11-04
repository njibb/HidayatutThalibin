/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import { getSemanticEmbedding } from '../../lib/embedding';
import mongoose from 'mongoose';

const UNIT_CODES = ['tk', 'mi', 'mts', 'smk'];

// Fungsi Helper untuk memecah teks panjang menjadi beberapa chunk (Chunking Strategy)
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

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.db!;
    const knowledgeCollection = db.collection('knowledge_bases');

    // 1. Bersihkan data lama berdimensi 768 / un-chunked
    await knowledgeCollection.deleteMany({});

    let syncedCount = 0;
    const allDataToSync: Array<{ identifier: string; title: string; content: string }> = [];

    for (const unit of UNIT_CODES) {
      
      // A. Ambil & Petakan Data Struktur (Berdasarkan model/structure.js)
      try {
        const res = await fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/structure`, { cache: 'no-store' });
        const json = await res.json();
        const dataList = json.data || json.result || json;
        
        if (Array.isArray(dataList)) {
          dataList.forEach((item: any) => {
            const nama = item.nama || '-';
            const jabatan = item.jabatan || '-';
            const kategori = item.kategori || '-'; // pimpinan, komite, wakil_tu, walikelas

            // Buat teks kaya konteks agar pencarian semantik (Vector Search) sangat akurat
            const richContent = `Struktur Organisasi ${unit.toUpperCase()} Yayasan Hidayatut Thalibin. Nama: ${nama}. Jabatan: ${jabatan}. Kategori: ${kategori}. Unit Sekolah: ${unit.toUpperCase()}.`;

            allDataToSync.push({
              identifier: `structure-${unit}-${item._id}`,
              title: `${jabatan} ${unit.toUpperCase()} - ${nama}`,
              content: richContent
            });
          });
        }
      } catch (e) {
        console.warn(`Gagal ambil structure ${unit}:`, e);
      }

      // B. Ambil & Chunking Berita (Berdasarkan model/berita.js)
      try {
        const res = await fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/berita`, { cache: 'no-store' });
        const json = await res.json();
        const list = json.data || json.result || json;
        if (Array.isArray(list)) {
          list.forEach((item: any) => {
            const id = item._id || item.id;
            const title = item.title || item.judul || 'Berita Yayasan';
            const content = item.content || item.isi || '';
            const fullText = `Berita ${unit.toUpperCase()}: ${title}\nIsi: ${content}`;

            // Terapkan Chunking per 400 karakter
            const textChunks = chunkText(fullText, 400);
            textChunks.forEach((chunk, idx) => {
              allDataToSync.push({
                identifier: `berita-${unit}-${id}-chunk-${idx}`,
                title: `${title} (${unit.toUpperCase()} - Bagian ${idx + 1})`,
                content: chunk
              });
            });
          });
        }
      } catch (e) {
        console.warn(`Gagal ambil berita ${unit}:`, e);
      }

      // C. Ambil & Chunking Agenda (Berdasarkan model/agenda.js)
      try {
        const res = await fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/agendas`, { cache: 'no-store' });
        const json = await res.json();
        const list = json.data || json.result || json;
        if (Array.isArray(list)) {
          list.forEach((item: any) => {
            const id = item._id || item.id;
            const title = item.title || 'Agenda';
            const kategori = item.kategori || 'lainnya';
            const desc = item.description || '-';
            const startDate = item.startDate ? new Date(item.startDate).toLocaleDateString('id-ID') : 'Belum ditentukan';
            
            const agendaText = `Agenda ${unit.toUpperCase()}: ${title}. Kategori: ${kategori}. Tanggal Mulai: ${startDate}. Deskripsi: ${desc}`;

            allDataToSync.push({
              identifier: `agenda-${unit}-${id}`,
              title: `${title} (${unit.toUpperCase()})`,
              content: agendaText
            });
          });
        }
      } catch (e) {
        console.warn(`Gagal ambil agenda ${unit}:`, e);
      }

      // D. Ambil & Chunking PPDB (Berdasarkan model/ppdb.js dengan jalurPendaftaran)
      try {
        const res = await fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/ppdb`, { cache: 'no-store' });
        const json = await res.json();
        const ppdbDocs = json.data || json.result || json;
        
        if (Array.isArray(ppdbDocs)) {
          ppdbDocs.forEach((ppdbItem: any, docIdx: number) => {
            let ppdbText = `Informasi Pendaftaran PPDB ${unit.toUpperCase()} Hidayatut Thalibin. Status Pendaftaran: ${ppdbItem.statusBuka ? 'Dibuka' : 'Ditutup'}.\n`;
            
            if (Array.isArray(ppdbItem.jalurPendaftaran)) {
              ppdbItem.jalurPendaftaran.forEach((jalur: any) => {
                ppdbText += `- Jalur ${jalur.namaJalur}: Biaya Formulir Rp ${jalur.biayaFormulir}, Biaya SPP Rp ${jalur.biayaSpp}, Uang Gedung Rp ${jalur.uangGedung}.\n`;
              });
            }

            const textChunks = chunkText(ppdbText, 400);
            textChunks.forEach((chunk, idx) => {
              allDataToSync.push({
                identifier: `ppdb-${unit}-${docIdx}-chunk-${idx}`,
                title: `PPDB ${unit.toUpperCase()} (Bagian ${idx + 1})`,
                content: chunk
              });
            });
          });
        }
      } catch (e) {
        console.warn(`Gagal ambil PPDB ${unit}:`, e);
      }
    }

    // 2. Masukkan semua dokumen kecil (chunks) ke database dengan Embedding 384 dimensi
    for (const item of allDataToSync) {
      if (!item.title || !item.content) continue;

      const textToEmbed = `Judul: ${item.title}\nIsi: ${item.content}`;
      const vector = await getSemanticEmbedding(textToEmbed);

      await knowledgeCollection.insertOne({
        identifier: item.identifier,
        title: item.title,
        content: item.content,
        source: 'admin-schema-sync',
        embedding: vector,
        updatedAt: new Date(),
      });
      syncedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Berhasil sinkronisasi ${syncedCount} data (Struktur, Berita, Agenda, PPDB sesuai Schema Admin) dengan Chunking & Embedding 384d!` 
    });

  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}