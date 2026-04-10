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
---

# Design Success Metrics Writer

## Overview

Use this skill to define clear, measurable success metrics for design initiatives before work begins or after launch. Accepts design specs (from `$design-spec-writer`), personas (from `$persona-creator`), journey maps (from `$journey-mapper`), or plain feature descriptions and produces a structured metrics framework.

The output should connect user outcomes to measurable signals — not just business KPIs, but behavioral indicators that reveal whether the design is working as intended. Every metric should be traceable to a user goal or pain point.

Output is formatted for use in Amplitude, Mixpanel, Google Analytics, or as a structured metrics brief in Notion, Google Sheets, or Confluence. When the target platform is specified, adapt the metric definitions and event naming conventions accordingly.

## Workflow

### Step 1: Understand the design intent
- **Reads:** feature_description, design_spec (if provided), personas (if provided), journey_context (if provided)
- **Actions:**
  - Identify the product, feature, or experience being measured.
  - Capture the core user problems being solved.
  - Capture the business objectives the design supports.
  - Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` if available.
  - If inputs are vague, ask the user to clarify what "success" means for this work.
- **Produces:** Populated `Design Context` section

### Step 2: Map outcomes to user and business goals
- **Reads:** Step 1 context, personas, journey_context
- **Actions:**
  - For each persona or user segment, identify the desired behavioral change.
  - For each business objective, identify the leading and lagging indicators.
  - Distinguish between outcome metrics (did it work?) and output metrics (did we ship it?).
  - Prioritize outcome metrics over output metrics.
- **Produces:** Populated `Outcome Goals` section

### Step 3: Define the metrics framework
- **Reads:** Step 2 outcome goals
- **Actions:**
  - Select 1-2 primary metrics that directly measure design success.
  - Select 2-4 secondary metrics that provide supporting evidence.
  - Define guardrail metrics that must not degrade.
  - For each metric, specify: definition, measurement method, current baseline (if known), target, and timeframe.
  - Use `references/metrics-framework-template.md` for structure.
- **Produces:** Populated `Metrics Framework` section
- **References:** `references/metrics-framework-template.md`

### Step 4: Build a measurement plan
- **Reads:** Step 3 metrics framework
- **Actions:**
  - Specify what instrumentation or tracking is needed.
  - Identify data sources (analytics, surveys, support tickets, etc.).
  - Define measurement cadence (daily, weekly, post-launch review).
  - Set review milestones and decision triggers.
  - Note any metrics that require new instrumentation.
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
