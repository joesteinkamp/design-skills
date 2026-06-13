# Alt Text Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Asset ID | yes | text | stable identifier matching the design/export (file name or layer name) |
> | Classification | yes | enum | decorative / informative / functional |
> | Attribute | yes | enum | alt / aria-label / aria-describedby |
> | Value | yes | text | the exact string to implement; empty string for decorative |
> | Long description ref | no | text | id of the element holding the long description, if any |
> | Locale | yes | text | language/locale of the value |
> | Status | yes | enum | new / replace-existing / verified |

Use this schema when passing alt text output to downstream skills like `$dev-handoff-writer`.

## Required Handoff Block

```markdown
## Alt Text Handoff

### Implementation Set
| Asset ID | Classification | Attribute | Value | Long description ref | Locale | Status |
|----------|----------------|-----------|-------|----------------------|--------|--------|
|          |                |           |       |                      |        |        |

### Decorative Assets
- Asset ID: — `alt=""` (mark role="presentation" or empty alt)

### Long Descriptions
- Asset ID:
  - Element ref:
  - Description:
```

## Mapping to Downstream Skills

- `Implementation Set` (Attribute + Value) -> `$dev-handoff-writer` component accessibility annotations
- `Decorative Assets` -> `$dev-handoff-writer` markup notes (empty alt / presentation role)
- `Long Descriptions` -> `$dev-handoff-writer` aria-describedby wiring

## Validation Checklist

Before final output, confirm:
- Every asset has an explicit classification.
- Decorative assets carry an empty `alt=""` value.
- Functional assets describe the action, not the picture.
- Every complex visual has a long description with an element ref.
- Locale is stated for every value.
