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

# Tool Integration
tools:
  - name: figma
    actions: [get_design_context, get_screenshot]
    when: "Extracting design tokens, spacing, typography; capturing screenshots at breakpoints"
  - name: linear
    actions: [create_ticket]
    when: "Creating P0/P1/P2 implementation tickets per component"
  - name: github
    actions: [create_branch, create_pull_request]
    when: "Creating branch and PR template for implementation"
  - name: notion
    actions: [publish_doc]
    when: "Publishing handoff doc as a Notion page"

# User Input Gates
user_inputs:
  - step: 1
    question: "Target framework?"
    required: true
    options: [react, vue, swift, other]
  - step: 1
    question: "Design system?"
    required: false
  - step: 1
    question: "Figma URL for the designs?"
    required: false
  - step: 5
    question: "Want me to create Linear tickets? GitHub issues?"
    required: false
    default: false
---

# Dev Handoff Writer

## Overview

Use this skill to produce developer-ready handoff documentation from design specs. Accepts design specs (from `$design-spec-writer`), accessibility findings (from `$accessibility-auditor`), or direct design descriptions and produces detailed implementation documentation.

The output should be engineering-ready: component specs with all states, responsive behavior at every breakpoint, edge cases with expected behavior, and a verification checklist. Output is formatted for use in Figma Dev Mode, Storybook, Zeplin, or as structured markdown in Notion or Linear. When the target tool is specified, adapt the component spec format and token references accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Extract design tokens, spacing, and typography via get_design_context; capture screenshots at 3 breakpoints (desktop, tablet, mobile) via get_screenshot | User provides token values manually; reference design system docs |
| **Linear** | Create P0/P1/P2 implementation tickets per component with acceptance criteria | Output ticket specs as markdown checklist; user creates tickets manually |
| **GitHub / GitLab** | Create implementation branch and PR template with component checklist | Include branch naming convention and PR template in output |
| **Notion** | Publish handoff doc as a Notion page with linked component specs | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Gather inputs
- **Reads:** design_spec, accessibility_findings (if provided)
- **Ask user:** "Target framework?" — options: React, Vue, Swift, other. Determines component spec format.
- **Ask user:** "Design system?" — if specified, reference token names instead of raw values.
- **Ask user:** "Figma URL for the designs?" — enables auto-extraction of tokens and screenshots.
- **Actions:**
  - Accept design spec handoff from `$design-spec-writer` using the dev-handoff-schema.
  - Incorporate accessibility findings from `$accessibility-auditor` if available.
  - Identify design system references and tokens.
  - Determine engineering audience (frontend, backend, fullstack, mobile).
- **If** Figma URL provided → auto-extract design tokens, spacing, and typography via get_design_context.
- **Tool action — Figma (if available and URL provided):**
  - Extract color tokens, spacing values, typography scales, and component properties via get_design_context.
  - Capture screenshots at desktop (>=1024px), tablet (768-1023px), and mobile (<768px) via get_screenshot.
- **If** Figma unavailable → user provides token values; reference design system documentation.
- **If** design system specified → reference token names (e.g., "spacing-4", "text-primary") not raw values (e.g., "16px", "#333").
- **If** accessibility findings from `$accessibility-auditor` → embed ARIA requirements and keyboard interaction patterns per component.
- **Produces:** Populated `Handoff Overview` section

### Step 2: Document components
- **Reads:** Step 1 output
- **Actions:**
  - Inventory all components in the feature.
  - For each component: name, design system token, variants, properties.
  - Use `references/component-spec-template.md` for detailed component specs when needed.
- **Checkpoint:** "Component inventory lists [N] components. Any missing or out of scope?"
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

### Step 5: Format, publish, and create tickets
- **Reads:** All previous step outputs
- **Ask user:** "Want me to create Linear tickets? GitHub issues?" — Default: output as markdown.
- **Actions:**
  - Use `references/dev-handoff-template.md` for the response structure.
  - Include `references/implementation-checklist.md` as the verification checklist.
  - Ensure every component has all states documented.
- **Tool action — Linear (if available and user confirms):**
  - Create implementation tickets per component: P0 (core functionality), P1 (states and interactions), P2 (edge cases and polish).
  - Include acceptance criteria from component specs in each ticket.
- **Tool action — GitHub (if available and user confirms):**
  - Create implementation branch with naming convention: `feat/[feature-name]`.
  - Create PR template with component checklist from the handoff.
- **Tool action — Notion (if available):**
  - Publish handoff doc as a Notion page with linked component specs.
- **If** no ticketing tools available → output ticket specs as a prioritized markdown checklist.
- **Next steps:** Based on output, suggest:
  - "If accessibility requirements need deeper review, use `$accessibility-auditor`."
  - "If the design spec needs updates based on engineering feedback, use `$design-spec-writer`."
  - "Linear tickets are ready for sprint planning — prioritize P0 items first."
  - "Use `$ux-copy-writer` to finalize the microcopy referenced in this handoff."
  - "Use `$alt-text-generator` to produce alt text and ARIA labels for the images and icons."
  - "Once built, use `$design-qa-reviewer` to redline the implementation against the design."
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
| QB-01 | Component Inventory | Every component documents at least 5 of these states: default, hover, focus, active, disabled, error, loading, empty | blocker |
| QB-02 | Responsive Behavior | Responsive behavior specifies layout at all 3 breakpoints (desktop >=1024px, tablet 768-1023px, mobile <768px) | blocker |
| QB-03 | Interaction Specs | Every transition specifies from-state, to-state, duration, and easing values | blocker |
| QB-04 | Content & Edge Cases | Edge cases section has at least 3 entries for a data-driven component (zero items, one item, max items, long text, missing data) | warning |
| QB-05 | Accessibility Requirements | Accessibility requirements include keyboard interaction pattern and ARIA roles for interactive components | blocker |
| QB-06 | Implementation Checklist | Implementation checklist is specific -- every checklist item references a specific component or interaction from this handoff | warning |
| QB-07 | Component Inventory | Design system tokens (color, spacing, typography) are described with token names ("spacing-4", "text-primary"), not raw values ("16px", "#333") | blocker |

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
