FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG DATABASE_URL=postgresql://localhost:5432/galperin

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace @galperin/shared && \
    npm run build --workspace @galperin/api && \
    npx prisma generate --schema=apps/api/prisma/schema.prisma

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app
WORKDIR /app/apps/api
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules ../../node_modules
USER app
EXPOSE 3001
CMD ["node", "dist/main.js"]
