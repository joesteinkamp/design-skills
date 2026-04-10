---
name: design-spectrums-creator
description: "Identify and map key opposing design principles, patterns, and trade-offs as spectrums for a given design challenge. Use when requests involve exploring design tensions, trade-off analysis, design principles mapping, identifying opposing approaches, or framing design decisions as spectrums."

# Discovery & Auto-Selection
category: planning
tags: [trade-offs, design-tensions, principles, spectrums, decision-framework]
complexity: light
output_length: medium

# Skill Graph
upstream_skills: [persona-creator, journey-mapper, inspiration-browser, design-spec-writer]
downstream_skills: []

# Input Contract
inputs:
  - name: design_brief
    required: true
    type: text
    description: "Design brief, feature description, or problem statement"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards with goals and behaviors"
  - name: journey_context
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map with touchpoints and pain points"
  - name: inspiration
    required: false
    type: inspiration_board
    source_skill: inspiration-browser
    description: "Curated examples and pattern analysis"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with feature context"

# Output Contract
outputs:
  - name: spectrums
    type: design_spectrums
    template: references/spectrum-card-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_brief
  parallelizable: true
---

# Design Spectrums Creator

## Overview

Use this skill to surface and map the key design tensions for a given challenge. Every design decision sits somewhere on a spectrum between opposing principles — simplicity vs. power, guidance vs. freedom, density vs. clarity. This skill makes those tensions explicit so the team can make intentional, aligned decisions rather than unconscious defaults.

Accepts a design brief, feature description, problem statement, or output from upstream skills like `$persona-creator`, `$journey-mapper`, `$inspiration-browser`, or `$design-spec-writer` and produces a set of labeled spectrums with positions, rationale, and design implications. Output is formatted for use in FigJam, Miro, or as structured markdown in Notion. When the target tool is specified, adapt the spectrum visualization format for that tool's canvas or layout.

## Workflow

### Step 1: Understand the design context
- **Reads:** design_brief, personas (if provided), journey_context (if provided), inspiration (if provided), design_spec (if provided)
- **Actions:**
  - Identify the product, feature, or experience to explore.
  - Capture user needs, business constraints, and technical realities.
  - Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$inspiration-browser` if available.
  - Note the team's current assumptions or default positions.
- **Produces:** Populated `Design Context` section

### Step 2: Identify relevant spectrums
- **Reads:** Step 1 context
- **Actions:**
  - Analyze the design challenge for inherent tensions and trade-offs.
  - Draw from common design spectrums (see `references/common-spectrums.md`) but prioritize challenge-specific tensions.
  - Aim for 5-8 spectrums that represent the most consequential decisions.
  - Each spectrum must have two clearly defined, non-strawman poles — both sides should be defensible.
  - Discard spectrums where the answer is obvious (e.g., "fast vs. slow" when performance is table stakes).
- **Produces:** Populated `Spectrum Summary` section
- **References:** `references/common-spectrums.md`

### Step 3: Define each spectrum
- **Reads:** Step 2 spectrum list
- **Actions:**
  - Name the spectrum with both poles (e.g., "Guided <--> Exploratory").
  - Define what each pole means in the context of this challenge.
  - Provide a real-world product example at each end.
  - Explain the trade-off: what you gain and lose at each pole.
  - Identify the user and business factors that pull toward each pole.
- **Produces:** Populated `Spectrum Cards` section

### Step 4: Recommend positions
- **Reads:** Step 3 spectrum definitions, personas, journey_context
- **Actions:**
  - For each spectrum, recommend a position (not always the middle — strong positions are often better).
  - Justify the position based on user needs, persona attributes, and business goals.
  - Note whether the position should shift for different personas or contexts.
  - Flag spectrums where the team should discuss and decide collectively.
  - Use `references/spectrum-card-template.md` for structure.
- **Produces:** Position recommendations within `Spectrum Cards` section
- **References:** `references/spectrum-card-template.md`

### Step 5: Synthesize into design principles
- **Reads:** Step 4 positioned spectrums
- **Actions:**
  - Convert the spectrum positions into 3-5 actionable design principles.
  - Each principle should be specific enough to resolve future design debates.
  - A good principle has a meaningful opposite (e.g., "Prioritize speed over completeness" — the opposite is also defensible).
- **Produces:** Populated `Derived Design Principles` and `Open Tensions` sections

### Step 6: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/spectrum-card-template.md` for the response structure.
  - Include a visual summary showing all spectrums with recommended positions.
- **Produces:** Complete output with all required sections and optional `Downstream Handoff`
- **References:** `references/spectrum-card-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Design Context | yes | - | key-value fields: product, feature, user needs, business constraints, technical realities, assumptions |
| Spectrum Summary | yes | 5 spectrums | visual summary showing all spectrums with recommended positions |
| Spectrum Cards | yes | 5 cards | named spectrum with poles, definitions, product examples, trade-offs, factors, and recommended position |
| Derived Design Principles | yes | 3 principles | actionable principles with meaningful opposites, derived from spectrum positions |
| Open Tensions | yes | 0 | spectrums flagged for team discussion with context for the debate |
| Downstream Handoff | no | - | structured output for feeding other skills |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Spectrum Summary | At least 5 spectrums are identified, or explicit justification is given for a smaller set | warning |
| QB-02 | Spectrum Cards | Both poles are defensible positions a reasonable designer would advocate for (e.g., "Simple <--> Powerful" is valid; "Good <--> Bad" is not) | blocker |
| QB-03 | Spectrum Cards | Every spectrum includes a real-world product example at each pole | blocker |
| QB-04 | Spectrum Cards | At least 2 spectrums have a strong left or right stance, not all clustered in the center | warning |
| QB-05 | Spectrum Cards | Positions are justified with user or business evidence, not personal preference | blocker |
| QB-06 | Derived Design Principles | Principles are specific to this challenge, not generic enough to apply to any product | blocker |
| QB-07 | Derived Design Principles | Every principle has a meaningful opposite — if no one would argue the other side, it is not a useful principle | blocker |
| QB-08 | Spectrum Cards | Trade-offs are two-sided — each spectrum states what you gain AND what you lose at each pole | blocker |

## Reference Navigation

Read only what is needed:
- spectrum output shell: `references/spectrum-card-template.md`
- common spectrum library: `references/common-spectrums.md`

## Trigger Examples

### Positive
Intents: [map_tensions, define_trade_offs, create_spectrums, identify_design_principles, explore_opposing_approaches]

- "What are the key design tensions for this feature?"
- "Map out the trade-offs we need to consider for the dashboard redesign."
- "Help us identify the opposing principles at play in our onboarding."
- "What spectrums should we consider for this design challenge?"
- "Frame the design decisions as trade-offs so we can align."

### Negative
- "Find inspiration for the onboarding flow." -> `$inspiration-browser`
- "Write a design spec for the settings page." -> `$design-spec-writer`
- "Do a competitive analysis." -> `$competitive-analyzer`

### Ambiguous
- "What should we prioritize?" (clarify whether they want spectrums/trade-offs or a prioritization framework)
- "Help us make a decision." (clarify whether they want trade-off mapping or a specific recommendation)
