# Decision Record Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Decision title | yes | text | concise name of the decision |
> | Decision statement | yes | text | the decision in one unambiguous sentence |
> | Status | yes | enum | proposed / accepted / superseded |
> | Date | yes | text | date the decision was recorded |
> | Prompting situation | yes | text | what triggered the decision and why now |
> | Constraints | yes | list | min 1 constraint (technical, business, time) |
> | Goals | yes | list | min 1 goal the decision serves |
> | Deadline/trigger | no | text | deadline or event forcing the decision |
> | Options Considered | yes | list | min 2 options; each has Pros, Cons, Trade-off |
> | Pros (option) | yes | list | min 1 per option |
> | Cons (option) | yes | list | min 1 per option |
> | Trade-off (option) | yes | text | the core trade-off the option represents |
> | Decision rationale | yes | text | why the chosen option won; links to evidence |
> | Evidence | yes | list | min 1 source: research, spectrums, critique, or constraint |
> | Positive consequences | yes | list | min 1 item |
> | Negative consequences | yes | list | min 1 item |
> | Follow-ups | no | list | actions, risks to monitor, dependencies created |
> | Reversibility | yes | enum | one-way / two-way door |
> | Reversibility implications | yes | text | what it takes to undo and what to watch for |
> | Deciders/approvers | yes | list | min 1 named decider, or explicit TBD |
> | Open Questions | no | list | each has Context and Owner |

Use this as the default response structure for `design-rationale-writer`.

## Decision Summary

- Decision title:
- Decision statement: (one unambiguous sentence)
- Status: (proposed / accepted / superseded)
- Date:

## Context & Forces

- Prompting situation: (what triggered this decision and why now)
- Constraints:
- Goals:
- Deadline/trigger:

## Options Considered

| Option | Pros | Cons | Trade-off |
|--------|------|------|-----------|
| Option A (chosen) | | | |
| Option B | | | |
| Option C | | | |

## Decision & Rationale

- Decision: (the decision in one sentence)
- Why it won: (reasoning tied to evidence — research, spectrums, critique, or constraints)
- Evidence:
- Knowingly traded away:

## Consequences

### Positive
- Consequence 1:

### Negative
- Consequence 1:

### Follow-ups
- Follow-up 1: (action, risk to monitor, or dependency created)

## Reversibility

- Classification: (one-way door / two-way door)
- Implications: (what it would take to undo, and what to watch for)

## Deciders

- Decider/approver 1: (named, or TBD)

## Open Questions

- Question 1:
  - Context:
  - Owner:

## Decision Record Handoff

Produce this section using `decision-record-handoff-schema.md` when passing to `$stakeholder-presentation-writer` or `$design-spec-writer`.

---

## Starter Example

Below is a concrete example of a completed decision record. Use as a quality reference.

### Decision Summary

- Decision title: Primary navigation — tabs over nav drawer
- Decision statement: We will use a persistent bottom tab bar for primary navigation on mobile instead of a hidden hamburger drawer.
- Status: accepted
- Date: 2026-05-22

### Context & Forces

- Prompting situation: Analytics showed 38% of sessions never reached the second-level sections behind the drawer; the redesign is the moment to fix discoverability.
- Constraints: Five primary destinations max; must ship in the Q3 release; reuse existing icon set.
- Goals: Raise second-section reach above 60%; reduce taps-to-key-task.
- Deadline/trigger: Q3 release lock, July 15.

### Options Considered

| Option | Pros | Cons | Trade-off |
|--------|------|------|-----------|
| Bottom tab bar (chosen) | Always visible; one-tap reach; thumb-friendly | Caps destinations at ~5; consumes vertical space | Discoverability over destination count |
| Hamburger drawer | Scales to many destinations; clean canvas | Hides navigation; low reach as measured | Visual minimalism over discoverability |
| Hybrid (tabs + overflow drawer) | Surfaces top items, scales for the rest | Two patterns to learn; overflow still hidden | Flexibility over simplicity |

### Decision & Rationale

- Decision: Adopt a persistent bottom tab bar for the five primary destinations.
- Why it won: The 38% non-reach metric is a discoverability failure the drawer caused; the spectrum mapping placed us firmly on the Discoverability pole given the navigation-reach goal. Five destinations fits the tab cap, so the main downside does not bind.
- Evidence: Session analytics (38% non-reach); `$design-spectrums-creator` Guidance↔Freedom spectrum; usability critique flagged the drawer as a top issue.
- Knowingly traded away: Ability to add a sixth top-level destination without rework.

### Consequences

#### Positive
- Primary sections become one tap from anywhere; expected reach lift.
- Thumb-zone placement reduces reach errors on large phones.

#### Negative
- A future sixth destination forces an overflow pattern or IA rework.
- Tab bar occupies ~56px of vertical space on every screen.

#### Follow-ups
- Monitor second-section reach for 30 days post-launch; owner: PM.
- Define the overflow rule before any sixth destination is proposed.

### Reversibility

- Classification: two-way door
- Implications: Navigation chrome is swappable behind a layout component; reverting is a contained front-end change, not a data or IA migration. Revisit if destination count exceeds five.

### Deciders

- Decider/approver 1: Design lead (accountable)
- Decider/approver 2: Mobile EM (consulted)
