export interface AgendaItem {
  id: string;
  no: number;
  bulan: string;
  tanggal: string;
  kegiatan: string;
  keterangan?: string;
}

export const mtsAgendaData: AgendaItem[] = [
  // Juli 2025 / 2026
  { id: "1", no: 1, bulan: "Juli", tanggal: "14 Juli 2026", kegiatan: "Awal Tahun Pelajaran 2026 / 2027" },
  { id: "2", no: 2, bulan: "Juli", tanggal: "14-16 Juli", kegiatan: "Matsama dengan siswa kelas 7" },
  { id: "3", no: 3, bulan: "Juli", tanggal: "17 Juli", kegiatan: "Pemilihan Pengurus Kelas (Walas)" },
  { id: "4", no: 4, bulan: "Juli", tanggal: "18 Juli", kegiatan: "Zikir bersama Tahun Pelajaran Baru" },
  { id: "5", no: 5, bulan: "Juli", tanggal: "21-31 Juli", kegiatan: "Kegiatan Belajar Mengajar" },

  // Agustus
  { id: "6", no: 6, bulan: "Agustus", tanggal: "1-12 Agustus", kegiatan: "Kegiatan Belajar Mengajar" },
  { id: "7", no: 7, bulan: "Agustus", tanggal: "13-15 Agustus", kegiatan: "Lomba HUT RI" },
  { id: "8", no: 8, bulan: "Agustus", tanggal: "17 Agustus", kegiatan: "Libur Nasional (Upacara HUT RI)" },
  { id: "9", no: 9, bulan: "Agustus", tanggal: "18 - 29 Agustus", kegiatan: "Kegiatan Belajar Mengajar" },
  { id: "10", no: 10, bulan: "Agustus", tanggal: "25 - 29 Agustus", kegiatan: "Perkiraan Penilaian Harian 1" },

  // September
  { id: "11", no: 11, bulan: "September", tanggal: "1-3 September", kegiatan: "Kegiatan Belajar Mengajar" },
  { id: "12", no: 12, bulan: "September", tanggal: "4 September", kegiatan: "Peringatan Maulid Nabi Muhammad SAW" },
  { id: "13", no: 13, bulan: "September", tanggal: "5 September", kegiatan: "Libur Nasional (Maulid Nabi Muhammad SAW)" },
  { id: "14", no: 14, bulan: "September", tanggal: "1-30 September", kegiatan: "Kegiatan Belajar Mengajar" },

  // Oktober
  { id: "15", no: 15, bulan: "Oktober", tanggal: "1-8 Oktober", kegiatan: "Penilaian Harian 2 (Mid Test)" },
  { id: "16", no: 16, bulan: "Oktober", tanggal: "9 Oktober", kegiatan: "Wisata Edukasi dalam Kota Jakarta", keterangan: "Ketua: H. Aziz Muslim" },
  { id: "17", no: 17, bulan: "Oktober", tanggal: "17 Oktober", kegiatan: "Penyerahan Rapot PTS", keterangan: "Sekretaris: Endah Suryanti" },
  { id: "18", no: 18, bulan: "Oktober", tanggal: "13-31 Oktober", kegiatan: "Kegiatan Belajar Mengajar", keterangan: "Bendahara: Fathimah" },
  { id: "19", no: 19, bulan: "Oktober", tanggal: "20 - 24 Oktober", kegiatan: "Penilaian Kinerja Guru (PKG Semester Ganjil)" },

  // November
  { id: "21", no: 21, bulan: "November", tanggal: "3-7 November", kegiatan: "Kegiatan Belajar Mengajar" },
  { id: "22", no: 22, bulan: "November", tanggal: "10-14 November", kegiatan: "Penilaian Harian 3" },
  { id: "23", no: 23, bulan: "November", tanggal: "17-21 November", kegiatan: "P7RA Demokrasi" },
  { id: "24", no: 24, bulan: "November", tanggal: "24-26 November", kegiatan: "Ujian Praktek" },
  { id: "25", no: 25, bulan: "November", tanggal: "27-28 November", kegiatan: "Asesmen Akhir Semester Ganjil" },

  // Desember
  { id: "26", no: 26, bulan: "Desember", tanggal: "1-4 Desember", kegiatan: "Asesmen Akhir Semester Ganjil" },
  { id: "27", no: 27, bulan: "Desember", tanggal: "5-9 Desember", kegiatan: "Class Meeting OSIS" },
  { id: "28", no: 28, bulan: "Desember", tanggal: "12-13 Desember", kegiatan: "Raker Pengurus OSIS Baru" },
  { id: "29", no: 29, bulan: "Desember", tanggal: "19 Desember", kegiatan: "Penyerahan Buku Rapor Semester Ganjil" },
  { id: "31", no: 31, bulan: "Desember", tanggal: "25-26 Desember", kegiatan: "Cuti Bersama Natal" },
  { id: "32", no: 32, bulan: "Desember", tanggal: "22-31 Desember", kegiatan: "Libur Semester Ganjil" },

  // Januari
  { id: "33", no: 33, bulan: "Januari", tanggal: "1 Januari", kegiatan: "Libur Nasional Tahun Baru Masehi" },
  { id: "34", no: 34, bulan: "Januari", tanggal: "3 Januari", kegiatan: "HAB DEPAG (Hari Amal Bhakti Kementerian Agama)" },
  { id: "35", no: 35, bulan: "Januari", tanggal: "5 Januari", kegiatan: "Hari Pertama Semester Genap" },
  { id: "36", no: 36, bulan: "Januari", tanggal: "16 Januari", kegiatan: "Peringatan Isra Mi'raj Nabi Muhammad SAW" },

  // Februari
  { id: "41", no: 41, bulan: "Februari", tanggal: "2-6 Februari", kegiatan: "Penilaian Harian Pertama Semester Genap" },
  { id: "42", no: 42, bulan: "Februari", tanggal: "13 Februari", kegiatan: "Kirab & Takhtimul Qur'an jelang Ramadhan" },
  { id: "43", no: 43, bulan: "Februari", tanggal: "16 Februari", kegiatan: "Perkiraan Libur Awal Ramadhan" },
  { id: "44", no: 44, bulan: "Februari", tanggal: "17 Februari", kegiatan: "Hari Raya Imlek" },
  { id: "45", no: 45, bulan: "Februari", tanggal: "23 Februari", kegiatan: "Awal Masuk di Bulan Ramadhan" },

  // Maret
  { id: "49", no: 49, bulan: "Maret", tanggal: "9-11 Maret", kegiatan: "Kegiatan Pesantren Ramadhan" },
  { id: "51", no: 51, bulan: "Maret", tanggal: "12-25 Maret", kegiatan: "Libur Seputar Idul Fitri 1447 H" },
  { id: "52", no: 52, bulan: "Maret", tanggal: "30 Maret", kegiatan: "Halal Bihalal Masuk Sekolah Setelah Idul Fitri" },

  // April & Mei
  { id: "53", no: 53, bulan: "April", tanggal: "3 April", kegiatan: "Wafat Isa Almasih" },
  { id: "54", no: 54, bulan: "April", tanggal: "6-10 April", kegiatan: "PAT Kelas 9 & Penilaian 2 Kelas 7-8" },
  { id: "55", no: 55, bulan: "Mei", tanggal: "1 Mei", kegiatan: "Hari Buruh Nasional (Libur Nasional)" },
  { id: "56", no: 56, bulan: "Mei", tanggal: "14 Mei", kegiatan: "Kenaikan Isa Almasih" },

  // Juni
  { id: "57", no: 57, bulan: "Juni", tanggal: "1 Juni", kegiatan: "Libur Nasional (Hari Lahir Pancasila)" },
  { id: "58", no: 58, bulan: "Juni", tanggal: "5-13 Juni", kegiatan: "Perkiraan Asesmen Akhir Kelas 7-8" },
  { id: "59", no: 59, bulan: "Juni", tanggal: "26 Juni", kegiatan: "Pembagian Rapor Semester Genap & Kenaikan Kelas" },
];