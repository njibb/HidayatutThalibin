/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import LensZoomCarousel from "../components/ui/lens-zoom-carousel";

export default function UnitSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const unitSlides = [
    {
      image: "/.jpg",
      title: "TK Hidayatut Thalibin",
      caption: "Pendidikan anak usia dini yang ceria, kreatif, dan berbasis nilai-nilai keislaman.",
      link: "/tk",
    },
    {
      image: "/mibg.jpg",
      title: "MI Hidayatut Thalibin",
      caption: "Membentuk fondasi ilmu pengetahuan umum dan agama yang kuat sejak usia sekolah dasar.",
      link: "/mi",
    },
    {
      image: "/mtsbg.jpg",
      title: "MTs Hidayatut Thalibin",
      caption: "Pendidikan menengah pertama yang menyeimbangkan kecerdasan intelektual dan spiritual.",
      link: "/mts",
    },
    {
      image: "/unit-smk.jpg",
      title: "SMK Hidayatut Thalibin",
      caption: "Sekolah kejuruan siap kerja dengan keahlian vokasi modern dan berdaya saing tinggi.",
      link: "/smk",
    },
  ];

  // Cegah render di server untuk menghindari ketidakcocokan HTML (hydration mismatch)
  if (!isMounted) {
    return <section id="unit" className="w-full h-[100svh] bg-black" />;
  }

  return (
    <section id="unit" className="w-full relative overflow-hidden bg-black">
      <LensZoomCarousel 
        slides={unitSlides}
        height="100svh"
        autoplay={0}
      />
    </section>
  );
}