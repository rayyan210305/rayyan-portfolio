# Plan: about-skills-and-profile-photo

- **Objective**: Replace fake-percentage Tech Stack panel with honest grouped skill tags; crop + optimize profile photo to a centered 512×512 headshot
- **Approach**: Two independent atomic changes (C1: About.tsx data + panel markup; C2: PowerShell System.Drawing crop/compress + tiny CSS tweak). Both can run in sequence within one worker. No new npm packages needed (System.Drawing ships with Windows .NET Framework).
- **Must NOT do**: edit Navbar/Hero/Experience/Education/Projects/Contact/Footer; remove the green online dot; change social URLs; add new skills beyond the 8 already listed; delete `public/profile-original.jpg` backup.
- **Architecture/Scope Decision**: C1 is a content swap (same file, same glass panel style). C2 is asset pipeline (backup → inspect → crop → resize → compress → verify). Sequential in one worker; no cross-dependencies.
- **Agent Type**: Single deep worker with photography/PowerShell/image-processing load_skills (none specific needed; the prompt contains all execution detail).
- **QA Policy**: None (no test runner in repo). Agent-executed QA: `npm run build` + grep assertions + file-dimension assertions.
- **Must HAVE**:
  - `techStack` array and its `<div className="text-xs text-white/60">{stack.level}%</div>` rendered replaced; no percentage text remains in About.tsx
  - Skills displayed under mono headers (Languages / Web Development / Networking / Tools) with chip tags matching Education coursework style
  - `public/profile.jpg` exists, is ≤512×512, JPEG, < 150 KB, face visible (heuristic or vision-verified)
  - `npm run build` exits 0
- **Should Have**:
  - `object-position: 50% 20%` on the img element as safety net for face framing
  - Backup of original photo at `public/profile-original.jpg`
  - Build time delta noted (< +5 s)
- **Explicitly OUT of scope**:
  - Anything outside About.tsx and public/profile.jpg
  - Changes to any other component, section order, navigation, or footer
  - New npm dependencies (System.Drawing is built-in on Windows)
  - New assets beyond the backup photo
- **Plan (ordered steps to completion)**:
  1. **Step 1 — C1: Rewrite About.tsx skill data and panel** (quick)
     - Replace `techStack` array (lines 1-10) with `skillGroups` array (4 groups, 8 skills total — same skills, zero inventions)
     - Replace tech-stack `<div className="p-8 rounded-2xl glass border border-white/10">` block (lines 55-76) with grouped-tag layout: mono group headers (text-accent/80) + flex-wrap chips (bg-white/5 border-white/10 text-white/70 hover:border-accent/30) — same style as Education coursework tags
     - Verify: no `level` or `%` in the diff; build green
     - Files: `src/components/About.tsx`
  2. **Step 2 — C2: Backup + crop + optimize profile photo** (standard)
     - Backup: `Copy-Item public/profile.jpg public/profile-original.jpg`
     - PowerShell + System.Drawing: load `profile.jpg`, detect orientation, compute square crop rect
       - Portrait (H > W): x=0, y=int(H × 0.22), size=W (top-anchored face zone)
       - Landscape: x=int((W-H)/2), y=0, size=H
     - DrawImage → 512×512 (HighQualityBicubic) → Save JPEG quality=82
     - Verify: dimensions == 512×512; file size < 150 KB
     - Iteration protocol: re-read output; if face cut off, re-crop with y anchors (0.10 → 0.30 → 0.40)
     - Files: `public/profile.jpg`
  3. **Step 3 — C2: CSS safety net** (quick)
     - Add `style={{ objectPosition: '50% 20%' }}` to the profile `<img>` in About.tsx (line 28)
     - Files: `src/components/About.tsx`
  4. **Step 4 — Final verification** (standard)
     - `npm run build` — must exit 0
     - `grep -n "level\|%" src/components/About.tsx` — must return zero matches
     - `identify` or PowerShell on `public/profile.jpg` — must report 512×512
     - Report build time delta
  5. **Step 5 — Commit** (standard, only if green)
     - Message: `[about] Replace tech-stack % bars with grouped skill tags; crop + optimize profile photo`
     - Files: `src/components/About.tsx`, `public/profile.jpg`, `public/profile-original.jpg`
