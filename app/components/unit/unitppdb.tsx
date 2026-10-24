/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { CheckCircle2, Loader2, School } from "lucide-react";

export default function UnitPPDB() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ppdbData, setPpdbData] = useState<Record<string, any[]>>({
    tk: [],
    mi: [],
    mts: [],
    smk: []
  });
  const [activeUnit, setActiveUnit] = useState<string>("tk");
  const [isLoading, setIsLoading] = useState(true);

  const units = [
    { id: "tk", label: "TK" },
    { id: "mi", label: "MI" },
    { id: "mts", label: "MTs" },
    { id: "smk", label: "SMK" }
  ];

  useEffect(() => {
    const fetchAllPPDB = async () => {
      setIsLoading(true);
      try {
        const fetchPromises = units.map(u => fetch(`/api/proxy-ppdb/${u.id}`));
        const responses = await Promise.all(fetchPromises);
        
        // Sudah dikoreksi jadi tk, mi, mts, smk
        const newData: Record<string, any[]> = { tk: [], mi: [], mts: [], smk: [] };
        
        for (let i = 0; i < responses.length; i++) {
          const res = responses[i];
          const unitId = units[i].id;
          
          if (res.ok) {
            const result = await res.json();
            newData[unitId] = result.data ? result.data : (Array.isArray(result) ? result : []);
          }
        }
        
        setPpdbData(newData);
      } catch (error) {
        console.error("Gagal memuat data PPDB gabungan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPPDB();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentList = ppdbData[activeUnit] || [];

  return (
    <section className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2 drop-shadow-sm">
              Rincian Biaya Pendaftaran <br />
              <span className="text-5xl md:text-[5.5rem] font-extrabold mt-2 leading-none text-[#8B5A2B] inline-block drop-shadow-md">
                PPDB 2026/2027
              </span>
            </h1>
          </>
        }
      >
        <div className="flex flex-col h-full">
          {/* Bagian Tab Pemilihan Unit */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 border-b border-gray-100 pb-4 overflow-x-auto px-2">
            {units.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-sm
                  ${activeUnit === unit.id 
                    ? 'bg-[#8B5A2B] text-white scale-105 shadow-md' 
                    : 'bg-[#F5F2EB] text-gray-600 hover:bg-[#8B5A2B]/20 hover:text-[#8B5A2B]'
                  }
                `}
              >
                <School className="w-4 h-4" />
                {unit.label}
              </button>
            ))}
          </div>

          {/* Bagian Konten Paket (Grid) */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-[#8B5A2B] gap-3 min-h-[250px]">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="font-medium text-gray-600">Memuat data dari semua unit...</p>
              </div>
            ) : currentList.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 font-medium min-h-[250px]">
                Belum ada data pendaftaran aktif untuk unit {units.find(u => u.id === activeUnit)?.label}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                {currentList.map((ppdbDoc, index) => (
                  <React.Fragment key={ppdbDoc._id || index}>
                    {/* Melakukan mapping ke struktur data 'jalurPendaftaran' */}
                    {ppdbDoc.jalurPendaftaran && ppdbDoc.jalurPendaftaran.map((jalur: any, i: number) => {
                      
                      // Menghitung Total Biaya
                      const totalBiaya = (Number(jalur.biayaFormulir) || 0) + (Number(jalur.uangGedung) || 0) + (Number(jalur.biayaSpp) || 0);

                      return (
                        <div 
                          key={`${ppdbDoc._id}-${i}`} 
                          className="bg-[#F5F2EB]/50 border border-[#8B5A2B]/20 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#8B5A2B] transition-all"
                        >
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 capitalize">
                            Jalur: {jalur.namaJalur}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Estimasi Biaya Awal</p>
                          
                          <div className="text-3xl font-black text-[#8B5A2B] mb-6">
                            Rp {totalBiaya.toLocaleString('id-ID')}
                          </div>
                          
                          <ul className="space-y-3 border-t border-[#8B5A2B]/10 pt-5">
                            <li className="flex items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#8B5A2B] shrink-0" />
                                <span className="text-gray-700 text-sm md:text-base font-medium">Biaya Formulir</span>
                              </div>
                              <span className="font-bold text-gray-900">
                                Rp {Number(jalur.biayaFormulir || 0).toLocaleString('id-ID')}
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#8B5A2B] shrink-0" />
                                <span className="text-gray-700 text-sm md:text-base font-medium">Uang Gedung</span>
                              </div>
                              <span className="font-bold text-gray-900">
                                Rp {Number(jalur.uangGedung || 0).toLocaleString('id-ID')}
                              </span>
                            </li>
                            <li className="flex items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#8B5A2B] shrink-0" />
                                <span className="text-gray-700 text-sm md:text-base font-medium">SPP Bulan Pertama</span>
                              </div>
                              <span className="font-bold text-gray-900">
                                Rp {Number(jalur.biayaSpp || 0).toLocaleString('id-ID')}
                              </span>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}