---
name: competitive-analyzer
description: "Produce structured competitive and comparative analyses of products, features, or design patterns. Use when requests involve competitive analysis, competitor benchmarking, market comparison, or identifying design differentiation opportunities."

# Discovery & Auto-Selection
category: evaluation
tags: [competitive-analysis, benchmarking, market-comparison, differentiation]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: []
downstream_skills: []

# Input Contract
inputs:
  - name: focal_product
    required: true
    type: text
    description: "Product or feature to analyze competitively"
  - name: competitor_set
    required: false
    type: text
    description: "List of competitors to include in analysis"

# Output Contract
outputs:
  - name: competitive_analysis
    type: competitive_analysis
    template: references/competitive-analysis-template.md

# Batch Execution
batch:
  enabled: true
  input_key: focal_product
  parallelizable: true

# Tool Integration
tools:
  - name: web_chrome
    actions: [fetch_page, take_screenshot]
    when: "Fetching competitor sites, capturing screenshots, and extracting pricing"
  - name: google_sheets
    actions: [create_spreadsheet, export_data]
    when: "Creating comparison matrix spreadsheet"
  - name: notion
    actions: [publish_analysis]
    when: "Publishing analysis as a Notion page"
  - name: productboard
    actions: [push_insight]
    when: "Pushing opportunity gaps as insights to Productboard"

# User Input Gates
user_inputs:
  - step: 1
    question: "Confirm competitor set. Any to add/remove?"
    required: true
  - step: 1
    question: "Competitor URLs?"
    required: false
  - step: 1
    question: "Priority dimensions?"
    required: false
    options: [features, ux, pricing, platform]
    default: features
  - step: 4
    question: "Push gaps to Productboard?"
    required: false
    default: false
---

# Competitive Analyzer

## Overview

Use this skill to produce structured competitive analyses that inform design decisions. Accepts a focal product or feature plus a competitor set and produces comparison matrices, competitor profiles, and design-focused opportunity maps.

The output should be actionable for designers: not just what competitors do, but what it means for your design strategy. Output is formatted for use in Notion, Google Sheets, Airtable, or as a FigJam board. When the target tool is specified, adapt the comparison matrix and profile format accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Web / Chrome** | Fetch competitor sites, capture screenshots, extract pricing and feature information | Rely on descriptions and public knowledge; flag unverified claims |
| **Google Sheets** | Create comparison matrix spreadsheet for sharing and collaboration | Output comparison matrix as markdown table; user creates spreadsheet manually |
| **Notion** | Publish competitive analysis as a Notion page for team reference | Output as markdown; user pastes into Notion |
| **Productboard** | Push opportunity gaps and differentiation insights to Productboard | Include opportunity gaps in output; user adds to Productboard manually |

## Workflow

### Step 1: Define scope
- **Reads:** focal_product, competitor_set (if provided)
- **Ask user:** "Confirm competitor set. Any to add/remove?" — validates the analysis scope.
- **Ask user:** "Competitor URLs?" — enables auto-capture of screenshots and feature data.
- **Ask user:** "Priority dimensions?" — options: features, UX, pricing, platform. Default: features.
- **Actions:**
  - Identify the focal product or feature.
  - List competitors to analyze (3-5 recommended).
  - Select evaluation dimensions: UX quality, feature coverage, onboarding, information architecture, accessibility, pricing, visual design, content strategy.
  - Weight dimensions by relevance to the analysis goal.
- **If** URLs provided → plan auto-fetch, screenshot, and analysis of competitor sites.
- **Tool action — Web/Chrome (if available and URLs provided):**
  - Fetch competitor site pages for feature and UX analysis.
  - Capture screenshots of key screens (homepage, onboarding, core feature, pricing).
  - Extract pricing tiers and feature lists where publicly available.
- **If** no URLs provided → rely on descriptions and public knowledge; flag unverified claims.
- **If** <3 competitors → justify the smaller set with rationale (niche market, emerging category, etc.).
- **Produces:** Populated `Analysis Scope` section

### Step 2: Build evaluation framework
- **Reads:** Step 1 scope
- **Actions:**
  - Define rating scale per dimension (strong/adequate/weak).
  - Select criteria that produce meaningful differentiation, not checkbox comparisons.
  - Include both functional and experiential dimensions.
- **Checkpoint:** "Evaluating [N] competitors across [dimensions]. Does this framework cover what you need?"
- **Produces:** Evaluation framework for use in Step 3

### Step 3: Analyze competitors
- **Reads:** Step 1 scope, Step 2 framework
- **Actions:**
  - Profile each competitor using `references/competitor-profile-template.md`.
  - Document strengths, weaknesses, and notable patterns.
  - Rate each competitor on every dimension.
  - Note evidence for each rating.