- **Commit**: atomic single commit containing both changes (C1 + C2 are small, co-located, and logically complete together)
- **Final Verification Wave (MANDATORY)**:
  - **F1 [quick] Regression scan**: `npm run build` passes; no percent or "level" text in About.tsx
  - **F2 [visual] Screenshot / asset inspection**: profile.jpg is 512×512 JPEG; About.tsx renders grouped chips
  - **F3 [research] Codebase drift**: no accidental edits outside About.tsx + profile.jpg
  - **F4 [deep] Second-opinion safety**: N/A (no infra changes, no high-risk modifications)
- **Delegation Recommendation**:
  - Category: `quick`
  - Skills: none required (PowerShell + System.Drawing built-in; ESLint only)
  - Run in background: false (single worker, sequential steps)
- **Execution Instructions**:
  1. Per-delegate blocking instructions (issue these BEFORE dispatching the worker — they control sequencing):
     - `BLOCK UNTIL QA PASS — DO NOT MERGE`: Complete all 5 steps; run F1–F3; if any assertion fails, fix and re-run; only commit when all pass; report file changes + build time delta
  2. Send the `bg_` IDs from delegation calls to `$ask_acceptance`
  3. Standard dispatch sequence:
     - Single deep worker, prompt includes the full step-by-step spec above
     - Delegate the QA run as part of Step 4 in the same worker (it is small and fast; not worth a separate agent)
  4. Core objective: Replace Tech Stack percentage bars with grouped skill tags (Languages/Web Dev/Networking/Tools); crop profile.jpg to 512×512 face-centered headshot under 150 KB
  5. Must do: backup original photo; keep same glass panel style; keep all 8 skills; run build
  6. Must NOT do: touch other components; add new npm packages; remove online dot; change social URLs
  7. Expected outcome: About.tsx renders grouped skill chips (no percentages); profile.jpg is 512×512 <150 KB; `npm run build` green
- **Agent Identity**: Prometheus (this plan was authored in plan mode; execute via `$start-work`)
- **References**:
  - `src/components/About.tsx` lines 1-10 (techStack array — target of C1 data rewrite)
  - `src/components/About.tsx` lines 55-76 (tech-stack panel — target of C1 markup rewrite)
  - `src/components/About.tsx` lines 27-37 (img element — target of C2 CSS tweak)
  - `src/components/Education.tsx` (reference for chip/tag styling: bg-white/5 border-white/10 text-white/70 + mono headers)
  - `public/profile.jpg` (target asset for C2)
  - `.omo/drafts/about-skills-and-profile-photo.md` (approved draft)

## TL;DR
- **What**: Two atomic changes — (1) replace fake-percentage Tech Stack panel in About.tsx with honest grouped skill tags, (2) crop + compress public/profile.jpg to a 512×512 face-centered headshot under 150 KB.
- **Must Have**: No percent/level text in About.tsx; grouped tags visible; profile.jpg at 512×512 JPEG <150KB; `npm run build` passes.
- **Must NOT Have**: Edits to any file other than About.tsx and profile.jpg; new npm packages; removed online dot; changed social URLs; new skill names beyond the 8 existing.
- **Default confirmed**: Grouped skill tags (no percentages) for Tech Stack; crop + optimize for profile photo; agent-executed QA (no test runner in repo).
- **Scope**: IN: `src/components/About.tsx`, `public/profile.jpg`, `public/profile-original.jpg` (backup). OUT: everything else.
- **Acceptance**: `npm run build` exits 0; `grep -n "level\|%" About.tsx` returns zero; profile.jpg dimensions == 512×512; profile.jpg file size < 150 KB; visual inspection shows face in crop.
- **Commit strategy**: Single atomic commit once green.
- **QA**: None (no test runner); agent-executed QA: build + grep assertions + file assertions + visual check.
- **Automation**: Approval received (user said "Ekseskusikannn"); plan written; delegate to `$start-work` for execution.
