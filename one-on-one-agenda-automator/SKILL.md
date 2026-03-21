---
name: one-on-one-agenda-automator
description: "Generate structured 1:1 agendas for design managers and their direct reports with discussion prompts, feedback frameworks, and follow-up tracking. Use when requests involve 1:1 preparation, manager check-ins, career conversations, performance discussions, or recurring one-on-one meeting agendas."
---

# One-on-One Agenda Automator

## Overview

Use this skill to generate structured, context-aware 1:1 agendas for design managers. Accepts the report's role, level, current projects, recent feedback, career goals, and prior 1:1 notes and produces a ready-to-use agenda with discussion prompts, coaching questions, and follow-up actions.

This skill is not a generic meeting template — it adapts the agenda based on the 1:1 type (weekly check-in, career development, performance feedback, project deep-dive, skip-level) and the report's current context. Every agenda should surface what matters most right now and drive toward specific outcomes.

Output is formatted for use in Notion, Google Docs, Fellow, Lattice, or 15Five. When the target tool is specified, adapt the agenda structure and linking conventions accordingly.

## Workflow

1. Establish 1:1 context.
- Identify the manager and report (name, role, level, tenure).
- Determine the 1:1 type using the canonical types from `references/one-on-one-types.md`:
  - **Weekly check-in:** Status, blockers, energy, priorities.
  - **Career development:** Growth goals, skill gaps, opportunities, promotion readiness.
  - **Performance feedback:** Specific observations, patterns, expectations, improvement plan.
  - **Project deep-dive:** Design decisions, trade-offs, stakeholder dynamics, technical challenges.
  - **Skip-level:** Team health, manager effectiveness, career concerns, unfiltered feedback.
- Capture current context: active projects, recent wins, recent struggles, pending feedback, prior action items.
- If prior 1:1 notes are available, extract open action items and unresolved topics.

2. Select agenda blocks.
- Use the block library from `references/agenda-block-library.md` to assemble the agenda.
- Default weekly check-in structure (30 minutes):
  - **Check-in (3 min):** Energy/mood, anything top of mind.
  - **Report's topics (10 min):** Their priorities — always first.
  - **Manager's topics (10 min):** Feedback, alignment, context sharing.
  - **Growth & development (5 min):** One skill or goal to discuss.
  - **Action items (2 min):** Capture commitments with owners and dates.
- Adjust blocks based on 1:1 type — career conversations get more growth time, performance discussions get structured feedback time.

3. Generate discussion prompts.
- Write 2-3 specific, open-ended prompts per agenda block.
- Prompts should be contextual (reference the report's actual projects and goals), not generic.
- Use the coaching question patterns from `references/agenda-block-library.md`.
- For feedback blocks, use the SBI framework: Situation → Behavior → Impact.
- For career blocks, connect to the report's stated growth goals.

4. Include follow-up tracking.
- Carry forward open action items from prior 1:1s.
- Flag items that are overdue or have been carried forward more than twice.
- Create a "parking lot" for topics that surfaced but couldn't be covered.
- Note any commitments the manager made to the report.

5. Add manager preparation notes.
- Flag any observations the manager should bring up (positive or constructive).
- Note upcoming events that affect the report (reviews, project milestones, reorgs, deadlines).
- Suggest one specific piece of recognition to deliver.
- Note if it has been 3+ weeks since the last career-focused conversation.

6. Format output.
- Use `references/one-on-one-agenda-template.md` for the response structure.
- Keep the agenda scannable — the manager should be able to prep in under 5 minutes.

## Output Contract

Always return sections in this order:
- `1:1 Context`
- `Prior Action Items`
- `Agenda`
- `Discussion Prompts`
- `Manager Prep Notes`
- `Action Items & Follow-Up`

## Quality Bar

Revise before finalizing if any of these are true:
- Discussion prompts are generic ("How's it going?", "Any blockers?") instead of contextual ("How did the stakeholder review for the checkout redesign go? What was the reaction to the single-page approach?").
- Report's topics are not listed first — the report's priorities always come before the manager's.
- Agenda time allocations do not sum to the meeting duration (±2 minutes for buffer).
- No growth/development block is included in a weekly check-in — even 5 minutes of career focus per week compounds.
- Feedback is framed as judgment ("Your presentation was bad") instead of SBI format ("In Tuesday's design review [Situation], when you jumped to the solution without showing the problem framing [Behavior], the VP asked 3 clarifying questions that consumed half the session [Impact]").
- Prior action items are not carried forward when prior 1:1 notes are provided.
- Manager prep notes do not include at least one specific recognition to deliver.
- Career-focused prompts are absent for 3+ consecutive weekly agendas.

## Reference Navigation

Read only what is needed:
- agenda output shell: `references/one-on-one-agenda-template.md`
- 1:1 types and their structures: `references/one-on-one-types.md`
- block library and coaching questions: `references/agenda-block-library.md`

## Trigger Examples

Positive:
- "Prep my 1:1 with Sarah — she's a mid-level designer working on the dashboard redesign."
- "Generate a career development agenda for my skip-level with Alex."
- "I need to give performance feedback to my report in our 1:1 this week."
- "Create a 1:1 agenda — here are my notes from last week."

Negative:
- "Plan a team workshop." (use `$workshop-planner`)
- "Write a stakeholder presentation." (use `$stakeholder-presentation-writer`)
- "Review this candidate's portfolio." (use `$portfolio-reviewer`)

Ambiguous:
- "Help me prepare for a meeting with my designer." (clarify: is this a 1:1, design review, or project discussion?)
- "I need to talk to my report about their performance." (clarify: is this a routine check-in, formal feedback, or performance improvement plan?)
