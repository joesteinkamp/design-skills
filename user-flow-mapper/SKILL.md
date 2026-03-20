---
name: user-flow-mapper
description: "Map granular, screen-level user flows with decision points, error paths, and edge cases. Use when requests involve user flows, task flows, screen flows, interaction flows, decision trees, or mapping step-by-step paths through an interface."
---

# User Flow Mapper

## Overview

Use this skill to map detailed, screen-level user flows that document how users move through an interface to accomplish a task. Accepts design specs (from `$design-spec-writer`), journey maps (from `$journey-mapper`), or feature descriptions and produces structured flows with decision points, error states, and edge cases.

Unlike journey maps (which capture high-level experience arcs across touchpoints), user flows document the granular, click-by-click paths through a specific interface.

The output should be implementation-ready: every screen, decision point, and error state is accounted for so that designers and developers have a complete picture of the interaction. Output is formatted for use in FigJam, Miro, Whimsical, or as structured markdown in Notion. When the target tool is specified, adapt the flow notation for that tool's shapes and connectors.

## Workflow

1. Define the flow scope.
- Identify the user goal and entry point.
- Set clear start state and end state (success condition).
- Determine the persona or user type if behavior varies by role.
- Identify whether this is a task flow (single path), user flow (multiple paths), or wire flow (with screen representations).

2. Map the happy path.
- Document the primary, most common path from start to success.
- List each step: screen/state, user action, and system response.
- Note the transition type between steps (navigation, modal, inline update, redirect).
- Keep steps at a consistent granularity (one action per step).

3. Map decision points and branches.
- Identify every point where the user makes a choice or the system branches.
- Document each branch with its condition and destination.
- Map conditional logic (if/then rules, permission gates, feature flags).
- Note which branches converge back to the main flow.

4. Map error and edge cases.
- Document error states for each step (validation failures, system errors, timeouts).
- Define recovery paths: how the user gets back on track.
- Identify edge cases: empty states, boundary conditions, first-time vs. returning user.
- Map dead ends and how they are prevented or resolved.

5. Annotate the flow.
- Add annotations for complex interactions (animations, loading states, optimistic UI).
- Note technical dependencies or API calls per step.
- Flag open design questions or unresolved decisions.
- Cross-reference with design specs or components where applicable.

6. Format output.
- Use `references/user-flow-template.md` for the response structure.
- Use `references/flow-notation-guide.md` for consistent notation.
- Ensure every path from entry reaches either success or a documented error recovery.

## Output Contract

Always return sections in this order:
- `Flow Overview`
- `Happy Path`
- `Decision Points & Branches`
- `Error & Edge Cases`
- `Flow Annotations`
- `Flow Summary`

## Quality Bar

Revise before finalizing if any of these are true:
- Happy path has any gap where the next screen or action is ambiguous.
- Any decision point is missing its condition expression ("if [condition]") and at least 2 destination branches.
- Error states are not documented for steps that involve user input, API calls, or system processing.
- Any dead end exists without a documented recovery path or explicit "terminal state" label.
- Steps are at inconsistent granularity — e.g., one step is "User clicks Submit" and another is "User completes entire onboarding."
- Flow does not define a specific entry point ("User arrives at [screen] from [source]") and success exit ("User sees [confirmation]").
- Edge cases (empty state, first-time user, permission denied, offline) are not mapped for flows with conditional content.
- Flow notation is inconsistent — all nodes must use the notation from `references/flow-notation-guide.md`.

## Reference Navigation

Read only what is needed:
- flow output shell: `references/user-flow-template.md`
- notation conventions: `references/flow-notation-guide.md`

## Trigger Examples

Positive:
- "Map the user flow for the signup process."
- "Document all paths through the checkout experience."
- "Create a task flow for the password reset feature."
- "Show me the decision tree for the onboarding wizard."

Negative:
- "Map the end-to-end customer journey." (use `$journey-mapper`)
- "Write a design spec for the signup page." (use `$design-spec-writer`)
- "Evaluate this flow against usability heuristics." (use `$heuristic-evaluator`)

Ambiguous:
- "Help me map out this feature." (clarify whether they need a high-level journey map or a granular user flow)
