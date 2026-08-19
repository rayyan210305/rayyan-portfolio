# Plan: Sistem Animasi Konten (framer-motion) — Elegant & Profesional

## Konteks
Portfolio Rayyan Mardhatillah (Next.js 16.3.1, Tailwind v4, dark theme #0A0A0F, accent #A78BFA).
Saat ini: Hero sudah pakai framer-motion, tapi section lain (About, Projects, Experience, Education, Contact) masih pakai CSS transition sederhana via hook `useScrollReveal` (fade+translateY sekali, tanpa stagger).

**Keputusan user (disepakati):**
- Gaya: **Elegant & profesional** — fade + slide halus, stagger bertahap, hover glow (tidak norak)
- Library: **framer-motion saja** (sudah terpasang v13.1.0, tanpa dependensi baru)

## Tujuan
Sistem animasi konsisten di seluruh section:
1. Heading muncul fadeUp saat masuk viewport (sekali, tidak berulang)
2. Kartu/elemen besar muncul dengan scale-in halus
3. Tag/skill/pill muncul stagger berurutan (efek "berbaris masuk")
4. Timeline Experience: slide masuk bergantian kiri/kanan (subtle)
5. Semua animasi menghormati `prefers-reduced-motion` (aksesibilitas)
6. Hero & hover CSS yang sudah ada TIDAK diubah

## File yang Diubah

### BARU: `src/components/AnimationProvider.tsx` (client)
```tsx
"use client";
import { MotionConfig } from "framer-motion";

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```
→ Semua animasi otomatis menonaktifkan transform untuk user yang memilih reduced motion.

### EDIT: `src/app/layout.tsx`
- Import `AnimationProvider`, bungkus `{children}`:
```tsx
<body className="min-h-screen bg-background text-foreground antialiased">
  <AnimationProvider>{children}</AnimationProvider>
</body>
```

### BARU: `src/lib/animations.ts` (shared variants)
```ts
import type { Variants } from "framer-motion";

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};
```

### EDIT: `src/components/About.tsx`
- Tambah `"use client"` (BELUM ADA — wajib untuk motion)
- Import: `motion` dari framer-motion + variants dari `@/lib/animations`
- Hapus hook useScrollReveal (About tidak memakainya — cek: tidak ada import, aman)
- Pola:
  - Header: `<motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>`
  - Foto + bio: dua `motion.div` fadeUp (delay 0.1 / 0.2 via `custom` atau transisi inline — pakai staggerContainer+staggerItem di parent)
  - Skills panel: `motion.div` scaleIn
  - Skill pills: parent `motion.div variants={staggerContainer}` → tiap pill `motion.span variants={staggerItem}`

### EDIT: `src/components/Projects.tsx`
- Sudah "use client" ✅
- Header: fadeUp
- Featured card: scaleIn
- Tags featured: staggerContainer + staggerItem
- Kartu "other projects": parent staggerContainer → tiap `ProjectCard` dibungkus `motion.div variants={staggerItem}`

### EDIT: `src/components/Experience.tsx`
- Header: fadeUp
- Timeline items: index genap → slideInRight, ganjil → slideInLeft (bergantian, subtle)
- Tags per item: staggerContainer + staggerItem
- Hapus penggunaan `useScrollReveal` + import

### EDIT: `src/components/Education.tsx`
- Header: fadeUp
- Kartu: scaleIn
- Coursework pills: staggerContainer + staggerItem
- Hapus penggunaan `useScrollReveal` + import

### EDIT: `src/components/Contact.tsx`
- Header: fadeUp
- Glass card: scaleIn
- Social icons: staggerContainer + staggerItem
- Hapus penggunaan `useScrollReveal` + import

### HAPUS: `src/hooks/useScrollReveal.ts`
Setelah semua 5 komponen migrasi ke framer-motion, hook ini tidak terpakai → hapus (konsisten dengan cleanup dead code sebelumnya).

### TIDAK DIUBAH
- `Hero.tsx` (sudah animated framer-motion)
- `Navbar.tsx`, `Footer.tsx` (di luar scope — Navbar ada plan bug-fix sendiri)
- `Network3D.tsx`, `globals.css`, `ProjectCard.tsx` (hover CSS sudah bagus)
- Data konten (teks, link, tags) — TIDAK boleh berubah

## Verification (wajib)
1. `npm run build` → PASS (TypeScript clean, 0 error)
2. Playwright di localhost:3100:
   - Scroll ke semua section → semua konten terlihat (opacity akhir = 1)
   - Console: 0 error
   - Simulasi `prefers-reduced-motion: reduce` → konten tetap terlihat (tidak transform)
3. Pastikan scroll-spy Navbar tetap jalan (animasi tidak mengubah layout)

## Risiko & Mitigasi
- **About.tsx belum "use client"** → ditambahkan di langkah pertama (kalau lupa → build error, langsung ketahuan)
- **Animasi menghalangi konten** → semua animasi one-shot (`once: true`), durasi pendek (≤0.6s), tidak ada infinite
- **Reduced motion** → MotionConfig `reducedMotion="user"` (framer-motion otomatis matikan transform)

## TODO (untuk worker — eksekusi via /start-work)
- [x] Buat `src/components/AnimationProvider.tsx` + pasang di `layout.tsx`
- [x] Buat `src/lib/animations.ts` (variants + VIEWPORT)
- [x] Edit `About.tsx`: +"use client", header fadeUp, foto/bio stagger, skills panel scaleIn, pills stagger
- [x] Edit `Projects.tsx`: header fadeUp, featured card scaleIn, tags stagger, kartu stagger
- [x] Edit `Experience.tsx`: header fadeUp, timeline alternate slideIn, tags stagger, hapus useScrollReveal
- [x] Edit `Education.tsx`: header fadeUp, kartu scaleIn, coursework stagger, hapus useScrollReveal
- [x] Edit `Contact.tsx`: header fadeUp, card scaleIn, icons stagger, hapus useScrollReveal
- [x] Hapus `src/hooks/useScrollReveal.ts` (sudah tidak terpakai)
- [x] `npm run build` → PASS
- [x] Verifikasi Playwright (konten terlihat, 0 error console, reduced-motion OK)
- [x] Report hasil ke user
