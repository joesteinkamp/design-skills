# Spectrum Card Template

Use this as the default response structure for `design-spectrums-creator`.

## Design Context

- Product/feature:
- Design challenge:
- Core user needs:
- Key constraints:
- Upstream inputs: (personas, journeys, inspiration — if available)

## Spectrum Summary

Visual overview of all spectrums with recommended positions:

```
Spectrum 1: [Left Pole] ◄───────●────────► [Right Pole]
Spectrum 2: [Left Pole] ◄──●────────────► [Right Pole]
Spectrum 3: [Left Pole] ◄────────────●──► [Right Pole]
...
```

(● marks the recommended position)

## Spectrum Cards

### Spectrum 1: [Left Pole] ←→ [Right Pole]

**Left pole defined:** (what this means in context)
**Right pole defined:** (what this means in context)

| | Left Pole | Right Pole |
|---|---|---|
| You gain | | |
| You lose | | |
| Real-world example | | |
| User factors pulling here | | |
| Business factors pulling here | | |

**Recommended position:** (left / left-center / center / right-center / right)
**Rationale:** (why this position, grounded in user needs and business goals)
**Context shifts:** (does this change for different personas or scenarios?)
**Team decision needed:** (yes / no — flag if this requires collective alignment)

### Spectrum 2: [Left Pole] ←→ [Right Pole]

(Repeat structure for each spectrum)

## Derived Design Principles

Principles distilled from the spectrum positions:

1. **[Principle name]:** [Principle statement]
   - Derived from: Spectrum X position
   - Meaningful opposite: [What someone who disagrees would say]
   - Applies to: [Specific design decisions this resolves]

2. **[Principle name]:** [Principle statement]
   - Derived from: Spectrum X position
   - Meaningful opposite:
   - Applies to:

3. **[Principle name]:** [Principle statement]
   - Derived from: Spectrum X + Y positions
   - Meaningful opposite:
   - Applies to:

## Open Tensions

Spectrums where the team should discuss before committing:
- Spectrum X: (why this needs discussion, what is at stake)
- Spectrum Y: (why this needs discussion, what is at stake)

---

## Starter Example

Below is a concrete example of a completed spectrum card. Use as a quality reference.

### Spectrum 2: Guided ←→ Exploratory

**Left pole defined:** A step-by-step wizard that walks the user through setup in a fixed sequence. Each step is validated before proceeding. The user cannot skip ahead or deviate.

**Right pole defined:** An open workspace where the user can explore features, configure settings, and learn through experimentation. No prescribed sequence — the user chooses what to do first.

| | Guided (Left Pole) | Exploratory (Right Pole) |
|---|---|---|
| You gain | Higher completion rate for first-time setup. Fewer support tickets. Consistent data quality. | Faster time-to-value for power users. Flexibility for diverse workflows. Sense of ownership and discovery. |
| You lose | Power users feel patronized. Rigid sequence breaks for non-standard workflows. Maintenance cost for wizard logic. | New users feel lost. Incomplete setups lead to degraded experience. Higher learning curve. |
| Real-world example | TurboTax — fixed sequence, validates each section, prevents skipping | Figma — blank canvas, optional templates, learn by doing |
| User factors pulling here | Maya persona: "I want to ship fast, not learn a tool." 66% of new users don't complete current onboarding. | Alex persona (secondary): power user, imports complex projects, needs non-linear setup. |
| Business factors pulling here | Reduce 35% onboarding drop-off. Decrease support ticket volume. | Retain advanced users who churn when they feel restricted. |

**Recommended position:** Left-center (guided with escape hatches)
**Rationale:** Our primary persona (Maya) and our onboarding drop-off data both point toward more guidance, not less. However, a rigid wizard would alienate our secondary persona (Alex). The right position is a guided default sequence with "Skip" and "I'll do this later" options on every step.
**Context shifts:** For enterprise customers with admin-configured workspaces, shift to right-center — they need exploratory setup because their workflows are too diverse for a single wizard.
**Team decision needed:** Yes — the team should align on whether "Skip" means "skip forever" or "remind me later." This affects the notification system design.
