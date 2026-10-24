import React from "react";
import Navbar from "@/app/components/navbar"; // Pastikan path Navbar sudah sesuai strukturmu
import UnitPPDB from "@/app/components/unit/unitppdb";

export default function PPDBPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EB]">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <UnitPPDB />
      </div>
    </main>
  );
}