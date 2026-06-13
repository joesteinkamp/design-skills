---
name: critique-notes-summarizer
description: "Turn messy raw notes or a transcript from a design critique, design review, or working session into a clean structured recap — decisions made, action items with owners and due dates, open questions, and parked ideas. Use when requests involve summarizing a session, writing up who-agreed-to-what, or extracting action items from notes — not running the critique itself ($design-critique), not documenting one decision's rationale in depth ($design-rationale-writer), not synthesizing user research ($research-synthesizer)."

# Discovery & Auto-Selection
category: documentation
tags: [meeting-notes, critique, action-items, decisions, recap, synthesis]
complexity: light
output_length: medium

# Skill Graph
upstream_skills: [design-critique]
downstream_skills: [design-spec-writer, design-rationale-writer]

# Input Contract
inputs:
  - name: raw_notes
    required: true
    type: text
    description: "Transcript, bullet notes, or a chat/thread captured from the critique or review session"
  - name: session_context
    required: false
    type: text
    description: "What was being reviewed, who attended, and the goals of the session"
  - name: critique
    required: false
    type: design_critique
    source_skill: design-critique
    description: "Structured critique output to fold into the recap"

# Output Contract
outputs:
  - name: critique_recap
    type: critique_recap
    template: references/critique-recap-template.md
  - name: critique_recap_handoff
    type: critique_recap_handoff
    optional: true
    schema: references/critique-recap-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: raw_notes
  parallelizable: true

# Tool Integration
tools:
  - name: gong
    actions: [pull_transcript]
    when: "Auto-pulling the recording transcript when notes were not captured manually"
  - name: linear
    actions: [create_issue]
    when: "Creating action items as tickets with owners and due dates"
  - name: slack
    actions: [send_message]
    when: "Posting the recap to the relevant channel for the team"
  - name: notion
    actions: [publish_page]
    when: "Publishing the recap as a shared page of record"

# User Input Gates
user_inputs:
  - step: 1
    question: "Who attended, and who are the decision-makers?"
    required: true
  - step: 1
    question: "Were any decisions already locked vs still open?"
    required: false
  - step: 5
    question: "Create the action items in Linear and post the recap to Slack?"
    required: false
    default: false
---

# Critique Notes Summarizer

## Overview

Use this skill to turn messy raw notes or a transcript from a design critique, design review, or working session into a clean, structured recap. Accepts a transcript, bullet notes, or a pasted chat thread and produces a one-page write-up: decisions made, action items with owners and due dates, open questions, and parked ideas. It automates the "who agreed to what" summary that nobody wants to write afterward.

The output should be faithful to the source: nothing is invented. Items not supported by the notes are omitted or explicitly flagged as inferred. Output is formatted for use in Notion, Slack, or Linear. When the target tool is specified, adapt the recap structure accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Gong** | Auto-pull the recording transcript for the session as input when notes were not captured manually | User pastes or uploads the transcript or notes manually |
| **Linear** | Create action items as tickets with owner, due date, priority, and a link back to the recap | Output action items as a list ready to paste; user creates tickets manually |
| **Slack** | Post the recap to the relevant channel so attendees can confirm and follow up | Output recap as shareable text; user posts manually |
| **Notion** | Publish the recap as a shared page of record with decisions, actions, and open questions | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Intake notes and context
- **Reads:** raw_notes, session_context (if provided), critique (if provided)
- **Ask user:** "Who attended, and who are the decision-makers?" — needed to attribute decisions and assign action owners.
- **Ask user:** "Were any decisions already locked vs still open?" — separates settled calls from live discussion.
- **Actions:**
  - Identify what was reviewed (screen, flow, feature, spec) and the session type (critique, design review, working session).
  - Note attendees, decision-makers, and the date.
  - If notes are sparse or a recording exists, pull the transcript instead of guessing.
  - If context is incomplete, state assumptions explicitly rather than inventing details.
- **If** raw_notes is a thin or partial transcript and a Gong recording exists → auto-pull the full transcript.
- **Tool action — Gong (if available and notes are incomplete):** Pull the recording transcript for the session as the source of record.
- **If** a `$design-critique` output is provided → fold its findings and priority actions into the action items and decisions rather than re-deriving them.
- **Produces:** Populated `Session Context` section

### Step 2: Separate the signal
- **Reads:** Step 1 output, raw_notes
- **Actions:**
  - Sort every substantive point into one of four buckets: decision, action item, open question, or parked idea.
  - Decisions: things the group settled on. Keep these distinct from discussion and from open questions.
  - Action items: concrete things someone agreed to do.
  - Open questions: unresolved items that need an answer or a follow-up.
  - Parked ideas: out-of-scope or "later" thoughts worth not losing.
  - Discard small talk, tangents, and duplicate restatements.
  - Flag anything ambiguous as inferred rather than asserting it as fact.
