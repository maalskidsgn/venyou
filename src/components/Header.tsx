"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";
import MobileMenu from "./MobileMenu";
import { LangSwitch, useT } from "./Locale";
import type { Key } from "@/lib/i18n";

export const navItems: [Key, string][] = [["nav_events", "/events"], ["nav_impressions", "/eindruecke"], ["nav_tanju", "/tanju"], ["nav_contact", "/#kontakt"]];

export default function Header() {
  const t = useT();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 200], ["rgba(10,10,10,0)", "rgba(10,10,10,0.8)"]);
  return (
    <motion.header style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-fg backdrop-blur-sm md:px-12">
      <Link href="/" aria-label="VENYOU"><Logo className="h-7 w-auto" /></Link>
      <div className="flex items-center gap-10">
        <nav className="hidden gap-10 md:flex">
          {navItems.map(([k, h]) => <Link key={k} href={h} className="label link-underline">{t(k)}</Link>)}
        </nav>
        <LangSwitch className="hidden md:flex" />
        <MobileMenu />
      </div>
    </motion.header>
  );
}
