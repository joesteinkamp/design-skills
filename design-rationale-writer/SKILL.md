---
name: design-rationale-writer
description: "Document a design decision ADR-style -- context and forces, options considered, trade-offs, the decision, and consequences -- to create durable institutional memory and reduce re-litigation. Use when requests involve writing up design rationale, capturing trade-offs behind a decision, or recording a decision as an ADR. Routes to $design-spectrums-creator to explore tensions before deciding, $critique-notes-summarizer to recap a meeting, $design-spec-writer for a full feature spec, and $stakeholder-presentation-writer to present to stakeholders."

# Discovery & Auto-Selection
category: documentation
tags: [decision-record, design-rationale, adr, trade-offs, documentation, institutional-memory]
complexity: light
output_length: medium

# Skill Graph
upstream_skills: [design-spectrums-creator, design-critique, critique-notes-summarizer]
downstream_skills: [stakeholder-presentation-writer, design-spec-writer]

# Input Contract
inputs:
  - name: decision_context
    required: true
    type: text
    description: "The decision being made and the situation prompting it"
  - name: options_considered
    required: false
    type: text
    description: "Alternatives weighed against the chosen approach"
  - name: spectrums
    required: false
    type: design_spectrums
    source_skill: design-spectrums-creator
    description: "Mapped design tensions and trade-offs for the challenge"

# Output Contract
outputs:
  - name: design_decision_record
    type: design_decision_record
    template: references/decision-record-template.md
  - name: decision_record_handoff
    type: decision_record_handoff
    optional: true
    target_skill: stakeholder-presentation-writer
    schema: references/decision-record-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: decision_context
  parallelizable: true

# Tool Integration
tools:
  - name: notion
    actions: [publish_page]
    when: "Publishing the decision record to a team decision log"
  - name: figma
    actions: [link_frames]
    when: "Linking the explored option frames to the record"
  - name: linear
    actions: [link_issue]
    when: "Linking the record to the originating ticket"

# User Input Gates
user_inputs:
  - step: 1
    question: "What decision is being recorded, and what prompted it?"
    required: true
  - step: 1
    question: "Is this a one-way door (hard to reverse) or two-way door (easily reversible)?"
    required: true
    options: [one-way, two-way]
  - step: 1
    question: "Who are the deciders/approvers?"
    required: false
---

# Design Rationale Writer

## Overview

Use this skill to document a design decision as an Architecture-Decision-Record (ADR) adapted for design — capturing the context and forces, the options considered with their trade-offs, the decision and why it won, and the consequences that follow. The goal is durable institutional memory: a record that lets a future teammate understand not just *what* was decided but *why*, so the team can stop re-litigating settled questions.

Accepts a decision context, options considered, or mapped tensions from `$design-spectrums-creator`, and produces a structured decision record. Output is formatted for use in Notion, Confluence, a Git-tracked `/decisions` folder, or Google Docs. A good record documents the losing options as fairly as the winning one — the trade-offs that were knowingly accepted are the most valuable thing a future reader needs.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Publish the decision record to a team decision log with status and metadata | Output as markdown; user pastes into Notion or a `/decisions` folder |
| **Figma** | Link the explored option frames so each option references the work it describes | Reference frame names/URLs as text in the Options Considered table |
| **Linear** | Link the record to the originating ticket for traceability | Note the ticket reference in the record metadata |

## Workflow

### Step 1: Capture context and forces
- **Reads:** decision_context, options_considered (if provided), spectrums (if provided)
- **Ask user:** "What decision is being recorded, and what prompted it?" — anchors the record in a concrete decision, not a vague topic.
- **Ask user:** "Is this a one-way door (hard to reverse) or two-way door (easily reversible)?" — sets the rigor bar for the record.
- **Ask user:** "Who are the deciders/approvers?" — names accountability; flag TBD if unknown.
- **Actions:**
  - Identify the decision, the situation that prompted it, and the deadline or trigger.
  - Capture the forces at play: constraints, goals, user needs, technical realities, and business pressure.
  - Note the status of the decision: proposed, accepted, or superseded.
- **If** spectrums from `$design-spectrums-creator` provided → use the mapped tensions as the trade-off backbone for the options.
- **If** no options provided and the decision is still open → recommend `$design-spectrums-creator` to explore the tensions first, then return here to record the outcome.
- **Tool action — Linear (if available):**
  - Link the record to the originating ticket for traceability.
- **Produces:** Populated `Context & Forces` section

### Step 2: Enumerate options considered
- **Reads:** Step 1 context, options_considered
- **Actions:**
  - List every option that was seriously considered, including the one chosen.
  - For each option, document its pros, cons, and the core trade-off it represents.
  - Steelman the losing options — describe them as a reasonable advocate would, not as strawmen.
