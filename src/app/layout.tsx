import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SoundToggle from "@/components/SoundToggle";
import { LocaleProvider } from "@/components/Locale";
import GrainFilter from "@/components/GrainFilter";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-archivo" });

const indexierung = process.env.NEXT_PUBLIC_INDEXIERUNG === "1";

export const metadata: Metadata = {
  title: "VENYOU",
  description: "Driven by sound. Connected by people. VENYOU Events.",
  robots: indexierung ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={archivo.variable}>
      <body className="font-sans">
        <GrainFilter />
        <LocaleProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
            <SoundToggle />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
