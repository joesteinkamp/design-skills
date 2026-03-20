---
name: competitive-analyzer
description: "Produce structured competitive and comparative analyses of products, features, or design patterns. Use when requests involve competitive analysis, competitor benchmarking, market comparison, or identifying design differentiation opportunities."
---

# Competitive Analyzer

## Overview

Use this skill to produce structured competitive analyses that inform design decisions. Accepts a focal product or feature plus a competitor set and produces comparison matrices, competitor profiles, and design-focused opportunity maps.

The output should be actionable for designers: not just what competitors do, but what it means for your design strategy. Output is formatted for use in Notion, Google Sheets, Airtable, or as a FigJam board. When the target tool is specified, adapt the comparison matrix and profile format accordingly.

## Workflow

1. Define scope.
- Identify the focal product or feature.
- List competitors to analyze (3-5 recommended).
- Select evaluation dimensions: UX quality, feature coverage, onboarding, information architecture, accessibility, pricing, visual design, content strategy.
- Weight dimensions by relevance to the analysis goal.

2. Build evaluation framework.
- Define rating scale per dimension (strong/adequate/weak).
- Select criteria that produce meaningful differentiation, not checkbox comparisons.
- Include both functional and experiential dimensions.

3. Analyze competitors.
- Profile each competitor using `references/competitor-profile-template.md`.
- Document strengths, weaknesses, and notable patterns.
- Rate each competitor on every dimension.
- Note evidence for each rating.

4. Synthesize findings.
- Build comparison matrix across all competitors and dimensions.
- Identify table-stakes features (everyone has them, you must too).
- Identify differentiation opportunities (gaps no one fills well).
- Flag anti-patterns seen across competitors.

5. Format output.
- Use `references/competitive-analysis-template.md` for the response structure.
- Lead with the comparison matrix for quick scanning.
- End with prioritized design recommendations.

## Output Contract

Always return sections in this order:
- `Analysis Scope`
- `Comparison Matrix`
- `Competitor Profiles`
- `Opportunity Map`
- `Design Recommendations`

## Quality Bar

Revise before finalizing if any of these are true:
- Any rating (strong / adequate / weak) lacks a 1-2 sentence evidence justification.
- Analysis evaluates only feature presence/absence ("has dark mode: yes/no") without assessing experiential quality.
- Opportunity map does not distinguish between table-stakes (must-have), differentiation (where to win), and anti-patterns (what to avoid).
- Fewer than 3 competitors are analyzed without explicit justification for the smaller set.
- Anti-patterns section says "avoid this" without explaining the specific user problem it creates.
- Recommendations are generic ("improve onboarding") instead of grounded in a specific gap found in the analysis ("no competitor offers inline progress saving during onboarding — implement auto-save to differentiate").
- Comparison matrix has fewer than 4 evaluation dimensions.
- Design recommendations lack priority ratings (must-do / should-do / could-do).

## Reference Navigation

Read only what is needed:
- analysis output shell: `references/competitive-analysis-template.md`
- per-competitor detail template: `references/competitor-profile-template.md`

## Trigger Examples

Positive:
- "Compare our onboarding flow against Figma, Miro, and Canva."
- "Do a competitive analysis of checkout experiences in e-commerce."
- "What design patterns are our competitors using for their dashboards?"

Negative:
- "Write a design spec for our dashboard."
- "Create personas for our user base."
- "Audit this page for accessibility."

Ambiguous:
- "How does our product compare?" (clarify which feature/area to focus on and which competitors to include)
