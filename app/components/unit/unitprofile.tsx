"use client";

import React from "react";
import Image from "next/image";

interface UnitProfileProps {
  theme?: "emerald" | "blue" | "amber" | "purple" | "warm";
  profile: string;
  vision: string;
  missions: string[];
}

export default function UnitProfile({ theme = "blue", profile, vision, missions }: UnitProfileProps) {
  const themeStyles = {
    blue: {
      badge: "bg-blue-50 text-blue-800 border-blue-200",
      accentText: "text-blue-900",
      quoteBorder: "border-blue-600 bg-blue-50/50",
      missionCheck: "text-blue-600 bg-blue-50",
    },
    emerald: {
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      accentText: "text-emerald-900",
      quoteBorder: "border-emerald-600 bg-emerald-50/50",
      missionCheck: "text-emerald-600 bg-emerald-50",
    },
    amber: {
      badge: "bg-amber-50 text-amber-800 border-amber-200",
      accentText: "text-amber-900",
      quoteBorder: "border-amber-600 bg-amber-50/50",
      missionCheck: "text-amber-600 bg-amber-50",
    },
    purple: {
      badge: "bg-purple-50 text-purple-800 border-purple-200",
      accentText: "text-purple-900",
      quoteBorder: "border-purple-600 bg-purple-50/50",
      missionCheck: "text-purple-600 bg-purple-50",
    },
    warm: {
      badge: "bg-[#EADBC8] text-[#5C4033] border-[#C5A880]",
      accentText: "text-[#4A3525]",
      quoteBorder: "border-[#8B5A2B] bg-[#F5F2EB]/50",
      missionCheck: "text-[#8B5A2B] bg-[#EADBC8]/40",
    }
  };

  const t = themeStyles[theme] || themeStyles.blue;

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Kolom Kiri: Foto / Ilustrasi Profil */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 bg-gray-100 group">
            <Image 
              src="/unit-smk.jpg" // Bisa disesuaikan dengan foto profil unit
              alt="Profil Madrasah"
              fill
              className="object-cover object-center group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* Kolom Kanan: Teks Profil, Visi, Misi */}
        <div className="lg:col-span-7 space-y-6">
          <span className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border ${t.badge}`}>
            Profil Singkat Madrasah
          </span>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${t.accentText}`}>
            Mengenal Lebih Dekat Sekolah Kami
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {profile}
          </p>

          {/* Kotak Visi */}
          <div className={`p-6 rounded-2xl border-l-4 shadow-sm ${t.quoteBorder}`}>
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">Visi Utama</h4>
            <p className="text-gray-700 italic text-sm sm:text-base">
              &ldquo;{vision}&rdquo;
            </p>
          </div>

          {/* Daftar Misi */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Misi Pendidikan</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {missions.map((mission, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0 ${t.missionCheck}`}>
                    ✓
                  </span>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}