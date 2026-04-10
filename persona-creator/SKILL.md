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
---

# Persona Creator

## Overview

Use this skill to build personas grounded in evidence rather than assumptions. Accepts research synthesis (from `$research-synthesizer`), raw interview data, behavioral observations, or stakeholder descriptions and produces structured persona cards.

Output is formatted for use in Figma, FigJam, Notion, or Miro. When the target tool is specified, adapt the persona card structure accordingly.

Personas should be behavioral, not demographic -- group users by goals, frustrations, and decision patterns, not age or job title alone.

## Workflow

### Step 1: Gather inputs
- **Reads:** user_data, research_synthesis (if provided)
- **Actions:**
  - Accept research handoff from `$research-synthesizer` or raw descriptions.
  - Classify evidence quality: research-backed, partially-evidenced, or assumed.
  - Note participant count and segment coverage.
  - If inputs are thin, state assumptions explicitly.
- **Produces:** Classified input data with evidence quality tags

### Step 2: Identify behavioral dimensions
- **Reads:** Step 1 classified inputs
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
- **Produces:** Populated `Persona Cards` section

### Step 4: Validate and refine
- **Reads:** Step 3 persona profiles
- **Actions:**
  - Flag which attributes are evidence-backed vs. assumed.
  - Rank personas by design relevance (primary, secondary, edge-case).
  - Include anti-personas when they clarify scope boundaries.
  - Log all assumptions with confidence and validation needs.
- **Produces:** Populated `Persona Summary Table`, `Anti-Personas` (if applicable), and `Assumptions Log` sections

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/persona-card-template.md` for the response structure.
  - Include `references/persona-handoff-schema.md` when output feeds downstream skills.
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
| QB-01 | Persona Cards | Personas are grouped by demographics (age, job title) rather than behavioral patterns (goals, frustrations, decision triggers) | blocker |
| QB-02 | Persona Cards | Any persona card is missing a primary goal, at least one frustration, or at least two behavioral dimensions | blocker |
| QB-03 | Persona Cards | Evidence quality is not tagged per attribute as research-backed, partially-evidenced, or assumed | blocker |
| QB-04 | Persona Cards | Day-in-the-life scenario does not reference a specific task the user performs with the product | warning |
| QB-05 | Persona Cards | Day-in-the-life scenario is fewer than 3 sentences or more than 5 sentences | warning |
| QB-06 | Assumptions Log | Assumptions log is missing or has fewer entries than the number of assumed attributes | blocker |
| QB-07 | Anti-Personas | Anti-personas are absent when the product has clear "not for this user" boundaries | warning |
| QB-08 | Persona Summary Table | Persona names are generic labels ("Power User", "New User") rather than memorable, descriptive names | warning |

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
