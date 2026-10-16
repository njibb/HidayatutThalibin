/* eslint-disable @typescript-eslint/no-explicit-any */
import UnitNavbar from '@/app/components/unit/unitnavbar';
import UnitHero from '@/app/components/unit/unithero';
import UnitProfile from '@/app/components/unit/unitprofile';
import UnitProgram from '@/app/components/unit/unitprogram';
import UnitStruktur from '@/app/components/unit/unitstruktur';
import UnitFasilitas from '@/app/components/unit/unitfasilitas';
import UnitGaleri from '@/app/components/unit/unitgaleri'; // Galeri Berita Polaroid
import UnitJadwalKalenderAkademik from '@/app/components/unit/unitjadwalkalenderakademik'; // Kalender Akademik
import Footer from '@/app/components/footer';
import ChatbotWidget from '@/app/components/chatbotwidget';
import ScrollReveal from '@/app/components/scrollreveal'; // <-- Import komponen transisi scroll
import { mtsData } from '@/app/data/mtsData';
import { mtsAgendaData } from '@/app/data/mtsagendadata';

export default function MtsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <UnitNavbar unitName={mtsData.shortName} unitCode={mtsData.code} />
      
      {/* Hero section dibiarkan tampil langsung di awal */}
      <UnitHero 
        name={mtsData.name}
        tagline={mtsData.tagline}
        bgImage="/mtsbg.jpg"      
      />
      
      {/* Profil Madrasah */}
      <ScrollReveal>
        <div id="profil">
          <UnitProfile 
            theme="blue"
            profile={mtsData.profile} 
            vision={mtsData.vision} 
            missions={mtsData.missions} 
          />
        </div>
      </ScrollReveal>

      {/* Program Unggulan */}
      <ScrollReveal delay={0.1}>
        <UnitProgram 
          programs={mtsData.excellencePrograms} 
          theme="blue" 
          bgImage="/mtsbg.jpg" 
        />
      </ScrollReveal>

      {/* Struktur Organisasi */}
      <ScrollReveal>
        <div id="struktur">
          <UnitStruktur 
            theme="blue"
            pimpinanPuncak={{ name: "Dra. Tasmiyah", role: "Kepala Madrasah" }}
            komite={{ name: "Tri Masnawati, S.E.", role: "Ketua Komite" }}
            wakilDanTu={[
              { name: "Siti Lia Mudrika, M.A.", role: "Bid. Kurikulum" },
              { name: "Fathimah, S.Ag.", role: "Bid. Kesiswaan" },
              { name: "Buchori", role: "Kepala TU" },
            ]}
            waliKelas={[
              { name: "Romiyah, S.Ag.", role: "Wali Kelas 7" },
              { name: "Endah Suryanti Ardi, S.Pd.", role: "Wali Kelas 8" },
              { name: "Fathimah, S.Ag.", role: "Wali Kelas 9" },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Fasilitas Madrasah */}
      <ScrollReveal>
        <div id="fasilitas">
          <UnitFasilitas facilities={mtsData.facilities} theme="blue" />
        </div>
      </ScrollReveal>

      {/* Berita & Galeri Polaroid */}
      <ScrollReveal>
        <div id="berita">
          <UnitGaleri theme="blue" />
        </div>
      </ScrollReveal>

      {/* Kalender Akademik */}
      <ScrollReveal>
        <div id="kalender">
         <UnitJadwalKalenderAkademik agendaList={mtsAgendaData as any} theme="blue" />
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <Footer theme="blue" />
      </ScrollReveal>

      <ChatbotWidget />
    </main>
  );
}