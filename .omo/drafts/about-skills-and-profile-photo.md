# Draft: about-skills-and-profile-photo

slug: about-skills-and-profile-photo
intent: clear
review_required: false
classification: Standard (2 file + 1 asset)
status: awaiting-approval
next-action-on-approval: write .omo/plans/about-skills-and-profile-photo.md, run Metis gap analysis, append todos, fill TL;DR last, deliver handoff brief (Phase 4)

Note: environment has no shell access — scaffold-plan.mjs could not run; draft is hand-written to the same structure. Plan skeleton will also be hand-written using the verbatim template headers from full-workflow.md.

## User request (verbatim)
"Untuk Teach Stack hilangin, aja bagus nya di ganti yang lebih baik. dan untuk Foto Profile saya tolong disesuaikan"

## Components ledger
- C1: Tech Stack panel in About.tsx (lines 1-10 data, lines 55-76 panel) -> replace with "Skills & Tools" grouped tags. Outcome: no percentage bars remain; build green. Evidence path: grep for "level"/"%" in About.tsx + `npm run build`.
- C2: Profile photo public/profile.jpg (renamed from DSCF2902.JPG, Fujifilm camera file) rendered at About.tsx lines 27-37 -> crop headshot square + resize + compress. Outcome: 512x512 JPEG < 150KB, face-centered, rendered correctly. Evidence path: file assertions + worker vision check + `npm run build`.

## Decisions
- C1 (adopted default, announced): grouped skill tags WITHOUT fake percentages. Groups keep only the 8 existing skills (no inventions):
  - Languages: JavaScript, Python, HTML/CSS
  - Web Development: React, Node.js
  - Networking: TCP/IP, Network Configuration
  - Tools: Git, Linux
  Chips styling consistent with Education coursework chips (bg-white/5 border-white/10 text-white/70, mono group headers text-accent/80).
- C2 (user-confirmed 2026-08-18): crop headshot + optimize. Backup original first; heuristic top-anchored square crop for portrait orientation; 512x512 LANCZOS/HQBicubic; JPEG quality ~82; iteration protocol if face is cut (y anchors 0.10/0.22/0.30/0.40); worker must attempt vision-based face-window detection first (planning model has no image input; look_at unavailable in this environment).
- Test strategy: none (repo has no test runner; package.json only has eslint) + agent-executed QA: build + grep assertions + file assertions. Confirmed by adoption; no user question needed.

## Open items
None (the only fork - photo adjustment direction - was answered: "Crop headshot + optimasi (Recommended)").

## Constraints / Must-NOT
- Must-NOT: add new npm packages unless required for image processing (System.Drawing via PowerShell is built-in on Windows - preferred); touch other sections/components (Navbar, Hero, Experience, Education, Projects, Contact, Footer); remove the green online dot; invent skills beyond the 8 existing; change LinkedIn/GitHub URLs.
- Backup public/profile.jpg before overwriting (copy to public/profile-original.jpg).
- Keep section order and ids unchanged (scroll-spy depends on them).
