---
name: inspiration-browser
description: "Research and curate design inspiration from across the web for a specific design challenge. Use when requests involve finding inspiration, exploring design patterns, looking for reference examples, benchmarking visual or interaction approaches, or gathering creative stimulus for ideation."
---

# Inspiration Browser

## Overview

Use this skill to research and curate relevant design inspiration from across the web for a specific design challenge. Accepts a design brief, feature description, problem statement, or output from upstream skills like `$persona-creator` or `$journey-mapper` and produces a structured inspiration board with categorized examples, pattern observations, and design implications.

This skill actively searches the internet for real-world examples — landing pages, product interfaces, interaction patterns, visual treatments, and cross-industry analogies. The output should spark ideas, not prescribe solutions. Each example should include why it is relevant and what principle it demonstrates.

## Workflow

1. Frame the inspiration search.
- Identify the design challenge, feature, or experience to explore.
- Extract key attributes: domain, interaction type, emotional tone, user context, constraints.
- Define search dimensions: direct competitors, adjacent industries, analogous experiences, and cross-domain inspiration.
- Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` to focus the search.

2. Search broadly across categories.
- Search for direct examples: products solving the same problem in the same domain.
- Search for adjacent examples: products in related domains with similar interaction patterns.
- Search for analogous examples: unrelated industries solving structurally similar problems.
- Search for visual and emotional references: treatments that evoke the desired tone.
- Prioritize real, shippable products over concept work or dribbble shots.
- Search design galleries, pattern libraries, award sites, product showcases, and industry blogs.

3. Curate and categorize findings.
- Select 8-15 examples that offer meaningfully different approaches.
- For each example, document: source, what it does well, the design principle it demonstrates, and its relevance to the current challenge.
- Group examples by theme or design dimension (e.g., "onboarding approaches", "data density handling", "empty state patterns").
- Include screenshots or detailed descriptions of the specific interaction or screen.

4. Extract patterns and principles.
- Identify recurring patterns across examples.
- Note contrasting approaches (e.g., wizard vs. inline setup).
- Call out surprising or unconventional solutions.
- Flag patterns that may not transfer well to the current context and why.

5. Connect to the design challenge.
- For each theme, write a brief design implication: what this means for the current work.
- Highlight which examples best address the specific user needs or constraints.
- Note gaps: areas where no strong inspiration was found.

6. Format output.
- Use `references/inspiration-board-template.md` for the response structure.
- Lead with a quick-scan summary of themes before the detailed examples.

## Output Contract

Always return sections in this order:
- `Search Context`
- `Inspiration Themes`
- `Curated Examples`
- `Pattern Analysis`
- `Design Implications`
- `Gaps & Open Questions`

## Quality Bar

Revise before finalizing if any of these are true:
- Fewer than 8 examples are included without justification.
- All examples are from the same domain or industry.
- Examples lack explanation of why they are relevant.
- No cross-industry or analogous inspiration is included.
- Pattern analysis only describes what was found without connecting to the design challenge.
- Examples are concept work or awards pieces with no evidence of real-world use.
- Design implications are generic and not tied to specific examples or patterns.
- Sources are not provided for each example.

## Reference Navigation

Read only what is needed:
- inspiration output shell: `references/inspiration-board-template.md`

## Trigger Examples

Positive:
- "Find inspiration for our onboarding redesign."
- "Show me how other products handle data-heavy dashboards."
- "What are the best examples of checkout experiences?"
- "I need design references for a collaboration feature."
- "Browse the web for inspiration on empty states."

Negative:
- "Write a design spec for the dashboard."
- "Do a competitive analysis of checkout flows."
- "Create personas for our users."

Ambiguous:
- "What are other products doing?" (clarify whether they want competitive analysis or creative inspiration)
- "Show me examples." (clarify the specific design challenge or feature area)
