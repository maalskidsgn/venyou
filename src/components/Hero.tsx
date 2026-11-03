"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo, Cross } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;
const slides = [
  "/eindruecke/2026-06-06-venyou-005.webp",
  "/eindruecke/venyouhotelvelo-48.webp",
  "/eindruecke/donaukanal-002-2.webp",
  "/eindruecke/oceandrive-64-flash.webp",
];

// Hero-Slider: gleitet langsam hin und her (Ping-Pong), alle 6 Sekunden.
export default function Hero() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
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
    <section className="relative h-screen overflow-hidden bg-bg">
      {/* Bilder liegen übereinander: das aktive blendet ein und driftet seitwärts, das vorherige blendet aus */}
      {slides.map((src, n) => (
        <motion.img key={src} src={src} alt="" initial={false}
          animate={{ opacity: n === i ? 0.7 : 0, x: n === i ? (dir > 0 ? "-2%" : "2%") : (dir > 0 ? "2%" : "-2%"), scale: n === i ? 1.02 : 1.1 }}
          transition={{ opacity: { duration: 1.8, ease }, x: { duration: 7, ease: "linear" }, scale: { duration: 7, ease: "linear" } }}
          style={{ position: "absolute", left: "-10%", top: "-10%", width: "120%", height: "120%", maxWidth: "none" }} className="object-cover" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/30 to-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, ease }}>
          <Logo className="w-[70vw] md:w-[46vw]" />
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-6 flex gap-2 md:left-12">
        {slides.map((_, n) => <span key={n} className={`h-[2px] w-8 transition duration-700 ${n === i ? "bg-accent" : "bg-white/30"}`} />)}
      </div>
      <Cross className="absolute bottom-10 right-6 h-7 w-auto md:right-12" />
    </section>
  );
}
