# QA Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Target | yes | text | screen, component, or flow that was QA'd |
> | Source of truth | yes | text | Figma URL, design spec, or reference screenshot |
> | Build under review | yes | text | built URL or screenshot |
> | Tolerance | yes | enum | pixel-perfect / functional-parity |
> | Ship verdict | yes | enum | ship / fix-blockers-first / not-ready |
> | Blocker Deviations | yes | list | min 0; each has element, design value, built value, fix |
> | Major Deviations | yes | list | min 0; each has element, design value, built value, fix |
> | Open Questions | yes | list | min 1; ambiguities between bug and intended change |

Use this schema when passing QA output to downstream skills like `$dev-handoff-writer`.

## Required Handoff Block

```markdown
## QA Handoff

### QA Summary
- Target:
- Source of truth:
- Build under review:
- Tolerance:
- Ship verdict: (ship / fix-blockers-first / not-ready)

### Blocker Deviations
- Deviation 1: element / design value / built value / fix
- Deviation 2: element / design value / built value / fix

### Major Deviations
- Deviation 1: element / design value / built value / fix
- Deviation 2: element / design value / built value / fix

### Open Questions
- Question 1: (bug or intended design change?)
```

## Mapping to Downstream Skills

- `Blocker Deviations` + `Major Deviations` -> `$dev-handoff-writer` fix scope and acceptance criteria
- `QA Summary` + `Ship verdict` -> `$dev-handoff-writer` handoff status
- `Open Questions` -> `$design-spec-writer` spec clarifications when a difference is an intended change

## Validation Checklist

Before final output, confirm:
- Every deviation in the handoff cites both the design value and the built value.
- The ship verdict is consistent with the blocker count (any blocker -> not "ship").
- Intentional differences are excluded from the deviation lists and noted in open questions.
- Each deviation references a specific element or location.
