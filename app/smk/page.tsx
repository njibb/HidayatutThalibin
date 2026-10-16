/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { smkData } from '@/app/data/smkdata';
import { smkAgendaData } from '@/app/data/smkagendadata';

export default function SMKPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Navbar dengan tema Unggu (Purple) */}
      <UnitNavbar unitName={smkData.shortName} unitCode={smkData.code} theme="purple" />
      
      {/* Hero Section */}
      <UnitHero 
        name={smkData.name} 
        tagline={smkData.tagline} 
        bgImage="/unit-smk.jpg"      
        theme="purple"
      />
      
      {/* Profil Sekolah */}
      <ScrollReveal>
        <div id="profil">
          <UnitProfile 
            theme="purple"
            profile={smkData.profile} 
            vision={smkData.vision} 
            missions={smkData.missions} 
          />
        </div>
      </ScrollReveal>

      {/* Program Keahlian / Unggulan */}
      <ScrollReveal delay={0.1}>
        <UnitProgram 
          programs={smkData.excellencePrograms} 
          theme="purple" 
          bgImage="/unit-smk.jpg" 
        />
      </ScrollReveal>

      {/* Struktur Organisasi */}
      <ScrollReveal>
        <div id="struktur">
          <UnitStruktur 
            theme="purple"
            pimpinanPuncak={{ name: "Dr. H. M. Ichsan, M.Pd.", role: "Kepala SMK" }}
            komite={{ name: "Ir. H. Budi Santoso", role: "Ketua Komite" }}
            wakilDanTu={[
              { name: "Dra. Hj. Nuraini", role: "Bid. Kurikulum" },
              { name: "Arief Rahman, S.Kom.", role: "Bid. Hubin / Humas" },
              { name: "Dewi Lestari, S.E.", role: "Kepala TU" },
            ]}
            waliKelas={[
              { name: "Rian Hidayat, S.T.", role: "Kaprog. Teknik Komputer" },
              { name: "Siti Rahma, S.Pd.", role: "Kaprog. Manajemen Perkantoran" },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Fasilitas Sekolah */}
      <ScrollReveal>
        <div id="fasilitas">
          <UnitFasilitas facilities={smkData.facilities} theme="purple" />
        </div>
      </ScrollReveal>

      {/* Berita & Galeri Polaroid */}
      <ScrollReveal>
        <div id="berita">
          <UnitGaleri theme="purple" />
        </div>
      </ScrollReveal>

      {/* Kalender Akademik */}
      <ScrollReveal>
        <div id="kalender">
          <UnitJadwalKalenderAkademik agendaList={smkAgendaData as any} theme="purple" />
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <Footer theme="purple" />
      </ScrollReveal>

      <ChatbotWidget />
    </main>
  );
}