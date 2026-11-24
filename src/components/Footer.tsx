import Link from "next/link";
import Reveal from "./Reveal";
import { Cross } from "./Logo";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";
import { T } from "./Locale";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 md:px-12">
      {/* CONTACT */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line pt-24 md:pt-36">
        <Reveal>
          <h2 id="contact-title" className="label text-muted"><T k="contact" /></h2>
          <a href={`mailto:${site.contactEmail}`} className="copy link-underline mt-6 inline-block text-2xl md:text-4xl">{site.contactEmail}</a>
        </Reveal>
      </section>

      {/* Klarwerk-Credit, dezent */}
      <Reveal delay={0.1}>
        <a href="https://klarwerk-digital.com" target="_blank" rel="noreferrer"
          className="group mt-24 flex flex-col gap-2 border-t border-line pt-8 md:flex-row md:items-baseline md:justify-between">
          <p className="label text-muted"><T k="kw_label" /> · <span className="text-fg transition duration-700 group-hover:text-accent">Klarwerk Digital</span></p>
          <p className="label text-muted"><T k="kw_copy" /> <span className="text-accent">↗</span></p>
        </a>
      </Reveal>

      {/* Ganz unten: Social-Icons groß und mittig, darunter dezent Links und Copyright */}
      <div className="mt-24 flex flex-col items-center gap-10 text-center">
        <SocialLinks size={36} className="gap-10 md:gap-14" />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href={site.whatsappCommunity} target="_blank" rel="noreferrer" className="label link-underline text-muted transition hover:text-fg"><T k="footer_community" /></a>
          <Link href="/impressum" className="label link-underline text-muted transition hover:text-fg"><T k="nav_imprint" /></Link>
          <Link href="/datenschutz" className="label link-underline text-muted transition hover:text-fg"><T k="nav_privacy" /></Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="label text-muted">© {new Date().getFullYear()} VENYOU</span>
          <Cross className="h-4 w-auto" />
        </div>
      </div>
    </footer>
  );
}
