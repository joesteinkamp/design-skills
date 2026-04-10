---
name: user-flow-mapper
description: "Map granular, screen-level user flows with decision points, error paths, and edge cases. Use when requests involve user flows, task flows, screen flows, interaction flows, decision trees, or mapping step-by-step paths through an interface."

# Discovery & Auto-Selection
category: documentation
tags: [user-flows, task-flows, screen-flows, decision-trees, error-paths]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer, journey-mapper]
downstream_skills: [usability-test-planner]

# Input Contract
inputs:
  - name: feature_or_flow
    required: true
    type: text
    description: "Design specs, journey maps, or feature descriptions to map as flows"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with interaction details and user stories"
  - name: journey_map
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with phases to decompose into screen-level flows"

# Output Contract
outputs:
  - name: user_flows
    type: user_flows
    template: references/user-flow-template.md

# Batch Execution
batch:
  enabled: true
  input_key: feature_or_flow
  parallelizable: true
---

# User Flow Mapper

## Overview

Use this skill to map detailed, screen-level user flows that document how users move through an interface to accomplish a task. Accepts design specs (from `$design-spec-writer`), journey maps (from `$journey-mapper`), or feature descriptions and produces structured flows with decision points, error states, and edge cases.

Unlike journey maps (which capture high-level experience arcs across touchpoints), user flows document the granular, click-by-click paths through a specific interface.

The output should be implementation-ready: every screen, decision point, and error state is accounted for so that designers and developers have a complete picture of the interaction. Output is formatted for use in FigJam, Miro, Whimsical, or as structured markdown in Notion. When the target tool is specified, adapt the flow notation for that tool's shapes and connectors.

## Workflow

### Step 1: Define the flow scope
- **Reads:** feature_or_flow, design_spec (if provided), journey_map (if provided)
- **Actions:**
  - Identify the user goal and entry point.
  - Set clear start state and end state (success condition).
  - Determine the persona or user type if behavior varies by role.
  - Identify whether this is a task flow (single path), user flow (multiple paths), or wire flow (with screen representations).
- **Produces:** Populated `Flow Overview` section

### Step 2: Map the happy path
- **Reads:** Step 1 output, design_spec (if provided)
- **Actions:**
  - Document the primary, most common path from start to success.
  - List each step: screen/state, user action, and system response.
  - Note the transition type between steps (navigation, modal, inline update, redirect).
  - Keep steps at a consistent granularity (one action per step).
- **Produces:** Populated `Happy Path` section

### Step 3: Map decision points and branches
- **Reads:** Step 2 happy path
- **Actions:**
  - Identify every point where the user makes a choice or the system branches.
  - Document each branch with its condition and destination.
  - Map conditional logic (if/then rules, permission gates, feature flags).
  - Note which branches converge back to the main flow.
- **Produces:** Populated `Decision Points & Branches` section

### Step 4: Map error and edge cases
- **Reads:** Step 2 happy path, Step 3 decision points
- **Actions:**
  - Document error states for each step (validation failures, system errors, timeouts).
  - Define recovery paths: how the user gets back on track.
  - Identify edge cases: empty states, boundary conditions, first-time vs. returning user.
  - Map dead ends and how they are prevented or resolved.
- **Produces:** Populated `Error & Edge Cases` section

### Step 5: Annotate the flow
- **Reads:** All previous step outputs
- **Actions:**
  - Add annotations for complex interactions (animations, loading states, optimistic UI).
  - Note technical dependencies or API calls per step.
  - Flag open design questions or unresolved decisions.
  - Cross-reference with design specs or components where applicable.
- **Produces:** Populated `Flow Annotations` section

### Step 6: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/user-flow-template.md` for the response structure.
  - Use `references/flow-notation-guide.md` for consistent notation.
  - Ensure every path from entry reaches either success or a documented error recovery.
- **Produces:** Complete flow document with all required sections
- **References:** `references/user-flow-template.md`, `references/flow-notation-guide.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Flow Overview | yes | - | key-value fields: user goal, entry point, start state, end state, persona/user type, flow type |
| Happy Path | yes | 1 step | sequential steps with screen/state, user action, system response, and transition type |
| Decision Points & Branches | yes | 1 decision | decision nodes with condition expression and at least 2 destination branches |
| Error & Edge Cases | yes | 1 error state | error states per step with recovery paths; edge cases for conditional content |
| Flow Annotations | yes | - | annotations for complex interactions, technical dependencies, open questions |
| Flow Summary | yes | - | path count, decision point count, error states documented, open questions |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Happy Path | Happy path has no gap where the next screen or action is ambiguous | blocker |
| QB-02 | Decision Points & Branches | Every decision point has a condition expression ("if [condition]") and at least 2 destination branches | blocker |
| QB-03 | Error & Edge Cases | Error states are documented for steps that involve user input, API calls, or system processing | blocker |
| QB-04 | Error & Edge Cases | No dead end exists without a documented recovery path or explicit "terminal state" label | blocker |
| QB-05 | Happy Path | Steps are at consistent granularity — no mixing "User clicks Submit" with "User completes entire onboarding" | blocker |
| QB-06 | Flow Overview | Flow defines a specific entry point ("User arrives at [screen] from [source]") and success exit ("User sees [confirmation]") | blocker |
| QB-07 | Error & Edge Cases | Edge cases (empty state, first-time user, permission denied, offline) are mapped for flows with conditional content | warning |
| QB-08 | Flow Annotations | Flow notation is consistent — all nodes use the notation from `references/flow-notation-guide.md` | warning |

## Reference Navigation

Read only what is needed:
- flow output shell: `references/user-flow-template.md`
- notation conventions: `references/flow-notation-guide.md`

## Trigger Examples

### Positive
Intents: [map_user_flow, chart_task_flow, document_screen_flow, trace_decision_tree, map_error_paths]

- "Map the user flow for the signup process."
- "Document all paths through the checkout experience."
- "Create a task flow for the password reset feature."
- "Show me the decision tree for the onboarding wizard."

### Negative
- "Map the end-to-end customer journey." -> `$journey-mapper`
- "Write a design spec for the signup page." -> `$design-spec-writer`
- "Evaluate this flow against usability heuristics." -> `$heuristic-evaluator`

### Ambiguous
- "Help me map out this feature." -> Clarify: whether they need a high-level journey map or a granular user flow?
