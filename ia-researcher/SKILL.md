---
name: ia-researcher
description: "Plan and analyze information architecture studies: design open, closed, or hybrid card sorts and tree tests (tasks, trees, sample sizes, success criteria), then analyze results — agreement and similarity matrices, task success, directness, time, and first-click paths — into a recommended navigation structure and labels. Use when requests involve information architecture, navigation structure, card sorting, tree testing, findability, menu labels, or taxonomy — not end-to-end interview or survey plans (use research-plan-writer), not task flows or screen flows (use user-flow-mapper), not general survey analysis (use survey-analyzer)."

# Discovery & Auto-Selection
category: research
tags: [information-architecture, card-sorting, tree-testing, navigation, findability, taxonomy, labeling]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-brief-writer, research-synthesizer, competitive-analyzer]
downstream_skills: [user-flow-mapper, design-spec-writer, ux-copy-writer]

# Input Contract
inputs:
  - name: ia_context
    required: true
    type: text
    description: "The product area, current navigation or sitemap, content inventory, and what's not working (or raw study results to analyze)"
  - name: study_results
    required: false
    type: data
    description: "Exported card sort or tree test results (CSV/JSON from Optimal Workshop, Maze, UXtweak, Lyssna, or a spreadsheet)"
  - name: research_synthesis
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Findings about how users describe and look for content"

# Output Contract
outputs:
  - name: ia_study
    type: ia_study
    template: references/ia-study-template.md

# Batch Execution
batch:
  enabled: false

# Tool Integration
tools:
  - name: code_execution
    actions: [run_python]
    when: "Computing similarity matrices, clusters, success and directness rates, and confidence intervals from exported results"
  - name: google_sheets
    actions: [read_sheet, create_spreadsheet]
    when: "Reading exported results; sharing the analysis tables"
  - name: figma
    actions: [generate_diagram]
    when: "Drawing the recommended tree / sitemap in FigJam"

# User Input Gates
user_inputs:
  - step: 1
    question: "Planning a study or analyzing results?"
    options: [plan, analyze, both]
    default: plan
  - step: 1
    question: "Which study type?"
    options: [open_card_sort, closed_card_sort, hybrid_card_sort, tree_test, recommend]
    default: recommend
  - step: 4
    question: "Draw the recommended tree in FigJam?"
    required: false
    default: false
---

# IA Researcher

## Overview

Use this skill to answer "where should things live and what should we call them?" with evidence instead of opinion. Card sorts reveal how users group and name content (generative); tree tests measure whether people can find things in a proposed structure (evaluative). The usual sequence is open sort → draft tree → tree test → revise.

The output should make numbers honest: report sample size and confidence, separate what the data shows from interpretation, and tie every recommended structural change to a specific result.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Code execution** | Compute similarity matrices, hierarchical clusters, task success/directness/time, and binomial confidence intervals from raw exports | Compute from the tool's summary tables; show the arithmetic; mark clustering as qualitative |
| **Google Sheets** | Read exported results; publish analysis tables | User pastes CSV or summary tables |
| **Figma (FigJam)** | Draw the recommended tree with changed nodes highlighted | Output the tree as an indented list |

## Workflow

### Step 1: Scope the IA question
- **Reads:** ia_context, research_synthesis
- **Ask user:** "Planning a study or analyzing results?" — Default: plan.
- **Ask user:** "Which study type?" — Default: recommend.
- **Actions:**
  - State the IA question (e.g., "Can admins find billing settings?", "How do users group our 60 report types?").
  - Inventory the content in scope; flag items that are too vague, duplicated, or out of scope.
  - Recommend a method: open sort when categories are unknown; closed or hybrid when validating proposed categories; tree test when evaluating a structure.
- **If** analyze only → skip to Step 3.
- **Produces:** Populated `IA Question & Scope` section
- **References:** `references/ia-methods.md`

### Step 2: Design the study
- **Reads:** Step 1
- **Actions:**
  - **Card sort:** 30–60 cards written in user language (no category words leaking into card labels); categories for closed/hybrid sorts; target 15–30 participants (open), 20+ (closed).
  - **Tree test:** a text-only tree (no visual design), 8–10 tasks written as user goals without the target label's words, a correct-answer set per task, target 50+ participants for stable success rates.
  - Define success criteria in advance (e.g., ≥70% task success, ≥60% directness for key tasks).
  - Write screener criteria and the study intro text.
