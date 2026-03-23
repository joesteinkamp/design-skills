---
name: design-spectrums-creator
description: "Identify and map key opposing design principles, patterns, and trade-offs as spectrums for a given design challenge. Use when requests involve exploring design tensions, trade-off analysis, design principles mapping, identifying opposing approaches, or framing design decisions as spectrums."
---

# Design Spectrums Creator

## Overview

Use this skill to surface and map the key design tensions for a given challenge. Every design decision sits somewhere on a spectrum between opposing principles — simplicity vs. power, guidance vs. freedom, density vs. clarity. This skill makes those tensions explicit so the team can make intentional, aligned decisions rather than unconscious defaults.

Accepts a design brief, feature description, problem statement, or output from upstream skills like `$persona-creator`, `$journey-mapper`, `$inspiration-browser`, or `$design-spec-writer` and produces a set of labeled spectrums with positions, rationale, and design implications. Output is formatted for use in FigJam, Miro, or as structured markdown in Notion. When the target tool is specified, adapt the spectrum visualization format for that tool's canvas or layout.

## Workflow

1. Understand the design context.
- Identify the product, feature, or experience to explore.
- Capture user needs, business constraints, and technical realities.
- Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$inspiration-browser` if available.
- Note the team's current assumptions or default positions.

2. Identify relevant spectrums.
- Analyze the design challenge for inherent tensions and trade-offs.
- Draw from common design spectrums (see `references/common-spectrums.md`) but prioritize challenge-specific tensions.
- Aim for 5-8 spectrums that represent the most consequential decisions.
- Each spectrum must have two clearly defined, non-strawman poles — both sides should be defensible.
- Discard spectrums where the answer is obvious (e.g., "fast vs. slow" when performance is table stakes).

3. Define each spectrum.
- Name the spectrum with both poles (e.g., "Guided ←→ Exploratory").
- Define what each pole means in the context of this challenge.
- Provide a real-world product example at each end.
- Explain the trade-off: what you gain and lose at each pole.
- Identify the user and business factors that pull toward each pole.

4. Recommend positions.
- For each spectrum, recommend a position (not always the middle — strong positions are often better).
- Justify the position based on user needs, persona attributes, and business goals.
- Note whether the position should shift for different personas or contexts.
- Flag spectrums where the team should discuss and decide collectively.
- Use `references/spectrum-card-template.md` for structure.

5. Synthesize into design principles.
- Convert the spectrum positions into 3-5 actionable design principles.
- Each principle should be specific enough to resolve future design debates.
- A good principle has a meaningful opposite (e.g., "Prioritize speed over completeness" — the opposite is also defensible).

6. Format output.
- Use `references/spectrum-card-template.md` for the response structure.
- Include a visual summary showing all spectrums with recommended positions.

## Output Contract

Always return sections in this order:
- `Design Context`
- `Spectrum Summary`
- `Spectrum Cards`
- `Derived Design Principles`
- `Open Tensions`
- `Downstream Handoff` (optional, include when feeding other skills)

## Quality Bar

Revise before finalizing if any of these are true:
- Fewer than 5 spectrums are identified without justification for the smaller set.
- Either pole of a spectrum is a strawman — both sides must be defensible positions that a reasonable designer would advocate for (e.g., "Simple ←→ Powerful" is valid; "Good ←→ Bad" is not).
- Any spectrum is missing a real-world product example at each pole (e.g., "Guided: TurboTax ←→ Exploratory: Figma").
- All recommended positions cluster in the center — at least 2 spectrums should have a strong left or right stance with clear rationale.
- Positions are justified with personal preference ("I think...") instead of user or business evidence ("Maya persona needs X because..." or "Our 35% onboarding drop-off indicates...").
- Derived principles are generic enough to apply to any product ("Be user-friendly") instead of specific to this challenge ("Prioritize setup speed over configuration completeness for first-time users").
- Derived principles do not have a meaningful opposite — if no one would argue the other side, it's not a useful principle.
- Trade-offs are one-sided — each spectrum must state what you gain AND what you lose at each pole.

## Reference Navigation

Read only what is needed:
- spectrum output shell: `references/spectrum-card-template.md`
- common spectrum library: `references/common-spectrums.md`

## Trigger Examples

Positive:
- "What are the key design tensions for this feature?"
- "Map out the trade-offs we need to consider for the dashboard redesign."
- "Help us identify the opposing principles at play in our onboarding."
- "What spectrums should we consider for this design challenge?"
- "Frame the design decisions as trade-offs so we can align."

Negative:
- "Find inspiration for the onboarding flow."
- "Write a design spec for the settings page."
- "Do a competitive analysis."

Ambiguous:
- "What should we prioritize?" (clarify whether they want spectrums/trade-offs or a prioritization framework)
- "Help us make a decision." (clarify whether they want trade-off mapping or a specific recommendation)
