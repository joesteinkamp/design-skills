---
name: journey-mapper
description: "Map end-to-end user experiences across touchpoints, identifying pain points, emotions, and design opportunities. Use when requests involve journey mapping, experience mapping, service blueprinting, or identifying pain points and opportunities across a user flow."
---

# Journey Mapper

## Overview

Use this skill to map complete user experiences across touchpoints, channels, and time. Accepts personas (from `$persona-creator`), research insights (from `$research-synthesizer`), or scenario descriptions and produces structured journey maps with emotional arcs and opportunity identification.

The output should reveal where the experience breaks down and where design effort will have the most impact. Output is formatted for use in FigJam, Miro, or as structured markdown in Notion. When the target tool is specified, adapt the map layout and notation accordingly.

## Workflow

1. Define scope.
- Identify persona, scenario, and journey type (current-state, future-state, or service-blueprint).
- Set clear start and end points.
- Determine channels and touchpoints to cover.
- If persona input comes from `$persona-creator`, use the handoff schema directly.

2. Map phases using the 5-layer emotional arc method.
- Break the journey into 4-7 sequential phases.
- Each phase needs a goal, touchpoints, channels, and duration.
- Keep phases at a consistent level of granularity.
- Apply the canonical 5 layers per phase: Actions (what the user does) → Thoughts (what the user thinks) → Emotions (valence + intensity) → Pain Points (severity-rated) → Moments of Delight.
- Plot the emotional arc across all phases to reveal the experience shape (where it rises, where it crashes).

4. Identify opportunities.
- Map each pain point to a design opportunity.
- Classify opportunities as quick-win, strategic, or systemic.
- Rate impact and effort for prioritization.
- Synthesize the emotional arc across all phases.

5. Format output.
- Use `references/journey-map-template.md` for the response structure.
- Include `references/journey-handoff-schema.md` when output feeds downstream skills.

## Output Contract

Always return sections in this order:
- `Journey Overview`
- `Phase Map`
- `Emotional Arc`
- `Opportunity Map`
- `Key Insights`
- `Downstream Handoff` (optional, include when feeding other skills)

## Quality Bar

Revise before finalizing if any of these are true:
- Any phase is missing one or more of the 5 layers (actions, thoughts, emotions, pain points, moments of delight).
- Pain points do not have severity ratings (critical / major / minor).
- Emotional valence is flat across all phases — if the arc never dips or rises, the journey is under-analyzed.
- Fewer than 4 phases are mapped for a multi-touchpoint journey.
- Opportunities do not map 1:1 to specific pain points (every pain point should have a corresponding opportunity).
- Opportunity classification is missing (quick-win / strategic / systemic) or impact/effort ratings are absent.
- Journey has no clear start trigger ("user arrives at...") and end condition ("user has successfully...").
- Phases are at inconsistent granularity — e.g., one phase covers 5 minutes and another covers 3 weeks.

## Reference Navigation

Read only what is needed:
- journey output shell: `references/journey-map-template.md`
- downstream handoff contract: `references/journey-handoff-schema.md`

## Trigger Examples

Positive:
- "Map the end-to-end onboarding journey for new users."
- "Create a current-state journey map for the checkout experience."
- "Identify pain points across the customer support flow."

Negative:
- "Map the user flow for the signup page." (use `$user-flow-mapper` — screen-level task flow, not cross-touchpoint journey)
- "Document all paths through the checkout." (use `$user-flow-mapper` — granular decision trees, not experience arcs)
- "Write a design spec for the settings page." (use `$design-spec-writer`)
- "Evaluate this design against heuristics." (use `$heuristic-evaluator`)

Ambiguous:
- "Help me understand where users struggle." (clarify: do you want a journey map across touchpoints, research synthesis from data, or a heuristic evaluation of screens?)
- "Help me map out this feature." (clarify: do you want a high-level journey across touchpoints and emotions, or a granular screen-level task flow?)
