---
name: dev-handoff-writer
description: "Generate complete design-to-developer handoff documentation -- component specs, states, responsive behavior, edge cases, and implementation checklists. Use when requests involve dev handoff, engineering handoff, implementation specs, or translating design specs into developer-ready documentation."

# Discovery & Auto-Selection
category: documentation
tags: [handoff, implementation, components, responsive, developer-docs]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer, accessibility-auditor]
downstream_skills: []

# Input Contract
inputs:
  - name: design_spec
    required: true
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with user stories, interaction details, and states"
  - name: accessibility_findings
    required: false
    type: accessibility_findings
    source_skill: accessibility-auditor
    description: "Accessibility audit findings with remediation guidance"

# Output Contract
outputs:
  - name: dev_handoff
    type: dev_handoff
    template: references/dev-handoff-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_spec
  parallelizable: true
---

# Dev Handoff Writer

## Overview

Use this skill to produce developer-ready handoff documentation from design specs. Accepts design specs (from `$design-spec-writer`), accessibility findings (from `$accessibility-auditor`), or direct design descriptions and produces detailed implementation documentation.

The output should be engineering-ready: component specs with all states, responsive behavior at every breakpoint, edge cases with expected behavior, and a verification checklist. Output is formatted for use in Figma Dev Mode, Storybook, Zeplin, or as structured markdown in Notion or Linear. When the target tool is specified, adapt the component spec format and token references accordingly.

## Workflow

### Step 1: Gather inputs
- **Reads:** design_spec, accessibility_findings (if provided)
- **Actions:**
  - Accept design spec handoff from `$design-spec-writer` using the dev-handoff-schema.
  - Incorporate accessibility findings from `$accessibility-auditor` if available.
  - Identify design system references and tokens.
  - Determine engineering audience (frontend, backend, fullstack, mobile).
- **Produces:** Populated `Handoff Overview` section

### Step 2: Document components
- **Reads:** Step 1 output
- **Actions:**
  - Inventory all components in the feature.
  - For each component: name, design system token, variants, properties.
  - Use `references/component-spec-template.md` for detailed component specs when needed.
- **Produces:** Populated `Component Inventory` section
- **References:** `references/component-spec-template.md`

### Step 3: Specify all states and behaviors
- **Reads:** Step 2 component inventory
- **Actions:**
  - Document every state: default, hover, focus, active, disabled, error, loading, empty.
  - Specify transitions: from-state, to-state, duration, easing, property.
  - Document interaction flows with triggers, steps, and outcomes.
  - Include keyboard and screen reader equivalents for every interaction.
- **Produces:** Populated `Interaction Specs` section

### Step 4: Detail responsive and edge cases
- **Reads:** Step 3 interaction specs
- **Actions:**
  - Specify layout at each breakpoint (desktop, tablet, mobile).
  - Document overflow, truncation, and min/max rules.
  - List data edge cases: zero items, one item, max items, long text, missing data, offline.
- **Produces:** Populated `Responsive Behavior` and `Content & Edge Cases` sections

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/dev-handoff-template.md` for the response structure.
  - Include `references/implementation-checklist.md` as the verification checklist.
  - Ensure every component has all states documented.
- **Produces:** Complete handoff with all required sections
- **References:** `references/dev-handoff-template.md`, `references/implementation-checklist.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Handoff Overview | yes | - | key-value fields: feature name, engineering audience, design system references, dependencies |
| Component Inventory | yes | 1 component | component cards with name, design system token, variants, properties |
| Interaction Specs | yes | 1 component | state table per component (default, hover, focus, active, disabled, error, loading, empty) with transitions |
| Responsive Behavior | yes | 3 breakpoints | layout spec per breakpoint (desktop >=1024px, tablet 768-1023px, mobile <768px) |
| Content & Edge Cases | yes | 3 entries | edge case entries: zero items, one item, max items, long text, missing data, offline |
| Accessibility Requirements | yes | 1 component | keyboard interaction pattern and ARIA roles per interactive component |
| Implementation Checklist | yes | 1 item | checklist items referencing specific components or interactions from this handoff |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Component Inventory | Any component is missing at least 5 of these states: default, hover, focus, active, disabled, error, loading, empty | blocker |
| QB-02 | Responsive Behavior | Responsive behavior does not specify layout at all 3 breakpoints (desktop >=1024px, tablet 768-1023px, mobile <768px) | blocker |
| QB-03 | Interaction Specs | Any transition is missing from-state, to-state, duration, and easing values | blocker |
| QB-04 | Content & Edge Cases | Edge cases section has fewer than 3 entries for a data-driven component (zero items, one item, max items, long text, missing data) | warning |
| QB-05 | Accessibility Requirements | Accessibility requirements do not include keyboard interaction pattern and ARIA roles for interactive components | blocker |
| QB-06 | Implementation Checklist | Implementation checklist is generic -- every checklist item must reference a specific component or interaction from this handoff | warning |
| QB-07 | Component Inventory | Design system tokens (color, spacing, typography) are described with raw values ("16px", "#333") instead of token names ("spacing-4", "text-primary") | blocker |

## Reference Navigation

Read only what is needed:
- handoff output shell: `references/dev-handoff-template.md`
- detailed component specs: `references/component-spec-template.md`
- verification checklist: `references/implementation-checklist.md`

## Trigger Examples

### Positive
Intents: [create_handoff, write_dev_docs, spec_components, document_implementation, prepare_for_engineering]

- "Create a dev handoff doc for the new checkout flow."
- "Write implementation specs for these design components."
- "Translate this design spec into developer documentation."

### Negative
- "Write a design spec with user stories and acceptance criteria." -> `$design-spec-writer`
- "Spec out the interaction details and edge cases." -> `$design-spec-writer`
- "Audit this design for accessibility." -> `$accessibility-auditor`
- "Create personas for our users." -> `$persona-creator`

### Ambiguous
- "Help the engineers understand this design." (clarify: do you want implementation-ready handoff docs with component specs, or a design spec capturing intent and requirements?)
- "Document this feature." (clarify: design-level spec or developer-level handoff?)
