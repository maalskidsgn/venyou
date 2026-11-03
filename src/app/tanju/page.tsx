import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { T } from "@/components/Locale";

export const metadata: Metadata = { title: "TANJU – VENYOU" };

export default function TanjuPage() {
  return (
    <main className="px-6 pb-24 pt-28 md:px-10">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <ParallaxImage src="/tanju.webp" alt="TANJU" className="aspect-[4/5] !rounded-none" />
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="label text-muted"><T k="founder" /></p>
            <h1 className="headline mt-4 text-6xl text-accent md:text-8xl">Tanju</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="copy mt-10 max-w-lg space-y-6 text-lg md:text-xl">
              <p><T k="tanju_p1" /></p>
              <p><T k="tanju_p2" /></p>
              <p><T k="tanju_p3" /></p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-8">
              <a href="https://instagram.com/tanjufz" target="_blank" rel="noreferrer" className="label link-underline">Instagram ↗</a>
              <a href="mailto:booking@venyou-event.com" className="label link-underline"><T k="booking" /> ↗</a>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
