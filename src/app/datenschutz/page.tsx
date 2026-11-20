import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = { title: "Datenschutz – VENYOU" };

export default function DatenschutzPage() {
  return <LegalPage doc={privacy} />;
}
