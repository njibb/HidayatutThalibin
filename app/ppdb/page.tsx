import React from "react";
import Navbar from "../components/navbar"; 
import UnitPPDB from "../components/unit/unitppdb";
import Footer from "../components/footer";
import ScrollReveal from "../components/scrollreveal";
import ChatbotWidget from "../components/chatbotwidget";

export default function PPDBPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] relative text-gray-950 overflow-hidden">
      <Navbar />
      
      {/* Konten PPDB dibungkus dengan ScrollReveal */}
      <div className="pt-24 pb-12">
        <ScrollReveal>
          <UnitPPDB />
        </ScrollReveal>
      </div>

      {/* Footer dibungkus dengan ScrollReveal */}
      <ScrollReveal delay={0.1}>
        <Footer theme="warm" />
      </ScrollReveal>

      {/* Chatbot disamakan dengan halaman utama */}
      <ChatbotWidget theme="warm"/>
    </main>
  );
}