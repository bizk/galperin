# Agent Conventions

## General

- Use English for code, documentation, plans, and handoffs.
- Prefer explicit plans before non-trivial implementation.
- Keep changes scoped to the active task.
- Keep changes small as possible. Avoid overdoing solutions.
- Preserve user changes and avoid reverting unrelated work.

## Work Records

- Keep all task execution records under `.agent/work/`.
- Use matching filenames across `tasks`, `plans`, and `handoffs` for the same feature.
- Link task briefs, plans, and handoffs to each other.
- Update existing records when continuing work instead of creating duplicates.

## Implementation

- Follow the patterns already present in the codebase once application code exists.
- Add tests for public behavior when code is introduced or changed.
- Document major decisions in `.agent/context/architecture.md`.
- Store task-specific assumptions in the relevant `.agent/work/` files.
