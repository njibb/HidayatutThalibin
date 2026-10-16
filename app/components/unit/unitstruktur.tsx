"use client";
import React from "react";

interface StrukturMember {
  name: string;
  role: string;
}

interface UnitStrukturProps {
  theme?: "emerald" | "blue" | "amber" | "purple";
  pimpinanPuncak: StrukturMember;
  komite?: StrukturMember;
  wakilDanTu: StrukturMember[];
  waliKelas?: StrukturMember[];
}

export default function UnitStruktur({ 
  theme = "emerald", 
  pimpinanPuncak, 
  komite, 
  wakilDanTu, 
  waliKelas,
}: UnitStrukturProps) {

  const themeClasses: Record<string, {
    badgeBg: string;
    containerBg: string;
    primaryBox: string;
    primarySub: string;
    secondaryBox: string;
    lineColor: string;
    cardHover: string;
    tagBg: string;
    altBox: string;
    altSub: string;
    roleColor: string;
    activeBadge: string;
  }> = {
    emerald: {
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      containerBg: "bg-gradient-to-b from-emerald-50/40 to-white border-emerald-100",
      primaryBox: "bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border-emerald-700/50 shadow-emerald-900/20",
      primarySub: "text-emerald-300",
      secondaryBox: "bg-white text-emerald-950 border-emerald-200 shadow-emerald-900/5",
      lineColor: "bg-emerald-400",
      cardHover: "hover:border-emerald-400 hover:shadow-emerald-100",
      tagBg: "bg-emerald-100 text-emerald-800",
      altBox: "bg-emerald-900 text-white border-emerald-800",
      altSub: "text-emerald-300",
      roleColor: "text-emerald-600",
      activeBadge: "bg-emerald-900 text-white"
    },
    blue: {
      badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
      containerBg: "bg-gradient-to-b from-blue-50/40 to-white border-blue-100",
      primaryBox: "bg-gradient-to-br from-blue-900 to-blue-950 text-white border-blue-700/50 shadow-blue-900/20",
      primarySub: "text-blue-300",
      secondaryBox: "bg-white text-blue-950 border-blue-200 shadow-blue-900/5",
      lineColor: "bg-blue-400",
      cardHover: "hover:border-blue-400 hover:shadow-blue-100",
      tagBg: "bg-blue-100 text-blue-800",
      altBox: "bg-blue-900 text-white border-blue-800",
      altSub: "text-blue-300",
      roleColor: "text-blue-600",
      activeBadge: "bg-blue-900 text-white"
    },
    amber: {
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      containerBg: "bg-gradient-to-b from-amber-50/40 to-white border-amber-100",
      primaryBox: "bg-gradient-to-br from-amber-900 to-amber-950 text-white border-amber-700/50 shadow-amber-900/20",
      primarySub: "text-amber-300",
      secondaryBox: "bg-white text-amber-950 border-amber-200 shadow-amber-900/5",
      lineColor: "bg-amber-400",
      cardHover: "hover:border-amber-400 hover:shadow-amber-100",
      tagBg: "bg-amber-100 text-amber-800",
      altBox: "bg-amber-900 text-white border-amber-800",
      altSub: "text-amber-300",
      roleColor: "text-amber-600",
      activeBadge: "bg-amber-900 text-white"
    },
    purple: {
      badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
      containerBg: "bg-gradient-to-b from-purple-50/40 to-white border-purple-100",
      primaryBox: "bg-gradient-to-br from-purple-900 to-purple-950 text-white border-purple-700/50 shadow-purple-900/20",
      primarySub: "text-purple-300",
      secondaryBox: "bg-white text-purple-950 border-purple-200 shadow-purple-900/5",
      lineColor: "bg-purple-400",
      cardHover: "hover:border-purple-400 hover:shadow-purple-100",
      tagBg: "bg-purple-100 text-purple-800",
      altBox: "bg-purple-900 text-white border-purple-800",
      altSub: "text-purple-300",
      roleColor: "text-purple-600",
      activeBadge: "bg-purple-900 text-white"
    }
  };

  const t = themeClasses[theme] || themeClasses.emerald;

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto text-center">
      <div className="mb-16">
        <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border mb-3 ${t.badgeBg}`}>
          Organisasi Madrasah
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Struktur Kepengurusan
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
          Bagan Pimpinan, Dewan Guru, dan Staff Pengajar TP. 2025/2026
        </p>
      </div>

      <div className={`border rounded-[2.5rem] p-8 sm:p-14 shadow-xl shadow-gray-100 flex flex-col items-center relative overflow-hidden ${t.containerBg}`}>
        
        <div className="w-full flex flex-col items-center z-10">
          <div className={`relative ${t.primaryBox} px-8 py-5 rounded-3xl shadow-xl min-w-[280px] sm:min-w-[320px] border transform hover:-translate-y-1 transition-all duration-300`}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/20 text-[10px] uppercase tracking-widest font-semibold">
              Pucuk Pimpinan
            </div>
            <span className={`block text-xs uppercase tracking-widest font-bold mt-1 mb-1 ${t.primarySub}`}>
              {pimpinanPuncak.role}
            </span>
            <span className="block font-extrabold text-xl tracking-wide">
              {pimpinanPuncak.name}
            </span>
          </div>
        </div>

        <div className={`w-1 h-10 rounded-full ${t.lineColor} my-2 z-0`}></div>

        {komite && (
          <>
            <div className={`relative ${t.secondaryBox} px-7 py-4 rounded-2xl shadow-md min-w-[245px] sm:min-w-[280px] border transform hover:-translate-y-1 transition-all duration-300 z-10`}>
              <span className="block text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                {komite.role}
              </span>
              <span className="block font-bold text-base text-gray-900">
                {komite.name}
              </span>
            </div>
            <div className={`w-1 h-10 rounded-full ${t.lineColor} my-2 z-0`}></div>
          </>
        )}

        <div className="w-full max-w-4xl mt-2 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {wakilDanTu.map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-white/90 backdrop-blur-md text-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-center ${t.cardHover}`}
              >
                <span className={`block text-[11px] uppercase tracking-wider font-extrabold mb-1.5 ${t.roleColor}`}>
                  {item.role}
                </span>
                <span className="block font-bold text-base text-gray-800">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {waliKelas && waliKelas.length > 0 && (
          <>
            <div className={`w-1 h-10 rounded-full ${t.lineColor} my-6 z-0`}></div>
            
            <div className="w-full max-w-4xl z-10">
              <div className="text-center mb-6">
                <h4 className={`text-xs font-extrabold uppercase tracking-widest py-2 px-6 rounded-full inline-block shadow-sm ${t.tagBg}`}>
                  📚 Jajaran Wali Kelas
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {waliKelas.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`${t.altBox} p-5 rounded-2xl shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <span className={`block text-[11px] uppercase tracking-wider font-semibold mb-1 ${t.altSub}`}>
                      {item.role}
                    </span>
                    <span className="block font-bold text-base text-white">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className={`w-1 h-10 rounded-full ${t.lineColor} my-6 z-0`}></div>
        
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 z-10">
          <div className="bg-white text-gray-900 py-4 px-6 rounded-2xl shadow-md border border-gray-200/80 font-bold text-sm sm:text-base flex items-center justify-center gap-3">
            <span className="text-xl">👥</span> Dewan Guru & Staf Pengajar
          </div>
          <div className={`${t.activeBadge} py-4 px-6 rounded-2xl shadow-md font-bold text-sm sm:text-base flex items-center justify-center gap-3`}>
            <span className="text-xl">🎓</span> Seluruh Peserta Didik Aktif
          </div>
        </div>

      </div>
    </section>
  );
}