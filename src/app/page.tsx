"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { HeroNodes } from "@/components/hero-nodes";
import { BentoMaterialGrid } from "@/components/bento-material-card";
import { TerminalMockup } from "@/components/terminal-mockup";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  Server,
  ShieldCheck,
  GraduationCap,
  Users,
  Compass,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating Island Navbar */}
      <Navbar />

      {/* Decorative ambient gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-sky-400/15 via-blue-500/5 to-transparent blur-[120px] rounded-full dark:from-sky-600/15" />
        <div className="absolute top-[40%] -left-32 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[70%] -right-32 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 pt-28 sm:pt-36 pb-20">
        {/* ===================================================================
            HERO SECTION
        ==================================================================== */}
        <section id="beranda" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Badge Atas */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>PROGRAM KEAHLIAN SMK BANJARASRI</span>
              </div>

              {/* Headline Utama */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Belajar teknologi.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
                  Membangun masa depan.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Ruang belajar Teknik Komputer dan Jaringan untuk menjelajahi
                pemrograman web, server Linux, jaringan, dan Mikrotik.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <a
                  href="#materi"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-all shadow-md shadow-sky-600/20 w-full sm:w-auto"
                >
                  <span>Jelajahi materi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold glass-card text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200 dark:border-slate-800 w-full sm:w-auto"
                >
                  <span>Masuk ke portal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Footer kecil Hero */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Belajar praktik, siap menghadapi dunia digital.</span>
              </div>
            </motion.div>

            {/* Hero Right Visual (TKJ Connected Tech Nodes) */}
            <div className="lg:col-span-5">
              <HeroNodes />
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEKSI 01 — TENTANG PROGRAM (#tentang)
        ==================================================================== */}
        <section id="tentang" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32 scroll-mt-24">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
            {/* Top Tag */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-3">
              <Layers className="w-4 h-4" />
              <span>01 — TENTANG PROGRAM</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Teknologi dipahami lewat pengalaman.
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Di program keahlian TKJ, siswa belajar memahami cara kerja teknologi
                  dari sisi perangkat lunak hingga jaringan yang menghubungkannya.
                  Kurikulum didesain berbasis praktik langsung di laboratorium terpadu.
                </p>

                <div className="mt-6">
                  <a
                    href="#materi"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 group"
                  >
                    <span>Kenali bidang yang dipelajari</span>
                    <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Kartu Statistik 04 & 01 */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                >
                  <span className="text-3xl sm:text-4xl font-black font-mono text-sky-600 dark:text-sky-400">
                    04
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                    Bidang Pembelajaran
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Backend, Linux Server, Jaringan & Mikrotik terintegrasi.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
                >
                  <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    01
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                    Langkah Awal Karier
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Fondasi kuat untuk Network Engineer & Web Developer.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SEKSI 02 — YANG DIPELAJARI / MATERI (#materi)
        ==================================================================== */}
        <section id="materi" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32 scroll-mt-24">
          <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>02 — YANG DIPELAJARI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Empat bidang. Banyak kemungkinan.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Kenali kompetensi inti TKJ yang menjadi bekal untuk membangun,
              mengelola, dan menghubungkan teknologi.
            </p>
          </div>

          {/* Bento Material Cards */}
          <BentoMaterialGrid />
        </section>

        {/* ===================================================================
            SEKSI 03 — BELAJAR DENGAN PRAKTIK / KEGIATAN (#kegiatan)
        ==================================================================== */}
        <section id="kegiatan" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sisi Kiri: Deskripsi & CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-2">
                <Server className="w-4 h-4" />
                <span>03 — BELAJAR DENGAN PRAKTIK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Dari mencoba, menjadi mampu.
              </h2>

              <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Portal TKJ menjadi tempat untuk mengikuti materi, melihat kegiatan,
                dan mengakses informasi belajar sesuai peran masing-masing.
                Siswa dapat melihat modul, guru mengelola silabus, dan admin
                mengatur manajemen kegiatan sekolah.
              </p>

              <div className="mt-8">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-all shadow-md"
                >
                  <span>Buka portal TKJ</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sisi Kanan: Mockup Terminal Interaktif */}
            <div className="lg:col-span-6">
              <TerminalMockup />
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          FOOTER WEBSITE
      ==================================================================== */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col justify-between items-center w-6 h-7 bg-sky-600 text-white rounded p-0.5 text-[6px] font-black">
              <span>T</span>
              <span>K</span>
              <span>J</span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              TKJ SMK Banjarasri &copy; {new Date().getFullYear()} — Semua hak cipta dilindungi.
            </span>
          </div>

          {/* Footer Link Utama */}
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>Informasi umum sekolah tersedia di website utama SMK Banjarasri.</span>
            <a
              href="https://alfari.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5"
            >
              Kunjungi website utama <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
