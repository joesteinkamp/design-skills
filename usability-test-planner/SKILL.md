---
name: usability-test-planner
description: "Plan and script moderated or unmoderated usability tests with task scenarios, recruitment screeners, and analysis frameworks. Use when requests involve usability testing, task-based testing, user testing scripts, or test facilitation guides — not A/B tests, not research plans, not candidate evaluation."

# Discovery & Auto-Selection
category: evaluation
tags: [usability-testing, task-scenarios, moderated-testing, think-aloud, recruitment]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer, user-flow-mapper, persona-creator]
downstream_skills: [research-synthesizer]

# Input Contract
inputs:
  - name: design_to_test
    required: true
    type: text
    description: "Design specs, prototypes, user flows, or feature descriptions to test"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with interaction details and user stories"
  - name: user_flows
    required: false
    type: user_flows
    source_skill: user-flow-mapper
    description: "User flows with happy paths and decision branches"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards for recruitment targeting"

# Output Contract
outputs:
  - name: test_plan
    type: usability_test_plan
    template: references/usability-test-plan-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_to_test
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_screenshot]
    when: "Capturing prototype screens for task scenarios"
  - name: typeform
    actions: [create_questionnaire, create_screener]
    when: "Building post-task questionnaire (SUS/CSAT) or recruitment screener"
  - name: google_calendar
    actions: [find_availability, create_event]
    when: "Scheduling test sessions with participants"
  - name: zoom
    actions: [create_meeting]
    when: "Setting up remote moderated sessions"
  - name: gmail
    actions: [send_recruitment, send_scheduling]
    when: "Sending recruitment or scheduling emails"
  - name: gong
    actions: [configure_recording]
    when: "Recording moderated sessions for transcription"
  - name: notion
    actions: [publish_plan]
    when: "Publishing test plan as a Notion page"

# User Input Gates
user_inputs:
  - step: 1
    question: "Moderated or unmoderated?"
    required: true
    options: [moderated, unmoderated]
  - step: 1
    question: "Remote or in-person?"
    required: true
    options: [remote, in-person]
  - step: 2
    question: "How many participants?"
    required: false
    default: 5 per segment
  - step: 3
    question: "Prototype available?"
    required: true
    options: [figma_url, other_url, not_yet]
  - step: 5
    question: "Want me to create the Typeform screener and book Zoom sessions?"
    required: false
    default: false
---

# Usability Test Planner

## Overview

Use this skill to plan rigorous usability tests that reveal how real users interact with a design. Accepts design specs (from `$design-spec-writer`), prototypes, user flows (from `$user-flow-mapper`), or feature descriptions and produces structured test plans ready for execution.

The output should be facilitator-ready: clear task scenarios, a recruitment screener, a discussion guide, and an analysis framework for synthesizing observations. Output is formatted for use in Maze, UserTesting, Lookback, or as a facilitator script for live moderated sessions. When the target platform is specified, adapt task format and discussion guide accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Capture prototype screen screenshots via get_screenshot for embedding in task scenarios | Reference screens by name/description; user captures manually |
| **Typeform** | Create post-task questionnaire (SUS/CSAT) and recruitment screener survey | Output questionnaire and screener as markdown; user creates form manually |
| **Google Calendar** | Find availability and schedule test sessions with buffer time | Output proposed schedule as a table; user books manually |
| **Zoom** | Set up remote moderated sessions with recording enabled | Include "set up Zoom meeting" in logistics checklist |
| **Gmail** | Send recruitment emails and scheduling confirmations to participants | Output email drafts as text; user sends manually |
| **Gong** | Record moderated sessions for automated transcription; transcripts feed `$research-synthesizer` | Include "record session" in logistics checklist; user records manually |
| **Notion** | Publish test plan as a Notion page for team access | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Define research objectives
- **Reads:** design_to_test, design_spec (if provided), user_flows (if provided), personas (if provided)
- **Ask user:** "Moderated or unmoderated?" — determines discussion guide vs. self-serve task instructions.
- **Ask user:** "Remote or in-person?" — determines tooling and logistics setup.
- **Actions:**
  - Identify what design decisions or assumptions the test will validate.
  - Write 3-5 specific research questions the test must answer.
  - Determine test type: moderated vs. unmoderated, remote vs. in-person.
  - Specify fidelity level of the prototype or artifact being tested.
  - Default to the 5-participant think-aloud protocol for qualitative tests unless the user specifies otherwise. This is the canonical baseline: 5 participants per segment, moderated, think-aloud, 45-60 minute sessions.
