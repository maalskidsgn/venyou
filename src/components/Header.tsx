"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import MobileMenu from "./MobileMenu";
import ScrollLink from "./ScrollLink";
import { LangSwitch, useT } from "./Locale";
import { navItems } from "@/lib/nav";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function Header() {
  const t = useT();
  const pathname = usePathname();
  const lenis = useLenis();
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-bg px-6 py-5 text-fg md:px-12">
      <Link href="/" aria-label="VENYOU – Startseite" onClick={(e) => {
        if (pathname !== "/") return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(0, { duration: 1.4 }); else window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", "/");
      }}><Logo className="h-7 w-auto" /></Link>
      <div className="flex items-center gap-10">
        <nav aria-label="Hauptnavigation" className="hidden gap-10 md:flex">
          {navItems.map(([k, id]) => <ScrollLink key={k} id={id} className="label link-underline">{t(k)}</ScrollLink>)}
        </nav>
        <LangSwitch className="hidden md:flex" />
        <MobileMenu />
      </div>
    </header>
  );
}
