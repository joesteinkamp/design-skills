---
name: design-critique
description: "Facilitate structured design critiques producing actionable, severity-ranked feedback across usability, visual, content, consistency, and accessibility lenses. Use when requests involve design review, design feedback, or critique sessions for your team's work — not heuristic scoring, not WCAG auditing, not candidate evaluation."

# Discovery & Auto-Selection
category: evaluation
tags: [critique, feedback, design-review, severity-ranking]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer]
downstream_skills: [stakeholder-presentation-writer]

# Input Contract
inputs:
  - name: design_artifact
    required: true
    type: text
    description: "Designs, specs, prototypes, or screenshots to critique"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with context, goals, and interaction details"

# Output Contract
outputs:
  - name: critique
    type: design_critique
    template: references/critique-output-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_artifact
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_screenshot, get_design_context]
    when: "Capturing screenshots and analyzing component-level design details"
  - name: linear
    actions: [create_issue]
    when: "Creating action items from priority findings"
  - name: slack
    actions: [send_message, share_link]
    when: "Sharing critique summary for async discussion"

# User Input Gates
user_inputs:
  - step: 1
    question: "What design stage is this?"
    options: [concept, wireframe, high_fi, pre_ship]
    required: true
  - step: 1
    question: "Figma URL?"
    required: false
  - step: 1
    question: "Any specific areas of concern?"
    required: false
  - step: 4
    question: "Post priority actions to Linear?"
    required: false
    default: false
---

# Design Critique

## Overview

Use this skill to produce structured, actionable design critiques. Accepts design descriptions, screenshots, specs (from `$design-spec-writer`), or prototypes and produces severity-ranked feedback across multiple evaluation lenses.

The output should be constructive and specific: every concern comes with a recommendation, and strengths are acknowledged alongside issues. Output is formatted for use in Figma comments, Notion, or Loom script. When the target format is specified, adapt the critique structure accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Capture screenshots and use get_design_context for component-level critique with node references, spacing values, and design token inspection | Critique based on provided descriptions or screenshots; note that component-level details may be less precise |
| **Linear** | Create action items from priority findings (concerns and blockers) with severity, category, recommendation, and effort estimate | Output action items as a prioritized list; user creates tickets manually |
| **Slack** | Share critique summary in relevant channel for async team discussion and follow-up | Output critique summary as text; user shares manually |

## Workflow

### Step 1: Establish context
- **Reads:** design_artifact, design_spec (if provided)
- **Ask user:** "What design stage is this?" — options: concept, wireframe, high-fi, pre-ship. Determines critique depth.
- **Ask user:** "Figma URL?" — if available, enables visual-reference critique.
- **Ask user:** "Any specific areas of concern?" — focuses the critique on what matters most.
- **Actions:**
  - Identify what is being critiqued (screen, flow, component, prototype).
  - Clarify design goals and target persona.
  - Determine design stage: concept, wireframe, hi-fi, or pre-ship.
  - Adjust critique depth to match the stage (concepts get directional feedback, pre-ship gets detailed findings).
- **If** Figma URL provided → critique with visual references and component-level details.
- **Tool action — Figma (if Figma URL provided):** Capture screenshots with get_screenshot and pull design context with get_design_context for component-level analysis including spacing, typography, and design token usage.
- **If** concept stage → provide directional feedback on approach and structure; skip pixel-level and implementation-specific critique.
- **If** pre-ship stage → provide detailed, implementation-specific critique including edge cases, error states, loading states, and pixel-level polish.
- **Produces:** Populated `Critique Context` section

### Step 2: Apply evaluation lenses using the Ladder of Feedback method
- **Reads:** Step 1 context, design_artifact
- **Actions:**
  - Follow the canonical sequence: Clarify, Value, Concern, Suggest.
  - **Clarify:** Ask what is unclear about the design intent before judging.
  - **Value:** Name what works well and why — be specific about the principle it satisfies.
  - **Concern:** State concerns as questions ("I wonder if..." / "Have you considered...") with evidence.
  - **Suggest:** Offer concrete alternatives, not vague direction.
  - Use `references/critique-rubric.md` for the full lens set.
  - Evaluate across: user goals, interaction clarity, visual hierarchy, design system consistency, content quality, edge cases, emotional tone.
  - Note both strengths and weaknesses per lens.
- **Checkpoint:** "I've evaluated across [N] lenses. Here's a summary of [X] strengths and [Y] concerns. Ready for detailed findings?"
- **Produces:** Populated `What Works Well` and `Findings` sections
- **References:** `references/critique-rubric.md`

