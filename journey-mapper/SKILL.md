---
name: journey-mapper
description: "Map end-to-end user experiences across touchpoints, identifying pain points, emotions, and design opportunities. Use when requests involve journey mapping, experience mapping, service blueprinting, or identifying pain points and opportunities across a user flow."
---

# Journey Mapper

## Overview

Use this skill to map complete user experiences across touchpoints, channels, and time. Accepts personas (from `$persona-creator`), research insights (from `$research-synthesizer`), or scenario descriptions and produces structured journey maps with emotional arcs and opportunity identification.

The output should reveal where the experience breaks down and where design effort will have the most impact.

## Workflow

1. Define scope.
- Identify persona, scenario, and journey type (current-state, future-state, or service-blueprint).
- Set clear start and end points.
- Determine channels and touchpoints to cover.
- If persona input comes from `$persona-creator`, use the handoff schema directly.

2. Map phases.
- Break the journey into 4-7 sequential phases.
- Each phase needs a goal, touchpoints, channels, and duration.
- Keep phases at a consistent level of granularity.

3. Layer details per phase.
- Document actions (what the user does).
- Document thoughts (what the user thinks).
- Document emotions with valence (positive/neutral/negative) and intensity.
- Identify pain points with severity ratings.
- Note moments of delight.

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
- Phases are missing actions, thoughts, or emotions.
- Pain points lack severity ratings.
- Opportunities do not map to specific pain points.
- Emotional arc has gaps or inconsistencies across phases.
- Journey lacks clear start and end points.
- Phases are at inconsistent levels of granularity.

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
- "Write a design spec for the settings page."
- "Create a persona for our mobile users."
- "Evaluate this design against heuristics."

Ambiguous:
- "Help me understand where users struggle." (clarify whether journey mapping, research synthesis, or heuristic evaluation is needed)
