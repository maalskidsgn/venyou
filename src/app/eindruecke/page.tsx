import type { Metadata } from "next";
import Eindruecke from "@/components/Eindruecke";
import Reveal from "@/components/Reveal";
import { T } from "@/components/Locale";

export const metadata: Metadata = { title: "Eindrücke – VENYOU" };

export default function EindrueckePage() {
  return (
    <main className="px-6 pb-24 pt-28 md:px-10">
      <Reveal><h1 className="label mb-14 text-muted"><T k="impressions" /></h1></Reveal>
      <Eindruecke />
    </main>
  );
}
