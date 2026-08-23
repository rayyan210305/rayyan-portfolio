"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { translations, type Lang } from "./i18n";

type TranslationLeaf = { readonly id: string; readonly en: string };
type Resolved<T> = T extends TranslationLeaf
  ? string
  : T extends (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T;
type Translations = Resolved<typeof translations>;

function resolve(obj: unknown, lang: Lang): unknown {
  if (obj && typeof obj === "object" && "id" in obj && "en" in obj) {
    return (obj as Record<Lang, string>)[lang];
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => resolve(item, lang));
  }
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = resolve(v, lang);
    }
    return out;
  }
  return obj;
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "en") {
      setLangState("en");
      document.documentElement.lang = "en";
    } else if (!stored && window.navigator.language?.toLowerCase().startsWith("en")) {
      setLangState("en");
      document.documentElement.lang = "en";
      window.localStorage.setItem("lang", "en");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    window.localStorage.setItem("lang", l);
  }, []);

  const t = useMemo(() => resolve(translations, lang) as Translations, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export type { Lang };
