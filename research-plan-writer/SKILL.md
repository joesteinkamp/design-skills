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

# Tool Integration
tools:
  - name: google_calendar
    actions: [find_availability, create_event]
    when: "Scheduling research sessions"
  - name: typeform
    actions: [create_screener, create_questionnaire]
    when: "Building recruitment screener or post-session survey"
  - name: zoom
    actions: [create_meeting]
    when: "Setting up remote moderated sessions"
  - name: gmail
    actions: [send_recruitment, send_screener_link]
    when: "Recruiting participants or sharing plan"
  - name: gong
    actions: [configure_recording]
    when: "Recording sessions for transcription"
  - name: notion
    actions: [publish_plan, track_recruitment]
    when: "Publishing research plan or tracking progress"
  - name: github
    actions: [create_issue]
    when: "Creating research tracking issue"

# User Input Gates
user_inputs:
  - step: 1
    question: "What business decision will this research inform?"
    required: true
  - step: 1
    question: "What do you already know vs. need to learn?"
    required: false
  - step: 2
    question: "Constraints?"
    options: [tight_timeline, limited_budget, no_user_access, no_constraints]
    default: no_constraints
  - step: 2
    question: "Preferred method?"
    options: [interviews, survey, diary_study, concept_test, let_me_recommend]
    default: let_me_recommend
  - step: 4
    question: "Want me to create the Typeform screener and schedule sessions?"
    required: false
    default: false
---

# Research Plan Writer

## Overview

Use this skill to create structured research plans that set up studies for success. Accepts product briefs, design specs (from `$design-spec-writer`), journey maps (from `$journey-mapper`), or research questions and produces actionable plans with methodology, discussion guides, and logistics.

This is the upstream counterpart to `$research-synthesizer`—it plans the study; Research Synthesizer analyzes the results.

The output should be execution-ready: a clear methodology, a complete discussion guide or survey instrument, recruitment criteria, and a timeline a researcher can follow. Output is formatted for use in Dovetail, Google Docs, Notion, or Confluence. When the target tool is specified, adapt the plan structure and linking conventions accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Google Calendar** | Find researcher + participant availability; create session calendar events with Zoom links | Output a proposed schedule as a table; user books manually |
| **Typeform** | Build recruitment screener survey; create post-session questionnaire (SUS, CSAT) | Output screener as markdown checklist; user creates form manually |
| **Zoom** | Create meeting links for remote moderated sessions with recording enabled | Include "set up Zoom meeting" in logistics checklist |
| **Gmail** | Send recruitment emails with screener link; send calendar invites | Output email draft as text; user sends manually |
| **Gong** | Configure session recording for automated transcription → feeds `$research-synthesizer` | Include "record session" in logistics checklist; user sets up manually |
| **Notion** | Publish research plan as Notion page; create recruitment tracker database | Output as markdown; user pastes into Notion |
| **GitHub / GitLab** | Create research tracking issue with timeline and milestones | Include tracking checklist in plan output |

## Workflow

### Step 1: Define research objectives
- **Reads:** research_questions, design_spec (if provided), journey_context (if provided)
- **Ask user:** "What business decision will this research inform?" — if not already stated in the input. Default: state the implied decision based on context.
- **Ask user:** "What do you already know vs. what do you need to learn?" — helps separate assumptions from genuine unknowns.
- **Actions:**
  - Clarify the business decision the research will inform.
  - Write 3-5 specific research questions (not yes/no questions).
  - Identify what is known vs. unknown (assumptions to validate).
  - Determine scope: generative (discover) vs. evaluative (validate).
- **If** design_spec provided → extract open questions and unvalidated assumptions as research inputs.
- **If** journey_context provided → extract pain points rated "critical" or "major" as priority research areas.
- **Produces:** Populated `Research Overview` and `Research Questions & Assumptions` sections

### Step 2: Select methodology
- **Reads:** Step 1 output
- **Ask user:** "Any constraints I should know about?" — options: tight timeline (<2 weeks), limited budget, no direct user access, no constraints. Default: no constraints.
- **Ask user:** "Do you have a preferred method, or should I recommend one?" — options: interviews, survey, diary study, concept test, let me recommend. Default: let me recommend.
- **Actions:**
  - Choose method(s) based on research questions and constraints.
  - Justify the method selection (why this method answers these questions).
  - Common methods: interviews, contextual inquiry, diary study, survey, card sort, concept test, usability test (for usability testing, recommend `$usability-test-planner`).
  - Define whether qualitative, quantitative, or mixed methods.
  - Note limitations of the chosen approach.
- **If** evaluative research + prototype available → recommend `$usability-test-planner` instead or as complement.
- **If** tight timeline (<2 weeks) → recommend unmoderated survey or guerrilla testing; flag trade-offs.
- **If** no direct user access → recommend survey via existing channels, intercept study, or stakeholder interviews as proxy.
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
- **Checkpoint:** "Here are the [N] research questions and the discussion guide structure. Does this cover what you need to learn, or should I adjust the focus?"
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
- **Ask user:** "Want me to create the Typeform screener from these criteria?" — Default: output as markdown.
- **Tool action — Typeform (if available and user confirms):**
  - Create screener survey with qualifying questions, disqualifying questions, and contact info capture.
  - Share screener link in output.
- **If** Typeform unavailable → output screener as a markdown checklist with question text, response options, and pass/fail logic.
- **Produces:** Populated `Recruitment Plan` section

### Step 5: Plan logistics and timeline
- **Reads:** All previous step outputs
- **Actions:**
  - Estimate study duration from recruitment through analysis.
  - Define team roles (moderator, note-taker, observer).
  - List tools and platforms needed.
  - Plan for consent, recording, and data storage.
  - Identify risks and mitigation strategies.
- **Ask user:** "Want me to find available time slots and book sessions?" — Default: output schedule as a table.
- **Tool action — Google Calendar (if available and user confirms):**
  - Find available slots for researcher across the proposed study window.
  - Create calendar events for each session with Zoom link (if Zoom available).
  - Include buffer time between sessions (15 min).
- **Tool action — Zoom (if available):**
  - Create meeting links for each session with recording enabled.
  - Include Zoom links in calendar events.
- **Tool action — Gong (if available):**
  - Note Gong configuration instructions for session recording.
  - Flag that transcripts will feed `$research-synthesizer` after study completion.
- **Tool action — Gmail (if available and user confirms):**
  - Draft recruitment email with study description, incentive, and screener link.
  - Draft session confirmation email with Zoom link, consent form, and logistics.
- **If** no scheduling tools available → output proposed schedule as a table with dates, times, and roles.
- **Produces:** Populated `Logistics & Timeline` section

### Step 6: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Assemble sections using `references/research-plan-template.md`.
  - Use `references/discussion-guide-template.md` for interview/discussion guide formatting.
  - Ensure the plan is actionable by a researcher or research ops team.
- **Tool action — Notion (if available):**
  - Publish research plan as a Notion page.
  - Create recruitment tracker (participant name, screener status, session date, consent status).
- **Tool action — GitHub/GitLab (if available):**
  - Create research tracking issue with timeline milestones.
- **Next steps:** Based on output, suggest:
  - "When sessions are complete, use `$research-synthesizer` to analyze the data."
  - "If usability testing is also needed, use `$usability-test-planner` for task-based test planning."
  - "If you need a post-task questionnaire, I can create one in Typeform."
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
