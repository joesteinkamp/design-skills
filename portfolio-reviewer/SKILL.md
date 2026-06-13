---
name: portfolio-reviewer
description: "Evaluate a product designer's portfolio (case studies) against a structured, level-calibrated rubric for hiring, producing dimension scores with evidence, level calibration, strengths and gaps, a clear recommendation (advance/hold/decline), and targeted interview probes. Use when requests involve candidate portfolio review, case-study evaluation, or hiring assessment of a designer — not critiquing your own team's work, not building interview questions, not heuristic scoring of a product."

# Discovery & Auto-Selection
category: evaluation
tags: [hiring, portfolio-review, candidate-evaluation, rubric, leveling, design-craft]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: []
downstream_skills: [interview-scorecard]

# Input Contract
inputs:
  - name: portfolio
    required: true
    type: text
    description: "Portfolio URL, PDF, or pasted case studies to evaluate"
  - name: role_level
    required: true
    type: text
    description: "Target role and level, e.g. 'Senior Product Designer' or 'Design Manager'"
  - name: rubric
    required: false
    type: text
    description: "Custom rubric dimensions if the org has one; defaults to the standard rubric"

# Output Contract
outputs:
  - name: portfolio_evaluation
    type: portfolio_evaluation
    template: references/portfolio-evaluation-template.md
  - name: portfolio_handoff
    type: portfolio_handoff
    schema: references/portfolio-handoff-schema.md
    required: false

# Batch Execution
batch:
  enabled: true
  input_key: portfolio
  parallelizable: true

# Tool Integration
tools:
  - name: chrome
    actions: [open_url, capture_screenshot]
    when: "Opening the live portfolio and each case study for review"
  - name: web
    actions: [fetch_page]
    when: "Reading case study content from a portfolio URL"
  - name: notion
    actions: [publish_scorecard]
    when: "Writing the evaluation to the hiring database"
  - name: gmail
    actions: [draft_feedback]
    when: "Drafting an optional candidate or panel note"

# User Input Gates
user_inputs:
  - step: 1
    question: "What role and level is this candidate being considered for?"
    required: true
  - step: 1
    question: "Use the default design rubric or a custom one?"
    options: [default, custom]
    default: default
    required: true
  - step: 1
    question: "Any specific competencies this hire must demonstrate?"
    required: false
  - step: 5
    question: "Publish the scorecard to the hiring database?"
    required: false
    default: false
---

# Portfolio Reviewer

## Overview

Use this skill to evaluate a product designer's portfolio against a structured, level-calibrated rubric for hiring. Accepts a portfolio URL, PDF, or pasted case studies and produces dimension scores with evidence, explicit level calibration, strengths and gaps, a recommendation (advance / hold / decline), and targeted interview probes.

The output should be fair, evidence-based, and calibrated to the target level: every dimension is scored against a specific citation from the portfolio, and the review judges thinking and outcomes rather than aesthetics alone. Built for design leaders and hiring managers. Output is formatted for use in a hiring database, an interview-panel doc, or a debrief note. When the target tool is specified, adapt the scorecard format accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Chrome** | Open the live portfolio and each case study with open_url and capture_screenshot for visual reference of craft and layout | Evaluate based on the provided PDF or pasted case studies; note that live interactions and prototypes were not directly observed |
| **Web** | Fetch case study content with fetch_page when a portfolio URL is provided | Evaluate based on pasted content; ask the user to paste case studies the fetch could not reach |
| **Notion** | Publish the completed scorecard to the hiring database with role, level, scores, recommendation, and evidence | Output the scorecard as markdown; user adds it to the hiring database manually |
| **Gmail** | Draft an optional candidate feedback or interview-panel note summarizing the recommendation and probes | Output the draft note as text; user sends it manually |

## Workflow

### Step 1: Establish role, level, and rubric
- **Reads:** portfolio, role_level, rubric (if provided)
- **Ask user:** "What role and level is this candidate being considered for?" — calibrates every score and the recommendation.
- **Ask user:** "Use the default design rubric or a custom one?" — options: default, custom. Default: default.
- **Ask user:** "Any specific competencies this hire must demonstrate?" — focuses calibration on must-have signals.
- **Actions:**
  - Capture role, level, and the rubric to apply.
  - Use the default rubric dimensions unless a custom rubric is supplied: Problem framing & strategy; Craft & visual execution; Interaction & systems thinking; Research & evidence; Outcomes & impact; Process & collaboration; Communication & storytelling.
  - Open the portfolio and inventory the case studies available for review.
- **If** a portfolio URL provided → fetch and open it.
- **Tool action — Web (if URL provided):** Fetch case study content with fetch_page.
- **Tool action — Chrome (if URL provided):** Open the portfolio and each case study with open_url and capture_screenshot for visual reference.
- **If** only a PDF or pasted text is provided → evaluate from that content and note that live prototypes were not observed.
- **Produces:** Populated `Candidate Context` section

### Step 2: Assess each case study for depth
- **Reads:** Step 1 context, portfolio
- **Actions:**
  - For each case study, assess role clarity, problem framing, process, and outcome.
  - Note where the candidate's actual role in a team project is unclear, and treat it as a gap to probe — not an assumption of credit.
  - Capture the strongest evidence and the weakest link in each case study.
  - Use `references/portfolio-evaluation-template.md` for the case study note structure.
