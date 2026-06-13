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

# Tool Integration
tools:
  - name: figma
    actions: [generate_diagram]
    when: "Creating journey map visualization in FigJam"
  - name: notion
    actions: [publish_page, create_database]
    when: "Publishing journey map with linked personas and phase details"
  - name: productboard
    actions: [push_insights]
    when: "Pushing pain points as insights for product planning"

# User Input Gates
user_inputs:
  - step: 1
    question: "What is the journey scope?"
    options: [task_level, end_to_end, cross_channel]
    default: end_to_end
    required: true
  - step: 1
    question: "Who is the primary persona for this journey?"
    required: true
  - step: 3
    question: "I've mapped [N] phases with the emotional arc. Does the emotional arc look right?"
    required: true
  - step: 3
    question: "Push top pain points to Productboard?"
    required: false
    default: false
---

# Journey Mapper

## Overview

Use this skill to map complete user experiences across touchpoints, channels, and time. Accepts personas (from `$persona-creator`), research insights (from `$research-synthesizer`), or scenario descriptions and produces structured journey maps with emotional arcs and opportunity identification.

The output should reveal where the experience breaks down and where design effort will have the most impact. Output is formatted for use in FigJam, Miro, or as structured markdown in Notion. When the target tool is specified, adapt the map layout and notation accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma (FigJam)** | Generate a visual journey map in FigJam with phases, 5-layer emotional arc, pain points, and opportunity annotations | Output journey map as structured markdown tables; user builds visual in FigJam or Miro manually |
| **Notion** | Publish journey map as a Notion page with linked persona cards, phase detail pages, and pain point database | Output as markdown; user pastes into Notion |
| **Productboard** | Push top pain points as insights to the Productboard insight board with severity ratings and opportunity classifications | List pain points in push-ready format; user enters manually |

## Workflow

### Step 1: Define scope
- **Reads:** scenario_description, personas (if provided), research_insights (if provided)
- **Ask user:** "What is the journey scope?" — options: task-level (single task), end-to-end (full experience), cross-channel (multi-channel service). Default: end-to-end.
- **Ask user:** "Who is the primary persona for this journey?" — needed for emotional arc and touchpoint relevance.
- **Actions:**
  - Identify persona, scenario, and journey type (current-state, future-state, or service-blueprint).
  - Set clear start and end points.
  - Determine channels and touchpoints to cover.
  - If persona input comes from `$persona-creator`, use the handoff schema directly.
- **If** personas from `$persona-creator` → use directly for emotional arc, goals, and frustrations.
- **If** research from `$research-synthesizer` → ground all phases in evidence; use behavioral patterns and pain points from synthesis.
- **If** no upstream data → use workshop-style collaborative mapping; flag that phases are assumed and recommend validation.
- **Produces:** Populated `Journey Overview` section

### Step 2: Map phases using the 5-layer emotional arc method
- **Reads:** Step 1 scope
- **Actions:**
  - Break the journey into 4-7 sequential phases.
  - Each phase needs a goal, touchpoints, channels, and duration.
  - Keep phases at a consistent level of granularity.
  - Apply the canonical 5 layers per phase: Actions (what the user does) -> Thoughts (what the user thinks) -> Emotions (valence + intensity) -> Pain Points (severity-rated) -> Moments of Delight.
  - Plot the emotional arc across all phases to reveal the experience shape (where it rises, where it crashes).
- **Checkpoint:** "Here are the [N] phases with the 5-layer breakdown. Does the phase structure capture the right scope and granularity?"
- **Produces:** Populated `Phase Map` and `Emotional Arc` sections

### Step 3: Identify opportunities
- **Reads:** Step 2 phase map, emotional arc
- **Ask user:** "I've mapped [N] phases with the emotional arc. Does the emotional arc look right?" — allows the user to validate the experience shape before opportunity mapping.
- **Ask user:** "Push top pain points to Productboard?" — Default: no.
- **Actions:**
  - Map each pain point to a design opportunity.
  - Classify opportunities as quick-win, strategic, or systemic.
  - Rate impact and effort for prioritization.
  - Synthesize the emotional arc across all phases.
- **Tool action — Productboard (if available and user confirms):** Push top pain points (critical and major severity) as insights to the Productboard insight board with severity ratings, affected phases, and opportunity classifications.
- **If** Productboard unavailable → list pain points in push-ready format for manual entry.
- **Produces:** Populated `Opportunity Map` and `Key Insights` sections

### Step 4: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/journey-map-template.md` for the response structure.
  - Include `references/journey-handoff-schema.md` when output feeds downstream skills.
- **Tool action — Figma (if available):** Generate a visual journey map in FigJam with phase columns, 5-layer rows (actions, thoughts, emotions, pain points, moments of delight), emotional arc line, and opportunity annotations.
- **If** Figma unavailable → output as structured markdown tables.
- **Tool action — Notion (if available):** Publish journey map as a Notion page with linked persona cards, phase detail sub-pages, and a pain point database with severity and opportunity classification.
- **If** Notion unavailable → output as markdown.
- **Next steps:** Based on output, suggest:
  - "To design solutions for the top pain points, use `$design-spec-writer`."
  - "To explore design approaches for key opportunities, use `$inspiration-browser`."
  - "To validate this journey with users, use `$research-plan-writer` to plan a study."
  - "To measure improvement, use `$design-success-metrics-writer` to define journey-level metrics."
  - "To map the detailed user flow for a specific phase, use `$user-flow-mapper`."
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
| QB-01 | Phase Map | Every phase includes all 5 layers (actions, thoughts, emotions, pain points, moments of delight) | blocker |
| QB-02 | Phase Map | Every pain point has a severity rating (critical / major / minor) | blocker |
| QB-03 | Emotional Arc | Emotional arc varies across phases -- it dips and rises rather than staying flat (a flat arc signals an under-analyzed journey) | warning |
| QB-04 | Phase Map | At least 4 phases are mapped for a multi-touchpoint journey | blocker |
| QB-05 | Opportunity Map | Every pain point has a corresponding opportunity (opportunities map 1:1 to pain points) | blocker |
| QB-06 | Opportunity Map | Every opportunity has a classification (quick-win / strategic / systemic) and impact/effort ratings | warning |
| QB-07 | Journey Overview | Journey has a clear start trigger ("user arrives at...") and end condition ("user has successfully...") | blocker |
| QB-08 | Phase Map | Phases are at consistent granularity -- avoid one phase covering 5 minutes and another covering 3 weeks | warning |

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
