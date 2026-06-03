# Agent Operating Guide

This repository is designed to be worked on mainly through agents. Use this file as the first entry point before planning or editing.

## Startup Protocol

1. Read `.agent/README.md`.
2. Read the shared context in `.agent/context/`.
3. Inspect `.agent/work/tasks/` for the task or feature being requested.
4. Create or update the matching plan in `.agent/work/plans/` before implementation when the work is non-trivial.
5. Use `.agent/subagents/` to decide whether specialized subagents should research, review, test, or implement part of the work.
6. Update `.agent/work/handoffs/` before stopping if another agent may continue the task.
7. Update `.agent/context/` only when a major project decision, architecture change, or durable convention changes.

## Operating Principles

- Keep all task, plan, and handoff files under `.agent/work/`.
- Use matching filenames across `tasks`, `plans`, and `handoffs` when they refer to the same feature.
- Keep shared context concise and durable. Do not move task-specific notes into `.agent/context/`.
- Prefer small, scoped changes with explicit validation steps.
- Do not create git commits unless the user explicitly asks.
- When source code is introduced, add or update relevant tests where practical.

## Naming

Use this filename pattern for work items:

```text
YYYY-MM-DD-short-feature-name.md
```

Example:

```text
.agent/work/tasks/2026-06-02-agent-workflow.md
.agent/work/plans/2026-06-02-agent-workflow.md
.agent/work/handoffs/2026-06-02-agent-workflow.md
```
