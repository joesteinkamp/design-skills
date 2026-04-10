# Usability Test Plan Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Study title | yes | text | concise descriptive title |
> | Feature/area being tested | yes | text | specific scope |
> | Test type | yes | enum | moderated / unmoderated |
> | Format | yes | enum | remote / in-person |
> | Prototype fidelity | yes | enum | low / medium / high / production |
> | Estimated session duration | yes | text | time value |
> | Test owner | yes | text | named person or role |
> | Status | yes | enum | draft / recruiting / in-progress / complete |
> | Research Questions | yes | list | min 3, max 5 |
> | Target segments | yes | list | min 1 segment |
> | Participant count | yes | number | must include justification |
> | Screening Questionnaire | yes | table | columns: #, Question, Qualifying Answer, Disqualifying Answer; min 3 rows |
> | Recruitment source | yes | text | channel name |
> | Incentive | yes | text | amount and type |
> | Task Scenarios | yes | list | min 3 tasks; each needs Scenario, User goal, Success criteria, Measures |
> | Success criteria | yes | list | observable and unambiguous per task |
> | Measures | yes | list | from: completion / time / errors / path / satisfaction |
> | Maps to | yes | text | must reference an RQ# per task |
> | Introduction script | yes | text | includes consent, think-aloud protocol |
> | Pre-Task Questions | yes | list | min 2 questions |
> | Post-Session Questions | yes | list | min 3 questions; must include SUS or similar |
> | Analysis Method | yes | key-value | approach + severity scale (critical/high/medium/low) |
> | Success Thresholds | yes | table | columns: Task, Completion Target, Time Target, Error Threshold |
> | Findings-to-Questions Map | yes | table | columns: Research Question, Tasks, Key Findings, Severity |

Use this as the default response structure for `usability-test-planner`.

## Test Overview

- Study title:
- Feature/area being tested:
- Test type: (moderated / unmoderated)
- Format: (remote / in-person)
- Prototype fidelity: (low / medium / high / production)
- Estimated session duration:
- Test owner:
- Status: (draft / recruiting / in-progress / complete)

## Research Questions

- RQ1:
- RQ2:
- RQ3:
- RQ4:
- RQ5:

## Recruitment & Screener

### Participant Profile
- Target segments:
- Participant count: (with justification)
- Key characteristics:
- Accessibility considerations:

### Screening Questionnaire

| # | Question | Qualifying Answer | Disqualifying Answer |
|---|----------|------------------|---------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

### Recruitment Logistics
- Recruitment source:
- Incentive:
- Scheduling approach:

## Task Scenarios

For each task, use the format in `task-scenario-template.md`.

