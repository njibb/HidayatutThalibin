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
import ScrollReveal from '@/app/components/scrollreveal'; // Animasi Scroll
import { miData } from '@/app/data/miData';
import { miAgendaData } from '@/app/data/miagendadata';

export default function MIPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Ditambahkan theme="emerald" agar Navbar menyesuaikan warna hijau MI */}
      <UnitNavbar unitName={miData.shortName} unitCode={miData.code} theme="emerald" />
      
      {/* Hero Section */}
      <UnitHero 
        name={miData.name} 
        tagline={miData.tagline} 
        bgImage="/mibg.jpg"
        theme="emerald" // Ditambahkan theme="emerald" agar garis aksen hero menjadi hijau
      />
      
      {/* Profil Madrasah */}
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

      {/* Program Unggulan */}
      <ScrollReveal delay={0.1}>
        <UnitProgram 
          programs={miData.excellencePrograms} 
          theme="emerald" 
          bgImage="/mibg.jpg" 
        />
      </ScrollReveal>

      {/* Struktur Organisasi */}
      <ScrollReveal>
        <div id="struktur">
          <UnitStruktur 
            theme="emerald"
            pimpinanPuncak={{ name: "H. Ahmad Fauzi, S.Pd.I.", role: "Kepala Madrasah" }}
            komite={{ name: "Drs. H. M. Ridwan", role: "Ketua Komite" }}
            wakilDanTu={[
              { name: "Nurul Hidayah, S.Pd.", role: "Bid. Kurikulum" },
              { name: "M. Zarkasih, S.Ag.", role: "Bid. Kesiswaan" },
              { name: "Siti Aminah", role: "Kepala TU" },
            ]}
            waliKelas={[
              { name: "Fauziah, S.Pd.", role: "Wali Kelas 1-3" },
              { name: "Ahmad Dani, S.Pd.", role: "Wali Kelas 4-6" },
            ]}
          />
        </div>
      </ScrollReveal>

      {/* Fasilitas Madrasah */}
      <ScrollReveal>
        <div id="fasilitas">
          <UnitFasilitas facilities={miData.facilities} theme="emerald" />
        </div>
      </ScrollReveal>

      {/* Berita & Galeri Polaroid */}
      <ScrollReveal>
        <div id="berita">
          <UnitGaleri theme="emerald" />
        </div>
      </ScrollReveal>

      {/* Kalender Akademik */}
      <ScrollReveal>
        <div id="kalender">
        <UnitJadwalKalenderAkademik agendaList={miAgendaData as any} theme="emerald" />
        </div>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <Footer theme="emerald" />
      </ScrollReveal>

      <ChatbotWidget />
    </main>
  );
}