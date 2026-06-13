# Status Digest Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Period | yes | text | e.g., "Week of Jun 9" or "May 2026" |
> | Cadence | yes | enum | weekly / monthly |
> | Audience | yes | enum | exec / cross-functional / team |
> | Prepared by | yes | text | author name or role |
> | TL;DR | yes | list | 3-4 lines: overall standing, biggest risk, top ask |
> | Initiative | yes | text | one per row; min 1 initiative |
> | Status | yes | enum | on-track / at-risk / blocked |
> | Status reason | yes | text | one line per initiative explaining the label |
> | Progress this period | yes | text | one line per initiative |
> | Next step | yes | text | one concrete next step per initiative |
> | Risk | yes | text | one per row; risks for at-risk/blocked initiatives |
> | Risk owner | yes | text | named owner per risk |
> | Mitigation or next step | yes | text | per risk |
> | Ask | yes | text | min 1; who needs to do what, by when |
> | Win | no | list | shipped work, validated bets, resolved blockers |
> | Status change | no | list | per initiative: improved / slipped / newly blocked / resolved (only with prior digest) |
> | New / closed risks | no | list | risks opened or closed since last period |
> | Outstanding asks | no | list | asks still open from last period |

Use this as the default response structure for `design-status-rollup`.

## Digest Header

- Period:
- Cadence: (weekly / monthly)
- Audience: (exec / cross-functional / team)
- Prepared by:

## TL;DR

- Overall standing:
- Biggest risk:
- Top ask:

## Initiatives

| Initiative | Status | Progress this period | Next step |
|------------|--------|----------------------|-----------|
| | (on-track / at-risk / blocked) — one-line reason | | |

## Risks & Blockers

| Risk | Owner | Mitigation or next step |
|------|-------|-------------------------|
| | | |

## Asks / Decisions Needed

- Ask 1: (who needs to do what, by when)

## Wins

- Win 1:

## Changes Since Last Period

Produce this section only when a prior digest is provided.

- Status changes:
- New / closed risks:
- Outstanding asks:

## Downstream Handoff

Produce this section using `status-digest-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of a completed digest row. Use this as a quality reference.

### Digest Header

- Period: Week of Jun 9, 2026
- Cadence: weekly
- Audience: exec
- Prepared by: Head of Design

### TL;DR

- Overall standing: 4 of 6 initiatives on-track; checkout redesign slipped to at-risk on eng capacity.
- Biggest risk: Mobile nav rebuild is blocked pending a platform decision owned by VP Eng.
- Top ask: VP Eng to confirm the platform direction by Friday so the nav rebuild can resume.

### Initiatives

| Initiative | Status | Progress this period | Next step |
|------------|--------|----------------------|-----------|
| Checkout redesign | at-risk — lost one engineer to an incident this week | Shipped the address-entry step to staging | Re-baseline the timeline with eng lead |
| Mobile nav rebuild | blocked — waiting on native-vs-web platform call | Spec complete, build cannot start | Get the platform decision from VP Eng |
| Onboarding refresh | on-track — usability test validated the new flow | 5/5 testers completed without help | Hand specs to dev with `$dev-handoff-writer` |

### Risks & Blockers

| Risk | Owner | Mitigation or next step |
|------|-------|-------------------------|
| Checkout slips past Q3 if capacity isn't restored | Eng Lead (Priya) | Borrow one engineer from platform for two weeks; decision needed Monday |
| Nav rebuild stalls indefinitely without platform call | VP Eng (Marcus) | Escalate to the Friday leadership sync for a decision |

### Asks / Decisions Needed

- VP Eng (Marcus) to confirm native-vs-web platform direction by Friday Jun 13 so the nav rebuild unblocks.
- Eng Lead (Priya) to confirm by Monday whether a platform engineer can backfill checkout for two weeks.
