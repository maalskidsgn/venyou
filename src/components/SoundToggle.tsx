"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useT } from "./Locale";
import { tracks } from "@/lib/site";

const KEY = "venyou-sound";
const VOLUME = 0.5;

function fade(el: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = el.volume; const start = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - start) / ms); const e = 1 - Math.pow(1 - p, 3);
    el.volume = from + (to - from) * e;
    if (p < 1) requestAnimationFrame(step); else done?.();
  };
  requestAnimationFrame(step);
}

// Hintergrundmusik unten links. Tracks: src/lib/site.ts (tracks).
// Startet sofort, falls der Browser es erlaubt, sonst bei der ersten Interaktion (Scrollen, Tippen, Klicken).
export default function SoundToggle() {
  const t = useT();
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const track = tracks[idx];
  const multi = tracks.length > 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || !track) return;
    el.volume = 0; el.loop = !multi;
    const wants = localStorage.getItem(KEY) !== "off";
    setReady(true);
    if (!wants) return;

    const start = () => {
      el.play().then(() => { setOn(true); fade(el, VOLUME, 2500); cleanup(); }).catch(() => {});
    };
    const events = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, start));
    start(); // Autoplay-Versuch
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return cleanup;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Beim Trackwechsel direkt weiterspielen, wenn Sound an ist
  useEffect(() => {
    const el = ref.current;
    if (!el || !on) return;
    el.volume = VOLUME;
    el.play().catch(() => {});
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!track) return null;

  const toggle = () => {
    const el = ref.current!;
    if (on) {
      fade(el, 0, 1200, () => el.pause()); setOn(false); localStorage.setItem(KEY, "off");
    } else {
      el.play().then(() => { fade(el, VOLUME, 1500); setOn(true); localStorage.setItem(KEY, "on"); }).catch(() => {});
    }
  };
  const next = () => setIdx((i) => (i + 1) % tracks.length);

  return (
    <>
      <audio ref={ref} src={track.src} preload="metadata" onEnded={multi ? next : undefined} />
      {ready && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
          className="label fixed bottom-20 left-6 z-[55] flex items-center gap-4 text-fg mix-blend-difference md:left-12">
          <button onClick={toggle} aria-label={on ? t("sound_off") : t("sound_on")} className="flex items-center gap-3">
            <span className="flex h-4 items-end gap-[3px]">
              {[0, 1, 2, 3].map((i) => (
                <motion.span key={i} className="w-[2px] bg-current"
                  animate={on ? { height: ["30%", "100%", "40%", "80%", "30%"] } : { height: "30%" }}
                  transition={on ? { duration: 1.2 + i * 0.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }} />
              ))}
            </span>
            <span>{on ? t("sound_on") : t("sound_off")}</span>
          </button>
          {multi && on && (
            <button onClick={next} aria-label="Nächster Track" className="opacity-80 transition hover:opacity-100">→</button>
          )}
        </motion.div>
      )}
    </>
  );
}
