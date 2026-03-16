# A/B Test Plan Template

Use this as the default response structure for `ab-test-planner`.

## Test Overview

- Test name:
- Feature/area:
- Business context:
- Design decision being tested:
- Test owner:
- Status: (draft / approved / running / complete)

## Hypothesis

- Statement: If [change], then [metric] will [direction] by [magnitude] because [rationale].
- Null hypothesis: There is no difference in [metric] between control and treatment.
- Falsifiable: (yes / no -- must be yes)

## Variants

### Control (A)
- Description:
- Screenshot/spec reference:
- Key characteristics:

### Treatment (B)
- Description:
- Screenshot/spec reference:
- Key characteristics:
- Exact differences from control:

### Treatment (C) (optional)
- Description:
- Exact differences from control:

### Confounding Variables
- Variable 1:
  - Risk:
  - Mitigation:

## Metrics

### Primary Metric (one only)
- Metric:
- Measurement method:
- Current baseline:
- Minimum detectable effect (MDE):
- Direction: (increase / decrease)

### Secondary Metrics (2-3)
- Metric 1:
  - Measurement method:
  - Expected direction:
- Metric 2:
  - Measurement method:
  - Expected direction:

### Guardrail Metrics (must-not-degrade)
- Guardrail 1:
  - Measurement method:
  - Threshold:
- Guardrail 2:
  - Measurement method:
  - Threshold:

## Execution Plan

- Sample size per variant:
- Estimated duration:
- Traffic allocation: (% per variant)
- Audience: (all users / segment)
- Targeting criteria:
- Rollout plan: (immediate / gradual)
- Kill criteria: (conditions to stop test early)
- Technical dependencies:
- QA requirements:

## Analysis Framework

- Statistical method: (frequentist / Bayesian)
- Significance level: (typically 0.05)
- Power: (typically 0.80)
- Analysis timing: (when to read results)
- Segmentation plan: (subgroups to analyze)
- Decision framework:
  - If primary metric improves and guardrails hold: ship treatment
  - If primary metric is neutral: evaluate secondary metrics
  - If guardrails degrade: stop test, investigate
  - If results are inconclusive: extend test or redesign
