"use client";
import { formatDate, useLocale, useT } from "./Locale";

export default function EventMeta({ date, time, location }: { date: string; time?: string; location?: string }) {
  const { locale } = useLocale(); const t = useT();
  return (
    <p className="label mt-6 text-accent">
      {formatDate(date, locale, { weekday: "short", day: "2-digit", month: "long", year: "numeric" })}
      {time && ` · ${t("from")} ${time}`}{location && ` · ${location}`}
    </p>
  );
}
