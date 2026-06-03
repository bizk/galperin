# Handoff: Project Architecture

## Links

- Task: `../tasks/2026-06-03-project-architecture.md`
- Plan: `../plans/2026-06-03-project-architecture.md`
- Context:
  - `../../context/project.md`
  - `../../context/architecture.md`

## Current Status

Implementation is complete for the initial architecture foundation.

## Completed

- Accepted MVP architecture has been documented.
- Monorepo workspace has been scaffolded.
- Docker Compose local infrastructure has been added.
- NestJS API foundation has been added.
- Prisma schema has been added for search tasks, scrape jobs, suppliers, and supplier products.
- BullMQ scraper job pipeline has been added with a fake supplier adapter.
- Next.js MVP UI has been added for task creation, task listing, and task detail views.
- Initial unit tests have been added.

## Remaining

- Add a real Alibaba adapter.
- Add database migrations after local PostgreSQL is running.
- Add authentication when product flow is stable.

## Important Context

- Use Prisma 7 for SQL persistence. The datasource URL lives in `apps/api/prisma.config.ts`.
- Use Redis and BullMQ for queued scraping work.
- Keep supplier integrations behind task-agnostic adapter contracts.

## Decisions Made

- Start as a single-user product with no authentication.
- Build Alibaba after validating the fake adapter pipeline.

## Validation

- `npm run prisma:generate` passed.
- `npm test` passed.
- `npm run typecheck` passed.
- `npm run build` passed.

## Next Recommended Step

Start local infrastructure with `npm run docker:up`, run `npm run prisma:migrate`, then run the API and web apps to smoke test the full queued flow.
