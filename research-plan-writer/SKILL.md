---
name: research-plan-writer
description: "Write structured research plans with objectives, methodology, interview guides, survey designs, and recruitment criteria. Use when requests involve research planning, interview scripts, survey questionnaires, research proposals, study design, or preparing to conduct user research."

# Discovery & Auto-Selection
category: research
tags: [research-planning, interviews, surveys, methodology, recruitment, discussion-guide]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer, journey-mapper]
downstream_skills: [research-synthesizer]

# Input Contract
inputs:
  - name: research_questions
    required: true
    type: text
    description: "Research questions, product briefs, or areas of inquiry"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with feature context and open questions"
  - name: journey_context
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with pain points to investigate"

# Output Contract
outputs:
  - name: research_plan
    type: research_plan
    template: references/research-plan-template.md

# Batch Execution
batch:
  enabled: true
  input_key: research_questions
  parallelizable: true
---

# Research Plan Writer

## Overview

Use this skill to create structured research plans that set up studies for success. Accepts product briefs, design specs (from `$design-spec-writer`), journey maps (from `$journey-mapper`), or research questions and produces actionable plans with methodology, discussion guides, and logistics.

This is the upstream counterpart to `$research-synthesizer`—it plans the study; Research Synthesizer analyzes the results.

The output should be execution-ready: a clear methodology, a complete discussion guide or survey instrument, recruitment criteria, and a timeline a researcher can follow. Output is formatted for use in Dovetail, Google Docs, Notion, or Confluence. When the target tool is specified, adapt the plan structure and linking conventions accordingly.

## Workflow

### Step 1: Define research objectives
- **Reads:** research_questions, design_spec (if provided), journey_context (if provided)
- **Actions:**
  - Clarify the business decision the research will inform.
  - Write 3-5 specific research questions (not yes/no questions).
  - Identify what is known vs. unknown (assumptions to validate).
  - Determine scope: generative (discover) vs. evaluative (validate).
- **Produces:** Populated `Research Overview` and `Research Questions & Assumptions` sections

### Step 2: Select methodology
- **Reads:** Step 1 output
- **Actions:**
  - Choose method(s) based on research questions and constraints.
  - Justify the method selection (why this method answers these questions).
  - Common methods: interviews, contextual inquiry, diary study, survey, card sort, concept test, usability test (for usability testing, recommend `$usability-test-planner`).
  - Define whether qualitative, quantitative, or mixed methods.
  - Note limitations of the chosen approach.
- **Produces:** Populated `Methodology` section

### Step 3: Design the research instrument
- **Reads:** Step 1 research questions, Step 2 methodology
- **Actions:**
  - For interviews: write a semi-structured discussion guide with open-ended questions.
  - For surveys: write questions with response types (Likert, multiple choice, open text).
  - For concept tests: define stimuli and evaluation criteria.
  - For diary studies: define prompts, frequency, and duration.
  - Group questions by theme; order from broad to specific.
  - Include warm-up and cool-down questions.
- **Produces:** Populated `Research Instrument` section
- **References:** `references/discussion-guide-template.md`

### Step 4: Plan recruitment
- **Reads:** Step 1 context, Step 2 methodology
- **Actions:**
  - Define participant criteria (include and exclude).
  - Specify sample size with justification.
  - Write a screening questionnaire.
  - Address diversity, accessibility, and representation.
  - Plan incentive structure.
- **Produces:** Populated `Recruitment Plan` section

### Step 5: Plan logistics and timeline
- **Reads:** All previous step outputs
- **Actions:**
  - Estimate study duration from recruitment through analysis.
  - Define team roles (moderator, note-taker, observer).
  - List tools and platforms needed.
  - Plan for consent, recording, and data storage.
  - Identify risks and mitigation strategies.
- **Produces:** Populated `Logistics & Timeline` section

### Step 6: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/research-plan-template.md` for the response structure.
  - Use `references/discussion-guide-template.md` for interview/discussion guide formatting.
  - Ensure the plan is actionable by a researcher or research ops team.
- **Produces:** Complete plan with all required sections
- **References:** `references/research-plan-template.md`, `references/discussion-guide-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Research Overview | yes | - | key-value fields: research title, business decision, scope (generative/evaluative), methods, timeline |
| Research Questions & Assumptions | yes | 3 questions | numbered research questions with known/unknown assumptions |
| Methodology | yes | 1 method | method name, justification, qualitative/quantitative/mixed, limitations |
| Research Instrument | yes | 1 instrument | discussion guide, survey, or concept test with themed question groups |
| Recruitment Plan | yes | 3 criteria | participant criteria (include/exclude), sample size with justification, screener |
| Logistics & Timeline | yes | - | phased timeline with roles, tools, consent, and risk mitigations |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Research Questions | Every research question reveals behavior, motivation, or process — not answerable with yes/no | blocker |
| QB-02 | Methodology | Methodology section explains why the chosen method answers the specific research questions (not just "we chose interviews" but "interviews because we need to understand the mental model behind [behavior]") | blocker |
| QB-03 | Research Instrument | Discussion guide contains no leading questions ("Don't you think X is confusing?") or closed questions ("Did you find it easy?") | blocker |
| QB-04 | Research Instrument | Discussion guide starts with warm-up questions and ends with cool-down questions | blocker |
| QB-05 | Research Instrument | Survey has no more than 30 questions without justification for length | warning |
| QB-06 | Recruitment Plan | Recruitment screener has at least 3 qualifying criteria and at least 1 disqualifying criterion | blocker |
| QB-07 | Recruitment Plan | Sample size is stated with justification (e.g., "5 participants per segment for qualitative saturation" or "384 responses for ±5% margin of error") | blocker |
| QB-08 | Logistics & Timeline | Timeline includes recruitment, sessions, analysis, and reporting phases with estimated durations | blocker |
| QB-09 | Logistics & Timeline | Consent and data handling are addressed | warning |
| QB-10 | Research Overview | Plan names the specific business decision the research will inform | blocker |

## Reference Navigation

Read only what is needed:
- research plan output shell: `references/research-plan-template.md`
- discussion guide format: `references/discussion-guide-template.md`

## Trigger Examples

### Positive
Intents: [plan_research, write_discussion_guide, design_survey, scope_study, create_screener, define_methodology]

- "Plan a research study to understand how users manage notifications."
- "Write an interview guide for our enterprise onboarding research."
- "Design a survey to measure satisfaction with the new dashboard."
- "Help me plan a diary study for our mobile app."

### Negative
- "Synthesize these interview transcripts." -> `$research-synthesizer`
- "Plan a usability test for the checkout flow." -> `$usability-test-planner`
- "Create a persona from this research." -> `$persona-creator`

### Ambiguous
- "I need to do some research." -> Clarify: what decisions the research will inform and what is already known?
