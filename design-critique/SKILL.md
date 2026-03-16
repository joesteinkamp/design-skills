---
name: design-critique
description: "Facilitate structured design critiques producing actionable, severity-ranked feedback across usability, visual, content, consistency, and accessibility lenses. Use when requests involve design review, design feedback, critique sessions, or evaluating design quality."
---

# Design Critique

## Overview

Use this skill to produce structured, actionable design critiques. Accepts design descriptions, screenshots, specs (from `$design-spec-writer`), or prototypes and produces severity-ranked feedback across multiple evaluation lenses.

The output should be constructive and specific: every concern comes with a recommendation, and strengths are acknowledged alongside issues.

## Workflow

1. Establish context.
- Identify what is being critiqued (screen, flow, component, prototype).
- Clarify design goals and target persona.
- Determine design stage: concept, mid-fi, hi-fi, or pre-ship.
- Adjust critique depth to match the stage (concepts get directional feedback, pre-ship gets detailed findings).

2. Apply evaluation lenses.
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
- Findings lack specific recommendations.
- Severity ratings are missing or inconsistent.
- Critique is purely negative with no acknowledgment of strengths.
- Feedback is vague ("this could be better") rather than specific.
- Critique depth does not match the design stage.
- Accessibility is not considered.

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
- "Write a design spec for this feature."
- "Map the user journey for onboarding."
- "Create a dev handoff document."

Ambiguous:
- "Is this design good?" (clarify design goals, target persona, and stage to provide structured critique)
