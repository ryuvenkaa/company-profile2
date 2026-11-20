"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Terminal,
  Network,
  Cpu,
  ArrowUpRight,
  X,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export interface MaterialItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  keyPoints: string[];
  tools: string[];
  iconName: string;
  accent: string;
}

export const initialMaterials: MaterialItem[] = [
  {
    id: "mat-1",
    code: "01",
    title: "Pemrograman Website (Backend)",
    category: "Pemrograman",
    description:
      "Mengenal logika server, pengolahan data, dan cara membangun fitur di balik sebuah website.",
    summary:
      "Fokus pada pembentukan fondasi rekayasa perangkat lunak modern. Siswa diajarkan bagaimana arsitektur client-server bekerja, pembuatan REST API dengan Node.js/TypeScript, manajemen basis data relasional PostgreSQL, serta penanganan otentikasi aman.",
    keyPoints: [
      "Struktur data & logika server modern",
      "Perancangan RESTful API & JSON payload",
      "Relational Database (PostgreSQL / Supabase)",
      "Autentikasi Pengguna & Keamanan Sistem Web",
    ],
    tools: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase"],
    iconName: "code",
    accent: "from-sky-500/10 via-sky-500/5 to-transparent",
  },
  {
    id: "mat-2",
    code: "02",
    title: "Linux Server & Website Frontend",
    category: "Sistem Operasi",
    description:
      "Berkenalan dengan lingkungan Linux, layanan server, dan antarmuka website.",
    summary:
      "Mempelajari ekosistem server Linux yang menjadi tulang punggung internet dunia. Meliputi pengoperasian command-line Linux, konfigurasi web server (Nginx/Apache), SSH remote administration, deployment antarmuka frontend, dan pengelolaan repositori package.",
    keyPoints: [
      "Navigasi CLI Linux & Shell Scripting",
      "Web Server Setup (Nginx Reverse Proxy)",
      "SSH Key Hardening & User Permissions",
      "Deployment Frontend Responsive & SSL TLS",
    ],
    tools: ["Ubuntu Server", "Debian", "Nginx", "Git", "Tailwind CSS"],
    iconName: "terminal",
    accent: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  {
    id: "mat-3",
    code: "03",
    title: "Jaringan Dasar",
    category: "Konektivitas",
    description:
      "Memahami perangkat, topologi, alamat IP, dan konsep dasar komunikasi jaringan.",
    summary:
      "Fondasi mutlak bagi setiap teknisi komputer dan jaringan. Membahas transmisi data melalui model referensi OSI 7 Layer dan protokol TCP/IP, teknik crimping kabel fiber/UTP, perancangan skema subnet IPv4/IPv6, serta analisis lalu lintas paket data menggunakan Wireshark.",
    keyPoints: [
      "Standar Model OSI & Arsitektur TCP/IP",
      "Kalkulasi Subnetting CIDR IPv4 & IPv6",
      "Crimping Kabel & Testing Perangkat Fisik",
      "Packet Sniffing & Troubleshooting Wireshark",
    ],
    tools: ["Cisco Packet Tracer", "Wireshark", "Crimping Tool", "Tester LAN"],
    iconName: "network",
    accent: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "mat-4",
    code: "04",
    title: "Konfigurasi Mikrotik",
    category: "Konfigurasi",
    description:
      "Latihan konfigurasi router dan pengelolaan koneksi jaringan secara terarah.",
    summary:
      "Implementasi praktis manajemen jaringan skala enterprise dan sekolah. Siswa mempraktikkan konfigurasi routerboard Mikrotik melalui Winbox & terminal RouterOS: DHCP Server/Client, Firewall NAT, limitasi bandwidth antarkelas, serta pembuatan hotspot captive portal.",
    keyPoints: [
      "Winbox & Navigasi RouterOS v7",
      "Firewall Filtering, NAT & Mangle Rules",
      "Manajemen Bandwidth (Simple Queue & PCQ)",
      "Hotspot Captive Portal & User Manager",
    ],
    tools: ["Mikrotik RouterBOARD", "Winbox", "RouterOS", "Putty"],
    iconName: "cpu",
    accent: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
];

export function BentoMaterialGrid() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "code":
        return <Code className="w-5 h-5 text-sky-500" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-amber-500" />;
      case "network":
        return <Network className="w-5 h-5 text-emerald-500" />;
      case "cpu":
        return <Cpu className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="w-full">
      {/* 4 Cards Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {initialMaterials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group relative glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-sky-950/30 border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-br ${item.accent}`}
          >
            <div>
              {/* Card Header: Code & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black font-mono tracking-tight text-slate-400 dark:text-slate-600 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {item.code}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                    {getIcon(item.iconName)}
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              {/* Tool Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/60"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Kompetensi Inti TKJ
              </span>
              <button
                type="button"
                onClick={() => setSelectedMaterial(item)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors focus:outline-none"
              >
                <span>Lihat ringkasan</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail Ringkasan */}
      <AnimatePresence>
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaterial(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  Bidang {selectedMaterial.code}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {selectedMaterial.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {selectedMaterial.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {selectedMaterial.summary}
              </p>

              {/* Key Points */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Poin Kompetensi Praktik:
                </h4>
                <div className="space-y-2">
                  {selectedMaterial.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Used */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Tools Laboratorium:</span>
                {selectedMaterial.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Close Button at footer */}
              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedMaterial(null)}
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors"
                >
                  Tutup Ringkasan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
