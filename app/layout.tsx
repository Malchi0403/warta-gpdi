import ReduxProvider from "@/libs/provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SchemaMarkup from "@/components/SchemeMarkup";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "GPdI Shekinah Graha Harapan",
  description: "Selamat datang di Warta Jemaat GPdI Shekinah GRAHA HARAPAN",
  keywords: [
    "GPdI Shekinah",
    "gpdi",
    "shekinah",
    "SHEKINAH",
    "mustika jaya",
    "gereja mustika jaya",
    "gereja graha harapan",
    "gpdi shekinah graha harapan",
    "gpdi shekinah",
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
    title: "GPdI Shekinah Graha Harapan",
    description:
      "Selamat datang Warta Jemaat GPdI Shekinah Graha Harapan , Mustika Jaya .",
    url: "https://gpdishekinah.online",
    type: "website",
    images: [
      {
        url: "https://gpdishekinah.online/assets/logoGPdI.jpeg",
        width: 1200,
        height: 630,
        alt: "GPdI Shekinah Graha harapan",
      },
    ],
  },
  alternates: {
    canonical: "https://alifjayaservice.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="id">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} antialiased overflow-x-hidden`}
      >
        <ReduxProvider>{children}</ReduxProvider>

        <SchemaMarkup />
        <Analytics />
      </body>
    </html>
  );
}
