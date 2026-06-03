# Subagents

Subagent files define reusable roles that agents can delegate to when work benefits from focused investigation, review, testing, or implementation.

## Base Roles

- `researcher.md`: gathers repo context, external constraints, options, and unknowns.
- `planner.md`: turns task briefs and research into implementation plans.
- `implementer.md`: makes scoped code, documentation, or configuration changes.
- `reviewer.md`: checks changes for bugs, regressions, missing validation, and task alignment.
- `tester-qa.md`: designs, runs, and reports validation for a task.

These roles are task-agnostic capability profiles. The orchestrating agent binds a role to a specific task by passing the active task, plan, context files, goal, and expected output.

## Usage

1. Read the active task and plan.
2. Choose the smallest useful subagent role.
3. Give the subagent clear inputs and expected output.
4. Copy relevant findings back into the task, plan, or handoff.

## Template

Copy `_template.md` when defining a new reusable role.
