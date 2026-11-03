"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Img } from "@/lib/eindruecke";

const ease = [0.22, 1, 0.36, 1] as const;

function Frame({ img, className = "", speed = 0 }: { img: Img; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.04]);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-white/5 ${className}`}>
      <motion.img src={img.src} alt="" loading="lazy" width={img.w} height={img.h} style={{ y, scale }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease }} className="h-full w-full object-cover" />
    </div>
  );
}

// Immersiver Bilderfluss: Vollbild, dann Zweier, dann versetzt, dann wieder Vollbild.
export default function EventStory({ images, title }: { images: Img[]; title: string }) {
  const landscape = images.filter((i) => i.w >= i.h);
  const portrait = images.filter((i) => i.w < i.h);
  const blocks: React.ReactNode[] = [];
  let li = 0, pi = 0, k = 0;
  const nextL = () => landscape[li++] ?? portrait[pi++];
  const nextP = () => portrait[pi++] ?? landscape[li++];

  while (li + pi < images.length) {
    const step = k % 4;
    if (step === 0) { const a = nextL(); if (a) blocks.push(<Frame key={k} img={a} className="aspect-[16/9] md:h-screen md:aspect-auto" speed={6} />); }
    else if (step === 1) { const a = nextP(), b = nextP(); blocks.push(<div key={k} className="grid grid-cols-2 gap-3 md:gap-6">{a && <Frame img={a} className="aspect-[3/4]" speed={4} />}{b && <Frame img={b} className="aspect-[3/4] md:mt-24" speed={-4} />}</div>); }
    else if (step === 2) { const a = nextP(); if (a) blocks.push(<div key={k} className="grid md:grid-cols-12"><Frame img={a} className="aspect-[3/4] md:col-span-5 md:col-start-7" speed={5} /></div>); }
    else { const a = nextL(), b = nextP(); blocks.push(<div key={k} className="grid gap-3 md:grid-cols-12 md:gap-6">{a && <Frame img={a} className="aspect-[4/3] md:col-span-8" speed={3} />}{b && <Frame img={b} className="aspect-[3/4] md:col-span-4 md:mt-32" speed={-5} />}</div>); }
    k++;
  }

  return (
    <div className="space-y-3 md:space-y-6">
      {blocks}
      <div className="py-24 text-center md:py-40">
        <p className="headline text-[12vw] text-white/10 md:text-[8vw]">{title}</p>
      </div>
    </div>
  );
}
