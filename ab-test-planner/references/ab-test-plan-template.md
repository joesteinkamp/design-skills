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

---

## Starter Example

Below is a concrete example of a completed hypothesis and metric definition. Use as a quality reference.

### Hypothesis Example

- **Statement:** If we replace the multi-step checkout (3 pages) with a single-page checkout, then checkout completion rate will increase by at least 8% (relative) because users will encounter fewer abandonment points and maintain purchase momentum through a continuous flow.
- **Null hypothesis:** There is no difference in checkout completion rate between the multi-step and single-page checkout.
- **Falsifiable:** Yes — completion rate is measurable and the 8% MDE is testable with our traffic volume.

### Primary Metric Example

- **Metric:** Checkout completion rate
- **Definition:** Number of users who reach the order confirmation page ÷ number of users who reach the first checkout page, measured per-session.
- **Measurement method:** Server-side event logging (`checkout_started` → `order_confirmed`)
- **Current baseline:** 62% (30-day average, excludes guest checkout)
- **MDE:** 8% relative (62% → 67%)
- **Direction:** Increase

### Guardrail Metric Example

- **Metric:** Average order value (AOV)
- **Definition:** Total revenue ÷ number of completed orders
- **Current baseline:** $84.50
- **Threshold:** Must not decrease by more than 3% ($81.97)
- **Why it matters:** A faster checkout that pressures users into removing items would be a false positive on completion rate.
