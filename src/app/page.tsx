import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import LineupTicker from "@/components/LineupTicker";
import Eindruecke from "@/components/Eindruecke";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { socialPaths } from "@/components/SocialLinks";
import { T } from "@/components/Locale";
import { homeGallery } from "@/lib/images";
import { site } from "@/lib/site";

// Startseite als One-Pager:
// Hero · Vision · Line-up-Ticker · Fotogalerie · Community · Spotify · Contact · (Footer im Layout)
// Texte: src/lib/i18n.ts · Links: src/lib/site.ts · Bilder: src/lib/images.ts
export default function Home() {
  const perks = [
    ["perk1_title", "perk1_text"],
    ["perk2_title", "perk2_text"],
    ["perk3_title", "perk3_text"],
  ] as const;

  return (
    <main>
      <Hero />

      {/* VISION */}
      <section id="vision" aria-labelledby="vision-title" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-36">
        {/* Handy: Claim über dem Text · Desktop: Claim links, Text rechts daneben */}
        <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <h2 id="vision-title" className="headline text-[13vw] md:text-[7vw]">
              Driven<br />by sound.<br />Connected<br />by <span className="text-accent">people.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="copy space-y-6 text-xl md:text-2xl">
              <p><T k="vision_p1" /></p>
              <p className="text-muted"><T k="vision_p2" /></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LINE-UP 2026 */}
      <LineupTicker />

      {/* FOTOGALERIE */}
      <section id="impressions" aria-labelledby="gallery-title" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
        <h2 id="gallery-title" className="sr-only"><T k="gallery" /></h2>
        <Eindruecke images={homeGallery} />
      </section>

      {/* COMMUNITY */}
      <section id="community" aria-labelledby="community-title" className="scroll-mt-20 border-t border-line px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <h2 id="community-title" className="headline text-6xl md:text-8xl">
              <T k="community_head" />
            </h2>
            <p className="copy mt-8 max-w-md text-lg text-muted md:text-xl"><T k="community_intro" /></p>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <ul className="border-t border-line">
              {perks.map(([title, text], i) => (
                <li key={title}>
                  <Reveal delay={i * 0.1}>
                    <div className="border-b border-line py-7">
                      <h3 className="copy text-2xl md:text-3xl"><T k={title} /></h3>
                      <p className="copy mt-2 text-muted"><T k={text} /></p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            {/* Zwei gelbe Leisten: WhatsApp-Community und Newsletter */}
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-3">
                <a href={site.whatsappCommunity} target="_blank" rel="noreferrer"
                  className="label flex w-full items-center justify-between gap-6 bg-accent px-8 py-5 text-accent-ink transition duration-500 hover:opacity-85">
                  <span className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true"><path d={socialPaths.whatsapp} /></svg>
                    <T k="community_cta" />
                  </span>
                  <span aria-hidden>↗</span>
                </a>
                <a href={site.newsletterUrl} target="_blank" rel="noreferrer"
                  className="label flex w-full items-center justify-between gap-6 bg-accent px-8 py-5 text-accent-ink transition duration-500 hover:opacity-85">
                  <span className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
                      <path d="m3 6 9 7 9-7" />
                    </svg>
                    <T k="newsletter_join" />
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
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
