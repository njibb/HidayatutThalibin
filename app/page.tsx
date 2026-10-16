import Navbar from './components/navbar';
import Hero from './components/hero';
import UnitSection from './components/unitsection';
import Footer from './components/footer';
import ChatbotWidget from './components/chatbotwidget';
import ScrollReveal from './components/scrollreveal'; // <-- Import komponen transisi
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] relative text-gray-950 overflow-hidden">
      <Navbar />
      
      {/* Hero Section biasanya dibiarkan tampil langsung di awal */}
      <Hero />
      
      {/* Bagian Profil Singkat dengan Transisi Scroll */}
      <ScrollReveal>
        <section id="profil" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative bg-[#5C4033] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-[#7B5846]">
            
            <div className="absolute inset-0 bg-[radial-gradient(#7B5846_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <span className="inline-block bg-[#A47E3B]/80 text-[#FDFBF7] text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#C5A880]">
                  Sejarah Singkat Pendirian
                </span>
                
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed tracking-wide text-[#F9F6F0]">
                  &ldquo;Yayasan Hidayatut Thalibin didirikan dengan visi besar untuk menjadi pelita ilmu dan wadah pembentukan generasi yang berakhlak mulia, unggul, serta berwawasan luas.&rdquo;
                </blockquote>

                <p className="text-[#EADBC8] text-sm sm:text-base leading-relaxed">
                  Berawal dari semangat kebersamaan para tokoh pendiri dalam memajukan pendidikan keagamaan dan umum, yayasan ini terus berkembang secara konsisten. Hingga saat ini, kami menaungi empat unit pendidikan terpadu—mulai dari tingkat Taman Kanak-Kanak (TK) hingga Sekolah Menengah Kejuruan (SMK)—guna memberikan layanan pendidikan yang berkesinambungan bagi masyarakat.
                </p>

                <div className="pt-2">
                  <span className="block font-bold text-white text-base">Almarhum / Pendiri Yayasan</span>
                  <span className="block text-xs text-[#D8C4B6]">Perintis & Sesepuh Yayasan Hidayatut Thalibin</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative w-48 h-56 sm:w-60 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#A47E3B]/50 bg-[#3F2E26] group">
                  <Image 
                    src="/pendiri.jpg" 
                    alt="Pendiri Yayasan Hidayatut Thalibin" 
                    fill
                    className="object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Unit Section dengan Transisi Scroll */}
      <ScrollReveal delay={0.1}>
        <UnitSection />
      </ScrollReveal>
      
      {/* Footer dengan Transisi Scroll */}
      <ScrollReveal>
        <Footer theme="warm" />
      </ScrollReveal>

      <ChatbotWidget />
    </main>
  );
}