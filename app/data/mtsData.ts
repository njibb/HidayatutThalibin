export interface BeritaGalleryItem {
  id: string;
  image: string;
  title: string;       // Judul berita / kegiatan
  caption: string;     // Ringkasan atau isi singkat berita
  date?: string;       // Tanggal kegiatan
}

export const mtsData = {
  name: "Madrasah Tsanawiyah Hidayatut Tholibin",
  shortName: "MTs Hidayatut Tholibin",
  code: "MTs",
  category: "Madrasah Tsanawiyah (Setingkat SMP)",
  tagline: "Merawat Tradisi, Merespon Modernisasi — Membentuk Generasi Beriman, Berwawasan Ilmu, dan Berakhlakul Karimah.",
  profile: "Madrasah Tsanawiyah (MTs) Hidayatut Tholibin merupakan lembaga pendidikan menengah pertama di bawah naungan Yayasan Hidayatut Tholibin Jakarta Selatan. MTs Hidayatut Tholibin memadukan pendidikan Islam yang kuat melalui pembiasaan keagamaan harian dengan penguasaan ilmu pengetahuan, teknologi, serta pengembangan karakter peserta didik.",
  vision: "“Beriman dan bertakwa, berwawasan ilmu pengetahuan, serta berakhlakul karimah”",
  missions: [
    "Mewujudkan lingkungan dan perilaku religius dengan mengamalkan dan menghayati nilai-nilai ajaran agama Islam.",
    "Mewujudkan nilai-nilai akhlakul karimah di lingkungan madrasah dan membudayakan budaya 7S (Salam, Senyum, Sapa, Sopan, Santun, Semangat, Sportif).",
    "Menciptakan kondisi lingkungan pembelajaran yang aktif, kreatif, efektif, inovatif, kondusif, dan menyenangkan.",
    "Membimbing dan mengembangkan minat serta bakat peserta didik melalui kegiatan intrakurikuler dan ekstrakurikuler secara optimal.",
    "Mengoptimalkan potensi akademik serta meningkatkan profesionalisme tenaga pendidik sesuai perkembangan dunia pendidikan."
  ],

  excellencePrograms: [
    {
      title: "Madrasah Religi",
      description: "Program pembiasaan ibadah, doa bersama, shalat berjamaah, dan pembentukan akhlakul karimah.",
      detailContent: "Program Madrasah Religi diarahkan untuk memperkuat keimanan, ketakwaan, akhlak mulia, serta pembiasaan nilai-nilai keagamaan dalam kehidupan sehari-hari. Kegiatan dilaksanakan melalui pembiasaan ibadah, doa bersama, pembacaan Al-Qur'an, shalat berjamaah, kegiatan keagamaan, serta pembinaan akhlakul karimah.\n\nProgram ini diharapkan dapat membentuk peserta didik yang memiliki kesadaran beragama, berperilaku santun, bertanggung jawab, serta mampu menerapkan nilai-nilai agama dalam kehidupan di madrasah, keluarga, dan masyarakat."
    },
    {
      title: "Madrasah Digital",
      description: "Pemanfaatan teknologi secara bijak, kreatif, dan produktif dalam proses pembelajaran modern.",
      detailContent: "Program Madrasah Digital dikembangkan untuk meningkatkan kemampuan peserta didik dan guru dalam memanfaatkan teknologi secara bijak, kreatif, produktif, dan bertanggung jawab dalam proses pembelajaran.\n\nPemanfaatan teknologi diarahkan untuk mendukung pembelajaran yang lebih menarik, pengembangan keterampilan digital, penyediaan sumber belajar beragam, serta peningkatan kompetensi guru dalam menggunakan media digital."
    },
    {
      title: "Madrasah Literasi",
      description: "Menumbuhkan budaya membaca, menulis, berpikir kritis, dan literasi digital peserta didik.",
      detailContent: "Program Madrasah Literasi bertujuan untuk menumbuhkan budaya membaca, menulis, memahami informasi, serta mengembangkan kemampuan berpikir kritis dan kreatif peserta didik.\n\nKegiatan literasi dilaksanakan melalui pembiasaan membaca, jurnal literasi, kegiatan menulis, pemanfaatan perpustakaan, literasi digital, serta pengintegrasian kemampuan literasi dalam berbagai mata pelajaran."
    },
    {
      title: "Madrasah Ramah Anak",
      description: "Menciptakan lingkungan belajar yang aman, nyaman, inklusif, dan bebas perundungan.",
      detailContent: "Program Madrasah Ramah Anak dikembangkan untuk menciptakan lingkungan belajar yang aman, nyaman, sehat, inklusif, menyenangkan, dan menghargai setiap peserta didik.\n\nMadrasah berupaya membangun hubungan yang positif antara guru, peserta didik, dan warga madrasah melalui penerapan disiplin positif, pencegahan perundungan, serta penghargaan terhadap keberagaman."
    },
    {
      title: "Penguatan Pembelajaran Mendalam",
      description: "Pendekatan belajar bermakna melalui proses Memahami, Mengaplikasikan, dan Merefleksikan.",
      detailContent: "MTs Hidayatut Tholibin mengembangkan Pembelajaran Mendalam sebagai pendekatan untuk menciptakan proses belajar yang lebih bermakna. Pembelajaran diarahkan agar peserta didik mampu mengaplikasikan pengetahuan dan melakukan refleksi.\n\nPelaksanaan pembelajaran dikembangkan melalui tiga proses utama, yaitu Memahami, Mengaplikasikan, dan Merefleksikan, dengan memperhatikan prinsip Mindful, Meaningful, dan Joyful."
    },
    {
      title: "Kurikulum Berbasis Cinta (KBC)",
      description: "Membangun kepedulian terhadap diri sendiri, sesama, lingkungan, dan bangsa.",
      detailContent: "Nilai-nilai Kurikulum Berbasis Cinta diintegrasikan dalam pembelajaran dan budaya madrasah untuk membangun peserta didik yang memiliki kepedulian terhadap diri sendiri, sesama, lingkungan, serta bangsa.\n\nPenguatan KBC dilakukan melalui pembelajaran, pembiasaan, kegiatan keagamaan, kegiatan sosial, kepedulian lingkungan, serta aktivitas yang menumbuhkan sikap saling menghargai dan menyayangi."
    },
    {
      title: "Penguatan Literasi & Numerasi",
      description: "Integrasi kemampuan literasi dan numerasi lintas mata pelajaran untuk kecakapan hidup.",
      detailContent: "Penguatan kemampuan literasi dan numerasi peserta didik dilakukan tidak hanya melalui mata pelajaran Bahasa Indonesia dan Matematika, tetapi juga melalui integrasi lintas mata pelajaran dan kegiatan madrasah guna membekali kompetensi dasar yang kuat bagi siswa."
    }
  ],

  facilities: [
    { 
      name: "Ruang Kelas Ber-AC", 
      desc: "Suasana belajar yang sejuk, nyaman, dan kondusif bagi siswa.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Musholla", 
      desc: "Pusat kegiatan ibadah harian dan pembinaan keagamaan siswa.",
      image: "https://images.unsplash.com/photo-1564769625867-0c52119ed3c3?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Lapangan Olahraga Multifungsi", 
      desc: "Sarana aktivitas fisik, upacara, dan pengembangan minat olahraga.",
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Kantin Sehat Bersertifikat Halal", 
      desc: "Menyediakan makanan dan minuman yang higienis serta bergizi.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Laboratorium Komputer", 
      desc: "Pusat praktik TIK dan penunjang program Madrasah Digital.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Aula Serbaguna", 
      desc: "Ruangan besar untuk kegiatan rapat, pentas seni, dan acara madrasah.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Bisnis Center (BC)", 
      desc: "Sarana pelatihan kewirausahaan praktis bagi peserta didik.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" 
    }
  ],

  extracurriculars: [
    "Pramuka", "Muhadharah", "Hadroh", "Tari Saman", "Tahfidz", "Paskibra"
  ],

  tuition: {
    general: { form: "Rp 125.000", spp: "Rp 225.000", building: "Rp 625.000" },
    alumniMi: { form: "Rp 125.000", spp: "Rp 225.000", building: "Rp 0 (Gratis Uang Gedung)" }
  },

  // Tambahan Data Berita / Informasi Bergaya Polaroid untuk Galeri
  beritaGallery: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800&auto=format&fit=crop",
      title: "Upacara Hari Pahlawan",
      caption: "Siswa-siswi MTs Hidayatut Tholibin mengikuti upacara dengan khidmat.",
      date: "10 November 2026"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
      title: "Juara Umum Lomba Sains",
      caption: "Prestasi membanggakan diraih oleh perwakilan siswa tingkat kabupaten.",
      date: "15 Oktober 2026"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1800&auto=format&fit=crop",
      title: "Pelatihan Digital Lab",
      caption: "Pengenalan dasar pemrograman dan komputer bagi siswa kelas 8.",
      date: "02 Oktober 2026"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1800&auto=format&fit=crop",
      title: "Pekan Literasi Madrasah",
      caption: "Gerakan membaca bersama di halaman utama madrasah.",
      date: "20 September 2026"
    }
  ] as BeritaGalleryItem[]
};