- **If** URLs provided and Web/Chrome available → cross-reference auto-captured data with analysis.
- **If** no URLs → document analysis based on available information; flag evidence gaps.
- **Produces:** Populated `Competitor Profiles` section
- **References:** `references/competitor-profile-template.md`

### Step 4: Synthesize findings
- **Reads:** Step 3 competitor profiles
- **Ask user:** "Push gaps to Productboard?" — Default: include gaps in output only.
- **Actions:**
  - Build comparison matrix across all competitors and dimensions.
  - Identify table-stakes features (everyone has them, you must too).
  - Identify differentiation opportunities (gaps no one fills well).
  - Flag anti-patterns seen across competitors.
- **Tool action — Google Sheets (if available):**
  - Create comparison matrix spreadsheet with competitors as columns and dimensions as rows.
  - Include rating, evidence, and notes per cell.
- **Tool action — Productboard (if available and user confirms):**
  - Push opportunity gaps as insights to Productboard with evidence from the analysis.
  - Link insights to relevant features or initiatives.
- **If** no publishing tools available → output comparison matrix as markdown table.
- **Produces:** Populated `Comparison Matrix` and `Opportunity Map` sections

### Step 5: Format and publish
- **Reads:** All previous step outputs
- **Actions:**
  - Use `references/competitive-analysis-template.md` for the response structure.
  - Lead with the comparison matrix for quick scanning.
  - End with prioritized design recommendations.
- **Tool action — Notion (if available):**
  - Publish competitive analysis as a Notion page for team reference.
- **Next steps:** Based on output, suggest:
  - "Use `$design-spec-writer` to spec out features addressing the differentiation opportunities."
  - "Use `$inspiration-browser` to explore design patterns from the strongest competitors."
  - "If gaps were pushed to Productboard, use them to inform roadmap prioritization."
- **Produces:** Complete analysis with all required sections including `Design Recommendations`
- **References:** `references/competitive-analysis-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Analysis Scope | yes | - | key-value fields: focal product, competitors, evaluation dimensions, dimension weights |
| Comparison Matrix | yes | 4 dimensions | matrix with competitors as columns, dimensions as rows, strong/adequate/weak ratings |
| Competitor Profiles | yes | 3 profiles | per-competitor cards with strengths, weaknesses, notable patterns, and evidence |
| Opportunity Map | yes | 1 per category | table-stakes, differentiation opportunities, and anti-patterns with user-problem explanations |
| Design Recommendations | yes | 1 recommendation | priority-ranked recommendations (must-do / should-do / could-do) grounded in analysis gaps |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Competitor Profiles | Every rating (strong / adequate / weak) has a 1-2 sentence evidence justification | blocker |
| QB-02 | Comparison Matrix | Analysis evaluates experiential quality, not just feature presence/absence | blocker |
| QB-03 | Opportunity Map | Distinguishes between table-stakes (must-have), differentiation (where to win), and anti-patterns (what to avoid) | blocker |
| QB-04 | Competitor Profiles | At least 3 competitors are analyzed, or explicit justification is given for a smaller set | warning |
| QB-05 | Opportunity Map | Anti-patterns explain the specific user problem they create, not just "avoid this" | blocker |
| QB-06 | Design Recommendations | Recommendations are grounded in specific gaps found in the analysis, not generic advice | blocker |
| QB-07 | Comparison Matrix | At least 4 evaluation dimensions are used | warning |
| QB-08 | Design Recommendations | Recommendations include priority ratings (must-do / should-do / could-do) | warning |

## Reference Navigation

Read only what is needed:
- analysis output shell: `references/competitive-analysis-template.md`
- per-competitor detail template: `references/competitor-profile-template.md`

## Trigger Examples

### Positive
Intents: [analyze_competitors, benchmark_product, compare_features, identify_differentiation, map_market]

- "Compare our onboarding flow against Figma, Miro, and Canva."
- "Do a competitive analysis of checkout experiences in e-commerce."
- "What design patterns are our competitors using for their dashboards?"

### Negative
- "Find inspiration for our onboarding redesign." -> `$inspiration-browser`
- "Show me how other products handle dashboards." -> `$inspiration-browser`
- "Write a design spec for our dashboard." -> `$design-spec-writer`
- "Audit this page for accessibility." -> `$accessibility-auditor`

### Ambiguous
- "How does our product compare?" (clarify which feature/area to focus on and which competitors to include)
- "What are other products doing?" (clarify: do you want a structured competitive analysis with positioning, or creative design inspiration and pattern examples?)
