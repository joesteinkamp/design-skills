---
name: journey-mapper
description: "Map end-to-end user experiences across touchpoints, identifying pain points, emotions, and design opportunities. Use when requests involve journey mapping, experience mapping, service blueprinting, or identifying pain points and opportunities across a user flow."

# Discovery & Auto-Selection
category: documentation
tags: [journey-map, experience-map, pain-points, emotional-arc, touchpoints]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [persona-creator, research-synthesizer]
downstream_skills: [design-spec-writer, design-spectrums-creator, design-success-metrics-writer, ab-test-planner, usability-test-planner, user-flow-mapper, inspiration-browser, research-plan-writer]

# Input Contract
inputs:
  - name: scenario_description
    required: true
    type: text
    description: "Scenario, use case, or experience to map"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards with goals and frustrations"
  - name: research_insights
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Research synthesis with behavioral patterns and pain points"

# Output Contract
outputs:
  - name: journey_map
    type: journey_map
    template: references/journey-map-template.md
  - name: journey_handoff
    type: journey_handoff
    optional: true
    schema: references/journey-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: scenario_description
  parallelizable: true
---

# Journey Mapper

## Overview

Use this skill to map complete user experiences across touchpoints, channels, and time. Accepts personas (from `$persona-creator`), research insights (from `$research-synthesizer`), or scenario descriptions and produces structured journey maps with emotional arcs and opportunity identification.

The output should reveal where the experience breaks down and where design effort will have the most impact. Output is formatted for use in FigJam, Miro, or as structured markdown in Notion. When the target tool is specified, adapt the map layout and notation accordingly.

## Workflow

### Step 1: Define scope
- **Reads:** scenario_description, personas (if provided), research_insights (if provided)
- **Actions:**
  - Identify persona, scenario, and journey type (current-state, future-state, or service-blueprint).
  - Set clear start and end points.
  - Determine channels and touchpoints to cover.
  - If persona input comes from `$persona-creator`, use the handoff schema directly.
- **Produces:** Populated `Journey Overview` section

### Step 2: Map phases using the 5-layer emotional arc method
- **Reads:** Step 1 scope
- **Actions:**
  - Break the journey into 4-7 sequential phases.
  - Each phase needs a goal, touchpoints, channels, and duration.
  - Keep phases at a consistent level of granularity.
  - Apply the canonical 5 layers per phase: Actions (what the user does) -> Thoughts (what the user thinks) -> Emotions (valence + intensity) -> Pain Points (severity-rated) -> Moments of Delight.
  - Plot the emotional arc across all phases to reveal the experience shape (where it rises, where it crashes).
- **Produces:** Populated `Phase Map` and `Emotional Arc` sections

### Step 3: Identify opportunities
- **Reads:** Step 2 phase map, emotional arc
- **Actions:**
  - Map each pain point to a design opportunity.
  - Classify opportunities as quick-win, strategic, or systemic.
  - Rate impact and effort for prioritization.
  - Synthesize the emotional arc across all phases.
- **Produces:** Populated `Opportunity Map` and `Key Insights` sections

### Step 4: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/journey-map-template.md` for the response structure.
  - Include `references/journey-handoff-schema.md` when output feeds downstream skills.
- **Produces:** Complete journey map with all required sections
- **References:** `references/journey-map-template.md`, `references/journey-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Journey Overview | yes | - | key-value fields: persona, scenario, journey type, start trigger, end condition, channels |
| Phase Map | yes | 4 phases | phase cards with goal, touchpoints, channels, duration, and 5 layers (actions, thoughts, emotions, pain points, moments of delight) |
| Emotional Arc | yes | - | valence + intensity plot across all phases showing experience shape |
| Opportunity Map | yes | 1 opportunity | opportunity cards mapped 1:1 to pain points with classification (quick-win, strategic, systemic) and impact/effort ratings |
| Key Insights | yes | 1 insight | synthesized insights from the emotional arc and opportunity analysis |
| Downstream Handoff | no | - | handoff schema block per `references/journey-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Phase Map | Any phase is missing one or more of the 5 layers (actions, thoughts, emotions, pain points, moments of delight) | blocker |
| QB-02 | Phase Map | Pain points do not have severity ratings (critical / major / minor) | blocker |
| QB-03 | Emotional Arc | Emotional valence is flat across all phases -- if the arc never dips or rises, the journey is under-analyzed | warning |
| QB-04 | Phase Map | Fewer than 4 phases are mapped for a multi-touchpoint journey | blocker |
| QB-05 | Opportunity Map | Opportunities do not map 1:1 to specific pain points (every pain point should have a corresponding opportunity) | blocker |
| QB-06 | Opportunity Map | Opportunity classification is missing (quick-win / strategic / systemic) or impact/effort ratings are absent | warning |
| QB-07 | Journey Overview | Journey has no clear start trigger ("user arrives at...") and end condition ("user has successfully...") | blocker |
| QB-08 | Phase Map | Phases are at inconsistent granularity -- e.g., one phase covers 5 minutes and another covers 3 weeks | warning |

## Reference Navigation

Read only what is needed:
- journey output shell: `references/journey-map-template.md`
- downstream handoff contract: `references/journey-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [map_journey, visualize_experience, identify_pain_points, plot_emotional_arc, find_opportunities]

- "Map the end-to-end onboarding journey for new users."
- "Create a current-state journey map for the checkout experience."
- "Identify pain points across the customer support flow."

### Negative
- "Map the user flow for the signup page." -> `$user-flow-mapper`
- "Document all paths through the checkout." -> `$user-flow-mapper`
- "Write a design spec for the settings page." -> `$design-spec-writer`
- "Evaluate this design against heuristics." -> `$heuristic-evaluator`

### Ambiguous
- "Help me understand where users struggle." (clarify: do you want a journey map across touchpoints, research synthesis from data, or a heuristic evaluation of screens?)
- "Help me map out this feature." (clarify: do you want a high-level journey across touchpoints and emotions, or a granular screen-level task flow?)
