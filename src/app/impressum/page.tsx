import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { imprint } from "@/lib/legal";

export const metadata: Metadata = { title: "Impressum – VENYOU" };

export default function ImpressumPage() {
  return <LegalPage doc={imprint} />;
}
