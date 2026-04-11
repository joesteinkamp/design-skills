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

# Tool Integration
tools:
  - name: gong
    actions: [pull_transcripts]
    when: "Pulling recorded session transcripts as input data"
  - name: figma
    actions: [generate_diagram]
    when: "Creating affinity diagram in FigJam"
  - name: google_sheets
    actions: [create_spreadsheet, populate_rows]
    when: "Building coding spreadsheet for observation clustering"
  - name: notion
    actions: [publish_page, create_database]
    when: "Publishing synthesis with theme hierarchy"
  - name: productboard
    actions: [push_insights]
    when: "Pushing validated insights to insight board"

# User Input Gates
user_inputs:
  - step: 1
    question: "How many sessions do you have, and what methods were used?"
    required: true
  - step: 1
    question: "Are Gong recordings available for auto-pulling transcripts?"
    required: false
  - step: 3
    question: "I've identified [N] themes. Want to review before I distill insights?"
    required: true
  - step: 4
    question: "What's the downstream target for these insights?"
    options: [personas, journey_map, design_spec, all]
    default: all
  - step: 4
    question: "Push top insights to Productboard?"
    required: false
    default: false
---

# Research Synthesizer

## Overview

Use this skill to convert raw research data into structured, actionable insights. Accepts transcripts, survey results, usability test notes, diary studies, or mixed-method inputs and produces themed findings ranked by impact and confidence. Output is formatted for use in Dovetail, Notion, Miro, or FigJam. When the target tool is specified, adapt the synthesis structure accordingly.

The output should be evidence-grounded: every insight traces back to quotes or data, and every recommendation maps to a concrete design action.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Gong** | Pull recorded session transcripts automatically as input data for synthesis | User pastes or uploads transcripts manually |
| **Figma (FigJam)** | Generate an affinity diagram in FigJam with coded observations, clusters, and theme groupings | Output affinity structure as markdown; user builds board manually |
| **Google Sheets** | Build a coding spreadsheet with observations, codes, clusters, and theme assignments for transparent clustering | Output coding table as markdown; user creates spreadsheet manually |
| **Notion** | Publish full synthesis as a Notion page with theme hierarchy, linked insights, and recommendation status tracking | Output as markdown; user pastes into Notion |
| **Productboard** | Push validated top insights to the Productboard insight board for product planning visibility | List insights with push-ready format; user enters manually |

## Workflow

### Step 1: Ingest research inputs
- **Reads:** raw_research_data
- **Ask user:** "How many sessions do you have, and what methods were used?" — needed to assess confidence and weighting.
- **Ask user:** "Are Gong recordings available for auto-pulling transcripts?" — if yes, will pull directly.
- **Actions:**
  - Identify research type (generative, evaluative, survey, diary, mixed).
  - Note participant count, segments, methods, and date range.
  - Flag gaps in coverage (missing segments, low sample size, single-method bias).
  - If inputs are incomplete, state assumptions explicitly.
- **If** Gong recordings available → auto-pull transcripts as input data.
- **If** <5 sessions → flag low confidence, recommend additional research before high-stakes decisions.
- **If** mixed methods → weight appropriately (e.g., triangulate qualitative themes against quantitative frequencies).
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
- **If** FigJam available → create affinity diagram in FigJam with observations as stickies, clusters as groups, and themes as sections.
- **Tool action — Figma (if available):** Generate affinity diagram in FigJam with coded observations, cluster groupings, and theme labels.
- **If** FigJam unavailable → use Google Sheets for clustering.
- **Tool action — Google Sheets (if available and FigJam unavailable):** Build coding spreadsheet with columns for observation, participant, code, cluster, and theme for transparent clustering.
- **Checkpoint:** "Here are the coded observations and clusters. Does the grouping logic make sense before I merge into themes?"
- **Produces:** Populated `Themes & Evidence` section

### Step 3: Distill insights
- **Reads:** Step 2 themes and evidence
- **Ask user:** "I've identified [N] themes from the data. Want to review the theme list before I distill insights?" — allows course correction before insight generation.
- **Actions:**
  - Name each insight clearly and concisely.
  - Write a summary sentence explaining the insight.
  - Attach supporting quotes and data points.
  - Rank by impact (high/medium/low) and confidence (high/medium/low).
- **Checkpoint:** "Here are the [N] insights ranked by impact and confidence. Do these reflect what you're seeing in the data?"
- **Produces:** Populated `Insights` section

### Step 4: Produce recommendations
- **Reads:** Step 3 insights
- **Ask user:** "What's the downstream target for these insights?" — options: personas, journey map, design spec, or all. Default: all.
- **Ask user:** "Push top insights to Productboard?" — Default: no.
- **Actions:**
  - Map each insight to a design action.
  - Prioritize as must-do, should-do, or could-do.
  - Flag downstream skill targets (e.g., "feed into $persona-creator").
  - Identify research gaps that need follow-up.
- **Tool action — Productboard (if available and user confirms):** Push top-ranked insights (high impact + high confidence) to the Productboard insight board with theme tags and supporting evidence summaries.
- **If** Productboard unavailable → list insights in push-ready format for manual entry.
- **Produces:** Populated `Recommendations` and `Research Gaps & Next Steps` sections

### Step 5: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/research-synthesis-template.md` for the response structure.
  - Include `references/research-handoff-schema.md` when output feeds downstream skills.
  - Ensure every section is complete before returning.
- **Tool action — Notion (if available):** Publish full synthesis as a Notion page with theme hierarchy, linked insight cards, and recommendation tracking.
- **If** Notion unavailable → output as markdown.
- **Next steps:** Based on output, suggest:
  - "To build personas from these behavioral patterns, use `$persona-creator`."
  - "To map the user journey grounded in this evidence, use `$journey-mapper`."
  - "To translate insights into a design spec, use `$design-spec-writer`."
  - "To present findings to stakeholders, use `$stakeholder-presentation-writer`."
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
