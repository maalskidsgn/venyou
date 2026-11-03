# syntax=docker/dockerfile:1
FROM node:22-alpine AS pakete
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

FROM node:22-alpine AS bau
WORKDIR /app
COPY --from=pakete /app/node_modules ./node_modules
COPY . .
ARG WP_API_URL
ARG NEXT_PUBLIC_INDEXIERUNG
ENV WP_API_URL=$WP_API_URL NEXT_PUBLIC_INDEXIERUNG=$NEXT_PUBLIC_INDEXIERUNG NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS betrieb
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=bau /app/public ./public
COPY --from=bau --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=bau --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
