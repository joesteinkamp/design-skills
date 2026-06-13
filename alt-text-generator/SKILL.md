---
name: alt-text-generator
description: "Generate accessible alternative text and ARIA labels for images, icons, charts, and decorative elements at scale -- classifying decorative vs informative vs functional and writing long descriptions for complex visuals. Use when requests involve writing alt text, ARIA labels, or screen-reader descriptions for assets; not a full WCAG audit (-> $accessibility-auditor), not UI microcopy (-> $ux-copy-writer), not component handoff (-> $dev-handoff-writer)."

# Discovery & Auto-Selection
category: documentation
tags: [accessibility, alt-text, aria, a11y, images, screen-reader]
complexity: light
output_length: medium

# Skill Graph
upstream_skills: [accessibility-auditor, dev-handoff-writer]
downstream_skills: [dev-handoff-writer]

# Input Contract
inputs:
  - name: images
    required: true
    type: text
    description: "Screenshots, exports, or descriptions of the image assets, ideally with surrounding context"
  - name: page_context
    required: false
    type: text
    description: "Purpose of the page and the surrounding content the images sit within"
  - name: image_purpose
    required: false
    type: text
    description: "Whether assets are decorative, informative, or functional, if already known"

# Output Contract
outputs:
  - name: alt_text_set
    type: alt_text_set
    template: references/alt-text-template.md
  - name: alt_text_handoff
    type: alt_text_handoff
    optional: true
    target_skill: dev-handoff-writer
    schema: references/alt-text-handoff-schema.md

# Batch Execution
batch:
  enabled: true
  input_key: images
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_image_fills, read_layer_names]
    when: "Pulling image exports and layer names to identify and describe assets"
  - name: chrome
    actions: [inspect_img_elements]
    when: "Reading existing <img> alt and aria attributes on a live page"
  - name: github
    actions: [create_issue]
    when: "Filing a11y remediation tickets for missing or wrong alt text"
  - name: linear
    actions: [create_issue]
    when: "Filing a11y remediation tickets for missing or wrong alt text"

# User Input Gates
user_inputs:
  - step: 1
    question: "Are these images decorative, informative, or functional (e.g., icon buttons)?"
    required: true
    options: [decorative, informative, functional, mixed]
  - step: 1
    question: "Any complex visuals (charts, diagrams) that need long descriptions?"
    required: false
  - step: 1
    question: "Target locale?"
    required: false
---

# Alt Text Generator

## Overview

Use this skill to generate accessible alternative text and ARIA labels for images, icons, charts, diagrams, and decorative elements at scale. Accepts screenshots, exports, or descriptions of assets (often surfaced by an `$accessibility-auditor` finding or bundled into a `$dev-handoff-writer` package) and produces a classified, screen-reader-ready alt text set. Output is formatted for direct use in HTML `alt`/`aria-label` attributes, design specs, or remediation tickets.

The output should be correct by classification: decorative assets get empty alt, informative assets convey meaning concisely, functional assets describe the action, and complex visuals get both a short alt and a longer data description. Every asset is given an explicit classification so nothing is left ambiguous for engineering.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Pull image fills/exports and read layer names via get_image_fills and read_layer_names to identify and describe assets | User provides screenshots or descriptions of each asset manually |
| **Chrome** | Read existing `<img>` alt and `aria-label` attributes on a live page via inspect_img_elements to find missing or wrong alt | User pastes current alt values or marks them as unknown |
| **GitHub / GitLab** | Create a11y remediation issues for missing or incorrect alt text with the proposed value | Output remediation list as a markdown checklist; user files tickets manually |
| **Linear** | Create a11y remediation tickets for missing or incorrect alt text with the proposed value | Output remediation list as a markdown checklist; user creates tickets manually |

## Workflow

### Step 1: Intake and classify each asset
- **Reads:** images, page_context (if provided), image_purpose (if provided)
- **Ask user:** "Are these images decorative, informative, or functional (e.g., icon buttons)?" — sets the classification basis. Default: classify per asset from context.
- **Ask user:** "Any complex visuals (charts, diagrams) that need long descriptions?" — flags assets needing a long description.
- **Ask user:** "Target locale?" — determines language and locale conventions for the alt text.
- **Actions:**
  - Inventory each asset and assign one classification: decorative, informative, or functional.
  - Decorative: adds no information (background flourishes, dividers) — gets empty alt.
  - Informative: conveys content or meaning the surrounding text does not.
  - Functional: a button, link, or control rendered as an image — describes the action.
  - Note which assets are complex visuals (charts, diagrams, maps) requiring long descriptions.
- **If** image_purpose provided → use it as the starting classification and confirm against context.
- **Tool action — Figma (if available):**
  - Pull image fills and exports via get_image_fills.
  - Read layer names via read_layer_names to infer intent for each asset.
- **Tool action — Chrome (if available and live URL provided):**
  - Inspect existing `<img>` alt and `aria-label` attributes via inspect_img_elements to flag missing or wrong values.
