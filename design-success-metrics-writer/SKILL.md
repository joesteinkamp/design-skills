---
name: design-success-metrics-writer
description: "Define measurable success metrics, KPIs, and outcome frameworks for design work. Use when requests involve success criteria, design metrics, KPI definition, outcome measurement, or defining how to measure whether a design achieves its goals."
---

# Design Success Metrics Writer

## Overview

Use this skill to define clear, measurable success metrics for design initiatives before work begins or after launch. Accepts design specs (from `$design-spec-writer`), personas (from `$persona-creator`), journey maps (from `$journey-mapper`), or plain feature descriptions and produces a structured metrics framework.

The output should connect user outcomes to measurable signals — not just business KPIs, but behavioral indicators that reveal whether the design is working as intended. Every metric should be traceable to a user goal or pain point.

Output is formatted for use in Amplitude, Mixpanel, Google Analytics, or as a structured metrics brief in Notion, Google Sheets, or Confluence. When the target platform is specified, adapt the metric definitions and event naming conventions accordingly.

## Workflow

1. Understand the design intent.
- Identify the product, feature, or experience being measured.
- Capture the core user problems being solved.
- Capture the business objectives the design supports.
- Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` if available.
- If inputs are vague, ask the user to clarify what "success" means for this work.

2. Map outcomes to user and business goals.
- For each persona or user segment, identify the desired behavioral change.
- For each business objective, identify the leading and lagging indicators.
- Distinguish between outcome metrics (did it work?) and output metrics (did we ship it?).
- Prioritize outcome metrics over output metrics.

3. Define the metrics framework.
- Select 1-2 primary metrics that directly measure design success.
- Select 2-4 secondary metrics that provide supporting evidence.
- Define guardrail metrics that must not degrade.
- For each metric, specify: definition, measurement method, current baseline (if known), target, and timeframe.
- Use `references/metrics-framework-template.md` for structure.

4. Build a measurement plan.
- Specify what instrumentation or tracking is needed.
- Identify data sources (analytics, surveys, support tickets, etc.).
- Define measurement cadence (daily, weekly, post-launch review).
- Set review milestones and decision triggers.
- Note any metrics that require new instrumentation.

5. Validate and stress-test.
- Check that every primary metric ties to a user goal.
- Ensure metrics are not gameable or easily inflated without real improvement.
- Confirm that the metrics set is small enough to act on (aim for 8-12 total, not 30).
- Flag vanity metrics and replace with behavioral indicators.
- Log assumptions about baselines or targets.

6. Format output.
- Use `references/metrics-framework-template.md` for the response structure.
- Include `references/metrics-handoff-schema.md` when output feeds `$ab-test-planner` or `$stakeholder-presentation-writer`.

## Output Contract

Always return sections in this order:
- `Design Context`
- `Outcome Goals`
- `Metrics Framework`
- `Measurement Plan`
- `Assumptions & Risks`
- `Downstream Handoff` (optional, include when feeding other skills)

## Quality Bar

Revise before finalizing if any of these are true:
- Primary metrics do not name a specific user behavior they measure (not "engagement" but "percentage of users who complete [task] within [timeframe]").
- All metrics are lagging indicators (revenue, retention) with no leading signals (feature adoption rate, task completion rate, time-to-value).
- More than 2 primary metrics are defined — if everything is primary, nothing is.
- No guardrail metrics are included — every metrics framework must define at least one metric that must not degrade.
- Any metric is missing a definition, measurement method, data source, or target.
- Metrics include vanity signals (total pageviews, total downloads) without connecting them to a behavioral outcome ("pageviews per session on help docs" is acceptable; "total pageviews" is not).
- Measurement plan does not specify which events need instrumentation and whether they exist today.
- Assumptions about baselines or targets are not logged with confidence levels.
- Metric targets are round numbers with no justification ("increase by 10%") instead of evidence-based ("increase from 62% to 70% based on competitive benchmark").

## Reference Navigation

Read only what is needed:
- metrics output shell: `references/metrics-framework-template.md`
- downstream handoff contract: `references/metrics-handoff-schema.md`

## Trigger Examples

Positive:
- "Define success metrics for the new onboarding flow."
- "How will we know if this redesign is working?"
- "Write KPIs for the checkout experience."
- "What should we measure for this feature launch?"

Negative:
- "Design an A/B test for the checkout flow."
- "Write a design spec for the settings page."
- "Create a competitive analysis."

Ambiguous:
- "How do we know if this is successful?" (clarify whether they want metrics definition or post-launch analysis)
- "What metrics matter?" (clarify the specific feature or design initiative)
