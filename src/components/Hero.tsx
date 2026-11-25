"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo, Cross } from "./Logo";
import { hero, type HeroItem } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const PHOTO_MS = 5000; // so lange steht ein Foto auf dem Handy, bevor weich gewechselt wird
const VIDEO_MS = 6000; // Länge des Hero-Clips

// Hero mit drei Elementen (src/lib/content.ts → hero).
// Desktop: drei Panels nebeneinander, blenden versetzt auf. Fotos atmen langsam (leichter Zoom), Video läuft in Schleife.
// Handy: ein Element im Vollbild, Video → Foto → Foto, mit weichen Überblendungen.
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
      {desktop === true && <DesktopPanels />}
      {desktop === false && <MobileSequence />}
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

function Media({ item, loop }: { item: HeroItem; loop?: boolean }) {
  if (item.type === "video") {
    return (
      <video src={item.src} poster={item.poster} autoPlay muted playsInline loop={loop}
        preload="auto" aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" />
    );
  }
  return <img src={item.src} alt="" aria-hidden="true" className="hero-breathe absolute inset-0 h-full w-full object-cover" />;
}

function DesktopPanels() {
  return (
    <div className="absolute inset-0 flex gap-[2px]">
      {hero.map((item, n) => (
        <motion.div key={item.src} className="relative h-full flex-1 overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.2 + n * 0.35, ease }}>
          <Media item={item} loop />
        </motion.div>
      ))}
    </div>
  );
}

function MobileSequence() {
  // Video zuerst, danach die Fotos
  const order = [...hero.filter((h) => h.type === "video"), ...hero.filter((h) => h.type === "image")];
  const [i, setI] = useState(0);
  const item = order[i];
  const next = () => setI((cur) => (cur + 1) % order.length);

  useEffect(() => {
    // Fester Takt statt "Video zu Ende", damit es auch weiterläuft, wenn der Browser Autoplay blockiert
    const id = setTimeout(next, item.type === "video" ? VIDEO_MS : PHOTO_MS);
    return () => clearTimeout(id);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence initial={false}>
      <motion.div key={`${item.src}-${i}`} className="absolute inset-0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease }}>
        <Media item={item} loop={order.length === 1} />
      </motion.div>
    </AnimatePresence>
  );
}
