// Zentrale Bildkonfiguration der Startseite.
// Bilder austauschen: neue WebP-Datei (lange Kante ca. 1800 px) nach public/eindruecke/ legen
// und hier den Pfad eintragen. Breite/Höhe (w/h) sorgen dafür, dass nichts beschnitten wird.

import { eindruecke, type Img } from "./eindruecke";

// Hero-Slider ganz oben: Reihenfolge = Reihenfolge im Slider.
// Am besten Querformat-Fotos nehmen, Hochformat wird im breiten Hero stark beschnitten.
export const heroSlides: string[] = [
  "/eindruecke/2026-06-06-venyou-005.webp",
  "/eindruecke/de6a9665.webp",
  "/eindruecke/donaukanal-002-2.webp",
  "/eindruecke/2026-06-06-venyou-007.webp",
  "/eindruecke/venyou-flashy-dk-3.webp",
];

// Fotogalerie auf der Startseite: Pfade aus public/eindruecke/.
// Leer lassen ([]) = alle Bilder aus src/lib/eindruecke.ts zeigen.
const galleryPicks: string[] = [
  "/eindruecke/2026-06-06-venyou-004.webp",
  "/eindruecke/venyouhotelvelo-97.webp",
  "/eindruecke/2026-06-06-venyou-011.webp",
  "/eindruecke/venyouhotelvelo-57.webp",
  "/eindruecke/venyouhotelvelo-82.webp",
  "/eindruecke/2026-06-06-venyou-009.webp",
  "/eindruecke/venyouhotelvelo-88.webp",
  "/eindruecke/donaukanal-068-2.webp",
  "/eindruecke/venyouhotelvelo-103.webp",
  "/eindruecke/venyouhotelvelo-77.webp",
  "/eindruecke/2026-06-06-venyou-010-2.webp",
  "/eindruecke/venyouhotelvelo-99.webp",
];

export const homeGallery: Img[] = galleryPicks.length
  ? galleryPicks.map((src) => eindruecke.find((i) => i.src === src)).filter((i): i is Img => Boolean(i))
  : eindruecke;
