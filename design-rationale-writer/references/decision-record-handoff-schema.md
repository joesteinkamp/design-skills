# Decision Record Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Decision title | yes | text | concise name of the decision |
> | Decision statement | yes | text | the decision in one unambiguous sentence |
> | Status | yes | enum | proposed / accepted / superseded |
> | Rationale summary | yes | text | one-paragraph why, tied to evidence |
> | Evidence | yes | list | min 1 source: research, spectrums, critique, or constraint |
> | Reversibility | yes | enum | one-way / two-way door |
> | Options Considered | yes | list | min 2 options; each with its core trade-off |
> | Key Consequences | yes | list | min 1 positive and min 1 negative |
> | Deciders/approvers | yes | list | min 1 named decider, or explicit TBD |
> | Open Questions | no | list | each with Owner |

Use this schema when passing decision record output to downstream skills like `$stakeholder-presentation-writer` or `$design-spec-writer`.

## Required Handoff Block

```markdown
## Decision Record Handoff

### Decision Summary
- Decision title:
- Decision statement:
- Status: (proposed / accepted / superseded)
- Reversibility: (one-way / two-way door)

### Rationale
- Rationale summary:
- Evidence:

### Options Considered
- Option 1 (chosen):
  - Trade-off:
- Option 2:
  - Trade-off:

### Key Consequences
- Positive:
- Negative:

### Deciders
- Decider/approver 1:

### Open Questions
- Question 1:
  - Owner:
```

## Mapping to Downstream Skills

- `Decision Summary` + `Rationale` -> `$stakeholder-presentation-writer` narrative spine
- `Options Considered` + `Key Consequences` -> `$stakeholder-presentation-writer` trade-off slide
- `Decision Summary` + `Status` -> `$design-spec-writer` decision stage and constraints
- `Open Questions` -> `$design-spec-writer` open questions

## Validation Checklist

Before final output, confirm:
- The decision is stated in one unambiguous sentence.
- At least 2 options are carried over, each with its trade-off.
- Both a positive and a negative consequence are included.
- Reversibility is classified.
- The rationale links to evidence, not preference.
- Deciders are named or flagged TBD.
