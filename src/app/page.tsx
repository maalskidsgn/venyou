import Link from "next/link";
import { getEvents, splitEvents } from "@/lib/wp";
import Hero from "@/components/Hero";
import EventList from "@/components/EventList";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { T } from "@/components/Locale";

export default async function Home() {
  const { upcoming, past } = splitEvents(await getEvents());

  return (
    <main>
      <Hero />

      {/* Claim wie Deck-Seite 2 */}
      <section className="px-6 py-24 md:px-12 md:py-36">
        <Reveal>
          <p className="headline text-[13vw] md:text-[7.5vw]">
            Driven<br />by sound.<br />Connected<br />by <span className="text-accent">people.</span>
          </p>
        </Reveal>
      </section>

      <section id="events" className="px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="label text-muted"><T k="events" /></h2>
            <Link href="/events" className="label link-underline"><T k="all_events" /> →</Link>
          </div>
        </Reveal>
        <EventList events={[...upcoming, ...past].slice(0, 3)} />
      </section>

      <section id="tanju" className="grid gap-8 px-6 py-20 md:grid-cols-2 md:items-center md:gap-16 md:px-12 md:py-28">
        <Link href="/tanju" className="group block">
          <ParallaxImage src="/tanju.webp" alt="TANJU" className="aspect-[4/5] !rounded-none" />
        </Link>
        <Reveal>
          <p className="label text-muted"><T k="founder" /></p>
          <h2 className="headline mt-4 text-6xl text-accent md:text-8xl">Tanju</h2>
          <p className="copy mt-6 max-w-md text-xl md:text-2xl">
            <T k="tanju_teaser" />
          </p>
          <Link href="/tanju" className="label link-underline mt-8 inline-block"><T k="tanju_more" /></Link>
        </Reveal>
      </section>

    </main>
  );
}
