# Work Area

The `.agent/work` directory is the single logical place for feature and task execution context.

## Layout

```text
.agent/work/
  tasks/      Task and feature briefs.
  plans/      Implementation plans linked to tasks.
  handoffs/   Continuation notes for future agents.
```

## Linking Convention

Use matching filenames across folders for the same feature:

```text
tasks/2026-06-02-example-feature.md
plans/2026-06-02-example-feature.md
handoffs/2026-06-02-example-feature.md
```

Each task should link to its plan and handoff. Each plan and handoff should link back to the task.

## Status Values

- `proposed`
- `planned`
- `in-progress`
- `blocked`
- `done`
- `cancelled`
