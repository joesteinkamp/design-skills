# Dev Handoff Template

Use this as the default response structure for `dev-handoff-writer`.

## Handoff Overview

- Feature/project name:
- Design spec source: (link or reference to design spec)
- Engineering audience: (frontend / backend / fullstack / mobile)
- Design system: (name and version if applicable)
- Priority: (P0 / P1 / P2)
- Target release:

## Component Inventory

For each component:

### [Component Name]

- Design system token/reference:
- Variants:
- Properties:
  - Property 1: (type, default, options)
  - Property 2: (type, default, options)

#### States
- Default:
  - Visual description:
  - Data requirements:
- Hover:
  - Visual change:
  - Cursor:
- Focus:
  - Visual change:
  - Focus ring spec:
- Active:
  - Visual change:
- Disabled:
  - Visual change:
  - Interaction: (none, tooltip on hover)
- Error:
  - Visual change:
  - Error message:
- Loading:
  - Visual change:
  - Skeleton/spinner:
- Empty:
  - Visual change:
  - Placeholder content:

#### Transitions
- Transition 1:
  - From state:
  - To state:
  - Duration:
  - Easing:
  - Property:

## Interaction Specs

For each interaction flow:
- Flow name:
  - Trigger:
  - Steps:
    1. Step description:
    2. Step description:
  - Success outcome:
  - Error outcome:
  - Keyboard equivalent:
  - Screen reader announcement:

## Responsive Behavior

### Breakpoints
- Desktop (>1024px):
  - Layout:
  - Visible components:
- Tablet (768-1024px):
  - Layout changes:
  - Component adaptations:
- Mobile (<768px):
  - Layout changes:
  - Component adaptations:
  - Touch considerations:

### Overflow & Truncation
- Text overflow behavior:
- Container overflow behavior:
- Minimum/maximum widths:

## Content & Edge Cases

### Content Specs
For each content block:
- Content:
  - Max characters:
  - Truncation rule:
  - Localization notes:

### Data Edge Cases
- Zero items:
- One item:
- Maximum items:
- Long text:
- Missing data:
- Slow connection:
- Offline state:

## Accessibility Requirements

- ARIA roles:
- ARIA labels:
- Keyboard navigation:
  - Tab order:
  - Arrow key behavior:
  - Escape behavior:
- Screen reader announcements:
- Focus management:
- Color contrast notes:

## Implementation Checklist

Produce this section using `implementation-checklist.md`.

---

## Starter Example

Below is a concrete example of a completed component handoff. Use as a quality reference.

### Component: Search Input

**Design system token:** `input-search`
**Variants:** default, with-filters, compact

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Placeholder "Search...", muted text, search icon left | Field is focusable via Tab or `/` keyboard shortcut |
| Focused | 2px primary border, placeholder dims | Cursor active, recent searches dropdown appears after 100ms |
| Typing | User input replaces placeholder, clear button (×) appears right | Debounce 300ms before triggering search. Show loading spinner in place of search icon |
| Loading | Spinner replaces search icon | Results update incrementally (optimistic rendering) |
| Results | Result count badge appears right of input | Arrow keys navigate results, Enter selects, Escape clears and closes |
| Empty results | Input retains query text | Dropdown shows "No results for '[query]'" with suggested alternatives |
| Error | Red 2px border, error icon replaces search icon | Toast: "Search unavailable. Try again." Input remains editable |
| Disabled | Muted background, no cursor | Not focusable via Tab. Tooltip on hover: "Search is unavailable during import" |

**Transitions:**
- Default → Focused: `border-color 150ms ease-in`
- Focused → Typing: instant (no transition)
- Typing → Loading: `opacity 200ms ease-out` on spinner
- Loading → Results: `opacity 150ms ease-in` on result list

**Keyboard Interaction:**
- `/` — Focus search input from anywhere on the page
- `Escape` — Clear input and close results dropdown
- `↑` `↓` — Navigate results
- `Enter` — Select highlighted result
- `Tab` — Move focus to first result item

**ARIA:**
- Role: `combobox` with `aria-expanded`, `aria-autocomplete="list"`
- Results list: `role="listbox"`, each result `role="option"`
- Live region: `aria-live="polite"` announces result count changes