- **Checkpoint:** "Here's how I sorted the notes into decisions, actions, open questions, and parked ideas. Does this split look right before I assign owners?"
- **Produces:** Populated `Decisions`, `Open Questions`, and `Parked Ideas` sections (draft)

### Step 3: Assign owners, dates, and attribution
- **Reads:** Step 2 buckets
- **Actions:**
  - For each action item, assign an owner and a due date. If neither is in the notes, flag it "owner TBD" or "due TBD" rather than guessing.
  - Set a priority for each action (high / medium / low).
  - Attribute each decision to the person or group who made the call.
  - For each open question, name who needs to resolve it.
- **Produces:** Populated `Action Items` table and attributed `Decisions`

### Step 4: Draft a tight recap
- **Reads:** Step 3 output
- **Actions:**
  - Write a 2-3 sentence TL;DR covering what was reviewed and the headline outcome.
  - Tighten each section so the whole recap fits on roughly one page.
  - Remove redundancy; keep wording crisp and scannable.
- **Produces:** Populated `TL;DR` and a complete recap draft

### Step 5: Format and optionally ticket/post
- **Reads:** All previous step outputs
- **Ask user:** "Create the action items in Linear and post the recap to Slack?" — Default: no.
- **Actions:**
  - Use `references/critique-recap-template.md` for the response structure.
  - Include `references/critique-recap-handoff-schema.md` when output feeds downstream skills.
  - Ensure every section is complete before returning.
- **Tool action — Linear (if available and user confirms):** Create action items as tickets with owner, due date, priority, and a link back to the recap.
- **If** Linear unavailable → output action items as a paste-ready list for manual ticket creation.
- **Tool action — Slack (if available and user confirms):** Post the recap to the relevant channel for attendee confirmation.
- **If** Slack unavailable → output recap as shareable text.
- **Tool action — Notion (if available):** Publish the recap as a shared page of record.
- **If** Notion unavailable → output as markdown.
- **Next steps:** Based on output, suggest:
  - "To turn agreed changes into a buildable spec, use `$design-spec-writer`."
  - "To document the reasoning behind a key decision in depth, use `$design-rationale-writer`."
- **Produces:** Complete recap with all required sections
- **References:** `references/critique-recap-template.md`, `references/critique-recap-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Session Context | yes | - | key-value fields: what was reviewed, session type, attendees, decision-makers, date |
| TL;DR | yes | - | 2-3 sentence overview of what was reviewed and the headline outcome |
| Decisions | yes | 1 decision | each decision with the decider/group it is attributed to |
| Action Items | yes | 1 action | table: action / owner / due / priority |
| Open Questions | yes | 0 questions | each open question with who needs to resolve it |
| Parked Ideas | no | - | out-of-scope or later ideas worth retaining |
| Downstream Handoff | no | - | handoff schema block per `references/critique-recap-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Action Items | Every action item has an owner and a due date, or is explicitly flagged "owner TBD" / "due TBD" | blocker |
| QB-02 | Decisions | Decisions are clearly separated from discussion and from open questions | blocker |
| QB-03 | Decisions | Each decision is attributed to the person or group who made the call | blocker |
| QB-04 | Open Questions | Each open question names who needs to resolve it | blocker |
| QB-05 | Session Context | The recap fits on roughly one page — no section sprawls into a transcript dump | warning |
| QB-06 | TL;DR | Nothing is invented — items not supported by the notes are omitted or flagged as inferred | blocker |
| QB-07 | Action Items | Each action item is phrased as a concrete deliverable, not a vague "look into" line | warning |

## Reference Navigation

Read only what is needed:
- recap output shell: `references/critique-recap-template.md`
- downstream handoff contract: `references/critique-recap-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [summarize_notes, recap_session, extract_action_items, capture_decisions, write_up_meeting]

- "Summarize these critique notes into decisions and action items."
- "Turn this design review transcript into a recap with owners."
- "What did we decide and who owns what from this session?"

### Negative
- "Run a critique on this checkout flow." -> `$design-critique`
- "Facilitate a design review session for us." -> `$design-critique`
- "Document the rationale behind our navigation decision in depth." -> `$design-rationale-writer`
- "Synthesize these user interviews into themes." -> `$research-synthesizer`

### Ambiguous
- "Help me write this up." -> Clarify: are these notes from a critique/review session to recap, or research data to synthesize?
- "Summarize this meeting." -> Clarify: do you want a structured recap with decisions and action items, or a narrative summary?
