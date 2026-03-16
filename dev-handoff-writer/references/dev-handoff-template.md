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
