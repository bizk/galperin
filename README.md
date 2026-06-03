# galperin

AI-powered supplier scraper.

## Architecture

`galperin` is a TypeScript monorepo:

- `apps/api`: NestJS API, Prisma persistence, and BullMQ scraper jobs.
- `apps/web`: Next.js UI for creating search tasks and reviewing products.
- `packages/shared`: shared public TypeScript contracts.
- `infra/docker-compose.yml`: local PostgreSQL and Redis services.

## Local Development

```bash
npm install
npm run docker:up
npm run prisma:migrate
npm run dev:api
npm run dev:web
```

## Validation

```bash
npm run prisma:generate
npm test
npm run typecheck
npm run build
```

## Agent Workflow

This repository is intended to be worked on mainly through agents.

Start with `AGENTS.md`, then use `.agent/` for shared context, work plans, task definitions, subagent coordination, and handoffs.
