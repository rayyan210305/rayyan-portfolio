# Plan: Fix About Section Animation (terlihat terpotong/tidak natural)

**Status:** DRAFT — menunggu eksekusi via `/start-work`
**Dibuat:** 2026-08-19

## Root Cause (sudah di-diagnosis)

1. **`VIEWPORT` terlalu ketat (`amount: 0.2`)**
   - Animasi baru trigger saat 20% elemen terlihat di viewport.
   - Elemen tinggi (panel Skills & Tools ~450px di mobile) baru animasi saat
     ~90px terlihat → konten tampak "terpotong" di tepi viewport saat scroll.

2. **Foto + bio di About pakai `staggerContainer` (parent trigger)**
   - Parent (`flex flex-col md:flex-row` berisi foto + bio) trigger saat 20%
     container terlihat — di mobile itu artinya hanya foto yang terlihat.
   - Kedua anak (foto DAN bio text yang masih di bawah fold) animasi bersamaan
     saat itu juga → bio selesai animasi **off-screen** → saat user scroll ke
     bawah, bio sudah statis → terlihat tidak natural / "terpotong dari halaman".

## Changes (2 file)

### 1. `src/lib/animations.ts` (line 3)

```diff
- export const VIEWPORT = { once: true, amount: 0.2 } as const;
+ export const VIEWPORT = { once: true, amount: 0.1 } as const;
```

**Alasan:** trigger lebih awal (10% elemen terlihat) → animasi selesai sebelum
elemen sepenuhnya masuk viewport → tidak ada kesan terpotong. Berlaku untuk
semua section (About, Projects, Experience, Education, Contact).

### 2. `src/components/About.tsx` (lines ~38–76)

Pisahkan trigger animasi foto dan bio — masing-masing animasi saat **elemennya
sendiri** masuk viewport, bukan menunggu parent:

```diff
-        <motion.div
-          className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12"
-          variants={staggerContainer}
-          initial="hidden"
-          whileInView="visible"
-          viewport={VIEWPORT}
-        >
+        <motion.div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
           {/* Profile Photo */}
-          <motion.div className="relative shrink-0" variants={fadeUp}>
+          <motion.div
+            className="relative shrink-0"
+            variants={fadeUp}
+            initial="hidden"
+            whileInView="visible"
+            viewport={VIEWPORT}
+          >
             ...photo...
           </motion.div>

           {/* Bio Text */}
           <motion.div
             className="flex-1 space-y-5 text-white/60 leading-relaxed text-center md:text-left"
             variants={fadeUp}
+            initial="hidden"
+            whileInView="visible"
+            viewport={VIEWPORT}
           >
             ...bio...
           </motion.div>
         </motion.div>
```

**Catatan:** `staggerContainer` masih dipakai di tempat lain (skills chips,
Projects tags, Contact social icons) — tidak perlu diubah, itu grup kecil yang
terlihat bersamaan.

## Verification

1. `npm run build` → PASS
2. `git add -A && git commit -m "fix: about animation natural scroll reveal" && git push`
3. Tunggu auto-deploy (~60s), lalu manual check di
   `https://rayyan-portfolio-nu.vercel.app`:
   - Scroll ke About di mobile width: foto muncul dulu, bio menyusul saat
     masuk viewport, panel Skills muncul penuh tanpa kesan terpotong.
   - Semua section lain masih beranimasi normal.