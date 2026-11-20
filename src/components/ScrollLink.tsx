"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// Link auf eine Section der Startseite (One-Page-Navigation).
// Auf der Startseite wird weich gescrollt, auf Unterseiten wird zur Startseite + Section navigiert.
export default function ScrollLink({ id, className, children, onNavigate }: {
  id: string; className?: string; children: React.ReactNode; onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const lenis = useLenis();
  return (
    <Link href={`/#${id}`} className={className} onClick={(e) => {
      onNavigate?.();
      if (pathname !== "/") return;
      e.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4, force: true });
      else target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    }}>
      {children}
    </Link>
  );
}
