/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import UnitNavbar from "@/app/components/unit/unitnavbar";
import Footer from "@/app/components/footer";
import { tkData } from "@/app/data/tkdata";

function BeritaContent() {
  const params = useParams();
  const id = params?.id as string;

  const [berita, setBerita] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailBerita = async () => {
      try {
        if (!id) return;
        const response = await fetch(`/api/proxy-berita/tk/${id}`);
        const result = await response.json();
        if (response.ok && result.status === 1) {
          setBerita(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat detail berita:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailBerita();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-400 font-medium animate-pulse">
        Memuat artikel berita...
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="py-20 text-center text-gray-500 font-bold">
        Berita tidak ditemukan.
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <div>
        <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-md mb-4">
          Berita Madrasah
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {berita.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mt-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>
              {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-700" />
            <span>Humas TK Hidayatut Thalibin</span>
          </div>
        </div>
      </div>

      {berita.image && (
        <div className="relative w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={berita.image}
            alt={berita.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-amber max-w-none text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line pt-4">
        {berita.content}
      </div>
    </article>
  );
}

export default function DetailBeritaTKPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <UnitNavbar unitName={tkData.shortName} unitCode={tkData.code} theme="amber" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <Link
          href="/tk#berita"
          className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-900 mb-8 bg-amber-50 px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
        </Link>

        <Suspense fallback={<div className="py-20 text-center text-gray-400 font-medium animate-pulse">Memuat artikel berita...</div>}>
          <BeritaContent />
        </Suspense>
      </div>

      <Footer theme="amber" />
    </main>
  );
}