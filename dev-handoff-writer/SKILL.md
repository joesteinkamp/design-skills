---
name: dev-handoff-writer
description: "Generate complete design-to-developer handoff documentation -- component specs, states, responsive behavior, edge cases, and implementation checklists. Use when requests involve dev handoff, engineering handoff, implementation specs, or translating design specs into developer-ready documentation."
---

# Dev Handoff Writer

## Overview

Use this skill to produce developer-ready handoff documentation from design specs. Accepts design specs (from `$design-spec-writer`), accessibility findings (from `$accessibility-auditor`), or direct design descriptions and produces detailed implementation documentation.

The output should be engineering-ready: component specs with all states, responsive behavior at every breakpoint, edge cases with expected behavior, and a verification checklist.

## Workflow

1. Gather inputs.
- Accept design spec handoff from `$design-spec-writer` using the dev-handoff-schema.
- Incorporate accessibility findings from `$accessibility-auditor` if available.
- Identify design system references and tokens.
- Determine engineering audience (frontend, backend, fullstack, mobile).

2. Document components.
- Inventory all components in the feature.
- For each component: name, design system token, variants, properties.
- Use `references/component-spec-template.md` for detailed component specs when needed.

3. Specify all states and behaviors.
- Document every state: default, hover, focus, active, disabled, error, loading, empty.
- Specify transitions: from-state, to-state, duration, easing, property.
- Document interaction flows with triggers, steps, and outcomes.
- Include keyboard and screen reader equivalents for every interaction.

4. Detail responsive and edge cases.
- Specify layout at each breakpoint (desktop, tablet, mobile).
- Document overflow, truncation, and min/max rules.
- List data edge cases: zero items, one item, max items, long text, missing data, offline.

5. Format output.
- Use `references/dev-handoff-template.md` for the response structure.
- Include `references/implementation-checklist.md` as the verification checklist.
- Ensure every component has all states documented.

## Output Contract

Always return sections in this order:
- `Handoff Overview`
- `Component Inventory`
- `Interaction Specs`
- `Responsive Behavior`
- `Content & Edge Cases`
- `Accessibility Requirements`
- `Implementation Checklist`

## Quality Bar

Revise before finalizing if any of these are true:
- Components are missing states (especially error, loading, empty).
- Responsive behavior skips a breakpoint.
- Edge cases are not documented.
- Accessibility requirements are absent.
- Implementation checklist is generic and not tailored to the feature.
- Transitions lack timing and easing specs.
- Design system tokens are not referenced.

## Reference Navigation

Read only what is needed:
- handoff output shell: `references/dev-handoff-template.md`
- detailed component specs: `references/component-spec-template.md`
- verification checklist: `references/implementation-checklist.md`

## Trigger Examples

Positive:
- "Create a dev handoff doc for the new checkout flow."
- "Write implementation specs for these design components."
- "Translate this design spec into developer documentation."

Negative:
- "Write a design spec for this feature."
- "Audit this design for accessibility."
- "Create personas for our users."

Ambiguous:
- "Help the engineers understand this design." (clarify whether dev handoff documentation, a design spec, or a meeting is needed)
