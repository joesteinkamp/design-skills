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

# Tool Integration
tools:
  - name: figma
    actions: [generate_diagram, get_figjam]
    when: "Creating FigJam board with zones and prompts, or extending an existing board"
  - name: slack
    actions: [send_message]
    when: "Sharing board link before workshop"

# User Input Gates
user_inputs:
  - step: 1
    question: "AI-native or traditional facilitation?"
    options: [ai_native, traditional]
    required: true
    default: ai_native
  - step: 2
    question: "Any specific exercises to include?"
    required: false
  - step: 3
    question: "Create the FigJam board now?"
    required: false
    default: false
---

# FigJam Workshop Prompt Creator

## Overview

Use this skill to generate reusable prompt packs that another AI model or facilitator can use to:
- build a FigJam workshop board,
- run the live session,
- synthesize outcomes into owners and next steps.

Default to the AI-Native workshop baseline in `references/ai-native-workshop-instructions.md` when the user asks for AI-Native content or references previous AI-Native workshop work.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Create the actual FigJam board with zones, prompts, sticky-note areas, and voting sections using generate_diagram; extend an existing board using get_figjam | Output prompt pack as copy-ready text that user pastes into FigJam manually |
| **Slack** | Share board link with participants before the workshop with pre-read instructions | Include "share board link" in facilitator prep checklist |

## Workflow

### Step 1: Collect session inputs
- **Reads:** workshop_details, workshop_plan (if provided)
- **Ask user:** "AI-native or traditional facilitation?" — determines the exercise pattern and board structure.
- **Actions:**
  - Capture audience, duration, team size, workshop goal, and desired output artifacts.
  - Capture workshop constraints (remote vs in-person, tool stack, leadership attendance, time limits).
  - If details are missing, make pragmatic assumptions and label them clearly.
- **If** workshop_plan provided from `$workshop-planner` → consume the agenda, exercises, and FigJam handoff block directly; skip pattern selection in Step 2.
- **Produces:** Populated `Workshop Profile` and `Assumptions` sections

### Step 2: Select the workshop pattern
- **Reads:** Step 1 output
- **Ask user:** "Any specific exercises to include?" — allows the user to inject custom exercises into the pattern.
- **Actions:**
  - Use the AI-Native baseline from `references/ai-native-workshop-instructions.md` when requested or implied.
  - Otherwise adapt the same structure (context -> reaction -> solutions/signals -> commitments).
  - Keep the sequence problem-first and action-oriented.
- **If** AI-native selected → use the 3-exercise React/Riff/Solutions pattern from `references/ai-native-workshop-instructions.md`.
- **If** traditional selected → adapt the structure but maintain context -> reaction -> solutions -> commitments flow.
- **If** workshop_plan handoff → use the exercises defined in the handoff; adapt to FigJam board zones.
- **Produces:** Selected pattern for prompt generation
- **References:** `references/ai-native-workshop-instructions.md`

### Step 3: Generate a three-part prompt pack
- **Reads:** Step 1 inputs, Step 2 pattern
- **Ask user:** "Create the FigJam board now?" — Default: output as text prompts.
- **Actions:**
  - Prompt A: FigJam board construction prompt.
  - Prompt B: Facilitation/run-of-show prompt.
  - Prompt C: Post-session synthesis prompt.
  - Use `references/prompt-pack-template.md` as the output shape.
- **Tool action — Figma (if available and user confirms):**
  - Create the actual FigJam board using generate_diagram with zones for each exercise, sticky-note areas, voting sections, and commitment capture areas.
  - If extending an existing board, use get_figjam to read current board state first, then add new zones.
- **Tool action — Slack (if available):**
  - Share the board link with participants before the workshop.
  - Include pre-read instructions and workshop goal in the message.
- **If** FigJam MCP unavailable → output all three prompts as copy-ready text that the user pastes into FigJam or uses as a facilitation script.
- **Checkpoint:** "Here is the 3-part prompt pack. Does the exercise flow match your workshop goals?"
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
- **Next steps:** Based on output, suggest:
  - "If you need to plan the workshop strategy first, use `$workshop-planner`."
  - "After the workshop, synthesize findings with `$research-synthesizer`."
  - "Turn workshop outcomes into a design spec with `$design-spec-writer`."
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
| Assumptions | yes | 0 | labeled assumptions with rationale |
| Prompt A - FigJam Board Builder | yes | 1 prompt | copy-ready prompt with board structure, sections, and sticky-note areas |
| Prompt B - Facilitator Script | yes | 1 prompt | copy-ready prompt with agenda, time boxes, participant instructions |
| Prompt C - Synthesis + Action Plan | yes | 1 prompt | copy-ready prompt with synthesis framework, owners, and next steps |

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
