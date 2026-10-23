
"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface DBAgendaItem {
  _id?: string;
  title: string;
  startDate: string;
  endDate: string;
  kategori: string;
  description?: string;
  unitCode?: string;
}

interface UnitJadwalKalenderAkademikProps {
  unitCode?: string; // e.g. "tk", "mi", "mts", "smk"
  theme?: "emerald" | "blue" | "amber" | "purple" | "warm";
}

export default function UnitJadwalKalenderAkademik({ unitCode = "tk", theme = "blue" }: UnitJadwalKalenderAkademikProps) {
  const fixedListBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const [selectedBulan, setSelectedBulan] = useState("September");
  const [tahun, setTahun] = useState(2026);
  const [rawAgendas, setRawAgendas] = useState<DBAgendaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data agenda dari Admin Backend API (bisa diganti URL hosting nanti)
  useEffect(() => {
    const fetchAgendas = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/proxy-agenda/${unitCode}`);
        const result = await response.json();
        
        // --- CEK INI DI BROWSER CONSOLE ---
        console.log("UNIT CODE YANG DIMINTA:", unitCode);
        console.log("DATA AGENDA DARI DATABASE:", result.data);
        
        if (response.ok && result.status === 1) {
          setRawAgendas(result.data || []);
        }
      } catch (error) {
        console.error("Gagal memuat agenda publik dari admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgendas();
  }, [unitCode]);

  const getMonthIndex = (bulanStr: string) => {
    const map: Record<string, number> = {
      januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
      juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
    };
    return map[bulanStr.toLowerCase()] ?? 0;
  };

  const monthIndex = getMonthIndex(selectedBulan);
  const firstDayOfMonth = new Date(tahun, monthIndex, 1).getDay();
  const totalDaysInMonth = new Date(tahun, monthIndex + 1, 0).getDate();

  // Filter agenda yang aktif/beririsan dengan bulan & tahun yang dipilih
  const monthStart = new Date(tahun, monthIndex, 1);
  monthStart.setHours(0, 0, 0, 0);
  const monthEnd = new Date(tahun, monthIndex + 1, 0);
  monthEnd.setHours(23, 59, 59, 999);

  const activeAgendas = rawAgendas.filter((item) => {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    return start <= monthEnd && end >= monthStart;
  });

  // Cek apakah suatu hari di kalender masuk ke dalam rentang agenda
  const getAgendaForDay = (day: number) => {
    const currentDate = new Date(tahun, monthIndex, day);
    currentDate.setHours(0, 0, 0, 0);

    return rawAgendas.filter((item) => {
      const start = new Date(item.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(item.endDate);
      end.setHours(23, 59, 59, 999);

      return currentDate >= start && currentDate <= end;
    });
  };

  // Helper Format Tanggal Rentang untuk ditampilkan di Timeline Kanan
  const formatDateRange = (startStr: string, endStr: string) => {
    const opt: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    
    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString('id-ID', opt);
    }
    return `${startDate.toLocaleDateString('id-ID', opt)} s/d ${endDate.toLocaleDateString('id-ID', opt)}`;
  };

  // Konfigurasi Tema Warna Kalender
  const themeStyles = {
    emerald: {
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      titleColor: "text-emerald-950",
      sidebar: "from-emerald-900 to-emerald-950 border-emerald-800/60",
      sidebarSub: "bg-emerald-950/60 border-emerald-800/60 text-emerald-300",
      activeButton: "bg-white text-emerald-950 font-bold shadow-md",
      dateCellActive: "bg-emerald-50 text-emerald-900 font-bold border border-emerald-200",
      timelineBorder: "border-emerald-500",
      timelineDot: "bg-emerald-600",
      badgeCount: "bg-emerald-100 text-emerald-800",
      hoverText: "group-hover:text-emerald-700"
    },
    blue: {
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      titleColor: "text-blue-950",
      sidebar: "from-blue-900 to-blue-950 border-blue-800/60",
      sidebarSub: "bg-blue-950/60 border-blue-800/60 text-blue-300",
      activeButton: "bg-white text-blue-950 font-bold shadow-md",
      dateCellActive: "bg-blue-50 text-blue-900 font-bold border border-blue-200",
      timelineBorder: "border-blue-500",
      timelineDot: "bg-blue-600",
      badgeCount: "bg-blue-100 text-blue-800",
      hoverText: "group-hover:text-blue-700"
    },
    amber: {
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      titleColor: "text-amber-950",
      sidebar: "from-amber-900 to-amber-950 border-amber-800/60",
      sidebarSub: "bg-amber-950/60 border-amber-800/60 text-amber-300",
      activeButton: "bg-white text-amber-950 font-bold shadow-md",
      dateCellActive: "bg-amber-50 text-amber-900 font-bold border border-amber-200",
      timelineBorder: "border-amber-500",
      timelineDot: "bg-amber-600",
      badgeCount: "bg-amber-100 text-amber-800",
      hoverText: "group-hover:text-amber-700"
    },
    purple: {
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      titleColor: "text-purple-950",
      sidebar: "from-purple-900 to-purple-950 border-purple-800/60",
      sidebarSub: "bg-purple-950/60 border-purple-800/60 text-purple-300",
      activeButton: "bg-white text-purple-950 font-bold shadow-md",
      dateCellActive: "bg-purple-50 text-purple-900 font-bold border border-purple-200",
      timelineBorder: "border-purple-500",
      timelineDot: "bg-purple-600",
      badgeCount: "bg-purple-100 text-purple-800",
      hoverText: "group-hover:text-purple-700"
    },
    warm: {
      badgeBg: "bg-[#F5F2EB] text-[#5C4033] border-[#E5DECD]",
      titleColor: "text-[#4A3525]",
      sidebar: "from-[#5C4033] to-[#3F2E26] border-[#7B5846]/60",
      sidebarSub: "bg-[#3F2E26]/60 border-[#7B5846]/60 text-[#D8C4B6]",
      activeButton: "bg-white text-[#5C4033] font-bold shadow-md",
      dateCellActive: "bg-[#F5F2EB] text-[#5C4033] font-bold border border-[#C5A880]",
      timelineBorder: "border-[#A47E3B]",
      timelineDot: "bg-[#8B5A2B]",
      badgeCount: "bg-[#EADBC8] text-[#5C4033]",
      hoverText: "group-hover:text-[#8B5A2B]"
    }
  };

  const ts = themeStyles[theme] || themeStyles.blue;

  return (
    <section id="kalender-akademik" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border mb-3 ${ts.badgeBg}`}>
          <CalendarIcon className="h-3.5 w-3.5" /> ACADEMIC CALENDAR
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${ts.titleColor}`}>
          Kalender Akademik Madrasah
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Pilih bulan di panel samping untuk melihat jadwal kalender interaktif beserta daftar kegiatan penting.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* SIDEBAR KIRI */}
        <div className={`lg:col-span-3 bg-gradient-to-b ${ts.sidebar} p-5 text-white flex flex-col justify-between`}>
          <div>
            <div className={`flex items-center justify-between ${ts.sidebarSub} px-3 py-2.5 rounded-xl border mb-4`}>
              <button onClick={() => setTahun((prev) => prev - 1)} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-extrabold text-base tracking-widest text-white">{tahun}</span>
              <button onClick={() => setTahun((prev) => prev + 1)} className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1">
              {fixedListBulan.map((bulan) => {
                const isSelected = selectedBulan.toLowerCase() === bulan.toLowerCase();
                return (
                  <button
                    key={bulan}
                    onClick={() => setSelectedBulan(bulan)}
                    className={cn(
                      "w-full text-left px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-between",
                      isSelected ? ts.activeButton : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <span>{bulan}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-1.5 text-[11px] text-white/70">
            <Info className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Titik merah = ada agenda kegiatan.</span>
          </div>
        </div>

        {/* TENGAH: GRID KALENDER */}
        <div className="lg:col-span-5 p-6 sm:p-8 border-r border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide">
                {selectedBulan} {tahun}
              </h3>
            </div>

            <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-400 mb-3 uppercase tracking-wider">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-sm font-medium">
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {Array.from({ length: totalDaysInMonth }).map((_, index) => {
                const day = index + 1;
                const agendasOnThisDay = getAgendaForDay(day);
                const hasAgenda = agendasOnThisDay.length > 0;

                return (
                  <div key={day} className="flex flex-col items-center justify-center relative h-10">
                    <span className={cn(
                      "h-8 w-8 flex items-center justify-center rounded-full transition-all",
                      hasAgenda ? ts.dateCellActive : "text-gray-700 hover:bg-gray-100"
                    )}>
                      {day}
                    </span>
                    {hasAgenda && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
            * Klik bulan di samping untuk melihat jadwal di tanggal lainnya.
          </div>
        </div>

        {/* KANAN: TIMELINE KEGIATAN */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-gray-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200/60">
              <h4 className="font-extrabold text-gray-900 text-base">
                {selectedBulan} {tahun}
              </h4>
              <Badge className={`${ts.badgeCount} text-[10px] font-bold px-2.5 py-0.5 border-0`}>
                {activeAgendas.length} Agenda
              </Badge>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="text-center py-16 text-gray-400 text-xs">Memuat agenda...</div>
              ) : activeAgendas.length > 0 ? (
                activeAgendas.map((item, idx) => (
                  <div key={item._id || idx} className={`relative pl-5 border-l-2 ${ts.timelineBorder} py-1 group`}>
                    <div className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ${ts.timelineDot} border-2 border-white shadow-sm`} />
                    
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 mb-0.5">
                      <Clock className="h-3 w-3" /> {formatDateRange(item.startDate, item.endDate)}
                    </span>
                    <h5 className={`font-bold text-gray-900 text-sm leading-snug ${ts.hoverText} transition-colors`}>
                      {item.title}
                    </h5>
                    {item.description && (
                      <p className="text-[11px] text-gray-500 mt-0.5 italic">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-xs">Tidak ada agenda kegiatan pada bulan {selectedBulan} {tahun}.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-gray-200 text-right">
            <span className="text-[10px] text-gray-400 font-medium">
              Yayasan Hidayatut Thalibin
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}