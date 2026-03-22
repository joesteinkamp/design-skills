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

1. Scan Notion workspace for context.
- Use `references/notion-scanning-guide.md` for the full scanning protocol.
- **Scan shared pages:** Query all Notion pages where both the manager and report are editors or commenters in the past 7 days. Extract: page titles, last edited dates, recent comments, and open discussion threads.
- **Scan assigned items:** Query all Notion database items (tasks, projects, tickets) assigned to the report with activity in the past 7 days. Extract: item title, status, due date, recent status changes, and any comments or blockers noted.
- **Scan 1:1 notes database:** Query the 1:1 notes database (if it exists) for the most recent 2-3 entries. Extract: open action items, unresolved topics, and parking lot items.
- **Scan project trackers:** Query project databases where the report is a team member. Extract: current sprint items, upcoming milestones within 14 days, and items marked "blocked" or "at risk."
- Organize scanned items into categories: active work, blockers, completed since last 1:1, upcoming deadlines, and open threads needing discussion.
- Flag high-signal items: overdue tasks, items with unresolved comments, status changes from "on track" to "at risk," and pages with heavy recent activity.

2. Establish 1:1 context.
- Identify the manager and report (name, role, level, tenure).
- Determine the 1:1 type using the canonical types from `references/one-on-one-types.md`:
  - **Weekly check-in:** Status, blockers, energy, priorities.
  - **Career development:** Growth goals, skill gaps, opportunities, promotion readiness.
  - **Performance feedback:** Specific observations, patterns, expectations, improvement plan.
  - **Project deep-dive:** Design decisions, trade-offs, stakeholder dynamics, technical challenges.
  - **Skip-level:** Team health, manager effectiveness, career concerns, unfiltered feedback.
- Merge scanned Notion context with any additional input the manager provides.
- If prior 1:1 notes are available (from scan or direct input), extract open action items and unresolved topics.

3. Select agenda blocks.
- Use the block library from `references/agenda-block-library.md` to assemble the agenda.
- Default weekly check-in structure (30 minutes):
  - **Check-in (3 min):** Energy/mood, anything top of mind.
  - **Report's topics (10 min):** Their priorities — always first.
  - **Manager's topics (10 min):** Feedback, alignment, context sharing.
  - **Growth & development (5 min):** One skill or goal to discuss.
  - **Action items (2 min):** Capture commitments with owners and dates.
- Adjust blocks based on 1:1 type — career conversations get more growth time, performance discussions get structured feedback time.

4. Generate discussion prompts from scanned context.
- Write 2-3 specific, open-ended prompts per agenda block.
- Prompts must reference specific items from the Notion scan — not generic questions.
- For each scanned item that warrants discussion, generate a contextual prompt:
  - **Active project with status change:** "The [project] moved from 'on track' to 'at risk' on [date] — what changed, and what do you need to get it back on track?"
  - **Overdue task:** "[Task] was due [date] and is still in progress — is this blocked, deprioritized, or do you need help?"
  - **Completed work:** "You shipped [item] this week — how did it go? Anything you'd do differently?"
  - **Unresolved comment thread:** "There's an open thread on [page] between you and [person] — do you need to resolve that, or is it parked?"
  - **Upcoming deadline:** "[Milestone] is due in [N] days — how are you feeling about the timeline?"
- Use the coaching question patterns from `references/agenda-block-library.md` to frame scanned items as coaching conversations, not status checks.
- For feedback blocks, use the SBI framework: Situation → Behavior → Impact.
- For career blocks, connect to the report's stated growth goals.

5. Include follow-up tracking.
- Carry forward open action items from prior 1:1s (from Notion scan or direct input).
- Cross-reference scanned Notion tasks with prior action items — auto-mark items as "done" if their Notion status is "Complete."
- Flag items that are overdue or have been carried forward more than twice.
- Create a "parking lot" for topics that surfaced but couldn't be covered.
- Note any commitments the manager made to the report.

6. Add manager preparation notes.
- Flag any observations the manager should bring up (positive or constructive).
- Surface high-signal items from the Notion scan: heavy activity pages, blocked items, items the manager commented on.
- Note upcoming events that affect the report (reviews, project milestones within 14 days, reorgs, deadlines).
- Suggest one specific piece of recognition to deliver — preferably tied to a recently completed Notion item.
- Note if it has been 3+ weeks since the last career-focused conversation.

7. Format output.
- Use `references/one-on-one-agenda-template.md` for the response structure.
- Include a `Notion Activity Summary` section before the agenda (see template).
- Keep the agenda scannable — the manager should be able to prep in under 5 minutes.

## Output Contract

Always return sections in this order:
- `1:1 Context`
- `Notion Activity Summary`
- `Prior Action Items`
- `Agenda`
- `Discussion Prompts`
- `Manager Prep Notes`
- `Action Items & Follow-Up`

## Quality Bar

Revise before finalizing if any of these are true:
- Notion scan was available but discussion prompts do not reference any specific scanned items — every agenda with Notion access must include at least 3 prompts derived from scanned activity.
- Discussion prompts are generic ("How's it going?", "Any blockers?") instead of contextual ("The Dashboard v2 spec moved to 'at risk' on Tuesday — what changed?").
- Report's topics are not listed first — the report's priorities always come before the manager's.
- Agenda time allocations do not sum to the meeting duration (±2 minutes for buffer).
- No growth/development block is included in a weekly check-in — even 5 minutes of career focus per week compounds.
- Feedback is framed as judgment ("Your presentation was bad") instead of SBI format ("In Tuesday's design review [Situation], when you jumped to the solution without showing the problem framing [Behavior], the VP asked 3 clarifying questions that consumed half the session [Impact]").
- Prior action items are not carried forward — check both Notion scan results and direct input for open items.
- Overdue Notion tasks assigned to the report are not surfaced in the agenda.
- Manager prep notes do not include at least one specific recognition to deliver — preferably tied to a recently completed item from the Notion scan.
- Career-focused prompts are absent for 3+ consecutive weekly agendas.

## Reference Navigation

Read only what is needed:
- agenda output shell: `references/one-on-one-agenda-template.md`
- Notion scanning protocol: `references/notion-scanning-guide.md`
- 1:1 types and their structures: `references/one-on-one-types.md`
- block library and coaching questions: `references/agenda-block-library.md`

## Trigger Examples

Positive:
- "Prep my 1:1 with Sarah — she's a mid-level designer working on the dashboard redesign."
- "Generate a career development agenda for my skip-level with Alex."
- "I need to give performance feedback to my report in our 1:1 this week."
- "Create a 1:1 agenda — here are my notes from last week."

Negative:
- "Write objectives for my designer for Q2." (use `$report-objective-creator` — setting OKRs and goals, not preparing a 1:1 agenda)
- "Check in on Sarah's Q2 objectives." (use `$report-objective-tracker` — tracking OKR progress, not preparing a meeting)
- "Plan a team workshop." (use `$workshop-planner`)
- "Review this candidate's portfolio." (use `$portfolio-reviewer`)

Ambiguous:
- "Help me prepare for a meeting with my designer." (clarify: is this a 1:1, design review, or project discussion?)
- "I need to talk to my report about their performance." (clarify: do you need a 1:1 agenda, performance objectives, or an OKR progress check?)
- "Help me with my report." (clarify: do you need a 1:1 agenda, new objectives, or a progress review?)
