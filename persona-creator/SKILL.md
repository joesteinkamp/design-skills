---
name: persona-creator
description: "Build evidence-based personas from research data, behavioral observations, or stakeholder input. Use when requests involve persona creation, user archetypes, behavioral segmentation, or preparing user profiles for downstream skills like $journey-mapper or $design-spec-writer."

# Discovery & Auto-Selection
category: planning
tags: [personas, archetypes, behavioral-segmentation, user-profiles, evidence-based]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [research-synthesizer]
downstream_skills: [journey-mapper, design-spec-writer, design-spectrums-creator, design-success-metrics-writer, usability-test-planner, inspiration-browser]

# Input Contract
inputs:
  - name: user_data
    required: true
    type: text
    description: "Research synthesis, raw interview data, behavioral observations, or stakeholder descriptions"
  - name: research_synthesis
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Structured research synthesis with insights and behavioral patterns"

# Output Contract
outputs:
  - name: personas
    type: persona_cards
    template: references/persona-card-template.md
  - name: persona_handoff
    type: persona_handoff
    optional: true
    schema: references/persona-handoff-schema.md

# Batch Execution
batch:
  enabled: false
  notes: "Personas are created as a set, not individually batched"

# Tool Integration
tools:
  - name: figma
    actions: [create_figjam_board, use_figma]
    when: "Creating persona cards in FigJam or laying out persona visuals"
  - name: notion
    actions: [publish_database, tag_evidence]
    when: "Publishing persona database with evidence tagging"
  - name: productboard
    actions: [link_segments]
    when: "Linking personas to customer segments in Productboard"

# User Input Gates
user_inputs:
  - step: 1
    question: "What type of evidence are you working with?"
    options: [transcripts, survey, stakeholder_assumptions, mixed]
    required: true
  - step: 2
    question: "Identified [N] behavioral segments. Does this grouping feel right?"
    required: true
  - step: 4
    question: "Any user groups to explicitly exclude (anti-personas)?"
    required: false
---

# Persona Creator

## Overview

Use this skill to build personas grounded in evidence rather than assumptions. Accepts research synthesis (from `$research-synthesizer`), raw interview data, behavioral observations, or stakeholder descriptions and produces structured persona cards.

Output is formatted for use in Figma, FigJam, Notion, or Miro. When the target tool is specified, adapt the persona card structure accordingly.

Personas should be behavioral, not demographic -- group users by goals, frustrations, and decision patterns, not age or job title alone.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Create persona cards in FigJam with structured layouts; use_figma for visual persona card layouts | Output persona cards as structured markdown; user creates visuals manually |
| **Notion** | Publish persona database with evidence quality tagging per attribute; link to research sources | Output as markdown tables; user pastes into Notion |
| **Productboard** | Link personas to customer segments for product planning alignment | Include segment mapping table in output; user links manually |

## Workflow

### Step 1: Gather inputs
- **Reads:** user_data, research_synthesis (if provided)
- **Ask user:** "What type of evidence are you working with?" — options: transcripts, survey data, stakeholder assumptions, or mixed. This determines evidence quality tagging.
- **Actions:**
  - Accept research handoff from `$research-synthesizer` or raw descriptions.
  - Classify evidence quality: research-backed, partially-evidenced, or assumed.
  - Note participant count and segment coverage.
  - If inputs are thin, state assumptions explicitly.
- **If** research_synthesis provided from `$research-synthesizer` → extract behavioral patterns and insights directly from evidence.
- **If** stakeholder assumptions only → flag all attributes as "assumed," apply heavier assumptions log.
- **If** <5 data points per segment → flag low confidence, recommend `$research-plan-writer` to gather more evidence.
- **Produces:** Classified input data with evidence quality tags

### Step 2: Identify behavioral dimensions
- **Reads:** Step 1 classified inputs
- **Ask user:** "Identified [N] behavioral segments. Does this grouping feel right?" — present the proposed segments before committing to persona structure.
- **Actions:**
  - Extract goals, frustrations, behaviors, tools, context, and decision triggers.
  - Group by behavioral differences, not demographics.
  - Look for patterns that create meaningfully different design needs.
- **Produces:** Behavioral dimension clusters

