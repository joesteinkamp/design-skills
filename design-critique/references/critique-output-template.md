# Critique Output Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Design being critiqued | yes | text | must identify specific design or screen |
> | Design goals | yes | list | min 1 goal |
> | Target persona | yes | text | named persona or user segment |
> | Design stage | yes | enum | concept / mid-fi / hi-fi / pre-ship |
> | Critique focus | yes | enum | full review / specific lenses |
> | Executive Summary | yes | text | 2-3 sentences covering quality, strengths, and critical issues |
> | Findings | yes | list | min 3 findings |
> | Finding Type | yes | enum | praise / concern / blocker |
> | Severity | yes | enum | critical / major / minor / nit |
> | Category | yes | enum | usability / visual / content / consistency / accessibility |
> | Lens | yes | text | must reference a rubric evaluation lens |
> | Description | yes | text | specific and observable |
> | Evidence | yes | text | must reference specific element in the design |
> | Recommendation | yes | text | actionable suggestion |
> | Principle/heuristic reference | yes | text | named principle or heuristic |
> | What Works Well | yes | list | min 1 strength with Why it works and Principle it demonstrates |
> | Priority Actions | yes | list | min 2 actions, ranked most to least critical |
> | Effort estimate | yes | enum | small / medium / large |
> | Open Questions for Designer | no | list | each has Context and Why it matters |

Use this as the default response structure for `design-critique`.

## Critique Context

- Design being critiqued:
- Design goals:
- Target persona:
- Design stage: (concept / mid-fi / hi-fi / pre-ship)
- Critique focus: (full review / specific lenses)

## Executive Summary

A 2-3 sentence summary of overall design quality, key strengths, and most critical issues.

## Findings

For each finding:
- Finding:
  - Type: (praise / concern / blocker)
  - Severity: (critical / major / minor / nit)
  - Category: (usability / visual / content / consistency / accessibility)
  - Lens: (which evaluation lens from the rubric)
  - Description:
  - Evidence:
  - Recommendation:
  - Principle/heuristic reference:

## What Works Well

- Strength 1:
  - Why it works:
  - Principle it demonstrates:
- Strength 2:
  - Why it works:
  - Principle it demonstrates:

## Priority Actions

Ranked list of actions from most to least critical:
1. Action 1:
   - Finding reference:
   - Effort estimate: (small / medium / large)
2. Action 2:
   - Finding reference:
   - Effort estimate:
3. Action 3:
   - Finding reference:
   - Effort estimate:

## Open Questions for Designer

- Question 1:
  - Context:
  - Why it matters:
- Question 2:
  - Context:
  - Why it matters:
