export interface AgendaItem {
  id?: string;
  title: string;
  date: string;
  bulan: string;      // <-- Ditambahkan agar komponen kalender tidak error
  day?: number;       // <-- Tanggal dalam bentuk angka (untuk grid kalender)
  category: string;
  description?: string;
}

export const miAgendaData: AgendaItem[] = [
  {
    id: "1",
    title: "Pesantren Kilat Ramadhan",
    date: "15 Ramadhan 1447 H",
    bulan: "Ramadhan",
    day: 15,
    category: "Keagamaan",
    description: "Kegiatan pembinaan ibadah, tadarus Al-Qur'an, dan pendalaman akhlak selama bulan suci."
  },
  {
    id: "2",
    title: "Manasik Haji Cilik Tingkat Madrasah",
    date: "12 Mei 2026",
    bulan: "Mei",
    day: 12,
    category: "Praktik",
    description: "Simulasi ibadah haji untuk mengenalkan rukun Islam kelima sejak usia dini kepada siswa."
  },
  {
    id: "3",
    title: "Ujian Akhir Semester (UAS) Genap",
    date: "01 Juni 2026",
    bulan: "Juni",
    day: 1,
    category: "Akademik",
    description: "Evaluasi penilaian hasil belajar peserta didik untuk kenaikan kelas."
  },
  {
    id: "4",
    title: "Porseni Antar Kelas & Pentas Seni",
    date: "20 Juni 2026",
    bulan: "Juni",
    day: 20,
    category: "Non-Akademik",
    description: "Ajang unjuk bakat olahraga dan seni kreativitas siswa-siswi MI Hidayatut Thalibin."
  }
];