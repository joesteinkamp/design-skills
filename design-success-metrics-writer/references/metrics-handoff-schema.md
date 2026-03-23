# Metrics Handoff Schema

Use this schema when passing metrics output to downstream skills like `$ab-test-planner` or `$stakeholder-presentation-writer`.

## Required Handoff Block

```markdown
## Metrics Handoff

### Design Context
- Product/feature:
- Core user problem:
- Business objective:

### Primary Metrics
- Metric 1:
  - Definition:
  - Current baseline:
  - Target:
  - Measurement method:
- Metric 2:
  - Definition:
  - Current baseline:
  - Target:
  - Measurement method:

### Guardrail Metrics
- Guardrail 1:
  - Threshold:
- Guardrail 2:
  - Threshold:

### Key Assumptions
- Assumption 1:
- Assumption 2:
```

## Mapping to Downstream Skills

- `Primary Metrics` + `Guardrail Metrics` -> `$ab-test-planner` metric selection
- `Design Context` + `Primary Metrics` -> `$stakeholder-presentation-writer` success narrative
- `Primary Metrics` + `Key Assumptions` -> `$research-plan-writer` validation research

## Validation Checklist

Before final output, confirm:
- Every primary metric has a definition, baseline, and target.
- Guardrail metrics have clear thresholds.
- No more than 2 primary metrics are included.
- Assumptions are stated with confidence levels.
