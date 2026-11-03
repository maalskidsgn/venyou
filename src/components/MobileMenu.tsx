"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Cross } from "./Logo";
import { LangSwitch, useT } from "./Locale";
import { site } from "@/lib/site";
import type { Key } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;
const items: [Key, string][] = [["nav_events", "/events"], ["nav_impressions", "/eindruecke"], ["nav_tanju", "/tanju"], ["nav_contact", "/#kontakt"]];

export default function MobileMenu() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { open ? lenis?.stop() : lenis?.start(); }, [open, lenis]);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} aria-label={t("menu_open")} className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute h-[1.5px] w-6 -translate-y-1 bg-fg" /><span className="absolute h-[1.5px] w-6 translate-y-1 bg-fg" />
      </button>

      {mounted && createPortal(<AnimatePresence>
        {open && (
          <motion.div key="menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg px-6 pb-10 pt-28">
            <div className="absolute inset-x-6 top-5 flex items-center justify-between">
              <LangSwitch />
              <button onClick={() => setOpen(false)} aria-label={t("menu_close")} className="flex h-10 w-10 items-center justify-center">
                <span className="absolute h-[1.5px] w-6 rotate-45 bg-fg" /><span className="absolute h-[1.5px] w-6 -rotate-45 bg-fg" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {items.map(([k, h], i) => (
                <motion.div key={k} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease }}>
                  <Link href={h} onClick={() => setOpen(false)} className="headline block py-2 text-[13vw] leading-none active:text-accent">{t(k)}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-end justify-between">
              <div>
                <p className="label text-muted">{t("booking")}</p>
                <a href={`mailto:${site.booking}`} className="label mt-1 block">{site.booking}</a>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="label mt-3 block text-accent">Instagram ↗</a>
                <a href={site.newsletterUrl} target="_blank" rel="noreferrer" className="label mt-2 block text-accent">{t("newsletter")} ↗</a>
              </div>
              <Cross className="h-6 w-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
