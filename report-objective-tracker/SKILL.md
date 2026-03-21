---
name: report-objective-tracker
description: "Track progress on design report objectives, assess key result status, identify at-risk goals, and generate mid-cycle check-in summaries. Use when requests involve objective tracking, OKR check-ins, goal progress reviews, mid-cycle assessments, or preparing for performance review conversations."
---

# Report Objective Tracker

## Overview

Use this skill to assess progress against objectives created by `$report-objective-creator`. Accepts the report's current objectives, evidence of progress (shipped work, metrics, feedback, observations), and produces a structured progress assessment with status ratings, risk flags, and recommended actions.

This skill is designed for mid-cycle check-ins (not end-of-cycle evaluation). The output should surface what's on track, what's at risk, and what the manager and report should adjust — before it's too late. Every assessment should be evidence-based, not gut-feel.

Output is formatted for use in Lattice, Culture Amp, 15Five, Workday, or as structured updates in Notion or Google Docs. When the target platform is specified, adapt the progress format accordingly.

## Workflow

1. Gather current state.
- Load the report's objectives and key results from `$report-objective-creator` output or direct input.
- Identify the cycle timeline and where we are in it (e.g., "Week 6 of 13").
- Collect evidence of progress: shipped artifacts, metrics data, manager observations, peer feedback, 1:1 notes from `$one-on-one-agenda-automator`.
- Note any context changes since objectives were set (reorgs, priority shifts, scope changes, team changes).

2. Assess each key result.
- Rate each key result using the canonical status scale:
  - **On track (green):** Progress is consistent with achieving the target by end of cycle.
  - **Needs attention (yellow):** Behind pace, but recoverable with focused effort or scope adjustment.
  - **At risk (red):** Unlikely to be achieved without significant intervention or objective revision.
  - **Achieved (blue):** Already met the target.
  - **Blocked (gray):** Cannot progress due to external dependency.
- For each rating, cite specific evidence — not "seems on track" but "3 of 5 user interviews completed, synthesis scheduled for next week."
- Calculate a progress percentage where possible (e.g., "2 of 3 presentations delivered = 67%").

3. Assess each objective.
- Roll up key result statuses to an overall objective status.
- Flag objectives where the overall trajectory has changed since last check-in.
- Identify which objectives are the highest priority to focus on for the remainder of the cycle.
- Note any objectives that should be revised, descoped, or replaced due to context changes.

4. Identify risks and blockers.
- Surface key results that are at risk or blocked.
- For each risk, identify: root cause, what's needed to unblock, and who can help.
- Distinguish between risks the report can resolve and risks that need manager intervention.
- Flag any objectives that are at risk due to factors outside the report's control.

5. Generate recommended actions.
- For each at-risk key result, propose a specific recovery action.
- Suggest scope adjustments for objectives that are no longer achievable as written.
- Recommend topics for the next 1:1 based on objective status.
- Note any manager commitments from `$report-objective-creator` that are overdue.

6. Build the narrative summary.
- Write a 3-5 sentence executive summary of the report's overall progress.
- Highlight the strongest area of progress and the biggest concern.
- Frame the summary for use in calibration conversations, skip-levels, or review prep.

7. Format output.
- Use `references/objective-tracker-template.md` for the response structure.
- Include a visual progress dashboard for quick scanning.

## Output Contract

Always return sections in this order:
- `Tracking Context`
- `Progress Dashboard`
- `Objective-by-Objective Assessment`
- `Risks & Blockers`
- `Recommended Actions`
- `Narrative Summary`
- `Manager Commitment Status`

## Quality Bar

Revise before finalizing if any of these are true:
- Any key result status is rated without citing specific evidence ("on track" without explaining what evidence supports that assessment).
- Status ratings are all green — if everything is on track with no nuance, the assessment is too superficial. Dig deeper.
- At-risk key results are flagged without a recommended recovery action.
- Context changes (reorgs, priority shifts, scope changes) are not reflected in the assessment — objectives set 8 weeks ago may no longer be relevant.
- Blocked key results do not identify who or what is blocking them and what's needed to unblock.
- Narrative summary is generic ("Sarah is making good progress") instead of specific ("Sarah is ahead on delivery (Dashboard v2 spec at 80%) but behind on growth objectives — she hasn't led a stakeholder presentation yet and is running out of cycle time").
- Manager commitments from `$report-objective-creator` are not tracked — managers must be held accountable too.
- Objective revisions are suggested without explaining what changed and why the original objective is no longer appropriate.

## Reference Navigation

Read only what is needed:
- tracker output shell: `references/objective-tracker-template.md`
- status scale and rating guide: `references/progress-rating-guide.md`

## Trigger Examples

Positive:
- "Check in on Sarah's Q2 objectives — we're halfway through the quarter."
- "How is my report tracking against their OKRs?"
- "Prep a mid-cycle progress review for my team."
- "Flag any at-risk objectives before our 1:1 this week."
- "Generate a progress summary I can share in my skip-level."

Negative:
- "Set objectives for my report." (use `$report-objective-creator`)
- "Prepare my 1:1 agenda." (use `$one-on-one-agenda-automator`)
- "Write a design spec." (use `$design-spec-writer`)

Ambiguous:
- "How is my report doing?" (clarify: are they asking about objective progress, general performance, or career development?)
- "Are we on track?" (clarify: which objectives or which report?)
