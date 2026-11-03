# VENYOU Website – Übergabe an Tanju

Stand: 03.11.2026. Die Seite ist ein Next.js-Projekt und läuft als Docker-Container
auf Manuels Hetzner-Server. Hosting bleibt bei Klarwerk (20 €/Monat), die
Weiterentwicklung übernimmt Tanju.

## 1. Was Tanju bekommt

| Zugang | Wofür | Status |
|---|---|---|
| GitHub-Repo `venyou` (privat) | Quellcode, Änderungen per Push | Einladung an Tanjus GitHub-Konto nötig |
| Dev-Umgebung https://venyou.2.28.31.213.sslip.io | Aktueller Stand live, nicht bei Google | läuft |
| Newsletter rapidmail | Formular „Beyond Public“ | hat Tanju bereits |
| Instagram @tanjufz | verlinkt | hat Tanju |
| Booking-Postfach booking@venyou-event.com | Kontakt im Footer | hat Tanju |

Nicht nötig für Tanju: SSH auf den Server. Deploy läuft über Manuel (siehe 4).

## 2. Was noch fehlt (Tanju liefert)

- **Schrift BC Novatica CYR Medium** als OTF/TTF/WOFF2. Ablegen unter
  `public/fonts/BCNovaticaCYR-Medium.woff2` (und `-Bold`), dann greift sie sofort.
  Bis dahin läuft Archivo als Ersatz.
- **Domain** (z. B. venyou-event.com): DNS A-Record auf `2.28.31.213`, dann trägt
  Manuel die Domain auf dem Server ein und schaltet die Indexierung frei.
- **WordPress** für Events (optional, siehe 5). Solange keins da ist, stehen die
  Events in `src/lib/mock-events.ts`.
- **Impressum / Datenschutz** als Text, dann baue ich die Seiten (zweisprachig).
- **Event-Daten**: echte Line-ups, Uhrzeiten, Ticket-Links. Hotel-Velo-Datum
  (16.05.2026) ist aus dem Deck geschätzt.
- **Fotos**: Zuordnung der DE6A-Bilder (jetzt Donaukanal) und Oceandrive
  (jetzt Hotel Velo) prüfen.

## 3. Lokal arbeiten

```bash
git clone <repo-url> venyou && cd venyou
npm install
npm run dev        # http://localhost:3500
```

Voraussetzung: Node 22. Keine Umgebungsvariablen nötig, ohne `WP_API_URL`
laufen die Mock-Events.

## 4. Live stellen

Nur Manuel (SSH-Schlüssel auf dem Server):

```bash
bash werkzeuge/ausrollen.sh
```

Baut auf dem Server und tauscht den Container. Konfiguration liegt nur auf dem
Server in `/opt/venyou/.env.produktion`:
`HOST_ADRESSE`, `WP_API_URL`, `NEXT_PUBLIC_INDEXIERUNG` (0 = Google gesperrt).

Wunsch für später: Push auf `main` löst den Deploy automatisch aus. Dann braucht
Tanju Manuel nicht mehr zum Veröffentlichen.

## 5. Wo was liegt

| Was | Datei |
|---|---|
| Alle Texte DE/EN | `src/lib/i18n.ts` |
| Links (Newsletter, Instagram, Booking) | `src/lib/site.ts` |
| Events (bis WordPress da ist) | `src/lib/mock-events.ts` |
| Fotos + Bildliste | `public/eindruecke/`, `src/lib/eindruecke.ts` |
| Hero-Slider-Bilder | `src/components/Hero.tsx` (Liste `slides`) |
| Musik | `public/audio/caught-in-a-wave.mp3`, Schalter `SoundToggle.tsx` |
| Farben, Korn, Typo | `src/app/globals.css`, `src/components/GrainFilter.tsx` |
| Logo, Kreuz, Favicon | `public/brand/`, `src/app/icon.png` |
| Seiten | `src/app/` (Start, events, events/[slug], eindruecke, tanju) |

WordPress-Anbindung (`src/lib/wp.ts`): Post-Type `event` mit REST, ACF-Felder
`datum` (Y-m-d), `uhrzeit`, `ort`, `stadt`, `ticket_url`, `lineup` (ein Name pro
Zeile), Beitragsbild = Hero, Galerie-Feld noch anzuschließen. `WP_API_URL` auf
`https://cms.deine-domain/wp-json/wp/v2` setzen.

Neue Fotos: in `public/eindruecke/` legen (WebP, lange Kante 1800 px) und
`src/lib/eindruecke.ts` ergänzen (src, Breite, Höhe).

## 6. Brand-Material

Originale (Logos, Pitchdeck, Fotos, Bio, Musik, Lightroom-Preset) liegen bei
Manuel in iCloud unter `Freelancing - Agenturen/Venyou`.
