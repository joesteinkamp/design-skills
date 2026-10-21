---
name: survey-analyzer
description: "Analyze survey data — closed-ended and open-ended — into honest, decision-ready findings: response quality and sample checks, descriptive statistics with n and confidence intervals, standard score calculations (NPS, CSAT, CES, SUS, UMUX-Lite), segment comparisons with significance tests, coded open-ended themes, and limitations such as non-response bias. Use when requests involve analyzing survey results, NPS or CSAT data, SUS scores, questionnaire exports, or open-text responses at scale — not writing the survey (use research-plan-writer), not synthesizing interviews or usability sessions (use research-synthesizer), not planning an A/B test (use ab-test-planner)."

# Discovery & Auto-Selection
category: research
tags: [survey, quantitative, nps, csat, sus, statistics, open-ended-coding, segmentation]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [research-plan-writer]
downstream_skills: [research-synthesizer, persona-creator, design-success-metrics-writer, stakeholder-presentation-writer, design-brief-writer]

# Input Contract
inputs:
  - name: survey_data
    required: true
    type: data
    description: "Survey export (CSV, XLSX, JSON) or pasted responses, including open-text columns"
  - name: survey_instrument
    required: false
    type: text
    description: "The questionnaire: question wording, scales, logic, and how respondents were sampled"
  - name: research_questions
    required: false
    type: text
    description: "What the survey was meant to answer, and the decision it informs"

# Output Contract
outputs:
  - name: survey_analysis
    type: survey_analysis
    template: references/survey-analysis-template.md

# Batch Execution
batch:
  enabled: true
  input_key: survey_data
  parallelizable: true

# Tool Integration
tools:
  - name: code_execution
    actions: [run_python]
    when: "Cleaning data, computing scores, confidence intervals, cross-tabs, and significance tests; charting"
  - name: google_sheets
    actions: [read_sheet, create_spreadsheet]
    when: "Reading responses from Google Forms or Sheets; sharing coded tables"
  - name: typeform
    actions: [get_responses]
    when: "Pulling responses directly from a Typeform survey"

# User Input Gates
user_inputs:
  - step: 1
    question: "What decision should this analysis inform?"
    required: true
  - step: 1
    question: "Which segments should we compare?"
    required: false
  - step: 4
    question: "Coded [N] open-text responses into [M] themes. Review the codebook before I finalize?"
    checkpoint: true
---

# Survey Analyzer

## Overview

Use this skill to turn a survey export into findings a team can act on without overclaiming. It checks data quality first, computes the standard UX scores correctly, compares segments only where the sample supports it, and codes open text so qualitative themes have counts behind them.

The output should report every number with its n, show uncertainty, and never present a difference as real unless it survives a significance test and is large enough to matter. Calculations must be computed, not estimated.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Code execution** | Load the export, clean it, compute scores, intervals, cross-tabs, and tests; produce charts | Compute by hand from summary counts and show the arithmetic; skip tests that need raw data and say so |
| **Google Sheets** | Read responses; publish coded open-text tables | User pastes data |
| **Typeform** | Pull responses and question metadata | User exports CSV |

## Workflow

### Step 1: Understand the survey
- **Reads:** survey_instrument, research_questions
- **Ask user:** "What decision should this analysis inform?" — focuses the analysis.
- **Ask user:** "Which segments should we compare?" — e.g., plan tier, tenure, role.
- **Actions:**
  - Map each question to its type (single choice, multi-select, Likert, NPS 0–10, SUS 10-item, open text) and to the research question it serves.
  - Note how respondents were sampled (in-product intercept, email to all users, panel) — this sets the limits on generalization.
- **Produces:** Populated `Survey Context` section

### Step 2: Check data quality
- **Reads:** survey_data
- **Actions:**
  - Report invited (if known), started, completed, and response rate.
  - Remove or flag speeders (< ⅓ median completion time), straight-liners on grids, duplicates, and test responses; report counts excluded.
  - Note item non-response for key questions.
- **Tool action — Code execution (if available):** run the checks on raw data.
- **Produces:** Populated `Sample & Data Quality` section

