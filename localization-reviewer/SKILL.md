---
name: localization-reviewer
description: "Review a design, spec, or built UI for internationalization and localization readiness: text expansion and truncation, hardcoded and concatenated strings, plural and gender handling (ICU MessageFormat), date, time, number, currency, address, and name formats, right-to-left mirroring, font and script coverage, and culturally loaded imagery, color, and icons — with a pseudo-localization test plan and severity-ranked fixes. Use when requests involve i18n, l10n, localization, translation readiness, launching in new markets or languages, RTL support, or global readiness — not writing the source-language copy (use ux-copy-writer), not a WCAG audit (use accessibility-auditor)."

# Discovery & Auto-Selection
category: evaluation
tags: [localization, internationalization, i18n, l10n, rtl, translation, global-readiness, icu]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [ux-copy-writer, design-spec-writer, dev-handoff-writer]
downstream_skills: [dev-handoff-writer, design-qa-reviewer, ux-copy-writer]

# Input Contract
inputs:
  - name: ui_artifact
    required: true
    type: text
    description: "Designs, screenshots, spec, string files, or a URL/codebase to review"
  - name: target_locales
    required: false
    type: text
    description: "Languages and markets planned (e.g., de-DE, ja-JP, ar-SA, pt-BR)"
  - name: copy_set
    required: false
    type: ux_copy
    source_skill: ux-copy-writer
    description: "Source strings with context, from ux-copy-writer"

# Output Contract
outputs:
  - name: localization_review
    type: localization_review
    template: references/localization-review-template.md

# Batch Execution
batch:
  enabled: true
  input_key: ui_artifact
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_screenshot, get_design_context]
    when: "Inspecting text containers, auto-layout, fixed widths, and icon direction"
  - name: filesystem
    actions: [grep, read_file]
    when: "Scanning code for hardcoded strings, concatenation, and locale-unaware formatting"
  - name: chrome
    actions: [navigate, take_screenshot]
    when: "Checking a live build with pseudo-localized or RTL settings"
  - name: linear
    actions: [create_issue]
    when: "Filing fixes"

# User Input Gates
user_inputs:
  - step: 1
    question: "Which locales are planned, and is any right-to-left?"
    required: false
  - step: 1
    question: "Reviewing designs, code, or a live build?"
    options: [designs, code, live_build, mixed]
    default: designs
  - step: 4
    question: "File fixes in Linear?"
    required: false
    default: false
---

# Localization Reviewer

## Overview

Use this skill before a product is translated or launched in new markets, ideally while it is still in design. Most localization bugs are designed in: fixed-width buttons that can't fit German, sentences assembled from fragments that can't be reordered for Japanese, dates written as 03/04, icons that point the wrong way in Arabic.

The output should find issues that will actually break in the planned locales, explain why each breaks with a concrete example, and give a fix that designers or engineers can apply without a localization specialist.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Check fixed-width text layers, auto-layout behavior, truncation settings, and directional icons | Review from screenshots; mark layout findings as visual estimates |
| **Filesystem** | Grep for hardcoded UI strings, string concatenation, and `toLocaleString`-free date/number formatting | Review shared snippets or string files only |
| **Chrome** | Load the build with pseudo-localization or `dir="rtl"` and screenshot breakage | Describe the test for the team to run |
| **Linear** | File one ticket per fix with locale and severity | Output fixes as a list |

## Workflow

### Step 1: Scope locales and artifact
- **Reads:** ui_artifact, target_locales
- **Ask user:** "Which locales are planned, and is any right-to-left?" — Default: assume a broad set (de, fr, ja, zh, ar, pt-BR) and say so.
- **Ask user:** "Reviewing designs, code, or a live build?" — Default: designs.
- **Actions:**
  - List the screens, components, or files in scope.
  - Note the riskiest locale traits: longest expansion (de, fi, ru), CJK line breaking (ja, zh), RTL (ar, he), complex plurals (ru, pl, ar), non-Latin scripts.
- **Produces:** Populated `Scope` section
- **References:** `references/i18n-checklist.md`

### Step 2: Review text and layout
- **Reads:** Step 1, ui_artifact, copy_set
- **Actions:**
  - Find fixed-width containers, single-line buttons and tabs, and truncation without tooltips; estimate fit at +35% (short strings up to +300%).
  - Find text baked into images, icons that carry words, and strings assembled from fragments.
  - Check plurals, gender, and counts use ICU MessageFormat or equivalent, not `n + " items"`.
  - Check fonts cover target scripts and that line height suits CJK and Arabic.
