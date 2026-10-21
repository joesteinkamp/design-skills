---
name: design-brief-writer
description: "Frame a design problem before solutioning: turn a vague request, stakeholder ask, or research findings into a design brief with a crisp problem statement, target users, evidence, goals and non-goals, constraints, assumptions and risks, success signals, and How Might We questions. Use when requests involve a design brief, problem framing, problem statement, project kickoff, scoping a new initiative, or 'what problem are we solving' — not a build-ready spec (use design-spec-writer), not a research plan (use research-plan-writer), not OKRs (use design-okr-writer)."

# Discovery & Auto-Selection
category: planning
tags: [design-brief, problem-framing, problem-statement, kickoff, scoping, how-might-we]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [research-synthesizer, competitive-analyzer, survey-analyzer]
downstream_skills: [research-plan-writer, ideation-facilitator, design-spec-writer, workshop-planner, design-spectrums-creator, design-success-metrics-writer, ia-researcher, usability-test-planner]

# Input Contract
inputs:
  - name: request
    required: true
    type: text
    description: "The ask as received: stakeholder request, ticket, Slack thread, product idea, or problem description"
  - name: research_synthesis
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Synthesized research insights that evidence the problem"
  - name: competitive_analysis
    required: false
    type: competitive_analysis
    source_skill: competitive-analyzer
    description: "Competitive landscape and gaps relevant to the problem"
  - name: business_context
    required: false
    type: text
    description: "Company or team goals, metrics, deadlines, and constraints"

# Output Contract
outputs:
  - name: design_brief
    type: design_brief
    template: references/design-brief-template.md
  - name: brief_handoff
    type: brief_handoff
    optional: true
    schema: references/brief-handoff-schema.md

# Batch Execution
batch:
  enabled: false

# Tool Integration
tools:
  - name: notion
    actions: [search, publish_page]
    when: "Finding related prior briefs, research, and decisions; publishing the brief"
  - name: linear
    actions: [get_issue, create_project]
    when: "Reading the originating ticket; creating a project from the approved brief"
  - name: slack
    actions: [read_thread]
    when: "Reading the stakeholder thread the request came from"

# User Input Gates
user_inputs:
  - step: 1
    question: "Who asked for this, and what decision or outcome do they need?"
    required: true
  - step: 1
    question: "Is there evidence the problem is real (research, data, support tickets)?"
    required: false
  - step: 2
    question: "Problem statement: [statement]. Does this capture the real problem?"
    checkpoint: true
  - step: 5
    question: "Publish the brief to Notion?"
    required: false
    default: false
---

# Design Brief Writer

## Overview

Use this skill at the very start of a design effort, before anyone draws a screen. It turns a request — often phrased as a solution ("add a dashboard", "make onboarding shorter") — into a brief that names the underlying problem, who has it, how we know, what success looks like, and what is explicitly out of scope.

The output should separate what is known from what is assumed, and reframe solution-shaped asks into problems without dismissing the requester's intent. A good brief is short enough to read in five minutes and specific enough that two designers would explore the same problem.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Search for prior briefs, research, and decisions on the same area; publish the brief | Ask the user for related docs; output the brief as markdown |
| **Linear** | Read the originating ticket for context; create a project from the approved brief | User pastes the ticket; creates the project manually |
| **Slack** | Read the stakeholder thread where the request originated | User pastes the thread or summarizes the ask |

## Workflow

### Step 1: Unpack the request
- **Reads:** request, business_context
- **Ask user:** "Who asked for this, and what decision or outcome do they need?" — anchors the brief to a real decision.
- **Ask user:** "Is there evidence the problem is real (research, data, support tickets)?" — determines evidence strength.
- **Actions:**
  - Restate the request in one sentence, in the requester's terms.
  - Classify it: problem-shaped ("users abandon checkout") or solution-shaped ("add Apple Pay").
  - For solution-shaped asks, ask "why" until reaching a user or business problem; keep the original ask as a candidate solution, not the goal.
  - Identify the stakeholders and the decision this brief informs.
- **Tool action — Notion/Slack/Linear (if available):** pull the source thread or ticket and search for prior work on the same area.
- **Produces:** Populated `Request & Context` section

### Step 2: Frame the problem
- **Reads:** Step 1, research_synthesis, competitive_analysis
- **Actions:**
  - Write the problem statement: [user] needs [need] because [insight], but today [current state / barrier], which causes [impact].
  - Name the primary user segment and, if relevant, a secondary one. Prefer behaviors over demographics.
  - List evidence with its source and strength (direct research, analytics, support volume, anecdote).
- **Checkpoint:** "Problem statement: [statement]. Does this capture the real problem?"
- **If** there is no evidence beyond the request → mark the brief `Evidence: assumed` and make validating the problem the first open question.
- **Produces:** Populated `Problem Statement`, `Target Users`, and `Evidence` sections

