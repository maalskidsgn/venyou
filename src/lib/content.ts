// Zentrale Inhalte für Startseite: Hero-Videos und Impressions-Slider (Fotos + Videos).
// Dateien liegen in public/content/ (hero/, videos/, fotos/).
// Neues Foto: WebP (lange Kante 1800 px) nach public/content/fotos/ legen und unten eintragen (w/h = Pixelmaße).
// Reihenfolge der Liste = Reihenfolge im Slider.

export type Media =
  | { type: "image"; src: string; w: number; h: number }
  | { type: "video"; src: string; poster: string; w: number; h: number; title: string; venue: string };

// Hero (Landingpage): genau drei Elemente.
// Desktop: drei Panels nebeneinander in dieser Reihenfolge. Handy: wechseln nacheinander mit weichen Übergängen
// (Video zuerst, dann die Fotos). poster = Standbild, falls der Browser das Video nicht automatisch startet.
export type HeroItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

export const hero: HeroItem[] = [
  { type: "image", src: "/content/fotos/venyouhotelvelo-54.webp" },
  { type: "video", src: "/content/hero/hero-atoukolu.mp4", poster: "/content/hero/hero-atoukolu.webp" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-47.webp" },
];

export const impressions: Media[] = [
  { type: "image", src: "/content/fotos/tanju-prst-2.webp", w: 1800, h: 1005 },
  { type: "video", src: "/content/videos/clip-02.mp4", poster: "/content/videos/clip-02.webp", w: 540, h: 960, title: "Allein Allein", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-87.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9665.webp", w: 1800, h: 1200 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-97.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-09.mp4", poster: "/content/videos/clip-09.webp", w: 540, h: 960, title: "Terrace", venue: "PRST" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-90.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9604.webp", w: 1200, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-84.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-05.mp4", poster: "/content/videos/clip-05.webp", w: 540, h: 960, title: "ID", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/tanju-flashy-look-3.webp", w: 922, h: 1152 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-88.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9710.webp", w: 1200, h: 1800 },
  { type: "video", src: "/content/videos/clip-11.mp4", poster: "/content/videos/clip-11.webp", w: 540, h: 960, title: "Toro · B2B Romanic", venue: "PRST" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-77.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-98.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9575.webp", w: 1200, h: 1800 },
  { type: "video", src: "/content/videos/clip-15.mp4", poster: "/content/videos/clip-15.webp", w: 540, h: 960, title: "Free Your Mind", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-85.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-13.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyou-community-event.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-04.mp4", poster: "/content/videos/clip-04.webp", w: 540, h: 960, title: "Atoukolu", venue: "PRST" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-96.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9711.webp", w: 1200, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-47.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-07.mp4", poster: "/content/videos/clip-07.webp", w: 540, h: 960, title: "On A Wave", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-92.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-86.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/tanju-flashy-look-2.webp", w: 921, h: 1152 },
  { type: "video", src: "/content/videos/clip-10.mp4", poster: "/content/videos/clip-10.webp", w: 540, h: 960, title: "The Way You Are · B2B Mike Slemp", venue: "PRST" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-103.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/de6a9813.webp", w: 1200, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-69.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-14.mp4", poster: "/content/videos/clip-14.webp", w: 540, h: 960, title: "Allein Allein III", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-15.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-82.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-54.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-06.mp4", poster: "/content/videos/clip-06.webp", w: 540, h: 960, title: "Move Me", venue: "PRST" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-89.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-104.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-46.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-08.mp4", poster: "/content/videos/clip-08.webp", w: 540, h: 960, title: "Take A Little Trip", venue: "VENYOU" },
  { type: "image", src: "/content/fotos/venyouhotelvelo-80.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-91.webp", w: 1440, h: 1800 },
  { type: "image", src: "/content/fotos/venyouhotelvelo-16.webp", w: 1440, h: 1800 },
  { type: "video", src: "/content/videos/clip-03.mp4", poster: "/content/videos/clip-03.webp", w: 540, h: 960, title: "Amazon", venue: "PRST" },
];
