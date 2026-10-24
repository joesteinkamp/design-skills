---
name: design-system-auditor
description: "Audit how a product uses its design system — in Figma, in code, or both: inventory components and tokens, measure adoption, detachment and override rates, find hardcoded values and token drift, spot duplicate or near-duplicate components, check component-level accessibility, and produce a prioritized remediation and contribution plan. Use when requests involve design system audits, component inventories, token adoption, design debt, consistency across products, or deciding what to add to the system — not redlining one build against its design (use design-qa-reviewer), not a full WCAG audit (use accessibility-auditor), not one component's dev spec (use dev-handoff-writer)."

# Discovery & Auto-Selection
category: evaluation
tags: [design-system, components, design-tokens, adoption, design-debt, consistency, audit]
complexity: heavy
output_length: long

# Skill Graph
upstream_skills: [design-qa-reviewer, accessibility-auditor]
downstream_skills: [dev-handoff-writer, roadmap-prioritizer, design-rationale-writer]

# Input Contract
inputs:
  - name: audit_scope
    required: true
    type: text
    description: "Which product(s), files, repos, or screens to audit, and the design system they should use"
  - name: system_source
    required: false
    type: text
    description: "Where the system lives: Figma library link, token files (JSON / CSS variables), component package, or docs site"
  - name: codebase_path
    required: false
    type: text
    description: "Path to the product codebase, for code-side adoption and hardcoded-value scans"

# Output Contract
outputs:
  - name: system_audit
    type: system_audit
    template: references/system-audit-template.md

# Batch Execution
batch:
  enabled: true
  input_key: audit_scope
  parallelizable: true

# Tool Integration
tools:
  - name: figma
    actions: [get_metadata, get_design_context, get_variable_defs]
    when: "Inventorying instances, detachments, overrides, and variable usage in product files"
  - name: filesystem
    actions: [grep, read_file]
    when: "Scanning the codebase for component imports, hardcoded colors/spacing, and one-off components"
  - name: github
    actions: [search_code]
    when: "Scanning repos that aren't checked out locally"
  - name: linear
    actions: [create_issue]
    when: "Filing remediation and contribution tickets"

# User Input Gates
user_inputs:
  - step: 1
    question: "Audit Figma, code, or both?"
    options: [figma, code, both]
    default: both
  - step: 1
    question: "What decision is this audit for?"
    options: [cleanup_backlog, system_roadmap, adoption_report, migration_plan]
    default: cleanup_backlog
  - step: 5
    question: "File remediation tickets in Linear?"
    required: false
    default: false
---

# Design System Auditor

## Overview

Use this skill to see how a design system is actually used, not how it was intended to be used. It measures adoption and drift across design files and code, explains *why* teams leave the system (missing variants, wrong defaults, unclear docs), and turns that into a prioritized plan: fix the product, fix the system, or add to the system.

The output should be quantitative where the data allows and honest where it doesn't: every metric names its source and sample, and every recommendation says whether the product or the system has to change.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Figma** | Walk product files with get_metadata; count library instances vs. detached/local components; read overrides with get_design_context; read variable usage with get_variable_defs | Audit from screenshots and the user's description; mark Figma metrics as estimated |
| **Filesystem** | Grep for system imports vs. local components; find hardcoded hex/rgb colors, px spacing, font sizes, and z-indexes that bypass tokens | Ask for representative files; mark code metrics as sampled |
| **GitHub** | Run the same scans with code search across repos | User shares the relevant files |
| **Linear** | File one ticket per remediation item with owner (product vs. system team) | Output tickets as a list |

## Workflow

### Step 1: Scope and baseline
- **Reads:** audit_scope, system_source
- **Ask user:** "Audit Figma, code, or both?" — Default: both.
- **Ask user:** "What decision is this audit for?" — shapes prioritization.
- **Actions:**
  - List the products, files, and repos in scope and the system version they should use.
  - Inventory the system's components and token categories (color, type, spacing, radius, elevation, motion).
- **Produces:** Populated `Audit Scope` section
- **References:** `references/audit-checklist.md`

### Step 2: Measure adoption
- **Reads:** Step 1, product files, codebase_path
- **Actions:**
  - **Figma:** per file, library instances vs. detached instances vs. local look-alikes; most common overrides per component.
  - **Code:** system component imports vs. local re-implementations; hardcoded values that should be tokens (grep for `#[0-9a-f]{3,8}`, `rgb(`, raw `px` in spacing/size props, literal font sizes).
  - Compute adoption rate per product and per component; note the sample (files, screens, or directories scanned).
