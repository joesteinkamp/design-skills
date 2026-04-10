# Interaction Spec Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Screen/Component Name | yes | text | specific name identifying the screen or component |
> | Default State — Layout | yes | text | describes spatial arrangement |
> | Default State — Key elements | yes | list | min 2 elements |
> | Default State — Data displayed | yes | text | what data is shown |
> | Empty state | yes | key-value | Trigger, Display, Action available |
> | Loading state | yes | key-value | Trigger, Display, Duration expectation |
> | Error state | yes | key-value | Trigger, Display, Recovery action |
> | Disabled state | no | key-value | Trigger, Display |
> | Interactions | yes | list | min 1 interaction; each has Trigger, Behavior, Feedback, Result |
> | Edge Cases | yes | list | min 1 edge case; each has Condition and Expected behavior |
> | Responsive Behavior — Desktop | yes | text | layout description |
> | Responsive Behavior — Tablet | yes | text | layout description |
> | Responsive Behavior — Mobile | yes | text | layout description |

Use this for each key screen, component, or flow within a design spec.

## [Screen/Component Name]

### Default State
- Layout:
- Key elements:
- Data displayed:

### States
- Empty state:
  - Trigger:
  - Display:
  - Action available:
- Loading state:
  - Trigger:
  - Display:
  - Duration expectation:
- Error state:
  - Trigger:
  - Display:
  - Recovery action:
- Disabled state:
  - Trigger:
  - Display:

### Interactions
- Interaction 1:
  - Trigger:
  - Behavior:
  - Feedback:
  - Result:
- Interaction 2:
  - Trigger:
  - Behavior:
  - Feedback:
  - Result:

### Edge Cases
- Edge case 1:
  - Condition:
  - Expected behavior:
- Edge case 2:
  - Condition:
  - Expected behavior:

### Responsive Behavior
- Desktop:
- Tablet:
- Mobile:
