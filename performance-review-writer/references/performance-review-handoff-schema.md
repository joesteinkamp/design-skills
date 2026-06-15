# Performance Review Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Designer | yes | text | name or identifier |
> | Role | yes | text | current role title |
> | Level | yes | text | current level |
> | Overall rating | yes | enum | 1 / 2 / 3 / 4 / 5 |
> | Promotion readiness | yes | enum | ready / on-track / not-yet / n-a |
> | Overall read | yes | text | one-sentence summary against the current level |
> | Dimension Ratings | yes | list | one entry per rubric dimension with rating and level vs expectation |
> | Strengths | yes | list | min 2; strengths with evidence |
> | Growth Areas | yes | list | min 2; growth areas to develop next cycle |
> | Growth Plan Themes | yes | list | min 1; suggested goal themes seeding next-cycle objectives |

Use this schema when passing review output to downstream skills like `$design-okr-writer` and `$stakeholder-presentation-writer`.

## Required Handoff Block

```markdown
## Performance Review Handoff

### Review Summary
- Designer:
- Role:
- Level:
- Overall rating:
- Promotion readiness:
- Overall read:

### Dimension Ratings
- Dimension 1: rating, level vs expectation
- Dimension 2: rating, level vs expectation
- Dimension 3: rating, level vs expectation

### Strengths
- Strength 1:
- Strength 2:

### Growth Areas
- Growth area 1:
- Growth area 2:

### Growth Plan Themes
- Theme 1:
- Theme 2:
```

## Mapping to Downstream Skills

- `Growth Areas` + `Growth Plan Themes` -> `$design-okr-writer` next-cycle objectives
- `Overall Rating` + `Dimension Ratings` + `Strengths` -> `$stakeholder-presentation-writer` calibration / talent-review summary

## Validation Checklist

Before final output, confirm:
- An overall rating and a promotion-readiness read are stated.
- Every dimension rating carries an explicit level-vs-expectation calibration.
- Each growth plan theme maps to a named growth area.
- The handoff carries no claims about the person beyond what the review's evidence supports.
