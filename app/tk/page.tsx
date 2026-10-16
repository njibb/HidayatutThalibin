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
import { tkData } from '@/app/data/tkdata';
import { tkAgendaData } from '@/app/data/tkagendadata';

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

      {/* Struktur Organisasi */}
      <ScrollReveal>
        <div id="struktur">
          <UnitStruktur 
            theme="amber"
            pimpinanPuncak={{ name: "Hj. Siti Aminah, S.Pd.AUD.", role: "Kepala Sekolah TK" }}
            komite={{ name: "Rina Marlina, S.E.", role: "Ketua Komite TK" }}
            wakilDanTu={[
              { name: "Dewi Lestari, S.Pd.", role: "Bid. Kurikulum PAUD" },
              { name: "Fitri Handayani, S.Pd.", role: "Bid. Kesiswaan" },
              { name: "Siti Rahma", role: "Administrasi" },
            ]}
            waliKelas={[
              { name: "Ani Suryani, S.Pd.", role: "Wali Kelas Kelompok A" },
              { name: "Rika Septiani, S.Pd.", role: "Wali Kelas Kelompok B" },
            ]}
          />
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
          <UnitJadwalKalenderAkademik agendaList={tkAgendaData as any} theme="amber" />
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <Footer theme="amber" />
      </ScrollReveal>

      <ChatbotWidget />
    </main>
  );
}