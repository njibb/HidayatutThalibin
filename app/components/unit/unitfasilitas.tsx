"use client";
import React, { useState } from 'react';
import { FaSchool, FaMosque, FaBasketballBall, FaUtensils, FaLaptop, FaChalkboardTeacher, FaStore } from 'react-icons/fa';

interface FasilitasItem {
  name: string;
  desc: string;
  image?: string;
}

interface UnitFasilitasProps {
  facilities: FasilitasItem[];
  theme?: "warm" | "emerald" | "blue" | "amber" | "purple";
}

export default function UnitFasilitas({ facilities, theme = "emerald" }: UnitFasilitasProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const icons = [
    <FaSchool key={0} size={18} className="text-white" />,
    <FaMosque key={1} size={18} className="text-white" />,
    <FaBasketballBall key={2} size={18} className="text-white" />,
    <FaUtensils key={3} size={18} className="text-white" />,
    <FaLaptop key={4} size={18} className="text-white" />,
    <FaChalkboardTeacher key={5} size={18} className="text-white" />,
    <FaStore key={6} size={18} className="text-white" />,
  ];

  const themeClasses = {
    blue: {
      badge: "bg-blue-100 text-blue-800",
      title: "text-blue-950",
    },
    emerald: {
      badge: "bg-emerald-100 text-emerald-800",
      title: "text-emerald-950",
    },
    amber: {
      badge: "bg-amber-100 text-amber-800",
      title: "text-amber-950",
    },
    purple: {
      badge: "bg-purple-100 text-purple-800",
      title: "text-purple-950",
    },
    warm: {
      badge: "bg-[#EADBC8] text-[#5C4033]",
      title: "text-[#5C4033]",
    }
  };

  const t = themeClasses[theme] || themeClasses.emerald;

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className={`text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider ${t.badge}`}>
          Sarana & Prasarana
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 mb-3 ${t.title}`}>
          Fasilitas Unggulan Madrasah
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
          Ketuk pada salah satu fasilitas di bawah untuk melihat detail ruangan secara interaktif.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full md:h-[450px] items-stretch overflow-hidden rounded-3xl shadow-2xl bg-gray-950 relative gap-2 md:gap-0 p-2 md:p-0">
        {facilities.map((fac, index) => {
          const isActive = activeIndex === index;
          const bgImg = fac.image || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80";

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                relative flex flex-col justify-end overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
                rounded-2xl md:rounded-none border-2 ${isActive ? 'border-white' : 'border-gray-800/80'}
              `}
              style={{
                backgroundImage: `url('${bgImg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: isActive ? '280px' : '75px',
              }}
            >
              <style jsx>{`
                @media (min-width: 768px) {
                  div[style*="background-image"] {
                    height: 100% !important;
                    flex: ${isActive ? '7 1 0%' : '1 1 0%'} !important;
                    background-size: ${isActive ? 'auto 100%' : 'auto 120%'} !important;
                  }
                }
              `}</style>

              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  background: isActive 
                    ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' 
                    : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)'
                }}
              />

              <div className="absolute left-0 right-0 bottom-4 sm:bottom-6 flex items-center justify-start z-20 px-4 sm:px-5 gap-3 w-full">
                <div className="min-w-[40px] w-[40px] h-[40px] sm:min-w-[44px] sm:w-[44px] sm:h-[44px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg flex-shrink-0">
                  {icons[index % icons.length]}
                </div>
                
                <div className="text-white relative overflow-hidden">
                  <h3 
                    className="font-bold text-sm sm:text-lg md:text-xl transition-all duration-500"
                    style={{ opacity: isActive ? 1 : 0.95 }}
                  >
                    {fac.name}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm text-gray-200 transition-all duration-500 mt-0.5"
                    style={{
                      opacity: isActive ? 1 : 0,
                      maxHeight: isActive ? '80px' : '0px',
                      overflow: 'hidden'
                    }}
                  >
                    {fac.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}