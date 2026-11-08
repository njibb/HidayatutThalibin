export interface BeritaGalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  date?: string;
}

export const tkData = {
  name: "Taman Kanak-Kanak Hidayatut Thalibin",
  shortName: "TK Hidayatut Thalibin",
  code: "TK",
  category: "Pendidikan Anak Usia Dini",
  tagline: "Bermain, Belajar, dan Tumbuh Ceria Bersama Nilai-Nilai Islam Sejak Dini.",
  profile: "Taman Kanak-Kanak (TK) Hidayatut Thalibin adalah lembaga pendidikan anak usia dini yang mendidik dengan penuh kasih sayang, mengasah kreativitas, serta menanamkan dasar-dasar keimanan dan budi pekerti luhur melalui metode bermain sambil belajar.",
  vision: "Membentuk anak usia dini yang ceria, kreatif, mandiri, berakhlak mulia, dan siap memasuki jenjang pendidikan dasar.",
  missions: [
    "Menyelenggarakan kegiatan bermain sambil belajar yang menyenangkan dan merangsang tumbuh kembang anak.",
    "Menanamkan nilai-nilai agama dan moral melalui pembiasaan doa harian serta akhlak mulia.",
    "Mengembangkan kemandirian, kedisiplinan, dan rasa percaya diri pada anak.",
    "Membangun kerja sama yang harmonis antara guru, orang tua, dan lingkungan sekolah."
  ],

  excellencePrograms: [
    {
      title: "Tahfidz Surat Pendek & Doa Harian",
      description: "Menghafal juz amma pilihan dan doa sehari-hari dengan metode menyenangkan.",
      detailContent: "Anak-anak diperkenalkan pada hafalan surat pendek dan doa harian melalui lagu dan pengulangan interaktif setiap pagi."
    },
    {
      title: "Sentra Bermain & Kreativitas",
      description: "Stimulasi motorik halus dan kasar melalui aktivitas seni, balok, dan peran.",
      detailContent: "Pembelajaran berbasis sentra untuk melatih kreativitas, imajinasi, serta kemampuan bersosialisasi anak dengan teman sebaya."
    },
    {
      title: "English & Arabic Fun Words",
      description: "Pengenalan kosakata dasar bahasa asing secara interaktif.",
      detailContent: "Mengenalkan dasar bahasa Inggris dan bahasa Arab dalam bentuk permainan kata yang mudah diserap anak usia dini."
    },
    {
      title: "Manasik & Praktik Ibadah",
      description: "Praktik wudhu, gerakan shalat, dan manasik haji khusus anak.",
      detailContent: "Mengenalkan tata cara beribadah sejak dini agar tertanam kecintaan terhadap syariat Islam dalam diri anak."
    }
  ],

  facilities: [
    { 
      name: "Laboratorium Komputer", 
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Ruang Kelas Ber AC dan nyaman", 
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80" 
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
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Kantin Sekolah", 
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80" 
    }
  ],

  beritaGallery: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1800&auto=format&fit=crop",
      title: "Keceriaan Manasik Haji Cilik",
      caption: "Siswa-siswi TK mengenakan pakaian ihram dalam simulasi manasik haji.",
      date: "10 April 2026"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1800&auto=format&fit=crop",
      title: "Pentas Seni Akhir Tahun",
      caption: "Penampilan tarian dan nyanyian ceria dari adik-adik TK.",
      date: "18 Juni 2026"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1800&auto=format&fit=crop",
      title: "Lomba Mewarnai Tingkat Gugus",
      caption: "Mengasah keberanian dan motorik halus anak melalui lomba warna.",
      date: "14 Agustus 2026"
    }
  ] as BeritaGalleryItem[]
};