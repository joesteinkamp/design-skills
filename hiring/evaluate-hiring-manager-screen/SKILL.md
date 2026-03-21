---
name: evaluate-hiring-manager-screen
description: "Evaluate a design candidate's hiring manager screen responses. Scores answers against competencies, identifies gaps, calibrates for level, and generates follow-up questions for the next interview round. Use when a hiring manager has completed a screen and needs a structured debrief."
---

# Evaluate Hiring Manager Screen

## Overview

Use this skill to produce a structured evaluation of a design candidate's hiring manager screen. Accepts the interviewer's notes, transcript, or summary of the conversation and produces a competency-scored assessment with strengths, concerns, calibration, and recommended next-round questions.

The hiring manager screen is typically 30-45 minutes covering the candidate's background, role fit, design philosophy, and 1-2 project deep-dives. This skill evaluates the signal gathered — not the questions asked — and identifies what the remaining interview loop needs to resolve.

Output is formatted for use in debrief documents, ATS scorecards, or structured feedback in Notion or Google Docs. Every assessment must cite specific candidate statements — no inferred scores without evidence.

## Workflow

1. Establish the evaluation context.
   - Identify the role: product designer, UX designer, visual designer, design lead, etc.
   - Identify the target level: junior (IC1-2), mid (IC3), senior (IC4), staff (IC5), principal (IC6+).
   - Capture must-have skills and nice-to-have skills from the job description or hiring manager.
   - Note the team context: B2B/B2C, 0→1/growth/scale, platform/consumer, industry.
   - Identify what the screen was intended to assess (role fit, design thinking, leadership, culture).
   - Use the competency model from `../references/design-competencies.md`.

2. Map screen content to competencies.
   - Read through the notes, transcript, or summary.
   - For each competency in `../references/design-competencies.md`, identify whether the screen provided signal.
   - Categorize each competency as: strong signal, partial signal, no signal, or concerning signal.
   - Not every competency will be assessed in a screen — flag which were not covered rather than scoring them.

3. Score assessed competencies.
   - For each competency with signal, score 1-4 using the scale in `../references/design-competencies.md`.
   - Cite specific candidate statements or described behaviors for each score.
   - Use level expectations from `../references/design-competencies.md` to calibrate — a "3" for a junior is different from a "3" for a senior.
   - Mark competencies with no signal as "Not assessed" rather than scoring them.

4. Evaluate role fit signals.
   - Assess motivation and interest in the specific role and team.
   - Assess alignment between the candidate's experience and the role requirements.
   - Assess culture and working-style fit signals (collaboration style, feedback receptivity, autonomy level).
   - Note any misalignment between what the candidate wants and what the role offers.

5. Calibrate for level.
   - Compare demonstrated signals against level expectations in `../references/design-competencies.md`.
   - Flag where the candidate's demonstrated level differs from the target level.
   - Note that a screen provides limited signal — avoid over-indexing on verbal fluency vs. design thinking.

6. Generate next-round questions.
   - Write 3-5 questions for the remaining interview loop based on gaps from the screen.
   - Each question should target a specific unresolved competency or concern.
   - Include what a strong answer would demonstrate and what a weak answer would confirm.
   - Assign each question to the appropriate interview stage (portfolio review, design exercise, cross-functional, bar raiser).
   - Use question patterns from `references/screen-question-bank.md`.

7. Format output.
   - Use `references/screen-evaluation-template.md` for the response structure.
   - Ensure every score cites a specific candidate statement or behavior — no unsupported ratings.

## Output Contract

Always return sections in this order:
- `Screen Context`
- `Competency Assessment`
- `Role Fit Signals`
- `Level Calibration`
- `Strengths & Concerns`
- `Next-Round Questions`
- `Screen Summary`

## Quality Bar

Revise before finalizing if any of these are true:
- Any competency score is given without citing a specific candidate statement or described behavior.
- Competencies that were not discussed in the screen are scored instead of marked "Not assessed."
- Evaluation conflates verbal fluency with design ability — a candidate who explains clearly is not necessarily a better designer.
- Level calibration is missing or based solely on years of experience rather than demonstrated thinking.
- Next-round questions are generic ("tell me about your process") instead of targeting specific gaps from this screen.
- Role fit assessment is based on pedigree (company names, school) rather than demonstrated alignment.
- Strengths and concerns are not balanced — every candidate has both.
- Bias indicators are present — evaluation comments on communication style, personality, or "culture fit" without connecting to job-relevant competencies.

## Reference Navigation

Read only what is needed:
- shared competency definitions, level expectations, and scoring scale: `../references/design-competencies.md`
- screen-specific question patterns: `references/screen-question-bank.md`
- evaluation output shell: `references/screen-evaluation-template.md`

## Trigger Examples

Positive:
- "I just finished a hiring manager screen with a senior designer candidate. Here are my notes — help me evaluate."
- "Debrief this HM screen transcript and tell me what to probe in the next round."
- "Score this candidate's screen against our design competencies."
- "I screened a candidate for our mid-level product designer role. What signal did I get?"

Negative:
- "Review this candidate's portfolio." (use `$portfolio-reviewer`)
- "Evaluate this candidate's case study exercise." (use `$case-study-evaluation`)
- "Help me write questions for an upcoming screen." (this skill evaluates after, not before)

Ambiguous:
- "How did this candidate do?" (clarify: in what format — screen, portfolio, case study?)
- "Evaluate this candidate." (clarify: which interview stage and what materials are available?)
