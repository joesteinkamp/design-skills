# OKR Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Horizon | yes | enum | quarter / half / year |
> | Team scope | yes | text | whole design org, squad, or craft |
> | Objectives | yes | list | min 1; each needs Objective, Parent goal, Ambition level, Key Results |
> | Objective | yes | text | qualitative, no numbers |
> | Parent goal | yes | text | company/product goal it ladders to, or "missing" |
> | Ambition level | yes | enum | committed / aspirational |
> | Key Results | yes | list | 2-4 per objective; each needs Outcome, Baseline, Target |
> | Outcome | yes | text | what changes for users/business, not an output |
> | Baseline | yes | number | current measured value |
> | Target | yes | number | target value with direction |
> | Supporting Initiatives | yes | list | min 1 per objective; distinct from key results |
> | Dependencies & Risks | yes | list | min 1 across the set |

Use this schema when passing OKR output to downstream skills like `$roadmap-prioritizer` or `$design-status-rollup`.

## Required Handoff Block

```markdown
## OKR Handoff

### OKR Context
- Horizon:
- Team scope:

### Objective 1
- Objective:
- Ladders up to:
- Ambition level:
- Key Results:
  - KR1: (outcome) — from (baseline) to (target)
  - KR2: (outcome) — from (baseline) to (target)
- Supporting initiatives:
  - Initiative 1:
  - Initiative 2:

### Objective 2
- Objective:
- Ladders up to:
- Ambition level:
- Key Results:
  - KR1: (outcome) — from (baseline) to (target)
  - KR2: (outcome) — from (baseline) to (target)
- Supporting initiatives:
  - Initiative 1:

### Dependencies & Risks
- Dependency 1:
- Risk 1:
```

## Mapping to Downstream Skills

- `Supporting Initiatives` + `Key Results` -> `$roadmap-prioritizer` candidate work and impact signals
- `Objectives` + `Key Results` -> `$design-status-rollup` progress narrative and confidence reporting
- `Key Results` (baselines/targets) -> `$design-success-metrics-writer` for any unmeasured outcomes

## Validation Checklist

Before final output, confirm:
- Every objective is qualitative with no numbers in the statement.
- Each objective has 2-4 key results, and every key result has a baseline and a target.
- Key results describe outcomes, not outputs or "ship X."
- Each objective ladders to a stated parent goal, or the missing link is flagged.
- Supporting initiatives are listed separately from key results.
- An ambition level (committed / aspirational) is noted per objective.
