# Sketch Build: [Screen Name]

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Mode | yes | enum | new_sketch / refinement |
> | Stack | yes | enum | nextjs_shadcn / html_only |
> | Tailwind version | yes | enum | v4 / v3 (project) |
> | Token source | yes | enum | project CSS / DESIGN.md / Figma / shadcn defaults |
> | Component Mapping | yes | table | min 1 row; one row per drawn element |
> | Files | yes | list | min 1 path |
> | Changes Applied | no | table | refinement only; one row per annotation |
> | Assumptions | yes | list | min 1 |

## Generation Summary
- Mode:
- Screen name:
- Stack:
- Tailwind version:
- Token source:

## Component Mapping

| Sketch element | Component | Variant / notes |
|----------------|-----------|-----------------|
| | | |

## Files
- HTML preview: `path`
- React component: `path`

<!-- Include full code in fenced blocks only if files could not be written. -->

## Changes Applied
<!-- Refinement mode only. -->

| Annotation | Change made |
|------------|-------------|
| | |

## Assumptions
-

## Setup Needed
<!-- Only if shadcn components are missing. -->
- `npx shadcn@latest add ...`
