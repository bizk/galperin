# Task: Project Architecture

## Status

completed

## Links

- Plan: `../plans/2026-06-03-project-architecture.md`
- Handoff: `../handoffs/2026-06-03-project-architecture.md`
- Context:
  - `../../context/project.md`
  - `../../context/architecture.md`

## Goal

Define and implement the initial application foundation for an AI-powered supplier scraper.

## Background

`galperin` should let a user create supplier product search tasks, process scraping asynchronously, and view scraped results in a UI. The repository previously contained only agent workflow documentation.

## Scope

In scope:

- Monorepo structure with NestJS API, Next.js web app, shared package, and local infrastructure.
- PostgreSQL persistence and Redis-backed job queue.
- Search task, scraper job, supplier, and supplier product foundation.
- Supplier adapter contract with a fake adapter for end-to-end validation.
- Initial web screens for creating and viewing search tasks.

Out of scope:

- Production authentication.
- Production-ready Alibaba scraping.
- Deployment automation.

## Acceptance Criteria

- The repository has a working TypeScript monorepo structure.
- The API exposes health, search task, and result endpoints.
- Search task creation enqueues background scraping work.
- A fake supplier adapter can produce persisted sample products.
- The web app can create tasks and display task details.
- Initial tests and validation scripts exist.

## Constraints

- Do not edit the Cursor plan file.
- Keep the first version single-user.
- Keep supplier-specific logic behind adapter contracts.

## Suggested Subagents

- researcher: verify framework/library setup if dependencies change.
- planner: keep architecture decisions aligned with `.agent/context/architecture.md`.
- implementer: scaffold the monorepo and feature foundation.
- reviewer: inspect module boundaries and test coverage.
- tester-qa: run install, test, and build validation.

## Notes

- The accepted ORM default is Prisma.
