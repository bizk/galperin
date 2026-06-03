# New Task Request

Use this template when asking an agent to create a new task. Replace the bracketed text and remove sections that do not apply.

## Copyable Prompt

```text
Read AGENTS.md and the shared context in .agent/context/.

Create a new task under .agent/work/tasks/ using this filename:
<YYYY-MM-DD-short-feature-name.md>

Task title:
<short task title>

Goal:
<what outcome should this task produce?>

Background:
<what context should the agent know before planning?>

In scope:
- <item 1>
- <item 2>

Out of scope:
- <item 1>
- <item 2>

Acceptance criteria:
- <how we know this is done>
- <observable result or behavior>

Constraints:
- <technical, product, architecture, time, or style constraint>

Suggested subagents:
- researcher: <what should be researched, if anything>
- planner: <what should be planned, if anything>
- implementer: <what should be implemented, if anything>
- reviewer: <what should be reviewed, if anything>
- tester-qa: <what should be validated, if anything>

Notes:
- <extra details, links, examples, or preferences>

After creating the task:
- Create the matching plan file under .agent/work/plans/ if the work is non-trivial.
- Create or reserve the matching handoff file under .agent/work/handoffs/ if the work may span sessions.
- Use the same filename across task, plan, and handoff files.
```

## Minimal Version

```text
Read AGENTS.md and .agent/context/.

Create a new task in .agent/work/tasks/ named:
<YYYY-MM-DD-short-feature-name.md>

Goal:
<desired outcome>

Context:
<important background>

Acceptance criteria:
- <done condition 1>
- <done condition 2>

Constraints:
- <constraint 1>

Create a matching plan in .agent/work/plans/ if this is non-trivial.
Use the same filename for related task, plan, and handoff files.
```
