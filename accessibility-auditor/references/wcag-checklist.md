# WCAG 2.2 Checklist

Use this checklist to evaluate designs against WCAG 2.2 success criteria, organized by principle.

## 1. Perceivable

### 1.1 Text Alternatives
- 1.1.1 Non-text Content (A): All non-text content has a text alternative.

### 1.2 Time-based Media
- 1.2.1 Audio-only and Video-only (A): Alternatives provided for prerecorded media.
- 1.2.2 Captions (A): Captions provided for prerecorded audio in synchronized media.
- 1.2.3 Audio Description or Media Alternative (A): Alternative provided for prerecorded video.
- 1.2.4 Captions Live (AA): Captions provided for live audio.
- 1.2.5 Audio Description (AA): Audio description provided for prerecorded video.

### 1.3 Adaptable
- 1.3.1 Info and Relationships (A): Information and relationships conveyed through presentation are programmatically determinable.
- 1.3.2 Meaningful Sequence (A): Correct reading sequence is programmatically determinable.
- 1.3.3 Sensory Characteristics (A): Instructions do not rely solely on sensory characteristics.
- 1.3.4 Orientation (AA): Content is not restricted to a single display orientation.
- 1.3.5 Identify Input Purpose (AA): Input field purpose can be programmatically determined.

### 1.4 Distinguishable
- 1.4.1 Use of Color (A): Color is not the only means of conveying information.
- 1.4.2 Audio Control (A): Audio playing automatically can be paused or stopped.
- 1.4.3 Contrast Minimum (AA): Text has a contrast ratio of at least 4.5:1 (3:1 for large text).
- 1.4.4 Resize Text (AA): Text can be resized up to 200% without loss of functionality.
- 1.4.5 Images of Text (AA): Text is used instead of images of text where possible.
- 1.4.10 Reflow (AA): Content reflows without horizontal scrolling at 320px width.
- 1.4.11 Non-text Contrast (AA): UI components and graphics have a contrast ratio of at least 3:1.
- 1.4.12 Text Spacing (AA): No loss of content when text spacing is adjusted.
- 1.4.13 Content on Hover or Focus (AA): Additional content on hover/focus is dismissible, hoverable, and persistent.

## 2. Operable

### 2.1 Keyboard Accessible
- 2.1.1 Keyboard (A): All functionality is available via keyboard.
- 2.1.2 No Keyboard Trap (A): Keyboard focus can be moved away from any component.
- 2.1.4 Character Key Shortcuts (A): Single character key shortcuts can be turned off or remapped.

### 2.2 Enough Time
- 2.2.1 Timing Adjustable (A): Time limits can be adjusted, extended, or turned off.
- 2.2.2 Pause, Stop, Hide (A): Moving or auto-updating content can be paused, stopped, or hidden.

### 2.3 Seizures and Physical Reactions
- 2.3.1 Three Flashes or Below Threshold (A): No content flashes more than three times per second.

### 2.4 Navigable
- 2.4.1 Bypass Blocks (A): A mechanism to bypass repeated blocks of content.
- 2.4.2 Page Titled (A): Pages have descriptive titles.
- 2.4.3 Focus Order (A): Focus order preserves meaning and operability.
- 2.4.4 Link Purpose in Context (A): Link purpose is determinable from link text or context.
- 2.4.5 Multiple Ways (AA): More than one way to locate a page within a set of pages.
- 2.4.6 Headings and Labels (AA): Headings and labels describe topic or purpose.
- 2.4.7 Focus Visible (AA): Keyboard focus indicator is visible.
- 2.4.11 Focus Not Obscured Minimum (AA): Focused component is not entirely hidden.

### 2.5 Input Modalities
- 2.5.1 Pointer Gestures (A): Multi-point or path-based gestures have single-pointer alternatives.
- 2.5.2 Pointer Cancellation (A): Down-event does not trigger function; up-event completes or aborts.
- 2.5.3 Label in Name (A): Visible label text is included in the accessible name.
- 2.5.4 Motion Actuation (A): Motion-triggered functions have UI alternatives and can be disabled.
- 2.5.7 Dragging Movements (AA): Dragging has single-pointer alternatives.
- 2.5.8 Target Size Minimum (AA): Targets are at least 24x24 CSS pixels or have sufficient spacing.

## 3. Understandable

### 3.1 Readable
- 3.1.1 Language of Page (A): Default language of the page is programmatically determinable.
- 3.1.2 Language of Parts (AA): Language of passages or phrases is programmatically determinable.

### 3.2 Predictable
- 3.2.1 On Focus (A): Focus does not trigger a change of context.
- 3.2.2 On Input (A): Changing a UI component does not automatically cause a change of context.
- 3.2.3 Consistent Navigation (AA): Navigation mechanisms are consistent across pages.
- 3.2.4 Consistent Identification (AA): Components with the same function are identified consistently.

### 3.3 Input Assistance
- 3.3.1 Error Identification (A): Input errors are identified and described in text.
- 3.3.2 Labels or Instructions (A): Labels or instructions are provided for user input.
- 3.3.3 Error Suggestion (AA): Error messages suggest corrections when possible.
- 3.3.4 Error Prevention Legal/Financial/Data (AA): Submissions are reversible, checked, or confirmed.
- 3.3.7 Redundant Entry (A): Previously entered information is auto-populated or available for selection.
- 3.3.8 Accessible Authentication Minimum (AA): Authentication does not require cognitive function tests.

## 4. Robust

### 4.1 Compatible
- 4.1.2 Name, Role, Value (A): All UI components have accessible names, roles, and values.
- 4.1.3 Status Messages (AA): Status messages are programmatically determinable without receiving focus.
