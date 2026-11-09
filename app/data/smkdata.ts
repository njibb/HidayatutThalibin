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
  vision: "Menjadikan SMK HIDATHA sebagai lembaga unggul dan religius untuk menghasilkan lulusan yang siap bersaing dan berkontribusi positif dalam dunia bisnis dan masyarakat",
  missions: [
    "Menyelenggarakan pendidikan kerujuan berkualitas berbasis kompetensi",
    "Mengintegrasikan nilai-nilai religius untuk membentuk karakter siswa",
    "Meningkatkan keterampilan teknis dan soft skills siswa."
  ],

  excellencePrograms: [
    {
      title: "Akuntansi dan Keuangan Lmebaga",
      detailContent: "Setiap siswa wajib mengikuti program PKL di instansi atau perusahaan rekanan guna menyelaraskan kompetensi keahlian di dunia kerja nyata."
    },
    {
      title: "Pemasaran",
      detailContent: "Memberikan pengakuan resmi atas keahlian vokasi yang dikuasai siswa sebelum kelulusan."
    },
    {
      title: "Manajemen Perkantoran dan Layanan Bisnis",
      detailContent: "Mendorong siswa untuk memiliki jiwa kemandirian finansial dan inovasi produk kreatif."
    }
  
  ],

   facilities: [
    { 
      name: "Laboratorium Komputer", 
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Ruang Kelas Ber AC dan nyaman", 
      image: "/kelas.jpeg" 
    },
    { 
      name: "Perpustakaan Lengkap", 
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Ekstraulikuler Unggulan", 
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Aula Serbaguna", 
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Bisnis Center", 
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Musholla", 
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Lapangan Olahraga Multifungsi", 
      image: "/lapangan.jpeg" 
    },
    { 
      name: "Kantin Sekolah", 
      image: "/kantin.jpeg" 
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