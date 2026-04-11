---
name: heuristic-evaluator
description: "Evaluate interfaces against usability heuristics (Nielsen's 10 by default), producing scored assessments with severity-ranked findings and concrete fix recommendations. Use when requests involve heuristic evaluation, usability review, UX scoring, or systematic interface assessment."

# Discovery & Auto-Selection
category: evaluation
tags: [heuristics, nielsen, usability, scoring, severity-matrix]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer]
downstream_skills: []

# Input Contract
inputs:
  - name: design_screens
    required: true
    type: text
    description: "Screen descriptions, design specs, prototypes, or flow descriptions to evaluate"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with interaction details"

# Output Contract
outputs:
  - name: heuristic_evaluation
    type: heuristic_findings
    template: references/heuristic-eval-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_screens
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_screenshot, get_design_context]
    when: "Capturing screenshots per screen and analyzing interaction details from Figma"
  - name: chrome
    actions: [navigate, interact, observe]
    when: "Navigating live product for actual interaction evaluation"
  - name: google_sheets
    actions: [create_spreadsheet, populate_rows]
    when: "Exporting scorecard and severity matrix as structured spreadsheet"
  - name: linear
    actions: [create_issue]
    when: "Creating fix tickets from top priority findings"

# User Input Gates
user_inputs:
  - step: 1
    question: "Quick scan or deep evaluation?"
    options: [quick_scan, deep_evaluation]
    default: deep_evaluation
    required: true
  - step: 1
    question: "Custom heuristics or Nielsen's 10?"
    options: [nielsens_10, custom]
    default: nielsens_10
    required: true
  - step: 1
    question: "Figma URL or live product URL?"
    required: true
  - step: 3
    question: "Top 3 fixes identified. Create Linear tickets?"
    required: false
    default: false
---

# Heuristic Evaluator

## Overview

Use this skill to evaluate interfaces systematically against established usability heuristics. Accepts screen descriptions, design specs (from `$design-spec-writer`), prototypes, or flow descriptions and produces scored assessments per heuristic with severity-ranked findings.

The output should be rigorous and actionable: every heuristic gets a score, every violation has a severity rating, and the top fixes are prioritized by impact. Output is formatted for use in Figma annotations, Notion, or Jira. When the target tool is specified, adapt the finding format for that tool's structure.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Capture screenshots per screen for visual reference; use get_design_context for interaction analysis and component inspection | Evaluate based on provided screen descriptions or design specs; user provides screenshots manually |
| **Chrome** | Navigate the live product to evaluate actual interactions, transitions, error states, and dynamic behavior | Evaluate based on static descriptions; flag that dynamic behavior was not directly observed |
| **Google Sheets** | Export the full scorecard, severity matrix, and finding details as a structured spreadsheet for team review | Output scorecard and matrix as markdown tables; user creates spreadsheet manually |
| **Linear** | Create fix tickets from the top 3 priority findings with severity, location, recommendation, and effort estimate | Output ticket-ready descriptions; user creates tickets manually |

## Workflow

### Step 1: Define scope
- **Reads:** design_screens, design_spec (if provided)
- **Ask user:** "Quick scan or deep evaluation?" — quick scan covers top-level screens only; deep evaluation examines every state, edge case, and error flow. Default: deep evaluation.
- **Ask user:** "Custom heuristics or Nielsen's 10?" — Default: Nielsen's 10.
- **Ask user:** "Figma URL or live product URL?" — determines the evaluation method.
- **Actions:**
  - Identify what is being evaluated (screens, flows, components).
  - Select heuristic set: Nielsen's 10 (default), extended, or custom.
  - Determine evaluation depth: quick scan or deep evaluation.
  - Note platform and user context.
- **If** Figma URL provided → use get_screenshot and get_design_context for each screen.
- **Tool action — Figma (if Figma URL provided):** Capture screenshots per screen and pull design context for interaction analysis, node references, and component details.
- **If** live product URL provided → use Chrome for interactive evaluation.
- **Tool action — Chrome (if live URL provided):** Navigate the live product to evaluate actual interactions, transitions, error handling, and dynamic behavior.
- **If** quick scan → evaluate top-level screens only, skip edge cases and error states.
- **If** deep evaluation → evaluate every state including empty, loading, error, success, and edge cases.
- **Produces:** Populated `Evaluation Scope` section

### Step 2: Evaluate per heuristic using Nielsen's 10 as the canonical baseline
- **Reads:** Step 1 scope, design_screens
- **Actions:**
  - Use `references/heuristic-definitions.md` for heuristic definitions and key indicators.
  - Default to Nielsen's 10 Usability Heuristics:
    - H1: Visibility of system status
    - H2: Match between system and real world
    - H3: User control and freedom
    - H4: Consistency and standards
    - H5: Error prevention
    - H6: Recognition rather than recall
    - H7: Flexibility and efficiency of use
    - H8: Aesthetic and minimalist design
    - H9: Help users recognize, diagnose, and recover from errors
    - H10: Help and documentation
  - Assess compliance for each heuristic.
  - Document violations with severity (0-4 scale), location, and evidence.
  - Note positive patterns where heuristics are well-satisfied.
