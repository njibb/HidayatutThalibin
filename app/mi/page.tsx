/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import UnitNavbar from '@/app/components/unit/unitnavbar';
import UnitHero from '@/app/components/unit/unithero';
import UnitProfile from '@/app/components/unit/unitprofile';
import UnitProgram from '@/app/components/unit/unitprogram';
import UnitStruktur from '@/app/components/unit/unitstruktur';
import UnitFasilitas from '@/app/components/unit/unitfasilitas';
import UnitGaleri from '@/app/components/unit/unitgaleri'; 
import UnitJadwalKalenderAkademik from '@/app/components/unit/unitjadwalkalenderakademik'; 
import Footer from '@/app/components/footer';
import ChatbotWidget from '@/app/components/chatbotwidget';
import ScrollReveal from '@/app/components/scrollreveal'; 
import { miData } from '@/app/data/miData';

// Komponen mandiri untuk meload data struktur organisasi dari Database Admin CMS (Khusus MI)
function DynamicUnitStruktur() {
  const [strukturData, setStrukturData] = useState({
    pimpinanPuncak: { name: "Memuat...", role: "Pimpinan" },
    komite: undefined as { name: string; role: string } | undefined,
    wakilDanTu: [] as { name: string; role: string }[],
    waliKelas: [] as { name: string; role: string }[]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        // Tembak proxy structure dengan unit 'mi'
        const response = await fetch('/api/proxy-structure/mi', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.status === 1) {
          const data = result.data;
          const mapToProp = (item: any) => ({ name: item.nama, role: item.jabatan });

          const pimpinan = data.find((i: any) => i.kategori === 'pimpinan');
          const komite = data.find((i: any) => i.kategori === 'komite');
          const wakil = data.filter((i: any) => i.kategori === 'wakil_tu').map(mapToProp);
          const wali = data.filter((i: any) => i.kategori === 'walikelas').map(mapToProp);

          setStrukturData({
            pimpinanPuncak: pimpinan ? mapToProp(pimpinan) : { name: "Belum Diisi", role: "Kepala Madrasah" },
            komite: komite ? mapToProp(komite) : undefined,
            wakilDanTu: wakil,
            waliKelas: wali
          });
        }
      } catch (error) {
        console.error("Gagal meload struktur publik MI:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-gray-400 font-medium text-sm animate-pulse">
        Memuat bagan struktur kepengurusan...
      </div>
    );
  }

  return (
    <UnitStruktur 
      theme="emerald"
      pimpinanPuncak={strukturData.pimpinanPuncak}
      komite={strukturData.komite}
      wakilDanTu={strukturData.wakilDanTu}
      waliKelas={strukturData.waliKelas}
    />
  );
}

export default function MIPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <UnitNavbar unitName={miData.shortName} unitCode={miData.code} theme="emerald" />
      
      <UnitHero 
        name={miData.name} 
        tagline={miData.tagline} 
        bgImage="/mibg.jpg"
        theme="emerald"
      />
      
      <ScrollReveal>
        <div id="profil">
          <UnitProfile 
            theme="emerald"
            profile={miData.profile} 
            vision={miData.vision} 
            missions={miData.missions} 
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <UnitProgram 
          programs={miData.excellencePrograms} 
          theme="emerald" 
          bgImage="/mibg.jpg" 
        />
      </ScrollReveal>

      {/* Struktur Organisasi Dinamis */}
      <ScrollReveal>
        <div id="struktur">
          <DynamicUnitStruktur />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div id="fasilitas">
          <UnitFasilitas facilities={miData.facilities} theme="emerald" />
        </div>
      </ScrollReveal>

      {/* Berita & Galeri Polaroid Dinamis (Kirim unitCode="mi") */}
      <ScrollReveal>
        <div id="berita">
          <UnitGaleri unitCode="mi" theme="emerald" />
        </div>
      </ScrollReveal>

      {/* Kalender Akademik Dinamis (Kirim unitCode="mi") */}
      <ScrollReveal>
        <div id="kalender">
          <UnitJadwalKalenderAkademik unitCode="mi" theme="emerald" />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <Footer theme="emerald" />
      </ScrollReveal>

      <ChatbotWidget theme="emerald" />
    </main>
  );
}