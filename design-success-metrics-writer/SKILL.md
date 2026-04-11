---
name: design-success-metrics-writer
description: "Define measurable success metrics, KPIs, and outcome frameworks for design work. Use when requests involve success criteria, design metrics, KPI definition, outcome measurement, or defining how to measure whether a design achieves its goals."

# Discovery & Auto-Selection
category: documentation
tags: [metrics, KPIs, success-criteria, measurement, outcomes, instrumentation]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer, persona-creator, journey-mapper]
downstream_skills: [ab-test-planner, stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: feature_description
    required: true
    type: text
    description: "Feature or design initiative to define metrics for"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with user stories and success criteria"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards with goals and behaviors"
  - name: journey_context
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with pain points to measure against"

# Output Contract
outputs:
  - name: metrics_framework
    type: metrics_framework
    template: references/metrics-framework-template.md
  - name: metrics_handoff
    type: metrics_handoff
    optional: true
    target_skill: ab-test-planner
    schema: references/metrics-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: feature_description
  parallelizable: true

# Tool Integration
tools:
  - name: google_sheets
    actions: [create_dashboard, set_baselines]
    when: "Creating metrics tracking dashboard with baselines and targets"
  - name: linear
    actions: [create_issue]
    when: "Creating instrumentation tickets (one per event)"
  - name: notion
    actions: [publish_framework]
    when: "Publishing metrics framework to Notion"

# User Input Gates
user_inputs:
  - step: 1
    question: "What does success look like in plain language?"
    required: true
  - step: 2
    question: "Do you have current baseline data for any metrics?"
    required: false
  - step: 3
    question: "What analytics platform are you using?"
    options: [Amplitude, Mixpanel, GA4, other]
    required: false
  - step: 4
    question: "Create Linear tickets for instrumentation?"
    required: false
    default: false
---

# Design Success Metrics Writer

## Overview

Use this skill to define clear, measurable success metrics for design initiatives before work begins or after launch. Accepts design specs (from `$design-spec-writer`), personas (from `$persona-creator`), journey maps (from `$journey-mapper`), or plain feature descriptions and produces a structured metrics framework.

The output should connect user outcomes to measurable signals — not just business KPIs, but behavioral indicators that reveal whether the design is working as intended. Every metric should be traceable to a user goal or pain point.

Output is formatted for use in Amplitude, Mixpanel, Google Analytics, or as a structured metrics brief in Notion, Google Sheets, or Confluence. When the target platform is specified, adapt the metric definitions and event naming conventions accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Google Sheets** | Create metrics tracking dashboard with baseline values, target values, and measurement cadence columns | Output metrics table as markdown; user creates spreadsheet manually |
| **Linear** | Create one instrumentation ticket per tracking event with event name, properties, and acceptance criteria | Output instrumentation checklist as markdown; user creates tickets manually |
| **Notion** | Publish metrics framework as a Notion page with linked metric definitions and measurement plan | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Understand the design intent
- **Reads:** feature_description, design_spec (if provided), personas (if provided), journey_context (if provided)
- **Ask user:** "What does success look like in plain language?" — ground the metrics in the team's intuitive understanding before formalizing.
- **Actions:**
  - Identify the product, feature, or experience being measured.
  - Capture the core user problems being solved.
  - Capture the business objectives the design supports.
  - Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` if available.
  - If inputs are vague, ask the user to clarify what "success" means for this work.
- **If** design_spec provided → extract success criteria from user stories and validate coverage against all stories.
- **Produces:** Populated `Design Context` section

### Step 2: Map outcomes to user and business goals
- **Reads:** Step 1 context, personas, journey_context
- **Ask user:** "Do you have current baseline data for any metrics?" — baselines anchor targets in reality.
- **Actions:**
  - For each persona or user segment, identify the desired behavioral change.
  - For each business objective, identify the leading and lagging indicators.
  - Distinguish between outcome metrics (did it work?) and output metrics (did we ship it?).
  - Prioritize outcome metrics over output metrics.
- **If** no baseline data available → flag all targets as "estimated," recommend instrumenting current state for 2-4 weeks before setting targets.
- **Produces:** Populated `Outcome Goals` section

### Step 3: Define the metrics framework
- **Reads:** Step 2 outcome goals
- **Ask user:** "What analytics platform are you using?" — options: Amplitude, Mixpanel, GA4, other. Determines event naming conventions and implementation guidance.
- **Actions:**
  - Select 1-2 primary metrics that directly measure design success.
  - Select 2-4 secondary metrics that provide supporting evidence.
  - Define guardrail metrics that must not degrade.
  - For each metric, specify: definition, measurement method, current baseline (if known), target, and timeframe.
  - Use `references/metrics-framework-template.md` for structure.
- **If** analytics platform specified → use platform-specific event naming conventions (e.g., Amplitude: `noun_verb`, Mixpanel: `Noun Verb`, GA4: `snake_case` events).
- **If** no analytics platform specified → use generic event naming and note that conventions should be adapted to the team's platform.
- **Checkpoint:** "Here is the metrics framework with [N] primary and [N] secondary metrics. Does this capture how you'll judge success?"
- **Produces:** Populated `Metrics Framework` section
- **References:** `references/metrics-framework-template.md`

### Step 4: Build a measurement plan
- **Reads:** Step 3 metrics framework
- **Ask user:** "Create Linear tickets for instrumentation?" — Default: output as markdown checklist.
- **Actions:**
  - Specify what instrumentation or tracking is needed.
  - Identify data sources (analytics, surveys, support tickets, etc.).
  - Define measurement cadence (daily, weekly, post-launch review).
  - Set review milestones and decision triggers.
  - Note any metrics that require new instrumentation.
- **Tool action — Linear (if available and user confirms):**
  - Create one instrumentation ticket per tracking event.
  - Each ticket includes: event name, event properties, trigger condition, acceptance criteria, and linked metric.
- **If** Linear unavailable → output instrumentation checklist as markdown with event names, properties, and trigger conditions.
- **Produces:** Populated `Measurement Plan` section

### Step 5: Validate and stress-test
- **Reads:** Steps 3-4 outputs
- **Actions:**
  - Check that every primary metric ties to a user goal.
  - Ensure metrics are not gameable or easily inflated without real improvement.
  - Confirm that the metrics set is small enough to act on (aim for 8-12 total, not 30).
  - Flag vanity metrics and replace with behavioral indicators.
  - Log assumptions about baselines or targets.
- **Produces:** Populated `Assumptions & Risks` section

### Step 6: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/metrics-framework-template.md` for the response structure.
  - Include `references/metrics-handoff-schema.md` when output feeds `$ab-test-planner` or `$stakeholder-presentation-writer`.
- **Tool action — Google Sheets (if available):**
  - Create metrics tracking dashboard with columns: metric name, type (primary/secondary/guardrail), definition, baseline, target, current value, measurement cadence.
  - Include a baselines tab for historical data entry.
- **Tool action — Notion (if available):**
  - Publish metrics framework as a Notion page.
  - Create linked database of metric definitions with measurement plan.
- **If** no tools available → output as structured markdown with all sections.
- **Next steps:** Based on output, suggest:
  - "Design an A/B test around these metrics using `$ab-test-planner`."
  - "Present this metrics framework to stakeholders using `$stakeholder-presentation-writer`."
  - "If baselines are unknown, instrument the current experience first, then revisit targets in 2-4 weeks."
- **Produces:** Complete framework with all required sections and optional `Downstream Handoff`
- **References:** `references/metrics-framework-template.md`, `references/metrics-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Design Context | yes | - | key-value fields: product, feature, user problems, business objectives, upstream inputs |
| Outcome Goals | yes | 1 goal | per-persona or per-segment behavioral changes with leading and lagging indicators |
| Metrics Framework | yes | 1 primary | primary metrics (1-2), secondary metrics (2-4), guardrail metrics with definition, method, baseline, target, timeframe |
| Measurement Plan | yes | - | instrumentation needs, data sources, cadence, review milestones, decision triggers |
| Assumptions & Risks | yes | 1 assumption | logged assumptions about baselines or targets with confidence levels |
| Downstream Handoff | no | - | handoff schema block per `references/metrics-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Metrics Framework | Primary metrics name a specific user behavior they measure (not "engagement" but "percentage of users who complete [task] within [timeframe]") | blocker |
| QB-02 | Metrics Framework | Includes at least one leading indicator, not all lagging indicators (revenue, retention) | blocker |
| QB-03 | Metrics Framework | No more than 2 primary metrics are defined — if everything is primary, nothing is | blocker |
| QB-04 | Metrics Framework | At least one guardrail metric is included that must not degrade | blocker |
| QB-05 | Metrics Framework | Every metric has a definition, measurement method, data source, and target | blocker |
| QB-06 | Metrics Framework | No vanity signals (total pageviews, total downloads) without connection to a behavioral outcome | blocker |
| QB-07 | Measurement Plan | Specifies which events need instrumentation and whether they exist today | warning |
| QB-08 | Assumptions & Risks | Assumptions about baselines or targets are logged with confidence levels | warning |
| QB-09 | Metrics Framework | Metric targets are evidence-based, not unjustified round numbers | warning |

## Reference Navigation

Read only what is needed:
- metrics output shell: `references/metrics-framework-template.md`
- downstream handoff contract: `references/metrics-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [define_metrics, create_KPIs, measure_success, plan_instrumentation, set_targets]

- "Define success metrics for the new onboarding flow."
- "How will we know if this redesign is working?"
- "Write KPIs for the checkout experience."
- "What should we measure for this feature launch?"

### Negative
- "Design an A/B test for the checkout flow." -> `$ab-test-planner`
- "Write a design spec for the settings page." -> `$design-spec-writer`
- "Create a competitive analysis." -> `$competitive-analyzer`

### Ambiguous
- "How do we know if this is successful?" (clarify whether they want metrics definition or post-launch analysis)
- "What metrics matter?" (clarify the specific feature or design initiative)
