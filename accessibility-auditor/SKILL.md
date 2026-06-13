---
name: accessibility-auditor
description: "Audit designs and specs for WCAG compliance, producing prioritized issues with remediation guidance. Use when requests involve accessibility audits, WCAG compliance checks, a11y reviews, or evaluating designs for assistive technology compatibility."

# Discovery & Auto-Selection
category: evaluation
tags: [accessibility, wcag, a11y, compliance, assistive-technology, remediation]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer]
downstream_skills: [dev-handoff-writer]

# Input Contract
inputs:
  - name: design_screens
    required: true
    type: text
    description: "Screen descriptions, design specs, component inventories, or flow descriptions to audit"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with interaction details and component states"

# Output Contract
outputs:
  - name: accessibility_audit
    type: accessibility_findings
    template: references/accessibility-audit-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_screens
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_design_context, get_screenshot]
    when: "Extracting colors and fonts for contrast checking; capturing screen screenshots"
  - name: chrome
    actions: [run_lighthouse, run_axe]
    when: "Running automated accessibility scans on live URLs"
  - name: linear
    actions: [create_ticket]
    when: "Creating remediation tickets from must-fix findings"
  - name: google_sheets
    actions: [create_spreadsheet, export_data]
    when: "Exporting findings matrix to a spreadsheet"
  - name: notion
    actions: [publish_report]
    when: "Publishing audit report as a Notion page"

# User Input Gates
user_inputs:
  - step: 1
    question: "Which screens to audit?"
    required: true
  - step: 1
    question: "WCAG level: A, AA, or AAA?"
    required: true
    options: [A, AA, AAA]
    default: AA
  - step: 1
    question: "Figma URL or live URL?"
    required: false
  - step: 3
    question: "Found [N] issues. Create Linear tickets for must-fix items?"
    required: false
    default: false
---

# Accessibility Auditor

## Overview

Use this skill to audit designs, specs, or implementations for accessibility compliance. Accepts screen descriptions, design specs (from `$design-spec-writer`), component inventories, or flow descriptions and produces structured findings with remediation guidance.

The output should be actionable for both designers and developers: issues are severity-ranked, and every finding includes a specific remediation path. Output is formatted for use alongside axe DevTools, Stark (Figma plugin), WAVE, or Lighthouse. When the target tool is specified, reference its finding format and severity conventions.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Extract color pairs and font sizes for contrast ratio computation via get_design_context; capture screen screenshots via get_screenshot | User provides color values and font sizes manually; flag unverifiable items |
| **Chrome** | Run Lighthouse and axe automated accessibility scans on live URLs | Manual review only; flag that automated scan results are missing |
| **Linear** | Create remediation tickets from must-fix findings with severity and effort estimates | Output remediation list as markdown; user creates tickets manually |
| **Google Sheets** | Export findings matrix as a spreadsheet for tracking and reporting | Output findings as a markdown table; user creates spreadsheet manually |
| **Notion** | Publish audit report as a Notion page for team access | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Define scope
- **Reads:** design_screens, design_spec (if provided)
- **Ask user:** "Which screens to audit?" — specify screens, components, or flows to include.
- **Ask user:** "WCAG level: A, AA, or AAA?" — Default: AA. Sets conformance target.
- **Ask user:** "Figma URL or live URL?" — determines audit method.
- **Actions:**
  - Identify what is being audited (screens, components, flows).
  - Set conformance target: WCAG 2.2 Level A, AA, or AAA.
  - Note assistive technology considerations (screen reader, keyboard, voice control, magnification).
  - Determine audit method: design review, code review, manual testing, or automated scan.
- **If** Figma URL provided → auto-extract color pairs and font sizes for contrast computation via get_design_context.
- **Tool action — Figma (if available and Figma URL provided):**
  - Extract color tokens, font sizes, and component properties via get_design_context.
  - Capture screenshots of screens under audit via get_screenshot.
- **If** live URL provided → plan Chrome automated scan + manual review.
- **Tool action — Chrome (if available and live URL provided):**
  - Run Lighthouse accessibility audit on the live URL.
  - Run axe-core scan for detailed WCAG criterion-level findings.
- **If** neither Figma nor live URL → rely on described values and manual review; flag items as unverifiable where color/contrast cannot be confirmed.
- **Produces:** Populated `Audit Scope` section

### Step 2: Evaluate against WCAG criteria
- **Reads:** Step 1 scope, design_screens
- **Actions:**
  - Use `references/wcag-checklist.md` to systematically evaluate applicable criteria.
  - Organize evaluation by WCAG principle: perceivable, operable, understandable, robust.
  - Document pass, fail, partial, and not-applicable for each criterion.
  - Note the specific element and behavior for each finding.
- **Produces:** Populated `Compliance Summary` section
- **References:** `references/wcag-checklist.md`

