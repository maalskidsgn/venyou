import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return <Image src="/brand/logo-white.svg" alt="VENYOU" width={807} height={247} priority className={`grain ${className}`} />;
}

// variant "accent": gelbes Kreuz mit weißem Balken unten links
export function Cross({ className = "", variant = "yellow" }: { className?: string; variant?: "yellow" | "accent" }) {
  const src = variant === "accent" ? "/brand/cross-accent.svg" : "/brand/cross.svg";
  return <Image src={src} alt="" width={352} height={247} className={`grain ${className}`} />;
}
