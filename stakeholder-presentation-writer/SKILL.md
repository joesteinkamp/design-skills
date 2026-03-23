---
name: stakeholder-presentation-writer
description: "Structure compelling design presentations for stakeholder audiences with narrative arcs, evidence framing, and clear decision asks. Use when requests involve stakeholder updates, executive summaries, design rationale presentations, or communicating design decisions to non-design audiences — not design critiques, not dev handoffs."
---

# Stakeholder Presentation Writer

## Overview

Use this skill to structure persuasive design presentations that communicate decisions, rationale, and recommendations to stakeholders. Accepts design specs (from `$design-spec-writer`), research findings (from `$research-synthesizer`), critique outcomes (from `$design-critique`), or any design artifact and produces a structured presentation narrative.

The output should be presentation-ready: a clear narrative arc, evidence-backed arguments, anticipated objections, and explicit decision asks that drive alignment. Output is formatted for use in Google Slides, Keynote, Figma, or as a structured Notion document. When the target tool is specified, adapt the slide structure and layout guidance accordingly.

## Workflow

1. Define the presentation context.
- Identify the audience: who is in the room, their roles, and what they care about.
- Determine the presentation goal: inform, align, get approval, or request resources.
- Clarify the key decision(s) the audience needs to make.
- Note constraints: time limit, format, and prior context the audience has.

2. Craft the narrative arc.
- Open with the problem or opportunity (why this matters now).
- Set context: user evidence, business metrics, or competitive pressure.
- Present the design direction with rationale (not just the solution).
- Show alternatives considered and why they were deprioritized.
- Close with a clear ask: decision, feedback, or next steps.

3. Build the evidence layer.
- Map each design decision to supporting evidence (research, data, heuristics, best practices).
- Select the strongest 2-3 proof points per decision (don't overwhelm).
- Include user quotes, metrics, or competitive examples where available.
- Cite sources: link to research studies, analytics, or upstream skill outputs.

4. Anticipate objections.
- Identify likely pushback based on audience priorities (cost, timeline, risk, scope).
- Prepare concise responses for each objection.
- Acknowledge trade-offs honestly—don't oversell.
- Identify what is not yet resolved and frame it as a known next step.

5. Define the ask.
- Write explicit decision points: what you need from the audience.
- Provide clear options if a decision is needed (with a recommendation).
- Specify what happens after approval (next steps, timeline, owners).
- Define what happens if the decision is deferred.

6. Format output.
- Use `references/presentation-template.md` for the response structure.
- Use `references/slide-framework.md` for slide-by-slide breakdown guidance.
- Ensure the presentation works within the stated time constraint.

## Output Contract

Always return sections in this order:
- `Presentation Brief`
- `Narrative Arc`
- `Slide-by-Slide Outline`
- `Evidence & Supporting Data`
- `Objection Handling`
- `Decision Ask & Next Steps`

## Quality Bar

Revise before finalizing if any of these are true:
- Audience is described generically ("stakeholders") rather than specifically ("VP of Product, 2 Engineering leads, Head of Design").
- Narrative does not follow the problem → context → solution → ask arc.
- Any design decision is presented without at least one supporting evidence point (research quote, metric, competitive example, or heuristic).
- No alternatives were shown — the presentation must include at least one deprioritized option with rationale.
- Objection handling section is empty or has fewer than 2 anticipated pushbacks.
- The ask is vague ("let us know what you think") instead of specific ("approve Option B so engineering can begin sprint planning next Monday").
- Presentation exceeds the stated time constraint by more than 10%.
- Trade-offs are hidden — every recommendation must acknowledge what it costs (time, scope, complexity, or risk).

## Reference Navigation

Read only what is needed:
- presentation output shell: `references/presentation-template.md`
- slide structure guide: `references/slide-framework.md`

## Trigger Examples

Positive:
- "Help me present this design to leadership."
- "Structure a design review for the product team."
- "Write an executive summary of our research findings."
- "Prepare a presentation to get buy-in for the redesign."

Negative:
- "Write a design spec for the checkout flow." (use `$design-spec-writer`)
- "Critique this design." (use `$design-critique`)
- "Synthesize this research." (use `$research-synthesizer`)

Ambiguous:
- "I need to share this with stakeholders." (clarify whether they need a presentation, a document, or just talking points)
