---
name: prototype-builder
description: "Build a working, clickable multi-screen prototype in code from a spec, user flow, concept, or set of screens — a single-file HTML prototype or a Next.js route group with shadcn/ui and Tailwind v4 — with realistic content, the key states (empty, loading, error, success), navigable flows, and a test-readiness checklist so it can go straight into a usability session. Use when requests involve prototyping, clickable prototypes, interactive mockups, coded prototypes, or 'make this testable' — not converting a single hand-drawn sketch (use sketch-to-code), not production implementation or dev handoff (use dev-handoff-writer), not mapping the flow on paper (use user-flow-mapper)."

# Discovery & Auto-Selection
category: prototyping
tags: [prototype, clickable-prototype, code-prototype, react, shadcn, tailwind, usability-testing]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [user-flow-mapper, design-spec-writer, sketch-to-code, ideation-facilitator]
downstream_skills: [usability-test-planner, design-critique, accessibility-auditor, dev-handoff-writer]

# Input Contract
inputs:
  - name: prototype_brief
    required: true
    type: text
    description: "What to prototype and why: the flow or concept, the screens involved, and the question the prototype should answer"
  - name: user_flows
    required: false
    type: user_flows
    source_skill: user-flow-mapper
    description: "Flow with screens, decisions, and error paths to make navigable"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Spec with states, interactions, and acceptance criteria"
  - name: screens
    required: false
    type: text
    description: "Existing screens to stitch together: sketch-to-code output, screenshots, or Figma frames"

# Output Contract
outputs:
  - name: prototype
    type: prototype
    template: references/prototype-template.md

# Batch Execution
batch:
  enabled: false

# Tool Integration
tools:
  - name: filesystem
    actions: [read_file, write_file]
    when: "Reading project tokens and existing components; writing prototype files"
  - name: figma
    actions: [get_design_context, get_screenshot, get_variable_defs]
    when: "Pulling frames, layout, and tokens to rebuild screens faithfully"
  - name: chrome
    actions: [navigate, take_screenshot]
    when: "Clicking through the built prototype to verify every path works"

# User Input Gates
user_inputs:
  - step: 1
    question: "What question should this prototype answer in testing?"
    required: true
  - step: 1
    question: "Output format?"
    options: [single_file_html, nextjs_routes]
    default: single_file_html
  - step: 1
    question: "Fidelity?"
    options: [low, mid, high]
    default: mid
  - step: 2
    question: "Prototype will cover [N] screens and [M] paths. Anything to add or cut?"
    checkpoint: true
---

# Prototype Builder

## Overview

Use this skill when a team needs to put an idea in front of users or stakeholders and feel it, not just see it. It builds a prototype that runs in a browser, moves between screens, holds realistic content, and shows the states people actually hit — including the unhappy paths that static mockups skip.

The output should be scoped to the question being tested (prototype the risky part, fake the rest), clickable end to end with no dead links, and honest about what is faked. A prototype is a research instrument, not production code.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Filesystem** | Read project tokens and `components/ui/`; write the prototype files | Return files as fenced code blocks; user saves them |
| **Figma** | Pull frames, layout, and variables to rebuild screens with get_design_context and get_variable_defs | Build from the spec, flow, or screenshots; note fidelity limits |
| **Chrome** | Open the prototype, click every path, and screenshot each screen to verify | Provide the click-through checklist for the user to run |

## Workflow

### Step 1: Define what the prototype must answer
- **Reads:** prototype_brief, design_spec
- **Ask user:** "What question should this prototype answer in testing?" — e.g., "Can new admins invite a teammate without help?"
- **Ask user:** "Output format?" — single-file HTML (default; opens anywhere, easy to share) or Next.js routes (when it should live in the product repo).
- **Ask user:** "Fidelity?" — low (grayscale, structure), mid (real components, placeholder brand), high (project tokens and real content). Default: mid.
- **Actions:**
  - Write the test question and the tasks a participant will attempt.
  - Decide what must be real (the interaction being tested) and what can be faked (everything else).
- **Produces:** Populated `Prototype Goal` section
- **References:** `references/prototype-fidelity-guide.md`

### Step 2: Plan screens, paths, and states
- **Reads:** Step 1, user_flows, design_spec, screens
- **Actions:**
  - List screens and the paths between them, including at least one error or recovery path for each tested task.
  - For each screen, list states to include: default, empty, loading, error, success — whichever the tasks can reach.
  - Draft realistic content: names, numbers, and copy that fit the scenario (no lorem ipsum in tested areas).
- **Checkpoint:** "Prototype will cover [N] screens and [M] paths. Anything to add or cut?"
- **Produces:** Populated `Screen & Path Map` section

