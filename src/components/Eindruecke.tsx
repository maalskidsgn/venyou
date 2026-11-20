"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { eindruecke, type Img } from "@/lib/eindruecke";
import Reveal from "./Reveal";

function split(images: Img[], n: number) {
  const cols: Img[][] = Array.from({ length: n }, () => []);
  images.forEach((img, i) => cols[i % n].push(img));
  return cols;
}

function Column({ images, y }: { images: Img[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 md:gap-5">
      {images.map((img, i) => (
        <Reveal key={img.src} delay={(i % 3) * 0.1}>
          {/* Seitenverhältnis = Originalfoto, dadurch wird nichts beschnitten */}
          <div className="overflow-hidden bg-white/5" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
            <motion.img src={img.src} alt="VENYOU Event" loading="lazy" decoding="async" width={img.w} height={img.h}
              initial={{ scale: 1.04 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover" />
          </div>
        </Reveal>
      ))}
    </motion.div>
  );
}

// Spalten, die beim Scrollen leicht unterschiedlich schnell laufen (Parallax-Masonry).
// Handy: 2 Spalten, ab Tablet: 3 Spalten. Es werden immer alle Bilder gezeigt.
export default function Eindruecke({ images = eindruecke }: { images?: Img[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const ys = [y1, y2, y3];

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {split(images, 2).map((col, c) => <Column key={c} images={col} y={ys[c]} />)}
      </div>
      <div className="hidden grid-cols-3 gap-5 md:grid">
        {split(images, 3).map((col, c) => <Column key={c} images={col} y={ys[c]} />)}
      </div>
    </div>
  );
}
