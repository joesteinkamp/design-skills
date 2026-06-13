# UX Copy Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Surface | yes | text | the component or screen the copy lives on |
> | User intent | yes | text | what the user is trying to do at this moment |
> | Voice principles | yes | list | min 1 item; tone words or do/don't rules applied |
> | Reading level | yes | text | target grade level or audience descriptor |
> | Locale | no | text | locale or translation-readiness constraint |
> | Strings | yes | list | min 1 item; each must include Element, State, Copy |
> | State coverage | yes | list | must confirm empty, error, loading, success, confirmation |
> | Accessibility Notes | yes | list | min 2 items; plain-language and screen-reader considerations |
> | Open Questions | no | list | each must include Context and Owner |

Use this schema when passing copy output to downstream skills like `$accessibility-auditor`.

## Required Handoff Block

```markdown
## UX Copy Handoff

### Copy Summary
- Surface:
- User intent:
- Voice principles:
- Reading level:
- Locale:

### Strings
- Element / State / Copy:
- Element / State / Copy:

### State Coverage
- Empty:
- Error:
- Loading:
- Success:
- Confirmation:

### Accessibility Notes
- Note 1:
- Note 2:

### Open Questions
- Question / Context / Owner:
```

## Mapping to Downstream Skills

- `Strings` + `Accessibility Notes` -> `$accessibility-auditor` plain-language and screen-reader checks
- `Copy Summary` + `Reading level` -> `$accessibility-auditor` readability assessment
- `Strings` + `Voice principles` -> `$ab-test-planner` variant hypotheses

## Validation Checklist

Before final output, confirm:
- Every string carries a one-line rationale tied to user intent.
- Error and validation strings state what happened and how to recover.
- Empty, error, loading, success, and confirmation states are all covered.
- Reading level and any character limits are stated and met.
- Accessibility notes cover plain language and screen-reader friendliness.
