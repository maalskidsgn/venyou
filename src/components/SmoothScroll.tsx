"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.6, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
