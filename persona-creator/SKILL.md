---
name: persona-creator
description: "Build evidence-based personas from research data, behavioral observations, or stakeholder input. Use when requests involve persona creation, user archetypes, behavioral segmentation, or preparing user profiles for downstream skills like $journey-mapper or $design-spec-writer."
---

# Persona Creator

## Overview

Use this skill to build personas grounded in evidence rather than assumptions. Accepts research synthesis (from `$research-synthesizer`), raw interview data, behavioral observations, or stakeholder descriptions and produces structured persona cards.

Personas should be behavioral, not demographic -- group users by goals, frustrations, and decision patterns, not age or job title alone.

## Workflow

1. Gather inputs.
- Accept research handoff from `$research-synthesizer` or raw descriptions.
- Classify evidence quality: research-backed, partially-evidenced, or assumed.
- Note participant count and segment coverage.
- If inputs are thin, state assumptions explicitly.

2. Identify behavioral dimensions.
- Extract goals, frustrations, behaviors, tools, context, and decision triggers.
- Group by behavioral differences, not demographics.
- Look for patterns that create meaningfully different design needs.

3. Build persona profiles.
- Name each persona with a memorable, descriptive label.
- Fill in role, scenario, goals, frustrations, behaviors, mental models.
- Write a day-in-the-life scenario (3-5 sentences).
- Tag evidence quality per attribute.

4. Validate and refine.
- Flag which attributes are evidence-backed vs. assumed.
- Rank personas by design relevance (primary, secondary, edge-case).
- Include anti-personas when they clarify scope boundaries.
- Log all assumptions with confidence and validation needs.

5. Format output.
- Use `references/persona-card-template.md` for the response structure.
- Include `references/persona-handoff-schema.md` when output feeds downstream skills.

## Output Contract

Always return sections in this order:
- `Persona Summary Table`
- `Persona Cards`
- `Anti-Personas` (optional)
- `Assumptions Log`
- `Downstream Handoff` (optional, include when feeding other skills)

## Quality Bar

Revise before finalizing if any of these are true:
- Personas are demographic stereotypes rather than behavioral archetypes.
- Goals or frustrations are missing from any persona card.
- Evidence quality is not stated per persona.
- Assumptions are not logged with confidence levels.
- Day-in-the-life scenarios are generic and not tied to the product context.
- Anti-personas are missing when scope boundaries are unclear.

## Reference Navigation

Read only what is needed:
- persona output shell: `references/persona-card-template.md`
- downstream handoff contract: `references/persona-handoff-schema.md`

## Trigger Examples

Positive:
- "Create personas from these user interview findings."
- "Build user archetypes for our e-commerce checkout redesign."
- "Turn this research synthesis into persona cards."

Negative:
- "Map the user journey for onboarding."
- "Write a design spec for the settings page."
- "Audit this screen for accessibility."

Ambiguous:
- "Help me understand our users better." (clarify whether personas, research synthesis, or journey mapping is needed)
