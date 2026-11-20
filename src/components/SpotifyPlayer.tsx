"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { useT } from "./Locale";

// Spotify-Webplayer mit Zwei-Klick-Lösung: Der Player (und damit eine Verbindung zu Spotify)
// wird erst geladen, wenn man auf den Button klickt. Gut für Datenschutz und Ladezeit.
export default function SpotifyPlayer() {
  const t = useT();
  const [load, setLoad] = useState(false);

  return (
    <div className="relative h-[380px] w-full overflow-hidden border border-line bg-white/[0.03] md:h-[452px]">
      {load ? (
        <iframe src={site.spotifyEmbed} title="VENYOU Playlist auf Spotify" width="100%" height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
          className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <button onClick={() => setLoad(true)}
            className="label group flex items-center gap-4 bg-accent px-8 py-4 text-accent-ink transition hover:bg-fg">
            <span aria-hidden className="inline-block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
            {t("playlist_load")}
          </button>
          <p className="label max-w-xs text-muted">{t("playlist_note")}</p>
          <a href={site.spotifyPlaylist} target="_blank" rel="noreferrer" className="label link-underline">{t("playlist_open")} ↗</a>
        </div>
      )}
    </div>
  );
}
