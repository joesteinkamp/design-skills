---
name: design-spec-writer
description: "Write structured design specs bridging design intent with engineering requirements -- problem statements, user stories, interaction details, edge cases, and acceptance criteria. Use when requests involve design specs, feature specs, PRDs, user stories, or preparing design documentation for $dev-handoff-writer."
---

# Design Spec Writer

## Overview

Use this skill to produce design specs that bridge the gap between design intent and engineering requirements. Accepts feature descriptions, personas (from `$persona-creator`), journey context (from `$journey-mapper`), or research insights (from `$research-synthesizer`) and produces structured specifications. Output is formatted for use in Notion, Confluence, Linear, or Google Docs. When the target tool is specified, adapt the spec structure and linking conventions accordingly.

The output should be build-ready: every user story has acceptance criteria, every screen has states documented, and every edge case is addressed.

## Workflow

1. Capture context.
- Identify feature, user problem, personas, journey context, and business constraints.
- Determine decision stage: proposal, refinement, or build-ready.
- Accept inputs from upstream skills or raw descriptions.
- If critical context is missing, state assumptions explicitly.

2. Define scope.
- Write a clear problem statement.
- Define success metrics that are measurable.
- List in-scope and out-of-scope items.
- Identify dependencies and blockers.

3. Detail user stories and acceptance criteria.
- Write user stories in "As a [persona], I want to [action] so that [outcome]" format.
- Define testable acceptance criteria using Given/When/Then.
- Include accessibility requirements per story.
- Add responsive behavior notes.

4. Specify interactions.
- Use `references/interaction-spec-template.md` for each key screen or component.
- Document all states: default, empty, loading, error, disabled.
- Describe interactions with trigger, behavior, feedback, and result.
- Identify edge cases and expected behavior.

5. Format output.
- Use `references/design-spec-template.md` for the response structure.
- Include `references/dev-handoff-schema.md` when output feeds `$dev-handoff-writer`.
- Log open questions with owners and deadlines.

## Output Contract

Always return sections in this order:
- `Design Context`
- `Scope`
- `User Stories & Acceptance Criteria`
- `Interaction Specs`
- `Content Requirements`
- `Open Questions`
- `Dev Handoff Summary` (optional, include when feeding `$dev-handoff-writer`)

## Quality Bar

Revise before finalizing if any of these are true:
- User stories do not follow "As a [persona], I want to [action] so that [outcome]" format.
- Any user story is missing numbered acceptance criteria in Given/When/Then format.
- Any interactive component is missing at least 3 of these states: default, empty, loading, error, disabled.
- Edge cases section has fewer than 3 entries for a feature with user input.
- Problem statement does not name the specific user pain point it addresses.
- Success metrics use vanity terms ("improve engagement") instead of measurable targets ("increase task completion rate from 60% to 80%").
- Open questions have no assigned owner or resolution deadline.
- Responsive behavior is not specified for at least 2 breakpoints (mobile, desktop).

## Reference Navigation

Read only what is needed:
- spec output shell: `references/design-spec-template.md`
- interaction detail template: `references/interaction-spec-template.md`
- downstream handoff contract: `references/dev-handoff-schema.md`

## Trigger Examples

Positive:
- "Write a design spec for the new onboarding flow."
- "Create user stories and acceptance criteria for the checkout redesign."
- "Spec out the interaction details for the settings page."

Negative:
- "Create a dev handoff doc for these components." (use `$dev-handoff-writer` — implementation-ready specs for engineers, not design intent documentation)
- "Write implementation specs with component states and responsive behavior." (use `$dev-handoff-writer` — developer documentation, not design documentation)
- "Synthesize these interview transcripts." (use `$research-synthesizer`)
- "Audit this design for accessibility." (use `$accessibility-auditor`)

Ambiguous:
- "Help me document this feature." (clarify: do you want a design spec capturing intent and requirements, or a dev handoff doc with implementation details?)
- "Write specs for this feature." (clarify: design-level specs with user stories and rationale, or developer-level specs with component states and code guidance?)
