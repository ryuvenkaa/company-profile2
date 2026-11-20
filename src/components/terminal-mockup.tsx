"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Copy, Check } from "lucide-react";

interface CommandLog {
  id: string;
  command: string;
  output: string[];
}

const commands: CommandLog[] = [
  {
    id: "praktik",
    command: "$ belajar praktik",
    output: [
      "[TKJ-LAB] Initializing network topology...",
      "✔ Eth0 connected to Core Switch (10.10.1.1/24)",
      "✔ Ubuntu 24.04 LTS server initialized with Nginx reverse proxy",
      "✔ Mikrotik RouterOS v7 configured: NAT & Queue active",
      "Status: Siap untuk uji kompetensi & pengembangan web.",
    ],
  },
  {
    id: "create",
    command: "$ buat sesuatu_",
    output: [
      "[TKJ-LAB] Compiling project: portal-tkj-banjarasri...",
      "✔ Building modern Next.js 15 App with Tailwind CSS",
      "✔ Connecting to PostgreSQL Database via Supabase",
      "✔ Row Level Security (RLS) policies: 100% active",
      "Ready on http://localhost:3000 — Belajar teknologi, membangun masa depan.",
    ],
  },
];

export function TerminalMockup() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const current = commands[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.command.replace("$ ", ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto font-mono text-xs shadow-2xl rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 text-slate-200">
      {/* Top Window Bar */}
      <div className="bg-slate-900/90 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <div className="flex items-center gap-1.5 ml-2 text-slate-400 text-[11px]">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>tkj-lab ~ bash</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Salin Perintah"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Tab Switchers */}
      <div className="flex bg-slate-900/50 border-b border-slate-800/80 px-2 pt-1 gap-1">
        {commands.map((cmd, idx) => (
          <button
            key={cmd.id}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 rounded-t-md text-[11px] transition-colors ${
              activeTab === idx
                ? "bg-slate-950 text-sky-400 border-t-2 border-sky-500 font-semibold"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Tab {idx + 1}: {cmd.id}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 min-h-[220px] flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Active Command */}
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span>user@tkj-smk-banjarasri:~$</span>
            <span className="text-white">{current.command}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.9 }}
              className="inline-block w-2 h-4 bg-sky-400"
            />
          </div>

          {/* Terminal Output */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5 pt-2 text-slate-300"
          >
            {current.output.map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("✔")
                    ? "text-emerald-400/90"
                    : line.startsWith("[TKJ-LAB]")
                    ? "text-sky-400/90 font-semibold"
                    : line.startsWith("Ready")
                    ? "text-amber-300 font-semibold pt-1"
                    : "text-slate-400"
                }
              >
                {line}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Footer command prompt hint */}
        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>Tekan Tab 1 atau 2 untuk simulasi perintah</span>
          <span className="text-emerald-400">● 100 Mbps Lab Network</span>
        </div>
      </div>
    </div>
  );
}
