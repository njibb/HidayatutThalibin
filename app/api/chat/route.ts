import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const knowledgeBase = `
    === INFORMASI RESMI YAYASAN HIDAYATUT THALIBIN ===
    1. PROFIL UMUM:
       - Yayasan Hidayatut Thalibin adalah lembaga pendidikan Islam terpadu yang menyediakan layanan pendidikan dari tingkat TK, MI, MTs, hingga SMK.
       - Alamat Pusat: Jl Cilandak Tengah III/53 RT.001/001 Cilandak Barat, Jakarta Selatan 12430.

    === 2. INFORMASI SMK HIDATHA JAKARTA (BISNIS & MANAJEMEN) ===
    - VISI: Menjadikan SMK HIDATHA sebagai lembaga unggul dan religius untuk menghasilkan lulusan yang siap bersaing dan berkontribusi positif dalam dunia bisnis dan masyarakat.
    - PROGRAM KEAHLIAN: 1. Akuntansi dan Keuangan Lembaga. 2. Pemasaran. 3. Manajemen Perkantoran dan Layanan Bisnis.
    - FASILITAS SMK: Ruang Kelas AC, Lapangan Olahraga, Laboratorium Komputer, Perpustakaan, Aula Sekolah, Mushola, Bisnis Center, UKS.
    - SYARAT PENDAFTARAN SMK: Mengisi formulir, fotokopi Akta Kelahiran, KK, KTP orang tua, dan membayar biaya pendaftaran.
    - JADWAL PENDAFTARAN: Februari 2025 s/d Juli 2025 (Online atau Offline).
    - BIAYA PENDIDIKAN SMK (UANG PANGKAL): Uang Gedung Rp 1.725.000 + Seragam Rp 660.000 = Total Rp 2.385.000. Pembayaran dapat diangsur sebelum Agustus 2025. Dapatkan promo gratis Goodie Bag & Payung.
    - KONTAK SMK: Pak Kadavi (08994668054). IG/TikTok: @smkshidatha_official.

    === 3. INFORMASI MTS HIDAYATUT THOLIBIN ===
    - VISI: Terwujudnya murid yang beriman, berwawasan ilmu pengetahuan, dan berakhalaqul karimah.
    - FASILITAS MTS: Ruang kelas ber-AC, Musholla, Lapangan olahraga, Kantin sehat HALAL, Lab komputer, Aula serbaguna, Bisnis Center (BC).
    - EKSTRAKURIKULER MTS: Pramuka, Muhadharah, Hadroh, Tari Saman, Tahfidz, Paskibra.
    - SYARAT PENDAFTARAN MTS: Mengisi formulir, fotokopi KK, Akta Kelahiran, KTP orang tua, Ijazah/SKL SD/MI.
    - BIAYA PENDAFTARAN MTS: 
      * JALUR UMUM: Formulir Rp 125.000 | SPP Juli 2026 Rp 225.000 | Uang Gedung Rp 625.000.
      * JALUR ALUMNI MI HIDATHA: Formulir Rp 125.000 | SPP Juli 2026 Rp 225.000 | Uang Gedung Rp 0.
    - KONTAK MTS: 0852 1034 4397 / 0851 7521 0066 (IG/TikTok: @mts_tholibin_53).

    === 4. INFORMASI MI (MADRASAH IBTIDAIYAH) HIDAYATUT THALIBIN ===
    - KEUNGGULAN: Biaya terjangkau, kelas ber-AC, program Tahfizh Juz 30.
    - FASILITAS MI: Lab komputer, kelas ber-AC, perpustakaan, aula, bisnis center, musholla, lapangan, kantin.
    - EKSTRAKURIKULER MI: Tahfiz Juz 30, Pramuka, mewarnai, komputer, English Club, kaligrafi, silat, futsal, hadroh.
    - SYARAT PENDAFTARAN MI: Mengisi formulir, fotokopi KK, Akta Kelahiran, KTP, ijazah TK/RA, DP minimal 50%.
    - BIAYA PENDAFTARAN MI: 
      * JALUR UMUM: Formulir Rp 100.000 | SPP Juli 2026 Rp 200.000 | Uang Gedung Rp 1.200.000.
      * JALUR ALUMNI TK HIDATHA: Formulir Rp 100.000 | SPP Juli 2026 Rp 200.000 | Uang Gedung Rp 300.000.
    
    === 5. STRUKTUR ORGANISASI MI (MADRASAH IBTIDAIYAH) ===
    - Kepala MI: Ahmad Jailani, S.Pd.I
    - Komite MI: Meliza Febri
    - Tata Usaha: Ulvaniswah
    - Wakil Koordinator Kurikulum / Bendahara: Zara Zarini, S.Si, M.Pd
    - Wali Kelas IA: Afifah Salsabilah, S.Pd
    - Wali Kelas IB: Henry Riani, S.Pd
    - Wali Kelas II: Ubaidah, S.Pd.I
    - Wali Kelas IIIA: Haryanti Murdi, S.Pd
    - Wali Kelas IIIB: Ahmad Musthofa Kamal, S.Pd
    - Wali Kelas IVA: Salsabila Azzahra, S.Pd.I
    - Wali Kelas IVB: Mumtazah, S.Pd
    - Wali Kelas V: Zara Zarini, S.Si, M.Pd
    - Guru Kelas V: Novita Ika Indra

    === 6. STRUKTUR ORGANISASI MTS HIDAYATUT THOLIBIN ===
    - Kepala Madrasah: Dra. Tasmiyah
    - Ketua Komite: Tri Masnawati, S.E.
    - Kepala TU: Buchori
    - Bidang Kurikulum: Siti Lia Mudrika, M.A.
    - Bidang Kesiswaan: Fathimah, S.Ag.
    - Wali Kelas 7: Romiyah, S.Ag.
    - Wali Kelas 8: Endah Suryanti Ardhi, S.Pd.
    - Wali Kelas 9: Fathimah, S.Ag.
    `;

    const result = streamText({
      model: groq('qwen/qwen3.8-27b'),
      // @ts-expect-error: Mengabaikan peringatan tipe maxTokens yang belum diupdate di SDK
      maxTokens: 500,
      system: `Kamu adalah A.B.I (Asisten Belajar Interaktif), asisten AI resmi Yayasan Hidayatut Thalibin.
      
      SUMBER INFORMASI UTAMA:
      ${knowledgeBase}

      ATURAN FORMAT PENULISAN (PENTING!):
      1. JANGAN PERNAH menggunakan simbol Markdown seperti tanda pagar (#) atau tanda bintang (* / **) di dalam jawabanmu. Gunakan teks biasa dan baris baru (enter) agar rapi di layar chat.
      2. Jawablah dengan ringkas, padat, ramah, dan langsung pada intinya agar informasi cepat tersampaikan dan hemat token.

      PANDUAN ISI:
      - Perkenalkan dirimu sebagai A.B.I jika ditanya.
      - Tangani pertanyaan seputar unit MI, MTs, SMK, serta struktur organisasi guru dengan ramah dan akurat sesuai data di atas.
      - Tolak pertanyaan di luar konteks yayasan/sekolah dengan sopan. Jangan mengarang data.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error dari API Groq:", error);
    return new Response("Terjadi kesalahan internal server.", { status: 500 });
  }
}