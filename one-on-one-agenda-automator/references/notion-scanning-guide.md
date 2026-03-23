# Notion Scanning Guide

Reference for the automated Notion workspace scan that powers contextual 1:1 agendas.

## Scanning Protocol

### What to Scan

The scan runs before each 1:1 prep and queries the Notion workspace for activity involving the report in the past 7 days (configurable to 14 days for biweekly 1:1s).

#### 1. Shared Pages (Manager + Report)
**Query:** All pages where both the manager and report have edit or comment access, modified in the past 7 days.

**Extract per page:**
- Page title and URL
- Last edited timestamp and by whom
- Recent comments (last 5) with author and content summary
- Open comment threads (unresolved)
- Content change summary (new sections, deleted sections, major edits)

**Signal detection:**
- Page edited by report but not seen by manager → flag as "review before 1:1"
- Open comment thread between manager and report → flag as "unresolved discussion"
- Page not edited in 14+ days but marked "in progress" → flag as "stale"

#### 2. Assigned Items (Report's Tasks)
**Query:** All database items (tasks, tickets, projects, to-dos) where the report is in the "Assignee" or "Owner" property, with any activity in the past 7 days.

**Extract per item:**
- Item title and URL
- Database name (e.g., "Sprint Board", "Design Tasks", "Project Tracker")
- Current status and any status changes in the past 7 days
- Due date (if set)
- Priority (if set)
- Recent comments or updates
- Related project or parent item

**Signal detection:**
- Status changed from "On track" → "At risk" or "Blocked" → flag as "needs discussion"
- Due date passed with status not "Complete" → flag as "overdue"
- Item completed since last 1:1 → flag as "win to recognize"
- Item has 3+ comments in the past 7 days → flag as "high activity"
- New items assigned to report since last 1:1 → flag as "new work added"

#### 3. 1:1 Notes Database
**Query:** The 1:1 notes database (matching by participants or database name containing "1:1" or "one-on-one"), sorted by date, last 3 entries.

**Extract per entry:**
- Date
- Action items with owner and status
- Parking lot items
- Key decisions or commitments
- Topics discussed (for continuity tracking)

**Signal detection:**
- Action items with status not "Done" → carry forward to new agenda
- Action items carried forward 3+ times → flag as "chronic carry-forward"
- Manager commitments not marked done → flag as "manager follow-up needed"
- Topic in parking lot for 3+ weeks → flag as "aging parking lot item"

#### 4. Project Trackers
**Query:** Project databases where the report is listed as a team member, with activity in the past 7 days.

**Extract per project:**
- Project name and URL
- Overall project status
- Upcoming milestones within 14 days
- Items marked "Blocked" assigned to or involving the report
- Recent status update or standup notes

**Signal detection:**
- Project milestone due within 7 days → flag as "upcoming milestone"
- Project status changed to "At risk" → flag as "project health concern"
- 3+ blocked items on a single project → flag as "systematic blocker"

## Signal Priority Ranking

When multiple signals are detected, prioritize them for the agenda in this order:

1. **Blockers** — anything preventing the report from making progress (blocked items, external dependencies, unresolved decisions)
2. **Overdue items** — tasks past their due date with no completion signal
3. **Status regressions** — items that moved backward (on track → at risk, in progress → blocked)
4. **Upcoming deadlines** — milestones or deliverables due within 7 days
5. **Wins to recognize** — completed items, especially high-effort or high-visibility ones
6. **New work assigned** — items added since last 1:1 that may affect capacity
7. **Unresolved discussions** — open comment threads, parking lot items
8. **High-activity pages** — pages with unusual volume of edits or comments

## Prompt Generation Rules

For each high-signal item, generate a discussion prompt following these rules:

### DO: Frame as coaching questions
- "The [item] is blocked on [dependency] — what options do you see for unblocking it?"
- "You completed [item] this week — what went well, and what would you do differently?"
- "[Project] has a milestone in 5 days — how confident are you in the timeline?"

