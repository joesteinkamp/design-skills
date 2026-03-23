---
name: research-plan-writer
description: "Write structured research plans with objectives, methodology, interview guides, survey designs, and recruitment criteria. Use when requests involve research planning, interview scripts, survey questionnaires, research proposals, study design, or preparing to conduct user research."
---

# Research Plan Writer

## Overview

Use this skill to create structured research plans that set up studies for success. Accepts product briefs, design specs (from `$design-spec-writer`), journey maps (from `$journey-mapper`), or research questions and produces actionable plans with methodology, discussion guides, and logistics.

This is the upstream counterpart to `$research-synthesizer`—it plans the study; Research Synthesizer analyzes the results.

The output should be execution-ready: a clear methodology, a complete discussion guide or survey instrument, recruitment criteria, and a timeline a researcher can follow. Output is formatted for use in Dovetail, Google Docs, Notion, or Confluence. When the target tool is specified, adapt the plan structure and linking conventions accordingly.

## Workflow

1. Define research objectives.
- Clarify the business decision the research will inform.
- Write 3-5 specific research questions (not yes/no questions).
- Identify what is known vs. unknown (assumptions to validate).
- Determine scope: generative (discover) vs. evaluative (validate).

2. Select methodology.
- Choose method(s) based on research questions and constraints.
- Justify the method selection (why this method answers these questions).
- Common methods: interviews, contextual inquiry, diary study, survey, card sort, concept test, usability test (for usability testing, recommend `$usability-test-planner`).
- Define whether qualitative, quantitative, or mixed methods.
- Note limitations of the chosen approach.

3. Design the research instrument.
- For interviews: write a semi-structured discussion guide with open-ended questions.
- For surveys: write questions with response types (Likert, multiple choice, open text).
- For concept tests: define stimuli and evaluation criteria.
- For diary studies: define prompts, frequency, and duration.
- Group questions by theme; order from broad to specific.
- Include warm-up and cool-down questions.

4. Plan recruitment.
- Define participant criteria (include and exclude).
- Specify sample size with justification.
- Write a screening questionnaire.
- Address diversity, accessibility, and representation.
- Plan incentive structure.

5. Plan logistics and timeline.
- Estimate study duration from recruitment through analysis.
- Define team roles (moderator, note-taker, observer).
- List tools and platforms needed.
- Plan for consent, recording, and data storage.
- Identify risks and mitigation strategies.

6. Format output.
- Use `references/research-plan-template.md` for the response structure.
- Use `references/discussion-guide-template.md` for interview/discussion guide formatting.
- Ensure the plan is actionable by a researcher or research ops team.

## Output Contract

Always return sections in this order:
- `Research Overview`
- `Research Questions & Assumptions`
- `Methodology`
- `Research Instrument`
- `Recruitment Plan`
- `Logistics & Timeline`

## Quality Bar

Revise before finalizing if any of these are true:
- Any research question is answerable with yes/no instead of revealing behavior, motivation, or process.
- Methodology section does not explain why the chosen method answers the specific research questions (not just "we chose interviews" but "interviews because we need to understand the mental model behind [behavior]").
- Discussion guide contains leading questions ("Don't you think X is confusing?") or closed questions ("Did you find it easy?").
- Discussion guide does not start with warm-up questions and end with cool-down questions.
- Survey has more than 30 questions without justification for length.
- Recruitment screener has fewer than 3 qualifying criteria or zero disqualifying criteria.
- Sample size is stated without justification (e.g., "5 participants per segment for qualitative saturation" or "384 responses for ±5% margin of error").
- Timeline does not include recruitment, sessions, analysis, and reporting phases with estimated durations.
- Consent and data handling are not addressed.
- Plan does not name the specific business decision the research will inform.

## Reference Navigation

Read only what is needed:
- research plan output shell: `references/research-plan-template.md`
- discussion guide format: `references/discussion-guide-template.md`

## Trigger Examples

Positive:
- "Plan a research study to understand how users manage notifications."
- "Write an interview guide for our enterprise onboarding research."
- "Design a survey to measure satisfaction with the new dashboard."
- "Help me plan a diary study for our mobile app."

Negative:
- "Synthesize these interview transcripts." (use `$research-synthesizer`)
- "Plan a usability test for the checkout flow." (use `$usability-test-planner`)
- "Create a persona from this research." (use `$persona-creator`)

Ambiguous:
- "I need to do some research." (clarify what decisions the research will inform and what is already known)
