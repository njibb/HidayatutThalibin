import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hidayatuttholibin.blog'),
  title: {
    default: 'Yayasan Hidayatut Thalibin | Portal Pendidikan Islam Terpadu',
    template: '%s | Yayasan Hidayatut Thalibin', 
  },
  description: 'Portal resmi Yayasan Hidayatut Thalibin, Cilandak, Jakarta Selatan. Menyediakan layanan pendidikan berkualitas dan religius dari tingkat TK, MI, MTs, hingga SMK Bisnis & Manajemen.',
  keywords: [
    'Yayasan Hidayatut Thalibin',
    'Sekolah Islam Jakarta Selatan',
    'TK Hidayatut Thalibin',
    'MI Hidayatut Thalibin',
    'MTs Hidayatut Thalibin',
    'SMK Hidatha',
    'PPDB Hidayatut Thalibin',
    'Sekolah Terpadu Cilandak'
  ],
  authors: [{ name: 'Kreajib Studio' }],
  creator: 'Kreajib Studio',
  openGraph: {
    title: 'Yayasan Hidayatut Thalibin | Portal Pendidikan Islam Terpadu',
    description: 'Portal resmi Yayasan Hidayatut Thalibin, Cilandak, Jakarta Selatan. Melayani pendidikan TK, MI, MTs, hingga SMK.',
    url: 'https://www.hidayatuttholibin.blog',
    siteName: 'Yayasan Hidayatut Thalibin',
    images: [
      {
        url: '/sekolah-bg.jpg', 
        width: 1200,
        height: 630,
        alt: 'Gedung Yayasan Hidayatut Thalibin',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yayasan Hidayatut Thalibin',
    description: 'Portal pendidikan Islam terpadu TK, MI, MTs, dan SMK di Jakarta Selatan.',
    images: ['/sekolah-bg.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}