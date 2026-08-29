import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cumpleaños 25 🐉 Vanesa",
  description:
    "Estás invitado al cumpleaños 25 de Vanesa. Temática: Chimuelo y la Furia Luminosa. Sábado 3 de Octubre 2026, Isidro Casanova.",
  keywords: ["cumpleaños", "invitación", "Chimuelo", "Furia Luminosa", "25 años"],
  openGraph: {
    title: "Cumpleaños 25 🐉 Vanesa",
    description: "¡Fuiste invitado al cumpleaños 25 de Vanesa! 🐉✨",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${outfit.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-[#050A18] antialiased">
        {children}
      </body>
    </html>
  );
}
