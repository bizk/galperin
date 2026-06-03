# Agent Workspace

The `.agent` directory contains the durable operating context for agents working on this repository.

## Layout

```text
.agent/
  context/      Shared project context and major decisions.
  work/         Feature and task execution records.
  subagents/    Reusable subagent role definitions.
```

## Agent Flow

1. Start with `AGENTS.md`.
2. Load the relevant shared context from `.agent/context/`.
3. Find or create the task brief in `.agent/work/tasks/`.
4. Find or create the implementation plan in `.agent/work/plans/`.
5. Use subagent roles from `.agent/subagents/` when delegation helps.
6. Record continuation notes in `.agent/work/handoffs/`.
7. Update `.agent/context/` only for durable, cross-feature knowledge.

## Context Rules

- Shared context is for information future tasks need.
- Work files are for task-specific details.
- Plans and handoffs should link back to their task brief.
- Keep entries current instead of creating duplicate notes.
