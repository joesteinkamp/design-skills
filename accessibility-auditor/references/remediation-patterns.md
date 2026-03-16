# Common Remediation Patterns

Reference guide for common accessibility issues and their fixes.

## Color & Contrast

### Insufficient Text Contrast
- Issue: Text does not meet 4.5:1 (normal) or 3:1 (large) contrast ratio.
- Fix: Adjust foreground or background color to meet minimum ratio.
- Tool: Use a contrast checker to verify ratios.

### Color as Only Indicator
- Issue: Status, errors, or information conveyed by color alone.
- Fix: Add icons, text labels, or patterns alongside color.

## Keyboard & Focus

### Missing Focus Indicator
- Issue: No visible focus ring on interactive elements.
- Fix: Add a visible focus style (outline, border, or background change) with sufficient contrast.

### Keyboard Trap
- Issue: Focus enters a component (modal, dropdown) but cannot escape.
- Fix: Ensure Escape closes overlays, Tab cycles through and exits components.

### Missing Keyboard Access
- Issue: Functionality only available via mouse (click, hover, drag).
- Fix: Add keyboard equivalents (Enter/Space for activation, arrow keys for navigation).

## Forms & Inputs

### Missing Labels
- Issue: Form inputs lack associated labels.
- Fix: Add visible `<label>` elements associated via `for`/`id` or wrap inputs.

### Missing Error Messages
- Issue: Errors are not described in text or not associated with fields.
- Fix: Add descriptive error text linked to the field via `aria-describedby`.

### Missing Input Purpose
- Issue: Autocomplete attributes not set for common fields.
- Fix: Add `autocomplete` attribute (e.g., `name`, `email`, `tel`).

## Images & Media

### Missing Alt Text
- Issue: Images lack text alternatives.
- Fix: Add descriptive `alt` for informative images, empty `alt=""` for decorative images.

### Missing Captions
- Issue: Video content lacks captions.
- Fix: Add synchronized captions (not auto-generated without review).

## Structure & Navigation

### Missing Heading Hierarchy
- Issue: Headings skip levels or are not used.
- Fix: Use sequential heading levels (h1 > h2 > h3) to create a logical outline.

### Missing Landmarks
- Issue: Page lacks semantic landmark regions.
- Fix: Use `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>` or ARIA landmark roles.

### Missing Skip Link
- Issue: No mechanism to bypass repeated navigation.
- Fix: Add a "Skip to main content" link as the first focusable element.

## Dynamic Content

### Status Updates Not Announced
- Issue: Dynamic changes (toasts, counters, progress) not announced to screen readers.
- Fix: Use `aria-live` regions (`polite` for non-urgent, `assertive` for critical).

### Modal Focus Management
- Issue: Opening a modal does not move focus; closing does not return focus.
- Fix: Move focus to modal on open, trap focus within, return focus on close.

## Touch & Pointer

### Small Touch Targets
- Issue: Interactive elements smaller than 24x24 CSS pixels.
- Fix: Increase target size or add sufficient spacing between targets.

### No Single-Pointer Alternative
- Issue: Gestures (pinch, swipe, drag) lack single-click alternatives.
- Fix: Provide button controls alongside gesture interactions.
