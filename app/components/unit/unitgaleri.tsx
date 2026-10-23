/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PolaroidLineCarousel, { Slide } from "../ui/polaroid-line-carousel";
import { Newspaper, ArrowRight } from "lucide-react";

interface UnitGaleriProps {
  unitCode?: string;
  theme?: "blue" | "emerald" | "amber" | "purple";
}

export default function UnitGaleri({ unitCode = "tk", theme = "amber" }: UnitGaleriProps) {
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`/api/proxy-berita/${unitCode}`);
        const result = await response.json();
        if (response.ok && result.status === 1) {
          setBeritaList(result.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBerita();
  }, [unitCode]);

  const themeStyles = {
    blue: { badgeBg: "bg-blue-50 text-blue-700 border-blue-200", titleColor: "text-blue-950", btnBg: "bg-blue-800 hover:bg-blue-900" },
    emerald: { badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200", titleColor: "text-emerald-950", btnBg: "bg-emerald-800 hover:bg-emerald-900" },
    amber: { badgeBg: "bg-amber-50 text-amber-700 border-amber-200", titleColor: "text-amber-950", btnBg: "bg-amber-800 hover:bg-amber-900" },
    purple: { badgeBg: "bg-purple-50 text-purple-700 border-purple-200", titleColor: "text-purple-950", btnBg: "bg-purple-800 hover:bg-purple-900" },
  };

  const t = themeStyles[theme] || themeStyles.amber;

  // Transform data berita MongoDB ke Slide Polaroid
  const slides: Slide[] = beritaList.map((item) => ({
    image: item.image || "/unit-tk.jpg",
    title: item.title,
    caption: new Date(item.createdAt).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }));

  const activeBerita = beritaList[activeIndex];

  return (
    <section id="berita-galeri" className="py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border mb-3 ${t.badgeBg}`}>
          <Newspaper className="h-3.5 w-3.5" /> Berita & Informasi Terbaru
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${t.titleColor}`}>
          Kilas Berita & Momen Madrasah
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Geser polaroid di bawah untuk melihat berita kegiatan terbaru kami.
        </p>
      </div>

      {isLoading ? (
        <div className="h-[520px] flex items-center justify-center bg-[#efece6] text-gray-400 font-medium">
          Memuat berita terbaru...
        </div>
      ) : beritaList.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-gray-400 font-medium">
          Belum ada berita yang diterbitkan.
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full h-[520px] shadow-sm border-y border-gray-100 bg-[#efece6]">
            <PolaroidLineCarousel 
              slides={slides}
              height="520px"
              cardWidth={280}
              sag={40}
              swing={1}
              autoplay={5000}
              background="#efece6"
              ink="#161513"
              onChange={(index) => setActiveIndex(index)}
            />
          </div>

          {/* Tombol Baca Berita Selengkapnya untuk Berita Aktif */}
          {activeBerita && (
            <div className="mt-8">
              <Link
                href={`/${unitCode}/${activeBerita._id}`}
                className={`inline-flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 ${t.btnBg}`}
              >
                Baca Artikel Lengkap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}