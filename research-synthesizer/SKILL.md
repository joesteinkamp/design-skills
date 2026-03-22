---
name: research-synthesizer
description: "Turn raw research inputs (transcripts, surveys, usability notes) into structured insights with themes, evidence, and recommendations. Use when requests involve research synthesis, insight extraction, theme analysis, or preparing research findings for downstream skills like $persona-creator, $journey-mapper, or $design-spec-writer."
---

# Research Synthesizer

## Overview

Use this skill to convert raw research data into structured, actionable insights. Accepts transcripts, survey results, usability test notes, diary studies, or mixed-method inputs and produces themed findings ranked by impact and confidence. Output is formatted for use in Dovetail, Notion, Miro, or FigJam. When the target tool is specified, adapt the synthesis structure accordingly.

The output should be evidence-grounded: every insight traces back to quotes or data, and every recommendation maps to a concrete design action.

## Workflow

1. Ingest research inputs.
- Identify research type (generative, evaluative, survey, diary, mixed).
- Note participant count, segments, methods, and date range.
- Flag gaps in coverage (missing segments, low sample size, single-method bias).
- If inputs are incomplete, state assumptions explicitly.

2. Code and cluster observations.
- Use affinity diagramming as the default synthesis method: extract → code → cluster → theme → insight.
- Extract discrete observations from raw data (one observation per sticky note / data point).
- Assign descriptive codes to each observation (e.g., "workaround-for-slow-search", "trust-barrier-at-checkout").
- Group coded observations into clusters by behavioral affinity, not topic similarity.
- Merge clusters into themes. Each theme should represent a distinct user behavior pattern.
- Tag each theme with frequency (how many sources mention it), severity (impact on user goal), and affected segments.
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
- Any insight is missing a direct supporting quote or data point.
- Themes are organized by topic ("onboarding", "settings") rather than behavior ("workaround patterns", "trust-building sequences").
- Fewer than 3 themes are identified from more than 5 research sessions.
- Recommendations say "consider" or "explore" without specifying a concrete design action and the skill to use (e.g., "redesign the empty state — feed into $design-spec-writer").
- Confidence is not rated per insight as high, medium, or low with reasoning.
- Impact is not rated per insight as high, medium, or low.
- Research gaps section is empty despite sample size being under 12 participants.
- Handoff schema references downstream skills but does not include the required handoff block.

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
- "Plan a research study for our new feature." (use `$research-plan-writer` — planning research, not synthesizing existing data)
- "Write an interview guide for upcoming sessions." (use `$research-plan-writer` — preparing to conduct research, not analyzing results)
- "Create a persona for our mobile users." (use `$persona-creator`)
- "Design a new onboarding flow." (use `$design-spec-writer`)

Ambiguous:
- "Help me make sense of this research." (clarify what research inputs are available and what output format is needed)
- "I need help with research." (clarify: do you have raw data to synthesize, or do you need to plan a new study?)
