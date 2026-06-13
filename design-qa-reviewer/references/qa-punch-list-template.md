# QA Punch-List Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Target | yes | enum | screen / component / flow |
> | Source of truth | yes | text | Figma URL, design spec, or reference screenshot |
> | Build under review | yes | text | built URL or screenshot of the implementation |
> | Tolerance | yes | enum | pixel-perfect / functional-parity |
> | Summary | yes | text | per-severity counts plus a one-line ship-readiness verdict |
> | Deviations | yes | list | min 1 deviation; grouped by type |
> | Element | yes | text | specific element or location reference |
> | Deviation type | yes | enum | spacing / color / type / state / copy / responsive |
> | Design value | yes | text | the source-of-truth value (e.g., "padding 16px") |
> | Built value | yes | text | the implemented value (e.g., "padding 12px") |
> | Severity | yes | enum | blocker / major / minor / nit |
> | Fix | yes | text | actionable change that closes the deviation |
> | State & Responsive Checks | yes | list | min 1 check; per-state or per-breakpoint pass/fail |
> | Passed Checks | yes | list | min 2 items; matching elements and intentional differences flagged expected |
> | Open Questions | yes | list | min 1; each has Context and Why it matters |

Use this as the default response structure for `design-qa-reviewer`.

## QA Context

- Target: (screen / component / flow)
- Source of truth:
- Build under review:
- Tolerance: (pixel-perfect / functional-parity)

## Summary

- Blockers:
- Major:
- Minor:
- Nits:
- Ship-readiness verdict: (one line)

## Deviations

Grouped by type (spacing, color, type, state, copy, responsive). For each deviation:

### Spacing
- Deviation:
  - Element:
  - Type: spacing
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

### Color
- Deviation:
  - Element:
  - Type: color
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

### Type
- Deviation:
  - Element:
  - Type: type
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

### State
- Deviation:
  - Element:
  - Type: state
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

### Copy
- Deviation:
  - Element:
  - Type: copy
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

### Responsive
- Deviation:
  - Element:
  - Type: responsive
  - Design value:
  - Built value:
  - Severity: (blocker / major / minor / nit)
  - Fix:

## State & Responsive Checks

Per-state and per-breakpoint result with the value compared:
- Check (default / hover / focus / active / disabled / error / loading / empty):
  - Result: (pass / fail)
  - Value compared:
- Check (breakpoint):
  - Result: (pass / fail)
  - Value compared:

## Passed Checks

Elements that match the design, plus intentional differences flagged as expected:
- Passed 1:
- Passed 2:
- Expected difference (not a bug):

## Open Questions

- Question 1:
  - Context:
  - Why it matters:
