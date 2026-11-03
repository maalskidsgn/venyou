import type { Metadata } from "next";
import { getEvents } from "@/lib/wp";
import EventList from "@/components/EventList";
import Reveal from "@/components/Reveal";
import { T } from "@/components/Locale";

export const metadata: Metadata = { title: "Events – VENYOU" };

export default async function EventsPage() {
  const events = (await getEvents()).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="px-6 pb-24 pt-28 md:px-12">
      <Reveal><h1 className="label mb-10 text-muted"><T k="events" /></h1></Reveal>
      <EventList events={events} />
    </main>
  );
}
