# Interview Scorecard Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Role | yes | text | role title |
> | Level | yes | text | level/band |
> | Round | yes | enum | portfolio / craft / collaboration / leadership |
> | Interviewer | yes | text | named person or role |
> | Recommendation | yes | enum | strong yes / yes / no / strong no |
> | Recommendation rationale | yes | text | one sentence tied to competency scores |
> | Competency Ratings | yes | list | min 3; each: competency + rating + one-line evidence |
> | Open Questions for Panel | yes | list | min 1; what this round could not resolve |
> | Mode | yes | enum | generate / score |

Use this schema when passing scorecard output to downstream skills or to other rounds in the same loop. This skill currently has no registered downstream skills; the handoff exists so a completed scorecard can be carried into the panel debrief and combined with other rounds' scorecards.

## Required Handoff Block

```markdown
## Interview Scorecard Handoff

### Summary
- Role:
- Level:
- Round:
- Interviewer:
- Mode:

### Recommendation
- Overall:
- Rationale:

### Competency Ratings
- Competency 1: [rating] — [one-line evidence]
- Competency 2: [rating] — [one-line evidence]
- Competency 3: [rating] — [one-line evidence]

### Open Questions for Panel
- Question 1:
```

## Mapping to Downstream Use

- `Summary` + `Recommendation` -> panel debrief decision input
- `Competency Ratings` -> combined competency matrix across all rounds of the loop
- `Open Questions for Panel` -> what the next interviewer should dig into

## Validation Checklist

Before final output, confirm:
- Recommendation maps to the competency ratings (no "yes" on mostly low ratings).
- Every competency rating carries one line of specific evidence, or is marked "not assessed".
- Competencies are scoped to this round, not duplicated across the loop.
- At least one open question is handed to the panel.
