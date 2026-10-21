---
name: ideation-facilitator
description: "Generate and converge on design concepts for a framed problem: reframe How Might We questions, produce a divergent concept set spanning distinct strategies, cluster and evaluate concepts on desirability, feasibility, and viability, and recommend a shortlist with the riskiest assumption and cheapest test for each. Use when requests involve ideation, concepting, brainstorming solutions, crazy 8s, generating design directions, or 'what are some ways we could solve this' — not facilitating a live workshop agenda (use workshop-planner), not surfacing abstract tensions (use design-spectrums-creator), not finding external examples (use inspiration-browser)."

# Discovery & Auto-Selection
category: planning
tags: [ideation, concepting, brainstorming, how-might-we, divergent-thinking, concept-evaluation]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-brief-writer, research-synthesizer, journey-mapper, inspiration-browser]
downstream_skills: [sketch-to-code, prototype-builder, design-spec-writer, usability-test-planner, design-rationale-writer]

# Input Contract
inputs:
  - name: problem
    required: true
    type: text
    description: "The problem to ideate on: a problem statement, HMW questions, or a design brief"
  - name: design_brief
    required: false
    type: brief_handoff
    source_skill: design-brief-writer
    description: "Brief handoff with problem, goals, non-goals, constraints, and HMWs"
  - name: journey_map
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map whose opportunity areas can seed concepts"
  - name: inspiration_board
    required: false
    type: inspiration_board
    source_skill: inspiration-browser
    description: "Curated references to remix into concepts"

# Output Contract
outputs:
  - name: concept_set
    type: concept_set
    template: references/concept-set-template.md

# Batch Execution
batch:
  enabled: true
  input_key: problem
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [generate_diagram]
    when: "Laying out the concept set and evaluation matrix on a FigJam board"
  - name: notion
    actions: [publish_page]
    when: "Publishing the concept set for async voting"

# User Input Gates
user_inputs:
  - step: 1
    question: "How wide should we go?"
    options: [incremental, mixed, moonshot]
    default: mixed
  - step: 1
    question: "Any hard constraints concepts must respect?"
    required: false
  - step: 3
    question: "Generated [N] concepts across [M] strategies. Any to add, merge, or drop before evaluation?"
    checkpoint: true
  - step: 5
    question: "Create a FigJam board with the concepts?"
    required: false
    default: false
---

# Ideation Facilitator

## Overview

Use this skill once the problem is framed and the team needs options. It deliberately separates divergence (many genuinely different ideas) from convergence (a reasoned shortlist), because teams that converge too early end up polishing the first idea.

The output should contain concepts that differ in strategy, not just in UI arrangement, and every shortlisted concept should name what has to be true for it to work and the cheapest way to find out. Ideas are hypotheses, not commitments.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma (FigJam)** | Lay out HMWs, concept cards, clusters, and the evaluation matrix on a board for team voting | Output as markdown; user copies cards to a board |
| **Notion** | Publish the concept set as a page for async review and voting | Output as markdown; user pastes into Notion |

## Workflow

### Step 1: Ground in the problem
- **Reads:** problem, design_brief, journey_map
- **Ask user:** "How wide should we go?" — options: incremental, mixed, moonshot. Default: mixed.
- **Ask user:** "Any hard constraints concepts must respect?" — e.g., no new backend, ships this quarter.
- **Actions:**
  - Restate the problem and the primary user in one line each.
  - Note goals, non-goals, and hard constraints; non-goals bound divergence, constraints filter convergence.
- **If** the problem is solution-shaped or unframed → frame it first (or suggest `$design-brief-writer`) before ideating.
- **Produces:** Populated `Problem Frame` section

### Step 2: Reframe the opening
- **Reads:** Step 1
- **Actions:**
  - Write 4–6 How Might We variants using different lenses: amplify the good, remove the bad, flip the assumption, change the actor, change the moment, analogy from another domain.
  - Mark which HMWs the concepts will target.
- **Produces:** Populated `How Might We` section
- **References:** `references/ideation-methods.md`

