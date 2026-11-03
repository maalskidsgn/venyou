import type { Event } from "./wp";
import { galleryDonaukanal, galleryHotelVelo } from "./eindruecke";

export const mockEvents: Event[] = [
  {
    id: 1, slug: "donaukanal-wien",
    title: "Donaukanal", city: "Wien", location: "Donaukanal, Wien",
    excerpt: "Open Air am Wasser. Sonnenuntergang, House, Menschen.",
    content: "<p>VENYOU Open Air am Wiener Donaukanal. Deep und Melodic House bis in die Nacht.</p>",
    date: "2026-06-06", time: "17:00",
    lineup: ["TANJU", "Sossa", "Tania Vulcano"],
    image: galleryDonaukanal[1]?.src, gallery: galleryDonaukanal,
  },
  {
    id: 2, slug: "hotel-velo-osnabrueck",
    title: "Hotel Velo", city: "Osnabrück", location: "Hotel Velo, Osnabrück",
    excerpt: "Rooftop-Nacht über der Stadt. Flash, Sound, Community.",
    content: "<p>VENYOU im Hotel Velo Osnabrück. Zweite Ausgabe nach dem Auftakt im Juli 2025.</p>",
    date: "2026-05-16", time: "20:00",
    lineup: ["TANJU", "Adam Port", "Saoirse"],
    image: galleryHotelVelo[0]?.src, gallery: galleryHotelVelo,
  },
];
