---
name: service-blueprint-mapper
description: "Map a service blueprint that connects what customers experience to the people, systems, and policies that deliver it: customer actions, frontstage and backstage actions, support processes, and physical/digital evidence across the lines of interaction, visibility, and internal interaction, with fail points, wait points, handoffs, and prioritized operational opportunities. Use when requests involve service design, service blueprints, operations behind an experience, cross-team handoffs, or why an experience breaks behind the scenes — not a customer-only experience map (use journey-mapper), not screen-level task flows (use user-flow-mapper)."

# Discovery & Auto-Selection
category: documentation
tags: [service-design, service-blueprint, operations, backstage, handoffs, fail-points]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [journey-mapper, research-synthesizer]
downstream_skills: [design-spec-writer, roadmap-prioritizer, stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: service_context
    required: true
    type: text
    description: "The service and scenario to blueprint (e.g., 'customer returns an online order in store'), plus what's known about teams, systems, and policies involved"
  - name: journey_map
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Customer journey that supplies the customer-action lane and emotional low points"
  - name: research_synthesis
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Customer and employee research (support tickets, staff interviews, ops data)"
  - name: ops_data
    required: false
    type: data
    description: "Wait times, handoff counts, error rates, SLAs, or ticket volumes per step"

# Output Contract
outputs:
  - name: service_blueprint
    type: service_blueprint
    template: references/service-blueprint-template.md

# Batch Execution
batch:
  enabled: false

# Tool Integration
tools:
  - name: figma
    actions: [generate_diagram]
    when: "Drawing the blueprint swimlanes in FigJam"
  - name: notion
    actions: [search, publish_page]
    when: "Finding process docs and runbooks; publishing the blueprint"

# User Input Gates
user_inputs:
  - step: 1
    question: "Which scenario and which customer segment should the blueprint follow?"
    required: true
  - step: 1
    question: "Current state or future state?"
    options: [current, future, both]
    default: current
  - step: 3
    question: "Mapped [N] steps across [M] teams. Any backstage actors or systems missing?"
    checkpoint: true
  - step: 5
    question: "Draw the blueprint in FigJam?"
    required: false
    default: false
---

# Service Blueprint Mapper

## Overview

Use this skill when an experience problem is really an operations problem: the screen is fine, but the refund takes nine days because three teams hand it off by email. A blueprint lines up the customer's steps with everything behind them, so fail points and delays become visible and ownable.

The output should follow one specific scenario end to end, name real actors and systems (not "the backend"), and distinguish what is evidenced from what is assumed. Opportunities should name which lane has to change.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma (FigJam)** | Draw the blueprint as swimlanes with the three lines, fail points, and wait points marked | Output lanes as a markdown table; user rebuilds on a board |
| **Notion** | Pull process docs, runbooks, and SLAs; publish the blueprint | User supplies process descriptions; output as markdown |

## Workflow

### Step 1: Set the scenario
- **Reads:** service_context, journey_map
- **Ask user:** "Which scenario and which customer segment should the blueprint follow?" — a blueprint follows one path.
- **Ask user:** "Current state or future state?" — Default: current.
- **Actions:**
  - Define start and end points, the segment, and channels involved.
  - List known actors (roles, teams, partners) and systems (CRM, OMS, payment provider).
- **Produces:** Populated `Scenario` section
- **References:** `references/blueprint-notation-guide.md`

### Step 2: Lay out customer actions and evidence
- **Reads:** Step 1, journey_map
- **Actions:**
  - List customer actions in order as the top lane; reuse journey-map steps when provided.
  - For each step, list the physical or digital evidence the customer sees (email, receipt, screen, sign, package).
- **Produces:** Customer and Evidence lanes of the `Blueprint` section

### Step 3: Map frontstage, backstage, and support
- **Reads:** Step 2, research_synthesis, ops_data
- **Actions:**
  - **Frontstage:** what employees or interfaces do in view of the customer.
  - **Backstage:** what employees do out of view (review queue, manual re-keying).
  - **Support processes:** systems, partners, and policies that enable each step.
  - Draw the line of interaction, line of visibility, and line of internal interaction.
  - Mark handoffs between teams or systems.
- **Checkpoint:** "Mapped [N] steps across [M] teams. Any backstage actors or systems missing?"
- **Produces:** Frontstage, Backstage, and Support lanes of the `Blueprint` section

### Step 4: Find breakdowns and opportunities
- **Reads:** Step 3, ops_data
- **Actions:**
  - Mark **fail points** (where things go wrong; note frequency and impact) and **wait points** (where the customer waits; note duration).
  - Count handoffs per step; flag steps with manual work or duplicated data entry.
  - Mark each annotation as evidenced (data, research) or assumed.
  - Write opportunities naming the lane that must change, the expected effect on the customer, and an owner team; score impact and effort.
- **Produces:** Populated `Fail & Wait Points` and `Opportunities` sections

### Step 5: Format and hand off
- **Reads:** All previous step outputs
- **Ask user:** "Draw the blueprint in FigJam?" — Default: no.
- **Actions:**
  - Fill `references/service-blueprint-template.md`.
- **Tool action — Figma (if available and user confirms):** draw swimlanes with lines and markers.
- **Next steps:** Based on output, suggest:
  - "To sequence the opportunities, use `$roadmap-prioritizer`."
  - "To spec a frontstage fix, use `$design-spec-writer`."
  - "To present the blueprint to operations leaders, use `$stakeholder-presentation-writer`."
- **Produces:** Complete blueprint
- **References:** `references/service-blueprint-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Scenario | yes | - | key-value fields: scenario, segment, start/end, channels, state (current/future), actors, systems |
| Blueprint | yes | 4 steps | table with columns per step and rows: Evidence, Customer Actions, Frontstage, Backstage, Support Processes; lines of interaction / visibility / internal interaction marked |
| Fail & Wait Points | yes | 2 points | per point: step, type (fail/wait), description, frequency or duration, evidenced/assumed |
| Handoffs | yes | 1 handoff | from → to, step, medium (system, email, manual), risk |
| Opportunities | yes | 3 opportunities | lane to change, change, customer effect, owner team, impact, effort |
| Evidence & Assumptions | yes | 1 item | what is backed by data or research vs. assumed |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Blueprint | Follows one scenario for one segment end to end | blocker |
| QB-02 | Blueprint | Every step has entries in Customer, Frontstage, Backstage, and Support lanes (or an explicit "none") | blocker |
| QB-03 | Blueprint | Actors and systems are named specifically (role or system name), not "the team" or "the backend" | blocker |
| QB-04 | Fail & Wait Points | Each point is labeled evidenced or assumed; wait points state a duration | blocker |
| QB-05 | Opportunities | Each opportunity names the lane that must change and an owner team | blocker |
| QB-06 | Handoffs | Handoffs between teams or systems are counted and their medium named | warning |
| QB-07 | Opportunities | At least one opportunity changes a backstage or support process, not only the frontstage | warning |

## Reference Navigation

Read only what is needed:
- lanes, lines, and markers: `references/blueprint-notation-guide.md`
- output shell: `references/service-blueprint-template.md`

## Trigger Examples

### Positive
Intents: [map_service_blueprint, find_operational_breakdowns, design_service]

- "Blueprint our refund process — customers say it takes forever."
- "Map what happens behind the scenes when a new clinic signs up."
- "We need a future-state service blueprint for same-day delivery."

### Negative
- "Map the customer's emotional journey through onboarding." -> `$journey-mapper`
- "Diagram the screens and error paths in checkout." -> `$user-flow-mapper`
- "Prioritize these ops improvements." -> `$roadmap-prioritizer`

### Ambiguous
- "Map the onboarding experience." (clarify: customer journey only, or including the teams and systems behind it?)
- "Why are support tickets spiking?" (clarify: synthesize tickets via `$research-synthesizer`, or blueprint the process that generates them?)
