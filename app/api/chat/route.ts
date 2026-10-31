/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Siapkan teks default jika database sedang kosong/error
    let beritaText = "Belum ada berita terbaru.";
    let agendaText = "Belum ada agenda terbaru.";
    let ppdbText = "Data PPDB sedang diperbarui.";
    let structureText = "Data struktur organisasi sedang diperbarui.";

    // 2. Fetch data langsung dari Admin CMS (Berita, Agenda, PPDB, Structure)
    try {
      // Catatan: Ini contoh mengambil data untuk MTs. Silakan tambah fetch untuk MI/SMK jika diperlukan.
      const [resBerita, resAgenda, resPpdb, resStructure] = await Promise.all([
        fetch('https://admin-hidatha.vercel.app/api/public/mts/berita', { cache: 'no-store' }),
        fetch('https://admin-hidatha.vercel.app/api/public/mts/agendas', { cache: 'no-store' }),
        fetch('https://admin-hidatha.vercel.app/api/public/mts/ppdb', { cache: 'no-store' }),
        fetch('https://admin-hidatha.vercel.app/api/public/mts/structure', { cache: 'no-store' })
      ]);

      if (resBerita.ok) {
        const dataBerita = await resBerita.json();
        if (dataBerita.data?.length > 0) {
          beritaText = dataBerita.data.slice(0, 3).map((item: any) => `- ${item.judul}`).join('\n');
        }
      }

      if (resAgenda.ok) {
        const dataAgenda = await resAgenda.json();
        if (dataAgenda.data?.length > 0) {
          agendaText = dataAgenda.data.slice(0, 3).map((item: any) => `- ${item.judul} (Tgl: ${item.tanggal})`).join('\n');
        }
      }

      if (resPpdb.ok) {
        const dataPpdb = await resPpdb.json();
        if (dataPpdb.data?.length > 0) {
          // Asumsi struktur JSON PPDB memiliki field 'jalur', 'biaya', 'syarat'
          ppdbText = dataPpdb.data.map((item: any) => `- Jalur ${item.jalur || 'Umum'}: Biaya Rp ${item.biaya || 0}. Syarat: ${item.syarat || 'Cek di web.'}`).join('\n');
        }
      }

      if (resStructure.ok) {
        const dataStructure = await resStructure.json();
        if (dataStructure.data?.length > 0) {
          // Asumsi struktur JSON Structure memiliki field 'jabatan' dan 'nama'
          structureText = dataStructure.data.map((item: any) => `- ${item.jabatan}: ${item.nama}`).join('\n');
        }
      }
    } catch (err) {
      console.error("Gagal mengambil data dinamis CMS:", err);
    }

    const knowledgeBase = `
    === INFORMASI RESMI YAYASAN HIDAYATUT THALIBIN ===
    1. PROFIL UMUM:
       - Yayasan Hidayatut Thalibin adalah lembaga pendidikan Islam terpadu (TK, MI, MTs, SMK).
       - Alamat Pusat: Jl Cilandak Tengah III/53 RT.001/001 Cilandak Barat, Jakarta Selatan 12430.

    === DATA DINAMIS (DARI DATABASE ADMIN CMS) ===
    
    [STRUKTUR ORGANISASI SEKOLAH]
    ${structureText}

    [INFORMASI PPDB (PENERIMAAN PESERTA DIDIK BARU)]
    ${ppdbText}

    [AGENDA SEKOLAH TERDEKAT]
    ${agendaText}

    [BERITA TERBARU]
    ${beritaText}
    `;

    const result = streamText({
      model: groq('qwen/qwen3.8-27b'),
      // @ts-expect-error: Mengabaikan peringatan tipe maxTokens yang belum diupdate di SDK
      maxTokens: 500,
      system: `Kamu adalah A.B.I (Asisten Belajar Interaktif), asisten AI resmi Yayasan Hidayatut Thalibin.
      
      SUMBER INFORMASI UTAMA:
      ${knowledgeBase}

      ATURAN FORMAT PENULISAN (PENTING!):
      1. JANGAN PERNAH menggunakan simbol Markdown seperti tanda pagar (#) atau tanda bintang (* / **) di dalam jawabanmu. Gunakan teks biasa dan baris baru (enter) agar rapi.
      2. Jawablah dengan ringkas, padat, ramah, dan langsung pada intinya agar informasi cepat tersampaikan dan hemat token.

      PANDUAN ISI:
      - Perkenalkan dirimu sebagai A.B.I jika ditanya.
      - Gunakan data di bagian [DATA DINAMIS] untuk menjawab pertanyaan seputar pengurus/guru, biaya/syarat PPDB, berita, dan agenda.
      - Tolak pertanyaan di luar konteks yayasan/sekolah dengan sopan. Jangan mengarang data.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error dari API Groq:", error);
    return new Response("Terjadi kesalahan internal server.", { status: 500 });
  }
}