- **If** moderated → plan discussion guide with think-aloud protocol, set up Zoom + Gong for recording.
- **If** unmoderated → plan self-serve task instructions, use Typeform for response capture.
- **Produces:** Populated `Test Overview` and `Research Questions` sections

### Step 2: Design recruitment
- **Reads:** Step 1 output, personas (if provided)
- **Ask user:** "How many participants?" — Default: 5 per segment.
- **Actions:**
  - Define target participant profile based on personas (from `$persona-creator`) or user segments.
  - Write a screening questionnaire with qualifying and disqualifying criteria.
  - Specify participant count (recommend 5-8 per segment for qualitative; justify if different).
  - Include diversity and accessibility considerations.
- **Produces:** Populated `Recruitment & Screener` section

### Step 3: Write task scenarios
- **Reads:** Step 1 research questions, design_spec (if provided), user_flows (if provided)
- **Ask user:** "Prototype available?" — options: Figma URL, other URL, not yet. Determines whether to reference specific screens.
- **Actions:**
  - Create 5-8 realistic task scenarios that map to research questions.
  - Write each task as a user goal, not a set of instructions (avoid leading language).
  - Order tasks from simple to complex to build participant confidence.
  - Include success criteria and completion signals for each task.
  - Define what to measure per task: completion, time, errors, path, satisfaction.
- **If** Figma prototype provided → reference specific screens in task scenarios.
- **Tool action — Figma (if available and Figma URL provided):**
  - Capture prototype screen screenshots via get_screenshot for each task scenario.
  - Embed screen references in task cards.
- **If** no prototype available → write scenarios against described flows; flag that scenarios should be updated when prototype is ready.
- **Produces:** Populated `Task Scenarios` section
- **References:** `references/task-scenario-template.md`

### Step 4: Build the discussion guide
- **Reads:** Step 1 research questions, Step 3 task scenarios
- **Actions:**
  - Write an introduction script covering consent, think-aloud protocol, and session expectations.
  - Structure pre-task questions to capture context and prior experience.
  - Define probing questions for each task (without leading the participant).
  - Write post-task and post-session questions (SUS, satisfaction, open-ended).
  - Include wrap-up and next-steps script.
- **If** moderated → full discussion guide with think-aloud prompts and per-task probes.
- **If** unmoderated → self-serve task instructions with embedded post-task questions.
- **Checkpoint:** "Here is the discussion guide with [N] task scenarios. Does the flow and probing strategy cover your research questions?"
- **Produces:** Populated `Discussion Guide` section

### Step 5: Plan analysis and logistics
- **Reads:** All previous step outputs
- **Ask user:** "Want me to create the Typeform screener and book Zoom sessions?" — Default: output as markdown.
- **Actions:**
  - Define how observations will be captured (notes template, recording, screen capture).
  - Specify analysis method: affinity mapping, rainbow spreadsheet, or severity rating.
  - Set success thresholds per task (e.g., 80% completion rate).
  - Map findings to research questions.
- **Tool action — Typeform (if available and user confirms):**
  - Create recruitment screener with qualifying/disqualifying questions and contact capture.
  - Create post-task questionnaire (SUS/CSAT) for standardized measurement.
  - Share links in output.
- **If** Typeform unavailable → output screener and questionnaire as markdown with question text, response options, and scoring.
- **Tool action — Google Calendar (if available):**
  - Find available slots for researcher across the proposed study window.
  - Create calendar events for each session with 15-minute buffer between sessions.
- **If** Calendar unavailable → output proposed schedule as a table with dates, times, and roles.
- **Tool action — Zoom (if available and remote sessions):**
  - Create meeting links for each session with recording enabled.
  - Include Zoom links in calendar events.
