"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface UnitNavbarProps {
  unitName: string;
  unitCode: string;
  theme?: "emerald" | "blue" | "amber" | "purple" | "warm";
}

export default function UnitNavbar({ unitName, unitCode, theme = "blue" }: UnitNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mapping warna tema untuk Navbar
  const themeClasses = {
    emerald: {
      badge: "bg-emerald-600",
      hoverText: "hover:text-emerald-500",
      button: "bg-emerald-600 hover:bg-emerald-700",
      activeBg: "bg-emerald-50 text-emerald-600"
    },
    blue: {
      badge: "bg-blue-600",
      hoverText: "hover:text-blue-500",
      button: "bg-blue-600 hover:bg-blue-700",
      activeBg: "bg-blue-50 text-blue-600"
    },
    amber: {
      badge: "bg-amber-600",
      hoverText: "hover:text-amber-500",
      button: "bg-amber-600 hover:bg-amber-700",
      activeBg: "bg-amber-50 text-amber-600"
    },
    purple: {
      badge: "bg-purple-600",
      hoverText: "hover:text-purple-500",
      button: "bg-purple-600 hover:bg-purple-700",
      activeBg: "bg-purple-50 text-purple-600"
    },
    warm: {
      badge: "bg-[#5C4033]",
      hoverText: "hover:text-[#8B5A2B]",
      button: "bg-[#5C4033] hover:bg-[#4A3525]",
      activeBg: "bg-[#F5F2EB] text-[#5C4033]"
    }
  };

  const t = themeClasses[theme] || themeClasses.blue;

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3 text-gray-900' 
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Kiri: Logo & Nama Unit */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href={`/${unitCode.toLowerCase()}`} className="flex items-center gap-2.5 group">
            <div className={`w-8 h-8 ${t.badge} rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm group-hover:scale-105 transition duration-300`}>
              {unitCode}
            </div>
            <span className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
              {unitName}
            </span>
          </Link>
        </div>

        {/* Tengah/Kanan: Menu Navigasi */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
          <a href="#profil" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Profil</a>
          <a href="#program" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Program</a>
          <a href="#berita" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Berita</a>
          <a href="#struktur" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Struktur</a>
          <a href="#fasilitas" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Fasilitas</a>
          <a href="#kalender" className={`transition ${isScrolled ? t.hoverText : 'hover:text-white drop-shadow'}`}>Kalender</a>
          
          <div className={`h-4 w-[1px] mx-1 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />

          <Link 
            href="/" 
            className={`${t.button} text-white px-4 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition shadow-md hover:scale-105`}
          >
            &larr; Beranda Utama
          </Link>
        </nav>

        {/* Mobile Screen Beranda Button */}
        <div className="md:hidden">
          <Link 
            href="/" 
            className={`${t.button} text-white px-3 py-1.5 rounded-full font-semibold text-[11px] tracking-wider uppercase shadow`}
          >
            &larr; Beranda
          </Link>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-6 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700 animate-in fade-in slide-in-from-top-2">
          <a href="#profil" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600 border-b border-gray-50">Profil</a>
          <a href="#program" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600 border-b border-gray-50">Program</a>
          <a href="#berita" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600 border-b border-gray-50">Berita</a>
          <a href="#struktur" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600 border-b border-gray-50">Struktur</a>
          <a href="#fasilitas" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600 border-b border-gray-50">Fasilitas</a>
          <a href="#kalender" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-emerald-600">Kalender</a>
        </div>
      )}
    </header>
  );
}