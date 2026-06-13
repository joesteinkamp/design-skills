# Maturity Assessment Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Org/team | yes | text | names the team or org assessed |
> | Overall maturity | yes | text | overall level reflecting the dimension spread |
> | Evidence basis | yes | enum | evidence-backed / mixed / self-report |
> | Target level | yes | text | aspired level and horizon; "not specified" if none |
> | Priority Gaps | yes | list | min 2 items; each names dimension, current level, target, and gap |
> | Roadmap Themes | yes | list | min 2 items; each tagged quick-win or systemic |
> | Risks & Dependencies | yes | list | min 1 item |

Use this schema when passing maturity assessment output to downstream skills like `$design-okr-writer` or `$stakeholder-presentation-writer`.

## Required Handoff Block

```markdown
## Maturity Assessment Handoff

### Assessment Summary
- Org/team:
- Overall maturity:
- Evidence basis:
- Target level:

### Priority Gaps
- Gap 1: [dimension] — [current level] -> [target] — [gap]
- Gap 2: [dimension] — [current level] -> [target] — [gap]

### Roadmap Themes
- Theme 1: [quick-win / systemic]
- Theme 2: [quick-win / systemic]

### Risks & Dependencies
- Risk/dependency 1:
```

## Mapping to Downstream Skills

- `Assessment Summary` + `Priority Gaps` -> `$design-okr-writer` objective scope
- `Roadmap Themes` -> `$design-okr-writer` key results and initiatives
- `Assessment Summary` + `Priority Gaps` -> `$stakeholder-presentation-writer` problem framing
- `Roadmap Themes` + `Risks & Dependencies` -> `$stakeholder-presentation-writer` the ask and the plan

## Validation Checklist

Before final output, confirm:
- Overall maturity reflects the dimension spread, not a flat average.
- Evidence basis is stated so downstream confidence is clear.
- Every priority gap names a current level and a target on the named 1-5 scale.
- Roadmap themes are tagged quick-win or systemic.