- **Tool action — Figma/Filesystem/GitHub (as available):** run the scans described in `references/audit-checklist.md`.
- **Produces:** Populated `Adoption Metrics` section

### Step 3: Diagnose drift
- **Reads:** Step 2
- **Actions:**
  - Group drift into causes: missing component, missing variant/prop, wrong default, token gap, unclear docs, legacy code not yet migrated, deliberate exception.
  - Find duplicates and near-duplicates (three slightly different "card" components) and propose which to keep.
  - Spot-check system components for accessibility: focus states, contrast of default tokens, target size, name/role/value.
- **Produces:** Populated `Drift Findings` and `Component Health` sections

### Step 4: Prioritize
- **Reads:** Steps 2–3, decision from Step 1
- **Actions:**
  - For each finding, decide the fix owner: **product** (adopt the existing system piece), **system** (fix or extend the component/token), or **accept** (documented exception).
  - Score by reach (instances affected) × user impact × effort; rank.
  - Write contribution proposals for gaps that justify a new component or variant: the need, evidence (where it was re-implemented), proposed API, and states.
- **Produces:** Populated `Remediation Plan` and `Contribution Proposals` sections

### Step 5: Format and hand off
- **Reads:** All previous step outputs
- **Ask user:** "File remediation tickets in Linear?" — Default: no.
- **Actions:**
  - Fill `references/system-audit-template.md`; lead with the executive summary.
- **Tool action — Linear (if available and user confirms):** one ticket per remediation item, labeled product or system.
- **Next steps:** Based on output, suggest:
  - "To spec a proposed component for engineering, use `$dev-handoff-writer`."
  - "To sequence the remediation backlog, use `$roadmap-prioritizer`."
  - "To record a keep/merge/deprecate decision, use `$design-rationale-writer`."
- **Produces:** Complete audit
- **References:** `references/system-audit-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Executive Summary | yes | - | 3–5 sentences: overall adoption, biggest drift cause, top 3 actions |
| Audit Scope | yes | - | key-value fields: products, files/repos, system version, sources, sample, decision |
| Adoption Metrics | yes | 1 table | per product and per component: adoption %, detached/local count, hardcoded-value count, with source and sample |
| Drift Findings | yes | 3 findings | finding cards: what, where, instances, cause category, evidence |
| Component Health | yes | 1 component | per audited system component: variant gaps, a11y spot-check, doc quality |
| Remediation Plan | yes | 3 items | ranked table: item, owner (product/system/accept), reach, impact, effort |
| Contribution Proposals | no | - | need, evidence, proposed API/variants, states |
| Method & Limitations | yes | 1 item | how metrics were collected; what was sampled or estimated |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Adoption Metrics | Every metric names its source (Figma, code scan, screenshot estimate) and sample size | blocker |
| QB-02 | Drift Findings | Every finding has a cause category, not just "inconsistent" | blocker |
| QB-03 | Remediation Plan | Every item names a fix owner: product, system, or accepted exception | blocker |
| QB-04 | Contribution Proposals | Each proposal cites at least two places the pattern was re-implemented | blocker |
| QB-05 | Component Health | Accessibility is spot-checked for at least focus state and contrast of default tokens | warning |
| QB-06 | Drift Findings | Duplicates name which version to keep and why | warning |
| QB-07 | Method & Limitations | Estimated or sampled metrics are labeled as such wherever they appear | blocker |

## Reference Navigation

Read only what is needed:
- scan patterns and health checks: `references/audit-checklist.md`
- output shell: `references/system-audit-template.md`

## Trigger Examples

### Positive
Intents: [audit_design_system, measure_adoption, find_design_debt, plan_system_contributions]

- "Audit how our three apps use the design system and where they drift."
- "How many hardcoded colors are in this repo, and which tokens should replace them?"
- "Which components do teams keep detaching in Figma, and why?"

### Negative
- "Compare this build to the Figma file and list the visual bugs." -> `$design-qa-reviewer`
- "Run a WCAG 2.2 AA audit of checkout." -> `$accessibility-auditor`
- "Write the dev spec for the new Tabs component." -> `$dev-handoff-writer`

### Ambiguous
- "Is our UI consistent?" (clarify: system adoption audit, or a critique of one flow via `$design-critique`?)
- "Help us clean up the design system." (clarify: audit usage in products, or restructure the library itself?)
