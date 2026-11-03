import Reveal from "./Reveal";
import { Logo, Cross } from "./Logo";
import { site } from "@/lib/site";
import { T } from "./Locale";

export default function Footer() {
  return (
    <footer id="kontakt" className="px-6 pb-10 pt-24 md:px-12">
      <Reveal>
        <p className="label text-muted"><T k="booking_contact" /></p>
        <a href="mailto:booking@venyou-event.com" className="copy link-underline mt-3 inline-block text-2xl md:text-4xl">booking@venyou-event.com</a>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-16 border-t border-line pt-10">
          <p className="label text-muted"><T k="newsletter" /></p>
          <p className="headline mt-3 text-4xl md:text-6xl">Beyond <span className="text-accent">Public</span></p>
          <p className="copy mt-3 text-muted"><T k="newsletter_sub" /></p>
          <a href={site.newsletterUrl} target="_blank" rel="noreferrer"
            className="label mt-6 inline-block bg-accent px-8 py-4 text-accent-ink transition hover:bg-fg"><T k="newsletter_cta" /> ↗</a>
        </div>
      </Reveal>
      {/* Klarwerk-Credit, dezent */}
      <Reveal delay={0.1}>
        <a href="https://klarwerk-digital.com" target="_blank" rel="noreferrer"
          className="group mt-16 flex flex-col gap-2 border-t border-line pt-8 md:flex-row md:items-baseline md:justify-between">
          <p className="label text-muted"><T k="kw_label" /> · <span className="text-fg transition duration-700 group-hover:text-accent">Klarwerk Digital</span></p>
          <p className="label text-muted"><T k="kw_copy" /> <span className="text-accent">↗</span></p>
        </a>
      </Reveal>
      <div className="mt-24 flex items-end justify-between">
        <Logo className="w-[50vw] md:w-[30vw]" />
        <div className="flex items-center gap-8">
          <span className="label text-muted">© {new Date().getFullYear()} VENYOU</span>
          <Cross className="h-6 w-auto" />
        </div>
      </div>
    </footer>
  );
}
