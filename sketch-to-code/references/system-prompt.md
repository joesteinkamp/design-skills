# Sketch → shadcn/ui generation rubric

Apply this rubric when interpreting a hand-drawn wireframe sketch. It is the system prompt distilled from the iPad sketch-to-web pipeline; use it as a checklist for your own generation.

## Available components

The component catalog is at `references/component-catalog.json`. Each entry has:
- `name` — the shadcn component name
- `sketchPattern` — what the component looks like in a hand drawing
- `shadcnImport` — the import path (always `@/components/ui/<kebab>`)
- `exampleUsage` — minimal usage snippet

Match each drawn element to the catalog entry whose `sketchPattern` best describes it.

## Layout interpretation

- Horizontal alignment of elements → flex row (`flex flex-row gap-N items-center`).
- Vertical stacking → flex column (`flex flex-col gap-N`).
- Grid-like arrangements (rows × cols of similar elements) → CSS grid (`grid grid-cols-N gap-N`).
- Estimate spacing from gaps between drawn elements; map to Tailwind's spacing scale (`gap-2`, `gap-4`, `gap-6`, `p-4`, etc.).
- Relative sizes are proportional, not literal. A drawn rectangle that's roughly twice as wide as another → twice the column span / flex weight.
- Drawn outer borders or boxes around a group → wrap in a `Card` (or container `div` with `rounded-lg border p-N`).
- Lines connecting elements imply navigation or flow — they are not visual elements. Don't draw them in the output.
- Text written inside a shape becomes that component's label / placeholder / content.
- Apply responsive breakpoints (`sm:`, `md:`, `lg:`) only when the sketch clearly implies responsiveness (e.g., the user wrote "mobile" or drew a separate small-screen version).

## User-labeled elements

If the user writes a component name inside a drawn box (e.g., they wrote "Select" inside a rectangle), treat that label as authoritative — use that exact component, do not reclassify based on shape.

## Styling rules

- Use Tailwind CSS utility classes for ALL styling. No inline styles. No custom `<style>` blocks in the React output.
- Use shadcn default variants unless the sketch clearly indicates otherwise:
  - Filled rectangle button → `<Button>` (default variant)
  - Outlined rectangle button → `<Button variant="outline">`
  - Plain underlined text → `<Button variant="link">`
  - Red / "danger" / "delete" labeled → `<Button variant="destructive">`
- Maintain consistent spacing using Tailwind's spacing scale, not arbitrary values.
- For ambiguous elements, choose the most common UI interpretation (text in a row at the top → `NavigationMenu`; small circle near a name → `Avatar`).

## Design system override

If the project provides a design system (DESIGN.md, tailwind.config, globals.css with CSS variables, custom fonts, brand notes), prefer those tokens over shadcn defaults for colors, typography, spacing, and tone. Keep the underlying shadcn component structure — just apply the project's tokens.

## Output requirements

Produce two artifacts. Both must be complete and self-contained.

### htmlPreview
- A complete `<!DOCTYPE html>` document with viewport meta tag.
- Includes `<script src="https://cdn.tailwindcss.com"></script>` in `<head>`.
- Embeds the shadcn CSS variables + base component styles from `references/preview-template.html`. Substitute `{{CONTENT}}` with the rendered body markup.
- Renders a faithful visual approximation of the React component using plain HTML + Tailwind classes (no JSX).

### reactCode
- A single Next.js component file (`.tsx`).
- `"use client"` directive at the top if any client-side features are used.
- Imports shadcn components from `@/components/ui/<kebab-name>`.
- Default export.
- TypeScript with prop types if the component takes props.
- Tailwind classes for all styling.

## Important

- Output a complete replacement, not a diff or partial update.
- If an element in the sketch is genuinely ambiguous, pick the most common UI interpretation and note the assumption to the user.
- Never invent a component that isn't in the catalog (or in `components/ui/` of the user's project) — if you need something else, fall back to a styled `<div>` with Tailwind.
