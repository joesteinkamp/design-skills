---
name: figjam-workshop-prompt-creator
description: "Create high-quality prompt packs for designing and facilitating FigJam workshops. Use when requests involve workshop prompt writing, run-of-show generation, FigJam board structure, sticky-note exercise prompts, discussion prompts, or post-workshop synthesis, especially for the AI-Native design-team workshop pattern."

# Discovery & Auto-Selection
category: facilitation
tags: [figjam, workshop-prompts, facilitation, board-design, synthesis]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [workshop-planner]
downstream_skills: []

# Input Contract
inputs:
  - name: workshop_details
    required: true
    type: text
    description: "Workshop audience, duration, team size, goal, and constraints"
  - name: workshop_plan
    required: false
    type: workshop_plan
    source_skill: workshop-planner
    description: "Complete workshop plan with agenda, exercises, and FigJam handoff block"

# Output Contract
outputs:
  - name: prompt_pack
    type: figjam_prompts
    template: references/prompt-pack-template.md

# Batch Execution
batch:
  enabled: true
  input_key: workshop_details
  parallelizable: true
---

# FigJam Workshop Prompt Creator

## Overview

Use this skill to generate reusable prompt packs that another AI model or facilitator can use to:
- build a FigJam workshop board,
- run the live session,
- synthesize outcomes into owners and next steps.

Default to the AI-Native workshop baseline in `references/ai-native-workshop-instructions.md` when the user asks for AI-Native content or references previous AI-Native workshop work.

## Workflow

### Step 1: Collect session inputs
- **Reads:** workshop_details, workshop_plan (if provided)
- **Actions:**
  - Capture audience, duration, team size, workshop goal, and desired output artifacts.
  - Capture workshop constraints (remote vs in-person, tool stack, leadership attendance, time limits).
  - If details are missing, make pragmatic assumptions and label them clearly.
- **Produces:** Populated `Workshop Profile` and `Assumptions` sections

### Step 2: Select the workshop pattern
- **Reads:** Step 1 output
- **Actions:**
  - Use the AI-Native baseline from `references/ai-native-workshop-instructions.md` when requested or implied.
  - Otherwise adapt the same structure (context -> reaction -> solutions/signals -> commitments).
  - Keep the sequence problem-first and action-oriented.
- **Produces:** Selected pattern and exercise sequence
- **References:** `references/ai-native-workshop-instructions.md`

### Step 3: Generate a three-part prompt pack
- **Reads:** Step 1 inputs, Step 2 pattern
- **Actions:**
  - Prompt A: FigJam board construction prompt.
  - Prompt B: Facilitation/run-of-show prompt.
  - Prompt C: Post-session synthesis prompt.
  - Use `references/prompt-pack-template.md` as the output shape.
- **Produces:** Populated `Prompt A`, `Prompt B`, and `Prompt C` sections
- **References:** `references/prompt-pack-template.md`

### Step 4: Enforce concrete outcomes
- **Reads:** Step 3 prompt pack
- **Actions:**
  - Require named owners, immediate next steps, and future next steps.
  - Require success signals that are observable behaviors, not vanity metrics.
  - Require time-boxes for each exercise segment.
- **Produces:** Validated prompt pack with concrete outcomes

### Step 5: Return clean copy-ready text
- **Reads:** All previous step outputs
- **Actions:**
  - Keep prompts copy/paste-ready.
  - Keep language direct and facilitator-friendly.
  - Remove internal planning notes from final prompt output.
- **Produces:** Complete prompt pack with all required sections

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

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Workshop Profile | yes | - | key-value fields: audience, duration, team size, goal, constraints |
| Assumptions | yes | 0 | labeled assumption list with pragmatic defaults |
| Prompt A - FigJam Board Builder | yes | 1 prompt | copy-ready prompt with board structure, sections, and sticky-note zones |
| Prompt B - Facilitator Script | yes | 1 prompt | copy-ready prompt with agenda, time boxes, participant instructions |
| Prompt C - Synthesis + Action Plan | yes | 1 prompt | copy-ready prompt with synthesis steps, owners, and next steps format |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | All Prompts | The prompt is generic and not tied to workshop goals | blocker |
| QB-02 | Prompt B | The prompt lacks time boxes or facilitation flow | blocker |
| QB-03 | Prompt C | The prompt asks for abstract outcomes without owners and next actions | blocker |
| QB-04 | Prompt C | The prompt asks for success metrics but not observable behaviors | warning |
| QB-05 | All Prompts | The prompt does not define output format | blocker |

## Reference Navigation

Read only what is needed:
- AI-Native source content and agenda: `references/ai-native-workshop-instructions.md`
- reusable output shell for prompts: `references/prompt-pack-template.md`

## Trigger Examples

### Positive
Intents: [create_figjam_prompts, design_workshop_board, write_facilitation_script, generate_synthesis_prompts]

- "Write a FigJam prompt for an AI-Native design workshop."
- "Create a facilitation prompt pack for a 90-minute team workshop in FigJam."
- "Turn this workshop goal into board instructions and discussion prompts."

### Negative
- "Plan a workshop agenda with exercises and timing." -> `$workshop-planner`
- "Help me scope a workshop and decide on exercises." -> `$workshop-planner`
- "Design a dashboard UI." -> `$design-spec-writer`
- "Summarize this meeting note." -> `$research-synthesizer`

### Ambiguous
- "Help me run a team session next week." (clarify: do you need FigJam board prompts for an already-planned workshop, or do you need to plan the workshop first?)
- "I need a workshop." (use `$workshop-planner` first for strategy and agenda, then this skill for FigJam prompts)
