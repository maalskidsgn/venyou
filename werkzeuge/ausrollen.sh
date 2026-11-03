#!/usr/bin/env bash
# Rollt VENYOU auf den Hetzner-Server aus:  bash werkzeuge/ausrollen.sh
# Build läuft auf dem Server. .env.produktion liegt nur dort (HOST_ADRESSE, WP_API_URL, NEXT_PUBLIC_INDEXIERUNG).
set -euo pipefail
SERVER="root@2.28.31.213"; SCHLUESSEL="$HOME/.ssh/hetzner_vamigo"; ZIEL="/opt/venyou"
cd "$(dirname "$0")/.."
echo "→ Dateien übertragen"
rsync -az --delete -e "ssh -i $SCHLUESSEL" \
  --exclude node_modules --exclude .next --exclude .git --exclude .claude \
  --exclude '.env.local' --exclude '.env.produktion' \
  ./ "$SERVER:$ZIEL/"
echo "→ Abbild bauen"
ssh -i "$SCHLUESSEL" "$SERVER" bash -s <<'FERN'
set -euo pipefail
cd /opt/venyou
[ -f .env.produktion ] || { echo "FEHLER: .env.produktion fehlt auf dem Server." >&2; exit 1; }
set -a; . ./.env.produktion; set +a
docker build --build-arg WP_API_URL="${WP_API_URL:-}" --build-arg NEXT_PUBLIC_INDEXIERUNG="${NEXT_PUBLIC_INDEXIERUNG:-0}" -t venyou:neu .
FERN
echo "→ Container austauschen"
ssh -i "$SCHLUESSEL" "$SERVER" 'bash /opt/venyou/werkzeuge/container-starten.sh'
echo "→ fertig: https://$(ssh -i "$SCHLUESSEL" "$SERVER" 'grep HOST_ADRESSE /opt/venyou/.env.produktion | cut -d= -f2')"
