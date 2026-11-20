-- ==============================================================================
-- DATABASE SCHEMA: PORTAL & PROFIL PROGRAM KEAHLIAN TKJ SMK BANJARASRI
-- Supabase PostgreSQL + Auth Trigger + Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM ROLE TYPE
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'guru', 'siswa');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLE: PROFILES
-- Menyimpan data profil user yang terhubung langsung dengan auth.users
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'siswa',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Indexing untuk query performa tinggi
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ==============================================================================
-- 4. TABLE: MATERIALS (Materi 4 Bidang Inti Pembelajaran TKJ)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) NOT NULL UNIQUE, -- e.g., '01', '02', '03', '04'
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Pemrograman', 'Sistem Operasi', 'Konektivitas', 'Konfigurasi')),
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    badge TEXT,
    icon TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_materials_category ON public.materials(category);
CREATE INDEX IF NOT EXISTS idx_materials_code ON public.materials(code);

-- ==============================================================================
-- 5. TABLE: ACTIVITIES (Kegiatan & Pengumuman Praktik Lab TKJ)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT DEFAULT 'Praktik Lab',
    location TEXT DEFAULT 'Lab Komputer & Jaringan SMK Banjarasri',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activities_date ON public.activities(date);

-- ==============================================================================
-- 6. TRIGGER & FUNCTION: AUTO CREATE PROFILE DARI AUTH.USERS
-- Menjamin setiap kali ada pendaftaran di auth.users, row profiles langsung dibuat
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role user_role := 'siswa';
BEGIN
    -- Cek jika ada custom role dikirim lewat metadata auth signup
    IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
        BEGIN
            default_role := (NEW.raw_user_meta_data->>'role')::user_role;
        EXCEPTION WHEN OTHERS THEN
            default_role := 'siswa';
        END;
    END IF;

    INSERT INTO public.profiles (id, full_name, email, role, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.email,
        default_role,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang Trigger ke tabel auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Aktifkan RLS pada seluruh tabel
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Helper Function untuk cek role pengguna yang sedang login tanpa recursive check
CREATE OR REPLACE FUNCTION public.get_current_role()
RETURNS TEXT AS $$
    SELECT role::TEXT FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- A. RLS POLICIES: PROFILES
-- ------------------------------------------------------------------------------
-- 1. Semua pengguna terautentikasi dan publik dapat melihat profil
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

-- 2. Pengguna dapat memperbarui profil milik mereka sendiri
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 3. Admin memiliki hak penuh untuk mengelola semua profil (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can manage all profiles"
    ON public.profiles FOR ALL
    USING (public.get_current_role() = 'admin');

-- ------------------------------------------------------------------------------
-- B. RLS POLICIES: MATERIALS
-- ------------------------------------------------------------------------------
-- 1. Materi dapat dilihat oleh publik/semua pengguna (Anon & Authenticated)
CREATE POLICY "Materials are viewable by everyone"
    ON public.materials FOR SELECT
    USING (true);

-- 2. Guru dan Admin dapat menambah materi baru
CREATE POLICY "Guru and Admin can insert materials"
    ON public.materials FOR INSERT
    WITH CHECK (public.get_current_role() IN ('admin', 'guru'));

-- 3. Guru dan Admin dapat mengubah materi
CREATE POLICY "Guru and Admin can update materials"
    ON public.materials FOR UPDATE
    USING (public.get_current_role() IN ('admin', 'guru'))
    WITH CHECK (public.get_current_role() IN ('admin', 'guru'));

-- 4. Guru dan Admin dapat menghapus materi
CREATE POLICY "Guru and Admin can delete materials"
    ON public.materials FOR DELETE
    USING (public.get_current_role() IN ('admin', 'guru'));

-- ------------------------------------------------------------------------------
-- C. RLS POLICIES: ACTIVITIES
-- ------------------------------------------------------------------------------
-- 1. Kegiatan dapat dilihat oleh semua pengguna
CREATE POLICY "Activities are viewable by everyone"
    ON public.activities FOR SELECT
    USING (true);

-- 2. Hanya Admin yang dapat mengelola (Insert, Update, Delete) kegiatan
CREATE POLICY "Admins can manage activities"
    ON public.activities FOR ALL
    USING (public.get_current_role() = 'admin');

-- ==============================================================================
-- 8. INITIAL SEED DATA (4 BIDANG UTAMA TKJ SMK BANJARASRI & KEGIATAN PRAKTIK)
-- ==============================================================================

-- Seed 4 Bidang Materi Inti
INSERT INTO public.materials (code, title, category, description, content, badge, icon)
VALUES
(
    '01',
    'Pemrograman Website (Backend)',
    'Pemrograman',
    'Mengenal logika server, pengolahan data, dan cara membangun fitur di balik sebuah website.',
    'Siswa belajar dasar-dasar backend modern menggunakan TypeScript/JavaScript dan Python/PHP. Materi mencakup konsep RESTful API, otentikasi JWT/Session, manipulasi basis data PostgreSQL/MySQL, serta integrasi endpoint sistem web sekolah.',
    '01 / CODE',
    'Code'
),
(
    '02',
    'Linux Server & Website Frontend',
    'Sistem Operasi',
    'Berkenalan dengan lingkungan Linux, layanan server, dan antarmuka website.',
    'Eksplorasi sistem operasi open-source Ubuntu Server dan Debian. Siswa mengonfigurasi web server Nginx & Apache, SSH hardening, DNS Server (BIND9), manajemen package Linux, serta deploying aplikasi frontend responsive.',
    '02 / LINUX',
    'Terminal'
),
(
    '03',
    'Jaringan Dasar',
    'Konektivitas',
    'Memahami perangkat, topologi, alamat IP, dan konsep dasar komunikasi jaringan.',
    'Pengenalan fondasi jaringan komputer: Model OSI 7 Layer & TCP/IP, teknik subnetting IPv4/IPv6, crimping kabel UTP Cat5e/6, analisis paket dengan Wireshark, serta konfigurasi switch manageable dan VLAN.',
    '03 / CONNECT',
    'Network'
),
(
    '04',
    'Konfigurasi Mikrotik',
    'Konfigurasi',
    'Latihan konfigurasi router dan pengelolaan koneksi jaringan secara terarah.',
    'Praktik langsung menggunakan RouterBOARD Mikrotik dan RouterOS: Konfigurasi DHCP Server/Client, Firewall NAT & Filter Rules, Manajemen Bandwidth (Simple Queue & Tree), Hotspot captive portal, serta routing dinamis OSPF.',
    '04 / CREATE (MIKROTIK)',
    'Cpu'
)
ON CONFLICT (code) DO UPDATE
SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    content = EXCLUDED.content,
    badge = EXCLUDED.badge,
    icon = EXCLUDED.icon;

-- Seed Kegiatan & Praktik Laboratorium
INSERT INTO public.activities (title, description, date, category, location)
VALUES
(
    'Praktikum Topologi Jaringan & Subnetting IPv4',
    'Pengujian konektivitas antarlab dengan pembagian subnet IP statis dan pengujian packet flow.',
    'Senin, 18 November 2026',
    'Praktik Lab',
    'Lab TKJ 1 - SMK Banjarasri'
),
(
    'Workshop Konfigurasi RouterOS Mikrotik MTCNA Prep',
    'Pengenalan fitur routerboard, konfigurasi hotspot login page sekolah, dan manajemen bandwidth bandwidth limiter.',
    'Rabu, 20 November 2026',
    'Workshop',
    'Lab Jaringan & Server'
),
(
    'Deploy Web Application & Reverse Proxy Nginx di Ubuntu Server',
    'Implementasi full stack application sekolah pada server lokal Linux dengan SSL Let''s Encrypt dan firewall UFW.',
    'Jumat, 22 November 2026',
    'Proyek Siswa',
    'Lab Komputer Utama'
),
(
    'Uji Kompetensi Keahlian (UKK) TKJ 2026/2027',
    'Simulasi perakitan jaringan kantor dan router gateway terkoneksi internet.',
    'Desember 2026',
    'Ujian Praktik',
    'Auditorium & Lab TKJ'
)
ON CONFLICT DO NOTHING;
