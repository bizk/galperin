# Plan: Project Architecture

## Status

completed

## Links

- Task: `../tasks/2026-06-03-project-architecture.md`
- Handoff: `../handoffs/2026-06-03-project-architecture.md`
- Context:
  - `../../context/project.md`
  - `../../context/architecture.md`

## Summary

Implement the accepted MVP architecture: a NestJS API, Next.js web app, shared contracts package, PostgreSQL persistence, Redis/BullMQ jobs, and supplier adapter pipeline.

## Steps

1. Record durable architecture decisions.
2. Scaffold workspace, local infrastructure, and TypeScript configuration.
3. Add API foundation with health, Prisma, queue, and core modules.
4. Implement search task creation, job enqueueing, fake supplier processing, and result persistence.
5. Add Next.js pages for task creation, listing, and detail views.
6. Add initial tests and validation scripts.

## Files Expected To Change

- `.agent/context/architecture.md`
- `.agent/work/tasks/2026-06-03-project-architecture.md`
- `.agent/work/plans/2026-06-03-project-architecture.md`
- `.agent/work/handoffs/2026-06-03-project-architecture.md`
- `package.json`
- `apps/api/`
- `apps/web/`
- `packages/shared/`
- `infra/docker-compose.yml`

## Subagent Assignments

| Role | Purpose | Expected Output |
| --- | --- | --- |
| implementer | Build the initial architecture foundation | Monorepo, API, web, shared package, and infra files |
| tester-qa | Validate the foundation | Test and build results |
| reviewer | Check module boundaries | Findings or confirmation |

## Decisions

| Decision | Reason |
| --- | --- |
| NestJS API plus Next.js web app | Keeps backend orchestration separate from the UI. |
| Prisma ORM | Fast TypeScript schema iteration for a bootstrap-stage repo. |
| PostgreSQL plus Redis/BullMQ | Durable data with asynchronous scraping jobs. |
| Fake supplier adapter first | Validates the pipeline before relying on external scraping behavior. |

## Validation

- `npm test` passed.
- `npm run typecheck` passed.
- `npm run build` passed.

## Risks

- The Alibaba adapter will need separate validation because supplier sites often change markup and anti-bot behavior.
- Queue workers run inside the NestJS API process initially; this can be split later if load requires it.
