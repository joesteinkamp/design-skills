---
name: workshop-planner
description: "Plan high-impact workshops from objective through facilitation design and produce structured handoff briefs for downstream board/prompt generation. Use when requests involve workshop scoping, agenda design, exercise sequencing, facilitation planning, or preparing inputs for $figjam-workshop-prompt-creator."

# Discovery & Auto-Selection
category: planning
tags: [workshops, agenda, exercises, facilitation, time-boxing]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: []
downstream_skills: [figjam-workshop-prompt-creator]

# Input Contract
inputs:
  - name: workshop_brief
    required: true
    type: text
    description: "Workshop topic, audience, duration, team size, decision scope, and constraints"

# Output Contract
outputs:
  - name: workshop_plan
    type: workshop_plan
    template: references/workshop-planning-template.md
  - name: figjam_handoff
    type: figjam_handoff
    optional: true
    target_skill: figjam-workshop-prompt-creator
    schema: references/figjam-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: workshop_brief
  parallelizable: true
---

# Workshop Planner

## Overview

Use this skill to convert a vague workshop request into a concrete plan that can be executed by a facilitator and handed off to `figjam-workshop-prompt-creator`. Output is formatted for use in FigJam, Miro, or as a structured brief in Notion or Google Docs. When the target tool is specified, adapt the exercise formats and board structure accordingly.

The output should be decision-ready: objective, audience, agenda, exercises, facilitation notes, and clear expected artifacts.

## Workflow

### Step 1: Define workshop frame
- **Reads:** workshop_brief
- **Actions:**
  - Capture topic, audience, duration, team size, decision scope, and success criteria.
  - Clarify constraints: time limits, participant seniority, remote/hybrid setup, pre-reads, and dependencies.
  - If missing inputs block planning quality, state assumptions explicitly.
- **Produces:** Populated `Workshop Brief` section

### Step 2: Choose planning pattern
- **Reads:** Step 1 output
- **Actions:**
  - For alignment and operating-model sessions, prefer: context -> reactions -> solutions/signals -> commitments.
  - For decision sessions, prefer: context -> options -> tradeoffs -> decision -> owners.
  - For discovery sessions, prefer: context -> pain points -> opportunities -> prioritization -> next actions.
- **Produces:** Populated `Agenda & Run of Show` section (pattern selection)

### Step 3: Build agenda and exercise design
- **Reads:** Step 1 context, Step 2 pattern
- **Actions:**
  - Time-box every segment.
  - Define each exercise with objective, participant prompt, activity instructions, and expected outputs.
  - Include discussion prompts that force ownership and short-horizon action.
- **Produces:** Populated `Agenda & Run of Show` and `Exercise Specs` sections

### Step 4: Add facilitation risk controls
- **Reads:** Step 1 context, Step 3 agenda
- **Actions:**
  - Pre-identify likely failure modes (scope drift, dominant voices, low engagement, unresolved conflict).
  - Add explicit interventions for each failure mode.
  - Keep facilitation language practical and operational, not theoretical.
- **Produces:** Populated `Facilitation Risks & Interventions` section

### Step 5: Produce the handoff packet
- **Reads:** All previous step outputs
- **Actions:**
  - Format output using `references/workshop-planning-template.md`.
  - Include a `FigJam Creator Handoff` section using `references/figjam-handoff-schema.md`.
  - Ensure the handoff is copy/paste-ready as input for `$figjam-workshop-prompt-creator`.
- **Produces:** Complete plan with all required sections including `Expected Artifacts` and `FigJam Creator Handoff`
- **References:** `references/workshop-planning-template.md`, `references/figjam-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Workshop Brief | yes | - | key-value fields: topic, audience, duration, team size, objective, success criteria, constraints |
| Agenda & Run of Show | yes | 1 segment | time-boxed segments with pattern label, segment name, duration, and activity type |
| Exercise Specs | yes | 1 exercise | exercise cards with objective, participant prompt, activity instructions, and expected outputs |
| Facilitation Risks & Interventions | yes | 3 risks | risk-intervention pairs with failure mode, trigger signal, and facilitator action |
| Expected Artifacts | yes | 1 artifact | named artifacts with format, owner, and downstream use |
| FigJam Creator Handoff | no | - | handoff schema block per `references/figjam-handoff-schema.md` with workshop profile, agenda blocks, exercise prompts, discussion prompts, and synthesis schema |

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

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Agenda & Run of Show | Agenda time boxes sum to the stated total duration (±5 minutes for buffer) | blocker |
| QB-02 | Exercise Specs | Every exercise has an explicit expected output (what artifact or decision it produces) | blocker |
| QB-03 | Expected Artifacts | Ownership path is specified — who owns follow-up for each key outcome | blocker |
| QB-04 | FigJam Creator Handoff | Handoff schema has specific content from the plan, not placeholder values ("add details here") | blocker |
| QB-05 | Expected Artifacts | Outcomes are observable ("written list of 3 prioritized initiatives with named owners and 2-week deadlines"), not abstract ("alignment") | blocker |
| QB-06 | Facilitation Risks & Interventions | At least 3 identified risks for a workshop longer than 60 minutes | warning |
| QB-07 | Exercise Specs | Discussion prompts force specificity ("What is the first thing you would change about [X], and who should own it?"), not generic ("What do you think?") | warning |
| QB-08 | Agenda & Run of Show | Time is allocated for wrap-up and commitment capture in the last 10% of the session | warning |

## Reference Navigation

Read only what is needed:
- planner output shell: `references/workshop-planning-template.md`
- downstream input contract: `references/figjam-handoff-schema.md`
- AI-Native content baseline (only when requested): `../figjam-workshop-prompt-creator/references/ai-native-workshop-instructions.md`

## Trigger Examples

### Positive
Intents: [plan_workshop, design_agenda, create_exercises, scope_facilitation, prepare_workshop]

- "Plan a 90-minute alignment workshop for the design team."
- "Create a workshop agenda with exercises and facilitation guidance."
- "Build a workshop plan we can pass to figjam-workshop-prompt-creator."

### Negative
- "Write FigJam prompts and board instructions." -> `$figjam-workshop-prompt-creator`
- "Create sticky-note exercise prompts for a FigJam session." -> `$figjam-workshop-prompt-creator`
- "Write frontend code." -> out of scope
- "Summarize this random article." -> out of scope

### Ambiguous
- "Help me run a workshop next month." -> Clarify: do you need the strategy, agenda, and exercise design — or FigJam board prompts and instructions for an already-planned workshop?
- "I need a workshop for my team." -> Clarify: workshop objective and desired decision/output first — plan before prompts?
