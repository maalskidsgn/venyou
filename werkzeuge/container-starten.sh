#!/usr/bin/env bash
# Läuft auf dem Server. Tauscht den Container gegen das frisch gebaute Abbild.
set -euo pipefail
cd /opt/venyou
set -a; . ./.env.produktion; set +a
HOST="${HOST_ADRESSE:?HOST_ADRESSE fehlt in .env.produktion}"

# Echte Domain (optional): DOMAIN=venyou-event.com in .env.produktion.
# Eigener Router, damit ein fehlendes Zertifikat die Vorschau-Adresse nicht mitreißt.
# www leitet auf die Domain ohne www um.
DOMAIN_MARKEN=()
if [ -n "${DOMAIN:-}" ]; then
  DOM_RX="${DOMAIN//./\\.}"
  DOMAIN_MARKEN=(
    -l "traefik.http.routers.http-venyou-dom.rule=Host(\`$DOMAIN\`) || Host(\`www.$DOMAIN\`)"
    -l traefik.http.routers.http-venyou-dom.entryPoints=http
    -l traefik.http.routers.http-venyou-dom.middlewares=venyou-https
    -l traefik.http.routers.http-venyou-dom.service=venyou
    -l "traefik.http.routers.https-venyou-dom.rule=Host(\`$DOMAIN\`) || Host(\`www.$DOMAIN\`)"
    -l traefik.http.routers.https-venyou-dom.entryPoints=https
    -l traefik.http.routers.https-venyou-dom.middlewares=gzip,venyou-www
    -l traefik.http.routers.https-venyou-dom.service=venyou
    -l traefik.http.routers.https-venyou-dom.tls=true
    -l traefik.http.routers.https-venyou-dom.tls.certresolver=letsencrypt
    -l "traefik.http.middlewares.venyou-www.redirectregex.regex=^https://www\\.$DOM_RX/(.*)"
    -l "traefik.http.middlewares.venyou-www.redirectregex.replacement=https://$DOMAIN/\${1}"
    -l traefik.http.middlewares.venyou-www.redirectregex.permanent=true
  )
fi

docker rm -f venyou 2>/dev/null || true
docker run -d --name venyou --restart unless-stopped \
  --network coolify \
  --env-file /opt/venyou/.env.produktion \
  -l traefik.enable=true \
  -l traefik.docker.network=coolify \
  -l "traefik.http.routers.http-venyou.rule=Host(\`$HOST\`)" \
  -l traefik.http.routers.http-venyou.entryPoints=http \
  -l traefik.http.routers.http-venyou.middlewares=venyou-https \
  -l traefik.http.routers.http-venyou.service=venyou \
  -l "traefik.http.routers.https-venyou.rule=Host(\`$HOST\`)" \
  -l traefik.http.routers.https-venyou.entryPoints=https \
  -l traefik.http.routers.https-venyou.middlewares=gzip \
  -l traefik.http.routers.https-venyou.service=venyou \
  -l traefik.http.routers.https-venyou.tls=true \
  -l traefik.http.routers.https-venyou.tls.certresolver=letsencrypt \
  -l traefik.http.services.venyou.loadbalancer.server.port=3000 \
  -l traefik.http.middlewares.venyou-https.redirectscheme.scheme=https \
  -l traefik.http.middlewares.venyou-https.redirectscheme.permanent=true \
  -l traefik.http.middlewares.gzip.compress=true \
  "${DOMAIN_MARKEN[@]}" \
  venyou:neu
sleep 3
docker ps --filter name=venyou --format '{{.Names}}  {{.Status}}'
