# User Flow Template

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
