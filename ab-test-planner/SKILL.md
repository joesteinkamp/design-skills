---
name: ab-test-planner
description: "Design rigorous A/B test plans with falsifiable hypotheses, variant definitions, metric selection, sample sizing, and analysis criteria. Use when requests involve A/B testing, experiment design, hypothesis creation, or evaluating design decisions through controlled experiments."
---

# A/B Test Planner

## Overview

Use this skill to design rigorous A/B test plans that validate design decisions with data. Accepts design decisions, feature descriptions, specs (from `$design-spec-writer`), or journey insights (from `$journey-mapper`) and produces structured experiment plans.

The output should be experiment-ready: a falsifiable hypothesis, clearly defined variants, measurable metrics, and a decision framework for interpreting results.

## Workflow

1. Define the test question.
- Identify the design decision to be tested.
- Capture user problem and business context.
- Write a falsifiable hypothesis using `references/hypothesis-framework.md`.
- Ensure the hypothesis follows the template: "If [change], then [metric] will [direction] because [rationale]."

2. Design variants.
- Define control (current experience) precisely.
- Define treatment(s) with exact differences from control.
- Identify and mitigate confounding variables.
- Ensure variants differ by the minimum needed to test the hypothesis.

3. Select metrics.
- Choose one primary metric that directly measures the hypothesis.
- Select 2-3 secondary metrics for supporting evidence.
- Define guardrail metrics that must not degrade.
- Specify measurement method and current baseline for each metric.

4. Plan execution.
- Calculate or recommend sample size based on MDE and power.
- Estimate test duration.
- Define audience, traffic allocation, and targeting criteria.
- Set kill criteria for early stopping.
- Identify technical dependencies and QA requirements.

5. Format output.
- Use `references/ab-test-plan-template.md` for the response structure.
- Include a decision framework for all possible outcomes.
- Ensure the plan is actionable by both design and engineering teams.

## Output Contract

Always return sections in this order:
- `Test Overview`
- `Hypothesis`
- `Variants`
- `Metrics`
- `Execution Plan`
- `Analysis Framework`

## Quality Bar

Revise before finalizing if any of these are true:
- Hypothesis is not falsifiable.
- Hypothesis lacks a behavioral rationale.
- More than one primary metric is defined.
- Guardrail metrics are missing.
- Variants differ by too many changes to attribute results.
- Sample size or duration is not addressed.
- Decision framework is missing or incomplete.
- Kill criteria are not defined.

## Reference Navigation

Read only what is needed:
- test plan output shell: `references/ab-test-plan-template.md`
- hypothesis writing guide: `references/hypothesis-framework.md`

## Trigger Examples

Positive:
- "Design an A/B test for the new checkout flow."
- "Write a hypothesis and test plan for this design change."
- "Help me set up an experiment to test single-page vs. multi-step signup."

Negative:
- "Write a design spec for the checkout flow."
- "Audit this design for accessibility."
- "Create a competitive analysis."

Ambiguous:
- "Should we test this?" (clarify the specific design decision and what success looks like)
