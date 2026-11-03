"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Event } from "@/lib/wp";
import Reveal from "./Reveal";
import { formatDate, useLocale, useT } from "./Locale";

const ease = [0.22, 1, 0.36, 1] as const;

// Übersicht im Deck-Stil: große Zeilen, Bild links, Titel gelb, Datum und Ort rechts.
export default function EventList({ events }: { events: Event[] }) {
  const { locale } = useLocale(); const t = useT();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="border-t border-line">
      {events.map((e, i) => {
        const past = e.date < today;
        return (
          <Reveal key={e.id} delay={i * 0.08}>
            <Link href={`/events/${e.slug}`} className="group grid items-center gap-6 border-b border-line py-8 md:grid-cols-[220px_1fr_auto] md:gap-12 md:py-10">
              <div className="aspect-[4/3] overflow-hidden bg-white/5 md:aspect-[4/5]">
                {e.image && <motion.img src={e.image} alt={e.title} className="h-full w-full object-cover transition duration-[1.6s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />}
              </div>
              <div>
                <p className="label text-muted">{past ? t("archive") : t("events")}</p>
                <h2 className="headline mt-2 text-5xl text-accent md:text-7xl">{e.title}</h2>
                <p className="copy mt-3 text-lg md:text-xl">{e.city ?? e.location}</p>
                {e.lineup?.length ? <p className="label mt-4 text-muted">{e.lineup.join(" · ")}</p> : null}
              </div>
              <div className="md:text-right">
                <p className="headline text-3xl md:text-4xl">{formatDate(e.date, locale, { day: "2-digit", month: "2-digit" })}</p>
                <p className="label mt-1 text-muted">{new Date(e.date).getFullYear()}</p>
                <motion.span className="label mt-6 hidden text-accent md:inline-block" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ ease }}>
                  {past ? t("impressions") : t("tickets")} →
                </motion.span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
