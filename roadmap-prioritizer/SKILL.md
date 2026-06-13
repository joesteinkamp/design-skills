---
name: roadmap-prioritizer
description: "Prioritize a backlog of design initiatives or features using a transparent framework (RICE, Impact/Effort, or WSJF) and produce a sequenced, defensible roadmap with per-item scoring rationale that respects dependencies and capacity. Use when requests involve prioritizing a backlog, sequencing initiatives, or deciding what to build next — not exploring design trade-offs, not setting goals, not defining success metrics."

# Discovery & Auto-Selection
category: planning
tags: [prioritization, roadmap, rice, impact-effort, sequencing, planning]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [research-synthesizer, design-success-metrics-writer, journey-mapper]
downstream_skills: [design-spec-writer, design-okr-writer]

# Input Contract
inputs:
  - name: initiatives
    required: true
    type: text
    description: "The candidate list of features or initiatives to prioritize"
  - name: constraints
    required: false
    type: text
    description: "Team capacity, deadlines, must-dos, or other constraints"
  - name: inputs_evidence
    required: false
    type: text
    description: "Research findings, metrics, or journey pain points to inform impact scoring"

# Output Contract
outputs:
  - name: prioritized_roadmap
    type: prioritized_roadmap
    template: references/roadmap-template.md
  - name: roadmap_handoff
    required: false
    schema: references/roadmap-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: initiatives
  parallelizable: false

# Tool Integration
tools:
  - name: productboard
    actions: [pull_features, pull_insights]
    when: "Pulling candidate features and customer evidence to seed the backlog"
  - name: linear
    actions: [pull_issues, update_priority]
    when: "Reading the backlog and writing prioritized order back to issues"
  - name: google_sheets
    actions: [build_scoring_model]
    when: "Building the scoring sheet so the team can audit and adjust scores"
  - name: notion
    actions: [publish_roadmap]
    when: "Publishing the sequenced roadmap with rationale to Notion"

# User Input Gates
user_inputs:
  - step: 1
    question: "Which prioritization framework — RICE, Impact/Effort, or WSJF?"
    options: [RICE, impact-effort, WSJF]
    required: true
    default: RICE
  - step: 1
    question: "What's the team capacity and time horizon?"
    required: true
  - step: 1
    question: "Any must-do or fixed-date constraints?"
    required: false
  - step: 5
    question: "Write priorities back to Linear/Productboard?"
    required: false
    default: false
---

# Roadmap Prioritizer

## Overview

Use this skill to turn a messy backlog of design initiatives into a sequenced, defensible roadmap. Accepts a candidate list of features or initiatives, optional constraints (capacity, deadlines, must-dos), and optional evidence from upstream skills like `$research-synthesizer`, `$design-success-metrics-writer`, or `$journey-mapper`, and produces a scored backlog plus a now / next / later roadmap.

The output should be transparent and auditable: a named framework with a defined scoring scale, every initiative scored on each component with a brief justification, a sequence that respects dependencies and fits within stated capacity, and an explicit list of what was deprioritized and the trade-off of not doing it. Output is formatted for use in Productboard, Linear, or a Notion roadmap page. When the target tool is specified, adapt the scoring model and sequencing format accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Productboard** | Pull candidate features via pull_features and customer evidence via pull_insights to seed the backlog and inform impact scores | Ask the user to paste the feature list and any customer evidence as text |
| **Linear** | Read the backlog via pull_issues and write the prioritized order back via update_priority once the sequence is confirmed | Output the prioritized order as markdown; user updates issues manually |
| **Google Sheets** | Build a scoring sheet via build_scoring_model so the team can audit and adjust scores and re-rank | Output the scored backlog as a markdown table; user creates the sheet manually |
| **Notion** | Publish the sequenced roadmap with rationale and trade-offs via publish_roadmap | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Establish framework, capacity, and constraints
- **Reads:** initiatives, constraints (if provided), inputs_evidence (if provided)
- **Ask user:** "Which prioritization framework — RICE, Impact/Effort, or WSJF?" — Default: RICE. The framework determines which components every initiative is scored on.
- **Ask user:** "What's the team capacity and time horizon?" — needed to set the cut line and group work into horizons.
- **Ask user:** "Any must-do or fixed-date constraints?" — capture commitments, deadlines, and dependencies that override scoring.
- **Actions:**
  - Confirm the chosen framework and define its scoring scale (e.g., RICE = reach, impact, confidence, effort) in the `Scoring Model` section of `references/roadmap-template.md`.
  - Capture team capacity, the planning horizon, and any must-do or fixed-date constraints.
  - Note which constraints override scoring (regulatory, contractual, dependency-blocking).
- **If** no framework specified → default to RICE and state the assumption.
- **If** no capacity provided → flag that the cut line is unknown and sequence by score only, recommending the user confirm capacity before committing.
- **Produces:** Populated `Prioritization Context` and `Scoring Model` sections
- **References:** `references/roadmap-template.md`

### Step 2: Gather and normalize the initiative list
- **Reads:** Step 1 context, initiatives, inputs_evidence (if provided)
- **Actions:**
  - Normalize the candidate list so each item is a discrete, comparable initiative (split bundles, merge duplicates).
  - Attach available evidence (research, metrics, journey pain points) to the initiatives it informs.
  - Identify dependencies between initiatives (X must ship before Y).
- **Tool action — Productboard (if available):**
  - Pull candidate features via pull_features and customer evidence via pull_insights to seed the list and inform impact scores.