### Step 3: Build persona profiles
- **Reads:** Step 2 behavioral dimensions
- **Actions:**
  - Name each persona with a memorable, descriptive label.
  - Fill in role, scenario, goals, frustrations, behaviors, mental models.
  - Write a day-in-the-life scenario (3-5 sentences).
  - Tag evidence quality per attribute.
- **Checkpoint:** "Here are the [N] persona profiles with evidence tags. Do these capture the key behavioral differences, or should I adjust any persona?"
- **Produces:** Populated `Persona Cards` section

### Step 4: Validate and refine
- **Reads:** Step 3 persona profiles
- **Ask user:** "Any user groups to explicitly exclude (anti-personas)?" — helps clarify scope boundaries.
- **Actions:**
  - Flag which attributes are evidence-backed vs. assumed.
  - Rank personas by design relevance (primary, secondary, edge-case).
  - Include anti-personas when they clarify scope boundaries.
  - Log all assumptions with confidence and validation needs.
- **If** stakeholder-only input → flag entire output as "assumed — validate with user research before committing design decisions."
- **Produces:** Populated `Persona Summary Table`, `Anti-Personas` (if applicable), and `Assumptions Log` sections

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/persona-card-template.md` for the response structure.
  - Include `references/persona-handoff-schema.md` when output feeds downstream skills.
- **Tool action — Figma (if available):**
  - Create persona cards in FigJam with structured layout zones for each persona.
  - Use use_figma for polished persona card layouts if high-fidelity output is requested.
- **Tool action — Notion (if available):**
  - Publish persona database with evidence quality tags per attribute.
  - Create linked views by persona and by evidence quality.
- **Tool action — Productboard (if available):**
  - Link each persona to corresponding customer segments.
  - Map persona goals to product features.
- **If** no tools available → output as structured markdown with all sections.
- **Next steps:** Based on output, suggest:
  - "Map the experience for a persona using `$journey-mapper`."
  - "Use these personas in a design spec with `$design-spec-writer`."
  - "Explore design tensions for these user types with `$design-spectrums-creator`."
  - "Define success metrics per persona with `$design-success-metrics-writer`."
- **Produces:** Complete persona set with all required sections
- **References:** `references/persona-card-template.md`, `references/persona-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Persona Summary Table | yes | 1 persona | table with name, role, primary goal, design relevance rank |
| Persona Cards | yes | 1 card | persona cards with role, scenario, goals, frustrations, behaviors, mental models, day-in-the-life scenario, evidence quality tags |
| Anti-Personas | no | - | anti-persona cards clarifying scope boundaries |
| Assumptions Log | yes | 1 entry | assumption entries with confidence level and validation needs |
| Downstream Handoff | no | - | handoff schema block per `references/persona-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Persona Cards | Personas are grouped by behavioral patterns (goals, frustrations, decision triggers), not by demographics (age, job title) | blocker |
| QB-02 | Persona Cards | Every persona card has a primary goal, at least one frustration, and at least two behavioral dimensions | blocker |
| QB-03 | Persona Cards | Evidence quality is tagged per attribute as research-backed, partially-evidenced, or assumed | blocker |
| QB-04 | Persona Cards | Day-in-the-life scenario references a specific task the user performs with the product | warning |
| QB-05 | Persona Cards | Day-in-the-life scenario is 3-5 sentences | warning |
| QB-06 | Assumptions Log | Assumptions log is present and has at least one entry per assumed attribute | blocker |
| QB-07 | Anti-Personas | Anti-personas are included when the product has clear "not for this user" boundaries | warning |
| QB-08 | Persona Summary Table | Persona names are memorable and descriptive, not generic labels ("Power User", "New User") | warning |

## Reference Navigation

Read only what is needed:
- persona output shell: `references/persona-card-template.md`
- downstream handoff contract: `references/persona-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [create_personas, build_archetypes, segment_users, profile_behaviors, define_user_types]

- "Create personas from these user interview findings."
- "Build user archetypes for our e-commerce checkout redesign."
- "Turn this research synthesis into persona cards."

### Negative
- "Map the user journey for onboarding." -> `$journey-mapper`
- "Write a design spec for the settings page." -> `$design-spec-writer`
- "Audit this screen for accessibility." -> `$accessibility-auditor`

### Ambiguous
- "Help me understand our users better." (clarify whether personas, research synthesis, or journey mapping is needed)
