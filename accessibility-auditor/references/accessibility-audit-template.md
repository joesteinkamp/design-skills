# Accessibility Audit Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Target | yes | text | screens, components, or flows audited |
> | Conformance level | yes | enum | A / AA / AAA |
> | Assistive technology considerations | yes | text | list relevant AT |
> | Audit method | yes | enum | design review / code review / manual testing / automated |
> | Date | yes | text | valid date |
> | Total criteria evaluated | yes | number | positive integer |
> | Pass | yes | number | positive integer |
> | Fail | yes | number | positive integer |
> | Not applicable | yes | number | non-negative integer |
> | Conformance level achieved | yes | enum | A / AA / AAA / none |
> | By Principle | yes | table | rows for Perceivable, Operable, Understandable, Robust with Pass/Fail/N/A counts |
> | Finding | yes | list | min 1 finding |
> | Finding > WCAG Criterion | yes | text | must reference specific WCAG criterion number |
> | Finding > Level | yes | enum | A / AA / AAA |
> | Finding > Status | yes | enum | fail / pass / partial |
> | Finding > Severity | yes | enum | critical / major / minor |
> | Finding > Affected element | yes | text | specific UI element or component |
> | Finding > Current behavior | yes | text | describe what happens now |
> | Finding > Expected behavior | yes | text | describe correct behavior |
> | Finding > Remediation | yes | text | actionable fix steps |
> | Finding > Effort | yes | enum | small / medium / large |
> | Must-Fix | yes | list | all conformance failures, min 0 items |
> | Should-Fix | no | list | best practice improvements |
> | Nice-to-Fix | no | list | enhancements |
> | Screen reader considerations | yes | text | min 1 sentence |
> | Keyboard navigation notes | yes | text | min 1 sentence |
> | Voice control considerations | no | text | if applicable |
> | Magnification considerations | no | text | if applicable |
> | Dev Remediation Handoff | yes | text | grouped by component or screen |

Use this as the default response structure for `accessibility-auditor`.

## Audit Scope

- Target: (screens, components, or flows audited)
- Conformance level: (A / AA / AAA)
- Assistive technology considerations:
- Audit method: (design review / code review / manual testing / automated)
- Date:

## Compliance Summary

- Total criteria evaluated:
- Pass:
- Fail:
- Not applicable:
- Conformance level achieved:

### By Principle
| Principle | Pass | Fail | N/A |
|-----------|------|------|-----|
| Perceivable | | | |
| Operable | | | |
| Understandable | | | |
| Robust | | | |

## Findings

For each finding:
- Finding:
  - WCAG Criterion:
  - Level: (A / AA / AAA)
  - Status: (fail / pass / partial)
  - Severity: (critical / major / minor)
  - Affected element:
  - Current behavior:
  - Expected behavior:
  - Remediation:
  - Effort: (small / medium / large)

## Remediation Priority List

### Must-Fix (conformance failures)
1. Issue:
   - Criterion:
   - Remediation:
   - Effort:

### Should-Fix (best practice)
1. Issue:
   - Recommendation:
   - Effort:

### Nice-to-Fix (enhancement)
1. Issue:
   - Recommendation:
   - Effort:

## Assistive Technology Notes

- Screen reader considerations:
- Keyboard navigation notes:
- Voice control considerations:
- Magnification considerations:

## Dev Remediation Handoff

Summary of findings formatted for engineering implementation, grouped by component or screen.

---

## Starter Example

Below is a concrete example of a completed finding. Use as a quality reference.

### Finding: Form inputs missing visible labels

- **WCAG Criterion:** 1.3.1 Info and Relationships (Level A)
- **Severity:** Must-fix (blocks assistive technology users)
- **Affected element:** Registration form — Email, Password, and Confirm Password fields
- **Current behavior:** Fields use placeholder text ("Email address", "Password", "Confirm password") as the only label. When the user begins typing, the placeholder disappears and the field has no visible label. Screen readers announce "edit text, blank" for each field.
- **Expected behavior:** Each field has a persistent visible `<label>` element associated via `for`/`id` attributes. The label remains visible above the field when the user types.
- **Remediation:**
  1. Add a `<label>` element above each input with descriptive text.
  2. Associate each label with its input using matching `for` and `id` attributes.
  3. Keep placeholder text as supplementary hint if needed, but never as the sole label.
  4. Test with VoiceOver (macOS) and NVDA (Windows) to confirm label announcement.
- **Effort:** Small (HTML/CSS change, no logic change)
- **Reference:** See `references/remediation-patterns.md` → Forms & Inputs → Missing labels

### Assistive Technology Notes Example

| AT | Test Result | Notes |
|----|-------------|-------|
| VoiceOver (macOS + Safari) | Fail | Fields announced as "edit text, blank" — no label read. Focus order correct. |
| NVDA (Windows + Chrome) | Fail | Same issue — "edit, blank" announced. |
| Keyboard only | Pass | All fields reachable via Tab. Focus ring visible. Submit via Enter works. |
| Zoom 200% | Pass | Layout reflows correctly. No horizontal scroll. Labels (once added) will remain visible. |
