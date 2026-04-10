# Competitive Analysis Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Focal product/feature | yes | text | must name a specific product or feature |
> | Analysis goal | yes | text | actionable goal statement |
> | Competitors analyzed | yes | list | min 2 competitors |
> | Evaluation dimensions | yes | list | min 3 dimensions |
> | Date of analysis | yes | text | valid date |
> | Comparison Matrix | yes | table | one row per dimension; rating uses Strong/Adequate/Weak/N-A |
> | Competitor Profiles | yes | key-value | one per competitor, uses competitor-profile-template |
> | Table Stakes | yes | list | min 2 items |
> | Differentiation Opportunities | yes | list | min 2 items; each has Gap in market, Design approach, and Impact |
> | Impact | yes | enum | high / medium / low |
> | Anti-Patterns to Avoid | yes | list | min 1 item; each has Seen in and Why it fails |
> | Design Recommendations | yes | list | min 2 recommendations |
> | Evidence from analysis | yes | text | must reference specific finding from matrix or profiles |
> | Priority | yes | enum | must-do / should-do / could-do |
> | Related opportunity | yes | text | must reference an opportunity listed above |

Use this as the default response structure for `competitive-analyzer`.

## Analysis Scope

- Focal product/feature:
- Analysis goal:
- Competitors analyzed:
- Evaluation dimensions:
- Date of analysis:

## Comparison Matrix

| Dimension | [Focal Product] | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|-----------|-----------------|-----------------|-----------------|-----------------|
|           |                 |                 |                 |                 |

Rating scale: Strong / Adequate / Weak / N/A

## Competitor Profiles

Produce each profile using `competitor-profile-template.md`.

## Opportunity Map

### Table Stakes (must-have to compete)
- Feature/pattern 1:
- Feature/pattern 2:

### Differentiation Opportunities
- Opportunity 1:
  - Gap in market:
  - Design approach:
  - Impact: (high / medium / low)
- Opportunity 2:
  - Gap in market:
  - Design approach:
  - Impact:

### Anti-Patterns to Avoid
- Pattern 1:
  - Seen in:
  - Why it fails:
- Pattern 2:
  - Seen in:
  - Why it fails:

## Design Recommendations

For each recommendation:
- Recommendation:
- Evidence from analysis:
- Priority: (must-do / should-do / could-do)
- Related opportunity:

---

## Starter Example

Below is a concrete example of a completed comparison matrix row and opportunity. Use as a quality reference.

### Comparison Matrix (excerpt)

| Dimension | Our Product | Competitor A (Notion) | Competitor B (Coda) | Competitor C (Slite) |
|-----------|------------|----------------------|---------------------|---------------------|
| Onboarding speed | Weak — 8-step wizard, 4 min avg, 35% drop-off at step 5 | Strong — single template picker, usable workspace in <60s | Adequate — 3-step setup, but requires team invite before content creation | Strong — skip-able onboarding, default workspace pre-populated with sample content |
| Search quality | Adequate — keyword match only, no filters, results ranked by recency | Strong — full-text search with filters, AI-powered "Ask" feature, recent/relevant ranking | Adequate — full-text search, basic filters, no AI features | Weak — title-only search, no content search, no filters |

### Differentiation Opportunity (excerpt)

**Opportunity: Contextual onboarding that adapts to use case**
- Gap in market: All 3 competitors offer a fixed onboarding sequence regardless of whether the user is a solo writer, a team lead, or a knowledge base admin. No competitor asks "what are you trying to do?" and adapts the setup accordingly.
- Design approach: Replace the linear wizard with a use-case selector (3-4 options) that pre-configures the workspace template, default settings, and first-run tips for that use case.
- Impact: High — directly addresses our 35% onboarding drop-off.
- Priority: Must-do
- Related finding: Competitor C's pre-populated workspace reduces time-to-value, but the content is generic. Combining adaptive setup with relevant starter content would leapfrog all competitors.