### Step 3: Classify feedback
- **Reads:** Step 2 findings
- **Actions:**
  - Tag each finding as praise, concern, or blocker.
  - Rate severity: critical, major, minor, or nit.
  - Categorize: usability, visual, content, consistency, or accessibility.
  - Reference the specific evaluation lens and principle.
- **Produces:** Classified findings within `Findings` section

### Step 4: Generate recommendations
- **Reads:** Step 3 classified findings
- **Ask user:** "Post priority actions to Linear?" — Default: no.
- **Actions:**
  - Provide a specific, actionable recommendation for each concern and blocker.
  - Reference design principles or heuristics when relevant.
  - Estimate effort for priority actions.
- **Tool action — Linear (if available and user confirms):** Create action items from priority findings (concerns and blockers) with severity, category, recommendation, effort estimate, and Figma link (if available).
- **If** Linear unavailable → output action items as a prioritized list for manual ticket creation.
- **Tool action — Slack (if available):** Share critique summary with key findings and priority actions in the relevant channel for async discussion.
- **If** Slack unavailable → output critique summary as shareable text.
- **Produces:** Populated `Priority Actions` section

### Step 5: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/critique-output-template.md` for the response structure.
  - Lead with an executive summary before detailed findings.
  - End with open questions that help the designer think further.
- **Next steps:** Based on output, suggest:
  - "To present these findings to stakeholders, use `$stakeholder-presentation-writer`."
  - "To turn priority fixes into design specs, use `$design-spec-writer`."
  - "For a systematic heuristic evaluation with scores, use `$heuristic-evaluator`."
  - "To capture the session's decisions and action items, use `$critique-notes-summarizer`."
  - "To document the rationale behind a decision reached here, use `$design-rationale-writer`."
- **Produces:** Complete critique with all required sections including `Executive Summary` and `Open Questions for Designer`
- **References:** `references/critique-output-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Critique Context | yes | - | key-value fields: artifact type, design goals, target persona, design stage |
| Executive Summary | yes | - | 2-3 sentence overview of critique findings and overall assessment |
| Findings | yes | 1 finding | finding cards tagged as praise/concern/blocker with severity, category, lens, and principle |
| What Works Well | yes | 2 items | specific strengths with the principle each satisfies |
| Priority Actions | yes | 1 action | actionable recommendations with effort estimates for concerns and blockers |
| Open Questions for Designer | yes | 1 question | questions that help the designer think further about the design |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Findings | Every concern has a specific, implementable recommendation (not "improve this" but "replace the icon-only button with an icon+label button to satisfy Fitts's Law") | blocker |
| QB-02 | Findings | Severity ratings are consistent (e.g., a missing error state is not rated "minor" while a color nit is rated "major") | blocker |
| QB-03 | What Works Well | Critique contains at least 2 praise items acknowledging strengths | blocker |
| QB-04 | Findings | Feedback references a named principle (not "this feels off" but "this violates the principle of progressive disclosure because...") | blocker |
| QB-05 | Findings | Edge cases (empty state, error state, loading state) are evaluated for interactive components | warning |
| QB-06 | Findings | Accessibility is mentioned in at least one finding | warning |
| QB-07 | Critique Context | Critique depth matches design stage — concept critiques do not nitpick pixel alignment; pre-ship critiques do not question overall direction | blocker |

## Reference Navigation

Read only what is needed:
- evaluation lenses and severity scale: `references/critique-rubric.md`
- critique output shell: `references/critique-output-template.md`

## Trigger Examples

### Positive
Intents: [critique_design, review_design, give_feedback, evaluate_design_quality, assess_design]

- "Review this design and give me structured feedback."
- "Critique the checkout flow — focus on usability and edge cases."
- "What are the biggest issues with this hi-fi mockup?"

### Negative
- "Evaluate this dashboard against Nielsen's heuristics." -> `$heuristic-evaluator`
- "Audit this design for WCAG compliance." -> `$accessibility-auditor`
- "Review this candidate's portfolio." -> `$portfolio-reviewer`
- "Write a design spec for this feature." -> `$design-spec-writer`
- "Map the user journey for onboarding." -> `$journey-mapper`

### Ambiguous
- "Is this design good?" (clarify design goals, target persona, and stage to provide structured critique)
- "Review this design for usability." (clarify: do you want broad design feedback, a heuristic evaluation with scores, or an accessibility audit?)
