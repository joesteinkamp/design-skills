---
name: heuristic-evaluator
description: "Evaluate interfaces against usability heuristics (Nielsen's 10 by default), producing scored assessments with severity-ranked findings and concrete fix recommendations. Use when requests involve heuristic evaluation, usability review, UX scoring, or systematic interface assessment."
---

# Heuristic Evaluator

## Overview

Use this skill to evaluate interfaces systematically against established usability heuristics. Accepts screen descriptions, design specs (from `$design-spec-writer`), prototypes, or flow descriptions and produces scored assessments per heuristic with severity-ranked findings.

The output should be rigorous and actionable: every heuristic gets a score, every violation has a severity rating, and the top fixes are prioritized by impact.

## Workflow

1. Define scope.
- Identify what is being evaluated (screens, flows, components).
- Select heuristic set: Nielsen's 10 (default), extended, or custom.
- Determine evaluation depth: quick scan or deep evaluation.
- Note platform and user context.

2. Evaluate per heuristic.
- Use `references/heuristic-definitions.md` for heuristic definitions and key indicators.
- Assess compliance for each heuristic.
- Document violations with severity (0-4 scale), location, and evidence.
- Note positive patterns where heuristics are well-satisfied.

3. Score and rank.
- Assign a score (0-4) per heuristic based on worst violation severity.
- Calculate overall score.
- Build severity matrix showing violation counts by severity level.
- Identify top 3 most impactful violations.

4. Generate recommendations.
- Provide a concrete fix for each violation.
- Include rationale explaining why the fix improves usability.
- Estimate effort for top priority fixes.

5. Format output.
- Use `references/heuristic-eval-template.md` for the response structure.
- Lead with the scorecard for quick scanning.
- Highlight positive patterns alongside violations.

## Output Contract

Always return sections in this order:
- `Evaluation Scope`
- `Scorecard`
- `Findings`
- `Severity Matrix`
- `Top 3 Priority Fixes`
- `Positive Patterns`

## Quality Bar

Revise before finalizing if any of these are true:
- Any heuristic is missing from the scorecard.
- Violations lack severity ratings or evidence.
- Recommendations are generic rather than specific to the finding.
- Top 3 fixes are not clearly the highest-impact items.
- Positive patterns are not acknowledged.
- Severity matrix does not match individual findings.

## Reference Navigation

Read only what is needed:
- heuristic definitions and severity scale: `references/heuristic-definitions.md`
- evaluation output shell: `references/heuristic-eval-template.md`

## Trigger Examples

Positive:
- "Evaluate this dashboard against Nielsen's heuristics."
- "Do a heuristic evaluation of the onboarding flow."
- "Score this design on usability heuristics."

Negative:
- "Audit this design for WCAG compliance."
- "Write a design spec for this feature."
- "Compare this product against competitors."

Ambiguous:
- "Review this design for usability." (clarify whether heuristic evaluation, design critique, or accessibility audit is needed)
