"use client";
import Reveal from "./Reveal";
import { useLocale } from "./Locale";
import type { LegalDoc } from "@/lib/legal";
import type { Locale } from "@/lib/i18n";

// Gemeinsames Layout für Impressum und Datenschutz. Inhalte: src/lib/legal.ts
export default function LegalPage({ doc }: { doc: Record<Locale, LegalDoc> }) {
  const { locale } = useLocale();
  const d = doc[locale];
  return (
    <main className="px-6 pb-24 pt-28 md:px-10">
      <Reveal>
        <h1 className="headline text-6xl text-accent md:text-8xl">{d.title}</h1>
        {d.intro && <p className="copy mt-8 max-w-2xl text-lg text-muted md:text-xl">{d.intro}</p>}
      </Reveal>
      <div className="mt-16 max-w-3xl space-y-12">
        {d.sections.map((s) => (
          <section key={s.h} className="border-t border-line pt-6">
            <h2 className="label text-muted">{s.h}</h2>
            <div className="copy mt-4 space-y-4 text-base md:text-lg">
              {s.p.map((t, i) => (
                <p key={i} className="whitespace-pre-line">{t}</p>
              ))}
            </div>
          </section>
        ))}
        <p className="label text-muted">{d.updated}</p>
      </div>
    </main>
  );
}
