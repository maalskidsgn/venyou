"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Foto, das beim Scrollen reinzoomt, aufhellt und leicht parallax mitläuft.
export default function ParallaxImage({
  src, alt, className = "",
}: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-3xl ${className}`}>
      <motion.img
        src={src} alt={alt}
        style={{ y, scale, opacity }}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}
