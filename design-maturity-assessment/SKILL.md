---
name: design-maturity-assessment
description: "Assess a design team's or organization's maturity across defined dimensions, placing each on a leveled capability scale with supporting evidence, identifying the gap to a target level, and producing a prioritized roadmap to advance. Use when requests involve design maturity assessment, capability modeling, design ops investment cases, or org-level design self-assessment. Not for setting goals from findings (use design-okr-writer), benchmarking competitor products (use competitive-analyzer), or building the leadership presentation (use stakeholder-presentation-writer)."

# Discovery & Auto-Selection
category: evaluation
tags: [design-maturity, design-ops, org-assessment, capability-model, design-leadership, roadmap]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: []
downstream_skills: [design-okr-writer, stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: org_context
    required: true
    type: text
    description: "Team size, structure, reporting lines, and current design practices"
  - name: evidence
    required: false
    type: text
    description: "Survey results, interview notes, or artifacts that support the assessment"
  - name: target_level
    required: false
    type: text
    description: "The maturity level the org aspires to and the horizon for reaching it"

# Output Contract
outputs:
  - name: maturity_assessment
    type: maturity_assessment
    template: references/maturity-assessment-template.md
  - name: maturity_assessment_handoff
    required: false
    schema: references/maturity-assessment-handoff-schema.md

# Batch Execution
batch:
  enabled: false

# Tool Integration
tools:
  - name: notion
    actions: [publish_page]
    when: "Publishing the maturity assessment as a Notion page for leadership and team reference"
  - name: google_sheets
    actions: [create_scoring_matrix]
    when: "Building the dimension scoring matrix as a structured spreadsheet"
  - name: figma
    actions: [create_radar]
    when: "Creating a maturity radar/spider visual showing current vs target levels per dimension"

# User Input Gates
user_inputs:
  - step: 1
    question: "What model or dimensions should we assess against — the default set or a custom one?"
    options: [default, custom]
    default: default
    required: true
  - step: 1
    question: "Do you have evidence (survey, interviews, artifacts) or is this a self-assessment?"
    options: [evidence, self-assessment]
    required: true
  - step: 1
    question: "What target maturity level and horizon are you aiming for?"
    required: false
---

# Design Maturity Assessment

## Overview

Use this skill to assess where a design team or organization sits on a maturity model, place each capability dimension on a named level scale with evidence, surface the gap to a target level, and produce a prioritized roadmap to advance. Accepts org context (team size, structure, reporting lines, current practices), optional evidence (surveys, interviews, artifacts), and an optional target level. Built for design leaders making the case for investment in design ops, research, systems, or headcount.

The output should be honest and differentiated: dimensions are not all rated the same, the evidence basis (data vs self-report) is stated so confidence is clear, and the roadmap separates quick wins from systemic change. Output is formatted for use in Notion, Google Sheets, or as a Figma radar visual, and hands off cleanly to goal-setting and stakeholder communication. When the target tool is specified, adapt the scorecard and roadmap format accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Notion** | Publish the maturity assessment as a Notion page for leadership and team reference | Output as markdown; user pastes into Notion |
| **Google Sheets** | Build the dimension scoring matrix as a structured spreadsheet with current level, target, evidence, and gap per dimension | Output the scoring matrix as a markdown table; user creates the spreadsheet manually |
| **Figma** | Create a maturity radar/spider visual plotting current vs target level across all dimensions | Describe the radar in text and output per-dimension levels as a table; user builds the visual manually |

## Workflow

### Step 1: Establish dimensions, model, and evidence basis
- **Reads:** org_context, evidence (if provided), target_level (if provided)
- **Ask user:** "What model or dimensions should we assess against — the default set or a custom one?" — Default: default set.
- **Ask user:** "Do you have evidence (survey, interviews, artifacts) or is this a self-assessment?" — determines confidence framing throughout.
- **Ask user:** "What target maturity level and horizon are you aiming for?" — Default: aspire to one level above the current overall.
- **Actions:**
  - Confirm the dimension set. Default set (7 dimensions): User research practice; Design ops & process; Design system & tooling; Cross-functional influence & seat at the table; Team structure & craft depth; Outcome orientation & measurement; Inclusive/accessible design practice.
  - Adopt the named 5-level scale: 1 Initial / 2 Developing / 3 Defined / 4 Managed / 5 Optimizing.
  - Record the evidence basis (evidence-backed vs self-report) — this is stated in the output so readers can calibrate confidence.
- **If** custom model → use the dimensions the user provides; map them to the 5-level scale.
- **If** self-assessment → flag throughout that levels reflect self-report, not measured data, and lower stated confidence accordingly.
- **Produces:** Populated `Assessment Context` section
- **References:** `references/maturity-assessment-template.md`

### Step 2: Place each dimension on the level scale
- **Reads:** Step 1 dimensions, org_context, evidence
- **Actions:**
  - For each dimension, place the org on the 1-5 scale.
  - Cite at least one piece of supporting evidence per dimension, or state the rationale explicitly when only self-report exists.
  - Differentiate: avoid rating every dimension the same; surface the genuine spread of strengths and weaknesses.
- **Checkpoint:** "I've placed all [N] dimensions on the 1-5 scale. The spread runs from [lowest] to [highest]. Ready to map the gap to target and build the roadmap?"
- **Tool action — Google Sheets (if available):** Build the dimension scoring matrix with current level, target, evidence, and gap per dimension.
- **If** Google Sheets unavailable → output the scoring matrix as a markdown table.
- **Produces:** Populated `Maturity Summary` and `Dimension Scorecard` sections

### Step 3: Identify current-vs-target gaps
- **Reads:** Step 2 scorecard, target_level
- **Actions:**
  - For each dimension, state the current level and the target level explicitly, and name the gap.
  - Compute the overall maturity summary so it reflects the dimension spread, not just a flat average — call out the dimensions dragging maturity down.
  - Flag dimensions where the gap is largest or most strategically costly.
- **Produces:** Gap column populated in `Dimension Scorecard`; gap framing in `Maturity Summary`

### Step 4: Build a prioritized roadmap
- **Reads:** Step 3 gaps
- **Actions:**
  - For each dimension with a gap, give prioritized actions to advance at least one level.
  - Separate quick wins (low effort, near-term) from systemic changes (process, headcount, org structure).
  - Sequence actions and note dependencies (e.g., a design system needs tooling and headcount first).
- **Produces:** Populated `Roadmap to Next Level` and `Risks & Dependencies` sections

### Step 5: Format, publish, and visualize
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/maturity-assessment-template.md` for the response structure.
  - Lead with the Maturity Summary and Dimension Scorecard for quick scanning.
  - State the evidence basis prominently so confidence is clear.
  - Capture unresolved items in `Open Questions`.
- **Tool action — Figma (if available):** Create a maturity radar/spider visual plotting current vs target level across all dimensions.
- **If** Figma unavailable → describe the radar and output per-dimension levels as a table.
- **Tool action — Notion (if available):** Publish the assessment as a Notion page for leadership and team reference.
- **If** downstream handoff needed → produce the handoff block per `references/maturity-assessment-handoff-schema.md`.
- **Next steps:** Based on output, suggest:
  - "To turn the roadmap into measurable goals, use `$design-okr-writer`."
  - "To build the leadership case for investment, use `$stakeholder-presentation-writer`."
  - "To benchmark how competitor products express design maturity, use `$competitive-analyzer`."
- **Produces:** Complete assessment with all required sections
- **References:** `references/maturity-assessment-template.md`, `references/maturity-assessment-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Assessment Context | yes | - | key-value fields: org/team, structure, evidence basis, model used, level scale, target level |
| Maturity Summary | yes | - | overall level reflecting the spread, plus a one-line level per dimension |
| Dimension Scorecard | yes | 5 dimensions | table: dimension / current level / target / evidence / gap |
| Roadmap to Next Level | yes | 1 per gapped dimension | prioritized actions per dimension, each tagged quick-win or systemic |
| Risks & Dependencies | yes | 2 items | risks to advancement and cross-dimension dependencies |
| Open Questions | yes | 1 question | unresolved items and evidence gaps to close |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Dimension Scorecard | Every dimension is placed on the named 1-5 level scale (Initial/Developing/Defined/Managed/Optimizing) | blocker |
| QB-02 | Dimension Scorecard | Every dimension cites at least one piece of supporting evidence or a stated rationale | blocker |
| QB-03 | Dimension Scorecard | The current level vs target level gap is explicit for every dimension | blocker |
| QB-04 | Roadmap to Next Level | The roadmap gives prioritized actions per gapped dimension, separating quick wins from systemic changes | blocker |
| QB-05 | Dimension Scorecard | The assessment is honest and differentiated — not every dimension is rated the same, and not all are rated "advanced" | warning |
| QB-06 | Assessment Context | The evidence basis (data-backed vs self-report) is stated so confidence is clear | blocker |
| QB-07 | Maturity Summary | The overall maturity summary reflects the dimension spread and names the laggards, rather than reporting only an average | warning |
| QB-08 | Risks & Dependencies | Roadmap actions with prerequisites name the dependency rather than presenting all actions as independent | warning |

## Reference Navigation

Read only what is needed:
- assessment output shell and level scale: `references/maturity-assessment-template.md`
- downstream handoff block and field typing: `references/maturity-assessment-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [assess_design_maturity, place_org_on_maturity_model, build_design_ops_investment_case, design_capability_audit, plan_maturity_roadmap]

- "Assess our design team's maturity and where to invest."
- "Where does our design org sit on a maturity model?"
- "Build the case for design ops investment with a maturity assessment."

### Negative
- "Set goals and OKRs from these maturity findings." -> `$design-okr-writer`
- "Benchmark our product against competitors." -> `$competitive-analyzer`
- "Build the leadership deck to present this case." -> `$stakeholder-presentation-writer`
- "Evaluate this interface against usability heuristics." -> `$heuristic-evaluator`
- "Audit this page for accessibility compliance." -> `$accessibility-auditor`

### Ambiguous
- "How are we doing as a design team?" (clarify: do you want a leveled maturity assessment across capability dimensions, or a critique of specific design work?)
- "What should we invest in next?" (clarify: a maturity assessment that surfaces the gaps to invest against, or goal-setting once the gaps are already known?)
