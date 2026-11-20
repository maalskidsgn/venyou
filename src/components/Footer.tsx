import Link from "next/link";
import Reveal from "./Reveal";
import { Logo, Cross } from "./Logo";
import SocialLinks from "./SocialLinks";
import { site } from "@/lib/site";
import { T } from "./Locale";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 md:px-12">
      {/* CONTACT */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line pt-24 md:pt-36">
        <Reveal>
          <p className="label text-muted"><T k="contact" /></p>
          <h2 id="contact-title" className="headline mt-6 text-5xl md:text-7xl"><T k="booking_contact" /></h2>
          <a href={`mailto:${site.booking}`} className="copy link-underline mt-8 inline-block text-2xl md:text-4xl">{site.booking}</a>
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

      <div className="mt-24 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <Logo className="w-[60vw] md:w-[30vw]" />
        <div className="flex flex-col gap-6 md:items-end">
          <SocialLinks />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={site.whatsappCommunity} target="_blank" rel="noreferrer" className="label link-underline text-muted transition hover:text-fg"><T k="footer_community" /></a>
            <Link href="/impressum" className="label link-underline text-muted transition hover:text-fg"><T k="nav_imprint" /></Link>
            <Link href="/datenschutz" className="label link-underline text-muted transition hover:text-fg"><T k="nav_privacy" /></Link>
          </nav>
          <div className="flex items-center gap-8">
            <span className="label text-muted">© {new Date().getFullYear()} VENYOU</span>
            <Cross className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
