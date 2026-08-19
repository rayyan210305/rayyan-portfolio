"use client";

import { useState, useEffect, useCallback } from "react";

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

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  const buildSpy = useCallback(() => {
    const headings = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (headings.length === 0) return undefined;

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
    return observer;
  }, []);

  useEffect(() => {
    setActiveSection("about");
    const timer = setTimeout(() => {
      const obs = buildSpy();
      return () => obs?.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [buildSpy]);

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
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          rayyan<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/5">
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
