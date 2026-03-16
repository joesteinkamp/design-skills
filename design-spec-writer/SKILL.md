---
name: design-spec-writer
description: "Write structured design specs bridging design intent with engineering requirements -- problem statements, user stories, interaction details, edge cases, and acceptance criteria. Use when requests involve design specs, feature specs, PRDs, user stories, or preparing design documentation for $dev-handoff-writer."
---

# Design Spec Writer

## Overview

Use this skill to produce design specs that bridge the gap between design intent and engineering requirements. Accepts feature descriptions, personas (from `$persona-creator`), journey context (from `$journey-mapper`), or research insights (from `$research-synthesizer`) and produces structured specifications.

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
- User stories lack testable acceptance criteria.
- Screens are missing states (empty, loading, error).
- Edge cases are not identified.
- Problem statement is vague or not tied to user needs.
- Success metrics are not measurable.
- Open questions have no owners.

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
- "Synthesize these interview transcripts."
- "Create a persona for our power users."
- "Audit this design for accessibility."

Ambiguous:
- "Help me document this feature." (clarify whether a design spec, dev handoff doc, or something else is needed)