- **If** Productboard unavailable → ask the user to paste the feature list and any customer evidence as text.
- **If** evidence is thin or absent for an initiative → mark it for low confidence scoring in Step 3.
- **Produces:** Normalized initiative list feeding the `Scored Backlog` section

### Step 3: Score each initiative
- **Reads:** Step 1 scoring model, Step 2 normalized list
- **Actions:**
  - Score every initiative on each component of the chosen framework using the defined scale.
  - Write a brief justification for each score — what evidence or reasoning produced the number, not just the number.
  - Flag confidence and assumptions where evidence is thin.
  - Compute the composite score per the framework's formula.
- **Tool action — Google Sheets (if available):**
  - Build a scoring sheet via build_scoring_model with one row per initiative, one column per component, the composite formula, and a notes column for justifications.
- **If** Google Sheets unavailable → output the scored backlog as a markdown table.
- **Checkpoint:** "Here are the scores and justifications for all [N] initiatives. Do any scores look wrong or rest on shaky evidence?"
- **Produces:** Populated `Scored Backlog` section
- **References:** `references/roadmap-template.md`

### Step 4: Sequence into the roadmap
- **Reads:** Step 3 scored backlog, Step 1 capacity and constraints
- **Actions:**
  - Rank initiatives by composite score, then adjust for dependencies (a blocker must precede what it blocks even if lower-scored).
  - Apply must-do and fixed-date constraints, overriding pure score order where required.
  - Group work into time horizons (now / next / later) that fit within stated capacity.
  - Draw the cut line: what fits in capacity vs. what does not.
- **If** capacity is unknown → present the full ranked sequence and note the cut line cannot be drawn until capacity is confirmed.
- **If** a dependency forces a low-scored item early → call out the dependency-driven exception explicitly.
- **Produces:** Populated `Sequenced Roadmap` section

### Step 5: Note trade-offs and format output
- **Reads:** All previous step outputs
- **Ask user:** "Write priorities back to Linear/Productboard?" — Default: output as markdown only.
- **Actions:**
  - List every deprioritized or cut item with the trade-off of not doing it (what value is forgone, what risk is carried).
  - Capture assumptions and risks that the sequence depends on.
  - Use `references/roadmap-template.md` for the response structure.
- **Tool action — Linear (if available and user confirms):**
  - Write the prioritized order back via update_priority on the backlog issues.
- **Tool action — Notion (if available):**
  - Publish the sequenced roadmap with rationale and trade-offs via publish_roadmap.
- **If** no tools available → output the complete roadmap as structured markdown.
- **Next steps:** Based on output, suggest:
  - "To spec the top-ranked initiative, use `$design-spec-writer`."
  - "To turn the horizon goals into measurable objectives, use `$design-okr-writer`."
  - "If impact scores rest on thin evidence, gather more with `$research-synthesizer`."
- **Produces:** Complete output with all required sections and optional `Roadmap Handoff`
- **References:** `references/roadmap-template.md`, `references/roadmap-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Prioritization Context | yes | - | key-value fields: framework, capacity, horizon, constraints |
| Scoring Model | yes | - | definition of each framework component and its scoring scale |
| Scored Backlog | yes | 1 initiative | table: initiative / framework components / composite score / justification |
| Sequenced Roadmap | yes | 3 horizons | now / next / later groupings with dependencies and the cut line noted |
| Deprioritized & Trade-offs | yes | 0 | each cut item with the trade-off of not doing it |
| Assumptions & Risks | yes | 1 | assumptions and risks the sequence depends on, with confidence flags |
| Roadmap Handoff | no | - | structured output for feeding other skills |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Scoring Model | The chosen framework is named and its scoring scale is defined before any item is scored | blocker |
| QB-02 | Scored Backlog | Every initiative is scored on each component of the chosen framework (e.g., RICE = reach, impact, confidence, effort) | blocker |
| QB-03 | Scored Backlog | Every score has a brief justification, not just a number | blocker |
| QB-04 | Sequenced Roadmap | The sequence respects all stated dependencies — no item precedes its blocker | blocker |
| QB-05 | Sequenced Roadmap | The sequence fits within stated capacity, or notes explicitly that capacity is unknown | blocker |
| QB-06 | Sequenced Roadmap | Work is grouped into time horizons (e.g., now / next / later) | blocker |
| QB-07 | Deprioritized & Trade-offs | Deprioritized or cut items are listed with the trade-off of not doing them | blocker |
| QB-08 | Assumptions & Risks | Confidence and assumptions are flagged wherever the evidence behind a score is thin | warning |

## Reference Navigation

Read only what is needed:
- roadmap output shell with framework scoring scales (RICE, Impact/Effort, WSJF): `references/roadmap-template.md`
- downstream handoff schema: `references/roadmap-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [prioritize_backlog, sequence_initiatives, build_roadmap, score_features, decide_what_next]

- "Prioritize this backlog with RICE and give me a roadmap."
- "Sequence these design initiatives by impact and effort."
- "What should we work on next quarter given our capacity?"

### Negative
- "Explore the design trade-offs and tensions for this feature." -> `$design-spectrums-creator`
- "Set our team goals for the quarter." -> `$design-okr-writer`
- "Define the success metrics for this feature." -> `$design-success-metrics-writer`
- "Write the spec for the chosen item." -> `$design-spec-writer`

### Ambiguous
- "What should we prioritize?" (clarify whether they want a scored roadmap from a backlog, or trade-off mapping via `$design-spectrums-creator`)
- "Help us plan the quarter." (clarify whether they want a prioritized roadmap or quarterly objectives via `$design-okr-writer`)