### DON'T: Frame as status checks
- ~~"What's the status of [item]?"~~ → You already know the status from the scan.
- ~~"Did you finish [item]?"~~ → The scan already shows whether it's done.
- ~~"Why is [item] overdue?"~~ → Frame as "what's in the way?" not "why are you late?"

### Prompt Templates by Signal Type

**Blocker:**
"[Item] has been blocked since [date]. What's blocking it, and what would unblock it? Is this something I can help with, or do you need me to escalate?"

**Overdue:**
"[Item] was due [date]. Should we reprioritize this, adjust the deadline, or is there something in the way I should know about?"

**Status regression:**
"[Project/Item] moved from [old status] to [new status] on [date]. What changed? Do we need to adjust scope, timeline, or get help?"

**Upcoming deadline:**
"[Milestone] is due in [N] days. How are you feeling about it? Is there anything that could derail it between now and then?"

**Win to recognize:**
"You shipped [item] this week. I want to call that out — [specific reason it matters]. How did it go? Anything you're proud of or would change?"

**New work:**
"I see [N] new items assigned to you since our last 1:1. How does your plate feel? Do we need to prioritize or push anything back?"

**Unresolved thread:**
"There's an open discussion on [page] with [person]. Is that resolved, or do you need to close the loop?"

## Scan Configuration

| Setting | Default | Configurable |
|---------|---------|-------------|
| Lookback window | 7 days | Yes — set to 14 for biweekly 1:1s |
| Max items per category | 10 | Yes — reduce for shorter 1:1s |
| Signal threshold | All signals | Yes — filter to blockers + overdue only for quick prep |
| Include completed items | Yes (last 7 days) | Yes — disable if agenda is too long |
| Scan depth for comments | Last 5 per page | Yes — increase for high-activity pages |

## Fallback: No Notion Access

If Notion scanning is unavailable (no API access, workspace not connected, or permissions issue):
1. Note in the 1:1 Context that Notion was not scanned.
2. Ask the manager for manual context: "What has [report] been working on this week?"
3. Generate prompts from the manual context and prior 1:1 notes.
4. Note in Manager Prep: "Notion scan unavailable — consider setting up API access for automated 1:1 prep."

## Starter Example: Scan Output

Below is a concrete example of what a processed Notion scan looks like before it becomes agenda prompts.

### Scan Results for Sarah (2026-03-25)

**Completed This Week:**
- ✅ "Dashboard v2 — User interview synthesis" (Design Tasks, completed Mar 22)
- ✅ "Checkout post-launch: Error state audit" (Design Tasks, completed Mar 20)

**In Progress:**
- 🔵 "Dashboard v2 — Persona cards" (Design Tasks, status: In Progress, due Mar 28)
- 🔵 "Dashboard v2 — Journey map draft" (Design Tasks, status: In Progress, no due date)

**Overdue / At Risk:**
- 🔴 "Q1 design retrospective write-up" (Team Rituals, due Mar 18, 7 days overdue)
- 🟡 "Dashboard v2 — Competitive analysis" (Design Tasks, status changed On Track → At Risk on Mar 23)

**Shared Pages with Recent Activity:**
- "Dashboard v2 — Research Brief" — edited by Sarah Mar 24, 2 new comments from PM asking about scope
- "Design Team OKRs Q2" — edited by Jordan Mar 23, Sarah hasn't viewed since Mar 15

**Upcoming Deadlines:**
- "Dashboard v2 — Persona cards" due Mar 28 (3 days)
- "Stakeholder presentation dry-run" due Apr 1 (7 days)

**High-Signal Items for Discussion:**
1. 🔴 Q1 retrospective is 7 days overdue — ask if it should be deprioritized or knocked out this week.
2. 🟡 Competitive analysis moved to "at risk" — understand what changed.
3. 🟢 Interview synthesis completed — recognize the work and discuss findings.
4. 💬 PM has unanswered questions on the research brief — may need to be resolved before persona work progresses.
5. 📋 Sarah hasn't seen the Q2 OKRs page Jordan edited — share context in 1:1.
