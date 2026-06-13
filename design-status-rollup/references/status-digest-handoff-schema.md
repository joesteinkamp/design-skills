# Status Digest Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Period | yes | text | reporting period the digest covers |
> | Audience | yes | enum | exec / cross-functional / team |
> | Overall standing | yes | text | one-line summary of the period |
> | Initiatives | yes | list | min 1; each with name + status (on-track/at-risk/blocked) |
> | Top risks | yes | list | min 1 when any initiative is at-risk or blocked; each with owner + mitigation |
> | Open asks | yes | list | min 1; each states who needs to do what |
> | Wins | no | list | shipped work or validated bets worth surfacing |
> | Deltas | no | list | what changed since the prior period |

Use this schema when passing status digest output to downstream skills like `$stakeholder-presentation-writer`.

## Required Handoff Block

```markdown
## Status Digest Handoff

### Digest Summary
- Period:
- Audience:
- Overall standing:

### Initiatives
- Initiative 1: (status — one-line reason)
- Initiative 2: (status — one-line reason)

### Top Risks
- Risk 1: (owner — mitigation)

### Open Asks
- Ask 1: (who needs to do what, by when)

### Wins
- Win 1:

### Deltas
- Change 1:
```

## Mapping to Downstream Skills

- `Overall standing` + `Initiatives` -> `$stakeholder-presentation-writer` narrative arc
- `Top Risks` + `Open Asks` -> `$stakeholder-presentation-writer` decision ask & objection handling
- `Wins` -> `$stakeholder-presentation-writer` evidence layer

## Validation Checklist

Before final output, confirm:
- Every initiative carries a status label and a one-line reason.
- Every risk names an owner and a mitigation or next step.
- Every ask states who needs to do what.
- Deltas are included whenever a prior digest was provided.
