---
name: workshop-planner
description: "Plan high-impact workshops from objective through facilitation design and produce structured handoff briefs for downstream board/prompt generation. Use when requests involve workshop scoping, agenda design, exercise sequencing, facilitation planning, or preparing inputs for $figjam-workshop-prompt-creator."
---

# Workshop Planner

## Overview

Use this skill to convert a vague workshop request into a concrete plan that can be executed by a facilitator and handed off to `figjam-workshop-prompt-creator`.

The output should be decision-ready: objective, audience, agenda, exercises, facilitation notes, and clear expected artifacts.

## Workflow

1. Define workshop frame.
- Capture topic, audience, duration, team size, decision scope, and success criteria.
- Clarify constraints: time limits, participant seniority, remote/hybrid setup, pre-reads, and dependencies.
- If missing inputs block planning quality, state assumptions explicitly.

2. Choose planning pattern.
- For alignment and operating-model sessions, prefer: context -> reactions -> solutions/signals -> commitments.
- For decision sessions, prefer: context -> options -> tradeoffs -> decision -> owners.
- For discovery sessions, prefer: context -> pain points -> opportunities -> prioritization -> next actions.

3. Build agenda and exercise design.
- Time-box every segment.
- Define each exercise with objective, participant prompt, activity instructions, and expected outputs.
- Include discussion prompts that force ownership and short-horizon action.

4. Add facilitation risk controls.
- Pre-identify likely failure modes (scope drift, dominant voices, low engagement, unresolved conflict).
- Add explicit interventions for each failure mode.
- Keep facilitation language practical and operational, not theoretical.

5. Produce the handoff packet.
- Format output using `references/workshop-planning-template.md`.
- Include a `FigJam Creator Handoff` section using `references/figjam-handoff-schema.md`.
- Ensure the handoff is copy/paste-ready as input for `$figjam-workshop-prompt-creator`.

## Output Contract

Always return sections in this order:
- `Workshop Brief`
- `Agenda & Run of Show`
- `Exercise Specs`
- `Facilitation Risks & Interventions`
- `Expected Artifacts`
- `FigJam Creator Handoff`

In `FigJam Creator Handoff`, always include:
- Workshop profile fields (`Topic`, `Audience`, `Duration`, `Team size`, `Workshop objective`, `Key constraints`)
- Time-boxed agenda blocks
- Exercise-level sticky prompts and board-zone labels
- Discussion prompts
- Post-workshop synthesis schema and output rules

## Integration Rules

When the user asks to feed into `figjam-workshop-prompt-creator`:
- Output exactly one handoff block in the schema from `references/figjam-handoff-schema.md`.
- Keep field names stable; do not rename headings.
- Keep values specific (no placeholders like "add details here").
- Make assumptions explicit in both the plan and handoff.

If the user asks for AI-Native workshop planning:
- Use the AI-Native pattern from `../figjam-workshop-prompt-creator/references/ai-native-workshop-instructions.md`.
- Preserve exercises and output zones needed by the downstream FigJam prompt creator.

## Quality Bar

Revise before finalizing if any of these are true:
- Agenda lacks time boxes or exceeds total duration.
- Exercises do not define expected outputs.
- Plan has no ownership/accountability path.
- Handoff schema is incomplete or not machine-readable by a downstream skill.
- Outcomes are abstract and not observable.

## Reference Navigation

Read only what is needed:
- planner output shell: `references/workshop-planning-template.md`
- downstream input contract: `references/figjam-handoff-schema.md`
- AI-Native content baseline (only when requested): `../figjam-workshop-prompt-creator/references/ai-native-workshop-instructions.md`

## Trigger Examples

Positive:
- "Plan a 90-minute alignment workshop for the design team."
- "Create a workshop agenda with exercises and facilitation guidance."
- "Build a workshop plan we can pass to figjam-workshop-prompt-creator."

Negative:
- "Make a FigJam board directly."
- "Write frontend code."
- "Summarize this random article."

Ambiguous:
- "Help me run a workshop next month." (plan first; clarify workshop objective and desired decision/output)
