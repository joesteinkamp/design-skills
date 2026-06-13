---
name: interview-scorecard
description: "Generate structured, competency-based interview scorecards and behavioral question banks for hiring product designers, and optionally turn raw post-interview notes into an evidence-based evaluation. Use when requests involve interview scorecards, hiring rubrics, behavioral question banks, or scoring a candidate against role competencies. Not for evaluating a portfolio artifact, planning usability research, or writing a role's success metrics."

# Discovery & Auto-Selection
category: evaluation
tags: [hiring, interview, scorecard, competencies, behavioral-questions, calibration]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [portfolio-reviewer]
downstream_skills: []

# Input Contract
inputs:
  - name: role_spec
    required: true
    type: text
    description: "The role, level, and the competencies it requires (e.g. senior product designer, IC5, craft + collaboration + systems thinking)"
  - name: interview_type
    required: true
    type: text
    description: "Which round this scorecard covers: portfolio/craft, app/whiteboard, collaboration/behavioral, or leadership"
  - name: notes
    required: false
    type: text
    description: "Raw post-interview notes to score against the competencies (only when scoring a completed interview)"

# Output Contract
outputs:
  - name: interview_scorecard
    type: interview_scorecard
    template: references/interview-scorecard-template.md
  - name: interview_scorecard_handoff
    required: false
    type: interview_scorecard_handoff
    schema: references/interview-scorecard-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: interview_type
  parallelizable: true

# Tool Integration
tools:
  - name: notion
    actions: [publish_scorecard]
    when: "Writing the scorecard to the hiring database for the panel to use and complete"
  - name: gmail
    actions: [share_with_panel]
    when: "Sending the scorecard to the interviewers ahead of the round"
  - name: google_calendar
    actions: [schedule_debrief]
    when: "Setting up the panel debrief after interviews complete"

# User Input Gates
user_inputs:
  - step: 1
    question: "What role and level, and which competencies matter for this hire?"
    required: true
  - step: 1
    question: "Which interview round is this — portfolio, craft/app, collaboration, or leadership?"
    options: [portfolio, craft, collaboration, leadership]
    required: true
  - step: 1
    question: "Generate questions for an upcoming interview, or score a completed one from notes?"
    options: [generate, score]
    default: generate
    required: true
  - step: 5
    question: "Publish to the hiring database and share with the panel?"
    required: false
    default: false
---

# Interview Scorecard

## Overview

Use this skill to build calibrated, competency-based interview scorecards for hiring product designers — and, when notes are provided, to turn a completed interview into an evidence-based evaluation. Accepts a role spec (level and required competencies), the interview round being run, and optionally raw post-interview notes, and produces a rubric, a behavioral question bank, and a recommendation.

The output should be panel-ready and fair: every competency gets behavioral rating anchors so interviewers agree on what each rating level looks like, questions are open and behavioral rather than leading or yes/no, and competencies are scoped to the round so the panel covers the candidate from different angles instead of duplicating each other. When scoring, every rating cites specific evidence from the notes and the overall recommendation maps to the competency scores. Output is formatted for use in a hiring database (Notion, Greenhouse, Lever) or as a standalone scorecard. When the target system is specified, adapt the field structure accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Publish the scorecard to the hiring database as a page so each interviewer can fill in ratings and evidence | Output as markdown; user pastes into the hiring database manually |
| **Gmail** | Send the scorecard to the interview panel ahead of the round with round context and instructions | Output a panel-ready email draft as text; user sends manually |
| **Google Calendar** | Schedule the panel debrief after interviews complete, with attendees and the scorecard linked | Include "schedule debrief" in the logistics note; user books manually |

## Workflow

### Step 1: Establish role, level, and round
- **Reads:** role_spec, interview_type, notes (if provided)
- **Ask user:** "What role and level, and which competencies matter for this hire?" — anchors the competency set and the anchor wording per level.
- **Ask user:** "Which interview round is this — portfolio, craft/app, collaboration, or leadership?" — determines which competencies this scorecard scopes.
- **Ask user:** "Generate questions for an upcoming interview, or score a completed one from notes?" — Default: generate. Scoring requires notes.
- **Actions:**
  - Restate the role, level, and the competencies the role requires.
  - Confirm the round and the mode (generate vs. score).
  - If mode is score, confirm raw notes are attached; if not, fall back to generate.
- **Produces:** Populated `Interview Context` section

### Step 2: Scope competencies and define rating anchors
- **Reads:** Step 1 output
- **Actions:**
  - Select only the competencies this round should assess, so the panel divides coverage rather than all testing the same thing.
  - For each competency, write what to probe (the behaviors that reveal it).
  - Write behavioral rating anchors describing what each rating level looks like at this role's level — not adjectives ("good", "weak") but observable behavior ("redesigned the flow and ran a test to validate the change" vs. "described the change but could not say how they knew it worked").
- **Checkpoint:** "Here is the competency rubric scoped to the [round] round with rating anchors per level. Does this coverage match what you need this round to assess?"
- **Produces:** Populated `Competency Rubric` section
- **References:** `references/interview-scorecard-template.md`

