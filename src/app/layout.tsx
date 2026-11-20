import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TKJ SMK Banjarasri — Belajar Teknologi. Membangun Masa Depan.",
  description:
    "Ruang belajar Teknik Komputer dan Jaringan SMK Banjarasri untuk menjelajahi pemrograman web, server Linux, jaringan dasar, dan konfigurasi Mikrotik.",
  keywords: [
    "TKJ SMK Banjarasri",
    "Teknik Komputer dan Jaringan",
    "SMK Banjarasri",
    "Mikrotik",
    "Linux Server",
    "Web Development",
    "Jaringan Dasar",
  ],
  authors: [{ name: "Program Keahlian TKJ SMK Banjarasri" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-sky-500 selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
