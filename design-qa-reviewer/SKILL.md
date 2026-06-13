---
name: design-qa-reviewer
description: "Compare a built/implemented UI against the design source of truth (Figma frame or design spec) and produce a severity-ranked redline punch-list of deviations across spacing, color, typography, component states, copy, and responsive behavior. Use when requests involve design QA, redlining an implementation, or catching where the build drifts from the design — not subjective design feedback (-> $design-critique), not heuristic scoring (-> $heuristic-evaluator), not WCAG auditing (-> $accessibility-auditor), not writing the spec itself (-> $design-spec-writer)."

# Discovery & Auto-Selection
category: evaluation
tags: [design-qa, redline, visual-regression, implementation-review, pixel-perfect, ship-readiness]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer, dev-handoff-writer]
downstream_skills: [dev-handoff-writer]

# Input Contract
inputs:
  - name: built_ui
    required: true
    type: text
    description: "Screenshot or URL of the implemented UI to QA"
  - name: design_reference
    required: true
    type: text
    description: "Figma URL, design spec, or reference screenshot serving as the source of truth"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with tokens, spacing, type, and interaction details"

# Output Contract
outputs:
  - name: qa_punch_list
    type: qa_punch_list
    template: references/qa-punch-list-template.md
  - name: qa_handoff
    required: false
    schema: references/qa-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: built_ui
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_design_context, get_screenshot]
    when: "Pulling the source-of-truth tokens, spacing, and type from the design for exact comparison"
  - name: chrome
    actions: [capture_screenshot, inspect_computed_styles]
    when: "Reading the built UI's actual rendered values"
  - name: linear
    actions: [create_issue]
    when: "Filing QA bugs with before/after for each deviation"
  - name: github
    actions: [create_issue]
    when: "Filing QA bugs with before/after when the team tracks work in GitHub"

# User Input Gates
user_inputs:
  - step: 1
    question: "What are we QA-ing — a screen, a component, or a flow?"
    required: true
  - step: 1
    question: "Figma URL (source of truth) and the built URL or screenshot?"
    required: true
  - step: 1
    question: "Tolerance: pixel-perfect or functional-parity?"
    options: [pixel-perfect, functional-parity]
    default: functional-parity
    required: true
  - step: 5
    question: "File deviations as tickets?"
    required: false
    default: false
---

# Design QA Reviewer

## Overview

Use this skill to run the tedious manual design-QA pass that normally happens by eye before ship. Accepts a built UI (screenshot or live URL) and a design source of truth (Figma frame, design spec from `$design-spec-writer`, or reference screenshot) and produces a severity-ranked redline punch-list of every deviation — spacing, color, typography, component states, copy, and responsive behavior.

The output should be precise and verifiable: every deviation cites both the design value and the built value (e.g., "padding: design 16px / built 12px") and points to a specific element. Output is formatted for use in Linear, GitHub, or a Figma comment thread. When the target tracker is specified, adapt the deviation format to that tool's issue structure.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Use get_design_context to pull source-of-truth tokens, spacing, and type values, and get_screenshot for the reference frame | Extract design values from the provided spec or reference screenshot; note that exact token values may be inferred rather than read |
| **Chrome** | Use capture_screenshot on the built UI and inspect_computed_styles to read actual rendered padding, color, font, and size values | Compare against the provided built screenshot; note that built values are read by eye, not from computed styles |
| **Linear** | Create QA bug issues from deviations with element, type, design value, built value, severity, and a before/after reference | Output ticket-ready deviation descriptions; user creates tickets manually |
| **GitHub** | Create QA bug issues from deviations with element, type, design value, built value, severity, and a before/after reference | Output ticket-ready deviation descriptions; user creates issues manually |

## Workflow

### Step 1: Establish source of truth, target, and tolerance
- **Reads:** built_ui, design_reference, design_spec (if provided)
- **Ask user:** "What are we QA-ing — a screen, a component, or a flow?" — sets the scope and how many states to check.
- **Ask user:** "Figma URL (source of truth) and the built URL or screenshot?" — establishes the two artifacts to diff.
- **Ask user:** "Tolerance: pixel-perfect or functional-parity?" — Default: functional-parity. Pixel-perfect logs sub-pixel and rounding deviations; functional-parity ignores deviations a user could not perceive.
- **Actions:**
  - Identify the target (screen, component, or flow) and its expected states.
  - Confirm which artifact is the source of truth and which is the build under review.
  - Set the tolerance threshold that governs what counts as a deviation.
- **Produces:** Populated `QA Context` section

### Step 2: Extract design values from the reference
- **Reads:** Step 1 context, design_reference, design_spec (if provided)
- **Actions:**
  - Pull the design tokens, spacing scale, typography, and color values for the target.
  - Record component states defined in the design (default, hover, focus, active, disabled, error, loading, empty).
  - Note responsive breakpoints and intended behavior at each.
- **If** a Figma URL is provided → read exact token, spacing, and type values from the design.
- **Tool action — Figma (if Figma URL provided):** Use get_design_context to pull tokens, spacing, and type, and get_screenshot to capture the reference frame for side-by-side comparison.
- **If** no Figma URL → extract design values from the spec or reference screenshot and flag inferred values.
- **Produces:** Design-value baseline used in Step 3 comparison
- **References:** `references/qa-punch-list-template.md`

