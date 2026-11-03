"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { eindruecke } from "@/lib/eindruecke";
import Reveal from "./Reveal";

type Img = (typeof eindruecke)[number];

// Drei Spalten, die beim Scrollen unterschiedlich schnell laufen (Parallax-Masonry).
export default function Eindruecke() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const cols: Img[][] = [[], [], []];
  eindruecke.forEach((img, i) => cols[i % 3].push(img));

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {cols.map((col, c) => (
        <motion.div key={c} style={{ y: [y1, y2, y3][c] }} className={`flex flex-col gap-3 md:gap-5 ${c === 2 ? "hidden md:flex" : ""}`}>
          {col.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.1}>
              <div className="overflow-hidden bg-white/5" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                <motion.img src={img.src} alt="" loading="lazy" width={img.w} height={img.h}
                  initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover" />
              </div>
            </Reveal>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
