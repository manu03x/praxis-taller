import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Shippori_Mincho } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

/**
 * Fuentes — pesos ligeros, deliberadamente.
 *
 * Display: Fraunces (variable) con SOFT=0 (terminales afilados).
 * Body: Hanken Grotesk (variable, sans neutral).
 * Kanji: Shippori Mincho.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const shippori = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Praxis Taller — Arquitectura Inmobiliaria",
    template: "%s · Praxis Taller",
  },
  description:
    "Praxis Taller. Inmobiliaria de proyectos arquitectónicos premium. Silencio, atemporalidad y materia.",
  metadataBase: new URL("https://praxistaller.com"),
  openGraph: {
    title: "Praxis Taller",
    description: "Arquitectura inmobiliaria. Silencio, atemporalidad y materia.",
    type: "website",
    locale: "es_MX",
  },
  icons: {
    icon: "/logo/praxis-mark.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${hanken.variable} ${shippori.variable}`}
    >
      <body className="bg-shironeri text-sumi antialiased">
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