### Step 3: Compare built vs design and capture static deviations
- **Reads:** Step 2 design baseline, built_ui
- **Actions:**
  - Diff the built UI against the design baseline for spacing, color, typography, and copy.
  - For each mismatch, record the element, deviation type, design value, and built value.
  - Apply the Step 1 tolerance — within functional-parity, skip imperceptible differences.
- **If** a built URL is provided → read actual rendered values rather than eyeballing the screenshot.
- **Tool action — Chrome (if built URL provided):** Use capture_screenshot to grab the built UI and inspect_computed_styles to read actual padding, margin, color, font-family, font-size, and line-height values for each element.
- **If** no built URL → compare against the provided screenshot and note that built values are read by eye.
- **Checkpoint:** "I've captured [N] static deviations across spacing, color, type, and copy. Ready to check interactive and responsive states?"
- **Produces:** Populated `Deviations` section (static entries)

### Step 4: Check interactive/state and responsive deviations
- **Reads:** Step 2 design states, Step 3 deviations
- **Actions:**
  - Check each component state the design defines (hover, focus, active, disabled, error, loading, empty) against the build.
  - Check responsive behavior at the design's breakpoints.
  - Flag intended responsive differences (e.g., a stacked mobile layout) as expected behavior, not as bugs.
  - Add interactive and responsive mismatches to the deviation set with design value and built value.
- **If** a built URL is provided → exercise the live states and breakpoints in Chrome rather than inferring from a static image.
- **Tool action — Chrome (if built URL provided):** Drive hover/focus/active/disabled states and resize across breakpoints, using inspect_computed_styles to read each state's actual values.
- **Produces:** Populated `State & Responsive Checks` section and state/responsive entries in `Deviations`

### Step 5: Classify severity, filter false positives, and format
- **Reads:** All previous step outputs
- **Ask user:** "File deviations as tickets?" — Default: no.
- **Actions:**
  - Assign each deviation a severity: blocker, major, minor, or nit.
  - Group deviations by type (spacing, color, type, state, copy, responsive).
  - Filter false positives — drop intentional responsive differences and anything inside the tolerance threshold, recording them under expected behavior.
  - Produce per-severity counts for the summary.
  - Use `references/qa-punch-list-template.md` for the response structure.
- **Tool action — Linear or GitHub (if available and user confirms):** Create a QA bug issue per deviation with element, type, design value, built value, severity, fix, and a before/after reference.
- **If** no tracker available → output ticket-ready deviation descriptions for manual creation.
- **Next steps:** Based on output, suggest:
  - "To hand the confirmed deviations back to engineering with full context, use `$dev-handoff-writer`."
  - "If the deviations are actually intentional design changes, update the source spec with `$design-spec-writer`."
  - "For subjective quality feedback beyond design-to-build fidelity, use `$design-critique`."
- **Produces:** Complete punch-list with all required sections including `Summary` and `Open Questions`
- **References:** `references/qa-punch-list-template.md`, `references/qa-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| QA Context | yes | - | key-value fields: target (screen/component/flow), source of truth, build under review, tolerance |
| Summary | yes | - | deviation counts by severity (blocker/major/minor/nit) with a one-line ship-readiness verdict |
| Deviations | yes | 1 deviation | cards grouped by type: element / type / design value / built value / severity / fix |
| State & Responsive Checks | yes | 1 check | per-state and per-breakpoint pass/fail with the value compared |
| Passed Checks | yes | 2 items | elements that match the design, plus intentional differences flagged as expected |
| Open Questions | yes | 1 question | ambiguities where it is unclear whether a difference is a bug or an intended change |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Deviations | Every deviation cites both the design value and the built value (e.g., "padding: design 16px / built 12px"), not just "spacing is off" | blocker |
| QB-02 | Deviations | Every deviation has a severity on the scale blocker / major / minor / nit | blocker |
| QB-03 | Deviations | Deviations are grouped by type (spacing, color, type, state, copy, responsive) | blocker |
| QB-04 | State & Responsive Checks | Interaction and state deviations are checked (hover, focus, disabled, error, loading, empty), not only static visuals | blocker |
| QB-05 | Passed Checks | Intentional responsive differences are flagged as expected behavior, not logged as deviations (false-positive guard) | blocker |
| QB-06 | Deviations | Every deviation references a specific location or element ("the primary CTA on the cart row", not "a button somewhere") | warning |
| QB-07 | Summary | Per-severity counts in the summary match the count of individual deviations | warning |

## Reference Navigation

Read only what is needed:
- punch-list output shell and field typing: `references/qa-punch-list-template.md`
- downstream handoff block: `references/qa-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [qa_design, redline_implementation, find_design_drift, check_pixel_fidelity, verify_build_against_design]

- "QA this built checkout page against the Figma."
- "Find where the implementation drifts from the design."
- "Redline the spacing and type on the live settings page."

### Negative
- "Give me subjective feedback on this design." -> `$design-critique`
- "Evaluate this against Nielsen's heuristics." -> `$heuristic-evaluator`
- "Audit this design for WCAG compliance." -> `$accessibility-auditor`
- "Write the design spec for this feature." -> `$design-spec-writer`

### Ambiguous
- "Review this implementation." (clarify: do you want a design-to-build fidelity QA, broad design critique, or a heuristic evaluation?)
- "Is this built correctly?" (clarify the source of truth, the build under review, and the tolerance — pixel-perfect or functional-parity?)
