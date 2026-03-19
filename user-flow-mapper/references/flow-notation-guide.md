# Flow Notation Guide

Reference for consistent notation when documenting user flows.

## Node Types

### Screens / States
Represent a distinct UI state the user sees.
- Format: **[Screen Name]**
- Example: **[Login Page]**, **[Dashboard]**, **[Payment Confirmation]**

### Actions
Represent something the user does.
- Format: (Action description)
- Example: (Clicks "Submit"), (Enters email address), (Swipes left)

### System Events
Represent something the system does in response.
- Format: {System response}
- Example: {Validates form}, {Sends confirmation email}, {Redirects to dashboard}

### Decision Points
Represent a branch in the flow based on a condition.
- Format: <Condition?>
- Example: <Logged in?>, <Has saved payment?>, <First visit?>

### Terminators
Represent start and end points.
- Format: ((Start/End label))
- Example: ((User lands on homepage)), ((Purchase complete))

## Transition Types

| Type | Symbol | Description | Example |
|------|--------|-------------|---------|
| Navigate | → | Standard page transition | **[Cart]** → **[Checkout]** |
| Modal | ⤴ | Opens overlay/modal | **[Product]** ⤴ **[Size Selector Modal]** |
| Inline | ↻ | Updates within same screen | **[Form]** ↻ {Shows validation error} |
| Redirect | ⇒ | System-initiated navigation | {Auth check} ⇒ **[Login Page]** |
| Back | ← | Return to previous state | **[Checkout]** ← **[Cart]** |

## Path Types

### Happy Path
The primary, most common successful route.
- Notation: Mark with ✓ at completion
- Style: Document first, in full detail

### Alternate Path
A valid but less common route to success.
- Notation: Branch from a decision point
- Label: "Alt: [description]"

### Error Path
A path triggered by a failure condition.
- Notation: Branch from an error state
- Label: "Error: [description]"
- Must include recovery path back to the main flow

### Dead End
A path that cannot continue (should be avoided in design).
- Notation: ✗
- Always document how to prevent or resolve

## Annotation Conventions

### Loading States
- Notation: ⏳ [Loading description]
- Example: ⏳ Fetching payment methods (skeleton loader)

### Conditional Display
- Notation: [IF condition: element]
- Example: [IF returning user: "Welcome back" banner]

### Technical Notes
- Notation: 🔧 [Technical dependency]
- Example: 🔧 Requires payments API v2

### Open Questions
- Notation: ❓ [Question]
- Example: ❓ Should we allow guest checkout?

## Flow Complexity Guidelines

| Complexity | Steps | Decision Points | Recommended Format |
|------------|-------|-----------------|-------------------|
| Simple | 3-5 | 0-1 | Task flow (linear) |
| Moderate | 5-10 | 2-4 | User flow (branching) |
| Complex | 10+ | 5+ | Wire flow (with screen refs) |

## Example Flow Fragment

```
((User clicks "Sign Up"))
  → **[Registration Form]**
    (Enters email, password)
    (Clicks "Create Account")
    {Validates input}
    <Valid?>
      Yes → {Creates account} → {Sends verification email} → **[Check Your Email]** ✓
      No → ↻ {Shows inline validation errors} → (User corrects input) → loop
```
