"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Key, type Locale } from "@/lib/i18n";

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({ locale: "de", setLocale: () => {} });
const STORE = "venyou-lang";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, set] = useState<Locale>("de");
  useEffect(() => {
    const saved = localStorage.getItem(STORE) as Locale | null;
    const browser = navigator.language.startsWith("de") ? "de" : "en";
    set(saved ?? browser);
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const setLocale = (l: Locale) => { set(l); localStorage.setItem(STORE, l); };
  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export function useLocale() { return useContext(Ctx); }
export function useT() {
  const { locale } = useContext(Ctx);
  return (k: Key) => dict[locale][k];
}

// Für Server-Komponenten: <T k="events" />
export function T({ k }: { k: Key }) { return <>{useT()(k)}</>; }

export function formatDate(iso: string, locale: Locale, opts?: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", opts ?? { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className={`label flex items-center gap-2 ${className}`}>
      {(["de", "en"] as Locale[]).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted">/</span>}
          <button onClick={() => setLocale(l)} className={`uppercase transition ${locale === l ? "text-accent" : "text-muted hover:text-fg"}`}>{l}</button>
        </span>
      ))}
    </div>
  );
}
