"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useT } from "./Locale";

const SRC = "/audio/caught-in-a-wave.mp3";
const KEY = "venyou-sound";

function fade(el: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = el.volume; const start = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - start) / ms); const e = 1 - Math.pow(1 - p, 3);
    el.volume = from + (to - from) * e;
    if (p < 1) requestAnimationFrame(step); else done?.();
  };
  requestAnimationFrame(step);
}

export default function SoundToggle() {
  const t = useT();
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    el.volume = 0; el.loop = true;
    const wants = localStorage.getItem(KEY) !== "off";
    setReady(true);
    if (!wants) return;

    const start = () => {
      el.play().then(() => { setOn(true); fade(el, 0.5, 2500); cleanup(); }).catch(() => {});
    };
    const events = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, start));
    start(); // Autoplay-Versuch
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return cleanup;
  }, []);

  const toggle = () => {
    const el = ref.current!;
    if (on) {
      fade(el, 0, 1200, () => el.pause()); setOn(false); localStorage.setItem(KEY, "off");
    } else {
      el.play().then(() => { fade(el, 0.5, 1500); setOn(true); localStorage.setItem(KEY, "on"); }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={ref} src={SRC} preload="metadata" />
      {ready && (
        <motion.button onClick={toggle} aria-label={on ? t("sound_off") : t("sound_on")}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
          className="label fixed bottom-6 left-6 z-[55] flex items-center gap-3 text-fg mix-blend-difference md:left-12">
          <span className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span key={i} className="w-[2px] bg-current"
                animate={on ? { height: ["30%", "100%", "40%", "80%", "30%"] } : { height: "30%" }}
                transition={on ? { duration: 1.2 + i * 0.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }} />
            ))}
          </span>
          <span>{on ? t("sound_on") : t("sound_off")}</span>
        </motion.button>
      )}
    </>
  );
}
