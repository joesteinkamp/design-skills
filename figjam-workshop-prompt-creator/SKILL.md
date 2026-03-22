---
name: figjam-workshop-prompt-creator
description: "Create high-quality prompt packs for designing and facilitating FigJam workshops. Use when requests involve workshop prompt writing, run-of-show generation, FigJam board structure, sticky-note exercise prompts, discussion prompts, or post-workshop synthesis, especially for the AI-Native design-team workshop pattern."
---

# FigJam Workshop Prompt Creator

## Overview

Use this skill to generate reusable prompt packs that another AI model or facilitator can use to:
- build a FigJam workshop board,
- run the live session,
- synthesize outcomes into owners and next steps.

Default to the AI-Native workshop baseline in `references/ai-native-workshop-instructions.md` when the user asks for AI-Native content or references previous AI-Native workshop work.

## Workflow

1. Collect session inputs.
- Capture audience, duration, team size, workshop goal, and desired output artifacts.
- Capture workshop constraints (remote vs in-person, tool stack, leadership attendance, time limits).
- If details are missing, make pragmatic assumptions and label them clearly.

2. Select the workshop pattern.
- Use the AI-Native baseline from `references/ai-native-workshop-instructions.md` when requested or implied.
- Otherwise adapt the same structure (context -> reaction -> solutions/signals -> commitments).
- Keep the sequence problem-first and action-oriented.

3. Generate a three-part prompt pack.
- Prompt A: FigJam board construction prompt.
- Prompt B: Facilitation/run-of-show prompt.
- Prompt C: Post-session synthesis prompt.
- Use `references/prompt-pack-template.md` as the output shape.

4. Enforce concrete outcomes.
- Require named owners, immediate next steps, and future next steps.
- Require success signals that are observable behaviors, not vanity metrics.
- Require time-boxes for each exercise segment.

5. Return clean copy-ready text.
- Keep prompts copy/paste-ready.
- Keep language direct and facilitator-friendly.
- Remove internal planning notes from final prompt output.

## Prompt Pack Contract

Always return these sections in this order:
- `Workshop Profile`
- `Assumptions`
- `Prompt A - FigJam Board Builder`
- `Prompt B - Facilitator Script`
- `Prompt C - Synthesis + Action Plan`

Each prompt must include:
- workshop objective,
- agenda and exact time boxes,
- participant instructions,
- expected output format,
- quality bar.

## AI-Native Baseline Rules

When creating AI-Native workshop prompts:
- Use the canonical sequence from `references/ai-native-workshop-instructions.md`.
- Preserve the core exercises:
- `Exercise 1: React, Riff & Add`
- `Exercise 2: Solutions & Success Signals` (or `Requirements & Solutions` variant)
- `Exercise 3: Open Discussion - Now What?`
- Preserve the core discussion prompts around ownership, immediate actions, and 90-day success signals.
- Preserve the final capture areas:
- `Commitments & Owners`
- `Immediate Next Steps`
- `Future Next Steps`

## Quality Bar

Reject weak prompts and revise before finalizing if any of these are true:
- The prompt is generic and not tied to workshop goals.
- The prompt lacks time boxes or facilitation flow.
- The prompt asks for abstract outcomes without owners and next actions.
- The prompt asks for success metrics but not observable behaviors.
- The prompt does not define output format.

## Reference Navigation

Read only what is needed:
- AI-Native source content and agenda: `references/ai-native-workshop-instructions.md`
- reusable output shell for prompts: `references/prompt-pack-template.md`

## Trigger Examples

Positive:
- "Write a FigJam prompt for an AI-Native design workshop."
- "Create a facilitation prompt pack for a 90-minute team workshop in FigJam."
- "Turn this workshop goal into board instructions and discussion prompts."

Negative:
- "Plan a workshop agenda with exercises and timing." (use `$workshop-planner` — workshop strategy and agenda design, not board-level prompts)
- "Help me scope a workshop and decide on exercises." (use `$workshop-planner` — planning comes before prompt generation)
- "Design a dashboard UI."
- "Summarize this meeting note."

Ambiguous:
- "Help me run a team session next week." (clarify: do you need FigJam board prompts for an already-planned workshop, or do you need to plan the workshop first?)
- "I need a workshop." (use `$workshop-planner` first for strategy and agenda, then this skill for FigJam prompts)
