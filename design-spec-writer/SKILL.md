---
name: design-spec-writer
description: "Write structured design specs bridging design intent with engineering requirements -- problem statements, user stories, interaction details, edge cases, and acceptance criteria. Use when requests involve design specs, feature specs, PRDs, user stories, or preparing design documentation for $dev-handoff-writer."

# Discovery & Auto-Selection
category: documentation
tags: [specs, user-stories, acceptance-criteria, PRD, feature-spec, interaction-design]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [persona-creator, journey-mapper, research-synthesizer]
downstream_skills: [dev-handoff-writer, ab-test-planner, accessibility-auditor, design-critique, heuristic-evaluator, usability-test-planner, user-flow-mapper, design-spectrums-creator, design-success-metrics-writer, inspiration-browser, research-plan-writer]

# Input Contract
inputs:
  - name: feature_description
    required: true
    type: text
    description: "Feature or product description to spec out"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards with goals, frustrations, and behaviors"
  - name: journey_context
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with phases, pain points, and opportunities"
  - name: research_insights
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Themed insights with evidence and recommendations"

# Output Contract
outputs:
  - name: design_spec
    type: design_spec
    template: references/design-spec-template.md
  - name: dev_handoff_summary
    type: dev_handoff
    optional: true
    target_skill: dev-handoff-writer
    schema: references/dev-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: feature_description
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_design_context, get_screenshot]
    when: "Extracting interaction specs and capturing screen illustrations"
  - name: linear
    actions: [create_ticket]
    when: "Creating user story tickets with acceptance criteria"
  - name: notion
    actions: [publish_spec]
    when: "Publishing spec as a Notion page"
  - name: github
    actions: [create_issue]
    when: "Creating issues from open questions"
  - name: productboard
    actions: [link_feature]
    when: "Linking spec to a Productboard feature"

# User Input Gates
user_inputs:
  - step: 1
    question: "Decision stage: proposal, refinement, or build-ready?"
    required: true
    options: [proposal, refinement, build-ready]
  - step: 1
    question: "Figma URL?"
    required: false
  - step: 1
    question: "Related Productboard feature?"
    required: false
  - step: 2
    question: "Scope drafted — anything to add to in/out-of-scope?"
    required: false
  - step: 5
    question: "Want me to create Linear tickets for each user story?"
    required: false
    default: false
---

# Design Spec Writer

## Overview

Use this skill to produce design specs that bridge the gap between design intent and engineering requirements. Accepts feature descriptions, personas (from `$persona-creator`), journey context (from `$journey-mapper`), or research insights (from `$research-synthesizer`) and produces structured specifications. Output is formatted for use in Notion, Confluence, Linear, or Google Docs. When the target tool is specified, adapt the spec structure and linking conventions accordingly.

The output should be build-ready: every user story has acceptance criteria, every screen has states documented, and every edge case is addressed.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Extract component states, responsive behavior, and design tokens via get_design_context; capture screen illustrations via get_screenshot | User describes interactions and states manually; reference design system docs |
| **Linear** | Create user story tickets with acceptance criteria from the spec | Output user stories as markdown checklist; user creates tickets manually |
| **Notion** | Publish spec as a Notion page with linked sections | Output as markdown; user pastes into Notion |
| **GitHub / GitLab** | Create issues from open questions with owners and deadlines | Include open questions as a markdown table in output |
| **Productboard** | Link spec to the related Productboard feature for traceability | Note the Productboard feature reference in the spec metadata |

## Workflow

### Step 1: Capture context
- **Reads:** feature_description, personas (if provided), journey_context (if provided), research_insights (if provided)
- **Ask user:** "Decision stage: proposal, refinement, or build-ready?" — determines depth of interaction specs and acceptance criteria.
- **Ask user:** "Figma URL?" — enables auto-extraction of component states and tokens.
- **Ask user:** "Related Productboard feature?" — enables linking for traceability.
- **Actions:**
  - Identify feature, user problem, personas, journey context, and business constraints.
  - Determine decision stage: proposal, refinement, or build-ready.
  - Accept inputs from upstream skills or raw descriptions.
  - If critical context is missing, state assumptions explicitly.
- **If** Figma URL provided → extract component states, responsive behavior, and design tokens via get_design_context.
- **Tool action — Figma (if available and URL provided):**
  - Extract interaction specs, component states, and token references via get_design_context.
  - Capture screen illustrations via get_screenshot for embedding in the spec.
- **If** Figma unavailable → user describes interactions and states; reference design system docs.
- **If** personas from `$persona-creator` → use directly in user stories.
- **If** no personas available → ask user for target user description; flag that `$persona-creator` can provide structured personas.
- **If** build-ready → plan for full interaction specs with all states and acceptance criteria.
- **If** proposal → plan for lighter scope with problem statement, key user stories, and open questions.
- **Produces:** Populated `Design Context` section

### Step 2: Define scope
- **Reads:** Step 1 output
- **Ask user:** "Scope drafted — anything to add to in/out-of-scope?" — validates scope before proceeding.
- **Actions:**
  - Write a clear problem statement naming the specific user pain point.
  - Define success metrics that are measurable (not vanity terms).
  - List in-scope and out-of-scope items.
  - Identify dependencies and blockers.
