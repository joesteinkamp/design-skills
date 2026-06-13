---
name: ux-copy-writer
description: "Generate and refine UX microcopy -- button and CTA labels, error and validation messages, empty states, tooltips, confirmation dialogs, onboarding and notification copy -- in a consistent, accessible voice and tone. Use when requests involve microcopy, content design, error or empty-state wording, or refining short UI strings -- not full design specs (-> $design-spec-writer), not accessibility audits (-> $accessibility-auditor), not image alt text (-> $alt-text-generator)."

# Discovery & Auto-Selection
category: documentation
tags: [ux-writing, microcopy, content-design, voice-tone, error-messages, empty-states]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [design-spec-writer, dev-handoff-writer]
downstream_skills: [accessibility-auditor]

# Input Contract
inputs:
  - name: copy_request
    required: true
    type: text
    description: "The surface or component needing copy, plus its context and purpose"
  - name: voice_tone_guide
    required: false
    type: text
    description: "Brand voice principles, tone words, or do/don't examples"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with content requirements, component states, and constraints"

# Output Contract
outputs:
  - name: ux_copy
    type: ux_copy
    template: references/ux-copy-template.md
  - name: ux_copy_handoff
    type: ux_copy_handoff
    optional: true
    target_skill: accessibility-auditor
    schema: references/ux-copy-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: copy_request
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_design_context, write_text_layer]
    when: "Reading component context and writing approved copy into text layers"
  - name: notion
    actions: [fetch_voice_guide, publish_copy_deck]
    when: "Fetching a brand voice guide and publishing the finished copy deck"
  - name: linear
    actions: [create_ticket]
    when: "Creating copy-fix tickets for strings flagged in review"

# User Input Gates
user_inputs:
  - step: 1
    question: "What surface or component is this copy for?"
    required: true
  - step: 1
    question: "Any voice and tone constraints or a brand guide to follow?"
    required: false
  - step: 1
    question: "Target reading level or locale constraints?"
    required: false
  - step: 5
    question: "Write approved copy back into Figma text layers?"
    required: false
    default: false
---

# UX Copy Writer

## Overview

Use this skill to generate and refine UX microcopy in a consistent, accessible voice and tone. Accepts a copy request describing the surface and its purpose, an optional voice and tone guide, or a design spec (from `$design-spec-writer`) and produces ready-to-paste strings with rationale, required UX states, and variants worth testing. Output is formatted for use in Figma text layers, a Notion copy deck, or a markdown table for handoff.

The output should be implementation-ready: every string carries a one-line rationale tied to user intent, error messages say what happened and how to recover, and the empty, error, loading, and success states are all covered. When character limits or a reading level are stated, every string respects them.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Read component context, states, and existing strings via get_design_context; write approved copy into text layers via write_text_layer | User describes the component and pastes copy into Figma manually; reference design system docs for state names |
| **Notion** | Fetch the brand voice guide via fetch_voice_guide; publish the finished copy deck as a Notion page via publish_copy_deck | User provides voice principles inline; output as markdown for manual paste into Notion |
| **Linear** | Create copy-fix tickets for strings flagged during review with surface, current copy, and proposed copy | Output flagged strings as a markdown checklist; user creates tickets manually |

## Workflow

### Step 1: Establish surface, context, and voice
- **Reads:** copy_request, voice_tone_guide (if provided), design_spec (if provided)
- **Ask user:** "What surface or component is this copy for?" — names the element set and where copy will live.
- **Ask user:** "Any voice and tone constraints or a brand guide to follow?" — sets the voice the copy must match.
- **Ask user:** "Target reading level or locale constraints?" — sets reading level and translation-readiness bounds.
- **Actions:**
  - Identify the surface, each copy element on it, and the user intent at that moment.
  - Capture voice principles, tone words, and any banned terms or required phrasing.
  - Note character limits, reading-level target, and locale constraints.
  - If critical context is missing, state assumptions explicitly.
- **If** voice_tone_guide provided → derive concrete do/don't rules to apply per string.
- **If** no voice guide available → infer a neutral, plain-language voice and flag that `$design-spec-writer` content requirements or a brand guide can sharpen it.
- **Tool action — Figma (if available and component referenced):** Read component context, state names, and existing strings via get_design_context.
- **Tool action — Notion (if available and a guide page is referenced):** Fetch the brand voice guide via fetch_voice_guide.
- **If** design_spec from `$design-spec-writer` → use its content requirements, states, and character limits directly.
- **Produces:** Populated `Copy Context` section

### Step 2: Draft primary copy per element
- **Reads:** Step 1 context
- **Actions:**
  - Write the primary string for each element: CTAs, labels, headings, helper text.
  - Make CTAs specific action verbs ("Save changes") rather than generic ("OK", "Submit") where context allows.
  - Attach a one-line rationale to each string tying it to user intent.
  - Record an estimated character count against any stated limit.
