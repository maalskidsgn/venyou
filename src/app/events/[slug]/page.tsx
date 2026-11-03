import { notFound } from "next/navigation";
import Link from "next/link";
import { getEvent, getEvents } from "@/lib/wp";
import Reveal from "@/components/Reveal";
import { T } from "@/components/Locale";
import EventMeta from "@/components/EventMeta";
import EventStory from "@/components/EventStory";

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const past = event.date < new Date().toISOString().slice(0, 10);

  return (
    <main className="pb-24 pt-28">
      {/* Kurzinfo */}
      <section className="px-6 md:px-12">
        <Reveal><Link href="/events" className="label link-underline text-muted">← <T k="events" /></Link></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={0.1}>
            <h1 className="headline text-[14vw] text-accent md:text-[9vw]">{event.title}</h1>
            <p className="copy mt-2 text-2xl md:text-4xl">{event.city ?? event.location}</p>
            <EventMeta date={event.date} time={event.time} location={event.location} />
          </Reveal>
          <Reveal delay={0.2}>
            {event.lineup?.length ? (
              <div className="md:text-right">
                <p className="label text-muted"><T k="lineup" /></p>
                <ul className="mt-2">{event.lineup.map((a) => <li key={a} className="copy text-lg">{a}</li>)}</ul>
              </div>
            ) : null}
            {!past && event.ticketUrl && (
              <a href={event.ticketUrl} className="label mt-6 inline-block bg-accent px-8 py-4 text-accent-ink transition hover:bg-fg"><T k="tickets" /> ↗</a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Bilderfluss */}
      {event.gallery?.length ? (
        <section className="mt-16 px-3 md:mt-24 md:px-6">
          <EventStory images={event.gallery} title={event.title} />
        </section>
      ) : null}
    </main>
  );
}
