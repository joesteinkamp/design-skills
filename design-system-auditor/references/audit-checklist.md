# Design System Audit Checklist

## Code scans

Adapt paths and the package name to the project. Report counts per directory or product.

| What | Pattern (ripgrep) | Notes |
|------|-------------------|-------|
| System component imports | `from ["']@acme/ui` | Adoption numerator |
| Local look-alikes | files named `*Button*`, `*Card*`, `*Modal*` outside the system package | Candidate duplicates |
| Hardcoded colors | `#[0-9a-fA-F]{3,8}\b`, `rgba?\(`, `hsla?\(`, `oklch\(` outside token files | Token drift |
| Hardcoded spacing | `(margin|padding|gap|top|left|right|bottom)\s*:\s*\d+px`; Tailwind arbitrary values `\[\d+px\]` | Token drift |
| Hardcoded type | `font-size\s*:\s*\d+`, `text-\[\d+px\]` | Token drift |
| Raw z-index | `z-index\s*:\s*\d+`, `z-\[\d+\]` | Layering drift |
| Inline styles | `style=\{\{` | Often bypasses tokens |

Exclude tests, stories, generated files, and the token source itself.

## Figma checks

- Instances of library components vs. detached instances vs. local components that resemble library ones.
- Most frequent overrides per component (text, fill, padding, icon swap); frequent overrides signal a missing variant or prop.
- Fills, strokes, and text styles not bound to variables or styles.
- Library version: files on an outdated library version.

## Drift cause categories

| Cause | Signal | Usual owner |
|-------|--------|-------------|
| Missing component | Same pattern re-implemented in 2+ places | System |
| Missing variant / prop | Same override applied repeatedly | System |
| Wrong default | Most instances override the same default | System |
| Token gap | Hardcoded value with no matching token | System |
| Unclear docs | Misused component (e.g., Link used as Button) | System |
| Not migrated | Legacy code or file predating the system | Product |
| Deliberate exception | Documented one-off (marketing page, experiment) | Accept |

## Component health spot-check

- Variants cover the states products need (default, hover, focus-visible, active, disabled, loading, error).
- Focus state is visible and meets 3:1 against adjacent colors (WCAG 2.4.7, 1.4.11).
- Default text/background tokens meet 4.5:1 (1.4.3).
- Interactive targets ≥ 24×24 CSS px (2.5.8).
- Accessible name, role, and value are exposed (4.1.2).
- Docs include usage guidance, do/don't, and code + design parity.