- **Checkpoint:** "Here is the scope: [problem statement], [in-scope items], [out-of-scope items]. Anything to adjust?"
- **Tool action — Productboard (if available and feature provided):**
  - Link spec to the related Productboard feature.
  - Pull in feature context and customer evidence if available.
- **Produces:** Populated `Scope` section

### Step 3: Detail user stories and acceptance criteria
- **Reads:** Step 1 context, personas
- **Actions:**
  - Write user stories in "As a [persona], I want to [action] so that [outcome]" format.
  - Define testable acceptance criteria using Given/When/Then.
  - Include accessibility requirements per story.
  - Add responsive behavior notes.
- **If** build-ready → full acceptance criteria with all edge cases per story.
- **If** proposal → key acceptance criteria; flag areas needing refinement.
- **Produces:** Populated `User Stories & Acceptance Criteria` section

### Step 4: Specify interactions
- **Reads:** Step 3 user stories
- **Actions:**
  - Document all states per component: default, empty, loading, error, disabled.
  - Describe interactions with trigger, behavior, feedback, and result.
  - Identify edge cases and expected behavior.
- **If** Figma URL provided → cross-reference extracted component states with spec.
- **If** build-ready → complete interaction specs for all components and states.
- **If** proposal → document primary flows only; list remaining states as open items.
- **Produces:** Populated `Interaction Specs` and `Content Requirements` sections
- **References:** `references/interaction-spec-template.md`

### Step 5: Format, publish, and create tickets
- **Reads:** All previous step outputs
- **Ask user:** "Want me to create Linear tickets for each user story?" — Default: output as markdown.
- **Actions:**
  - Assemble sections using the output template.
  - Include `references/dev-handoff-schema.md` block when output feeds `$dev-handoff-writer`.
  - Log open questions with owners and deadlines.
- **Tool action — Linear (if available and user confirms):**
  - Create user story tickets with acceptance criteria from the spec.
  - Tag tickets with priority and link to the spec.
- **Tool action — GitHub/GitLab (if available):**
  - Create issues from open questions with owners and deadlines.
- **Tool action — Notion (if available):**
  - Publish spec as a Notion page with linked sections and metadata.
- **If** no ticketing tools available → output user stories and open questions as markdown.
- **Next steps:** Based on output, suggest:
  - "Use `$dev-handoff-writer` to generate engineering-ready component specs from this spec."
  - "Use `$accessibility-auditor` to audit this spec for WCAG compliance."
  - "Use `$usability-test-planner` to plan usability testing for the key flows."
  - "If user stories need validation, use `$research-plan-writer` to plan a concept test."
  - "Use `$ux-copy-writer` to draft the microcopy (labels, errors, empty states) this spec calls for."
  - "Once built, use `$design-qa-reviewer` to check the implementation against this spec."
- **Produces:** Complete spec with all required sections
- **References:** `references/design-spec-template.md`, `references/dev-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Design Context | yes | - | key-value fields: feature name, decision stage, problem statement, personas, journey context, constraints, dependencies |
| Scope | yes | - | problem statement + success metrics + in/out-of-scope lists |
| User Stories & Acceptance Criteria | yes | 1 story | story cards in As-a/I-want/So-that with numbered Given/When/Then criteria |
| Interaction Specs | yes | 1 component | state table per component (default, empty, loading, error, disabled) |
| Content Requirements | yes | 1 block | content blocks with purpose, tone, character limits, variants |
| Open Questions | yes | 0 | question cards with context, owner, and deadline |
| Dev Handoff Summary | no | - | handoff schema block per `references/dev-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | User Stories | Every user story follows "As a [persona], I want to [action] so that [outcome]" format | blocker |
| QB-02 | Acceptance Criteria | Every user story has numbered acceptance criteria in Given/When/Then format | blocker |
| QB-03 | Interaction Specs | Every interactive component documents at least 3 of: default, empty, loading, error, disabled | blocker |
| QB-04 | Edge Cases | Features with user input have >= 3 edge case entries | warning |
| QB-05 | Problem Statement | Names a specific user pain point, not a generic improvement goal | blocker |
| QB-06 | Success Metrics | Uses measurable targets ("increase task completion from 60% to 80%"), not vanity terms ("improve engagement") | blocker |
| QB-07 | Open Questions | Every open question has an assigned owner and resolution deadline | warning |
| QB-08 | Responsive | Behavior specified for at least 2 breakpoints (mobile, desktop) | warning |

## Reference Navigation

Read only what is needed:
- spec output shell: `references/design-spec-template.md`
- interaction detail template: `references/interaction-spec-template.md`
- downstream handoff contract: `references/dev-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_spec, define_requirements, document_feature, create_user_stories, prepare_for_handoff]

- "Write a design spec for the new onboarding flow."
- "Create user stories and acceptance criteria for the checkout redesign."
- "Spec out the interaction details for the settings page."

### Negative
- "Create a dev handoff doc for these components." -> `$dev-handoff-writer`
- "Write implementation specs with component states and responsive behavior." -> `$dev-handoff-writer`
- "Synthesize these interview transcripts." -> `$research-synthesizer`
- "Audit this design for accessibility." -> `$accessibility-auditor`

### Ambiguous
- "Help me document this feature." -> Clarify: design spec (intent + requirements) or dev handoff (implementation details)?
- "Write specs for this feature." -> Clarify: design-level (user stories, rationale) or developer-level (component states, code guidance)?
