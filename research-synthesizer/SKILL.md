---
name: research-synthesizer
description: "Turn raw research inputs (transcripts, surveys, usability notes) into structured insights with themes, evidence, and recommendations. Use when requests involve research synthesis, insight extraction, theme analysis, or preparing research findings for downstream skills like $persona-creator, $journey-mapper, or $design-spec-writer."

# Discovery & Auto-Selection
category: research
tags: [synthesis, insights, themes, affinity-mapping, evidence, recommendations]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: []
downstream_skills: [persona-creator, journey-mapper, design-spec-writer, stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: raw_research_data
    required: true
    type: text
    description: "Transcripts, survey results, usability test notes, diary studies, or mixed-method data"

# Output Contract
outputs:
  - name: research_synthesis
    type: research_synthesis
    template: references/research-synthesis-template.md
  - name: research_handoff
    type: research_handoff
    optional: true
    schema: references/research-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: raw_research_data
  parallelizable: true
---

# Research Synthesizer

## Overview

Use this skill to convert raw research data into structured, actionable insights. Accepts transcripts, survey results, usability test notes, diary studies, or mixed-method inputs and produces themed findings ranked by impact and confidence. Output is formatted for use in Dovetail, Notion, Miro, or FigJam. When the target tool is specified, adapt the synthesis structure accordingly.

The output should be evidence-grounded: every insight traces back to quotes or data, and every recommendation maps to a concrete design action.

## Workflow

### Step 1: Ingest research inputs
- **Reads:** raw_research_data
- **Actions:**
  - Identify research type (generative, evaluative, survey, diary, mixed).
  - Note participant count, segments, methods, and date range.
  - Flag gaps in coverage (missing segments, low sample size, single-method bias).
  - If inputs are incomplete, state assumptions explicitly.
- **Produces:** Populated `Research Overview` section

### Step 2: Code and cluster observations
- **Reads:** Step 1 output, raw_research_data
- **Actions:**
  - Use affinity diagramming as the default synthesis method: extract → code → cluster → theme → insight.
  - Extract discrete observations from raw data (one observation per sticky note / data point).
  - Assign descriptive codes to each observation (e.g., "workaround-for-slow-search", "trust-barrier-at-checkout").
  - Group coded observations into clusters by behavioral affinity, not topic similarity.
  - Merge clusters into themes. Each theme should represent a distinct user behavior pattern.
  - Tag each theme with frequency (how many sources mention it), severity (impact on user goal), and affected segments.
  - Keep themes behavioral, not demographic.
- **Produces:** Populated `Themes & Evidence` section

### Step 3: Distill insights
- **Reads:** Step 2 themes and evidence
- **Actions:**
  - Name each insight clearly and concisely.
  - Write a summary sentence explaining the insight.
  - Attach supporting quotes and data points.
  - Rank by impact (high/medium/low) and confidence (high/medium/low).
- **Produces:** Populated `Insights` section

### Step 4: Produce recommendations
- **Reads:** Step 3 insights
- **Actions:**
  - Map each insight to a design action.
  - Prioritize as must-do, should-do, or could-do.
  - Flag downstream skill targets (e.g., "feed into $persona-creator").
  - Identify research gaps that need follow-up.
- **Produces:** Populated `Recommendations` and `Research Gaps & Next Steps` sections

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/research-synthesis-template.md` for the response structure.
  - Include `references/research-handoff-schema.md` when output feeds downstream skills.
  - Ensure every section is complete before returning.
- **Produces:** Complete synthesis with all required sections
- **References:** `references/research-synthesis-template.md`, `references/research-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Research Overview | yes | - | key-value fields: research type, participant count, segments, methods, date range, coverage gaps |
| Themes & Evidence | yes | 3 themes | themed clusters with frequency, severity, affected segments, and coded observations |
| Insights | yes | 1 insight | named insights with summary, supporting quotes/data, impact rating, confidence rating |
| Recommendations | yes | 1 recommendation | design actions prioritized as must-do/should-do/could-do with downstream skill targets |
| Research Gaps & Next Steps | yes | - | gaps in coverage, follow-up studies needed, unresolved questions |
| Downstream Handoff | no | - | handoff schema block per `references/research-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Insights | Every insight has a direct supporting quote or data point | blocker |
| QB-02 | Themes & Evidence | Themes are organized by behavior ("workaround patterns", "trust-building sequences"), not topic ("onboarding", "settings") | blocker |
| QB-03 | Themes & Evidence | At least 3 themes are identified from more than 5 research sessions | blocker |
| QB-04 | Recommendations | Recommendations specify a concrete design action and the skill to use (e.g., "redesign the empty state — feed into $design-spec-writer"), not vague "consider" or "explore" language | blocker |
| QB-05 | Insights | Confidence is rated per insight as high, medium, or low with reasoning | blocker |
| QB-06 | Insights | Impact is rated per insight as high, medium, or low | blocker |
| QB-07 | Research Gaps & Next Steps | Research gaps section is not empty when sample size is under 12 participants | warning |
| QB-08 | Downstream Handoff | Handoff schema references downstream skills and includes the required handoff block | warning |

## Reference Navigation

Read only what is needed:
- synthesis output shell: `references/research-synthesis-template.md`
- downstream handoff contract: `references/research-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [synthesize_research, extract_insights, identify_themes, analyze_findings, code_observations]

- "Synthesize these 12 user interview transcripts into themes and insights."
- "What are the key findings from this usability study?"
- "Turn this survey data into actionable design recommendations."

### Negative
- "Plan a research study for our new feature." -> `$research-plan-writer`
- "Write an interview guide for upcoming sessions." -> `$research-plan-writer`
- "Create a persona for our mobile users." -> `$persona-creator`
- "Design a new onboarding flow." -> `$design-spec-writer`

### Ambiguous
- "Help me make sense of this research." -> Clarify: what research inputs are available and what output format is needed?
- "I need help with research." -> Clarify: do you have raw data to synthesize, or do you need to plan a new study?
