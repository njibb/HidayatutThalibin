"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Shield, Zap, ArrowRight, X, LucideIcon } from "lucide-react";
import Image from "next/image";

interface ProgramItem {
  title: string;
  description: string;
  detailContent?: string;
  Icon?: LucideIcon;
}

interface UnitProgramProps {
  programs: ProgramItem[];
  theme?: "emerald" | "blue" | "warm" | "amber" | "purple";
  bgImage?: string;
}

export default function UnitProgram({ programs, theme = "blue", bgImage }: UnitProgramProps) {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const fallbackIcons = [Layout, Shield, Zap, Layout, Shield, Zap, Layout];

  const themeStyles = {
    blue: {
      badge: "bg-blue-900/80 text-blue-100 border-blue-700/50 backdrop-blur-md",
      titleColor: "text-white",
      descColor: "text-blue-100/80",
      hoverIconBg: "group-hover:bg-blue-600 group-hover:text-white",
      lineColor: "bg-blue-500",
    },
    emerald: {
      badge: "bg-emerald-900/80 text-emerald-100 border-emerald-700/50 backdrop-blur-md",
      titleColor: "text-white",
      descColor: "text-emerald-100/80",
      hoverIconBg: "group-hover:bg-emerald-600 group-hover:text-white",
      lineColor: "bg-emerald-500",
    },
    amber: {
      badge: "bg-amber-900/80 text-amber-100 border-amber-700/50 backdrop-blur-md",
      titleColor: "text-white",
      descColor: "text-amber-100/80",
      hoverIconBg: "group-hover:bg-amber-600 group-hover:text-white",
      lineColor: "bg-amber-500",
    },
    purple: {
      badge: "bg-purple-900/80 text-purple-100 border-purple-700/50 backdrop-blur-md",
      titleColor: "text-white",
      descColor: "text-purple-100/80",
      hoverIconBg: "group-hover:bg-purple-600 group-hover:text-white",
      lineColor: "bg-purple-500",
    },
    warm: {
      badge: "bg-[#5C4033]/80 text-[#FDFBF7] border-[#7B5846]/50 backdrop-blur-md",
      titleColor: "text-white",
      descColor: "text-[#EADBC8]",
      hoverIconBg: "group-hover:bg-[#8B5A2B] group-hover:text-white",
      lineColor: "bg-[#8B5A2B]",
    }
  };

  const t = themeStyles[theme] || themeStyles.blue;

  return (
    <section id="program" className="relative py-28 px-6 overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage} 
            alt="Background Program Unggulan" 
            fill 
            className="object-cover object-center filter blur-md scale-105 brightness-50"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className={`inline-block text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border mb-3 ${t.badge}`}>
            Keunggulan Madrasah
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${t.titleColor}`}>
            Program Unggulan Pilihan
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-xl mx-auto ${t.descColor}`}>
            Pilar pembentukan karakter, intelektual, dan kompetensi peserta didik secara menyeluruh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((prog, idx) => {
            const IconComponent = prog.Icon || fallbackIcons[idx % fallbackIcons.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProgram(prog)}
                className="relative bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between h-full border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${t.lineColor}`} />

                <div>
                  <div className={`mb-5 w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-800 transition-all duration-500 ease-out shadow-sm ${t.hoverIconBg}`}>
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {prog.title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light mb-6 line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-gray-900 uppercase tracking-widest">
                  <span className="relative">
                    Eksplor Program
                    <span className="absolute bottom-0 left-0 w-full h-px bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </span>
                  <div className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-gray-900 overflow-hidden"
            >
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <span className="inline-block text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full mb-3 uppercase tracking-wider">
                Detail Program Unggulan
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-900">
                {selectedProgram.title}
              </h3>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                {selectedProgram.detailContent ? (
                  selectedProgram.detailContent.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <p>{selectedProgram.description}</p>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl transition-colors shadow-md"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}