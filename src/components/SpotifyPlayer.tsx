import { site } from "@/lib/site";

// Spotify-Webplayer, wird direkt eingebunden (lädt, sobald man in die Nähe der Section scrollt).
// Playlist ändern: src/lib/site.ts (spotifyEmbed).
export default function SpotifyPlayer() {
  return (
    <div className="relative h-[380px] w-full overflow-hidden md:h-[452px]">
      <iframe src={site.spotifyEmbed} title="VENYOU Playlist auf Spotify" width="100%" height="100%"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
        className="absolute inset-0 h-full w-full rounded-xl border-0" />
    </div>
  );
}
