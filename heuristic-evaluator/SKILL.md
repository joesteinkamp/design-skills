---
name: heuristic-evaluator
description: "Evaluate interfaces against usability heuristics (Nielsen's 10 by default), producing scored assessments with severity-ranked findings and concrete fix recommendations. Use when requests involve heuristic evaluation, usability review, UX scoring, or systematic interface assessment."
---

# Heuristic Evaluator

## Overview

Use this skill to evaluate interfaces systematically against established usability heuristics. Accepts screen descriptions, design specs (from `$design-spec-writer`), prototypes, or flow descriptions and produces scored assessments per heuristic with severity-ranked findings.

The output should be rigorous and actionable: every heuristic gets a score, every violation has a severity rating, and the top fixes are prioritized by impact. Output is formatted for use in Figma annotations, Notion, or Jira. When the target tool is specified, adapt the finding format for that tool's structure.

## Workflow

1. Define scope.
- Identify what is being evaluated (screens, flows, components).
- Select heuristic set: Nielsen's 10 (default), extended, or custom.
- Determine evaluation depth: quick scan or deep evaluation.
- Note platform and user context.

2. Evaluate per heuristic using Nielsen's 10 as the canonical baseline.
- Use `references/heuristic-definitions.md` for heuristic definitions and key indicators.
- Default to Nielsen's 10 Usability Heuristics:
  - H1: Visibility of system status
  - H2: Match between system and real world
  - H3: User control and freedom
  - H4: Consistency and standards
  - H5: Error prevention
  - H6: Recognition rather than recall
  - H7: Flexibility and efficiency of use
  - H8: Aesthetic and minimalist design
  - H9: Help users recognize, diagnose, and recover from errors
  - H10: Help and documentation
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
- Scorecard is missing any of the 10 heuristics (or any heuristic in the selected set).
- Any violation is missing a severity rating on the 0-4 scale (0=not a problem, 1=cosmetic, 2=minor, 3=major, 4=catastrophic).
- Any violation lacks a specific location reference ("the settings page" not "somewhere in the app").
- Recommendations are generic ("improve error handling") rather than specific ("add inline validation to the email field that shows the error before form submission").
- Top 3 fixes are not ranked by impact — the highest-severity, most-frequent violations should be first.
- Positive patterns section is empty — every evaluation must name at least 2 things done well.
- Severity matrix totals do not match the count of individual findings.
- A heuristic scored 3 or 4 but is not represented in the Top 3 Priority Fixes.

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
- "Audit this design for WCAG compliance." (use `$accessibility-auditor` — standards-based compliance, not heuristic scoring)
- "Give me feedback on this design." (use `$design-critique` — open-ended critique, not heuristic scoring)
- "Review this candidate's portfolio." (use `$portfolio-reviewer` — candidate evaluation, not interface assessment)
- "Write a design spec for this feature." (use `$design-spec-writer`)
- "Compare this product against competitors." (use `$competitive-analyzer`)

Ambiguous:
- "Review this design for usability." (clarify: do you want heuristic scoring against Nielsen's 10, broad design critique, or an accessibility audit?)
