# Design Spec Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Feature/project name | yes | text | concise name |
> | Decision stage | yes | enum | proposal / refinement / build-ready |
> | Problem statement | yes | text | describes user problem and why it matters |
> | Target personas | yes | list | min 1 named persona |
> | Journey context | yes | text | where this fits in the user journey |
> | Business constraints | yes | list | min 1 constraint |
> | Dependencies | no | list | list of dependencies if any |
> | Problem Statement (Scope) | yes | text | concise description of user problem being solved |
> | Success Metrics | yes | list | min 2 metrics |
> | In Scope | yes | list | min 2 items |
> | Out of Scope | yes | list | min 1 item |
> | User Stories | yes | list | min 1 story; As a/I want to/so that format |
> | Acceptance criteria | yes | list | min 2 per story; Given/When/Then format |
> | Accessibility requirements | yes | text | per user story |
> | Responsive notes | no | text | per user story |
> | Interaction Specs | yes | key-value | uses interaction-spec-template per screen/component |
> | Content Requirements | no | list | each has Purpose, Tone, Character limits, Variants |
> | Open Questions | no | list | each has Context, Owner, Deadline |
> | Dev Handoff Summary | no | key-value | uses dev-handoff-schema when handing off |

Use this as the default response structure for `design-spec-writer`.

## Design Context

- Feature/project name:
- Decision stage: (proposal / refinement / build-ready)
- Problem statement:
- Target personas:
- Journey context: (where this fits in the user journey)
- Business constraints:
- Dependencies:

## Scope

### Problem Statement
A concise description of the user problem being solved and why it matters.

### Success Metrics
- Metric 1:
- Metric 2:

### In Scope
- Item 1:
- Item 2:

### Out of Scope
- Item 1:
- Item 2:

## User Stories & Acceptance Criteria

For each user story:
- Story: As a [persona], I want to [action] so that [outcome].
- Acceptance criteria:
  - Given [context], when [action], then [result].
  - Given [context], when [action], then [result].
- Accessibility requirements:
- Responsive notes:

## Interaction Specs

Produce this section using `interaction-spec-template.md` for each key screen or component.

## Content Requirements

- Content block 1:
  - Purpose:
  - Tone:
  - Character limits:
  - Variants: (empty state, error state, first-time)

## Open Questions

- Question 1:
  - Context:
  - Owner:
  - Deadline:

## Dev Handoff Summary

Produce this section using `dev-handoff-schema.md` when passing to `$dev-handoff-writer`.

---

## Starter Example

Below is a concrete example of a completed user story with acceptance criteria and interaction spec. Use as a quality reference.

### User Story: Password Reset

**As a** returning user who has forgotten their password,
**I want to** reset my password using my email address,
**so that** I can regain access to my account without contacting support.

**Acceptance Criteria:**
1. **Given** the user clicks "Forgot password" on the login screen, **When** the reset form loads, **Then** the email field is focused and the submit button is disabled until a valid email format is entered.
2. **Given** the user submits a valid email, **When** the request succeeds, **Then** a confirmation message reads "Check your email for a reset link" and no indication is given whether the email exists in the system (security).
3. **Given** the user submits an invalid email format, **When** they blur the field or submit, **Then** an inline error reads "Enter a valid email address" below the field.
4. **Given** the user clicks the reset link in their email, **When** the link is less than 24 hours old, **Then** they see a "Create new password" form with requirements listed.
5. **Given** the user clicks an expired reset link, **When** the page loads, **Then** they see "This link has expired" with a "Request new link" button.

**Interaction Spec: Reset Form**

| State | Behavior |
|-------|----------|
| Default | Email field empty, focused. Submit button disabled, muted. |
| Valid input | Submit button becomes active (primary color). |
| Loading | Submit button shows spinner, field disabled. Optimistic — no page navigation. |
| Success | Form replaced with confirmation message and "Back to login" link. |
| Error (network) | Toast: "Something went wrong. Please try again." Form remains editable. |
| Error (rate limit) | Toast: "Too many attempts. Try again in 5 minutes." Submit button disabled with countdown. |
