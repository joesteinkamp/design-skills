---
name: performance-review-writer
description: "Write a manager-authored, level-calibrated performance review for a product designer, synthesizing self-assessment, peer/360 feedback, manager notes, and prior-cycle goals into goal attainment, competency scores with evidence, an overall rating, balanced strengths and growth areas, and a next-cycle growth plan. Use when requests involve writing a performance review, year-end or mid-cycle evaluation, or promotion case for a designer you manage — not hiring portfolio evaluation (use portfolio-reviewer), not org maturity (use design-maturity-assessment), not setting next-cycle OKRs (use design-okr-writer), not critiquing design work (use design-critique)."

# Discovery & Auto-Selection
category: evaluation
tags: [performance-review, calibration, competency-rubric, growth-plan, design-leadership, feedback-synthesis]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [design-status-rollup]
downstream_skills: [design-okr-writer, stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: designer_context
    required: true
    type: text
    description: "The designer's name, role, current level, and the review period being assessed"
  - name: self_assessment
    required: false
    type: text
    description: "The designer's own write-up of accomplishments, impact, and goals for the cycle"
  - name: peer_feedback
    required: false
    type: text
    description: "Feedback from peers, cross-functional partners, or stakeholders (360 input)"
  - name: manager_notes
    required: false
    type: text
    description: "Running 1:1 notes, shipped work, and design artifacts the manager observed"
  - name: prior_goals
    required: false
    type: text
    description: "The prior cycle's goals or OKRs to assess attainment against; may come from a design-okr-writer doc"
  - name: rubric
    required: false
    type: text
    description: "Custom competency rubric if the org has one; defaults to the standard design rubric"

# Output Contract
outputs:
  - name: performance_review
    type: performance_review
    template: references/performance-review-template.md
  - name: performance_review_handoff
    type: performance_review_handoff
    schema: references/performance-review-handoff-schema.md
    required: false

# Batch Execution
batch:
  enabled: true
  input_key: designer_context
  parallelizable: true

# Tool Integration
tools:
  - name: notion
    actions: [publish_page]
    when: "Publishing the completed review to the talent-review or HR database"
  - name: google_sheets
    actions: [create_scoring_matrix]
    when: "Building the competency rating matrix as a structured spreadsheet for calibration"
  - name: gmail
    actions: [draft_summary]
    when: "Drafting an optional delivery or summary note for the designer or skip-level"

# User Input Gates
user_inputs:
  - step: 1
    question: "What review cycle is this — annual, mid-year, or a promotion case?"
    options: [annual, mid-year, promo-case]
    required: true
  - step: 1
    question: "What is the designer's current level, and should we use the default rating scale or a custom one?"
    options: [default, custom]
    default: default
    required: true
  - step: 1
    question: "Which inputs do you have — self-assessment, peer/360 feedback, manager notes, prior goals?"
    required: true
  - step: 5
    question: "Publish the review to the talent-review database?"
    required: false
    default: false
  - step: 5
    question: "Draft a delivery or summary note?"
    required: false
    default: false
---

# Performance Review Writer

## Overview

Use this skill to write a manager-authored performance review for a product designer you manage. Accepts the designer's context (role, level, review period), and optionally a self-assessment, peer/360 feedback, manager notes and artifacts, and prior-cycle goals. Produces goal attainment against prior goals, a competency scorecard with evidence, an overall rating, balanced strengths and growth areas, and a next-cycle growth plan.

The output should be fair, evidence-based, and calibrated to the designer's level: every competency rating cites specific evidence from the review period, the review balances strengths with growth areas, and it evaluates the work and behavior in the period — not the person. Built for design managers and leaders. Output is formatted for use in a talent-review database, a calibration spreadsheet, or a delivery note, and hands off cleanly to goal-setting and talent-review communication. When the target tool is specified, adapt the review format accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Publish the completed review to the talent-review or HR database with level, ratings, evidence, and growth plan | Output the review as markdown; user pastes it into the database manually |
| **Google Sheets** | Build the competency rating matrix as a structured spreadsheet with rating, level vs expectation, and evidence per dimension for calibration | Output the rating matrix as a markdown table; user creates the spreadsheet manually |
| **Gmail** | Draft an optional delivery or summary note for the designer or skip-level summarizing the rating and growth focus | Output the draft note as text; user sends it manually |

## Workflow

### Step 1: Establish cycle, level, rating scale, and available inputs
- **Reads:** designer_context, rubric (if provided)
- **Ask user:** "What review cycle is this — annual, mid-year, or a promotion case?" — options: annual, mid-year, promo-case. Calibrates depth and the promotion-readiness read.
- **Ask user:** "What is the designer's current level, and should we use the default rating scale or a custom one?" — options: default, custom. Default: default. Every rating is calibrated against this level.
- **Ask user:** "Which inputs do you have — self-assessment, peer/360 feedback, manager notes, prior goals?" — determines which evidence sources are available.
- **Actions:**
  - Capture the designer, level, review period, and cycle type.
  - Use the default rubric dimensions unless a custom rubric is supplied: Craft & quality; Problem framing & strategy; Impact & outcomes; Collaboration & influence; Communication & storytelling; Autonomy & ownership; Growth & receptiveness to feedback.
  - Adopt the named 5-level rating scale: 1 Below expectations / 2 Inconsistently meets / 3 Meets expectations / 4 Exceeds / 5 Outstanding — judged against the designer's current level.
  - Note which input sources are present; thinner evidence lowers confidence and is stated in the output.
- **If** a custom rubric is provided → use those dimensions and map them to the 5-level scale.
- **If** key inputs are missing → proceed with available evidence and flag the gap in Open Questions rather than inventing signal.
- **Produces:** Populated `Review Context` section
- **References:** `references/performance-review-template.md`, `references/performance-rubric.md`

### Step 2: Synthesize the inputs into evidence
- **Reads:** self_assessment, peer_feedback, manager_notes (whichever are provided)
- **Actions:**
  - Reconcile the self-assessment, peer/360 feedback, and manager notes into a single evidence base organized by competency.
  - Synthesize peer feedback into themes with attribution context (e.g., "two cross-functional partners noted…") — do not paste verbatim quotes as the assessment.
  - Where sources conflict (self-assessment vs peer view), surface the discrepancy rather than averaging it away.
  - Keep evidence anchored to the review period and to observable work and behavior.
- **Produces:** Internal evidence base feeding all later sections
- **References:** `references/performance-rubric.md`

### Step 3: Assess goal attainment
- **Reads:** prior_goals, Step 2 evidence base
- **Actions:**
  - For each prior goal, state attainment — met / partial / missed — with the evidence that supports it.
  - Note goals that were descoped or changed mid-cycle and why, rather than scoring them as missed.
- **If** no prior goals were supplied → record that goal attainment could not be assessed and note it in Open Questions; do not fabricate goals.
- **Produces:** Populated `Goal Attainment` section

### Step 4: Score each competency dimension
- **Reads:** Step 2 evidence base, Step 1 level and rating scale
- **Actions:**
  - Rate every competency dimension on the 1-5 scale and cite specific evidence from the period for each rating.
  - Calibrate each rating against the designer's current level — what "meets" looks like at this level, not in the absolute.
  - Differentiate: surface the genuine spread of strengths and weaker areas rather than rating everything the same.
  - Mark a dimension with no supporting evidence as not-yet-evidenced rather than rating it low by default.
- **Checkpoint:** "I've rated all [N] competencies against [level] with evidence. The spread runs from [lowest] to [highest]. Ready to synthesize the overall rating and growth plan?"
- **Tool action — Google Sheets (if available):** Build the competency rating matrix with rating, level vs expectation, and evidence per dimension.
- **If** Google Sheets unavailable → output the rating matrix as a markdown table.
- **Produces:** Populated `Competency Scorecard` section

### Step 5: Synthesize overall rating, strengths, and growth areas
- **Reads:** Step 3 goal attainment, Step 4 scorecard
- **Actions:**
  - Write a 2-3 sentence overall read and assign an overall rating that reflects the scorecard spread and goal attainment, not a flat average.
  - Give a promotion-readiness read appropriate to the cycle (especially for a promo-case).
  - Name strengths backed by specific evidence, and growth areas each paired with why it matters at the designer's level.
  - Keep the review balanced — strengths and growth areas both present; avoid an all-positive or all-negative review.
- **Produces:** Populated `Overall Summary & Rating`, `Strengths`, and `Growth Areas` sections

### Step 6: Build the growth plan, format, and publish
- **Reads:** All previous step outputs
- **Ask user:** "Publish the review to the talent-review database?" — Default: no.
- **Ask user:** "Draft a delivery or summary note?" — Default: no.
- **Actions:**
  - Turn the growth areas into a prioritized next-cycle growth plan with specific, ownable development actions and suggested goal themes.
  - Use `references/performance-review-template.md` for the response structure; lead with the Overall Summary & Rating and Competency Scorecard for quick scanning.
  - Capture unresolved items and evidence gaps in `Open Questions / Calibration Notes`.
- **Tool action — Notion (if available and user confirms):** Publish the review to the talent-review database with level, ratings, evidence, and growth plan.
- **If** Notion unavailable → output the review as markdown for manual entry.
- **Tool action — Gmail (if available and user confirms):** Draft a delivery or summary note for the designer or skip-level.
- **If** Gmail unavailable → output the draft note as text.
- **If** downstream handoff needed → produce the handoff block per `references/performance-review-handoff-schema.md`.
- **Next steps:** Based on output, suggest:
  - "To turn the growth plan into measurable next-cycle goals, use `$design-okr-writer`."
  - "To roll calibration results into a talent-review summary, use `$stakeholder-presentation-writer`."
- **Produces:** Complete review with all required sections including `Growth Plan / Next-Cycle Focus`, plus the optional `performance_review_handoff` block when feeding a downstream skill
- **References:** `references/performance-review-template.md`, `references/performance-review-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Review Context | yes | - | key-value fields: designer, role, level, review period, cycle type, inputs used, rating scale |
| Overall Summary & Rating | yes | - | 2-3 sentence read plus an overall rating and a promotion-readiness note |
| Goal Attainment | yes | 1 per prior goal | per goal: status (met / partial / missed) and supporting evidence; states absence if no prior goals |
| Competency Scorecard | yes | 7 dimensions | table: dimension / rating / level vs expectation (meets/exceeds/below/not-yet-evidenced) / evidence |
| Strengths | yes | 2 items | specific strengths each backed by evidence from the period |
| Growth Areas | yes | 2 items | growth areas, each with why it matters at the designer's level |
| Growth Plan / Next-Cycle Focus | yes | 1 per growth area | prioritized, ownable development actions plus suggested goal themes |
| Open Questions / Calibration Notes | yes | 1 item | unresolved items, evidence gaps, and confidence caveats |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Competency Scorecard | Every competency rating cites specific evidence from the review period (not "strong craft" but "led the billing redesign, shipping a token system adopted by 3 other teams") | blocker |
| QB-02 | Competency Scorecard | Every rating is calibrated to the designer's current level — what "meets" means at this level — not an absolute or cross-level judgment | blocker |
| QB-03 | Goal Attainment | Attainment is assessed against each prior goal with evidence, or the absence of prior goals is explicitly noted rather than fabricated | blocker |
| QB-04 | Strengths / Growth Areas | The review is balanced — at least 2 strengths AND at least 2 growth areas; not an all-positive or all-negative review | blocker |
| QB-05 | Overall Summary & Rating | The overall rating reflects the scorecard spread and goal attainment, not a flat average, and a promotion-readiness read is given | blocker |
| QB-06 | (whole review) | Bias guard: judges work and behavior within the review period — no recency bias, and no claims about personality beyond what the evidence shows | blocker |
| QB-07 | Growth Plan / Next-Cycle Focus | Growth-plan actions are specific and ownable by the designer, not generic advice ("write more docs by X" not "improve communication") | blocker |
| QB-08 | (whole review) | Peer feedback is synthesized into themes with attribution context, not pasted verbatim as the assessment | warning |
| QB-09 | Competency Scorecard | The review is differentiated — not every dimension is rated the same, and a dimension with no evidence is marked not-yet-evidenced rather than rated low by default | warning |
| QB-10 | Review Context | The evidence basis (which inputs were available) is stated so confidence is clear | warning |

## Reference Navigation

Read only what is needed:
- review output shell and rating scale: `references/performance-review-template.md`
- competency dimensions with per-level behavioral anchors: `references/performance-rubric.md`
- downstream handoff block and field typing: `references/performance-review-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_performance_review, year_end_review, mid_cycle_review, promotion_case, evaluate_direct_report]

- "Write the annual performance review for my senior designer."
- "Help me draft a mid-year review from these 1:1 notes and peer feedback."
- "Build the promotion case review for this designer going from mid to senior."

### Negative
- "Evaluate this candidate's portfolio for a senior role." -> `$portfolio-reviewer`
- "Assess our design team's maturity and where to invest." -> `$design-maturity-assessment`
- "Set next-cycle goals and OKRs for the team." -> `$design-okr-writer`
- "Critique our team's checkout design." -> `$design-critique`
- "Build the interview scorecard and questions for this candidate." -> `$interview-scorecard`

### Ambiguous
- "How is this designer doing?" (clarify: a formal performance review against a leveled rubric, or an informal read of recent work?)
- "Review this designer's work." (clarify: a performance review of the person this cycle, or a design critique of a specific artifact?)
