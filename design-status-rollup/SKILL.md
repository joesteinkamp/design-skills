---
name: design-status-rollup
description: "Roll up multiple project or IC updates into a concise, leadership-ready status digest organized by initiative — progress, status (on-track/at-risk/blocked), risks with mitigations, and explicit asks. Use when a design leader needs to compile a recurring weekly or monthly update from scattered notes — not for building a full narrative deck ($stakeholder-presentation-writer), defining the metrics themselves ($design-success-metrics-writer), or setting goals ($design-okr-writer)."

# Discovery & Auto-Selection
category: documentation
tags: [status-report, leadership, rollup, exec-update, risks, initiatives]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-success-metrics-writer]
downstream_skills: [stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: updates
    required: true
    type: text
    description: "Raw updates or notes per project or person to be rolled up"
  - name: audience
    required: false
    type: text
    description: "Who reads this digest: exec leadership, cross-functional partners, or the design team"
  - name: prior_rollup
    required: false
    type: text
    description: "Last period's digest, used to compute deltas (what changed since)"

# Output Contract
outputs:
  - name: status_digest
    type: status_digest
    template: references/status-digest-template.md
  - name: status_digest_handoff
    type: status_digest_handoff
    optional: true
    schema: references/status-digest-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: updates
  parallelizable: true

# Tool Integration
tools:
  - name: notion
    actions: [fetch_project_pages, publish_page]
    when: "Pulling project pages as source updates and publishing the finished digest"
  - name: linear
    actions: [pull_issue_status]
    when: "Reading current issue and project status to ground initiative progress"
  - name: slack
    actions: [send_message]
    when: "Posting the finished digest to a leadership or team channel"
  - name: gmail
    actions: [draft_email]
    when: "Drafting the digest as an exec update email"

# User Input Gates
user_inputs:
  - step: 1
    question: "Who's the audience — exec leadership, cross-functional partners, or the design team?"
    options: [exec, cross-functional, team]
    required: true
  - step: 1
    question: "What cadence is this — weekly or monthly?"
    options: [weekly, monthly]
    required: true
  - step: 1
    question: "Which initiatives should be included?"
    required: false
  - step: 5
    question: "Post to Slack or draft as an email?"
    required: false
    default: false
---

# Design Status Rollup

## Overview

Use this skill to roll up scattered project and IC updates into a single, leadership-ready status digest organized by initiative. Accepts raw updates or notes (pasted text, or pulled from Notion and Linear), an optional audience, and an optional prior digest, and produces a one-page rollup with per-initiative status, risks with mitigations, and explicit asks. Output is formatted for use in Notion, Slack, or an email update. When the target tool is specified, adapt the formatting accordingly.

The output should be decision-ready: every initiative carries a status label and a one-line reason, every risk names an owner and a mitigation, and every ask states who needs to do what. Altitude is matched to the audience — exec readers get outcomes and asks, the team gets more detail.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Fetch project pages as source updates, then publish the finished digest as a Notion page with the initiative table and risk log | User pastes updates manually; output as markdown for manual paste |
| **Linear** | Pull current issue and project status to ground initiative progress in real data rather than self-reported notes | User states status from memory; skill uses provided notes only |
| **Slack** | Post the finished digest to a leadership or team channel with a short summary line | Output post-ready text; user posts manually |
| **Gmail** | Draft the digest as an exec update email with subject, TL;DR, and asks | Output email draft text; user sends manually |

## Workflow

### Step 1: Gather and group updates by initiative
- **Reads:** updates, audience (if provided), prior_rollup (if provided)
- **Ask user:** "Who's the audience — exec leadership, cross-functional partners, or the design team?" — options: exec, cross-functional, team. Required: sets the altitude of the entire digest.
- **Ask user:** "What cadence is this — weekly or monthly?" — options: weekly, monthly. Required: frames the period header and delta window.
- **Ask user:** "Which initiatives should be included?" — optional; lets the user scope the rollup or merge minor items.
- **Actions:**
  - Group raw updates under the initiatives they belong to, merging duplicate or overlapping notes.
  - Drop raw task-level chatter that doesn't change an initiative's standing.
  - Note the owner or contributor behind each update for traceability.
- **Tool action — Notion (if available):** Fetch linked project pages and pull recent updates as source material.
- **Tool action — Linear (if available):** Pull current issue and project status to corroborate self-reported progress.
- **If** updates are sparse for an initiative → flag it as "no update this period" rather than inventing progress.
- **Produces:** Populated `Digest Header` and grouped update set

### Step 2: Assign status and a one-line why per initiative
- **Reads:** Step 1 grouped updates
- **Actions:**
  - Assign each initiative a status label: on-track, at-risk, or blocked.
  - Write a single-line reason for the label (what's driving it), not a paragraph.
  - Summarize progress this period in one line and the next concrete step in one line.
- **Checkpoint:** "Here's the status call per initiative with a one-line reason each. Do these labels match how you'd report them up?"
- **Produces:** Populated `Initiatives` section

### Step 3: Surface risks and explicit asks
- **Reads:** Step 1 grouped updates, Step 2 status calls
- **Actions:**
  - For each at-risk or blocked initiative, name the risk, its owner, and a mitigation or next step.
  - Write explicit asks: who needs to do what, by when, for the digest to unblock.
  - Capture wins worth flagging up — shipped work, validated bets, resolved blockers.
- **If** an initiative is at-risk or blocked with no owner or mitigation → do not finalize; press for the owner and the next step.
- **Produces:** Populated `Risks & Blockers`, `Asks / Decisions Needed`, and `Wins` sections

### Step 4: Compute deltas vs prior period
- **Reads:** prior_rollup (if provided), Step 2 status calls, Step 3 risks
- **Actions:**
  - Compare each initiative's status to last period and note what changed (improved, slipped, newly blocked, resolved).
  - Call out new risks, closed risks, and asks that are still outstanding from last period.
  - List initiatives that are net-new this period and any that have wrapped.
- **If** no prior_rollup provided → state that this is the baseline period and skip the delta section.
- **Produces:** Populated `Changes Since Last Period` section

### Step 5: Format to audience altitude and post
- **Reads:** All previous step outputs
- **Ask user:** "Post to Slack or draft as an email?" — Default: output as a structured digest only.
- **Actions:**
  - Use `references/status-digest-template.md` for the response structure.
  - Match altitude to audience: exec gets TL;DR, status table, and asks; cross-functional adds dependencies; team gets fuller progress detail.
  - Keep the digest to roughly one page — no raw task dumps.
  - Include `references/status-digest-handoff-schema.md` when output feeds downstream skills.
- **Tool action — Notion (if available):** Publish the digest as a Notion page with the initiative table and risk log.
- **If** Notion unavailable → output as markdown for manual paste.
- **Tool action — Slack (if available and user confirms):** Post the digest to the chosen channel with a one-line summary.
- **Tool action — Gmail (if available and user confirms):** Draft an exec update email with subject, TL;DR, and asks.
- **If** Slack and Gmail unavailable → output post-ready and email-ready text for manual sending.
- **Next steps:** Based on output, suggest:
  - "To turn this digest into a full narrative deck for a leadership review, use `$stakeholder-presentation-writer`."
  - "If an at-risk initiative needs measurable targets to recover, use `$design-success-metrics-writer`."
- **Produces:** Complete status digest with all required sections
- **References:** `references/status-digest-template.md`, `references/status-digest-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Digest Header | yes | - | key-value fields: period, cadence, audience, prepared by |
| TL;DR | yes | 3 lines | 3-4 line summary of the period's standing, biggest risk, and top ask |
| Initiatives | yes | 1 initiative | table: initiative / status (on-track/at-risk/blocked) / progress this period / next step |
| Risks & Blockers | yes | - | table: risk / owner / mitigation or next step |
| Asks / Decisions Needed | yes | 1 ask | explicit asks stating who needs to do what, by when |
| Wins | no | - | bullet list of shipped work, validated bets, or resolved blockers |
| Changes Since Last Period | no | - | deltas vs prior digest: status changes, new/closed risks, outstanding asks (only when prior_rollup provided) |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Initiatives | Every initiative has a status label (on-track / at-risk / blocked) | blocker |
| QB-02 | Initiatives | Every initiative's status carries a one-line reason explaining the call | blocker |
| QB-03 | Risks & Blockers | Every risk names an owner and a mitigation or next step | blocker |
| QB-04 | Asks / Decisions Needed | Every ask is explicit and actionable — states who needs to do what (e.g., "VP Eng to confirm Q3 headcount by Friday"), not "need support" | blocker |
| QB-05 | Changes Since Last Period | When a prior_rollup is provided, the digest shows deltas (what changed since last period) | blocker |
| QB-06 | Digest Header | Altitude matches the stated audience — exec gets outcomes and asks, team gets more detail | warning |
| QB-07 | Initiatives | The digest fits on roughly one page and avoids raw task dumps | warning |

## Reference Navigation

Read only what is needed:
- digest output shell: `references/status-digest-template.md`
- downstream handoff contract: `references/status-digest-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [roll_up_status, compile_team_update, summarize_initiatives, surface_risks_and_asks, prepare_exec_digest]

- "Roll these five project updates into an exec status digest."
- "Compile the design team's weekly update for leadership."
- "Summarize where each initiative stands with risks and asks."

### Negative
- "Build a full narrative deck for the leadership review." -> `$stakeholder-presentation-writer`
- "Define the success metrics for this initiative." -> `$design-success-metrics-writer`
- "Set the team's goals for next quarter." -> `$design-okr-writer`

### Ambiguous
- "Help me put together an update." -> Clarify: do you have raw updates to roll up into a digest, or do you need a full presentation?
