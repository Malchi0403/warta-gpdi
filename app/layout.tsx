import ReduxProvider from "@/libs/provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Font Awesome config
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// ✅ Metadata untuk <head>
export const metadata: Metadata = {
  title: "GPdI Shekinah GRAHA HARAPAN",
  description: "Selamat datang di Warta Jemaat GPdI Shekinah GRAHA HARAPAN",
  keywords: [
    "GPdI Shekinah",
    "gpdi",
    "shekinah",
    "SHEKINAH",
    "mustika jaya",
    "gereja mustika jaya",
    "gereja graha harapan",
    "gereja terdekat",
    "ibadah minggu",
    "praise and worship",
    "worship",
    "pantekosta",
    "gereja",
    "ibadah",
    "komunitas",
    "pemuda",
    "youth service",
    "church",
    "GPdI",
  ],
  openGraph: {
    title: "GPdI Shekinah GRAHA HARAPAN",
    description: "Selamat datang Warta Jemaat GPdI Shekinah Graha Harapan , Mustika Jaya .",
    url: "https://gpdishekinah.online",
    type: "website",
    // Uncomment kalau ada image:
    images: [
      {
        url: "https://gpdishekinah.online/assets/logoGPdI.jpeg",
        width: 1200,
        height: 630,
        alt: "GPdI Shekinah - Graha harapan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ JSON-LD schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Gereja",
    "name": "GPdI Shekinah",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Graha Harapan Blok E 13 No 2, Mustika Jaya",
      "addressLocality": "Kota Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17158",
      "addressCountry": "ID",
    },
    "telephone": "+62 813-1614-5742",
    "url": "https://www.gpdishekinah.online",
    "openingHours": "Mo-Su 00:00-23:59",
    "description":
      "GPdI Shekinah adalah gereja yang berlokasi di Mustika jaya, dengan ibadah setiap hari Minggu dan di hari lain ada beberapa kegiatan gereja.",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.303093633833016",
      "longitude": "107.02616911398482", // ✅ TANPA SPASI
    },
  };

  return (
    <html lang="id">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} antialiased overflow-x-hidden`}
      >
        <ReduxProvider>{children}</ReduxProvider>

        {/* ✅ JSON-LD di dalam <body>, valid & dikenali Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Analytics />
      </body>
    </html>
  );
}
