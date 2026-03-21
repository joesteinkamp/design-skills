---
name: report-objective-creator
description: "Create structured performance objectives and growth goals for design reports with measurable key results, development actions, and alignment to team and org strategy. Use when requests involve setting objectives, writing OKRs, defining performance goals, creating development plans, or preparing for review cycles."
---

# Report Objective Creator

## Overview

Use this skill to create specific, measurable objectives for design team members. Accepts the report's role, level, career aspirations, team priorities, and company OKRs and produces a structured set of objectives with key results, development actions, and success criteria.

Objectives should balance delivery (what they ship), craft (how well they design), and growth (what they learn). Every objective should be level-appropriate — a junior designer's objectives look fundamentally different from a staff designer's. The skill produces objectives that are specific enough to evaluate fairly and flexible enough to accommodate the realities of design work.

Output is formatted for use in Lattice, Culture Amp, 15Five, Workday, or as structured documents in Notion or Google Docs. When the target platform is specified, adapt the objective format and key result structure accordingly.

## Workflow

1. Gather context.
- Identify the report: name, role, level (IC1-IC6+), tenure, team.
- Capture the objective cycle: half, quarter, or annual.
- Identify team priorities and company/org OKRs the report should align to.
- Understand the report's career aspirations and growth areas from `$one-on-one-agenda-automator` notes or direct input.
- Note any performance feedback from prior cycles — areas of strength and areas to develop.
- If the report has a career development plan, use it as input.

2. Define the objective mix.
- Use the canonical 3-category framework from `references/objective-categories.md`:
  - **Delivery objectives (40-50%):** Tied to project outcomes and team impact.
  - **Craft objectives (20-30%):** Tied to design quality, process improvement, or skill mastery.
  - **Growth objectives (20-30%):** Tied to career development, leadership, or new capabilities.
- Adjust the mix based on level:
  - Junior (IC1-2): Heavier on craft and growth, lighter on delivery scope.
  - Mid (IC3): Balanced across all three.
  - Senior (IC4): Heavier on delivery and influence, craft is expected.
  - Staff+ (IC5+): Heavier on org impact and leadership, craft is implicit.
- Aim for 3-5 total objectives per cycle. More than 5 dilutes focus.

3. Write objectives with key results.
- Each objective follows the format: "[Verb] [specific outcome] by [timeframe]."
- Each objective has 2-3 key results that are:
  - **Measurable:** Can be evaluated as achieved, partially achieved, or not achieved.
  - **Within the report's control:** Not dependent on factors they can't influence.
  - **Verifiable:** Someone other than the report could confirm the result.
- Use `references/objective-writing-guide.md` for quality patterns and anti-patterns.
- Tag each key result with its evidence type: metric, artifact, observation, or feedback.

4. Add development actions.
- For each growth objective, specify 1-2 concrete actions the report will take.
- Actions should be specific: "Lead 2 design critiques for the team this quarter" not "Get better at giving feedback."
- Include what support the manager will provide.
- Reference opportunities on the roadmap that align with growth goals.

5. Validate and calibrate.
- Check that objectives are level-appropriate using `references/level-expectations.md`.
- Ensure no objective requires skills or scope beyond the report's level + 1.
- Verify key results are achievable within the cycle (not aspirational to the point of being demoralizing).
- Flag any objectives that depend on factors outside the report's control (reorgs, other teams, market conditions).
- Confirm alignment to at least one team or org priority.

6. Format output.
- Use `references/objective-template.md` for the response structure.
- Include a handoff-ready format for the target performance management tool.

## Output Contract

Always return sections in this order:
- `Report Context`
- `Alignment Map`
- `Objectives & Key Results`
- `Development Actions`
- `Calibration Notes`
- `Manager Commitments`

## Quality Bar

Revise before finalizing if any of these are true:
- Any objective is vague ("improve design quality") instead of specific ("reduce design QA defects in checkout flow by 40% by shipping error states and loading states for all new components").
- Any key result is not measurable or verifiable — if you can't determine whether it was achieved, it's not a key result.
- Key results depend on factors the report can't influence (e.g., "increase revenue by 10%" for a junior designer).
- Objectives are all delivery-focused with no craft or growth objectives — the mix must include all three categories.
- More than 5 objectives are defined for a single cycle — focus is a feature, not a bug.
- Objectives are not calibrated to the report's level — a junior designer should not have staff-level scope.
- Growth objectives lack specific actions ("grow leadership skills" without defining what they will do).
- No manager commitments are included — the manager must state what they will do to support the report's success.
- Objectives are copied from the team OKR sheet without translation to the individual's work and growth.

## Reference Navigation

Read only what is needed:
- objective output shell: `references/objective-template.md`
- category framework and level mix: `references/objective-categories.md`
- writing guide with examples and anti-patterns: `references/objective-writing-guide.md`
- level-calibrated expectations: `references/level-expectations.md`

## Trigger Examples

Positive:
- "Write objectives for my mid-level designer for Q2."
- "Help me set OKRs for Sarah — she wants to grow into a senior role."
- "Create performance goals for my team for the next half."
- "My report needs growth objectives — she's strong on craft but weak on stakeholder communication."

Negative:
- "Prepare my 1:1 agenda." (use `$one-on-one-agenda-automator`)
- "Review this candidate's portfolio." (use `$portfolio-reviewer`)
- "Write a design spec." (use `$design-spec-writer`)

Ambiguous:
- "Help me with my report's development." (clarify: do they need objectives/OKRs, a career development plan, or 1:1 prep?)
- "What should my designer work on?" (clarify: is this about project prioritization or performance objectives?)
