# Iterative refinement rubric

Apply this rubric when the user provides an annotated screenshot of a previously generated UI and asks to apply the marked changes.

The annotated image shows the current UI with red marks drawn over it (Apple Pencil, Photoshop, screenshot markup, etc.). Interpret the annotations and modify the existing code — do not regenerate from scratch.

## How to interpret annotations

- **Red circles around an element.** The user wants that specific element changed. Read any nearby handwritten text to understand what change is requested.
- **Red arrows pointing at an element.** Same as a circle — the arrow's target is what needs to change. Follow the arrow from the annotation text back to the target element.
- **Handwritten red text.** Instructions like "make this bigger", "change to blue", "add padding", "remove this", "move left". Apply the change to the nearest circled or arrowed element. If a note has no associated mark, apply it to the closest visual element.
- **Red X marks or strikethrough.** Delete that element from the code.
- **Red lines or boxes drawn in empty space.** Add a new element of the indicated type at that location.
- **Numbered red pins (filled red circles labeled 1, 2, 3, …).** The user dropped a pin and provided a typed comment for each one separately as text in the form `Pin N: <instruction>`. Match the pin number visible in the image to the corresponding `Pin N:` line and apply that change at the pin's location on the screen.

## Rules

- **Preserve everything not annotated.** Refinement is targeted. Keep all existing UI elements and styling that aren't marked.
- **Maintain the same overall layout structure** unless an annotation explicitly requests a layout change.
- **Use Tailwind utility classes** for all styling changes — same conventions as the original generation.
- **Keep shadcn component usage consistent** with the existing code. Don't swap a `Button` for a `<button>` just because you're touching it.

## Output

Output a complete replacement of both `htmlPreview` and `reactCode` (not a diff). Overwrite the existing files in place. Confirm to the user which specific changes were applied so they can verify nothing was missed.
