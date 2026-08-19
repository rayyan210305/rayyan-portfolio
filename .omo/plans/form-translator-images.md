# Plan: Contact Form + Language Switcher + Project Card Images

**Goal**: Close 3 gaps vs Yuraddin's portfolio — contact form, ID/EN switcher, project card screenshots.

---

## Task 1: Contact Form (Formspree)

**File**: `src/components/Contact.tsx`

Replace the `mailto:` CTA with a real form: Name, Email, Message, Submit button.

- Form action → `https://formspree.io/f/YOUR_FORM_ID` (POST)
- Add `<input type="hidden" name="_subject" value="Portfolio Contact from [name]">` for subject line
- Add `<input type="hidden" name="_captcha" value="true">` for spam protection
- On submit: native HTML form POST (no JS fetch needed — Formspree handles redirect)
- Style: glass input fields, rounded-full submit button matching existing accent style
- Keep the existing social links below the form
- Keep the email CTA as a secondary link below the form

**PREREQUISITE**: User must create a free Formspree form at https://formspree.io and provide the form ID (e.g., `xrgbkzop`).

---

## Task 2: Language Switcher (ID/EN)

**File**: `src/app/layout.tsx` (add Google Translate script), `src/components/Navbar.tsx` (add toggle button)

Approach: Google Translate widget (same as Yuraddin) — zero config, free, works immediately.

1. Add Google Translate script to `<head>` in `layout.tsx`
2. Add a hidden `<div id="google_translate_element">` in body
3. Add a small toggle button in Navbar (globe icon 🌐) that triggers `google.translate.TranslateElement` on click
4. Style: pill button, glass style, matches existing navbar aesthetic
5. Hide the default Google Translate bar/banner via CSS overrides

---

## Task 3: Project Card Images

**File**: `src/components/ProjectCard.tsx`, `public/projects/` (new screenshots)

Add optional `image` prop to ProjectCard. Show screenshot above the tags.

- Screenshot 1: LP3 project — `public/projects/lp3-pramuka.png` (take screenshot of https://pramuka-attendance-2026.vercel.app)
- Screenshot 2: Portfolio — `public/projects/portfolio.png` (take screenshot of https://rayyan-portfolio-nu.vercel.app)
- Image: 400×220, `object-fit: cover`, rounded top corners, lazy loaded
- ProjectCard gets new optional `image?: string` prop
- Image is purely decorative → `alt=""` + `aria-hidden="true"`

---

## Execution Order

1. Task 3 (project card images) — no user input needed
2. Task 2 (language switcher) — no user input needed
3. Task 1 (contact form) — **BLOCKED** until user provides Formspree form ID

## Verification

- Build passes (`npm run build`)
- All 3 features visible on https://rayyan-portfolio-nu.vercel.app after push
- Contact form submits to Formspree dashboard
- Language switcher toggles ID ↔ EN
- Project cards show screenshots
