"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('Beranda');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Deteksi posisi scroll halaman
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

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '#profil' },
    { name: 'Unit', href: '#unit' },
    { name: 'Kontak', href: '#kontak' },
  ];

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
        
        {/* Bagian Kiri: Tombol Menu (Mobile) & Logo/Identitas Yayasan */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-300">
              <span className="text-base" role="img" aria-label="planet">🪐</span>
            </div>
            <span className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
              Hidayatut Thalibin
            </span>
          </Link>
        </div>

        {/* Bagian Tengah & Kanan: Menu Navigasi Utama & Tombol PPDB */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`
                    px-3.5 py-1.5 rounded-full transition-colors duration-300
                    ${isScrolled 
                      ? (isActive ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600 hover:text-blue-600')
                      : (isActive ? 'text-white font-semibold bg-white/20' : 'text-gray-200 hover:text-white drop-shadow')
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className={`h-4 w-[1px] mx-1 ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />

          {/* Tombol PPDB */}
          <Link
            href="/ppdb"
            className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-blue-700 transition shadow-md hover:scale-105"
          >
            PPDB Online
          </Link>
        </nav>

        {/* Tombol PPDB (Mobile Screen) */}
        <div className="md:hidden">
          <Link
            href="/ppdb"
            className="bg-blue-600 text-white px-3.5 py-1.5 rounded-full font-semibold text-xs tracking-wider uppercase shadow"
          >
            PPDB
          </Link>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-6 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => {
                setActiveLink(link.name);
                setMobileMenuOpen(false);
              }}
              className="py-2 hover:text-blue-600 border-b border-gray-50 last:border-none"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}