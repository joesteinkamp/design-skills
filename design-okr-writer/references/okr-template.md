# OKR Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Horizon | yes | enum | quarter / half / year |
> | Team scope | yes | text | whole design org, squad, or craft |
> | Parent goals | yes | list | company/product objectives each OKR ladders to; "missing" if none provided |
> | Source metrics | no | text | reference to a metrics framework if available |
> | Objectives | yes | list | 1-3 objectives; each has Objective statement, Parent goal, Ambition level, 2-4 Key Results |
> | Objective statement | yes | text | qualitative and inspirational, no numbers |
> | Parent goal | yes | text | the company/product goal it ladders to, or "missing — confirm" |
> | Ambition level | yes | enum | committed / aspirational |
> | Key Results | yes | list | 2-4 per objective; each has Outcome, Baseline, Target, Source/confidence |
> | Outcome | yes | text | what changes for users/business, not an output or "ship X" |
> | Baseline | yes | number | current measured value; flag "estimated" if unknown |
> | Target | yes | number | target value with direction |
> | Supporting Initiatives | yes | list | min 1 per objective; the work, distinct from key results |
> | Dependencies & Risks | yes | list | cross-team dependencies and risks per objective |
> | Tracking Plan | yes | key-value | Cadence, Owner, Confidence-check rhythm |

Use this as the default response structure for `design-okr-writer`.

## OKR Context

- Horizon: (quarter / half / year)
- Team scope: (whole design org / squad / craft)
- Parent goals: (company/product objectives these ladder up to — or "missing, confirm before finalizing")
- Source metrics: (metrics framework reference — if available)

## Objectives & Key Results

### Objective 1: (qualitative, inspirational, no numbers)
- Ladders up to: (parent company/product goal — or "missing, confirm")
- Ambition level: (committed / aspirational)
- Key Results:
  - KR1: (outcome) — from (baseline) to (target)
    - Source/confidence: (metrics framework / estimated — confidence high/medium/low)
  - KR2: (outcome) — from (baseline) to (target)
    - Source/confidence:
  - KR3: (outcome) — from (baseline) to (target)
    - Source/confidence:

### Objective 2: (qualitative, inspirational, no numbers)
- Ladders up to:
- Ambition level:
- Key Results:
  - KR1: (outcome) — from (baseline) to (target)
    - Source/confidence:
  - KR2: (outcome) — from (baseline) to (target)
    - Source/confidence:

## Supporting Initiatives

The work the team will do to move the key results. Kept distinct from the key results (outcomes).

- Objective 1:
  - Initiative: (project or stream of work)
  - Initiative:
- Objective 2:
  - Initiative:

## Dependencies & Risks

- Objective 1:
  - Dependency: (other team or input this objective relies on)
  - Risk: (what could prevent hitting the key results)
- Objective 2:
  - Dependency:
  - Risk:

## Tracking Plan

- Cadence: (e.g., weekly KR check-in, mid-horizon review)
- Owner: (who owns reporting on the OKR set)
- Confidence-check rhythm: (e.g., 1-10 confidence rated weekly per KR)

---

## Starter Example

Below is a concrete example of one completed objective. Use as a quality reference.

### Objective 1: Make the first week feel effortless for new teams

- **Ladders up to:** Company goal — "Grow net new team retention by 15% this year"
- **Ambition level:** Committed
- **Key Results:**
  - **KR1:** Increase the share of new teams that reach an activated workspace in their first 7 days — from 34% to 50%.
    - Source/confidence: design-success-metrics-writer framework; confidence high (baseline instrumented in Amplitude).
  - **KR2:** Cut median time-to-first-shared-project for new teams — from 4.2 days to 2 days.
    - Source/confidence: framework baseline; confidence medium.
  - **KR3:** Raise new-user onboarding satisfaction (post-setup survey, top-2-box) — from 61% to 75%.
    - Source/confidence: estimated baseline (survey launching this quarter); confidence low — instrument before committing target.

Note how the objective carries no numbers, each key result names an outcome (not "ship the new onboarding flow"), and every key result has both a baseline and a target.

### Supporting Initiatives for Objective 1

- Redesign the new-team onboarding flow.
- Add an in-product setup checklist.
- Run two rounds of usability testing on the activation path.

These are the work; the key results above are the outcomes the work is meant to produce.
