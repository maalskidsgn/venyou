import { lineup2026 } from "@/lib/site";
import { T } from "./Locale";

// Schmales Endlos-Laufband, Namen laufen langsam von links nach rechts.
// Namen pflegen: src/lib/site.ts (lineup2026). Tempo: .ticker-track in globals.css.
export default function LineupTicker() {
  // Eine Hälfte enthält die Liste mehrfach, damit sie auch auf breiten Bildschirmen den Rand füllt.
  const half = [...lineup2026, ...lineup2026, ...lineup2026];
  return (
    <section aria-labelledby="lineup-label" className="border-y border-line py-4 md:py-5">
      <h2 id="lineup-label" className="sr-only"><T k="lineup_2026" /></h2>
      <p className="sr-only">{lineup2026.join(", ")}</p>
      <div className="flex items-center gap-6 md:gap-10" aria-hidden="true">
        <span className="label shrink-0 pl-6 text-accent md:pl-12"><T k="lineup_2026" /></span>
        <div className="ticker-mask relative flex-1 overflow-hidden">
          <div className="ticker-track flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {half.map((name, i) => (
                  <li key={i} className="copy flex items-center whitespace-nowrap text-lg md:text-2xl">
                    <span className="px-5 md:px-8">{name}</span>
                    <span className="text-accent">·</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
