# Plan: Deploy Vercel + Favicon + Metadata/OG (Paket 1 Audit)

## Konteks
Portfolio Rayyan Mardhatillah sudah selesai animasi (framer-motion). Sekarang masalah terbesar: **portfolio hanya jalan di localhost — rekruter tidak bisa akses**. Plus favicon masih bawaan Next.js dan metadata minim (preview share generik tanpa gambar).

**Status lingkungan (sudah diverifikasi):**
- `.gitignore` lengkap ✅ (node_modules, .next, .env, .vercel ter-ignore)
- Git repo BELUM ada → perlu `git init`
- gh CLI terautentikasi sebagai `rayyan210305` ✅ → bisa buat repo + push
- Nama repo `rayyan-portfolio` tersedia ✅
- Vercel CLI belum terpasang → `npx vercel` (otomatis download) atau import dashboard
- User sudah punya akun Vercel (LP3 deployed via dashboard)

## Tujuan
1. Portfolio bisa diakses publik via Vercel (`https://rayyan-portfolio.vercel.app`)
2. Favicon custom (monogram "R" — identitas Rayyan)
3. Metadata lengkap: Open Graph + Twitter card + keywords + canonical → preview share profesional dengan gambar
4. Bersihkan file scaffold bawaan Next.js dari `public/`

## File yang Diubah

### BARU: `src/app/icon.svg` (favicon — Next.js file convention)
SVG 32×32, background gelap `#0A0A0F` rounded (radius 8), huruf "R" bold dengan gradient accent `#A78BFA` → `#60A5FA`, font sans-serif bold. Berkas konvensi Next: `app/icon.svg` otomatis jadi favicon — hapus `src/app/favicon.ico` bawaan agar tidak dobel.

### BARU: `src/app/opengraph-image.tsx` (OG image — Next.js file convention)
- Pakai `ImageResponse` dari `next/og`, ukuran **1200×630**
- Desain: bg `#0A0A0F`, teks besar "Rayyan Mardhatillah" (putih, bold), subteks "Network & Web Engineer" (accent `#A78BFA`), aksen: garis gradient + node network dekoratif (circle kecil), URL "rayyan-portfolio.vercel.app" di sudut bawah
- Font: coba fetch Inter dari Google Fonts, fallback ke sans-serif sistem jika gagal (try/catch)
- Konvensi Next otomatis inject `<meta og:image>` + `<meta twitter:image>`

### EDIT: `src/app/layout.tsx` — metadata lengkap
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://rayyan-portfolio.vercel.app"),
  title: "Rayyan Mardhatillah | Network & Web Engineer",
  description: "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala, Network & Web Engineer. Proyek: LP3 Putra XVII Sistem Absensi QR.",
  keywords: ["Rayyan Mardhatillah", "Portfolio", "Network Engineer", "Web Developer", "Teknik Komputer", "Universitas Syiah Kuala", "Banda Aceh", "React", "Node.js", "QR Absensi"],
  authors: [{ name: "Rayyan Mardhatillah", url: "https://github.com/rayyan210305" }],
  creator: "Rayyan Mardhatillah",
  publisher: "Rayyan Mardhatillah",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Rayyan Mardhatillah",
    title: "Rayyan Mardhatillah | Network & Web Engineer",
    description: "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayyan Mardhatillah | Network & Web Engineer",
    description: "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala.",
  },
};
```
(Gambar OG otomatis dari opengraph-image.tsx — tidak perlu manual)

### HAPUS dari `public/`
- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (5 file scaffold tidak terpakai)
- TETAP simpan: `profile.jpg`, `profile-original.jpg`
- `src/app/favicon.ico` (digantikan icon.svg)

## Deploy (terminal ops — dijalankan setelah build PASS)

```powershell
# 1. Git init + commit
git init -b main
git add -A
git commit -m "Initial commit: portfolio Rayyan Mardhatillah"

# 2. Buat repo GitHub + push (gh sudah autentikasi)
gh repo create rayyan-portfolio --public --source . --push

# 3. Deploy Vercel — coba CLI (login interaktif browser, user selesaikan)
npx vercel --prod
# FALLBACK: jika login CLI gagal/rumit → user import repo di dashboard Vercel (pola sama seperti LP3)
```

## Verification (wajib)
1. `npm run build` → PASS sebelum deploy
2. Playwright localhost:3100:
   - `<link rel="icon">` menunjuk icon.svg (bukan favicon.ico)
   - Head berisi: `og:title`, `og:image` (URL /opengraph-image), `twitter:card`, `keywords`, `canonical`
   - Halaman tetap render sempurna (0 error)
3. Setelah deploy: `curl -i https://rayyan-portfolio.vercel.app` → 200
4. `curl https://rayyan-portfolio.vercel.app/opengraph-image` → 200 gambar PNG

## Risiko & Mitigasi
- **URL Vercel tidak sesuai prediksi** → setelah deploy, cek URL aktual; jika bukan `rayyan-portfolio.vercel.app`, update `metadataBase` + canonical, rebuild, redeploy
- **Login Vercel CLI interaktif** → fallback dashboard import (pola LP3 yang sudah terbukti)
- **Font fetch gagal saat build OG** → try/catch fallback sans-serif (gambar tetap jalan)
- **Commit pertama besar** (semua kode + animasi) → wajar, ini initial commit

## TODO (eksekusi berurutan — ada dependency)
- [ ] Buat `src/app/icon.svg` + hapus `src/app/favicon.ico`
- [ ] Buat `src/app/opengraph-image.tsx` (ImageResponse 1200×630)
- [ ] Edit `layout.tsx` — metadata lengkap (openGraph, twitter, keywords, authors, robots, canonical, metadataBase)
- [ ] Hapus 5 file scaffold dari `public/`
- [ ] `npm run build` → PASS
- [ ] Verifikasi Playwright (icon + meta tags di head, render OK)
- [ ] `git init` + commit + `gh repo create rayyan-portfolio --public --source . --push`
- [ ] Deploy Vercel (`npx vercel --prod` atau fallback dashboard)
- [ ] Verifikasi deploy: curl 200 + og:image reachable
- [ ] Report ke user (URL publik)
