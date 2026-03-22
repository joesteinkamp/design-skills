---
name: workshop-planner
description: "Plan high-impact workshops from objective through facilitation design and produce structured handoff briefs for downstream board/prompt generation. Use when requests involve workshop scoping, agenda design, exercise sequencing, facilitation planning, or preparing inputs for $figjam-workshop-prompt-creator."
---

# Workshop Planner

## Overview

Use this skill to convert a vague workshop request into a concrete plan that can be executed by a facilitator and handed off to `figjam-workshop-prompt-creator`. Output is formatted for use in FigJam, Miro, or as a structured brief in Notion or Google Docs. When the target tool is specified, adapt the exercise formats and board structure accordingly.

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
- Agenda time boxes do not sum to the stated total duration (±5 minutes for buffer).
- Any exercise is missing an explicit expected output (what artifact or decision it produces).
- Ownership path is absent — the plan must specify who owns follow-up for each key outcome.
- Handoff schema has placeholder values ("add details here") instead of specific content from the plan.
- Outcomes are abstract ("alignment") instead of observable ("written list of 3 prioritized initiatives with named owners and 2-week deadlines").
- Facilitation risks section has fewer than 3 identified risks for a workshop longer than 60 minutes.
- Discussion prompts are generic ("What do you think?") instead of forcing specificity ("What is the first thing you would change about [X], and who should own it?").
- No time is allocated for wrap-up and commitment capture in the last 10% of the session.

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
- "Write FigJam prompts and board instructions." (use `$figjam-workshop-prompt-creator` — board-level prompt packs, not workshop strategy and agenda)
- "Create sticky-note exercise prompts for a FigJam session." (use `$figjam-workshop-prompt-creator` — exercise prompts, not workshop planning)
- "Write frontend code."
- "Summarize this random article."

Ambiguous:
- "Help me run a workshop next month." (clarify: do you need the strategy, agenda, and exercise design — or FigJam board prompts and instructions for an already-planned workshop?)
- "I need a workshop for my team." (clarify workshop objective and desired decision/output first — plan before prompts)
