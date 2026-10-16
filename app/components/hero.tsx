export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-end justify-between overflow-hidden bg-gray-950">
      {/* 1. Background Gambar Gedung Sekolah dengan Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/sekolah-bg.jpg')` }}
      >
        {/* Lapisan gradasi gelap agar teks putih terbaca jelas & estetik */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
      </div>

      {/* 2. Bingkai Siluet Garis Kurva Artistik di Tengah (seperti referensi) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] border border-white/40 rounded-[40px] transform rotate-12 backdrop-blur-[2px]"></div>
      </div>

      {/* 3. Konten Utama Hero di Bagian Bawah */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        
        {/* Sisi Kiri: Judul Besar Nama Yayasan */}
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg">
            Hidayatut Thalibin
          </h1>
        </div>

        {/* Sisi Kanan: Deskripsi Singkat & Tombol Aksi (Apply Now style) */}
        <div className="max-w-sm flex flex-col items-start md:items-end text-left md:text-right">
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 drop-shadow">
            Membangun generasi unggul dan berakhlak mulia melalui sistem pendidikan terpadu dari tingkat TK hingga SMK.
          </p>
          <a 
            href="#unit" 
            className="group inline-flex items-center gap-2 bg-white text-gray-950 px-6 py-3 rounded-full font-semibold text-sm shadow-xl transition-all duration-300 hover:bg-emerald-50 hover:scale-105"
          >
            <span>Jelajahi Unit</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}