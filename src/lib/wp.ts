// Anbindung an WordPress (Headless). Erwartet einen Custom Post Type "event"
// mit REST-Unterstützung und den Meta-/ACF-Feldern: datum, uhrzeit, ort, ticket_url.
// Fehlt WP_API_URL, werden Mock-Daten geliefert (für Entwürfe).

import { mockEvents } from "./mock-events";

export type Event = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO, z. B. 2026-10-15
  time?: string;
  location?: string;
  ticketUrl?: string;
  image?: string;
  lineup?: string[];
  gallery?: { src: string; w: number; h: number }[];
  city?: string;
};

const API = process.env.WP_API_URL; // z. B. https://cms.venyou.de/wp-json/wp/v2

type WpEvent = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, string>;
  meta?: Record<string, string>;
  _embedded?: { "wp:featuredmedia"?: { source_url: string }[] };
};

function mapEvent(e: WpEvent): Event {
  const f = e.acf ?? e.meta ?? {};
  return {
    id: e.id,
    slug: e.slug,
    title: e.title.rendered,
    excerpt: e.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
    content: e.content.rendered,
    date: f.datum ?? "",
    time: f.uhrzeit,
    location: f.ort,
    ticketUrl: f.ticket_url,
    image: e._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    lineup: f.lineup ? String(f.lineup).split(/\r?\n|,/).map((x) => x.trim()).filter(Boolean) : [],
    city: f.stadt,
    gallery: [], // später: ACF-Galerie-Feld
  };
}

export async function getEvents(): Promise<Event[]> {
  if (!API) return [...mockEvents].sort((a, b) => a.date.localeCompare(b.date));
  const res = await fetch(`${API}/event?_embed&per_page=100`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data: WpEvent[] = await res.json();
  return data.map(mapEvent).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getEvent(slug: string): Promise<Event | null> {
  if (!API) return mockEvents.find((e) => e.slug === slug) ?? null;
  const res = await fetch(`${API}/event?slug=${slug}&_embed`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const data: WpEvent[] = await res.json();
  return data[0] ? mapEvent(data[0]) : null;
}

export function splitEvents(events: Event[]) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    upcoming: events.filter((e) => e.date >= today),
    past: events.filter((e) => e.date < today).reverse(),
  };
}

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
