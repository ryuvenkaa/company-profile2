"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Profile, Material, Activity, UserRole } from "@/types/database";
import { initialMaterials } from "@/components/bento-material-card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  LogOut,
  Plus,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle,
  Clock,
  MapPin,
  ExternalLink,
  Terminal,
  Activity as ActivityIcon,
  UserCheck,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  // State for creating new activity (admin only)
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityDesc, setNewActivityDesc] = useState("");
  const [newActivityDate, setNewActivityDate] = useState("");
  const [submittingActivity, setSubmittingActivity] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // If no auth in demo/local mode without connected supabase yet, provide a mock user
          const mockProfile: Profile = {
            id: "demo-user",
            full_name: "Tamu TKJ Banjarasri",
            email: "tamu@smkbanjarasri.sch.id",
            role: "siswa",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setProfile(mockProfile);
        } else {
          // Fetch profile
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileData) {
            setProfile(profileData as Profile);
          } else {
            setProfile({
              id: user.id,
              full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna",
              email: user.email || "",
              role: (user.user_metadata?.role as UserRole) || "siswa",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }

        // Fetch activities from Supabase or fallback
        const { data: actData } = await supabase
          .from("activities")
          .select("*")
          .order("created_at", { ascending: false });

        if (actData && actData.length > 0) {
          setActivities(actData as Activity[]);
        } else {
          // Default mock activities
          setActivities([
            {
              id: "act-1",
              title: "Praktikum Topologi Jaringan & Subnetting IPv4",
              description:
                "Pengujian konektivitas antarlab dengan pembagian subnet IP statis dan packet flow.",
              date: "Senin, 18 November 2026",
              category: "Praktik Lab",
              location: "Lab TKJ 1 - SMK Banjarasri",
              created_at: new Date().toISOString(),
            },
            {
              id: "act-2",
              title: "Workshop Konfigurasi RouterOS Mikrotik MTCNA Prep",
              description:
                "Pengenalan fitur routerboard, konfigurasi hotspot login page sekolah, dan manajemen bandwidth.",
              date: "Rabu, 20 November 2026",
              category: "Workshop",
              location: "Lab Jaringan & Server",
              created_at: new Date().toISOString(),
            },
            {
              id: "act-3",
              title: "Deploy Web Application & Reverse Proxy Nginx di Ubuntu Server",
              description:
                "Implementasi full stack application sekolah pada server lokal Linux dengan SSL Let's Encrypt.",
              date: "Jumat, 22 November 2026",
              category: "Proyek Siswa",
              location: "Lab Komputer Utama",
              created_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle || !newActivityDate) return;

    setSubmittingActivity(true);
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: newActivityTitle,
      description: newActivityDesc,
      date: newActivityDate,
      category: "Praktik Lab",
      location: "Lab TKJ - SMK Banjarasri",
      created_at: new Date().toISOString(),
    };

    try {
      await supabase.from("activities").insert([
        {
          title: newAct.title,
          description: newAct.description,
          date: newAct.date,
          category: newAct.category,
          location: newAct.location,
        },
      ]);
    } catch {
      // Local fallback
    }

    setActivities([newAct, ...activities]);
    setNewActivityTitle("");
    setNewActivityDesc("");
    setNewActivityDate("");
    setSubmittingActivity(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070b14]">
        <div className="flex items-center gap-3 text-sm text-slate-500 font-mono">
          <RefreshCw className="w-4 h-4 animate-spin text-sky-500" />
          <span>Memuat dashboard portal...</span>
        </div>
      </div>
    );
  }

  const role = profile?.role || "siswa";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col justify-between items-center w-6 h-7 bg-sky-600 text-white rounded p-0.5 text-[6px] font-black">
                <span>T</span>
                <span>K</span>
                <span>J</span>
              </div>
              <span className="text-sm font-bold tracking-tight">TKJ PORTAL</span>
            </Link>

            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {profile?.full_name}
              </span>
              <span className="text-[10px] text-slate-500">{profile?.email}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
              title="Keluar dari Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Welcome Banner */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/90 mb-8 bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
                {role === "admin" && <ShieldCheck className="w-4 h-4" />}
                {role === "guru" && <Briefcase className="w-4 h-4" />}
                {role === "siswa" && <GraduationCap className="w-4 h-4" />}
                <span className="capitalize">Ruang Kerja {role}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Halo, {profile?.full_name}!
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {role === "admin" &&
                  "Kelola pengumuman kegiatan, kontrol data laboratorium, dan pantau sistem pembelajaran."}
                {role === "guru" &&
                  "Kelola kurikulum 4 bidang kompetensi inti, susun materi, dan pandu praktikum siswa."}
                {role === "siswa" &&
                  "Ikuti 4 bidang kompetensi keahlian dan pantau jadwal praktikum lab TKJ Anda."}
              </p>
            </div>

            {/* Quick action button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
            >
              <span>Lihat Profil Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Bidang Materi Inti (Semua Role Bisa Melihat, Guru/Admin Bisa Mengelola) */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Kurikulum 4 Bidang Inti TKJ
              </h2>
              <p className="text-xs text-slate-500">
                Materi pembelajaran standar industri teknologi komputer dan jaringan
              </p>
            </div>

            {role === "guru" && (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Modul</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialMaterials.map((mat) => (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {mat.code}
                    </span>
                    <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">
                      {mat.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-500 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Tersedia di Lab
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Kegiatan & Praktik Laboratorium */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List Kegiatan */}
          <div className={role === "admin" ? "lg:col-span-7" : "lg:col-span-12"}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Agenda & Praktikum Laboratorium
                </h2>
                <p className="text-xs text-slate-500">
                  Daftar agenda kegiatan praktik, workshop, dan ujian keahlian
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                      {act.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {act.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {act.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    <span>{act.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Tambah Kegiatan Khusus Admin */}
          {role === "admin" && (
            <div className="lg:col-span-5">
              <div className="glass-card rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800/90 sticky top-24">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-sky-600 dark:text-sky-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>KONTROL ADMIN</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Publikasikan Agenda Baru
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Tambahkan jadwal praktikum atau pengumuman ke seluruh portal
                </p>

                <form onSubmit={handleAddActivity} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Judul Agenda
                    </label>
                    <input
                      type="text"
                      required
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      placeholder="Contoh: Ujian Praktik Mikrotik"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tanggal / Waktu
                    </label>
                    <input
                      type="text"
                      required
                      value={newActivityDate}
                      onChange={(e) => setNewActivityDate(e.target.value)}
                      placeholder="Contoh: Senin, 25 November 2026"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Deskripsi Kegiatan
                    </label>
                    <textarea
                      rows={3}
                      value={newActivityDesc}
                      onChange={(e) => setNewActivityDesc(e.target.value)}
                      placeholder="Rincian materi dan instruksi lab..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingActivity}
                    className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {submittingActivity ? "Menyimpan..." : "Tambahkan ke Portal"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
