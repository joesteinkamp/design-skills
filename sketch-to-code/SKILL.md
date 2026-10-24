---
name: sketch-to-code
description: "Convert a hand-drawn UI wireframe sketch (photo, scan, whiteboard, iPad drawing, or low-fi screenshot) into a self-contained HTML preview and a Next.js React component built with shadcn/ui and Tailwind CSS v4, and refine a previous render from an annotated screenshot. Use when the user supplies a sketch or wireframe image and asks to turn it into a webpage, React component, HTML preview, or shadcn/ui code — not a multi-screen clickable prototype from specs or flows (use prototype-builder), not a Figma import, not a design critique."

# Discovery & Auto-Selection
category: prototyping
tags: [sketch, wireframe, code-generation, shadcn, tailwind, react, vision, prototyping]
complexity: moderate
output_length: medium

# Skill Graph
upstream_skills: [workshop-planner, ideation-facilitator]
downstream_skills: [prototype-builder, design-critique, accessibility-auditor]

# Input Contract
inputs:
  - name: sketch_image
    required: true
    type: image
    description: "Path to the sketch or wireframe image (or an annotated screenshot of a previous render, for refinement)"
  - name: screen_name
    required: false
    type: text
    description: "What the screen is (e.g., 'login screen'); used for file names and labeling"
  - name: pin_notes
    required: false
    type: text
    description: "Refinement only: typed 'Pin N: <instruction>' lines matching numbered pins drawn on the screenshot"

# Output Contract
outputs:
  - name: sketch_build
    type: sketch_build
    template: references/sketch-build-template.md

# Batch Execution
batch:
  enabled: true
  input_key: sketch_image
  parallelizable: true

# Tool Integration
tools:
  - name: filesystem
    actions: [read_image, write_file]
    when: "Reading the sketch and the project's design tokens; writing the preview and component files"
  - name: figma
    actions: [get_variable_defs]
    when: "Pulling design tokens when the project's system lives in Figma instead of code"

# User Input Gates
user_inputs:
  - step: 1
    question: "Is this a new sketch or refinement of a previous render?"
    options: [new_sketch, refinement]
    default: new_sketch
  - step: 1
    question: "Target stack?"
    options: [nextjs_shadcn, html_only]
    default: nextjs_shadcn
---

# Sketch to Code

## Overview

Use this skill to turn a hand-drawn wireframe into working UI code: a self-contained HTML preview anyone can open in a browser, and a Next.js React component built from shadcn/ui and Tailwind CSS v4. It also handles targeted refinement: the user marks up a screenshot of the last render (circles, arrows, X marks, numbered pins) and the skill applies only those changes.

The output should be faithful to the sketch's structure, honest about interpretation (every guess is listed as an assumption), and consistent with the project's existing design tokens when they exist. Sketches are interpreted into the closest catalog component, not traced pixel-for-pixel.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Filesystem** | Read the sketch image and project tokens (`DESIGN.md`, `app/globals.css`, `components/ui/`); write the preview and component files | Return both files as fenced code blocks in the output; user saves them |
| **Figma** | Pull color, type, and radius variables with get_variable_defs when the design system lives in Figma | Use project CSS variables if present, else shadcn defaults; note which in Assumptions |

## Workflow

### Step 1: Read the sketch and set the mode
- **Reads:** sketch_image, screen_name, pin_notes
- **Ask user:** "Is this a new sketch or refinement of a previous render?" — Default: new sketch (refinement if pin notes or an existing component are referenced).
- **Ask user:** "Target stack?" — options: Next.js + shadcn, HTML only. Default: Next.js + shadcn.
- **Actions:**
  - View the image. If several images are provided, treat each as a separate screen unless told otherwise.
  - List every drawn element top-to-bottom, left-to-right, with any handwritten text.
  - Name the screen from `screen_name` or the prompt (e.g., "login screen" → `login`); fall back to `sketch`.
- **If** no image is available → ask for a path or attachment and stop.
- **If** refinement → skip to Step 5.
- **Produces:** Element inventory for Step 2

### Step 2: Map elements to components
- **Reads:** Step 1 inventory, `references/component-catalog.json`
- **Actions:**
  - Match each element to the catalog entry whose `sketchPattern` fits best (rounded rect with text → Button, rect with chevron → Select).
  - Treat a component name the user wrote inside a box as authoritative.
  - Translate layout: horizontal alignment → flex row, vertical stacking → flex column, repeated rows × columns → grid; map gaps to the Tailwind spacing scale.
  - Treat connector lines as navigation/flow, not visuals.
  - Record every ambiguous call as an assumption.
- **Produces:** Populated `Component Mapping` section
- **References:** `references/component-catalog.json`, `references/system-prompt.md`

### Step 3: Apply the project's design system
- **Reads:** project files
- **Actions:**
  - Look for `DESIGN.md`, `design-system.md`, `app/globals.css` / `styles/globals.css`, `tailwind.config.{js,ts}`, and `components/ui/`.
  - If found, apply their tokens (color, type, radius, spacing) over shadcn defaults; keep the shadcn component structure.
  - Detect the Tailwind major version: `@import "tailwindcss"` in CSS → v4 (default); `tailwind.config` with `theme.extend` and no v4 import → v3, follow the project.
  - Never invent a design system.
