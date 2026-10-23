"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, X, Loader2 } from 'lucide-react';

interface ChatbotWidgetProps {
  theme?: "blue" | "emerald" | "amber" | "purple" | "warm" | "default";
}

export default function ChatbotWidget({ theme = "default" }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState<Array<{ id: string; role: string; content: string }>>([
    { id: '1', role: 'assistant', content: 'Halo! 👋 Saya A.B.I (Asisten Belajar Interaktif) Yayasan Hidayatut Thalibin. Ada yang bisa saya bantu seputar informasi sekolah atau pendaftaran PPDB?' }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessageText = inputText;
    setInputText("");

    const newUserMessage = { id: Date.now().toString(), role: 'user', content: userMessageText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Gagal terhubung ke server AI');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponseText = "";

      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          aiResponseText += chunk;

          setMessages(prev => 
            prev.map(msg => msg.id === aiMessageId ? { ...msg, content: aiResponseText } : msg)
          );
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Maaf, terjadi kendala koneksi ke server AI. Silakan coba beberapa saat lagi ya! 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const themeStyles = {
    blue: { headerBg: "bg-blue-600", headerText: "text-blue-100", btnBg: "bg-blue-600 hover:bg-blue-700", userMsgBg: "bg-blue-600 text-white", avatarBg: "bg-blue-50", ringFocus: "focus:ring-blue-500" },
    emerald: { headerBg: "bg-emerald-600", headerText: "text-emerald-100", btnBg: "bg-emerald-600 hover:bg-emerald-700", userMsgBg: "bg-emerald-600 text-white", avatarBg: "bg-emerald-50", ringFocus: "focus:ring-emerald-500" },
    amber: { headerBg: "bg-amber-500", headerText: "text-amber-100", btnBg: "bg-amber-600 hover:bg-amber-700", userMsgBg: "bg-amber-600 text-white", avatarBg: "bg-amber-50", ringFocus: "focus:ring-amber-500" },
    purple: { headerBg: "bg-purple-600", headerText: "text-purple-100", btnBg: "bg-purple-600 hover:bg-purple-700", userMsgBg: "bg-purple-600 text-white", avatarBg: "bg-purple-50", ringFocus: "focus:ring-purple-500" },
    warm: { headerBg: "bg-[#8B5A2B]", headerText: "text-[#F5F2EB]", btnBg: "bg-[#8B5A2B] hover:bg-[#5C4033]", userMsgBg: "bg-[#8B5A2B] text-white", avatarBg: "bg-[#F5F2EB]", ringFocus: "focus:ring-[#8B5A2B]" },
    default: { headerBg: "bg-gray-800", headerText: "text-gray-300", btnBg: "bg-gray-800 hover:bg-gray-900", userMsgBg: "bg-gray-800 text-white", avatarBg: "bg-gray-100", ringFocus: "focus:ring-gray-500" }
  };

  const t = themeStyles[theme];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. NOTIFIKASI KECIL (TOOLTIP) */}
      {!isOpen && showNotification && (
        <div className={`relative mb-4 mr-2 animate-bounce flex items-center shadow-lg rounded-2xl py-2.5 px-4 ${t.headerBg} text-white text-sm font-medium z-40`}>
          <span>Ayo ngobrol dengan A.B.I! ✨</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Mencegah klik tembus ke bawah
              setShowNotification(false);
            }}
            className="ml-3 p-1 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Segitiga panah ke bawah */}
          <div className={`absolute -bottom-1.5 right-6 w-3.5 h-3.5 ${t.headerBg} transform rotate-45`}></div>
        </div>
      )}

      {isOpen && (
        /* 2. CHAT WINDOW (FULLSCREEN DI MOBILE, FLOATING DI DESKTOP) */
        <div className="fixed inset-0 z-[100] sm:relative sm:inset-auto sm:z-auto sm:mb-4 w-full h-[100dvh] sm:h-[500px] sm:w-96 bg-white sm:rounded-3xl shadow-2xl border-0 sm:border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in sm:slide-in-from-bottom-5">
          
          <div className={`${t.headerBg} text-white p-4 flex items-center justify-between transition-colors duration-300`}>
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 rounded-full overflow-hidden ${t.avatarBg} border-2 border-white flex items-center justify-center shadow-sm`}>
                <Image src="/obot.png" alt="AI Bot Avatar" fill className="object-contain p-1" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">A.B.I - Asisten AI</h3>
                <span className={`flex items-center gap-1 text-[11px] ${t.headerText}`}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Online - Gemini AI
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`${t.headerText} hover:text-white transition p-1`}>
              <X className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className={`w-6 h-6 rounded-full ${t.avatarBg} border border-gray-200 flex-shrink-0 mr-2 relative overflow-hidden self-end mb-1`}>
                    <Image src="/obot.png" alt="Bot" fill className="object-contain p-0.5" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? `${t.userMsgBg} rounded-br-none shadow-sm` 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.content ? msg.content : (
                    <span className="text-gray-400 italic flex items-center gap-1.5">
                      <Loader2 className="w-3 h-3 animate-spin" /> Sedang merespons...
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 pb-safe">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya seputar PPDB atau sekolah..."
              disabled={isLoading}
              className={`flex-grow px-4 py-3 sm:py-2 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 ${t.ringFocus} text-gray-800 transition-shadow disabled:opacity-50`}
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputText.trim()}
              className={`${t.btnBg} text-white p-3 sm:p-2.5 rounded-full transition shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </form>

        </div>
      )}

      {/* 3. TOMBOL FLOATING ACTION BUTTON (FAB) */}
      {!isOpen && (
        <button 
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false); // Otomatis hilangkan notif saat chat dibuka
          }}
          className="group relative w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
          title="Tanya Asisten AI"
        >
          <div className={`absolute inset-0 rounded-full overflow-hidden ${t.avatarBg} flex items-center justify-center transition-colors duration-300`}>
            <Image src="/obott.png" alt="Chatbot Robot" fill className="object-contain p-2 group-hover:scale-110 transition duration-500" />
          </div>
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
        </button>
      )}

    </div>
  );
}