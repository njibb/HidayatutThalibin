"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Send, X, } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Halo! 👋 Saya Asisten AI Yayasan Hidayatut Thalibin. Ada yang bisa saya bantu seputar informasi sekolah atau pendaftaran PPDB?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Tambahkan pesan user
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulasi respons AI (Nanti bagian ini bisa dihubungkan ke API Groq AI milikmu)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Terima kasih pertanyaannya! Fitur AI Groq sedang bersiap merespons data PPDB Yayasan Hidayatut Thalibin.' }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Jendela Chat UI (Muncul saat tombol robot diklik) */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header Chat */}
          <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-800 border border-emerald-700 flex items-center justify-center">
                <Image 
                  src="/obot.png" 
                  alt="AI Bot" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Asisten AI Yayasan</h3>
                <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online - Groq AI Agent
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-200 hover:text-white transition p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Area Pesan Chat */}
          <div className="p-4 h-80 overflow-y-auto space-y-3 bg-gray-50/50 text-sm">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-800 text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Chat */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan seputar PPDB..."
              className="flex-grow px-4 py-2 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-800"
            />
            <button 
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-900 text-white p-2.5 rounded-full transition shadow-sm flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* 2. Tombol Floating Karakter Robot (Pojok Kanan Bawah) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 bg-emerald-800 hover:bg-emerald-900 rounded-full shadow-2xl border-4 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        title="Tanya Asisten AI"
      >
        {/* Gambar Karakter Robot */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-emerald-900 flex items-center justify-center">
          <Image 
            src="/obott.png" 
            alt="Chatbot Robot" 
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
        </div>

        {/* Indikator Notifikasi Titik Kecil */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-bounce"></span>
      </button>

    </div>
  );
}