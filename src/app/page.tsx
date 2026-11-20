import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LineupTicker from "@/components/LineupTicker";
import Eindruecke from "@/components/Eindruecke";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { T } from "@/components/Locale";
import { homeGallery } from "@/lib/images";
import { site } from "@/lib/site";

// Startseite als One-Pager:
// Hero · Vision · Line-up-Ticker · Fotogalerie · Community · Spotify · Contact · (Footer im Layout)
// Texte: src/lib/i18n.ts · Links: src/lib/site.ts · Bilder: src/lib/images.ts
export default function Home() {
  const perks = [
    ["01", "perk1_title", "perk1_text"],
    ["02", "perk2_title", "perk2_text"],
    ["03", "perk3_title", "perk3_text"],
  ] as const;

  return (
    <main>
      <Hero />

      {/* VISION */}
      <section id="vision" aria-labelledby="vision-title" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-36">
        <Reveal>
          <p className="label text-muted"><T k="vision" /></p>
          <h2 id="vision-title" className="headline mt-6 text-[13vw] md:text-[7.5vw]">
            Driven<br />by sound.<br />Connected<br />by <span className="text-accent">people.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-accent"><T k="vision_name" /></p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-8 md:col-start-5">
            <div className="copy max-w-3xl space-y-6 text-xl md:text-3xl">
              <p><T k="vision_p1" /></p>
              <p className="text-muted"><T k="vision_p2" /></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LINE-UP 2026 */}
      <LineupTicker />

      {/* FOTOGALERIE */}
      <section aria-labelledby="gallery-title" className="px-6 py-24 md:px-12 md:py-32">
        <Reveal><h2 id="gallery-title" className="label mb-12 text-muted md:mb-16"><T k="gallery" /></h2></Reveal>
        <Eindruecke images={homeGallery} />
      </section>

      {/* COMMUNITY */}
      <section id="community" aria-labelledby="community-title" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="label text-muted"><T k="community" /></p>
            <h2 id="community-title" className="headline mt-6 text-6xl md:text-8xl">
              <T k="community_head" />
            </h2>
            <p className="copy mt-8 max-w-md text-lg text-muted md:text-xl"><T k="community_intro" /></p>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <ul className="border-t border-line">
              {perks.map(([n, title, text], i) => (
                <li key={n}>
                  <Reveal delay={i * 0.1}>
                    <div className="flex gap-6 border-b border-line py-7">
                      <span className="label pt-1 text-accent">{n}</span>
                      <div>
                        <h3 className="copy text-2xl md:text-3xl"><T k={title} /></h3>
                        <p className="copy mt-2 text-muted"><T k={text} /></p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <a href={site.whatsappCommunity} target="_blank" rel="noreferrer"
                className="label mt-10 flex w-full items-center justify-between bg-accent px-8 py-5 text-accent-ink transition duration-500 hover:bg-fg md:text-sm">
                <T k="community_cta" /><span aria-hidden>↗</span>
              </a>
              <p className="label mt-5 text-muted">
                <T k="newsletter_alt" />{" "}
                <a href={site.newsletterUrl} target="_blank" rel="noreferrer" className="link-underline text-fg">
                  <T k="newsletter" /> ↗
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPOTIFY */}
      <section aria-labelledby="playlist-title" className="border-t border-line px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <p className="label text-muted"><T k="playlist" /></p>
            <h2 id="playlist-title" className="headline mt-6 text-6xl md:text-7xl">
              <T k="playlist_head" />
            </h2>
            <p className="copy mt-8 max-w-md text-lg text-muted md:text-xl"><T k="playlist_text" /></p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <SpotifyPlayer />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
