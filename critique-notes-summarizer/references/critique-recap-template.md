# Critique Recap Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | What was reviewed | yes | text | the screen, flow, feature, or spec |
> | Session type | yes | enum | critique / design review / working session |
> | Attendees | yes | list | min 1 attendee |
> | Decision-makers | yes | list | min 1; subset of attendees |
> | Date | yes | text | session date |
> | TL;DR | yes | text | 2-3 sentences; what was reviewed and headline outcome |
> | Decision | yes | text | min 1 decision |
> | Attributed to (decision) | yes | text | person or group who made the call |
> | Action | yes | text | min 1; concrete deliverable, not a vague line |
> | Owner (action) | yes | text | name, or "TBD" if not in notes |
> | Due (action) | yes | text | date, or "TBD" if not in notes |
> | Priority (action) | yes | enum | high / medium / low |
> | Open question | yes | text | min 0; unresolved item needing follow-up |
> | Resolver (open question) | yes | text | who needs to resolve it |
> | Parked idea | no | text | out-of-scope or later idea worth retaining |
> | Inferred flag | no | enum | inferred / confirmed |

Use this as the default response structure for `critique-notes-summarizer`.

## Session Context

- What was reviewed:
- Session type: (critique / design review / working session)
- Attendees:
- Decision-makers:
- Date:

## TL;DR

(2-3 sentences: what was reviewed and the headline outcome)

## Decisions

For each decision:
- Decision:
- Attributed to: (person or group who made the call)
- (mark "inferred" if not directly stated in the notes)

## Action Items

| Action | Owner | Due | Priority |
|--------|-------|-----|----------|
|        |       |     |          |

(Use "TBD" for any owner or due date not present in the notes — do not invent.)

## Open Questions

For each open question:
- Question:
- Needs resolution from: (who)

## Parked Ideas

- Idea: (out-of-scope or later thought worth not losing)

## Downstream Handoff

Produce this section using `critique-recap-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of a completed recap. Use this as a quality reference.

### Session Context
- What was reviewed: Checkout flow hi-fi prototype
- Session type: Design review
- Attendees: Priya (design), Marco (PM), Dana (eng), Lee (research)
- Decision-makers: Priya, Marco
- Date: 2026-06-11

### TL;DR
The team reviewed the v2 checkout prototype and agreed to ship the single-page layout, with a guest-checkout option added before launch. Two accessibility items remain open and were assigned for follow-up.

### Decisions
- Adopt the single-page checkout layout over the multi-step wizard.
  - Attributed to: Priya and Marco (consensus)
- Defer saved-payment-methods to a fast-follow release.
  - Attributed to: Marco

### Action Items

| Action | Owner | Due | Priority |
|--------|-------|-----|----------|
| Add a guest-checkout entry point to the prototype | Priya | 2026-06-18 | high |
| Spec the error states for declined payments | Dana | 2026-06-20 | medium |
| Confirm contrast on the disabled "Place order" button | TBD | TBD | medium |

### Open Questions
- Do we support Apple Pay at launch or fast-follow?
  - Needs resolution from: Marco
- Is the address autofill behavior accessible to screen readers?
  - Needs resolution from: Lee (research) + Dana (eng)

### Parked Ideas
- Idea: One-click reorder for returning customers (revisit after launch metrics).
