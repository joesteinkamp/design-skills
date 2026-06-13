---
name: design-okr-writer
description: "Draft design-team OKRs (or goals) that connect design work to measurable outcomes — an inspirational objective with 2-4 measurable key results and supporting initiatives that ladder up to company goals. Use when a design leader is setting quarterly, half, or annual team direction. Not for defining a single feature's success metrics (use design-success-metrics-writer), prioritizing a roadmap (use roadmap-prioritizer), or assessing team maturity (use design-maturity-assessment)."

# Discovery & Auto-Selection
category: planning
tags: [okrs, goals, planning, outcomes, key-results, design-leadership]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-success-metrics-writer]
downstream_skills: [roadmap-prioritizer, design-status-rollup]

# Input Contract
inputs:
  - name: team_context
    required: true
    type: text
    description: "The team, time horizon, and current priorities the OKRs cover"
  - name: company_goals
    required: false
    type: text
    description: "Company or product objectives to ladder these OKRs up to"
  - name: metrics
    required: false
    type: metrics_framework
    source_skill: design-success-metrics-writer
    description: "Success metrics framework with baselines and targets to source key results from"

# Output Contract
outputs:
  - name: okr_set
    type: okr_set
    template: references/okr-template.md
  - name: okr_handoff
    type: okr_handoff
    optional: true
    target_skill: roadmap-prioritizer
    schema: references/okr-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: team_context
  parallelizable: true

# Tool Integration
tools:
  - name: notion
    actions: [publish_page]
    when: "Publishing the OKR doc as a Notion page for the team"
  - name: linear
    actions: [link_initiatives]
    when: "Linking key results and initiatives to Linear projects"
  - name: google_sheets
    actions: [create_tracker]
    when: "Setting up a key-result tracking sheet with baselines and targets"

# User Input Gates
user_inputs:
  - step: 1
    question: "What time horizon — quarter, half, or year?"
    options: [quarter, half, year]
    required: true
  - step: 1
    question: "What's the team scope (whole design org, a squad, a craft)?"
    required: true
  - step: 1
    question: "Which company or product objectives should these ladder up to?"
    required: false
---

# Design OKR Writer

## Overview

Use this skill to draft OKRs (or goals) for a design team — an inspirational objective paired with 2-4 measurable key results and the supporting initiatives that move them. It is built for design leaders setting team direction across a quarter, half, or year, not for defining a single feature's success metrics.

The output should connect design work to outcomes the business cares about. Objectives stay qualitative and motivating; key results stay measurable with a baseline and a target; initiatives stay distinct from key results so the team never confuses shipping work with achieving an outcome. Every objective ladders up to a stated company or product goal, or that missing link is flagged explicitly.

Accepts a metrics framework (from `$design-success-metrics-writer`) to source key results with real baselines and targets, or plain team context. Output is formatted for use in Notion, Linear, or Google Sheets, or as a structured markdown OKR doc. When a target tool is specified, adapt the format for that tool's page, project, or sheet layout.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Publish the OKR doc as a Notion page with objectives, key results, and tracking plan | Output as markdown; user pastes into Notion |
| **Linear** | Link key results and supporting initiatives to Linear projects so progress rolls up automatically | Output initiative-to-project mapping as markdown; user links manually |
| **Google Sheets** | Create a key-result tracking sheet with baseline, target, current value, and confidence columns | Output KR table as markdown; user creates spreadsheet manually |

## Workflow

### Step 1: Establish horizon, scope, and parent goals
- **Reads:** team_context, company_goals (if provided), metrics (if provided)
- **Ask user:** "What time horizon — quarter, half, or year?" — options: quarter, half, year. Sets the ambition window and cadence.
- **Ask user:** "What's the team scope (whole design org, a squad, a craft)?" — determines how many objectives are realistic.
- **Ask user:** "Which company or product objectives should these ladder up to?" — optional; if absent, the laddering link will be flagged as missing.
- **Actions:**
  - Capture the team, the time horizon, and current priorities.
  - Capture the company or product objectives these OKRs serve.
  - Accept a metrics framework from `$design-success-metrics-writer` if available and mine it for candidate key results.
- **If** no company or product goals provided → proceed but flag every objective's laddering link as "missing — confirm before finalizing."
- **Produces:** Populated `OKR Context` section

### Step 2: Draft the objectives
- **Reads:** Step 1 context
- **Actions:**
  - Draft 1-3 objectives that are qualitative, inspirational, and time-bound to the horizon.
  - Keep objectives free of numbers — they describe the destination, not the measurement.
  - State, per objective, which company or product goal it ladders up to.
  - Prefer fewer, sharper objectives over a long list.
- **If** scope is a single squad or craft → cap at 1-2 objectives to keep focus.
- **Produces:** Populated `Objectives & Key Results` section (objective headers)

