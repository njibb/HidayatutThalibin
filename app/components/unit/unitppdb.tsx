/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { CheckCircle2, Loader2, School } from "lucide-react";

export default function UnitPPDB() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ppdbData, setPpdbData] = useState<Record<string, any[]>>({
    tk: [],
    sd: [],
    mi: [],
    mts: []
  });
  const [activeUnit, setActiveUnit] = useState<string>("tk");
  const [isLoading, setIsLoading] = useState(true);

  const units = [
    { id: "tk", label: "TK" },
    { id: "sd", label: "SD" },
    { id: "mi", label: "MI" },
    { id: "mts", label: "MTs" }
  ];

  useEffect(() => {
    const fetchAllPPDB = async () => {
      setIsLoading(true);
      try {
        // Fetch ke 4 unit secara paralel (bersamaan)
        const fetchPromises = units.map(u => fetch(`/api/proxy-ppdb/${u.id}`));
        const responses = await Promise.all(fetchPromises);
        
        const newData: Record<string, any[]> = { tk: [], sd: [], mi: [], mts: [] };
        
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
                Belum ada data paket PPDB untuk unit {units.find(u => u.id === activeUnit)?.label}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                {currentList.map((paket, index) => (
                  <div 
                    key={paket._id || index} 
                    className="bg-[#F5F2EB]/50 border border-[#8B5A2B]/20 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#8B5A2B] transition-all"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 capitalize">
                      {paket.namaPaket || "Paket Standar"}
                    </h3>
                    <div className="text-3xl font-black text-[#8B5A2B] mb-6">
                      Rp {paket.harga ? parseInt(paket.harga).toLocaleString('id-ID') : "0"}
                    </div>
                    
                    {paket.fasilitas && paket.fasilitas.length > 0 && (
                      <ul className="space-y-3">
                        {paket.fasilitas.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-[#8B5A2B] shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm md:text-base leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}