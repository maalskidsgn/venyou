# VENYOU – Headless WordPress + Next.js

## Start
    npm run dev   → http://localhost:3500

## WordPress-Seite (noch einzurichten)
1. Custom Post Type `event` mit `show_in_rest => true` (z. B. per CPT UI oder Plugin).
2. Felder (ACF, „Show in REST API“ an): `datum` (Datum, Format Y-m-d), `uhrzeit`, `ort`, `ticket_url`.
3. Beitragsbild = Event-Foto.
4. In `.env.local`: `WP_API_URL=https://cms.deine-domain.de/wp-json/wp/v2`

Ohne `WP_API_URL` laufen Mock-Events aus `src/lib/mock-events.ts`.
Kommende Events (Datum ≥ heute) erscheinen unter „Kommende Events“, ältere im Archiv.

## Stack
Next.js App Router · Tailwind 4 · Lenis (Smooth Scroll) · Framer Motion (Reveal + Parallax-Fotos)
