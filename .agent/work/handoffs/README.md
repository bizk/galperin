# Handoffs

Handoff files help another agent continue a task without rereading the entire conversation.

Create or update a handoff when:

- Work pauses before completion.
- A task spans multiple sessions.
- A major decision or blocker needs to be visible to the next agent.
- Validation has been run and results should be preserved.

## Required Links

Each handoff should link to:

- Matching task in `.agent/work/tasks/`
- Matching plan in `.agent/work/plans/`
- Relevant shared context in `.agent/context/`

## Template

Copy `_template.md` when creating a handoff.
