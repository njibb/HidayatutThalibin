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
import { tkData } from '@/app/data/tkdata';

// Komponen mandiri untuk meload data struktur organisasi dari Database Admin CMS
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
        // Menembak proxy structure unit 'tk'
        const response = await fetch('/api/proxy-structure/tk', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.status === 1) {
          const data = result.data;
          const mapToProp = (item: any) => ({ name: item.nama, role: item.jabatan });

          // Memilah data berdasarkan kategori yang disimpan dari panel Admin
          const pimpinan = data.find((i: any) => i.kategori === 'pimpinan');
          const komite = data.find((i: any) => i.kategori === 'komite');
          const wakil = data.filter((i: any) => i.kategori === 'wakil_tu').map(mapToProp);
          const wali = data.filter((i: any) => i.kategori === 'walikelas').map(mapToProp);

          setStrukturData({
            pimpinanPuncak: pimpinan ? mapToProp(pimpinan) : { name: "Belum Diisi", role: "Kepala Sekolah" },
            komite: komite ? mapToProp(komite) : undefined,
            wakilDanTu: wakil,
            waliKelas: wali
          });
        }
      } catch (error) {
        console.error("Gagal meload struktur publik:", error);
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
      theme="amber"
      pimpinanPuncak={strukturData.pimpinanPuncak}
      komite={strukturData.komite}
      wakilDanTu={strukturData.wakilDanTu}
      waliKelas={strukturData.waliKelas}
    />
  );
}

export default function TKPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Navbar dengan tema Kuning (Amber) */}
      <UnitNavbar unitName={tkData.shortName} unitCode={tkData.code} theme="amber" />
      
      {/* Hero Section */}
      <UnitHero 
        name={tkData.name} 
        tagline={tkData.tagline} 
        bgImage="/unit-tk.jpg"       
        theme="amber"
      />
      
      {/* Profil Sekolah */}
      <ScrollReveal>
        <div id="profil">
          <UnitProfile 
            theme="amber"
            profile={tkData.profile} 
            vision={tkData.vision} 
            missions={tkData.missions} 
          />
        </div>
      </ScrollReveal>

      {/* Program Unggulan */}
      <ScrollReveal delay={0.1}>
        <UnitProgram 
          programs={tkData.excellencePrograms} 
          theme="amber" 
          bgImage="/unit-tk.jpg" 
        />
      </ScrollReveal>

      {/* Struktur Organisasi (Dinamis dari Admin CMS) */}
      <ScrollReveal>
        <div id="struktur">
          <DynamicUnitStruktur />
        </div>
      </ScrollReveal>

      {/* Fasilitas Sekolah */}
      <ScrollReveal>
        <div id="fasilitas">
          <UnitFasilitas facilities={tkData.facilities} theme="amber" />
        </div>
      </ScrollReveal>

      {/* Berita & Galeri Polaroid */}
      <ScrollReveal>
        <div id="berita">
          <UnitGaleri theme="amber" />
        </div>
      </ScrollReveal>

     {/* Kalender Akademik */}
      <ScrollReveal>
        <div id="kalender">
          <UnitJadwalKalenderAkademik unitCode={tkData.code} theme="amber" />
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <Footer theme="amber" />
      </ScrollReveal>

      <ChatbotWidget theme="amber" />
    </main>
  );
}