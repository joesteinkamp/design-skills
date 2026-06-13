# Critique Recap Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Session type | yes | enum | critique / design review / working session |
> | What was reviewed | yes | text | the artifact under review |
> | Date | yes | text | session date |
> | Decision-makers | yes | list | min 1 |
> | Decisions | yes | list | min 1; each needs Statement, Attributed to, Status |
> | Statement (decision) | yes | text | the decision made |
> | Attributed to (decision) | yes | text | person or group who decided |
> | Status (decision) | yes | enum | locked / provisional |
> | Action Items | yes | list | min 1; each needs Action, Owner, Due, Priority |
> | Action | yes | text | concrete deliverable |
> | Owner (action) | yes | text | name or "TBD" |
> | Due (action) | yes | text | date or "TBD" |
> | Priority (action) | yes | enum | high / medium / low |
> | Open Questions | yes | list | min 0; each needs Question, Resolver |
> | Resolver (open question) | yes | text | who must resolve it |
> | Parked Ideas | no | list | each needs Description |

Use this schema when passing recap output to downstream skills like `$design-spec-writer` or `$design-rationale-writer`.

## Required Handoff Block

```markdown
## Critique Recap Handoff

### Session Context
- Session type: (critique / design review / working session)
- What was reviewed:
- Date:
- Decision-makers:

### Decisions
- Decision 1:
  - Statement:
  - Attributed to:
  - Status: (locked / provisional)
- Decision 2:
  - Statement:
  - Attributed to:
  - Status: (locked / provisional)

### Action Items
- Action 1:
  - Action:
  - Owner:
  - Due:
  - Priority: (high / medium / low)
- Action 2:
  - Action:
  - Owner:
  - Due:
  - Priority: (high / medium / low)

### Open Questions
- Open question 1:
  - Question:
  - Resolver:

### Parked Ideas
- Parked idea 1:
  - Description:
```

## Mapping to Downstream Skills

- `Decisions` (locked) + `Action Items` -> `$design-spec-writer` requirements and scope
- `Decisions` + `Open Questions` -> `$design-rationale-writer` decision context to document in depth
- `Open Questions` -> `$research-plan-writer` candidate questions for follow-up study

## Validation Checklist

Before final output, confirm:
- Every action item has an owner and a due date, or is explicitly flagged "TBD".
- Every decision is attributed and has a locked/provisional status.
- Every open question names who must resolve it.
- Nothing in the handoff is invented — inferred items are flagged, not asserted.
