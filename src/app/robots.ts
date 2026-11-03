import type { MetadataRoute } from "next";

// NEXT_PUBLIC_INDEXIERUNG=1 gibt die Seite für Suchmaschinen frei. Standard: gesperrt.
export default function robots(): MetadataRoute.Robots {
  const frei = process.env.NEXT_PUBLIC_INDEXIERUNG === "1";
  return { rules: frei ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" } };
}
