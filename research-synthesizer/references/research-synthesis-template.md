# Research Synthesis Template

Use this as the default response structure for `research-synthesizer`.

## Research Overview

- Study title:
- Research type: (generative / evaluative / survey / diary / mixed)
- Research questions:
- Participant count:
- Participant segments:
- Date range:
- Methods used:
- Key limitations:

## Themes & Evidence

For each theme:
- Theme name:
- Description:
- Frequency: (how many participants/sources)
- Severity: (critical / high / moderate / low)
- Segments affected:
- Supporting evidence:
  - Quote/observation 1:
  - Quote/observation 2:
  - Quote/observation 3:

## Insights

For each insight:
- Insight name:
- Summary:
- Impact: (high / medium / low)
- Confidence: (high / medium / low)
- Supporting themes:
- Key quotes/data:

## Recommendations

For each recommendation:
- Recommendation:
- Rationale:
- Priority: (must-do / should-do / could-do)
- Design action:
- Downstream skill target: (e.g., $persona-creator, $journey-mapper, $design-spec-writer)

## Research Gaps & Next Steps

- Gap 1:
  - What we don't know:
  - Suggested method:
  - Priority:

## Downstream Handoff

Produce this section using `research-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of a completed theme and insight. Use this as a quality reference.

### Theme: Trust Erosion at Data Entry Points

**Frequency:** 9 of 12 participants
**Severity:** High — users abandoned the flow when trust dropped
**Affected segments:** New users, privacy-conscious users

**Observations:**
- P2: Hesitated 45 seconds before entering phone number. Asked "Why do they need this?"
- P5: Typed a fake email first, then corrected it after seeing the verification step.
- P7: "I always put fake info the first time to see what happens."
- P9: Left the tab open for 3 days before completing registration.
- P11: Looked for a privacy policy link, couldn't find one, continued anyway but said "I don't love this."

**Insight: Users treat data entry fields as trust checkpoints, not form completions.**
- Summary: Users pause at each personally-identifiable field to assess whether the value exchange is worth the risk. The absence of context (why data is needed, how it will be used) triggers avoidance behaviors ranging from fake data entry to multi-day abandonment.
- Impact: High
- Confidence: High (consistent across 9 of 12 participants, observed in both moderated and unmoderated sessions)
- Supporting evidence: 5 direct quotes, 3 behavioral observations, 2 diary entries

**Recommendation:** Add inline trust signals at each PII field explaining why the data is needed and how it will be used. Feed into `$design-spec-writer` for field-level microcopy specs.
