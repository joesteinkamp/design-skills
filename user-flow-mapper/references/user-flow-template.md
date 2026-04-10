# User Flow Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Flow name | yes | text | concise descriptive name |
> | User goal | yes | text | what the user is trying to accomplish |
> | Flow type | yes | enum | task flow / user flow / wire flow |
> | Persona/user type | yes | text | must reference a named persona or segment |
> | Entry point | yes | text | where the user starts |
> | Success state | yes | text | clear completion criteria |
> | Prerequisite conditions | no | list | conditions that must be true before flow starts |
> | Happy Path steps | yes | list | min 3 steps; each needs Screen/state, User action, System response, Transition, Next step |
> | Transition | yes | enum | navigate / modal / inline / redirect (per step) |
> | Success confirmation | yes | text | final step must confirm completion |
> | Decision Points | no | list | each needs Location, Condition, min 2 branches |
> | Conditional Logic | no | table | columns: Condition, Source, Result, Destination |
> | Error States | yes | list | min 1; each needs Trigger, Error display, Error message, Recovery path |
> | Error display | yes | enum | inline / toast / modal / page (per error) |
> | Empty State | yes | key-value | Condition, Display, Action available |
> | First-Time User | no | key-value | Condition, Differences, Onboarding elements |
> | Permission/Role Variations | no | key-value | Role, Differences per role |
> | Boundary Conditions | no | list | e.g., max items, character limits, timeout |
> | Loading & Transitions | no | table | columns: Step, Loading behavior, Duration, Fallback |
> | Technical Dependencies | no | table | columns: Step, API/Service, Failure impact |
> | Path Count | yes | key-value | Happy path, Alternate paths, Error recovery paths, Total |
> | Coverage Checklist | yes | list | all 7 checklist items must be addressed |

Use this as the default response structure for `user-flow-mapper`.

## Flow Overview

- Flow name:
- User goal:
- Flow type: (task flow / user flow / wire flow)
- Persona/user type:
- Entry point:
- Success state:
- Prerequisite conditions:

## Happy Path

Document the primary path from entry to success.

### Step 1: [Screen/State Name]
- Screen/state:
- User action:
- System response:
- Transition: (navigate / modal / inline / redirect)
- Next step:

### Step 2: [Screen/State Name]
(repeat structure)

### Step 3: [Screen/State Name]
(repeat structure)

### Step N: [Success State]
- Screen/state:
- Success confirmation:
- Post-success action: (redirect / notification / next task)

## Decision Points & Branches

### Decision Point 1: [Name]
- Location: (after Step #)
- Condition:
- Branch A: [condition] → goes to [step/screen]
- Branch B: [condition] → goes to [step/screen]
- Branch C: [condition] → goes to [step/screen] (if applicable)
- Convergence point: (where branches rejoin the main flow, if applicable)

### Decision Point 2: [Name]
(repeat structure)

### Conditional Logic
| Condition | Source | Result | Destination |
|-----------|--------|--------|-------------|
| | | | |
| | | | |

## Error & Edge Cases

### Error States

#### Error 1: [Name]
- Trigger: (what causes this error)
- Occurs at: (step #)
- Error display: (inline / toast / modal / page)
- Error message:
- Recovery path: (what the user does to continue)
- Recovery destination: (which step they return to)

#### Error 2: [Name]
(repeat structure)

### Edge Cases

#### Empty State
- Condition: (when this state appears)
- Display:
- Action available:

#### First-Time User
- Condition:
- Differences from returning user:
- Onboarding elements:

#### Permission/Role Variations
- Role: [role name]
- Differences: (steps added, removed, or modified)

#### Boundary Conditions
- Condition: (e.g., max items, character limits, timeout)
- Behavior:
- User communication:

## Flow Annotations

### Loading & Transitions
| Step | Loading behavior | Duration | Fallback |
|------|-----------------|----------|----------|
| | | | |

### Technical Dependencies
| Step | API/Service | Failure impact |
|------|-------------|---------------|
| | | |

### Open Questions
- Question 1:
- Question 2:

### Component References
| Step | Component | Design spec reference |
|------|-----------|---------------------|
| | | |

## Flow Summary

### Path Count
- Happy path: 1
- Alternate paths:
- Error recovery paths:
- Total documented paths:

### Coverage Checklist
- [ ] Every step has a defined user action and system response
- [ ] Every decision point has conditions and destinations
- [ ] Every error state has a recovery path
- [ ] Empty states are documented
- [ ] First-time vs. returning user differences are noted
- [ ] Permission/role variations are documented
- [ ] No dead ends exist without recovery

---

## Starter Example

Below is a concrete example of a completed happy path segment and decision point. Use as a quality reference.

### Happy Path: Add to Cart

| Step | Screen/State | User Action | System Response | Transition |
|------|-------------|-------------|-----------------|------------|
| 1 | Product Detail Page | Taps "Add to Cart" button | Button shows spinner (150ms), then changes to "Added ✓" with green background | Inline update |
| 2 | Product Detail Page (updated) | — | Cart badge in nav increments by 1. Slide-in toast: "Added to cart" with "View Cart" link (auto-dismiss 4s) | Inline update |
| 3 | Cart (if user taps "View Cart") | Taps "View Cart" on toast or nav cart icon | Cart drawer slides in from right (300ms ease-out) showing added item at top | Modal / drawer |

### Decision Point: Checkout Eligibility

```
[Cart Page] → User taps "Checkout"
    │
    ├── IF signed in AND cart > 0 → [Checkout: Shipping]
    ├── IF not signed in AND cart > 0 → [Sign In / Guest Checkout modal]
    ├── IF cart = 0 → [Empty Cart State] "Your cart is empty" + "Continue Shopping" link
    └── IF item out of stock since add → [Cart Page with warning] "1 item is no longer available" + "Remove" action
```

### Error Path: Payment Failure

| Step | Screen/State | User Action | System Response | Recovery |
|------|-------------|-------------|-----------------|----------|
| E1 | Checkout: Payment | Submits payment form | API returns 402 (card declined) | — |
| E2 | Checkout: Payment (error) | — | Inline error above payment form: "Your card was declined. Please try a different payment method." Card field highlighted red. | User corrects card or selects different method → returns to Step P5 of happy path |
