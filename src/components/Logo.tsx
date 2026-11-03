import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return <Image src="/brand/logo-white.svg" alt="VENYOU" width={807} height={247} priority className={`grain ${className}`} />;
}

export function Cross({ className = "" }: { className?: string }) {
  return <Image src="/brand/cross.svg" alt="" width={352} height={247} className={`grain ${className}`} />;
}
