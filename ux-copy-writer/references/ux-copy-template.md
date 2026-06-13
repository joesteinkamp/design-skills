# UX Copy Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Surface | yes | text | the component or screen the copy lives on |
> | User intent | yes | text | what the user is trying to do at this moment |
> | Voice principles | yes | list | min 1 item; tone words or do/don't rules applied |
> | Reading level | no | text | target grade level or audience descriptor |
> | Character limits | no | key-value | per-element max where known |
> | Locale | no | text | locale or translation-readiness constraint |
> | Primary Copy | yes | table | one row per element; columns: Element, Context, Copy, Rationale, Char count |
> | Element | yes | text | the UI element (CTA, label, heading, helper text) |
> | Copy | yes | text | the proposed string |
> | Rationale | yes | text | one line tying the string to user intent |
> | Char count | no | number | estimated length against any limit |
> | State Copy | yes | table | rows for empty, error, loading, success, confirmation |
> | State | yes | enum | empty / error / loading / success / confirmation |
> | Recovery action | conditional | text | required for error and validation states; how to resolve |
> | Variants | no | list | each set must include the test question and 2+ options |
> | Voice & Tone Notes | yes | list | min 1 item; consistency, reading level, jargon, accessibility |
> | Open Questions | no | list | each must include Context and Owner |

Use this as the default response structure for `ux-copy-writer`.

## Copy Context

- Surface:
- User intent:
- Voice principles:
- Reading level:
- Character limits:
- Locale:

## Primary Copy

| Element | Context | Copy | Rationale | Char count |
|---------|---------|------|-----------|------------|
|         |         |      |           |            |

## State Copy

| State | Copy | Recovery action | Rationale |
|-------|------|-----------------|-----------|
| Empty |  | n/a |  |
| Error |  |  |  |
| Loading |  | n/a |  |
| Success |  | n/a |  |
| Confirmation |  |  |  |

## Variants

For each element worth testing:

### [Element]
- Tests: (the question the variants resolve)
- Option A:
- Option B:

## Voice & Tone Notes

- Consistency:
- Reading level:
- Jargon:
- Accessibility (screen-reader friendliness, no "click here", no position reliance):

## Open Questions

- Question 1:
  - Context:
  - Owner:

## Downstream Handoff

Produce this section using `ux-copy-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of a completed copy deck. Use this as a quality reference, not a copy-paste template.

### Copy Context
- **Surface:** Empty inbox screen (mobile)
- **User intent:** Understand why the inbox is empty and what to do next
- **Voice principles:** Plain, warm, never blame the user; sentence case
- **Reading level:** Grade 6
- **Character limits:** Heading <= 40 chars; body <= 120 chars; CTA <= 20 chars

### Primary Copy

| Element | Context | Copy | Rationale | Char count |
|---------|---------|------|-----------|------------|
| Heading | Empty inbox | You're all caught up | Confirms the empty state is good news, not an error | 20 |
| Body | Empty inbox | New messages will show up here as they arrive. | Sets expectation for what fills the space | 47 |
| CTA | Empty inbox | Compose message | Specific verb over generic "New" | 15 |

### State Copy

| State | Copy | Recovery action | Rationale |
|-------|------|-----------------|-----------|
| Empty | You're all caught up. New messages will show up here. | n/a | Reassures rather than alarms |
| Error | We couldn't load your inbox. Check your connection and tap Retry. | Tap Retry | States what happened and the exact recovery step |
| Loading | Loading your messages... | n/a | Brief, sets expectation |
| Success | Message sent | n/a | Confirms the action completed |
| Confirmation | Delete this message? You can't undo this. | Confirm or Cancel | Names the consequence before a destructive action |
