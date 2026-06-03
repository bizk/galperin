# Architecture Context

## Status

The initial application architecture is defined and ready for implementation.

## Known Direction

- The project supports AI-powered supplier product search and scraping.
- The application is a TypeScript monorepo with a NestJS API, Next.js web UI, shared package, and local infrastructure.
- PostgreSQL stores durable search tasks, scrape jobs, suppliers, and scraped supplier products.
- Redis and BullMQ handle asynchronous scraper job execution.
- Supplier integrations use a task-agnostic adapter contract. Alibaba is the first intended concrete adapter.
- The first version is single-user and has no authentication.
- Agent workflow files live under `.agent/` and are independent from application architecture.

## Decision Log

Record major architecture decisions here after they are accepted or implemented.

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-06-02 | Use `.agent` for agent workflow context | Keeps agent-operating files separate from application code while remaining tool-agnostic. |
| 2026-06-03 | Use a NestJS API and Next.js web app in a monorepo | Keeps backend orchestration and frontend product UI separate while sharing TypeScript contracts where useful. |
| 2026-06-03 | Use PostgreSQL for persistence and Redis/BullMQ for scraping jobs | Supports durable search history and asynchronous supplier scraping without blocking API requests. |
| 2026-06-03 | Use supplier adapters with Alibaba as the first adapter | Keeps supplier-specific scraping isolated from the core search task and job pipeline. |
| 2026-06-03 | Start as a single-user application without authentication | Focuses the MVP on proving task creation, scraping, and result review before adding account boundaries. |

## Update Rules

- Add only durable decisions that affect future implementation.
- Link to relevant task, plan, or handoff files when a decision comes from feature work.
- Do not record temporary investigation notes here.