### Step 3: Build
- **Reads:** Step 2, project tokens, `references/prototype-fidelity-guide.md`
- **Actions:**
  - **Single-file HTML:** one `index.html` with the pinned Tailwind v4 browser build and shadcn tokens from `../sketch-to-code/references/preview-template.html`; screens as sections toggled by a small vanilla-JS router using URL hashes (`#/invite`), so the back button works and screens are linkable.
  - **Next.js routes:** `app/(prototype)/<name>/…/page.tsx` per screen with shadcn/ui components; shared fake data in one module.
  - Keep state in memory (or `localStorage` when a task spans reloads); add a visible "Reset prototype" control for facilitators.
  - Simulate latency for loading states (300–800 ms) and provide a way to trigger each error state (e.g., a specific input value).
  - Use semantic HTML, labels, and focus management on screen change so the prototype also works with keyboards and screen readers.
  - Apply project tokens when present; never invent a brand at high fidelity.
- **Produces:** Prototype files; populated `Files` section
- **References:** `references/prototype-fidelity-guide.md`, `../sketch-to-code/references/preview-template.html`

### Step 4: Verify
- **Reads:** Step 3 files
- **Actions:**
  - Walk every path in the Screen & Path Map; confirm there are no dead links or unreachable states.
  - Confirm each tested task can be completed and each planned error can be triggered.
- **Tool action — Chrome (if available):** open the prototype, click every path, screenshot each screen.
- **If** Chrome unavailable → produce a click-through checklist and state that the paths were verified by reading the code only.
- **Produces:** Populated `Verification` section

### Step 5: Prepare for testing and hand off
- **Reads:** All previous step outputs
- **Actions:**
  - Fill `references/prototype-template.md`, including a facilitator guide: how to start, reset, and trigger states; what's faked.
- **Next steps:** Based on output, suggest:
  - "To write the test plan and tasks around this prototype, use `$usability-test-planner`."
  - "To review the prototype before testing, use `$design-critique` or `$accessibility-auditor`."
  - "Once validated, to spec it for engineering, use `$dev-handoff-writer`."
- **Produces:** Complete prototype package
- **References:** `references/prototype-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Prototype Goal | yes | - | key-value fields: test question, tasks, format, fidelity, real vs. faked |
| Screen & Path Map | yes | 2 screens | screens with states, and paths (including error/recovery) as a list or Mermaid flowchart |
| Files | yes | 1 file | paths written; full code in fenced blocks only when files were not written |
| Verification | yes | - | each path and state: verified how (clicked in browser / code read) and result |
| Facilitator Guide | yes | - | how to open, reset, trigger states; known limitations and fakes |
| Assumptions | yes | 1 item | content, behavior, and design choices made without input |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Verification | Every path in the Screen & Path Map is reachable and has no dead links | blocker |
| QB-02 | Screen & Path Map | Each tested task includes at least one error or recovery path that can be triggered | blocker |
| QB-03 | Prototype Goal | The prototype is scoped to a stated test question; untested areas are explicitly faked or omitted | blocker |
| QB-04 | Files | Tested areas use realistic content, not lorem ipsum or "Button" labels | blocker |
| QB-05 | Facilitator Guide | Explains how to reset the prototype and trigger each non-default state | blocker |
| QB-06 | Verification | States whether paths were verified in a browser or only by reading code | warning |
| QB-07 | Files | Interactive elements are keyboard-operable and focus moves to the new screen's heading on navigation | warning |
| QB-08 | Files | High-fidelity prototypes use project tokens; no invented brand colors | warning |

## Reference Navigation

Read only what is needed:
- fidelity levels, router pattern, faking techniques: `references/prototype-fidelity-guide.md`
- HTML shell with Tailwind v4 + shadcn tokens: `../sketch-to-code/references/preview-template.html`
- output shell: `references/prototype-template.md`

## Trigger Examples

### Positive
Intents: [build_prototype, make_clickable, prototype_flow, make_testable]

- "Build a clickable prototype of the invite-teammate flow so we can test it Thursday."
- "Turn this spec into a coded prototype with the empty and error states."
- "Stitch these three generated screens into a prototype I can share as one link."

### Negative
- "Turn this whiteboard sketch into a React component." -> `$sketch-to-code`
- "Write the engineering handoff for the invite flow." -> `$dev-handoff-writer`
- "Map the invite flow and its error paths." -> `$user-flow-mapper`
- "Write the usability test plan." -> `$usability-test-planner`

### Ambiguous
- "Make this interactive." (clarify: one screen with working components, or a multi-screen flow?)
- "Build the invite feature." (clarify: a prototype to test, or production code?)