- **Checkpoint:** "I've completed the heuristic-by-heuristic assessment. Here are [N] violations across [M] heuristics. Ready for scoring and prioritization?"
- **Produces:** Populated `Findings` section
- **References:** `references/heuristic-definitions.md`

### Step 3: Score and rank
- **Reads:** Step 2 findings
- **Ask user:** "Top 3 fixes identified. Create Linear tickets?" — Default: no.
- **Actions:**
  - Assign a score (0-4) per heuristic based on worst violation severity.
  - Calculate overall score.
  - Build severity matrix showing violation counts by severity level.
  - Identify top 3 most impactful violations.
- **Tool action — Google Sheets (if available):** Export the full scorecard, severity matrix, and detailed findings as a structured spreadsheet for team review and tracking.
- **If** Google Sheets unavailable → output scorecard and matrix as markdown tables.
- **Tool action — Linear (if available and user confirms):** Create fix tickets for the top 3 priority findings with severity rating, screen location, violation description, recommended fix, and effort estimate.
- **If** Linear unavailable → output ticket-ready descriptions for manual creation.
- **Produces:** Populated `Scorecard`, `Severity Matrix`, and `Top 3 Priority Fixes` sections

### Step 4: Generate recommendations
- **Reads:** Step 3 scored findings
- **Actions:**
  - Provide a concrete fix for each violation.
  - Include rationale explaining why the fix improves usability.
  - Estimate effort for top priority fixes.
- **Produces:** Recommendations integrated into findings

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/heuristic-eval-template.md` for the response structure.
  - Lead with the scorecard for quick scanning.
  - Highlight positive patterns alongside violations.
- **Next steps:** Based on output, suggest:
  - "For a broader design critique beyond heuristics, use `$design-critique`."
  - "For WCAG accessibility compliance, use `$accessibility-auditor`."
  - "To turn top fixes into design specs, use `$design-spec-writer`."
- **Produces:** Complete evaluation with all required sections
- **References:** `references/heuristic-eval-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Evaluation Scope | yes | - | key-value fields: screens evaluated, heuristic set, evaluation depth, platform, user context |
| Scorecard | yes | 10 heuristics | score (0-4) per heuristic with summary |
| Findings | yes | 1 finding | violation cards with heuristic, severity (0-4), location, evidence, and recommendation |
| Severity Matrix | yes | - | violation counts by severity level (0-4) with totals matching individual findings |
| Top 3 Priority Fixes | yes | 3 fixes | ranked by impact, highest-severity most-frequent violations first |
| Positive Patterns | yes | 2 patterns | things done well with heuristic reference |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Scorecard | Scorecard is missing any of the 10 heuristics (or any heuristic in the selected set) | blocker |
| QB-02 | Findings | Any violation is missing a severity rating on the 0-4 scale (0=not a problem, 1=cosmetic, 2=minor, 3=major, 4=catastrophic) | blocker |
| QB-03 | Findings | Any violation lacks a specific location reference ("the settings page" not "somewhere in the app") | blocker |
| QB-04 | Findings | Recommendations are generic ("improve error handling") rather than specific ("add inline validation to the email field that shows the error before form submission") | warning |
| QB-05 | Top 3 Priority Fixes | Top 3 fixes are not ranked by impact -- the highest-severity, most-frequent violations should be first | blocker |
| QB-06 | Positive Patterns | Positive patterns section is empty -- every evaluation must name at least 2 things done well | warning |
| QB-07 | Severity Matrix | Severity matrix totals do not match the count of individual findings | blocker |
| QB-08 | Top 3 Priority Fixes | A heuristic scored 3 or 4 but is not represented in the Top 3 Priority Fixes | warning |

## Reference Navigation

Read only what is needed:
- heuristic definitions and severity scale: `references/heuristic-definitions.md`
- evaluation output shell: `references/heuristic-eval-template.md`

## Trigger Examples

### Positive
Intents: [evaluate_heuristics, score_usability, assess_nielsen, review_interface, rate_ux]

- "Evaluate this dashboard against Nielsen's heuristics."
- "Do a heuristic evaluation of the onboarding flow."
- "Score this design on usability heuristics."

### Negative
- "Audit this design for WCAG compliance." -> `$accessibility-auditor`
- "Give me feedback on this design." -> `$design-critique`
- "Review this candidate's portfolio." -> `$portfolio-reviewer`
- "Write a design spec for this feature." -> `$design-spec-writer`
- "Compare this product against competitors." -> `$competitive-analyzer`

### Ambiguous
- "Review this design for usability." (clarify: do you want heuristic scoring against Nielsen's 10, broad design critique, or an accessibility audit?)
