---
name: case-study-evaluation
description: "Evaluate a design candidate's case study or design exercise performance from interview transcripts and notes. Scores the candidate's process, thinking, communication, and output quality against competencies. Use when interviewers need a structured debrief after a case study or design exercise interview."
---

# Case Study Evaluation

## Overview

Use this skill to produce a structured evaluation of a design candidate's case study or design exercise performance. Accepts the interviewer's notes, transcript, or summary of how the candidate approached the exercise and produces a competency-scored assessment with strengths, concerns, calibration, and a hiring recommendation.

The case study round typically involves the candidate presenting a take-home exercise, completing a live whiteboard or Figma exercise, or walking through a design challenge. This skill evaluates how the candidate thinks, communicates, and produces under constrained conditions — not just the quality of the final output.

Output is formatted for use in debrief documents, ATS scorecards, or structured feedback. Every assessment must cite specific observed behaviors, statements, or artifacts — no inferred scores without evidence.

## Workflow

1. Establish the evaluation context.
   - Identify the role: product designer, UX designer, visual designer, design lead, etc.
   - Identify the target level: junior (IC1-2), mid (IC3), senior (IC4), staff (IC5), principal (IC6+).
   - Identify the exercise format: take-home presentation, live whiteboard, live Figma, design critique, system design.
   - Capture the exercise prompt and constraints (time limit, scope, what was provided to the candidate).
   - Note what the exercise was designed to assess (the intended competencies).
   - Use the competency model from `../references/design-competencies.md`.

2. Evaluate the candidate's approach.
   - How did the candidate structure their time? Did they rush to solutions or invest in understanding the problem?
   - Did they ask clarifying questions? Were the questions insightful or surface-level?
   - Did they explore multiple directions or commit to the first idea?
   - Did they articulate trade-offs and constraints?
   - Did they adapt when given feedback or new information during the exercise?

3. Score against competencies.
   - For each relevant competency, score 1-4 using the scale in `../references/design-competencies.md`.
   - Not all 7 competencies apply to every exercise format. Score only those the exercise was designed to assess.
   - Weight competencies based on what the exercise format can reasonably reveal:
     - **Take-home presentation:** Problem Framing, Process & Rigor, Craft Quality, Communication (primary). Systems Thinking, Outcomes & Impact (secondary, if addressed).
     - **Live whiteboard:** Problem Framing, Process & Rigor, Communication, Collaboration (primary). Systems Thinking (secondary).
     - **Live Figma:** Craft Quality, Systems Thinking, Process & Rigor (primary). Communication (secondary).
     - **Design critique:** Communication, Collaboration, Systems Thinking (primary). Problem Framing (secondary).
     - **System design:** Systems Thinking, Problem Framing, Process & Rigor (primary). Communication (secondary).
   - Cite specific observed behaviors, candidate statements, or artifacts for each score.
   - Use level expectations from `../references/design-competencies.md` to calibrate.

4. Evaluate exercise-specific signals.
   - **Time management:** Did the candidate use time effectively? Did they get stuck or rush?
   - **Ambiguity tolerance:** How did the candidate handle open-ended or underspecified aspects?
   - **Feedback receptivity:** When given hints, pushback, or new constraints, how did the candidate respond?
   - **Prioritization:** Did the candidate focus on the most impactful aspects given the constraints?
   - **Self-awareness:** Did the candidate acknowledge limitations, gaps, or what they would do with more time?

5. Calibrate for level and exercise format.
   - Adjust expectations for the exercise format — a 45-minute whiteboard produces less polish than a week-long take-home.
   - Compare demonstrated signals against level expectations in `../references/design-competencies.md`.
   - Flag where the candidate's demonstrated level differs from the target level.
   - Account for exercise conditions — nervousness, unfamiliar tools, or ambiguous prompts can suppress signal.

6. Generate debrief talking points.
   - Identify 2-3 key discussion points for the hiring debrief.
   - For each point, state the observed evidence, the concern or strength, and what it means for the role.
   - If signal is insufficient to make a determination, state what additional information would resolve it.
   - Reference question patterns from `references/exercise-debrief-questions.md`.

7. Format output.
   - Use `references/case-study-template.md` for the response structure.
   - Ensure every score cites specific observed behavior or output — no unsupported ratings.

## Output Contract

Always return sections in this order:
- `Evaluation Context`
- `Exercise Overview`
- `Approach Assessment`
- `Competency Scores`
- `Exercise-Specific Signals`
- `Level Calibration`
- `Strengths & Concerns`
- `Debrief Talking Points`
- `Hiring Recommendation`

## Quality Bar

Revise before finalizing if any of these are true:
- Any competency score is given without citing specific observed behavior, candidate statement, or artifact from the exercise.
- Output quality is evaluated without accounting for exercise constraints (time, format, tools, ambiguity).
- Evaluation penalizes a candidate for not covering something the exercise wasn't designed to assess.
- The evaluation confuses polish with thinking quality — a rough sketch with strong reasoning can score higher than a polished screen with shallow thinking.
- Level calibration is missing or does not account for the exercise format.
- Feedback receptivity is not addressed — how a candidate responds to input during the exercise is a critical signal.
- Strengths and concerns are not balanced — every candidate has both.
- Bias indicators are present — evaluation favors candidates who are more verbally fluent, visually polished, or confident rather than those who demonstrate stronger design reasoning.
- Debrief points don't distinguish between "confirmed signal" and "insufficient signal" — knowing what you still don't know is as important as what you learned.

## Reference Navigation

Read only what is needed:
- shared competency definitions, level expectations, and scoring scale: `../references/design-competencies.md`
- exercise debrief question patterns: `references/exercise-debrief-questions.md`
- evaluation output shell: `references/case-study-template.md`

## Trigger Examples

Positive:
- "Evaluate this candidate's case study presentation for our senior designer role."
- "I just ran a whiteboard exercise with a candidate. Here are my notes — score their performance."
- "Debrief this design exercise. The candidate had 45 minutes to redesign our onboarding flow."
- "Score this take-home exercise against our competencies and give me a hiring recommendation."

Negative:
- "Review this candidate's portfolio." (use `$portfolio-reviewer`)
- "Help me evaluate a hiring manager screen." (use `$evaluate-hiring-manager-screen`)
- "Create a case study prompt for our interview loop." (this skill evaluates, not creates)

Ambiguous:
- "How did the candidate do?" (clarify: which exercise format, and share the notes or transcript)
- "Evaluate this design work." (clarify: is this an interview exercise or a portfolio review?)