### Task 1: [Task Name]
- Scenario:
- User goal:
- Success criteria:
- Completion signal:
- Max time:
- Measures: (completion / time / errors / path / satisfaction)
- Maps to: (RQ#)

### Task 2: [Task Name]
(repeat structure)

### Task 3: [Task Name]
(repeat structure)

### Task 4: [Task Name]
(repeat structure)

### Task 5: [Task Name]
(repeat structure)

## Discussion Guide

### Introduction (5 min)
- Welcome and thank participant
- Explain session purpose (without revealing hypotheses)
- Consent and recording permissions
- Think-aloud protocol instructions:
  - "As you work through each task, please share what you're thinking, what you expect to happen, and any confusion you experience."
- Clarify: no wrong answers, we're testing the design not you

### Pre-Task Questions (5 min)
- Current experience with [domain]:
- Frequency of [relevant activity]:
- Tools/products currently used:

### Task Execution (core of session)
For each task:
- Read scenario aloud
- Observe without intervening
- Probing questions (use only if participant is stuck or silent):
  - "What are you looking for?"
  - "What do you expect to happen next?"
  - "Tell me what you're thinking."
- Post-task question: "On a scale of 1-7, how easy or difficult was that task?"
- Post-task follow-up: "What, if anything, was confusing?"

### Post-Session Questions (10 min)
- "What was your overall impression?"
- "What was the easiest part? The hardest?"
- "Is there anything you expected to find but didn't?"
- System Usability Scale (SUS) or similar standardized measure
- "Any other thoughts or feedback?"

### Wrap-Up (2 min)
- Thank participant
- Explain next steps
- Provide incentive details

## Analysis Framework

### Observation Capture
- Method: (notes template / recording review / rainbow spreadsheet)
- Note-taker assignments:
- Recording storage:

### Analysis Method
- Approach: (affinity mapping / rainbow spreadsheet / severity rating)
- Severity scale:
  - Critical: User cannot complete task, no workaround
  - High: User completes task with significant difficulty
  - Medium: User completes task with minor difficulty
  - Low: Cosmetic issue, minor friction

### Success Thresholds
| Task | Completion Target | Time Target | Error Threshold |
|------|------------------|-------------|-----------------|
| Task 1 | | | |
| Task 2 | | | |
| Task 3 | | | |
| Task 4 | | | |
| Task 5 | | | |

### Findings-to-Questions Map
| Research Question | Tasks | Key Findings | Severity |
|-------------------|-------|-------------|----------|
| RQ1 | | | |
| RQ2 | | | |
| RQ3 | | | |

### Reporting
- Findings report format:
- Stakeholder presentation:
- Recommended downstream skill: (e.g., `$research-synthesizer` for full synthesis)

---

## Copy-Ready Moderator Script

Use these verbatim during moderated sessions.

### Session Introduction
"Thank you for taking the time to help us today. I'm [name], and I'll be walking you through some tasks on [product/prototype]. Before we start, I want to set expectations:

- There are no right or wrong answers. We're testing the design, not you.
- I'd like you to think aloud as you go — tell me what you're looking at, what you're thinking, and what you expect to happen.
- If you get stuck, that's valuable information. I may not help you right away because I want to see where the design could be clearer.
- We'll be recording this session for our team's reference. Your feedback will be anonymized.
- Do you have any questions before we begin?"

### Think-Aloud Prompt
"As you work through each task, please think out loud. Tell me what you see, what you're trying to do, and what you expect will happen when you take an action. If you go quiet for a bit, I may prompt you with 'What are you thinking right now?'"

### Task Introduction
"I'm going to give you a scenario. Please read it aloud, and then try to complete the task as you normally would. Remember, think aloud as you go."

### Neutral Probing Questions
- "What are you thinking right now?"
- "What did you expect to happen there?"
- "Can you tell me more about why you chose that?"
- "Where would you look for that?"
- "How does this compare to what you expected?"

### Post-Task Questions
- "On a scale of 1-7, how difficult was that task? (1 = very easy, 7 = very difficult)"
- "How would you describe that experience in your own words?"
- "Was there a point where you felt unsure about what to do next?"

### Session Wrap-Up
"That's all the tasks I have for you today. Before we finish:
- Is there anything about [product] that we didn't cover that you'd like to mention?
- If you could change one thing about what you just saw, what would it be?
Thank you for your time — your feedback is extremely helpful."

## Starter Task Scenario Example

### Task 3: Recover from a failed payment

**Context:** "You just placed an order for a new pair of headphones. Your credit card was declined."

**User goal:** Find out why the payment failed and successfully complete the purchase using a different payment method.

**Success criteria:**
- User navigates to the failed order or payment error screen.
- User identifies the reason for failure (or acknowledges the error message).
- User adds or selects an alternative payment method.
- User successfully completes the purchase.

**Measurables:**
- Completion: yes/no
- Time on task: target < 90 seconds
- Errors: count of wrong paths taken
- Path: expected vs. actual navigation sequence

**Probing questions for this task:**
- "What did you expect to see after the payment failed?"
- "How confident are you that the purchase went through this time?"