- **If** a string exceeds a stated character limit → draft a shorter alternative and note the tradeoff.
- **Produces:** Populated `Primary Copy` section

### Step 3: Produce required UX states copy
- **Reads:** Step 2 primary copy, Step 1 context
- **Actions:**
  - Write copy for each required state: empty, error, loading, success, and confirmation.
  - For error and validation messages, state what happened and the concrete recovery action.
  - Keep loading and success copy brief and reassuring; avoid blame in error copy.
  - Generate alternative variants where an A/B test would meaningfully resolve a voice or clarity tradeoff.
- **Checkpoint:** "Here are the primary strings and the empty/error/loading/success/confirmation states. Any to adjust before I check consistency?"
- **Produces:** Populated `State Copy` and `Variants` sections

### Step 4: Check voice, reading level, limits, and accessibility
- **Reads:** Step 2 and Step 3 output, Step 1 constraints
- **Actions:**
  - Verify the voice is consistent across every string against the captured principles.
  - Check each string against its character limit and the target reading level.
  - Replace unexplained jargon with plain language, or define it inline.
  - Confirm copy is screen-reader friendly: meaningful link and button text, no "click here", no reliance on visual position.
  - Note any string that still fails a constraint and the reason.
- **Tool action — Linear (if available):** Create copy-fix tickets for any string flagged here with surface, current copy, and proposed copy.
- **If** Linear unavailable → list flagged strings as a markdown checklist for manual ticket creation.
- **Produces:** Populated `Voice & Tone Notes` section

### Step 5: Format, publish, and optional write-back
- **Reads:** All previous step outputs
- **Ask user:** "Write approved copy back into Figma text layers?" — Default: no; output as markdown.
- **Actions:**
  - Assemble sections using the output template.
  - Include the `references/ux-copy-handoff-schema.md` block when output feeds `$accessibility-auditor`.
  - Log open questions with owners where decisions are unresolved.
- **Tool action — Figma (if available and user confirms):** Write approved copy into the matching text layers via write_text_layer.
- **Tool action — Notion (if available):** Publish the copy deck as a Notion page via publish_copy_deck.
- **If** no tools available → output the full copy deck as markdown for manual paste.
- **Next steps:** Based on output, suggest:
  - "Use `$accessibility-auditor` to verify the copy meets plain-language and screen-reader requirements."
  - "If variants are worth validating with users, use `$ab-test-planner` to design the test."
  - "If the surface still needs full requirements, use `$design-spec-writer` to spec it out."
- **Produces:** Complete copy deck with all required sections
- **References:** `references/ux-copy-template.md`, `references/ux-copy-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Copy Context | yes | - | key-value fields: surface, user intent, voice principles, reading level, character limits, locale |
| Primary Copy | yes | 1 element | table: element / context / copy / rationale / char count |
| State Copy | yes | 5 states | rows for empty, error, loading, success, confirmation with copy and rationale |
| Variants | no | 0 | variant sets with A/B options and what each tests |
| Voice & Tone Notes | yes | 1 item | bullets on consistency, reading level, jargon, and accessibility checks |
| Open Questions | yes | 0 | question cards with context and owner |
| UX Copy Handoff | no | - | handoff schema block per `references/ux-copy-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Primary Copy | Every string has a one-line rationale tying it to user intent | blocker |
| QB-02 | State Copy | Every error and validation message states what happened AND the concrete recovery action | blocker |
| QB-03 | Primary Copy | Copy avoids unexplained jargon, or defines any necessary term inline | blocker |
| QB-04 | Primary Copy | Every string respects its stated character limit | warning |
| QB-05 | Voice & Tone Notes | Voice is consistent across all strings against the captured principles | blocker |
| QB-06 | State Copy | Empty, error, loading, and success states all have copy | blocker |
| QB-07 | Primary Copy | CTAs use specific action verbs ("Save changes") rather than generic labels ("OK", "Submit") where context allows | warning |
| QB-08 | Voice & Tone Notes | Reading level is appropriate to the stated audience | warning |

## Reference Navigation

Read only what is needed:
- copy deck output shell: `references/ux-copy-template.md`
- downstream handoff contract: `references/ux-copy-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_microcopy, refine_copy, write_error_messages, write_empty_state, generate_cta_options]

- "Write the empty state and error copy for the inbox."
- "Give me 3 options for this onboarding CTA."
- "Rewrite these error messages to be friendlier and clearer."

### Negative
- "Write a full design spec for this feature." -> `$design-spec-writer`
- "Audit this screen for WCAG compliance." -> `$accessibility-auditor`
- "Write alt text for these product images." -> `$alt-text-generator`
- "Map the onboarding journey." -> `$journey-mapper`

### Ambiguous
- "Help me with the copy on this page." -> Clarify: microcopy for specific elements (this skill) or full content requirements in a spec (`$design-spec-writer`)?
- "Make this clearer." -> Clarify: rewrite the existing strings (this skill) or audit them against accessibility standards (`$accessibility-auditor`)?
