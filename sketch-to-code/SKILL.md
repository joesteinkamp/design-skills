---
name: sketch-to-code
description: Convert a hand-drawn UI wireframe sketch (photo, scan, screenshot, or exported drawing) into production-quality web code using shadcn/ui components and Tailwind CSS. Use when the user supplies a sketch/wireframe image and asks to turn it into a webpage, React component, HTML preview, or shadcn/ui code. Also handles iterative refinement when the user marks up a previous render with annotations and asks to apply changes.
---

# Sketch to Code

Convert a hand-drawn wireframe image into a self-contained HTML preview and a Next.js React component using shadcn/ui + Tailwind CSS. Also supports iterative refinement based on annotated screenshots.

## When this skill applies

Trigger this skill when the user provides a sketch/wireframe image (photo of paper, iPad/Apple Pencil drawing, whiteboard photo, exported PNG, screenshot of a low-fi mockup) and asks for any of:

- "Turn this into a webpage / React component / shadcn code"
- "Build the UI from this sketch"
- "Make this design real"
- "Refine this preview based on my annotations" (iteration mode)

If no image is provided yet, ask the user to share a path or attach the image before proceeding.

## How to convert a sketch (first pass)

1. **Read the sketch.** Use the `Read` tool on the image path so the model can see it. If multiple sketches are provided, treat each as a separate screen unless the user says otherwise.

2. **Load the component catalog.** Read `references/component-catalog.json` (relative to this skill directory). It lists 20 shadcn/ui components with the visual patterns each one looks like in a sketch, the import path, and an example.

3. **Detect a project design system (optional).** Before generating, check for any of: `DESIGN.md`, `design-system.md`, `tailwind.config.{js,ts}`, `app/globals.css` / `styles/globals.css` (for CSS variables), `components/ui/` (existing shadcn install). If present, read them and apply their tokens (colors, fonts, radius, spacing) over shadcn defaults. Do NOT invent a design system — only honor what's in the project.

4. **Apply the system prompt below in your head.** Don't paste it verbatim into the response — use it as your generation rubric.

   See [`references/system-prompt.md`](references/system-prompt.md) for the full rubric. Key rules:
   - Map drawn shapes to the closest catalog component (rounded rect with text → Button, rect with chevron → Select, etc.).
   - Horizontal alignment → flex row; vertical stacking → flex column. Estimate spacing from gaps and use Tailwind utilities.
   - Text written inside a shape becomes that component's label/content.
   - Lines connecting elements imply navigation/flow, not visuals.
   - Use Tailwind utility classes for ALL styling. No inline styles or custom CSS in the React output.
   - Use shadcn defaults unless the sketch clearly specifies a variant (e.g., outline vs filled button).

5. **Produce two artifacts.** Both must be valid and complete (not diffs):

   **a) HTML preview** — a single self-contained `.html` file:
   - Includes `<!DOCTYPE html>`, viewport meta, and `<script src="https://cdn.tailwindcss.com"></script>`.
   - Embeds the shadcn CSS variables and base component styles from [`references/preview-template.html`](references/preview-template.html). Replace the `{{CONTENT}}` token with the rendered markup.
   - Is a faithful visual representation of what the React component will render.

   **b) React component** — a single Next.js client component:
   - `"use client"` at the top if it uses hooks/handlers.
   - `import { Component } from "@/components/ui/<kebab-name>"` for each shadcn component.
   - Default export, TypeScript syntax, prop types if applicable.
   - Tailwind classes only (no inline styles).

6. **Write the files.** Default destinations, in priority order:
   - If the project is a Next.js app (has `app/` or `pages/`), write the React component to `app/(sketch)/<name>/page.tsx` or a sensible component path the user can move. Write the HTML preview to `public/sketch-preview-<name>.html` or `.preview/<name>.html`.
   - If it's a plain web project (no React), write only the HTML to `<name>.html` at the repo root or `public/`.
   - If it's not a web project at all, write both to `sketch-output/<name>.html` and `sketch-output/<name>.tsx` and tell the user.
   - Pick `<name>` from the user's prompt (e.g., "login screen" → `login`); fall back to `sketch`.

   Always print the chosen paths back to the user so they can move things.

7. **Confirm what's missing.** If shadcn isn't installed, mention which components are needed and that `npx shadcn@latest add <name> ...` will install them. Don't run the command without permission.

## Iterative refinement

When the user provides an annotated screenshot of a previous render (red marks, circles, arrows, handwritten notes, or numbered pins) and asks to apply changes:

1. Read the annotated image and the existing component file.
2. Follow the refinement rubric in [`references/refinement-prompt.md`](references/refinement-prompt.md). Summary:
   - **Red circles / arrows** → change the targeted element per the nearby handwritten note.
   - **Handwritten red text** ("make this bigger", "change to blue", "remove this") → apply to the nearest circled/arrowed element.
   - **Red X / strikethrough** → delete that element.
   - **Red boxes drawn in empty space** → add a new element there.
   - **Numbered red pins (1, 2, 3…)** → match each pin number in the image to the corresponding "Pin N: …" line the user provides as text, and apply that change at the pin's location.
3. **Preserve everything not annotated.** Refinement is targeted, not a rewrite. Keep the same layout structure unless the user explicitly asks to change it.
4. Output a complete replacement of both the HTML preview and the React component (not a diff). Overwrite the existing files in place.

## Output format inside this conversation

Don't print the full HTML or full React file in the chat. Write them to disk and give the user a one-line summary per file with the path, plus a 2–3 bullet description of what was generated and any assumptions you made (e.g., "assumed the top bar is a NavigationMenu", "guessed primary color from `tailwind.config.ts`").

If the user explicitly asks to see the code, then print it.

## What this skill is NOT

- Not a Figma importer. For Figma files, use the Figma MCP tools instead.
- Not a pixel-perfect tracer. Sketches are interpreted into the closest shadcn component — exact pixel layouts won't match.
- Not for non-shadcn stacks. If the user wants Material UI, Chakra, plain HTML, or a different library, ask before applying — this skill's catalog is shadcn-specific.
