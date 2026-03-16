---
name: research-synthesizer
description: "Turn raw research inputs (transcripts, surveys, usability notes) into structured insights with themes, evidence, and recommendations. Use when requests involve research synthesis, insight extraction, theme analysis, or preparing research findings for downstream skills like $persona-creator, $journey-mapper, or $design-spec-writer."
---

# Research Synthesizer

## Overview

Use this skill to convert raw research data into structured, actionable insights. Accepts transcripts, survey results, usability test notes, diary studies, or mixed-method inputs and produces themed findings ranked by impact and confidence.

The output should be evidence-grounded: every insight traces back to quotes or data, and every recommendation maps to a concrete design action.

## Workflow

1. Ingest research inputs.
- Identify research type (generative, evaluative, survey, diary, mixed).
- Note participant count, segments, methods, and date range.
- Flag gaps in coverage (missing segments, low sample size, single-method bias).
- If inputs are incomplete, state assumptions explicitly.

2. Code and cluster observations.
- Extract discrete observations from raw data.
- Group observations into themes by affinity.
- Tag each theme with frequency (how many sources), severity (impact on user), and affected segments.
- Keep themes behavioral, not demographic.

3. Distill insights.
- Name each insight clearly and concisely.
- Write a summary sentence explaining the insight.
- Attach supporting quotes and data points.
- Rank by impact (high/medium/low) and confidence (high/medium/low).

4. Produce recommendations.
- Map each insight to a design action.
- Prioritize as must-do, should-do, or could-do.
- Flag downstream skill targets (e.g., "feed into $persona-creator").
- Identify research gaps that need follow-up.

5. Format output.
- Use `references/research-synthesis-template.md` for the response structure.
- Include `references/research-handoff-schema.md` when output feeds downstream skills.
- Ensure every section is complete before returning.

## Output Contract

Always return sections in this order:
- `Research Overview`
- `Themes & Evidence`
- `Insights`
- `Recommendations`
- `Research Gaps & Next Steps`
- `Downstream Handoff` (optional, include when feeding other skills)

## Quality Bar

Revise before finalizing if any of these are true:
- Insights lack supporting evidence (quotes or data).
- Themes are demographic rather than behavioral.
- Recommendations are vague and lack specific design actions.
- Confidence and impact are not stated per insight.
- Research gaps are not acknowledged.
- Handoff schema is incomplete when downstream skills are targeted.

## Reference Navigation

Read only what is needed:
- synthesis output shell: `references/research-synthesis-template.md`
- downstream handoff contract: `references/research-handoff-schema.md`

## Trigger Examples

Positive:
- "Synthesize these 12 user interview transcripts into themes and insights."
- "What are the key findings from this usability study?"
- "Turn this survey data into actionable design recommendations."

Negative:
- "Design a new onboarding flow."
- "Write a user story for the settings page."
- "Create a persona for our mobile users."

Ambiguous:
- "Help me make sense of this research." (clarify what research inputs are available and what output format is needed)
