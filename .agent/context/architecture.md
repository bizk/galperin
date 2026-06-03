# Architecture Context

## Status

The application architecture is not defined yet.

## Known Direction

- The project will support supplier scraping.
- The implementation stack, persistence model, scheduling model, and deployment target are still undecided.
- Agent workflow files live under `.agent/` and are independent from application architecture.

## Decision Log

Record major architecture decisions here after they are accepted or implemented.

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-06-02 | Use `.agent` for agent workflow context | Keeps agent-operating files separate from application code while remaining tool-agnostic. |

## Update Rules

- Add only durable decisions that affect future implementation.
- Link to relevant task, plan, or handoff files when a decision comes from feature work.
- Do not record temporary investigation notes here.
