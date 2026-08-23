"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { useLanguage, type Lang } from "@/lib/LanguageContext";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-muted hover:text-foreground border border-foreground/10 hover:border-accent/30 rounded-full p-2 transition-all duration-200"
      aria-label={t.nav.theme}
      title={t.nav.theme}
    >
      {!mounted ? (
        <span className="block w-4 h-4" />
      ) : isDark ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#education", label: t.nav.education },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (resolvedTheme) {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", resolvedTheme === "light" ? "#f6f7fb" : "#0A0A0F");
    }
  }, [resolvedTheme]);

  const buildSpy = useCallback(() => {
    const headings = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ay = a.boundingClientRect.top;
            const by = b.boundingClientRect.top;
            return Math.abs(ay) - Math.abs(by);
          });
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("id");
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    observerRef.current = observer;
  }, [t]);

  useEffect(() => {
    setActiveSection("about");
    const timer = setTimeout(() => buildSpy(), 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [buildSpy]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [langOpen]);

  const switchLang = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  const linkClass = (href: string) => {
    const id = href.replace("#", "");
    const isActive = activeSection === id;
    return `text-sm transition-colors duration-200 ${
      isActive ? "text-foreground font-medium" : "text-muted hover:text-foreground"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-foreground tracking-tight">
          rayyan<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}

          <ThemeToggle />

          {/* Language toggle */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-xs font-mono text-muted hover:text-foreground border border-foreground/10 hover:border-accent/30 rounded-full px-3 py-1.5 transition-all duration-200"
              aria-label="Switch language"
              aria-expanded={langOpen}
            >
              {langOpen ? "🌐" : lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 py-1 min-w-[80px] rounded-lg glass z-50">
                {(["id", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLang(l)}
                    className={`block w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      lang === l
                        ? "text-accent font-medium"
                        : "text-foreground/70 hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px bg-foreground transition-transform ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background/95 backdrop-blur-xl border-t border-foreground/5"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Mobile theme + language toggles */}
            <div className="pt-2 border-t border-foreground/10 flex items-center gap-3">
              <ThemeToggle />
              {(["id", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                    lang === l
                      ? "text-accent border-accent/30 bg-accent/10"
                      : "text-muted border-foreground/10 hover:border-accent/30"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
