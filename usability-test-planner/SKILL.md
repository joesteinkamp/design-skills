---
name: usability-test-planner
description: "Plan and script moderated or unmoderated usability tests with task scenarios, recruitment screeners, and analysis frameworks. Use when requests involve usability testing, task-based testing, user testing scripts, test facilitation guides, or evaluating designs through direct user observation."
---

# Usability Test Planner

## Overview

Use this skill to plan rigorous usability tests that reveal how real users interact with a design. Accepts design specs (from `$design-spec-writer`), prototypes, user flows (from `$user-flow-mapper`), or feature descriptions and produces structured test plans ready for execution.

The output should be facilitator-ready: clear task scenarios, a recruitment screener, a discussion guide, and an analysis framework for synthesizing observations. Output is formatted for use in Maze, UserTesting, Lookback, or as a facilitator script for live moderated sessions. When the target platform is specified, adapt task format and discussion guide accordingly.

## Workflow

1. Define research objectives.
- Identify what design decisions or assumptions the test will validate.
- Write 3-5 specific research questions the test must answer.
- Determine test type: moderated vs. unmoderated, remote vs. in-person.
- Specify fidelity level of the prototype or artifact being tested.
- Default to the 5-participant think-aloud protocol for qualitative tests unless the user specifies otherwise. This is the canonical baseline: 5 participants per segment, moderated, think-aloud, 45-60 minute sessions.

2. Design recruitment.
- Define target participant profile based on personas (from `$persona-creator`) or user segments.
- Write a screening questionnaire with qualifying and disqualifying criteria.
- Specify participant count (recommend 5-8 per segment for qualitative; justify if different).
- Include diversity and accessibility considerations.

3. Write task scenarios.
- Create 5-8 realistic task scenarios that map to research questions.
- Write each task as a user goal, not a set of instructions (avoid leading language).
- Order tasks from simple to complex to build participant confidence.
- Include success criteria and completion signals for each task.
- Define what to measure per task: completion, time, errors, path, satisfaction.

4. Build the discussion guide.
- Write an introduction script covering consent, think-aloud protocol, and session expectations.
- Structure pre-task questions to capture context and prior experience.
- Define probing questions for each task (without leading the participant).
- Write post-task and post-session questions (SUS, satisfaction, open-ended).
- Include wrap-up and next-steps script.

5. Plan analysis.
- Define how observations will be captured (notes template, recording, screen capture).
- Specify analysis method: affinity mapping, rainbow spreadsheet, or severity rating.
- Set success thresholds per task (e.g., 80% completion rate).
- Map findings to research questions.

6. Format output.
- Use `references/usability-test-plan-template.md` for the response structure.
- Use `references/task-scenario-template.md` for individual task formatting.
- Ensure the plan is actionable by a moderator or uploaded to an unmoderated testing platform.

## Output Contract

Always return sections in this order:
- `Test Overview`
- `Research Questions`
- `Recruitment & Screener`
- `Task Scenarios`
- `Discussion Guide`
- `Analysis Framework`

## Quality Bar

Revise before finalizing if any of these are true:
- Any task scenario contains step-by-step instructions ("Click the menu, then select Settings") instead of goal-based framing ("Update your notification preferences").
- Research questions are not answerable through direct observation of user behavior.
- Fewer than 5 task scenarios are defined for a study with more than 2 research questions.
- Any task is missing explicit success criteria (what "done" looks like) and at least one measurable (completion, time, errors, or path).
- Screener has fewer than 3 qualifying criteria or zero disqualifying criteria.
- Discussion guide does not include a verbatim think-aloud protocol introduction.
- Post-task questions use leading language ("Did you find that easy?" vs. "How would you describe that experience?").
- Analysis framework does not define a success threshold for any task (e.g., "80% completion rate").
- Participant count is stated without justification.

## Reference Navigation

Read only what is needed:
- test plan output shell: `references/usability-test-plan-template.md`
- task scenario format: `references/task-scenario-template.md`

## Trigger Examples

Positive:
- "Plan a usability test for the new onboarding flow."
- "Write a test script for our checkout redesign."
- "Help me set up an unmoderated usability study for the mobile app."
- "Create task scenarios to test the search experience."

Negative:
- "Design an A/B test for the checkout flow."
- "Synthesize these usability test results."
- "Write a design spec for the settings page."

Ambiguous:
- "I want to test this design with users." (clarify whether they need a usability test plan, A/B test plan, or survey)
