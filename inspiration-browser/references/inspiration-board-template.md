# Inspiration Board Template

Use this as the default response structure for `inspiration-browser`.

## Search Context

- Design challenge:
- Domain:
- Key attributes: (interaction type, emotional tone, user context, constraints)
- Search dimensions explored: (direct / adjacent / analogous / visual-emotional)
- Upstream inputs: (personas, journeys, specs — if available)

## Inspiration Themes

Quick-scan summary of themes found:
- Theme 1: (1-sentence summary with example count)
- Theme 2:
- Theme 3:

## Curated Examples

### Theme 1: [Theme Name]

#### Example 1: [Product/Source Name]
- Source: [URL]
- What it does: (1-2 sentence description of the specific screen, flow, or interaction)
- What it does well: (the specific design quality worth noting)
- Design principle: (the underlying principle this demonstrates)
- Relevance: (how this connects to the current design challenge)
- Category: (direct / adjacent / analogous / visual-emotional)

#### Example 2: [Product/Source Name]
- Source: [URL]
- What it does:
- What it does well:
- Design principle:
- Relevance:
- Category:

### Theme 2: [Theme Name]

#### Example 3: [Product/Source Name]
- Source: [URL]
- What it does:
- What it does well:
- Design principle:
- Relevance:
- Category:

(Continue for 8-15 total examples across themes)

## Pattern Analysis

### Recurring Patterns
- Pattern 1:
  - Seen in: (list examples)
  - Why it works:
- Pattern 2:
  - Seen in:
  - Why it works:

### Contrasting Approaches
- Approach A vs. Approach B:
  - Examples of A:
  - Examples of B:
  - Trade-offs:

### Surprising or Unconventional Solutions
- Solution:
  - Seen in:
  - Why it is notable:

### Patterns That May Not Transfer
- Pattern:
  - Seen in:
  - Why it may not work here:

## Design Implications

For each theme:
- Theme 1 implication: (what this means for the current design challenge)
- Theme 2 implication:
- Theme 3 implication:

Most relevant examples for this challenge:
- Example X: (why it is the strongest reference)
- Example Y: (why it is the strongest reference)

## Gaps & Open Questions

- Gap 1: (area where no strong inspiration was found)
- Gap 2:
- Open question 1: (question raised by the research that needs team input)

---

## Starter Example

Below is a concrete example of a completed curated example and pattern analysis. Use as a quality reference.

### Curated Example

#### Example 4: Linear — Issue Creation Flow
- **Source:** https://linear.app
- **What it does:** Linear's issue creation is a command-palette-style modal triggered by `C` key. The form is a single text field that auto-expands. Team, project, priority, and labels are set via inline `/` commands or keyboard shortcuts — no dropdown menus or multi-step forms.
- **What it does well:** Reduces issue creation to a single continuous text interaction. Power users never leave the keyboard. Default values (team, project) are inferred from context (current view), eliminating 2-3 decisions per issue.
- **Design principle:** Sensible defaults + keyboard-first interaction reduce friction to near-zero for frequent actions.
- **Relevance:** Our "Create New [Item]" flow requires 4 form fields and 2 dropdowns before the user can type the actual content. Linear's approach suggests we could infer defaults from context and let users override only when needed.
- **Category:** Adjacent (project management → our domain)

### Pattern Analysis (excerpt)

**Recurring Pattern: Context-Inferred Defaults**
- Seen in: Linear (team/project from current view), Notion (page type from parent), Superhuman (recipient from thread context)
- Why it works: Eliminates decision fatigue for the most common case. Users only make choices when the default is wrong, which is rare (~15-20% of the time based on Linear's public stats).

**Contrasting Approaches: Form-First vs. Content-First Creation**
- Form-first: Jira, Asana, Monday.com — user fills metadata fields, then writes content. Thorough but slow.
- Content-first: Linear, Notion, Bear — user starts writing immediately, adds metadata later or lets it auto-populate. Fast but may produce incomplete entries.
- Trade-offs: Form-first ensures data quality but adds friction; content-first maximizes creation velocity but may require cleanup. For high-frequency actions (daily), content-first wins. For high-stakes actions (quarterly), form-first wins.
