"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Network, Cpu, Wifi, Activity } from "lucide-react";

interface NodeData {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  icon: typeof Code2;
  tech: string[];
  color: string;
  glow: string;
}

const nodes: NodeData[] = [
  {
    id: "code",
    label: "01 / CODE",
    title: "Web Backend & API",
    subtitle: "Node.js, PostgreSQL, REST",
    icon: Code2,
    tech: ["TypeScript", "Next.js", "Postgres"],
    color: "from-sky-500 to-blue-600",
    glow: "rgba(14, 165, 233, 0.35)",
  },
  {
    id: "linux",
    label: "LINUX",
    title: "Server & Environment",
    subtitle: "Ubuntu, Debian, Nginx, SSH",
    icon: Terminal,
    tech: ["Bash", "Systemd", "Security"],
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "connect",
    label: "02 / CONNECT",
    title: "Jaringan Komputer",
    subtitle: "OSI Layer, Subnetting, VLAN",
    icon: Network,
    tech: ["TCP/IP", "Wireshark", "Cabling"],
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  {
    id: "mikrotik",
    label: "03 / CREATE",
    title: "Mikrotik RouterOS",
    subtitle: "Bandwidth, Firewall, Hotspot",
    icon: Cpu,
    tech: ["RouterBOARD", "NAT", "Queue"],
    color: "from-purple-500 to-indigo-600",
    glow: "rgba(168, 85, 247, 0.35)",
  },
];

export function HeroNodes() {
  const [activeNode, setActiveNode] = useState<string>("code");

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 sm:p-6 select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-emerald-500/10 blur-3xl rounded-full -z-10" />

      {/* Outer Card with Bento styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl relative overflow-hidden"
      >
        {/* Top Status Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono tracking-wider font-semibold uppercase text-slate-600 dark:text-slate-400">
              TKJ CONNECTED MATRIX
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <Wifi className="w-3.5 h-3.5 text-sky-500" />
            <span>4 NODES ACTIVE</span>
          </div>
        </div>

        {/* 2x2 Interactive Node Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;

            return (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveNode(node.id)}
                className={`relative p-3.5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "bg-white dark:bg-slate-900/90 border-sky-500/60 dark:border-sky-400/60 shadow-lg"
                    : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
                style={{
                  boxShadow: isSelected ? `0 10px 25px -5px ${node.glow}` : undefined,
                }}
              >
                {/* Node badge & Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {node.label}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br ${node.color} text-white shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Node Title & Subtitle */}
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {node.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {node.subtitle}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {node.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central interactive insight */}
        <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-[11px]">
              Klik kartu node untuk simulasi integrasi laboratorium
            </span>
          </div>
          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold uppercase">
            {activeNode} online
          </span>
        </div>
      </motion.div>
    </div>
  );
}