- **If** fewer than 2 options surface → probe for the implicit alternatives (including "do nothing"); a decision with only one option is not a decision.
- **Tool action — Figma (if available):**
  - Link the explored option frames so each row references the work it describes.
- **Produces:** Populated `Options Considered` section
- **References:** `references/decision-record-template.md`

### Step 3: State the decision and rationale
- **Reads:** Step 2 options
- **Actions:**
  - State the decision unambiguously in a single sentence.
  - Explain why this option won over the others, tying the rationale to evidence: research, spectrums, critique findings, or named constraints.
  - Name what was knowingly traded away by choosing it.
- **Checkpoint:** "Here is the decision and rationale: [one-liner] because [evidence-backed reason]. Does this match what was decided?"
- **Produces:** Populated `Decision & Rationale` section

### Step 4: Spell out consequences and reversibility
- **Reads:** Step 3 decision
- **Actions:**
  - List positive consequences (what this unlocks) and negative consequences (what it costs or constrains).
  - Capture follow-ups: actions, risks to monitor, and dependencies created.
  - Classify reversibility (one-way / two-way door) and state the implications — what it would take to undo, and what to watch for.
- **If** one-way door → flag that the negative consequences deserve extra scrutiny and a named owner to monitor them.
- **Produces:** Populated `Consequences` and `Reversibility` sections

### Step 5: Format, publish, and link
- **Reads:** All previous step outputs
- **Actions:**
  - Assemble sections using the output template.
  - Confirm deciders/approvers are named or flagged TBD.
  - Log open questions that remain after the decision.
  - Include `references/decision-record-handoff-schema.md` block when output feeds `$stakeholder-presentation-writer` or `$design-spec-writer`.
- **Tool action — Notion (if available):**
  - Publish the decision record to the team decision log with status and metadata.
- **If** no tools available → output as structured markdown for a `/decisions` folder or wiki.
- **Next steps:** Based on output, suggest:
  - "Use `$stakeholder-presentation-writer` to present this decision and its rationale to stakeholders."
  - "Use `$design-spec-writer` to turn the accepted decision into a build-ready feature spec."
  - "If the trade-offs still feel unresolved, revisit them with `$design-spectrums-creator`."
- **Produces:** Complete record with all required sections and optional `Decision Record Handoff`
- **References:** `references/decision-record-template.md`, `references/decision-record-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Decision Summary | yes | - | one-liner decision statement + status (proposed / accepted / superseded) |
| Context & Forces | yes | - | key-value fields: prompting situation, constraints, goals, deadline/trigger |
| Options Considered | yes | 2 options | table: option / pros / cons / trade-off |
| Decision & Rationale | yes | - | one-sentence decision + evidence-backed reasoning |
| Consequences | yes | - | positive / negative / follow-ups lists, each with >= 1 item for positive and negative |
| Reversibility | yes | - | one-way / two-way door classification + implications |
| Deciders | yes | 1 | named deciders/approvers or explicit TBD |
| Open Questions | no | 0 | question cards with context and owner |
| Decision Record Handoff | no | - | handoff schema block per `references/decision-record-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Options Considered | At least 2 options are documented, each with explicit trade-offs — not just the chosen one | blocker |
| QB-02 | Decision & Rationale | The decision is stated unambiguously in a single sentence | blocker |
| QB-03 | Consequences | Both positive AND negative consequences are listed | blocker |
| QB-04 | Reversibility | Reversibility is classified (one-way / two-way door) with its implications spelled out | blocker |
| QB-05 | Decision & Rationale | The rationale links to evidence (research, spectrums, critique, or constraints), not asserted preference | blocker |
| QB-06 | Deciders | Deciders/approvers are named, or explicitly flagged TBD | warning |
| QB-07 | Context & Forces | The context explains the forces that shaped the decision, not just the outcome | blocker |
| QB-08 | Options Considered | Losing options are steelmanned, not strawmanned — described as a reasonable advocate would | warning |

## Reference Navigation

Read only what is needed:
- decision record output shell: `references/decision-record-template.md`
- downstream handoff contract: `references/decision-record-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_rationale, document_decision, capture_trade_offs, record_adr, preserve_decision_context]

- "Write up the rationale for why we chose tabs over a nav drawer."
- "Document this design decision as an ADR."
- "Capture the trade-offs behind the new onboarding approach."

### Negative
- "Explore the tensions before we decide on the layout." -> `$design-spectrums-creator`
- "Recap what we covered in the design review meeting." -> `$critique-notes-summarizer`
- "Write a full spec for this feature." -> `$design-spec-writer`
- "Present this decision to stakeholders." -> `$stakeholder-presentation-writer`

### Ambiguous
- "Help me document this." -> Clarify: a single decision and its rationale (ADR) or a full feature spec?
- "Write up the trade-offs." -> Clarify: explore open tensions (`$design-spectrums-creator`) or record the trade-offs behind a decision already made?