- **Produces:** Populated `Study Design` section
- **References:** `references/ia-methods.md`

### Step 3: Analyze results
- **Reads:** study_results
- **Actions:**
  - Report participant count, completion rate, and exclusions (speeders, straight-liners).
  - **Card sort:** agreement per category, similarity matrix of card pairs, clusters (hierarchical when code execution is available), the labels users wrote for groups, and cards with no stable home.
  - **Tree test:** per task success, directness, time, and first-click; 95% confidence intervals for success; where wrong paths went (top incorrect destinations).
  - Separate observations ("42% went to Account first") from interpretation ("'Account' is absorbing billing intent").
- **Tool action — Code execution (if available):** compute the matrix, clusters, rates, and intervals from raw exports; include the method.
- **If** fewer participants than the target → report results with wider intervals and mark findings directional.
- **Produces:** Populated `Results` section

### Step 4: Recommend structure and labels
- **Reads:** Steps 1–3
- **Ask user:** "Draw the recommended tree in FigJam?" — Default: no.
- **Actions:**
  - Propose the revised tree; mark each changed node (moved, renamed, merged, split, added).
  - Tie every change to the result that motivates it.
  - Recommend label changes using the words participants used.
  - Propose the next study (e.g., tree test the revised structure).
- **Tool action — Figma (if available and user confirms):** draw the tree with changes highlighted.
- **Next steps:** Based on output, suggest:
  - "To map the task flows through the new structure, use `$user-flow-mapper`."
  - "To finalize navigation labels and microcopy, use `$ux-copy-writer`."
  - "To spec the new navigation, use `$design-spec-writer`."
- **Produces:** Populated `Recommended Structure` and `Next Study` sections
- **References:** `references/ia-study-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| IA Question & Scope | yes | - | key-value fields: question, content in scope, method and why |
| Study Design | no | - | cards or tree, tasks with correct answers, sample size, success criteria, screener (plan mode) |
| Results | no | - | participant summary; card sort agreement/similarity/clusters or tree test success/directness/time/first-click with intervals (analyze mode) |
| Recommended Structure | yes | 1 change | indented tree with changed nodes marked and each change tied to evidence (or to the hypothesis being tested in plan mode) |
| Labels | yes | 1 label | current label → recommended label, with source |
| Limitations | yes | 1 item | sample, recruitment, and method caveats |
| Next Study | yes | - | the next study to run and what it will confirm |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Study Design | Tree test tasks are phrased as user goals and do not contain the words of the correct label | blocker |
| QB-02 | Study Design | Card labels do not contain category names or other giveaway words | blocker |
| QB-03 | Results | Every rate reports n; success rates include a confidence interval | blocker |
| QB-04 | Recommended Structure | Every structural change cites the specific result (or, in plan mode, the hypothesis) behind it | blocker |
| QB-05 | Results | Observations and interpretations are visibly separated | warning |
| QB-06 | Study Design | Success criteria are defined before results are analyzed | warning |
| QB-07 | Limitations | Small samples (card sort <15, tree test <50) are flagged and findings marked directional | blocker |

## Reference Navigation

Read only what is needed:
- method selection, sample sizes, metrics: `references/ia-methods.md`
- output shell: `references/ia-study-template.md`

## Trigger Examples

### Positive
Intents: [plan_card_sort, plan_tree_test, analyze_ia_study, restructure_navigation]

- "Plan a tree test for our new settings navigation."
- "Here's our Optimal Workshop card sort export — what structure does it suggest?"
- "Users can't find billing. How should we test and fix the IA?"

### Negative
- "Write a discussion guide for interviews about reporting." -> `$research-plan-writer`
- "Map the checkout flow screens and error paths." -> `$user-flow-mapper`
- "Analyze our NPS survey responses." -> `$survey-analyzer`
- "Rewrite the menu labels to sound friendlier." -> `$ux-copy-writer`

### Ambiguous
- "Our navigation is confusing." (clarify: run a study, analyze existing results, or critique the current nav via `$heuristic-evaluator`?)
- "Organize these 80 help articles." (clarify: propose a structure now, or plan a card sort to let users group them?)
