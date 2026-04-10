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
---

# Accessibility Auditor

## Overview

Use this skill to audit designs, specs, or implementations for accessibility compliance. Accepts screen descriptions, design specs (from `$design-spec-writer`), component inventories, or flow descriptions and produces structured findings with remediation guidance.

The output should be actionable for both designers and developers: issues are severity-ranked, and every finding includes a specific remediation path. Output is formatted for use alongside axe DevTools, Stark (Figma plugin), WAVE, or Lighthouse. When the target tool is specified, reference its finding format and severity conventions.

## Workflow

### Step 1: Define scope
- **Reads:** design_screens, design_spec (if provided)
- **Actions:**
  - Identify what is being audited (screens, components, flows).
  - Set conformance target: WCAG 2.2 Level A, AA, or AAA.
  - Note assistive technology considerations (screen reader, keyboard, voice control, magnification).
  - Determine audit method: design review, code review, manual testing, or automated scan.
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

### Step 3: Document findings
- **Reads:** Step 2 evaluation results
- **Actions:**
  - Record WCAG criterion, severity, affected element, current vs. expected behavior.
  - Provide specific remediation guidance using `references/remediation-patterns.md` for common fixes.
  - Estimate effort for each remediation.
- **Produces:** Populated `Findings` section
- **References:** `references/remediation-patterns.md`

### Step 4: Prioritize
- **Reads:** Step 3 findings
- **Actions:**
  - Must-fix: conformance failures that block access.
  - Should-fix: best practices that significantly improve the experience.
  - Nice-to-fix: enhancements that polish the accessible experience.
- **Produces:** Populated `Remediation Priority List` section

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/accessibility-audit-template.md` for the response structure.
  - Include compliance summary with pass/fail counts.
  - Add assistive technology notes for screen reader, keyboard, voice, and magnification users.
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
