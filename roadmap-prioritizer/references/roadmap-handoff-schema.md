# Roadmap Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Framework | yes | enum | RICE / impact-effort / WSJF |
> | Time horizon | yes | text | planning window the roadmap covers |
> | Capacity | yes | text | team capacity, or "unknown" |
> | Top initiative | yes | text | highest-priority Now item |
> | Top initiative score | yes | number | its composite score |
> | Top initiative justification | yes | text | one sentence on why it ranks first |
> | Now Initiatives | yes | list | min 1 item; each with composite score |
> | Next Initiatives | yes | list | min 1 item; each with composite score |
> | Later Initiatives | yes | list | min 0 items |
> | Dependencies | yes | list | min 0 items; each "X must precede Y" |
> | Deprioritized | yes | list | min 0 items; each with trade-off |
> | Assumptions | yes | list | min 1 assumption the sequence depends on |

Use this schema when passing roadmap output to downstream skills like `$design-spec-writer` or `$design-okr-writer`.

## Required Handoff Block

```markdown
## Roadmap Handoff

### Roadmap Summary
- Framework:
- Time horizon:
- Capacity:
- Top initiative:
- Top initiative score:
- Top initiative justification:

### Now
- Initiative 1 (score):
- Initiative 2 (score):

### Next
- Initiative 1 (score):

### Later
- Initiative 1 (score):

### Dependencies
- Dependency 1: X must precede Y

### Deprioritized
- Item 1: (trade-off of not doing it)

### Assumptions
- Assumption 1:
```

## Mapping to Downstream Skills

- `Roadmap Summary` + `Top initiative` -> `$design-spec-writer` feature to spec next
- `Now` + `Next` -> `$design-okr-writer` objectives for the horizon
- `Assumptions` + `Deprioritized` -> `$design-okr-writer` key-result framing and explicit non-goals

## Validation Checklist

Before final output, confirm:
- The framework is named and every Now/Next/Later item carries a composite score.
- Dependencies are listed and the sequence respects them.
- Every deprioritized item states the trade-off of not doing it.
- At least one assumption the sequence depends on is stated, with confidence flagged where evidence is thin.
