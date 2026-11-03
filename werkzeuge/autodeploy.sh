#!/usr/bin/env bash
# Läuft auf dem Server alle 2 Minuten (systemd-Timer). Liegt ein neuer Commit auf
# GitHub main, wird geholt, gebaut und der Container getauscht.
set -euo pipefail
REPO=/opt/venyou-git; LOG=/var/log/venyou-autodeploy.log
exec >>"$LOG" 2>&1
[ -d "$REPO/.git" ] || git clone -q git@github-venyou:maalskidsgn/venyou.git "$REPO"
cd "$REPO"; git fetch -q origin main
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] && [ -f /opt/venyou/.deployed ] && exit 0
echo "[$(date '+%F %T')] neuer Commit $(git rev-parse --short origin/main)"
git reset -q --hard origin/main
rsync -a --delete --exclude .git --exclude .env.produktion --exclude .deployed --exclude node_modules --exclude .next "$REPO/" /opt/venyou/
cd /opt/venyou; set -a; . ./.env.produktion; set +a
docker build -q --build-arg WP_API_URL="${WP_API_URL:-}" --build-arg NEXT_PUBLIC_INDEXIERUNG="${NEXT_PUBLIC_INDEXIERUNG:-0}" -t venyou:neu . \
  && bash werkzeuge/container-starten.sh && touch /opt/venyou/.deployed
echo "[$(date '+%F %T')] fertig"
