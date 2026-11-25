"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo, Cross } from "./Logo";
import { hero, heroDesktopColumns, type HeroItem } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const PHOTO_MS = 6000; // so lange steht ein Foto, bevor weich gewechselt wird
const VIDEO_MS = 6000; // Länge des Hero-Clips (nur Handy)
const FADE_S = 1.6; // Dauer der Überblendung
const ZOOM_FROM = 1.15; // Startzoom der Fotos, zoomt langsam auf 1 heraus
const DESKTOP_OFFSET_MS = 2300; // Versatz zwischen den drei Desktop-Panels
const HERO_DESKTOP_SLIDES = false; // true = drei Diashows auf dem Desktop, false = schwarz

// Hero (Inhalte: src/lib/content.ts → hero)
// Desktop: drei Panels mit eigener Diashow, zeitversetzt. Handy: Video + Fotos. Fotos zoomen jeweils langsam heraus.
export default function Hero() {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative h-[100svh] overflow-hidden bg-bg" aria-label="VENYOU">
      {/* Desktop: vorerst nur schwarzer Hintergrund mit Logo. Diashow wieder an: HERO_DESKTOP_SLIDES = true */}
      {desktop === true && HERO_DESKTOP_SLIDES && (
        <div className="absolute inset-0 flex gap-[2px]">
          {heroDesktopColumns.map((col, n) => (
            <motion.div key={n} className="relative h-full flex-1 overflow-hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.2 + n * 0.35, ease }}>
              <Slideshow items={col.map((src) => ({ type: "image" as const, src }))} startDelay={n * DESKTOP_OFFSET_MS} />
            </motion.div>
          ))}
        </div>
      )}
      {desktop === false && <Slideshow items={hero} />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-black/20 to-black/40" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease }}>
          <Logo className="w-[70vw] md:w-[46vw]" />
        </motion.h1>
      </div>
      <Cross variant="accent" className="absolute bottom-10 right-6 h-7 w-auto md:right-12" />
    </section>
  );
}

function Slideshow({ items, startDelay = 0 }: { items: HeroItem[]; startDelay?: number }) {
  const [i, setI] = useState(0);
  const item = items[i % items.length];

  useEffect(() => {
    if (items.length < 2) return;
    // Nächstes Foto schon vorladen, damit die Überblendung nicht ins Leere geht
    const upcoming = items[(i + 1) % items.length];
    if (upcoming.type === "image") new Image().src = upcoming.src;
    // Fester Takt, damit es auch weiterläuft, wenn der Browser Autoplay blockiert
    const wait = (item.type === "video" ? VIDEO_MS : PHOTO_MS) + (i === 0 ? startDelay : 0);
    const id = setTimeout(() => setI((cur) => cur + 1), wait);
    return () => clearTimeout(id);
  }, [i, items.length, item.type, startDelay]);

  return (
    <AnimatePresence initial={false}>
      <motion.div key={`${item.src}-${i}`} className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: FADE_S, ease }}>
        {item.type === "video" ? (
          <video src={item.src} poster={item.poster} autoPlay muted playsInline loop={items.length === 1}
            preload="auto" aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <motion.img src={item.src} alt="" aria-hidden="true" decoding="async"
            style={{ objectPosition: item.position ?? "50% 50%" }}
            initial={{ scale: ZOOM_FROM }} animate={{ scale: 1 }}
            transition={{ duration: (PHOTO_MS + (i === 0 ? startDelay : 0)) / 1000 + FADE_S, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 h-full w-full object-cover" />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
