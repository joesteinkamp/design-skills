---
name: inspiration-browser
description: "Research and curate design inspiration from across the web for a specific design challenge. Use when requests involve finding inspiration, exploring design patterns, looking for reference examples, benchmarking visual or interaction approaches, or gathering creative stimulus for ideation."

# Discovery & Auto-Selection
category: research
tags: [inspiration, patterns, references, examples, cross-industry, benchmarking]
complexity: light
output_length: medium

# Skill Graph
upstream_skills: [persona-creator, journey-mapper, design-spec-writer]
downstream_skills: [design-spectrums-creator]

# Input Contract
inputs:
  - name: design_challenge
    required: true
    type: text
    description: "Design brief, feature description, or problem statement to find inspiration for"
  - name: personas
    required: false
    type: persona_cards
    source_skill: persona-creator
    description: "Persona cards to focus the search"
  - name: journey_context
    required: false
    type: journey_map
    source_skill: journey-mapper
    description: "Journey map to identify relevant touchpoints"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with feature context"

# Output Contract
outputs:
  - name: inspiration_board
    type: inspiration_board
    template: references/inspiration-board-template.md

# Batch Execution
batch:
  enabled: true
  input_key: design_challenge
  parallelizable: true
---

# Inspiration Browser

## Overview

Use this skill to research and curate relevant design inspiration from across the web for a specific design challenge. Accepts a design brief, feature description, problem statement, or output from upstream skills like `$persona-creator` or `$journey-mapper` and produces a structured inspiration board with categorized examples, pattern observations, and design implications.

This skill actively searches the internet for real-world examples — landing pages, product interfaces, interaction patterns, visual treatments, and cross-industry analogies. The output should spark ideas, not prescribe solutions. Each example should include why it is relevant and what principle it demonstrates. Search sources include Mobbin, Savee, Godly, Awwwards, Dribbble (shipped products only), Product Hunt, Apple Design Awards, Google Material Studies, and industry-specific blogs. Output is formatted for use in Figma, FigJam, Miro, or as a structured Notion gallery. When the target tool is specified, adapt the board layout accordingly.

## Workflow

### Step 1: Frame the inspiration search
- **Reads:** design_challenge, personas (if provided), journey_context (if provided), design_spec (if provided)
- **Actions:**
  - Identify the design challenge, feature, or experience to explore.
  - Extract key attributes: domain, interaction type, emotional tone, user context, constraints.
  - Define search dimensions: direct competitors, adjacent industries, analogous experiences, and cross-domain inspiration.
  - Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` to focus the search.
- **Produces:** Populated `Search Context` section

### Step 2: Search broadly across categories using canonical sources
- **Reads:** Step 1 search context
- **Actions:**
  - **Direct examples:** Search Mobbin, Product Hunt, and competitor websites for products solving the same problem in the same domain.
  - **Adjacent examples:** Search Awwwards, Godly, and industry blogs for products in related domains with similar interaction patterns.
  - **Analogous examples:** Search across unrelated industries (healthcare, gaming, finance, education) for structurally similar problems solved differently.
  - **Visual and emotional references:** Search Savee, Dribbble (filter for shipped/real products), and Apple Design Awards for treatments that evoke the desired tone.
  - Prioritize real, shipped products over concept work or awards pieces with no evidence of production use.
  - For each source, note the URL, product name, and the specific screen or interaction worth studying.
- **Produces:** Raw collection of examples

### Step 3: Curate and categorize findings
- **Reads:** Step 2 raw examples
- **Actions:**
  - Select 8-15 examples that offer meaningfully different approaches.
  - For each example, document: source, what it does well, the design principle it demonstrates, and its relevance to the current challenge.
  - Group examples by theme or design dimension (e.g., "onboarding approaches", "data density handling", "empty state patterns").
  - Include screenshots or detailed descriptions of the specific interaction or screen.
- **Produces:** Populated `Curated Examples` and `Inspiration Themes` sections

### Step 4: Extract patterns and principles
- **Reads:** Step 3 curated examples
- **Actions:**
  - Identify recurring patterns across examples.
  - Note contrasting approaches (e.g., wizard vs. inline setup).
  - Call out surprising or unconventional solutions.
  - Flag patterns that may not transfer well to the current context and why.
- **Produces:** Populated `Pattern Analysis` section

### Step 5: Connect to the design challenge
- **Reads:** Step 1 context, Step 4 patterns
- **Actions:**
  - For each theme, write a brief design implication: what this means for the current work.
  - Highlight which examples best address the specific user needs or constraints.
  - Note gaps: areas where no strong inspiration was found.
- **Produces:** Populated `Design Implications` and `Gaps & Open Questions` sections

### Step 6: Format output
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/inspiration-board-template.md` for the response structure.
  - Lead with a quick-scan summary of themes before the detailed examples.
- **Produces:** Complete inspiration board with all required sections
- **References:** `references/inspiration-board-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Search Context | yes | - | key-value fields: design challenge, domain, interaction type, emotional tone, constraints, search dimensions |
| Inspiration Themes | yes | 2 themes | theme labels with brief description |
| Curated Examples | yes | 8 examples | example cards with source URL, product name, what it does well, design principle, relevance |
| Pattern Analysis | yes | 2 patterns | recurring patterns with contrasting approaches and transferability notes |
| Design Implications | yes | 1 implication | per-theme implications for the current design challenge |
| Gaps & Open Questions | yes | 0 | areas where no strong inspiration was found |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Curated Examples | Fewer than 8 examples are included without justification for the smaller set | blocker |
| QB-02 | Curated Examples | All examples are from the same domain or industry -- at least 2 must be from analogous or cross-industry sources | blocker |
| QB-03 | Curated Examples | Any example is missing a source URL, a description of what it does well, and an explanation of its relevance to the current challenge | blocker |
| QB-04 | Curated Examples | No cross-industry or analogous inspiration is included -- at least 2 examples must come from outside the product's direct domain | blocker |
| QB-05 | Pattern Analysis | Pattern analysis only lists what was found without stating a design implication for the current challenge | warning |
| QB-06 | Curated Examples | Examples are concept work, dribbble shots, or awards pieces with no evidence of real-world production use -- unless explicitly labeled as "concept inspiration" | warning |
| QB-07 | Design Implications | Design implications are generic ("good onboarding is important") instead of specific ("3 of 5 examples use progressive disclosure to reduce initial cognitive load -- consider collapsing advanced settings behind a 'More options' toggle") | warning |
| QB-08 | Curated Examples | Sources are not provided for each example | blocker |

## Reference Navigation

Read only what is needed:
- inspiration output shell: `references/inspiration-board-template.md`

## Trigger Examples

### Positive
Intents: [find_inspiration, browse_examples, explore_patterns, curate_references, benchmark_designs]

- "Find inspiration for our onboarding redesign."
- "Show me how other products handle data-heavy dashboards."
- "What are the best examples of checkout experiences?"
- "I need design references for a collaboration feature."
- "Browse the web for inspiration on empty states."

### Negative
- "Compare our checkout against Shopify, Amazon, and Stripe." -> `$competitive-analyzer`
- "Do a competitive analysis of checkout flows." -> `$competitive-analyzer`
- "Write a design spec for the dashboard." -> `$design-spec-writer`
- "Create personas for our users." -> `$persona-creator`

### Ambiguous
- "What are other products doing?" (clarify: do you want creative design inspiration and pattern examples, or a structured competitive analysis with positioning?)
- "Show me examples." (clarify the specific design challenge or feature area)
