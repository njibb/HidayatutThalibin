/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Daftar semua unitcode yang ada di sistem admin
    const units = ['tk', 'mi', 'mts', 'smk'];
    let dynamicDataText = "";

    // Fetch data untuk SEMUA unit secara serentak
    await Promise.all(units.map(async (unit) => {
      try {
        const [resBerita, resAgenda, resPpdb, resStructure] = await Promise.all([
          fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/berita`, { cache: 'no-store' }),
          fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/agendas`, { cache: 'no-store' }),
          fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/ppdb`, { cache: 'no-store' }),
          fetch(`https://admin-hidatha.vercel.app/api/public/${unit}/structure`, { cache: 'no-store' })
        ]);

        let unitBerita = "Belum ada berita.";
        let unitAgenda = "Belum ada agenda.";
        let unitPpdb = "Data PPDB sedang diperbarui.";
        let unitStructure = "Data struktur belum tersedia.";

        if (resBerita.ok) {
          const data = await resBerita.json();
          if (data.status === 1 && data.data?.length > 0) {
            unitBerita = data.data.slice(0, 3).map((item: any) => `- ${item.judul}`).join('\n');
          }
        }
        if (resAgenda.ok) {
          const data = await resAgenda.json();
          if (data.status === 1 && data.data?.length > 0) {
            unitAgenda = data.data.slice(0, 3).map((item: any) => `- ${item.judul} (Tgl: ${item.tanggal})`).join('\n');
          }
        }
        if (resPpdb.ok) {
          const data = await resPpdb.json();
          if (data.status === 1 && data.data?.length > 0) {
            unitPpdb = data.data.map((item: any) => `- Jalur ${item.jalur || 'Umum'}: Biaya Rp ${item.biaya || 0}. Syarat: ${item.syarat || 'Cek di web.'}`).join('\n');
          }
        }
        if (resStructure.ok) {
          const data = await resStructure.json();
          if (data.status === 1 && data.data?.length > 0) {
            // Field disesuaikan dengan skema database admin
            unitStructure = data.data.map((item: any) => `- ${item.jabatanSpesifik || item.jabatan}: ${item.namaPengurus || item.nama}`).join('\n');
          }
        }

        // Gabungkan seluruh teks per unit ke dalam satu string besar
        dynamicDataText += `\n[DATA DINAMIS UNIT: ${unit.toUpperCase()}]\nStruktur Organisasi:\n${unitStructure}\n\nPPDB:\n${unitPpdb}\n\nAgenda:\n${unitAgenda}\n\nBerita:\n${unitBerita}\n`;
        
      } catch (err) {
        console.error(`Gagal mengambil data CMS untuk unit ${unit}:`, err);
      }
    }));

    const knowledgeBase = `
    === INFORMASI RESMI YAYASAN HIDAYATUT THALIBIN ===
    1. PROFIL UMUM:
       - Yayasan Hidayatut Thalibin adalah lembaga pendidikan Islam terpadu (TK, MI, MTs, SMK).
       - Alamat Pusat: Jl Cilandak Tengah III/53 RT.001/001 Cilandak Barat, Jakarta Selatan 12430.

    === REKAP DATA DINAMIS SELURUH UNIT (DARI DATABASE) ===
    ${dynamicDataText}
    `;

    const result = streamText({
      model: groq('qwen/qwen3.8-27b'),
      // @ts-expect-error: Mengabaikan peringatan tipe maxTokens
      maxTokens: 600,
      system: `Kamu adalah A.B.I (Asisten Belajar Interaktif), asisten AI resmi Yayasan Hidayatut Thalibin.
      
      SUMBER INFORMASI UTAMA:
      ${knowledgeBase}

      ATURAN FORMAT PENULISAN (PENTING!):
      1. JANGAN PERNAH menggunakan simbol Markdown seperti tanda pagar (#) atau tanda bintang (* / **) di dalam jawabanmu. Gunakan teks biasa dan baris baru (enter) agar rapi di layar chat.
      2. Jawablah dengan ringkas, padat, ramah, dan langsung pada intinya agar informasi cepat tersampaikan.

      PANDUAN ISI:
      - Jika user bertanya spesifik tentang unit tertentu (misal: "Siapa kepala SMK?"), cari jawabannya di bagian [DATA DINAMIS UNIT: SMK].
      - Tolak pertanyaan di luar konteks yayasan/sekolah dengan sopan. Jangan mengarang data.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error dari API Groq:", error);
    return new Response("Terjadi kesalahan internal server.", { status: 500 });
  }
}