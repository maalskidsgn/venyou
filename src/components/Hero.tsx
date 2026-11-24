"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo, Cross } from "./Logo";
import { heroSlides as slides } from "@/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;

// Hero-Slider: blendet alle 6 Sekunden weiter (Ping-Pong). Bilder: src/lib/images.ts (heroSlides).
// Bewusst nur leichte Bewegung (max. 4 % Zoom), damit die Fotos kaum beschnitten werden.
export default function Hero() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setI((cur) => {
        const next = cur + dir;
        if (next >= slides.length || next < 0) { setDir(-dir); return cur - dir; }
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [dir]);

  return (
    <section className="relative h-[100svh] overflow-hidden bg-bg" aria-label="VENYOU">
      {slides.map((src, n) => (
        <motion.img key={src} src={src} alt="" initial={false} decoding="async"
          fetchPriority={n === 0 ? "high" : "low"} loading={n === 0 ? "eager" : "lazy"}
          animate={{ opacity: n === i ? 0.75 : 0, scale: n === i ? 1.04 : 1, x: n === i ? (dir > 0 ? "-1%" : "1%") : "0%" }}
          transition={{ opacity: { duration: 1.8, ease }, x: { duration: 7, ease: "linear" }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0 h-full w-full object-cover" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/20 to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease }}>
          <Logo className="w-[70vw] md:w-[46vw]" />
        </motion.h1>
      </div>
      <div className="absolute bottom-10 left-6 flex gap-2 md:left-12" aria-hidden>
        {slides.map((_, n) => <span key={n} className={`h-[2px] w-8 transition duration-700 ${n === i ? "bg-accent" : "bg-white/30"}`} />)}
      </div>
      <Cross variant="accent" className="absolute bottom-10 right-6 h-7 w-auto md:right-12" />
    </section>
  );
}
