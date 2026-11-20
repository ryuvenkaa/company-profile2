"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import {
  ShieldCheck,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type RoleOption = "siswa" | "guru" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleOption>("siswa");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(
          authError.message === "Invalid login credentials"
            ? "Email atau kata sandi tidak cocok. Silakan periksa kembali."
            : authError.message
        );
      }

      if (!authData.user) {
        throw new Error("Gagal mengambil data akun.");
      }

      // 2. Validate role against public.profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", authData.user.id)
        .single();

      if (profileError || !profile) {
        // Fallback: Check user metadata if profile table sync takes a moment
        const metaRole = authData.user.user_metadata?.role as RoleOption;
        if (metaRole && metaRole !== selectedRole) {
          await supabase.auth.signOut();
          throw new Error(
            `Akses ditolak: Akun ini terdaftar sebagai '${metaRole}', bukan '${selectedRole}'.`
          );
        }
      } else if (profile.role !== selectedRole) {
        await supabase.auth.signOut();
        throw new Error(
          `Akses ditolak: Akun ini terdaftar dengan peran '${profile.role.toUpperCase()}', bukan '${selectedRole.toUpperCase()}'. Silakan pilih peran yang sesuai.`
        );
      }

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100">
      {/* ===================================================================
          SISI KIRI: FORM LOGIN
      ==================================================================== */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        {/* Top Header */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex flex-col justify-between items-center w-6 h-7 bg-sky-600 text-white rounded p-0.5 text-[6px] font-black">
              <span>T</span>
              <span>K</span>
              <span>J</span>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
              PORTAL TKJ / BANJARASRI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Selamat datang kembali.
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Pilih peran Anda dan masukkan kredensial akun untuk mengakses ruang kerja.
          </p>
        </div>

        {/* Center: The Form */}
        <div className="my-8 max-w-md w-full">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 mb-6"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Pilih Peran Akun
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800">
                {(["siswa", "guru", "admin"] as RoleOption[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 text-xs font-bold capitalize rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === r
                        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {r === "siswa" && <GraduationCap className="w-3.5 h-3.5" />}
                    {r === "guru" && <Briefcase className="w-3.5 h-3.5" />}
                    {r === "admin" && <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Akun
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === "siswa"
                      ? "siswa@smkbanjarasri.sch.id"
                      : selectedRole === "guru"
                      ? "guru@smkbanjarasri.sch.id"
                      : "admin@smkbanjarasri.sch.id"
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <span>Memverifikasi akun...</span>
              ) : (
                <>
                  <span>Masuk ke portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Belum memiliki akun siswa?{" "}
            <Link
              href="/register"
              className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Daftar sebagai siswa baru
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-slate-400">
          Dilindungi oleh Supabase Authentication & Row Level Security (RLS).
        </div>
      </div>

      {/* ===================================================================
          SISI KANAN: INFORMASI PERAN (SATU PORTAL, TIGA PERAN)
      ==================================================================== */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-mono font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SATU PORTAL, TIGA PERAN</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Setiap peran punya ruangnya.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Sistem memisahkan alur kerja secara ketat guna menjaga integritas
            kurikulum, keamanan jaringan lab, dan kenyamanan siswa saat belajar.
          </p>

          {/* Rincian Tiga Peran */}
          <div className="mt-8 space-y-4">
            {/* Card Admin */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Administrator</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manajemen hak akses pengguna, jadwal praktikum lab, publikasi agenda kegiatan, dan pemantauan sistem.
              </p>
            </div>

            {/* Card Guru */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Guru & Instruktur</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menyusun silabus 4 bidang kompetensi inti (Code, Linux, Connect, Mikrotik), mengunggah modul praktik, dan mengevaluasi tugas.
              </p>
            </div>

            {/* Card Siswa */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Siswa TKJ</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mengakses materi pembelajaran interaktif, mengunduh panduan lab, melihat jadwal praktik, dan mencatat progres belajar.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom micro quote */}
        <div className="pt-8 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
          <span>SMK Banjarasri Cyber Lab</span>
          <span className="text-emerald-400 font-mono">v1.0.0 Ready</span>
        </div>
      </div>
    </div>
  );
}
