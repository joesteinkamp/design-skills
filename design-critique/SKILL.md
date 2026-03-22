---
name: design-critique
description: "Facilitate structured design critiques producing actionable, severity-ranked feedback across usability, visual, content, consistency, and accessibility lenses. Use when requests involve design review, design feedback, or critique sessions for your team's work — not heuristic scoring, not WCAG auditing, not candidate evaluation."
---

# Design Critique

## Overview

Use this skill to produce structured, actionable design critiques. Accepts design descriptions, screenshots, specs (from `$design-spec-writer`), or prototypes and produces severity-ranked feedback across multiple evaluation lenses.

The output should be constructive and specific: every concern comes with a recommendation, and strengths are acknowledged alongside issues. Output is formatted for use in Figma comments, Notion, or Loom script. When the target format is specified, adapt the critique structure accordingly.

## Workflow

1. Establish context.
- Identify what is being critiqued (screen, flow, component, prototype).
- Clarify design goals and target persona.
- Determine design stage: concept, mid-fi, hi-fi, or pre-ship.
- Adjust critique depth to match the stage (concepts get directional feedback, pre-ship gets detailed findings).

2. Apply evaluation lenses using the Ladder of Feedback method.
- Follow the canonical sequence: Clarify → Value → Concern → Suggest.
- **Clarify:** Ask what is unclear about the design intent before judging.
- **Value:** Name what works well and why — be specific about the principle it satisfies.
- **Concern:** State concerns as questions ("I wonder if..." / "Have you considered...") with evidence.
- **Suggest:** Offer concrete alternatives, not vague direction.
- Use `references/critique-rubric.md` for the full lens set.
- Evaluate across: user goals, interaction clarity, visual hierarchy, design system consistency, content quality, edge cases, emotional tone.
- Note both strengths and weaknesses per lens.

3. Classify feedback.
- Tag each finding as praise, concern, or blocker.
- Rate severity: critical, major, minor, or nit.
- Categorize: usability, visual, content, consistency, or accessibility.
- Reference the specific evaluation lens and principle.

4. Generate recommendations.
- Provide a specific, actionable recommendation for each concern and blocker.
- Reference design principles or heuristics when relevant.
- Estimate effort for priority actions.

5. Format output.
- Use `references/critique-output-template.md` for the response structure.
- Lead with an executive summary before detailed findings.
- End with open questions that help the designer think further.

## Output Contract

Always return sections in this order:
- `Critique Context`
- `Executive Summary`
- `Findings`
- `What Works Well`
- `Priority Actions`
- `Open Questions for Designer`

## Quality Bar

Revise before finalizing if any of these are true:
- Any concern lacks a specific, implementable recommendation (not "improve this" but "replace the icon-only button with an icon+label button to satisfy Fitts's Law").
- Severity ratings are inconsistent (e.g., a missing error state rated as "minor" while a color nit is rated "major").
- Critique contains zero praise items — every critique must acknowledge at least 2 strengths.
- Feedback references a principle without naming it (not "this feels off" but "this violates the principle of progressive disclosure because...").
- Edge cases (empty state, error state, loading state) are not evaluated for any interactive component.
- Accessibility is not mentioned in any finding.
- Critique depth does not match design stage — concept critiques should not nitpick pixel alignment; pre-ship critiques should not question overall direction.

## Reference Navigation

Read only what is needed:
- evaluation lenses and severity scale: `references/critique-rubric.md`
- critique output shell: `references/critique-output-template.md`

## Trigger Examples

Positive:
- "Review this design and give me structured feedback."
- "Critique the checkout flow — focus on usability and edge cases."
- "What are the biggest issues with this hi-fi mockup?"

Negative:
- "Evaluate this dashboard against Nielsen's heuristics." (use `$heuristic-evaluator` — heuristic scoring, not open-ended critique)
- "Audit this design for WCAG compliance." (use `$accessibility-auditor` — standards-based audit, not design critique)
- "Review this candidate's portfolio." (use `$portfolio-reviewer` — candidate evaluation, not team design feedback)
- "Write a design spec for this feature." (use `$design-spec-writer`)
- "Map the user journey for onboarding." (use `$journey-mapper`)

Ambiguous:
- "Is this design good?" (clarify design goals, target persona, and stage to provide structured critique)
- "Review this design for usability." (clarify: do you want broad design feedback, a heuristic evaluation with scores, or an accessibility audit?)