### Step 3: Document findings and create tickets
- **Reads:** Step 2 evaluation results
- **Ask user:** "Found [N] issues. Create Linear tickets for must-fix items?" — Default: output as markdown.
- **Actions:**
  - Record WCAG criterion, severity, affected element, current vs. expected behavior.
  - Provide specific remediation guidance using `references/remediation-patterns.md` for common fixes.
  - Estimate effort for each remediation.
- **Tool action — Linear (if available and user confirms):**
  - Create remediation tickets for each must-fix finding with WCAG criterion, severity, affected element, and remediation steps.
  - Include effort estimates in ticket descriptions.
- **If** Linear unavailable → output remediation list as a prioritized markdown checklist.
- **Checkpoint:** "Here are the [N] findings organized by severity. Any screens or components I should look at more closely?"
- **Produces:** Populated `Findings` section
- **References:** `references/remediation-patterns.md`

### Step 4: Prioritize
- **Reads:** Step 3 findings
- **Actions:**
  - Must-fix: conformance failures that block access.
  - Should-fix: best practices that significantly improve the experience.
  - Nice-to-fix: enhancements that polish the accessible experience.
- **Produces:** Populated `Remediation Priority List` section

### Step 5: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/accessibility-audit-template.md` for the response structure.
  - Include compliance summary with pass/fail counts.
  - Add assistive technology notes for screen reader, keyboard, voice, and magnification users.
- **Tool action — Google Sheets (if available):**
  - Export findings matrix as a spreadsheet with columns: WCAG criterion, severity, element, current behavior, expected behavior, remediation, effort, status.
- **Tool action — Notion (if available):**
  - Publish audit report as a Notion page for team access.
- **If** no publishing tools available → output as complete markdown.
- **Next steps:** Based on output, suggest:
  - "Use `$dev-handoff-writer` to embed ARIA requirements and keyboard patterns into the engineering handoff."
  - "After remediation, re-run this audit to verify fixes."
  - "If design changes are needed, update the spec via `$design-spec-writer`."
  - "To generate alt text and ARIA labels for images and icons flagged here, use `$alt-text-generator`."
- **Produces:** Complete audit with all required sections including `Assistive Technology Notes` and optional `Dev Remediation Handoff`
- **References:** `references/accessibility-audit-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Audit Scope | yes | - | key-value fields: screens/components audited, conformance target, audit method, AT considerations |
| Compliance Summary | yes | - | pass/fail/partial/NA counts by WCAG principle |
| Findings | yes | 1 finding | finding cards with WCAG criterion, severity, element, current vs. expected behavior, remediation |
| Remediation Priority List | yes | 1 item | priority-ranked list: must-fix, should-fix, nice-to-fix with effort estimates |
| Assistive Technology Notes | yes | 3 AT types | notes for screen reader, keyboard, and at least one additional AT |
| Dev Remediation Handoff | no | - | implementation-ready remediation details for engineering |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Findings | Every finding includes its WCAG criterion reference number (e.g., "1.4.3 Contrast (Minimum)") | blocker |
| QB-02 | Findings | Remediation guidance specifies the exact fix, not generic advice like "make it accessible" or "fix the contrast" | blocker |
| QB-03 | Findings | Severity ratings are consistent — a missing form label (blocks screen reader users) must be rated higher than a low-contrast decorative element | blocker |
| QB-04 | Compliance Summary | Pass/fail counts match the sum of individual findings | blocker |
| QB-05 | Assistive Technology Notes | Every audit addresses screen reader, keyboard, and at least one additional AT (voice control, magnification, or switch access) | blocker |
| QB-06 | Audit Scope | Conformance level target (A, AA, or AAA) is stated | blocker |
| QB-07 | Remediation Priority List | Every must-fix finding includes an effort estimate (small / medium / large) | warning |
| QB-08 | Findings | Common fixes cite `references/remediation-patterns.md` for consistency | warning |

## Reference Navigation

Read only what is needed:
- WCAG criteria by principle: `references/wcag-checklist.md`
- audit output shell: `references/accessibility-audit-template.md`
- common fixes reference: `references/remediation-patterns.md`

## Trigger Examples

### Positive
Intents: [audit_accessibility, check_wcag, review_a11y, evaluate_assistive_technology, assess_compliance]

- "Audit this design for WCAG AA compliance."
- "Check these components for accessibility issues."
- "What accessibility problems does this flow have?"

### Negative
- "Evaluate this dashboard against Nielsen's heuristics." -> `$heuristic-evaluator`
- "Give me feedback on this design." -> `$design-critique`
- "Write a design spec for the settings page." -> `$design-spec-writer`
- "Do a competitive analysis of checkout flows." -> `$competitive-analyzer`

### Ambiguous
- "Is this design accessible?" (clarify conformance level target and which screens/components to audit)
- "Review this design for usability." (clarify: do you want an accessibility audit, heuristic evaluation, or broad design critique?)
