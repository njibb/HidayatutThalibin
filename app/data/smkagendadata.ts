export interface AgendaItem {
  id?: string;
  title: string;
  date: string;
  bulan: string;
  day?: number;
  category: string;
  description?: string;
}

export const smkAgendaData: AgendaItem[] = [
  {
    id: "1",
    title: "Uji Kompetensi Keahlian (UKK)",
    date: "10 - 15 Maret 2026",
    bulan: "Maret",
    day: 10,
    category: "Kejuruan",
    description: "Sertifikasi keahlian vokasi siswa tingkat akhir bersama penguji dari industri/DUDI."
  },
  {
    id: "2",
    title: "Job Fair & Bursa Kerja Khusus (BKK)",
    date: "25 Mei 2026",
    bulan: "Mei",
    day: 25,
    category: "Karier",
    description: "Pameran kesempatan kerja bagi alumni dan siswa kelas XII dengan mitra perusahaan."
  },
  {
    id: "3",
    title: "Praktik Kerja Lapangan (PKL) Gelombang II",
    date: "01 Juli 2026",
    bulan: "Juli",
    day: 1,
    category: "Magang",
    description: "Pelepasan siswa kelas XI untuk melaksanakan magang industri di berbagai instansi mitra."
  },
  {
    id: "4",
    title: "Pekan Olahraga & Seni Vokasi (Porsenivok)",
    date: "15 Agustus 2026",
    bulan: "Agustus",
    day: 15,
    category: "Non-Akademik",
    description: "Kompetisi bakat kreatif, olahraga, dan inovasi teknologi antar program keahlian."
  }
];