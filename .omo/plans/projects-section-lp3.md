# Develop Projects Section — LP3 Pramuka

## Goal
Upgrade satu-satunya proyek nyata (LP3 Putra XVII 2026) ke deskripsi & tag yang akurat, verifikasi link, dan siapkan repo GitHub publik. Fokus 1 proyek dulu (keputusan user).

## Fakta Terverifikasi (live site + GitHub)
- `demoUrl` https://pramuka-attendance-2026.vercel.app — **LIVE** ✅
- Branding asli: "LP3 Putra XVII 2026" — Sistem Absensi Digital Berbasis Barcode & QR, Lomba Perkemahan Pramuka Pesantren, Satuan Komunitas Gerakan Pramuka Aceh
- Stack asli: **vanilla HTML/CSS/JS + Node.js** (bukan React!) — bukti: form POST /login, /vendor/html5-qrcode.min.js, /vendor/qrcode.min.js, /js/main.js
- Repo GitHub `rayyan210305/pramuka-attendance-2026` — **private**, user setuju untuk public-kan
- ⚠️ Login pakai PIN Admin — cek rahasia (PIN hardcoded, .env, API key) SEBELUM public

## Changes

### 1. `src/components/Projects.tsx` — featuredProject (user-approved)
- `title`: "Pramuka Attendance 2026" → **"LP3 Putra XVII 2026 — Sistem Absensi QR"**
- `description`: ganti ke deskripsi asli: sistem absensi digital berbasis barcode & QR untuk event LP3 (Lomba Perkemahan Pramuka Pesantren), Satuan Komunitas Gerakan Pramuka Aceh; scan QR peserta via kamera, generate QR, kelola kehadiran
- `tags`: ["Web App", "Digital Attendance", "React", "Node.js"] → ["QR Code", "Barcode Scanner", "HTML/CSS", "JavaScript", "Node.js"]
- `githubUrl`: tetap (repo akan di-public-kan user)
- `demoUrl`: tetap (verified live)

### 2. User action (manual di GitHub)
- Cek kode untuk PIN hardcoded / .env / API keys → hapus/ubah sebelum publik
- Settings → Danger Zone → Change visibility → Public
- Setelah publik: beri tahu saya, saya scan repo untuk rahasia

## Verification
- `npm run build` — PASS
- Buka demoUrl — 200 OK
- Setelah repo publik: fetch githubUrl — 200 OK

## TODO (untuk worker — eksekusi via /start-work)
- [x] Edit `src/components/Projects.tsx`: ganti featuredProject.title → "LP3 Putra XVII 2026 — Sistem Absensi QR"
- [x] Edit `src/components/Projects.tsx`: ganti featuredProject.description → deskripsi LP3 (barcode & QR, event LP3, GPP Aceh, scan kamera, real-time)
- [x] Edit `src/components/Projects.tsx`: ganti featuredProject.tags → ["QR Code", "Barcode Scanner", "HTML/CSS", "JavaScript", "Node.js"]
- [x] Jangan ubah githubUrl & demoUrl (sudah benar)
- [x] Jalankan `npm run build` → harus PASS
- [x] Report hasil ke user

## User Action (manual, bukan kode)
1. Di repo `pramuka-attendance-2026`: cari `pin`, `PIN`, `.env`, API key → hapus/ganti sebelum publik
2. GitHub → Settings → Danger Zone → Change visibility → **Public**
3. Kabari setelah publik — saya scan repo untuk rahasia yang terlewat
