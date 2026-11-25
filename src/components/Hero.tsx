"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo, Cross } from "./Logo";
import { heroVideos } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

// Video-Hero: kurze Sequenzen aus den Event-Clips, die weich aus dem Schwarz aufscheinen und wieder abtauchen.
// Desktop: drei Hochformat-Panels nebeneinander (versetzt). Handy: ein Panel im Vollbild.
// Videos: public/content/hero/ · Liste: src/lib/content.ts (heroVideos)
export default function Hero() {
  const [panels, setPanels] = useState<typeof heroVideos>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPanels(mq.matches ? heroVideos : heroVideos.slice(0, 1));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative h-[100svh] overflow-hidden bg-bg" aria-label="VENYOU">
      <div className="absolute inset-0 flex gap-[2px]">
        {panels.map(({ src, poster }, n) => (
          <motion.div key={src} className="relative h-full flex-1 overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: n * 0.25, ease }}>
            <video src={src} poster={poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/25 to-black/45" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease }}>
          <Logo className="w-[70vw] md:w-[46vw]" />
        </motion.h1>
      </div>
      <Cross variant="accent" className="absolute bottom-10 right-6 h-7 w-auto md:right-12" />
    </section>
  );
}