- **Tool action — Figma/Filesystem (as available):** inspect text layers and grep code per the checklist.
- **Produces:** Text & layout findings in `Findings`

### Step 3: Review formats, direction, and culture
- **Reads:** Step 1, ui_artifact
- **Actions:**
  - Dates, times, numbers, currency, units, phone numbers, addresses, and names: locale-aware formatting and input (no forced first/last name, no US-only address or ZIP validation).
  - RTL: layout mirroring, directional icons (back arrows, progress) mirror while non-directional ones (play, clock, logos) don't; bidirectional text with numbers and Latin names.
  - Culture: imagery, gestures, color meanings, flags used for languages, humor and idioms in copy, and legally required locale content.
- **Tool action — Chrome (if available and a build exists):** test with pseudo-localization and `dir="rtl"`; capture screenshots.
- **Produces:** Format, direction, and culture findings in `Findings`

### Step 4: Prioritize and plan testing
- **Reads:** Steps 2–3
- **Ask user:** "File fixes in Linear?" — Default: no.
- **Actions:**
  - Rate each finding: **blocker** (breaks or misleads in a planned locale), **major** (degrades noticeably), **minor** (polish).
  - Give each a concrete fix and an example in an affected locale.
  - Write a pseudo-localization test plan: accented/expanded strings, bracketed markers to catch hardcoded text, RTL pass, and which screens to check.
- **Tool action — Linear (if available and user confirms):** file one ticket per blocker and major finding.
- **Next steps:** Based on output, suggest:
  - "To rewrite strings so they translate cleanly, use `$ux-copy-writer`."
  - "To hand i18n requirements to engineering, use `$dev-handoff-writer`."
  - "To verify fixes in the build, use `$design-qa-reviewer`."
- **Produces:** Populated `Pseudo-Localization Test Plan` section; complete review
- **References:** `references/localization-review-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Summary | yes | - | 2–3 sentences: readiness, top risks, count by severity |
| Scope | yes | - | key-value fields: artifact, screens/files, target locales (stated or assumed), RTL in scope |
| Findings | yes | 3 findings | finding cards: ID, category, location, issue, affected locales, example, severity, fix |
| Pseudo-Localization Test Plan | yes | - | pseudo-locale settings, RTL pass, screens to check, pass criteria |
| Engineering Requirements | yes | 2 items | i18n requirements for the build (string externalization, ICU, Intl APIs, logical CSS properties) |
| Open Questions | no | - | locale or market decisions needed |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Findings | Every finding names the locales it affects and gives a concrete example (e.g., the German string that overflows) | blocker |
| QB-02 | Findings | Every finding has a specific fix, not "consider localization" | blocker |
| QB-03 | Findings | Severity reflects the planned locales: an RTL issue is a blocker only if an RTL locale is in scope | blocker |
| QB-04 | Findings | Plurals and concatenation are checked wherever counts or dynamic values appear | blocker |
| QB-05 | Findings | Date, number, and currency formats are reviewed | warning |
| QB-06 | Scope | Locales assumed rather than stated are labeled as assumed | warning |
| QB-07 | Engineering Requirements | Requirements name concrete mechanisms (ICU MessageFormat, `Intl.DateTimeFormat`, CSS logical properties) | warning |

## Reference Navigation

Read only what is needed:
- checks by category, expansion rates, RTL rules: `references/i18n-checklist.md`
- output shell: `references/localization-review-template.md`

## Trigger Examples

### Positive
Intents: [review_localization, check_i18n_readiness, prepare_for_translation, review_rtl]

- "We're launching in Germany, Japan, and Saudi Arabia — is this checkout ready?"
- "Review these designs for localization issues before we send strings to translators."
- "Check our React app for hardcoded strings and RTL problems."

### Negative
- "Write the error messages for the signup form." -> `$ux-copy-writer`
- "Audit checkout for WCAG 2.2 AA." -> `$accessibility-auditor`
- "Compare the build to the Figma file." -> `$design-qa-reviewer`

### Ambiguous
- "Make this work internationally." (clarify: review readiness, or rewrite the copy for translation?)
- "Translate this screen into Spanish." (this skill reviews readiness; translation itself needs a translator or translation tool — offer to review the screen first)