- **Checkpoint:** "I've reviewed [N] case studies. Here's a depth read on each. Ready to score against the rubric?"
- **Produces:** Populated `Case Study Notes` section
- **References:** `references/portfolio-evaluation-template.md`

### Step 3: Score each rubric dimension
- **Reads:** Step 2 case study notes
- **Actions:**
  - Score every rubric dimension and cite a specific piece of evidence from the portfolio for each score.
  - Calibrate each dimension explicitly against the target level: meets, exceeds, or below — with reasoning.
  - Judge thinking and outcomes, not aesthetics alone — a polished visual with no problem framing does not score high on strategy.
  - Flag any dimension where the portfolio gives no evidence as unproven, not as a low score by default.
- **Produces:** Populated `Rubric Scorecard` section

### Step 4: Synthesize strengths, gaps, and recommendation
- **Reads:** Step 3 scorecard
- **Actions:**
  - Summarize strengths with the evidence that supports each.
  - Name gaps and risks, including dimensions that are unproven or where role attribution is unclear.
  - Give a clear recommendation — advance / hold / decline — with rationale tied to the level calibration.
- **Produces:** Populated `Summary & Recommendation`, `Strengths`, and `Gaps & Risks` sections

### Step 5: Generate interview probes and format output
- **Reads:** All previous step outputs
- **Ask user:** "Publish the scorecard to the hiring database?" — Default: no.
- **Actions:**
  - Write interview probes that target the identified gaps and unclear role attribution.
  - List open questions the portfolio could not answer.
  - Use `references/portfolio-evaluation-template.md` for the response structure.
- **Tool action — Notion (if available and user confirms):** Publish the scorecard to the hiring database with role, level, dimension scores, recommendation, and evidence.
- **If** Notion unavailable → output the scorecard as markdown for manual entry.
- **Tool action — Gmail (if available):** Draft an optional candidate or interview-panel note summarizing the recommendation and probes.
- **If** Gmail unavailable → output the draft note as text.
- **Next steps:** Based on output, suggest:
  - "To build the interview plan and questions from these probes, use `$interview-scorecard`."
- **Produces:** Complete evaluation with all required sections including `Interview Probes` and `Open Questions`, plus the optional `portfolio_handoff` block when feeding `$interview-scorecard`
- **References:** `references/portfolio-evaluation-template.md`, `references/portfolio-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Candidate Context | yes | - | key-value fields: role, level, source (URL / PDF / pasted), rubric used |
| Summary & Recommendation | yes | - | 2-3 sentence overall read plus a clear recommendation: advance / hold / decline with rationale |
| Rubric Scorecard | yes | 7 dimensions | table: dimension / score / level vs target (meets/exceeds/below) / evidence citation |
| Case Study Notes | yes | 1 case study | per case study: role clarity, problem, process, outcome, strongest evidence, weakest link |
| Strengths | yes | 2 items | specific strengths each backed by evidence from the portfolio |
| Gaps & Risks | yes | 1 item | gaps, unproven dimensions, and unclear role attribution treated as risk |
| Interview Probes | yes | 3 probes | questions targeting the identified gaps and unclear attribution |
| Open Questions | yes | 1 question | what the portfolio could not answer |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Rubric Scorecard | Every rubric dimension has a score AND a specific evidence citation from the portfolio (not "good craft" but "the settings redesign in case study 2 shows a coherent token system across 6 screens") | blocker |
| QB-02 | Rubric Scorecard | Level calibration is explicit for every dimension — meets, exceeds, or below the target level, each with reasoning | blocker |
| QB-03 | Rubric Scorecard | Evaluation judges thinking and outcomes, not aesthetics alone — a visually polished case with no problem framing does not score high on strategy | blocker |
| QB-04 | Summary & Recommendation | A clear recommendation (advance / hold / decline) is given with rationale tied to the level calibration | blocker |
| QB-05 | Interview Probes | Interview probes target the identified gaps, not generic questions | blocker |
| QB-06 | Gaps & Risks | Where the candidate's actual role in a team project is unclear, it is noted as a gap to probe — not assumed as the candidate's credit | blocker |
| QB-07 | Rubric Scorecard | A dimension with no supporting evidence is marked unproven rather than scored low by default | warning |
| QB-08 | Summary & Recommendation | Tone is fair and evidence-based — no speculation about the person beyond what the work shows | warning |

## Reference Navigation

Read only what is needed:
- evaluation output shell and rubric dimensions: `references/portfolio-evaluation-template.md`
- handoff block for `$interview-scorecard`: `references/portfolio-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [review_portfolio, evaluate_candidate, assess_case_studies, calibrate_level, hiring_assessment]

- "Review this candidate's portfolio for a Senior Product Designer role."
- "Evaluate these case studies against our design rubric."
- "Is this portfolio strong enough for a staff-level hire?"

### Negative
- "Critique our team's checkout design." -> `$design-critique`
- "Build an interview scorecard and questions for this candidate." -> `$interview-scorecard`
- "Evaluate this dashboard against Nielsen's heuristics." -> `$heuristic-evaluator`
- "Audit this design for WCAG compliance." -> `$accessibility-auditor`
- "Compare our product against competitors." -> `$competitive-analyzer`

### Ambiguous
- "Is this designer good?" (clarify the target role and level, and whether to apply the default rubric or a custom one)
- "Evaluate this portfolio." (clarify: a hiring assessment against a leveled rubric, or design critique of the work itself?)
