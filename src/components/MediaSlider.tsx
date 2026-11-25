"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/content";

// Impressions als Slider: wischen (Handy/Trackpad), ziehen mit der Maus oder Pfeile (Desktop).
// Fotos werden nicht beschnitten (Originalseitenverhältnis), Videos spielen stumm, sobald sie im Bild sind.
export default function MediaSlider({ items }: { items: Media[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const onScroll = useCallback(() => {
    const el = track.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, []);

  useEffect(() => { onScroll(); }, [onScroll]);

  // Videos nur abspielen, wenn sie sichtbar sind
  useEffect(() => {
    const el = track.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
      });
    }, { root: el, threshold: 0.6 });
    el.querySelectorAll("video").forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [items]);

  const step = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Maus-Ziehen auf dem Desktop (Touch scrollt nativ)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current; const el = track.current; if (!d || !el) return;
    el.scrollLeft = d.left - (e.clientX - d.x);
  };
  const endDrag = () => {
    const el = track.current; if (!drag.current || !el) return;
    drag.current = null;
    el.style.scrollSnapType = "";
  };

  return (
    <div className="relative">
      <div ref={track} onScroll={onScroll} tabIndex={0} role="region" aria-label="Impressions: Fotos und Videos, seitlich wischen"
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag}
        data-lenis-prevent
        className="no-scrollbar flex cursor-grab select-none snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-6 outline-none active:cursor-grabbing md:gap-5 md:px-12">
        {items.map((m, i) => (
          <figure key={m.src} className="relative h-[62svh] max-h-[780px] shrink-0 snap-center md:h-[74vh]"
            style={{ aspectRatio: `${m.w} / ${m.h}` }}>
            {m.type === "video" ? (
              <>
                <video src={m.src} poster={m.poster} muted loop playsInline preload="none"
                  className="h-full w-full bg-white/5 object-cover" aria-label={`${m.title} @ ${m.venue}`} />
                <figcaption className="label pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                  <span className="text-fg">{m.title}</span> <span className="text-accent">@{m.venue}</span>
                </figcaption>
              </>
            ) : (
              <img src={m.src} alt="VENYOU Event" width={m.w} height={m.h} draggable={false}
                loading={i < 4 ? "eager" : "lazy"} decoding="async" className="h-full w-full bg-white/5 object-cover" />
            )}
          </figure>
        ))}
      </div>

      {/* Fortschritt + Pfeile */}
      <div className="mt-8 flex items-center gap-6 px-6 md:px-12">
        <div className="relative h-px flex-1 bg-line" aria-hidden>
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button key={dir} onClick={() => step(dir)} disabled={dir < 0 ? edges.start : edges.end}
              aria-label={dir < 0 ? "Zurück" : "Weiter"}
              className="label flex h-11 w-11 items-center justify-center border border-line transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fg">
              {dir < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
