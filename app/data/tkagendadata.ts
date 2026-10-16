export interface AgendaItem {
  id?: string;
  title: string;
  date: string;
  bulan: string;
  day?: number;
  category: string;
  description?: string;
}

export const tkAgendaData: AgendaItem[] = [
  {
    id: "1",
    title: "Manasik Haji Cilik TK",
    date: "10 April 2026",
    bulan: "April",
    day: 10,
    category: "Keagamaan",
    description: "Kegiatan simulasi manasik haji ceria bersama seluruh siswa dan guru TK."
  },
  {
    id: "2",
    title: "Pentas Seni & Pelepasan Siswa",
    date: "18 Juni 2026",
    bulan: "Juni",
    day: 18,
    category: "Seni & Kreativitas",
    description: "Ajang unjuk bakat menari, bernyanyi, dan wisuda kelulusan murid TK."
  },
  {
    id: "3",
    title: "Lomba Mewarnai & Kreativitas Anak",
    date: "14 Agustus 2026",
    bulan: "Agustus",
    day: 14,
    category: "Lomba",
    description: "Memeriahkan hari kemerdekaan dengan lomba kreativitas warna tingkat gugus TK."
  },
  {
    id: "4",
    title: "Manasik & Pesantren Kilat Ceria",
    date: "05 Ramadhan 1447 H",
    bulan: "Ramadhan",
    day: 5,
    category: "Keagamaan",
    description: "Pengenalan ibadah puasa dan doa harian dengan metode interaktif."
  }
];