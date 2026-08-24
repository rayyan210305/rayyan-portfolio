"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-accent text-sm tracking-widest mb-4">
          404
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
          {t.notFound.message}
        </h1>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
        >
          {t.notFound.back}
        </a>
      </div>
    </section>
  );
}