### Step 3: Bound the work
- **Reads:** Step 2, business_context
- **Actions:**
  - Goals: 2–4 outcomes, each phrased as a change in user behavior or business result.
  - Non-goals: what this effort will deliberately not solve, including adjacent problems that are tempting to absorb.
  - Constraints: technical, legal, brand, timeline, budget, platform.
  - Success signals: leading and lagging indicators; hand detailed instrumentation to `$design-success-metrics-writer`.
- **Produces:** Populated `Goals & Non-Goals`, `Constraints`, and `Success Signals` sections

### Step 4: Surface assumptions and openings
- **Reads:** Steps 2–3
- **Actions:**
  - List the riskiest assumptions (desirability, viability, feasibility, usability), ranked by risk × uncertainty, each with a way to test it.
  - Write 3–5 How Might We questions that open the solution space without prescribing a solution.
  - List open questions with an owner.
- **Produces:** Populated `Assumptions & Risks`, `How Might We`, and `Open Questions` sections

### Step 5: Format and hand off
- **Reads:** All previous step outputs
- **Ask user:** "Publish the brief to Notion?" — Default: no.
- **Actions:**
  - Fill `references/design-brief-template.md`; keep the core brief to one page.
  - Add the handoff block per `references/brief-handoff-schema.md` when a downstream skill is next.
- **Tool action — Notion (if available and user confirms):** publish the brief.
- **Next steps:** Based on output, suggest:
  - "To validate the riskiest assumptions, use `$research-plan-writer`."
  - "To generate concepts against these How Might We questions, use `$ideation-facilitator`."
  - "To run a kickoff or framing workshop, use `$workshop-planner`."
  - "To define measurable success criteria, use `$design-success-metrics-writer`."
- **Produces:** Complete brief
- **References:** `references/design-brief-template.md`, `references/brief-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Request & Context | yes | - | key-value fields: original ask, requester, decision informed, ask type (problem/solution-shaped) |
| Problem Statement | yes | - | one statement in the [user] needs [need] because [insight], but [barrier], causing [impact] form |
| Target Users | yes | 1 segment | behavioral segment descriptions |
| Evidence | yes | 1 item | evidence items with source and strength, or an explicit "assumed" flag |
| Goals & Non-Goals | yes | 2 goals, 1 non-goal | outcome-phrased goals; explicit non-goals |
| Constraints | yes | - | list by type (technical, legal, brand, timeline, platform) |
| Success Signals | yes | 2 signals | leading and lagging indicators |
| Assumptions & Risks | yes | 2 assumptions | ranked assumptions with risk type and test method |
| How Might We | yes | 3 questions | HMW questions that don't presuppose a solution |
| Open Questions | yes | 1 question | question + owner |
| Downstream Handoff | no | - | handoff block per `references/brief-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Problem Statement | States a user problem and its impact; does not name a feature or UI solution | blocker |
| QB-02 | Evidence | Every evidence item names its source; the brief is flagged "assumed" when no evidence exists | blocker |
| QB-03 | Goals & Non-Goals | Goals are outcomes (behavior or business change), not outputs ("ship X") | blocker |
| QB-04 | Goals & Non-Goals | At least one non-goal names an adjacent problem that is explicitly excluded | blocker |
| QB-05 | How Might We | HMW questions are neither so broad they could apply to any product nor so narrow they imply one answer | warning |
| QB-06 | Assumptions & Risks | Each assumption has a concrete way to test it | blocker |
| QB-07 | Request & Context | A solution-shaped request is preserved as a candidate solution, not discarded or treated as the goal | warning |
| QB-08 | (whole brief) | Core brief (through Success Signals) reads in about five minutes — roughly one page | warning |

## Reference Navigation

Read only what is needed:
- brief output shell: `references/design-brief-template.md`
- downstream input contract: `references/brief-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_design_brief, frame_problem, scope_initiative, kickoff_project]

- "Sales wants a dashboard for admins. Help me figure out what problem we're actually solving."
- "Write a design brief for redesigning our onboarding."
- "Turn this research synthesis into a problem statement and HMWs for the team."

### Negative
- "Write the spec with acceptance criteria for the new dashboard." -> `$design-spec-writer`
- "Plan interviews to learn why admins churn." -> `$research-plan-writer`
- "Set design team OKRs for next quarter." -> `$design-okr-writer`
- "Generate concepts for faster onboarding." -> `$ideation-facilitator`

### Ambiguous
- "Help me kick off this project." (clarify: a written brief, or a kickoff workshop agenda via `$workshop-planner`?)
- "What should we build?" (clarify: frame one problem, or prioritize many via `$roadmap-prioritizer`?)
