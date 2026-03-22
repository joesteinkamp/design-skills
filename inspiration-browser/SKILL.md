---
name: inspiration-browser
description: "Research and curate design inspiration from across the web for a specific design challenge. Use when requests involve finding inspiration, exploring design patterns, looking for reference examples, benchmarking visual or interaction approaches, or gathering creative stimulus for ideation."
---

# Inspiration Browser

## Overview

Use this skill to research and curate relevant design inspiration from across the web for a specific design challenge. Accepts a design brief, feature description, problem statement, or output from upstream skills like `$persona-creator` or `$journey-mapper` and produces a structured inspiration board with categorized examples, pattern observations, and design implications.

This skill actively searches the internet for real-world examples — landing pages, product interfaces, interaction patterns, visual treatments, and cross-industry analogies. The output should spark ideas, not prescribe solutions. Each example should include why it is relevant and what principle it demonstrates. Search sources include Mobbin, Savee, Godly, Awwwards, Dribbble (shipped products only), Product Hunt, Apple Design Awards, Google Material Studies, and industry-specific blogs. Output is formatted for use in Figma, FigJam, Miro, or as a structured Notion gallery. When the target tool is specified, adapt the board layout accordingly.

## Workflow

1. Frame the inspiration search.
- Identify the design challenge, feature, or experience to explore.
- Extract key attributes: domain, interaction type, emotional tone, user context, constraints.
- Define search dimensions: direct competitors, adjacent industries, analogous experiences, and cross-domain inspiration.
- Accept upstream inputs from `$persona-creator`, `$journey-mapper`, or `$design-spec-writer` to focus the search.

2. Search broadly across categories using canonical sources.
- **Direct examples:** Search Mobbin, Product Hunt, and competitor websites for products solving the same problem in the same domain.
- **Adjacent examples:** Search Awwwards, Godly, and industry blogs for products in related domains with similar interaction patterns.
- **Analogous examples:** Search across unrelated industries (healthcare, gaming, finance, education) for structurally similar problems solved differently.
- **Visual and emotional references:** Search Savee, Dribbble (filter for shipped/real products), and Apple Design Awards for treatments that evoke the desired tone.
- Prioritize real, shipped products over concept work or awards pieces with no evidence of production use.
- For each source, note the URL, product name, and the specific screen or interaction worth studying.

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
- Fewer than 8 examples are included without justification for the smaller set.
- All examples are from the same domain or industry — at least 2 must be from analogous or cross-industry sources.
- Any example is missing a source URL, a description of what it does well, and an explanation of its relevance to the current challenge.
- No cross-industry or analogous inspiration is included — at least 2 examples must come from outside the product's direct domain.
- Pattern analysis only lists what was found without stating a design implication for the current challenge.
- Examples are concept work, dribbble shots, or awards pieces with no evidence of real-world production use — unless explicitly labeled as "concept inspiration."
- Design implications are generic ("good onboarding is important") instead of specific ("3 of 5 examples use progressive disclosure to reduce initial cognitive load — consider collapsing advanced settings behind a 'More options' toggle").
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
- "Compare our checkout against Shopify, Amazon, and Stripe." (use `$competitive-analyzer` — structured competitor comparison, not creative inspiration)
- "Do a competitive analysis of checkout flows." (use `$competitive-analyzer` — market positioning, not design references)
- "Write a design spec for the dashboard." (use `$design-spec-writer`)
- "Create personas for our users." (use `$persona-creator`)

Ambiguous:
- "What are other products doing?" (clarify: do you want creative design inspiration and pattern examples, or a structured competitive analysis with positioning?)
- "Show me examples." (clarify the specific design challenge or feature area)
