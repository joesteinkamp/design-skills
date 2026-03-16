---
name: accessibility-auditor
description: "Audit designs and specs for WCAG compliance, producing prioritized issues with remediation guidance. Use when requests involve accessibility audits, WCAG compliance checks, a11y reviews, or evaluating designs for assistive technology compatibility."
---

# Accessibility Auditor

## Overview

Use this skill to audit designs, specs, or implementations for accessibility compliance. Accepts screen descriptions, design specs (from `$design-spec-writer`), component inventories, or flow descriptions and produces structured findings with remediation guidance.

The output should be actionable for both designers and developers: issues are severity-ranked, and every finding includes a specific remediation path.

## Workflow

1. Define scope.
- Identify what is being audited (screens, components, flows).
- Set conformance target: WCAG 2.2 Level A, AA, or AAA.
- Note assistive technology considerations (screen reader, keyboard, voice control, magnification).
- Determine audit method: design review, code review, manual testing, or automated scan.

2. Evaluate against WCAG criteria.
- Use `references/wcag-checklist.md` to systematically evaluate applicable criteria.
- Organize evaluation by WCAG principle: perceivable, operable, understandable, robust.
- Document pass, fail, partial, and not-applicable for each criterion.
- Note the specific element and behavior for each finding.

3. Document findings.
- Record WCAG criterion, severity, affected element, current vs. expected behavior.
- Provide specific remediation guidance using `references/remediation-patterns.md` for common fixes.
- Estimate effort for each remediation.

4. Prioritize.
- Must-fix: conformance failures that block access.
- Should-fix: best practices that significantly improve the experience.
- Nice-to-fix: enhancements that polish the accessible experience.

5. Format output.
- Use `references/accessibility-audit-template.md` for the response structure.
- Include compliance summary with pass/fail counts.
- Add assistive technology notes for screen reader, keyboard, voice, and magnification users.

## Output Contract

Always return sections in this order:
- `Audit Scope`
- `Compliance Summary`
- `Findings`
- `Remediation Priority List`
- `Assistive Technology Notes`
- `Dev Remediation Handoff` (optional, include when engineering implementation is next)

## Quality Bar

Revise before finalizing if any of these are true:
- Findings lack WCAG criterion references.
- Remediation guidance is vague ("make it accessible") rather than specific.
- Severity ratings are missing or inconsistent.
- Compliance summary does not match the detailed findings.
- Assistive technology considerations are ignored.
- Conformance level target is not stated.

## Reference Navigation

Read only what is needed:
- WCAG criteria by principle: `references/wcag-checklist.md`
- audit output shell: `references/accessibility-audit-template.md`
- common fixes reference: `references/remediation-patterns.md`

## Trigger Examples

Positive:
- "Audit this design for WCAG AA compliance."
- "Check these components for accessibility issues."
- "What accessibility problems does this flow have?"

Negative:
- "Write a design spec for the settings page."
- "Create a persona for our users."
- "Do a competitive analysis of checkout flows."

Ambiguous:
- "Is this design accessible?" (clarify conformance level target and which screens/components to audit)