### Step 3: Generate the behavioral question bank
- **Reads:** Step 2 rubric
- **Actions:**
  - For each competency, write 2-3 open behavioral questions ("Tell me about a time...", "Walk me through how you...") tied to the behaviors being probed.
  - Add follow-up probes that push for specifics: the candidate's actual role, the tradeoff they made, how they knew it worked.
  - Screen every question for bias — remove anything that proxies for age, background, school pedigree, or culture-fit-as-sameness; reframe to ask about the behavior directly.
- **Produces:** Populated `Question Bank` section
- **References:** `references/interview-scorecard-template.md`

### Step 4: Score the notes (only if mode is score)
- **Reads:** notes, Step 2 rubric
- **If** mode is generate → skip this step; the `Evaluation` section stays blank for interviewers to complete.
- **If** mode is score:
  - Map statements in the notes to the competencies in the rubric.
  - Rate each competency against its anchors, and cite the specific evidence or a direct quote from the notes that supports the rating.
  - Flag competencies with no supporting evidence as "not assessed" rather than guessing.
- **Produces:** Populated `Evaluation` section (when scoring)

### Step 5: Synthesize recommendation and format
- **Reads:** All previous step outputs
- **Ask user:** "Publish to the hiring database and share with the panel?" — Default: output as markdown.
- **Actions:**
  - Derive an overall recommendation (strong yes / yes / no / strong no) that maps to the competency scores — a "yes" cannot sit on top of mostly low ratings.
  - Write notes for the debrief: what other interviewers should dig into, and any unresolved signal.
  - Use `references/interview-scorecard-template.md` for the response structure.
- **Tool action — Notion (if available and user confirms):** Publish the scorecard to the hiring database as a page interviewers can fill in.
- **If** Notion unavailable → output as markdown for manual paste.
- **Tool action — Gmail (if available and user confirms):** Draft a panel email with the scorecard, round context, and instructions.
- **If** Gmail unavailable → output the email draft as text.
- **Tool action — Google Calendar (if available and user confirms):** Schedule the panel debrief with attendees and the scorecard linked.
- **If** Calendar unavailable → note "schedule debrief" in the logistics line.
- **Next steps:** Based on output, suggest:
  - "To evaluate the candidate's portfolio artifact in depth, use `$portfolio-reviewer`."
  - "To plan a usability study the candidate's work could inform, use `$usability-test-planner`."
  - "To define the success metrics this role will own, use `$design-success-metrics-writer`."
- **Produces:** Complete scorecard with all required sections
- **References:** `references/interview-scorecard-template.md`, `references/interview-scorecard-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Interview Context | yes | - | key-value fields: role, level, round, mode, competencies assessed |
| Competency Rubric | yes | 3 competencies | table: competency / what to probe / rating anchors per level |
| Question Bank | yes | 2 questions per competency | per competency: open behavioral questions with follow-up probes |
| Evaluation | conditional | 1 row per competency assessed | table: competency / rating / evidence (quote or specific behavior) — required when mode is score |
| Recommendation | yes | - | overall recommendation (strong yes / yes / no / strong no) with rationale tied to scores |
| Notes for Debrief | yes | 1 note | what to dig into next and any unresolved signal |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Competency Rubric | Every competency has behavioral rating anchors describing what each rating level looks like, not adjectives | blocker |
| QB-02 | Question Bank | Every question is open and behavioral ("Tell me about a time...", "Walk me through..."), not leading or answerable with yes/no | blocker |
| QB-03 | Question Bank | No question proxies for age, background, school pedigree, or culture-fit-as-sameness | blocker |
| QB-04 | Evaluation | When scoring, every rating cites specific evidence or a direct quote from the notes; competencies with no evidence are marked "not assessed" | blocker |
| QB-05 | Recommendation | The overall recommendation maps to the competency scores (a "yes" does not sit on mostly low ratings) | blocker |
| QB-06 | Competency Rubric | Competencies are scoped to this round so interviewers do not all assess the same thing | warning |
| QB-07 | Question Bank | Each competency has at least 2 questions, each with at least one follow-up probe | warning |

## Reference Navigation

Read only what is needed:
- scorecard output shell and field typing: `references/interview-scorecard-template.md`
- handoff schema for downstream skills: `references/interview-scorecard-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [build_interview_scorecard, generate_behavioral_questions, score_interview_notes, calibrate_panel, define_competency_rubric]

- "Build an interview scorecard for a senior designer craft round."
- "Give me behavioral questions to assess collaboration for this role."
- "Score my interview notes against the competencies."

### Negative
- "Review this candidate's portfolio." -> `$portfolio-reviewer`
- "Plan a usability study for this feature." -> `$usability-test-planner`
- "Write the success metrics this role will own." -> `$design-success-metrics-writer`

### Ambiguous
- "Help me evaluate this candidate." -> Clarify: do you want an interview scorecard with behavioral questions and rating anchors, or a deep review of their portfolio artifact (`$portfolio-reviewer`)?
- "Set up our designer hiring." -> Clarify: a scorecard and question bank for an interview round, or something else in the hiring process?
