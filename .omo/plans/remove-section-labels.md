# Remove Section Labels

## Summary
Hapus label `/ about`, `/ projects`, `/ experience`, `/ education`, `/ contact` dari semua komponen section.

## Files to Edit

### 1. `src/components/About.tsx` (line 14)
Hapus: `<p className="font-mono text-sm text-accent/70 mb-3">/ about</p>`

### 2. `src/components/Projects.tsx` (line 40)
Hapus: `<p className="font-mono text-sm text-accent/70 mb-3">/ projects</p>`

### 3. `src/components/Experience.tsx` (line 41)
Hapus: `<p className="font-mono text-sm text-accent/70 mb-3">/ experience</p>`

### 4. `src/components/Education.tsx` (line 20)
Hapus: `<p className="font-mono text-sm text-accent/80 mb-4">/ education</p>`

### 5. `src/components/Contact.tsx` (line 23)
Hapus: `<p className="font-mono text-sm text-accent/70 mb-3">/ contact</p>`

## Verification
- Run `npm run build` — should pass with no errors
