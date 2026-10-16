"use client";
import React from "react";
import PolaroidLineCarousel, { Slide } from "../ui/polaroid-line-carousel";
import { Newspaper } from "lucide-react";
import { mtsData } from "@/app/data/mtsData";

interface UnitGaleriProps {
  theme?: "blue" | "emerald" | "amber" | "purple";
}

export default function UnitGaleri({ theme = "blue" }: UnitGaleriProps) {
  const slides: Slide[] = mtsData.beritaGallery.map((item) => ({
    image: item.image,
    title: item.title,
    caption: `${item.date ? item.date + "\n" : ""}${item.caption}`,
  }));

  const themeStyles = {
    blue: {
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      titleColor: "text-blue-950",
    },
    emerald: {
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      titleColor: "text-emerald-950",
    },
    amber: {
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      titleColor: "text-amber-950",
    },
    purple: {
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      titleColor: "text-purple-950",
    },
  };

  const t = themeStyles[theme] || themeStyles.blue;

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
          Geser atau tarik tali polaroid di bawah untuk membaca kilas berita dan kegiatan terbaru kami.
        </p>
      </div>

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
        />
      </div>
    </section>
  );
}