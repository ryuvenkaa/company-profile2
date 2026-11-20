"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { ArrowUpRight, Menu, X, ShieldCheck } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang", href: "#tentang" },
  { name: "Materi", href: "#materi" },
  { name: "Kegiatan", href: "#kegiatan" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["beranda", "tentang", "materi", "kegiatan"];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating Pill Container */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-pill rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6 shadow-lg shadow-black/5 dark:shadow-sky-950/20 max-w-4xl w-full"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          {/* Logo kotak vertikal T K J */}
          <div className="flex flex-col justify-between items-center w-7 h-8 bg-sky-600 dark:bg-sky-500 text-white rounded-md p-1 shadow-sm group-hover:bg-sky-700 transition-colors">
            <span className="text-[7px] font-black leading-none tracking-tight">T</span>
            <span className="text-[7px] font-black leading-none tracking-tight">K</span>
            <span className="text-[7px] font-black leading-none tracking-tight">J</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              TKJ BANJARASRI
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              Teknik Komputer dan Jaringan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1 rounded-full border border-slate-200/50 dark:border-slate-800/50">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/login"
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          >
            <span>Masuk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden absolute top-16 left-4 right-4 glass-card rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center px-1">
              <span className="text-xs text-slate-500">Akses Portal Siswa & Guru</span>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1"
              >
                Buka Login <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