### Step 3: Analyze closed-ended questions
- **Reads:** Step 2 cleaned data
- **Actions:**
  - Descriptives per question: n, distribution, mean/median where appropriate (median for Likert), and 95% confidence intervals for key proportions.
  - Compute standard scores exactly per `references/survey-metrics.md` (NPS, CSAT, CES, SUS, UMUX-Lite), with intervals.
  - Segment comparisons only when each segment has n ≥ 30; use chi-square for proportions, Mann-Whitney for Likert; report effect size and p-value; correct for multiple comparisons when testing many cuts.
- **If** a segment has n < 30 → report it descriptively and label it "too small to compare."
- **Produces:** Populated `Key Metrics` and `Segment Comparisons` sections
- **References:** `references/survey-metrics.md`

### Step 4: Code open-ended responses
- **Reads:** open-text columns
- **Actions:**
  - Build a codebook inductively from a sample, then apply it to all responses; allow multiple codes per response.
  - Report each theme with count, % of respondents who answered the question, and 2–3 verbatim quotes (exact text, not paraphrased).
  - Cross themes with key metrics when useful (e.g., top themes among detractors).
- **Checkpoint:** "Coded [N] open-text responses into [M] themes. Review the codebook before I finalize?"
- **Produces:** Populated `Open-Ended Themes` section

### Step 5: Synthesize and hand off
- **Reads:** All previous step outputs
- **Actions:**
  - Write 3–5 findings, each tied to specific numbers and answering a research question.
  - State limitations: sampling frame, non-response bias, self-report, question wording, and what the data cannot show.
  - Fill `references/survey-analysis-template.md`.
- **Next steps:** Based on output, suggest:
  - "To combine these results with interview findings, use `$research-synthesizer`."
  - "To turn segment differences into personas, use `$persona-creator`."
  - "To set targets for these metrics, use `$design-success-metrics-writer`."
  - "To present results to stakeholders, use `$stakeholder-presentation-writer`."
- **Produces:** Complete analysis
- **References:** `references/survey-analysis-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Survey Context | yes | - | key-value fields: decision, research questions, sampling method, field dates, question types |
| Sample & Data Quality | yes | - | started, completed, response rate, exclusions by reason, item non-response |
| Key Metrics | yes | 1 metric | table: metric, value, 95% CI, n, method |
| Segment Comparisons | no | - | table: segment, n, value, difference, test, p, effect size, verdict |
| Open-Ended Themes | no | - | theme, count, % of answerers, verbatim quotes |
| Findings | yes | 3 findings | finding statements tied to numbers and research questions |
| Limitations | yes | 2 items | sampling, bias, and measurement caveats |
| Method | yes | - | cleaning rules, formulas, tests, and tooling used |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Key Metrics | Every reported number states its n | blocker |
| QB-02 | Key Metrics | Standard scores follow the formulas in `references/survey-metrics.md` (e.g., NPS = %promoters − %detractors on 0–10; SUS uses the 0–100 transform) | blocker |
| QB-03 | Segment Comparisons | Differences are called real only with a significance test and effect size; segments with n < 30 are not compared | blocker |
| QB-04 | Open-Ended Themes | Quotes are verbatim from the data, not paraphrased or invented | blocker |
| QB-05 | Sample & Data Quality | Exclusions are reported with counts and reasons | blocker |
| QB-06 | Limitations | Sampling method and non-response bias are addressed | blocker |
| QB-07 | Findings | Each finding answers a stated research question or the decision | warning |
| QB-08 | Method | States whether figures were computed with code or by hand | warning |

## Reference Navigation

Read only what is needed:
- score formulas, tests, and thresholds: `references/survey-metrics.md`
- output shell: `references/survey-analysis-template.md`

## Trigger Examples

### Positive
Intents: [analyze_survey, compute_nps, score_sus, code_open_text, compare_segments]

- "Here's our Q3 NPS export — what's driving detractors?"
- "Score these SUS responses and compare admins vs. members."
- "Code these 1,200 open-text answers into themes with counts."

### Negative
- "Write a survey to measure onboarding satisfaction." -> `$research-plan-writer`
- "Synthesize these 12 interview transcripts." -> `$research-synthesizer`
- "Plan an A/B test of the new pricing page." -> `$ab-test-planner`
- "Analyze our tree test results." -> `$ia-researcher`

### Ambiguous
- "What does this data say?" (clarify: survey responses, product analytics, or research notes?)
- "Is our NPS good?" (clarify: compute and interpret this survey's score, or benchmark against competitors via `$competitive-analyzer`?)
