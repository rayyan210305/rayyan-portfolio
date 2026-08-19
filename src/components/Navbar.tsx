"use client";

import { useState, useEffect, useCallback, useRef } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          InlineLayout: { SIMPLE: number };
          new (options: object, container: string): void;
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  }, []);

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

  const switchLang = (lang: string) => {
    setLangOpen(false);
    const frame = document.querySelector(
      "iframe.goog-te-menu-frame"
    ) as HTMLIFrameElement | null;
    if (!frame) return;
    const body = frame.contentDocument?.body;
    if (!body) return;
    const items = body.querySelectorAll<HTMLElement>("[lang]");
    for (const item of items) {
      if (item.getAttribute("lang") === lang) {
        item.click();
        break;
      }
    }
  };

  const linkClass = (href: string) => {
    const id = href.replace("#", "");
    const isActive = activeSection === id;
    return `text-sm transition-colors duration-200 ${
      isActive ? "text-white font-medium" : "text-white/50 hover:text-white"
    }`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          rayyan<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-xs font-mono text-white/50 hover:text-white border border-white/10 hover:border-accent/30 rounded-full px-3 py-1.5 transition-all duration-200"
              aria-label="Switch language"
              aria-expanded={langOpen}
            >
              {langOpen ? "🌐" : "ID"}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 py-1 min-w-[80px] rounded-lg glass border border-white/10 z-50">
                <button
                  onClick={() => switchLang("id")}
                  className="block w-full text-left px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  ID
                </button>
                <button
                  onClick={() => switchLang("en")}
                  className="block w-full text-left px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  EN
                </button>
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
            className={`block w-5 h-px bg-white transition-transform ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-white transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/5"
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
          </div>
        </div>
      )}
    </nav>
  );
}
