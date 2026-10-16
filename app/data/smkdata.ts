export interface BeritaGalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  date?: string;
}

export const smkData = {
  name: "Sekolah Menengah Kejuruan Hidayatut Thalibin",
  shortName: "SMK Hidayatut Thalibin",
  code: "SMK",
  category: "Sekolah Menengah Kejuruan",
  tagline: "Sekolah Kejuruan Siap Kerja — Vokasi Unggul, Kreatif, Kompeten, dan Berakhlakul Karimah.",
  profile: "SMK Hidayatut Thalibin merupakan lembaga pendidikan kejuruan formal di bawah naungan Yayasan Hidayatut Thalibin Jakarta Selatan. Kami berfokus mencetak lulusan siap kerja, berjiwa wirausaha, serta menguasai teknologi dan keahlian vokasi modern.",
  vision: "Menjadi pusat pendidikan kejuruan yang menghasilkan lulusan kompeten, profesional, berkarakter islami, dan berdaya saing di dunia kerja.",
  missions: [
    "Menyelenggarakan pendidikan kejuruan berbasis standar industri dan dunia usaha (DUDI).",
    "Membekali peserta didik dengan keterampilan hard skills dan soft skills yang handal.",
    "Menanamkan nilai-nilai keimanan, ketakwaan, serta etika profesi yang luhur.",
    "Mengembangkan jiwa kewirausahaan (entrepreneurship) melalui unit produksi dan praktek mandiri."
  ],

  excellencePrograms: [
    {
      title: "Praktik Industri & Magang DUDI",
      description: "Pengalaman kerja nyata langsung di perusahaan mitra terkemuka.",
      detailContent: "Setiap siswa wajib mengikuti program PKL di instansi atau perusahaan rekanan guna menyelaraskan kompetensi keahlian di dunia kerja nyata."
    },
    {
      title: "Sertifikasi Kompetensi Resmi",
      description: "Uji keahlian berstandar nasional bersertifikat BNSP / Industri.",
      detailContent: "Memberikan pengakuan resmi atas keahlian vokasi yang dikuasai siswa sebelum kelulusan."
    },
    {
      title: "Inkumbator Wirausaha Muda",
      description: "Pelatihan bisnis digital, praktik mandiri, dan manajemen usaha.",
      detailContent: "Mendorong siswa untuk memiliki jiwa kemandirian finansial dan inovasi produk kreatif."
    },
    {
      title: "Bursa Kerja Khusus (BKK)",
      description: "Fasilitas penyaluran kerja langsung bagi lulusan ke dunia industri.",
      detailContent: "BKK sekolah aktif menjalin kerja sama dengan berbagai perusahaan untuk penyerapan tenaga kerja alumni."
    }
  ],

  facilities: [
    { 
      name: "Laboratorium Komputer & Jaringan Modern", 
      desc: "Perangkat komputer spesifikasi tinggi untuk praktik pemrograman dan jaringan.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Bengkel / Workshop Vokasi", 
      desc: "Ruang praktik teknik dan kejuruan lengkap dengan peralatan standar industri.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Perpustakaan Digital", 
      desc: "Akses literasi referensi teknik, modul kejuruan, dan e-book lengkap.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Aula & Ruang Pertemuan", 
      desc: "Fasilitas serbaguna untuk seminar, workshop industri, dan kegiatan siswa.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" 
    }
  ],

  beritaGallery: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1800&auto=format&fit=crop",
      title: "Pelaksanaan UKK Tahun 2026",
      caption: "Siswa jurusan kejuruan unjuk kebolehan dalam Uji Kompetensi Keahlian.",
      date: "12 Maret 2026"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
      title: "Job Fair & Rekrutmen Terbuka",
      caption: "Bursa Kerja Khusus (BKK) mendatangkan puluhan perusahaan mitra.",
      date: "25 Mei 2026"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1800&auto=format&fit=crop",
      title: "Workshop Kewirausahaan Digital",
      caption: "Pelatihan bisnis kreatif bagi siswa tingkat akhir.",
      date: "10 Agustus 2026"
    }
  ] as BeritaGalleryItem[]
};