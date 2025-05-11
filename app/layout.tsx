import ReduxProvider from "@/libs/provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Head from "next/head";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "GPdI Shekinah GRAHA HARAPAN",
  description:
    "Selamat datang di Warta Jemaat GPdI Shekinah GRAHA HARAPAN",
  keywords: [
    "GPdI Shekinah",
    "gpdi",
    "shekinah",
    "SHEKINAH",
    "mustika jaya",
    "gereja mustika jaya",
    "mustika jaya",
    "ibadah minggu",
    "praise and worship",
    "praise",
    "worship",
    "pantekosta",
    "pantekosta",
    "gereja",
    "ibadah",
    "kasih",
    "komunitas",
    "pemuda",
    "youth service",
    "youth",
    "church",
    "GPdI",
  ],
  openGraph: {
    title: "GPdI Shekinah GRAHA HARAPAN",
    description:
      "Selamat datang Warta Jemaat GPdI Shekinah Mustika Jaya",
    url: "https://www.gpdishekinah.online",
    type: "website",
    // images: [
    //   {
    //     url: "https://gpdiskhinah.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "GPdI Shekinah - Mustika Jaya",
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    "name": "GPdI Shekinah",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Graha Harapan Blok E 13 No 2, Mustika Jaya",
      "addressLocality": "Kota Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17158",
      "addressCountry": "ID"
    },
    "telephone": "+62 813-1614-5742",
    "url": "https://www.gpdishekinah.online",
    "openingHours": "Mo-Su 00:00-23:59",
    "description": "GPdI Shekinah adalah gereja yang berlokasi di Mustika jaya, dengan ibadah setiap hari Minggu dan dihari lain ada beberapa kegiatan-kegiatan gereja.",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.303093633833016",
      "longitude": " 107.02616911398482"
    }
  }
  return (
    <html lang="en">
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable}  antialiased overflow-x-hidden`}
      >
         {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
        <ReduxProvider>{children}</ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
