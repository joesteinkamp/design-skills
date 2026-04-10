---
name: ab-test-planner
description: "Design rigorous A/B test plans with falsifiable hypotheses, variant definitions, metric selection, sample sizing, and analysis criteria. Use when requests involve A/B testing, experiment design, or hypothesis creation — not usability testing, not research plans."

# Discovery & Auto-Selection
category: evaluation
tags: [experimentation, hypothesis, a-b-testing, metrics, statistical-testing]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer, journey-mapper]
downstream_skills: []

# Input Contract
inputs:
  - name: design_decision
    required: true
    type: text
    description: "Design decision or feature change to test"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with feature context and user stories"
  - name: journey_insights
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with pain points and opportunities"

# Output Contract
outputs:
  - name: test_plan
    type: ab_test_plan
    template: references/ab-test-plan-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_decision
  parallelizable: true
---

# A/B Test Planner

## Overview

Use this skill to design rigorous A/B test plans that validate design decisions with data. Accepts design decisions, feature descriptions, specs (from `$design-spec-writer`), or journey insights (from `$journey-mapper`) and produces structured experiment plans.

The output should be experiment-ready: a falsifiable hypothesis, clearly defined variants, measurable metrics, and a decision framework for interpreting results. Output is formatted for use in LaunchDarkly, Optimizely, Statsig, or as a structured experiment brief in Notion or Confluence. When the target platform is specified, adapt the variant definition and metric format accordingly.

## Workflow

### Step 1: Define the test question
- **Reads:** design_decision, design_spec (if provided), journey_insights (if provided)
- **Actions:**
  - Identify the design decision to be tested.
  - Capture user problem and business context.
  - Write a falsifiable hypothesis using `references/hypothesis-framework.md`.
  - Ensure the hypothesis follows the template: "If [change], then [metric] will [direction] because [rationale]."
  - Default to the frequentist two-sample approach as the canonical baseline: one control, one treatment, one primary metric, 95% significance level, 80% power. Deviate only when justified.
- **Produces:** Populated `Test Overview` and `Hypothesis` sections
- **References:** `references/hypothesis-framework.md`

### Step 2: Design variants
- **Reads:** Step 1 output
- **Actions:**
  - Define control (current experience) precisely.
  - Define treatment(s) with exact differences from control.
  - Identify and mitigate confounding variables.
  - Ensure variants differ by the minimum needed to test the hypothesis.
- **Produces:** Populated `Variants` section

### Step 3: Select metrics
- **Reads:** Step 1 hypothesis, Step 2 variants
- **Actions:**
  - Choose one primary metric that directly measures the hypothesis.
  - Select 2-3 secondary metrics for supporting evidence.
  - Define guardrail metrics that must not degrade.
  - Specify measurement method and current baseline for each metric.
- **Produces:** Populated `Metrics` section

### Step 4: Plan execution
- **Reads:** Step 3 metrics
- **Actions:**
  - Calculate or recommend sample size based on MDE and power.
  - Estimate test duration.
  - Define audience, traffic allocation, and targeting criteria.
  - Set kill criteria for early stopping.
  - Identify technical dependencies and QA requirements.
- **Produces:** Populated `Execution Plan` section

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/ab-test-plan-template.md` for the response structure.
  - Include a decision framework for all possible outcomes.
  - Ensure the plan is actionable by both design and engineering teams.
- **Produces:** Complete plan with all required sections including `Analysis Framework`
- **References:** `references/ab-test-plan-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Test Overview | yes | - | key-value fields: design decision, user problem, business context, test type |
| Hypothesis | yes | 1 | "If [change], then [metric] will [direction] because [rationale]" format |
| Variants | yes | 2 | control + treatment(s) with exact differences documented |
| Metrics | yes | 1 primary | primary metric, 2-3 secondary metrics, guardrail metrics with baselines |
| Execution Plan | yes | - | sample size, duration, audience, traffic allocation, kill criteria |
| Analysis Framework | yes | - | decision framework covering all 4 outcomes: significant positive, significant negative, neutral, inconclusive |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Hypothesis | Follows "If [change], then [metric] will [direction] by [magnitude] because [rationale]" format | blocker |
| QB-02 | Hypothesis | Includes a behavioral rationale — "because users will [behavior]" not "because it's better" | blocker |
| QB-03 | Metrics | No more than one primary metric is defined — pick one; others are secondary | blocker |
| QB-04 | Metrics | Guardrail metrics are present — every test must define at least one metric that must not degrade | blocker |
| QB-05 | Variants | Variants differ by only one variable, making attribution possible | blocker |
| QB-06 | Metrics | Minimum detectable effect (MDE) is specified for the primary metric | blocker |
| QB-07 | Execution Plan | Sample size or test duration is addressed, even as an estimate | blocker |
| QB-08 | Analysis Framework | Decision framework covers all 4 outcomes: significant positive, significant negative, neutral, and inconclusive | blocker |
| QB-09 | Execution Plan | Kill criteria are defined — specify conditions for early termination (e.g., "stop if guardrail degrades by >5%") | warning |

## Reference Navigation

Read only what is needed:
- test plan output shell: `references/ab-test-plan-template.md`
- hypothesis writing guide: `references/hypothesis-framework.md`

## Trigger Examples

### Positive
Intents: [design_experiment, create_hypothesis, plan_ab_test, define_test_variants, set_test_metrics]

- "Design an A/B test for the new checkout flow."
- "Write a hypothesis and test plan for this design change."
- "Help me set up an experiment to test single-page vs. multi-step signup."

### Negative
- "Plan a usability test for the checkout flow." -> `$usability-test-planner`
- "Write a test script with task scenarios." -> `$usability-test-planner`
- "Write a design spec for the checkout flow." -> `$design-spec-writer`
- "Create a competitive analysis." -> `$competitive-analyzer`

### Ambiguous
- "Should we test this?" (clarify: do you want a controlled A/B experiment with metrics, or observational usability testing with users?)
- "I want to test this design change." (clarify: A/B test measuring conversion, or usability test observing behavior?)