### Step 3: Diverge
- **Reads:** Step 2, inspiration_board
- **Actions:**
  - Generate at least 8 concepts across at least 3 distinct strategies (e.g., remove the step, automate it, reshape the content, change the channel, add social proof, change the business model).
  - For each concept: a memorable name, a one-sentence idea, how it works in 2–3 steps, the user value, and the strategy it represents.
  - Include at least one "wild" concept that breaks a stated assumption, labeled as such.
  - Avoid near-duplicates: two concepts that differ only in layout count as one.
- **Checkpoint:** "Generated [N] concepts across [M] strategies. Any to add, merge, or drop before evaluation?"
- **Produces:** Populated `Concepts` section
- **References:** `references/ideation-methods.md`

### Step 4: Converge
- **Reads:** Step 3, Step 1 constraints
- **Actions:**
  - Cluster concepts by strategy.
  - Score each concept 1–5 on desirability (solves the user problem), feasibility (buildable within constraints), and viability (fits business goals), with a one-line reason per score.
  - Recommend 2–3 concepts for the shortlist; at least one should be the safe bet and one the bigger bet.
  - For each shortlisted concept, name its riskiest assumption and the cheapest test (paper prototype, fake door, concierge, five-user test).
- **Produces:** Populated `Evaluation Matrix` and `Shortlist` sections

### Step 5: Format and hand off
- **Reads:** All previous step outputs
- **Ask user:** "Create a FigJam board with the concepts?" — Default: no.
- **Actions:**
  - Fill `references/concept-set-template.md`.
- **Tool action — Figma (if available and user confirms):** generate a board with HMWs, concept cards, clusters, and the matrix.
- **Next steps:** Based on output, suggest:
  - "To turn a concept sketch into code, use `$sketch-to-code`."
  - "To build a clickable prototype of the shortlist, use `$prototype-builder`."
  - "To test the riskiest assumption with users, use `$usability-test-planner`."
  - "To record why the shortlist was chosen, use `$design-rationale-writer`."
- **Produces:** Complete concept set
- **References:** `references/concept-set-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Problem Frame | yes | - | key-value fields: problem, primary user, goals, non-goals, hard constraints, breadth |
| How Might We | yes | 4 questions | HMW variants labeled by lens; targeted ones marked |
| Concepts | yes | 8 concepts | concept cards: name, idea, how it works, user value, strategy |
| Evaluation Matrix | yes | 1 row per concept | table: concept × desirability / feasibility / viability scores with reasons |
| Shortlist | yes | 2 concepts | recommended concepts with why, riskiest assumption, cheapest test |
| Discarded Directions | no | - | strategies considered and set aside, with reason |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Concepts | At least 8 concepts spanning at least 3 distinct strategies; no two concepts differ only in layout or visual treatment | blocker |
| QB-02 | Concepts | At least one concept deliberately breaks a stated assumption and is labeled as such | warning |
| QB-03 | Evaluation Matrix | Every score has a one-line reason; scores are not all clustered at 3–4 | blocker |
| QB-04 | Shortlist | Each shortlisted concept names its riskiest assumption and a test that costs days, not weeks | blocker |
| QB-05 | Shortlist | Shortlist respects the hard constraints and non-goals from the Problem Frame | blocker |
| QB-06 | How Might We | HMWs use at least 3 different lenses | warning |
| QB-07 | Shortlist | Shortlist includes both a safer and a bolder option | warning |

## Reference Navigation

Read only what is needed:
- HMW lenses and divergence techniques: `references/ideation-methods.md`
- output shell: `references/concept-set-template.md`

## Trigger Examples

### Positive
Intents: [generate_concepts, brainstorm_solutions, ideate, explore_directions]

- "Give me a range of concepts for reducing time-to-first-invoice."
- "Run a crazy 8s-style ideation on this HMW."
- "We have a brief — what are some genuinely different directions we could take?"

### Negative
- "Plan a 2-hour ideation workshop with the team." -> `$workshop-planner`
- "Find examples of great onboarding from other industries." -> `$inspiration-browser`
- "What tensions should we decide on for this product?" -> `$design-spectrums-creator`
- "Write a spec for the concept we picked." -> `$design-spec-writer`

### Ambiguous
- "Help us brainstorm." (clarify: generate concepts now, or plan a session for the team to generate them?)
- "What should this screen look like?" (clarify: explore multiple directions, or build one screen via `$sketch-to-code`?)