- **Tool action — Gong (if available and moderated):**
  - Configure session recording for automated transcription.
  - Flag that transcripts will feed `$research-synthesizer` after study completion.
- **Tool action — Gmail (if available and user confirms):**
  - Draft recruitment email with study description, incentive, and screener link.
  - Draft session confirmation email with Zoom link, consent form, and logistics.
- **If** no scheduling tools available → output proposed schedule as a table.
- **Produces:** Populated `Analysis Framework` section

### Step 6: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/usability-test-plan-template.md` for the response structure.
  - Use `references/task-scenario-template.md` for individual task formatting.
  - Ensure the plan is actionable by a moderator or uploaded to an unmoderated testing platform.
- **Tool action — Notion (if available):**
  - Publish test plan as a Notion page for team access.
- **Next steps:** Based on output, suggest:
  - "When sessions are complete, use `$research-synthesizer` to analyze the data."
  - "If you need a broader research plan beyond usability testing, use `$research-plan-writer`."
  - "If Gong recordings are available, `$research-synthesizer` can process transcripts automatically."
- **Produces:** Complete test plan with all required sections
- **References:** `references/usability-test-plan-template.md`, `references/task-scenario-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Test Overview | yes | - | key-value fields: test type, fidelity level, prototype description, session format, duration |
| Research Questions | yes | 3 questions | numbered research questions answerable through direct observation |
| Recruitment & Screener | yes | 3 criteria | participant profile, qualifying/disqualifying criteria, participant count with justification |
| Task Scenarios | yes | 5 tasks | goal-based task cards with success criteria, completion signals, and measurables |
| Discussion Guide | yes | - | scripted sections: intro/consent, pre-task questions, per-task probes, post-task/post-session questions, wrap-up |
| Analysis Framework | yes | - | capture method, analysis method, success thresholds per task, findings-to-questions mapping |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Task Scenarios | Every task scenario uses goal-based framing ("Update your notification preferences"), not step-by-step instructions ("Click the menu, then select Settings") | blocker |
| QB-02 | Research Questions | Research questions are answerable through direct observation of user behavior | blocker |
| QB-03 | Task Scenarios | At least 5 task scenarios are defined for a study with more than 2 research questions | blocker |
| QB-04 | Task Scenarios | Every task has explicit success criteria (what "done" looks like) and at least one measurable (completion, time, errors, or path) | blocker |
| QB-05 | Recruitment & Screener | Screener has at least 3 qualifying criteria and at least 1 disqualifying criterion | blocker |
| QB-06 | Discussion Guide | Discussion guide includes a verbatim think-aloud protocol introduction | blocker |
| QB-07 | Discussion Guide | Post-task questions use neutral language ("How would you describe that experience?"), not leading language ("Did you find that easy?") | blocker |
| QB-08 | Analysis Framework | Analysis framework defines a success threshold for at least one task (e.g., "80% completion rate") | blocker |
| QB-09 | Recruitment & Screener | Participant count is stated with justification | warning |

## Reference Navigation

Read only what is needed:
- test plan output shell: `references/usability-test-plan-template.md`
- task scenario format: `references/task-scenario-template.md`

## Trigger Examples

### Positive
Intents: [plan_usability_test, write_task_scenarios, create_test_script, design_discussion_guide, scope_user_testing]

- "Plan a usability test for the new onboarding flow."
- "Write a test script for our checkout redesign."
- "Help me set up an unmoderated usability study for the mobile app."
- "Create task scenarios to test the search experience."

### Negative
- "Design an A/B test for the checkout flow." -> `$ab-test-planner`
- "Synthesize these usability test results." -> `$research-synthesizer`
- "Plan a research study with interviews and surveys." -> `$research-plan-writer`
- "Write a design spec for the settings page." -> `$design-spec-writer`

### Ambiguous
- "I want to test this design with users." -> Clarify: do you want a usability test observing users complete tasks, an A/B test measuring metrics, or a research study exploring needs?
- "Should we test this?" -> Clarify: observational usability testing, controlled A/B experiment, or user research?