### Step 3: Define measurable key results
- **Reads:** Step 2 objectives, metrics (if provided)
- **Actions:**
  - For each objective, write 2-4 key results.
  - Each key result names an outcome — what changes for users or the business — not an output or a shipped artifact.
  - Each key result states a baseline AND a target with direction (e.g., "from 42% to 60%").
  - Source baselines and targets from the metrics framework where available; otherwise flag them as estimated.
  - Rewrite any "ship X" or "launch Y" phrasing as the outcome that work is meant to produce.
- **If** metrics framework provided → reuse its primary metrics and baselines as key results and cite the source.
- **If** no baseline available for a key result → flag it estimated and recommend instrumenting before committing.
- **Checkpoint:** "Here are [N] objectives with [N] key results each. Do these measure the right outcomes?"
- **Produces:** Completed key results within `Objectives & Key Results`
- **References:** `references/okr-template.md`

### Step 4: Attach supporting initiatives and check outcome-vs-output
- **Reads:** Step 3 key results
- **Actions:**
  - List the supporting initiatives (the work) under each objective, kept distinct from the key results (the outcomes).
  - Verify each key result still reads as an outcome, not a relabeled initiative.
  - Note dependencies on other teams and risks to each objective.
- **Tool action — Linear (if available):**
  - Link key results and supporting initiatives to Linear projects so progress rolls up.
- **If** Linear unavailable → output the initiative-to-project mapping as markdown for manual linking.
- **Produces:** Populated `Supporting Initiatives` and `Dependencies & Risks` sections

### Step 5: Set ambition level and format output
- **Reads:** All previous step outputs
- **Actions:**
  - Note an ambition level per objective: committed (expected to fully hit) or aspirational (stretch, ~70% is success).
  - Build the tracking plan: cadence, owner, and confidence-check rhythm.
  - Use `references/okr-template.md` for the response structure.
  - Include `references/okr-handoff-schema.md` when output feeds `$roadmap-prioritizer` or `$design-status-rollup`.
- **Tool action — Notion (if available):**
  - Publish the OKR doc as a Notion page with objectives, key results, and tracking plan.
- **Tool action — Google Sheets (if available):**
  - Create a key-result tracker with columns: objective, key result, baseline, target, current value, confidence, owner.
- **If** no tools available → output as structured markdown with all sections.
- **Next steps:** Based on output, suggest:
  - "Prioritize the initiatives behind these OKRs with `$roadmap-prioritizer`."
  - "Set up the recurring progress update with `$design-status-rollup`."
  - "If key-result baselines are unknown, define them first with `$design-success-metrics-writer`."
- **Produces:** Complete OKR set with all required sections and optional `Downstream Handoff`
- **References:** `references/okr-template.md`, `references/okr-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| OKR Context | yes | - | key-value fields: horizon, team scope, parent company/product goals, source metrics |
| Objectives & Key Results | yes | 1 objective | per objective: objective statement, parent goal, 2-4 key results each with baseline + target, ambition level |
| Supporting Initiatives | yes | 1 initiative | initiatives listed per objective, distinct from key results |
| Dependencies & Risks | yes | - | cross-team dependencies and risks to each objective |
| Tracking Plan | yes | - | cadence, owner, confidence-check rhythm |
| Downstream Handoff | no | - | handoff schema block per `references/okr-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Objectives & Key Results | Objectives are qualitative and inspirational, containing no metrics or numbers — the measurement lives in the key results | blocker |
| QB-02 | Objectives & Key Results | Every key result is measurable and states both a baseline AND a target | blocker |
| QB-03 | Objectives & Key Results | Key results describe outcomes (what changes for users or the business), not outputs or task completion like "ship X" or "launch Y" | blocker |
| QB-04 | Objectives & Key Results | Each objective has between 2 and 4 key results | blocker |
| QB-05 | Objectives & Key Results | Each objective ladders up to a stated company or product goal, or that missing link is explicitly flagged | blocker |
| QB-06 | Supporting Initiatives | Initiatives are listed as supporting work, distinct from the key results | blocker |
| QB-07 | Objectives & Key Results | An ambition level (committed vs aspirational) is noted per objective | warning |
| QB-08 | Objectives & Key Results | Key-result targets are evidence-based, not unjustified round numbers; estimated baselines are flagged | warning |
| QB-09 | Tracking Plan | A measurement cadence and owner are specified for the key results | warning |

## Reference Navigation

Read only what is needed:
- OKR output shell: `references/okr-template.md`
- downstream handoff contract: `references/okr-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [draft_okrs, write_design_goals, define_key_results, set_team_direction, ladder_to_company_goals]

- "Draft Q3 OKRs for the design team."
- "Turn these priorities into objectives and key results."
- "Help me write design goals that ladder up to the company's retention objective."

### Negative
- "Define success metrics for the new onboarding flow." -> `$design-success-metrics-writer`
- "Prioritize the roadmap for next quarter." -> `$roadmap-prioritizer`
- "Assess how mature our design team is." -> `$design-maturity-assessment`

### Ambiguous
- "What should the design team focus on?" (clarify whether they want OKRs/goals or roadmap prioritization)
- "Set goals for the team." (clarify the time horizon and team scope before drafting)
