"use client"; // Tambahkan ini jika di dalam komponen ada interaksi client-side, atau hapus jika murni server component (aman dihapus untuk footer statis, tapi biarkan saja jika sebelumnya ada)

import Link from 'next/link';

interface FooterProps {
  theme?: "warm" | "emerald" | "blue" | "amber" | "purple";
}

export default function Footer({ theme = "emerald" }: FooterProps) {
  
  const themes = {
    warm: {
      bg: "bg-[#2C221E] border-[#3E302A]",
      badgeBg: "bg-[#5C4033] border-[#7B5846] text-white",
      textSub: "text-[#D8C4B6]",
      accent: "text-[#A47E3B]",
      watermark: "text-[#3F2E26]/40",
      borderBottom: "border-[#3E302A] text-[#C5A880]"
    },
    emerald: {
      bg: "bg-emerald-950 border-emerald-900",
      badgeBg: "bg-emerald-900 border-emerald-800 text-white",
      textSub: "text-emerald-100/80",
      accent: "text-emerald-400",
      watermark: "text-emerald-900/30",
      borderBottom: "border-emerald-900 text-emerald-300/70"
    },
    blue: {
      bg: "bg-blue-950 border-blue-900",
      badgeBg: "bg-blue-900 border-blue-800 text-white",
      textSub: "text-blue-100/80",
      accent: "text-blue-400",
      watermark: "text-blue-900/30",
      borderBottom: "border-blue-900 text-blue-300/70"
    },
    amber: {
      bg: "bg-amber-950 border-amber-900",
      badgeBg: "bg-amber-900 border-amber-800 text-white",
      textSub: "text-amber-100/80",
      accent: "text-amber-400",
      watermark: "text-amber-900/30",
      borderBottom: "border-amber-900 text-amber-300/70"
    },
    purple: {
      bg: "bg-purple-950 border-purple-900",
      badgeBg: "bg-purple-900 border-purple-800 text-white",
      textSub: "text-purple-100/80",
      accent: "text-purple-400",
      watermark: "text-purple-900/30",
      borderBottom: "border-purple-900 text-purple-300/70"
    }
  };

  const t = themes[theme] || themes.emerald;

  return (
    <footer id="kontak" className={`relative text-gray-300 pt-20 pb-12 px-6 sm:px-12 overflow-hidden border-t ${t.bg}`}>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 relative z-10">
        
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 border rounded-xl flex items-center justify-center font-bold text-xl shadow-sm ${t.badgeBg}`}>
              H
            </div>
            <div>
              <span className="block font-bold text-white text-lg tracking-wide leading-tight">Yayasan Hidayatut Thalibin</span>
              <span className={`block text-xs uppercase tracking-widest ${t.accent}`}>Portal Terpadu</span>
            </div>
          </div>

          <p className={`text-sm leading-relaxed max-w-sm ${t.textSub}`}>
            Membangun generasi unggul, berakhlak mulia, dan berwawasan global melalui sistem pendidikan terpadu dari tingkat TK hingga SMK.
          </p>

          <div className={`space-y-3 pt-2 text-sm ${t.textSub}`}>
            <div className="flex items-start gap-3">
              <span className={`${t.accent} mt-0.5`}>📍</span>
              <span>Alamat Pusat: Jl Cilandak Tengah III/53 RT.001/001 Cilandak Barat, Jakarta Selatan 12430</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={t.accent}>✉️</span>
              <span>info@hidayatutthalibin.sch.id</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={t.accent}>📞</span>
              <span>+62 (021) XXXXXXXX</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Unit Sekolah</h4>
            <ul className={`space-y-3 text-sm ${t.textSub}`}>
              {/* Diubah menjadi Link */}
              <li><Link href="/tk" className="hover:text-white transition-colors">TK Hidayatut Thalibin</Link></li>
              <li><Link href="/mi" className="hover:text-white transition-colors">MI Hidayatut Thalibin</Link></li>
              <li><Link href="/mts" className="hover:text-white transition-colors">MTs Hidayatut Thalibin</Link></li>
              <li><Link href="/smk" className="hover:text-white transition-colors">SMK Hidayatut Thalibin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Akademik</h4>
            <ul className={`space-y-3 text-sm ${t.textSub}`}>
              <li><Link href="#profil" className="hover:text-white transition-colors">Profil Singkat</Link></li>
              <li><Link href="#unit" className="hover:text-white transition-colors">Program Belajar</Link></li>
              <li><Link href="/ppdb" className="hover:text-white transition-colors">PPDB Online</Link></li>
              <li><Link href="#kontak" className="hover:text-white transition-colors">Kalender Akademik</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Informasi</h4>
            <ul className={`space-y-3 text-sm ${t.textSub}`}>
              <li><Link href="#" className="hover:text-white transition-colors">Fasilitas</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Galeri & Berita</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Prestasi Siswa</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>
        </div>

      </div>

      <div className={`max-w-7xl mx-auto border-t pt-8 relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${t.borderBottom}`}>
        <p>&copy; 2026 Yayasan Hidayatut Thalibin. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Term & Condition</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>

      <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <span className={`text-[12vw] sm:text-[11vw] font-extrabold tracking-tighter uppercase whitespace-nowrap block leading-none ${t.watermark}`}>
          HIDATHA
        </span>
      </div>

    </footer>
  );
}