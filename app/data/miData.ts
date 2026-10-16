export interface BeritaGalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  date?: string;
}

export const miData = {
  name: "Madrasah Ibtidaiyah Hidayatut Thalibin",
  shortName: "MI Hidayatut Thalibin",
  code: "MI",
  category: "Madrasah Ibtidaiyah (Setingkat SD)",
  tagline: "Membentuk Generasi Cerdas, Religius, dan Berakhlakul Karimah — Unggul dalam Ilmu & Matang dalam Spiritual.",
  profile: "Madrasah Ibtidaiyah (MI) Hidayatut Thalibin merupakan lembaga pendidikan formal setingkat Sekolah Dasar di bawah naungan Yayasan Hidayatut Thalibin Jakarta Selatan. MI Hidayatut Thalibin memadukan kurikulum nasional dengan pendalaman nilai-nilai keislaman yang kuat sejak usia dini.",
  vision: "Terwujudnya peserta didik yang cerdas, terampil, mandiri, berkarakter islami, dan berwawasan global.",
  missions: [
    "Menyelenggarakan pembelajaran aktif, kreatif, efektif, dan menyenangkan berbasis nilai-nilai keislaman.",
    "Menanamkan keimanan dan ketakwaan melalui pembiasaan ibadah sehari-hari di madrasah.",
    "Mengembangkan potensi akademik dan non-akademik siswa melalui bimbingan prestasi yang optimal.",
    "Membentuk karakter anak yang santun, disiplin, dan memiliki kepedulian sosial tinggi."
  ],

  excellencePrograms: [
    {
      title: "Tahfidz Juz Amma",
      description: "Program hafalan Al-Qur'an juz 30 dengan bimbingan khusus dan talaqqi.",
      detailContent: "Program Tahfidz Juz Amma dirancang agar setiap peserta didik memiliki bekal hafalan Al-Qur'an sejak tingkat dasar. Dilaksanakan dengan metode talaqqi dan setoran hafalan harian yang menyenangkan."
    },
    {
      title: "Madrasah Religius & Pembiasaan",
      description: "Shalat duha berjamaah, doa harian, dan praktik ibadah praktis.",
      detailContent: "Membiasakan peserta didik melaksanakan ibadah sunnah harian, dzikir, serta praktik wudhu dan shalat yang benar sesuai tuntunan rasul."
    },
    {
      title: "Literasi & Numerasi Dini",
      description: "Pojok baca interaktif dan penguatan dasar berhitung serta berpikir kritis.",
      detailContent: "Membangun budaya gemar membaca dan kemampuan dasar numerasi melalui media permainan edukatif dan metode belajar modern."
    },
    {
      title: "Klub Sains & Kreativitas",
      description: "Wadah pengembangan bakat sains, seni, dan keterampilan tangan siswa.",
      detailContent: "Mengasah minat anak melalui eksperimen sains sederhana, seni rupa, prakarya, serta persiapan lomba tingkat lokal maupun regional."
    }
  ],

  facilities: [
    { 
      name: "Ruang Kelas Full AC & Multimedia", 
      desc: "Suasana belajar yang nyaman ditunjang proyektor interaktif modern.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Perpustakaan Madrasah", 
      desc: "Koleksi buku literasi lengkap untuk menumbuhkan minat baca sejak dini.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Laboratorium Komputer", 
      desc: "Sarana pengenalan teknologi informasi dan komputer bagi siswa.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Halaman & Area Bermain", 
      desc: "Zona aman dan luas untuk aktivitas fisik serta ekstrakurikuler.",
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    }
  ],

  // Data Dummy Berita / Galeri Polaroid (Siap dihubungkan ke CMS Admin)
  beritaGallery: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
      title: "Juara 1 Lomba Pildacil",
      caption: "Prestasi membanggakan diraih siswa dalam ajang Pildacil tingkat kecamatan.",
      date: "12 Oktober 2026"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800&auto=format&fit=crop",
      title: "Manasik Haji Cilik",
      caption: "Kegiatan praktek manasik haji bersama guru dan pendamping.",
      date: "05 Oktober 2026"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1800&auto=format&fit=crop",
      title: "Peringatan Maulid Nabi",
      caption: "Keceriaan siswa merayakan Maulid Nabi SAW di aula madrasah.",
      date: "28 September 2026"
    }
  ] as BeritaGalleryItem[]
};