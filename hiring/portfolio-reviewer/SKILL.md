---
name: portfolio-reviewer
description: "Evaluate a design candidate's portfolio website or case study deck with structured rubrics, calibrated scoring, and hiring-decision frameworks. Use when the input is a portfolio URL, PDF, or case study deck — not a screen transcript or exercise notes. Produces rubric-scored assessments with interview follow-up questions."
---

# Portfolio Reviewer

## Overview

Use this skill to produce structured, calibrated evaluations of design candidate portfolios. Accepts a portfolio URL or description, the role being hired for, and the level/seniority and produces a rubric-scored assessment with strengths, concerns, interview questions, and a hiring recommendation.

The output should be defensible in a debrief: every score is backed by specific evidence from the portfolio, and the evaluation separates what the candidate shows from what is assumed. This skill is designed for hiring managers, interviewers, and recruiting coordinators who need consistent, bias-aware portfolio evaluations.

Output is formatted for use in Greenhouse, Lever, Ashby, or as structured feedback in Notion or Google Docs. When the target ATS is specified, adapt the scorecard format to match that tool's rubric structure.

## Workflow

1. Establish the evaluation frame.
- Identify the role: product designer, UX designer, visual designer, design lead, etc.
- Identify the target level: junior (IC1-2), mid (IC3), senior (IC4), staff (IC5), principal (IC6+).
- Capture must-have skills and nice-to-have skills from the job description or hiring manager.
- Note the team context: B2B/B2C, 0→1/growth/scale, platform/consumer, industry.
- Default to the 7-dimension rubric in `references/portfolio-rubric.md` unless the user provides a custom rubric.

2. Evaluate the portfolio structure.
- Assess presentation quality: is the portfolio itself well-designed? (navigation, hierarchy, readability, loading performance).
- Count and categorize case studies: how many, what types (shipped product, concept, redesign, system), what breadth.
- Check for essentials: role clarity (what the candidate did vs. the team), context (company, timeline, constraints), and outcomes (metrics, impact, adoption).
- Note what is missing: no process shown, no outcomes, no constraints, no collaboration evidence.

3. Score each case study against the rubric.
- Use the 7-dimension rubric from `references/portfolio-rubric.md`:
  - **Problem Framing:** Does the candidate articulate the user problem and business context before jumping to solutions?
  - **Process & Rigor:** Is there evidence of research, iteration, exploration, and testing — not just a final design?
  - **Craft Quality:** Is the visual and interaction design at the expected level for the target seniority?
  - **Systems Thinking:** Does the candidate consider edge cases, states, responsive behavior, and design system implications?
  - **Outcomes & Impact:** Are results shown — metrics, adoption, user feedback, or shipped evidence?
  - **Communication:** Is the case study well-structured, concise, and does it tell a clear story?
  - **Collaboration:** Is there evidence of working with engineering, product, research, or other designers?
- Score each dimension 1-4 per case study using the scale in `references/portfolio-rubric.md`.
- Cite specific evidence from the portfolio for each score.

4. Calibrate for level.
- Adjust expectations by target seniority:
  - Junior: Strong craft, basic process shown, outcomes optional but appreciated.
  - Mid: Clear process, good craft, some outcomes, evidence of collaboration.
  - Senior: Strong problem framing, rigorous process, clear outcomes, systems thinking, leadership signals.
  - Staff+: Strategic framing, org-level impact, mentorship/leadership evidence, cross-team influence.
- Flag where the candidate's demonstrated level differs from the target level.

5. Generate interview questions.
- Write 3-5 follow-up questions based on gaps or ambiguities in the portfolio.
- Each question should probe a specific concern or explore a strength more deeply.
- Include what a strong answer would include.
- Use `references/interview-question-bank.md` for question patterns.

6. Produce hiring recommendation.
- Summarize the overall assessment with a clear recommendation: strong yes, lean yes, lean no, strong no.
- State the top 2-3 strengths and top 2-3 concerns.
- Note any red flags or deal-breakers.
- Identify what the interview loop should focus on to resolve open questions.

7. Format output.
- Use `references/portfolio-review-template.md` for the response structure.
- Ensure every score has cited evidence — no unsupported ratings.

## Output Contract

Always return sections in this order:
- `Review Context`
- `Portfolio Overview`
- `Case Study Evaluations`
- `Level Calibration`
- `Strengths & Concerns`
- `Interview Questions`
- `Hiring Recommendation`

## Quality Bar

Revise before finalizing if any of these are true:
- Any rubric score (1-4) is given without citing specific evidence from the portfolio ("craft is strong" without pointing to a specific screen, component, or interaction).
- Evaluation conflates what the candidate shows with what is assumed — every claim must reference visible portfolio evidence or be labeled "not demonstrated."
- Level calibration is missing — the evaluation does not state whether the work matches junior, mid, senior, or staff expectations.
- Interview questions are generic ("tell me about your process") instead of probing specific portfolio gaps ("Case Study 2 jumps from research to final design — walk me through what happened between synthesis and your first concepts").
- Fewer than 3 rubric dimensions are scored per case study.
- Hiring recommendation does not include both strengths and concerns — every candidate has both.
- Red flags are listed without explaining why they are concerning (e.g., "no outcomes shown" should explain "this matters because at the senior level, we expect candidates to measure impact").
- Bias indicators are present — evaluation comments on visual style preferences, portfolio aesthetics, or personal brand rather than design thinking quality.

## Reference Navigation

Read only what is needed:
- shared competency definitions, level expectations, and scoring scale: `../references/design-competencies.md`
- scoring rubric and scale: `references/portfolio-rubric.md`
- review output shell: `references/portfolio-review-template.md`
- follow-up question patterns: `references/interview-question-bank.md`

## Trigger Examples

Positive:
- "Review this candidate's portfolio for our senior product designer role."
- "Evaluate this portfolio — we're hiring a mid-level designer for B2B SaaS."
- "Score this portfolio and give me interview questions to probe gaps."
- "Help me prepare for a portfolio review debrief."

Negative:
- "Critique this design for usability issues." (use `$design-critique` — this is design feedback, not candidate evaluation)
- "Evaluate this interface against heuristics." (use `$heuristic-evaluator` — this is interface assessment, not hiring)
- "Help me present my design work to stakeholders." (use `$stakeholder-presentation-writer`)
- "Debrief this hiring manager screen." (use `$evaluate-hiring-manager-screen` — input is a screen transcript, not a portfolio)
- "Evaluate this candidate's case study exercise." (use `$case-study-evaluation` — input is exercise notes, not a portfolio)

Ambiguous:
- "Is this designer good?" (clarify: which role, which level, and share the portfolio)
- "Review this design work." (clarify: is this a candidate portfolio review or a design critique of your team's work?)
- "Evaluate this candidate." (clarify: what material — portfolio URL, screen notes, or exercise transcript?)