- **If** neither Figma nor Chrome → rely on provided screenshots or descriptions; flag assets that cannot be classified as open questions.
- **Checkpoint:** "Here is the classification for each asset. Anything mislabeled before I write the alt text?"
- **Produces:** Populated `Asset Context` section

### Step 2: Generate alt text per class
- **Reads:** Step 1 classification
- **Actions:**
  - Decorative → set `alt=""` and record it in `Decorative Elements`.
  - Informative → write concise alt (<= ~125 characters) conveying meaning, not appearance.
  - Functional → describe the action (e.g., "Search", "Close dialog"), not the picture.
  - Omit redundant phrases like "image of", "picture of", "graphic of".
  - Respect the target locale for language and conventions when specified.
- **Produces:** Populated `Alt Text Set` section
- **References:** `references/alt-text-template.md`

### Step 3: Write long descriptions for complex visuals
- **Reads:** Step 1 complex-visual flags, Step 2 short alt
- **Actions:**
  - For each chart/diagram, pair the short alt with a longer description of the data and trend.
  - Describe the data relationships and takeaway, not the chart styling.
  - Note where the long description should live (adjacent text, `aria-describedby`, or details/figure caption).
- **If** no complex visuals → skip this section and note "None" in the output.
- **Produces:** Populated `Long Descriptions` section

### Step 4: QA against rules
- **Reads:** Steps 2-3 output
- **Actions:**
  - Verify every asset has an explicit classification.
  - Confirm decorative assets use empty alt and are flagged as such.
  - Check informative alt is within the length budget and meaning-based.
  - Check functional alt describes the action, not the image.
  - Confirm complex visuals have both short alt and long description.
  - Scan for and strip redundant prefixes ("image of", "picture of").
- **Checkpoint:** "Here is the QA pass. Any assets you want reworded or reclassified?"
- **Produces:** Validated `Alt Text Set`, `Long Descriptions`, and `Decorative Elements` sections

### Step 5: Format and optional ticketing
- **Reads:** All previous step outputs
- **Actions:**
  - Assemble sections using `references/alt-text-template.md`.
  - Include `references/alt-text-handoff-schema.md` block when output feeds `$dev-handoff-writer`.
  - Log unresolved assets in `Open Questions`.
- **Tool action — GitHub/GitLab or Linear (if available):**
  - Create a11y remediation issues/tickets for assets with missing or wrong alt, including the proposed value.
- **If** no ticketing tools available → output remediation items as a markdown checklist.
- **Next steps:** Based on output, suggest:
  - "Use `$dev-handoff-writer` to embed these alt and aria values into the engineering handoff."
  - "If a broader compliance check is needed, run `$accessibility-auditor` on the screens."
- **Produces:** Complete alt text set with all required sections including optional `Alt Text Handoff`
- **References:** `references/alt-text-template.md`, `references/alt-text-handoff-schema.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Asset Context | yes | - | key-value fields: source, page context, target locale, asset count |
| Alt Text Set | yes | 1 asset | table: asset / classification / alt text / char count / notes |
| Long Descriptions | yes | 0 | long-description blocks per complex visual with placement note ("None" if no complex visuals) |
| Decorative Elements | yes | 0 | list of decorative assets, each with `alt=""` and reason |
| Open Questions | yes | 0 | question cards for unclassified or ambiguous assets |
| Alt Text Handoff | no | - | handoff schema block per `references/alt-text-handoff-schema.md` |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Alt Text Set | Every asset has an explicit classification (decorative, informative, or functional) | blocker |
| QB-02 | Decorative Elements | Decorative assets are given empty alt (`alt=""`) and are flagged as decorative | blocker |
| QB-03 | Alt Text Set | Informative alt text is <= ~125 characters and conveys content/meaning, not appearance | blocker |
| QB-04 | Alt Text Set | Functional assets (icon buttons, image links) describe the action, not the picture | blocker |
| QB-05 | Long Descriptions | Complex visuals (charts, diagrams) have both a short alt and a longer description of the data/trend | blocker |
| QB-06 | Alt Text Set | Alt text is free of redundant prefixes such as "image of", "picture of", or "graphic of" | warning |
| QB-07 | Asset Context | When a target locale is specified, alt text is written in that locale's language and conventions | warning |

## Reference Navigation

Read only what is needed:
- alt text output shell: `references/alt-text-template.md`
- downstream handoff contract: `references/alt-text-handoff-schema.md`

## Trigger Examples

### Positive
Intents: [write_alt_text, generate_aria_labels, describe_image, describe_chart, classify_image_assets]

- "Write alt text for these 12 marketing images."
- "Generate ARIA labels for our icon buttons."
- "Describe this chart for a screen reader."

### Negative
- "Audit this design for WCAG AA compliance." -> `$accessibility-auditor`
- "Write the button labels and error messages for this form." -> `$ux-copy-writer`
- "Create a dev handoff doc for these components." -> `$dev-handoff-writer`

### Ambiguous
- "Make these images accessible." (clarify: alt text for the assets, or a full accessibility audit of the screens?)
- "Fix the labels on this page." (clarify: alt text/ARIA for images, or UI microcopy like buttons and errors?)