- **Tool action — Figma (if tokens live in Figma and a file is linked):** pull variables with get_variable_defs.
- **Produces:** Token source recorded in `Generation Summary`

### Step 4: Generate the files
- **Reads:** Steps 2–3, `references/preview-template.html`, `references/system-prompt.md`
- **Actions:**
  - **HTML preview:** start from `references/preview-template.html` verbatim (pinned Tailwind v4 browser build, shadcn tokens, `@theme inline` mapping) and replace `{{CONTENT}}`. Use the same token utilities as the React code so the two match.
  - **React component:** one `.tsx` file, `"use client"` only if it uses hooks or handlers, shadcn imports from `@/components/ui/<kebab-name>`, default export, typed props, Tailwind classes only.
  - Give every input a visible label and every icon-only button an `aria-label`.
  - Write files: Next.js app → `app/(sketch)/<name>/page.tsx` and `public/sketch-preview-<name>.html`; plain web project → `<name>.html`; otherwise `sketch-output/<name>.{html,tsx}`.
- **If** HTML only → skip the React component.
- **If** shadcn is not installed → list the needed `npx shadcn@latest add …` command; do not run it without permission.
- **Produces:** Populated `Files` section; continue to Step 6
- **References:** `references/preview-template.html`, `references/system-prompt.md`

### Step 5: Refine from annotations (refinement mode only)
- **Reads:** annotated image, existing component and preview, pin_notes, `references/refinement-prompt.md`
- **Actions:**
  - Interpret marks per the rubric: circle/arrow → change the target per the nearby note; X/strikethrough → delete; box in empty space → add; numbered pin → apply the matching `Pin N:` line.
  - Change only what is marked; keep everything else, including layout, identical.
  - Output complete replacements of both files and overwrite in place.
- **Produces:** Populated `Changes Applied` section
- **References:** `references/refinement-prompt.md`

### Step 6: Report back
- **Reads:** All previous step outputs
- **Actions:**
  - Fill `references/sketch-build-template.md`.
  - In chat, give paths and a 2–3 bullet summary instead of pasting full files, unless the user asks to see the code or files could not be written.
- **Next steps:** Based on output, suggest:
  - "To turn this screen into a clickable multi-screen prototype, use `$prototype-builder`."
  - "To get structured feedback on the layout, use `$design-critique`."
  - "To check the generated UI for WCAG issues, use `$accessibility-auditor`."
- **Produces:** Complete sketch build summary
- **References:** `references/sketch-build-template.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Generation Summary | yes | - | key-value fields: mode, screen name, stack, Tailwind version, token source |
| Component Mapping | yes | 1 row | table: sketch element → component → variant/notes |
| Files | yes | 1 file | path per file; full code in fenced blocks only when files were not written |
| Changes Applied | no | 1 change | refinement mode only: each annotation → change made |
| Assumptions | yes | 1 item | every ambiguous interpretation and default chosen |
| Setup Needed | no | - | shadcn components to add, with the install command |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Component Mapping | Every drawn element appears in the mapping; nothing in the sketch is silently dropped and nothing is added that the sketch doesn't show | blocker |
| QB-02 | Files | React output uses only catalog components or ones already in the project's `components/ui/`; anything else is a Tailwind-styled `div` | blocker |
| QB-03 | Files | React output has no inline styles or custom CSS; all styling is Tailwind utilities | blocker |
| QB-04 | Files | The HTML preview is a complete document built from `references/preview-template.html` and renders the same structure as the React component | blocker |
| QB-05 | Changes Applied | Refinement changes only annotated elements; every annotation and `Pin N` line maps to exactly one applied change | blocker |
| QB-06 | Files | Inputs have visible labels and icon-only buttons have accessible names | warning |
| QB-07 | Generation Summary | Project tokens are used when they exist; shadcn defaults only when none are found | warning |
| QB-08 | Assumptions | Each ambiguous element (e.g., "top row read as NavigationMenu") is listed | warning |

## Reference Navigation

Read only what is needed:
- sketch-pattern → component catalog: `references/component-catalog.json`
- generation rubric: `references/system-prompt.md`
- annotation rubric (refinement): `references/refinement-prompt.md`
- HTML preview shell: `references/preview-template.html`
- output shell: `references/sketch-build-template.md`

## Trigger Examples

### Positive
Intents: [sketch_to_code, wireframe_to_code, build_ui_from_image, refine_from_annotations]

- "Turn this whiteboard photo into a React component."
- "Build the login page from this sketch: ./mockups/login.jpg"
- "Apply these changes — Pin 1: change the heading to 'Welcome back'."

### Negative
- "Build a clickable prototype of the onboarding flow from this spec." -> `$prototype-builder`
- "Critique this wireframe." -> `$design-critique`
- "Write the dev handoff for this Figma frame." -> `$dev-handoff-writer`
- "Map the screens in this flow." -> `$user-flow-mapper`

### Ambiguous
- "Make this real." (clarify: one screen as code from the image, or a multi-screen prototype?)
- "Convert this to Material UI." (this skill's catalog is shadcn-specific; confirm before mapping to another library)
