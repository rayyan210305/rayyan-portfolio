# Plan: Navbar Fix + Cleanup (Paket 2 & 3 Audit)

## Konteks
Portfolio sudah live di https://rayyan-portfolio-nu.vercel.app. Sisa masalah dari audit:
- **Paket 2 (Navbar)**: memory leak IntersectionObserver + UX menu mobile tidak aksesibel
- **Paket 3 (Cleanup)**: 2 komponen mati, link kartu Portfolio salah arah, warning THREE.Clock di console

## Bukti (diverifikasi 2026-08-19)
1. `src/components/Navbar.tsx` line 54-61: `buildSpy()` dipanggil di dalam `setTimeout`, dan `obs?.disconnect()` ditulis sebagai **return value callback setTimeout** → tidak pernah dieksekusi. Observer dibuat ulang tiap mount dan tidak pernah di-disconnect → **memory leak**. Juga: menu mobile tanpa handler Escape, tombol tanpa `aria-expanded`/`aria-controls`, body scroll tidak di-lock saat menu terbuka.
2. `grep GradientMesh|NodeNetwork` di `src/` → hanya definisi di file sendiri, **0 import** → dead code.
3. `src/components/Projects.tsx` line 28: `githubUrl: "https://github.com/rayyan210305"` (profile) — kartu "Portfolio Website" tidak punya `demoUrl`. Repo yang benar sudah ada: `rayyan210305/rayyan-portfolio`. URL live: `https://rayyan-portfolio-nu.vercel.app`.
4. `src/components/Network3D.tsx` line 40: `state.clock.elapsedTime` → deprecated THREE.Clock API, sumber warning console "THREE.Clock: .getElapsedTime() is preferred".

## Perubahan

### 1. EDIT: `src/components/Navbar.tsx` (rewrite penuh)
- Simpan observer di `useRef<IntersectionObserver | null>` (`observerRef`)
- `buildSpy` menetapkan `observerRef.current = observer`; tidak lagi return observer
- Cleanup useEffect: `clearTimeout(timer)` + `observerRef.current?.disconnect()` + reset ke null → **leak hilang**
- Efek baru saat `mobileOpen`: lock `document.body.style.overflow = "hidden"` (restore di cleanup), listener `keydown` Escape → tutup menu
- Tombol toggle: `aria-label` dinamis ("Open menu"/"Close menu"), `aria-expanded={mobileOpen}`, `aria-controls="mobile-menu"`
- Div menu mobile: tambah `id="mobile-menu"`

### 2. HAPUS: `src/components/GradientMesh.tsx`, `src/components/NodeNetwork.tsx`
Dead code, 0 import — aman dihapus.

### 3. EDIT: `src/components/Projects.tsx` (objek `otherProjects` line 22-30)
```ts
{
  title: "Portfolio Website",
  ...
  githubUrl: "https://github.com/rayyan210305/rayyan-portfolio",
  demoUrl: "https://rayyan-portfolio-nu.vercel.app",
}
```

### 4. EDIT: `src/components/Network3D.tsx` line 40
`state.clock.elapsedTime` → `state.clock.getElapsedTime()`

## Verification (wajib)
1. `npm run build` → PASS (TS strict)
2. Playwright di localhost:3100 (restart server dulu):
   - Buka menu mobile (viewport kecil): body scroll terkunci, tekan Escape → menu tertutup, `aria-expanded` berubah
   - Console: **0 error, 0 warning** (THREE.Clock hilang)
3. `git add -A` + commit `fix: navbar leak & a11y, cleanup dead components, THREE.Clock`
4. `git push` → auto-deploy Vercel (repo sudah terhubung)
5. `curl -i https://rayyan-portfolio-nu.vercel.app` → 200

## Risiko
- Escape handler & scroll lock hanya aktif saat menu terbuka → tidak mengganggu desktop
- `getElapsedTime()` identik secara perilaku dengan `elapsedTime` property (tanpa deprecation)
- Kartu portfolio kini punya 2 link (Live Demo + GitHub) → konsisten dengan kartu lain

## TODO
- [ ] Rewrite `src/components/Navbar.tsx` (observerRef, cleanup disconnect, Escape, scroll lock, aria-expanded/controls)
- [ ] Hapus `src/components/GradientMesh.tsx` + `src/components/NodeNetwork.tsx`
- [ ] Fix `Projects.tsx` — githubUrl → repo, tambah demoUrl → URL live
- [ ] Fix `Network3D.tsx` — `state.clock.getElapsedTime()`
- [ ] `npm run build` → PASS
- [ ] Verifikasi Playwright: mobile menu (Escape + scroll lock + aria-expanded), console 0 warning
- [ ] Commit + push → auto-deploy
- [ ] Verifikasi produksi: curl 200