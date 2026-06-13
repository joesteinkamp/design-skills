# Prioritized Roadmap Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Framework | yes | enum | RICE / impact-effort / WSJF |
> | Capacity | yes | text | team capacity for the horizon; "unknown" if not provided |
> | Time horizon | yes | text | planning window (e.g., next quarter) |
> | Constraints | no | list | must-dos, deadlines, dependencies that override scoring |
> | Scoring scale | yes | key-value | one entry per framework component with its scale |
> | Composite formula | yes | text | how component scores combine into the composite |
> | Initiative | yes | text | discrete, comparable initiative name |
> | Component scores | yes | key-value | one score per framework component |
> | Composite score | yes | number | computed from the formula |
> | Justification | yes | text | min 1 sentence per initiative, references evidence or reasoning |
> | Confidence flag | no | enum | high / medium / low — required when evidence is thin |
> | Dependencies | no | list | initiatives that must precede this one |
> | Horizon | yes | enum | now / next / later |
> | Cut line | yes | text | what fits in capacity vs. what does not |
> | Deprioritized item | yes | text | each cut or deferred initiative |
> | Trade-off | yes | text | value forgone or risk carried by not doing it |
> | Assumption | yes | list | min 1 assumption the sequence depends on |
> | Risk | no | list | risks to the sequence |

Use this as the default response structure for `roadmap-prioritizer`.

## Prioritization Context

- Framework: (RICE / impact-effort / WSJF)
- Capacity: (team capacity for the horizon; "unknown" if not provided)
- Time horizon:
- Constraints:
  - Constraint 1: (must-do / deadline / dependency — note if it overrides scoring)

## Scoring Model

Define each component of the chosen framework and its scale. Use the matching block below.

### RICE
- Reach: how many users or events per time period are affected (raw count or estimate)
- Impact: per-user effect, scaled 3 = massive / 2 = high / 1 = medium / 0.5 = low / 0.25 = minimal
- Confidence: how much evidence backs Reach and Impact, as a percentage (100% / 80% / 50%)
- Effort: person-months (or sprints) of total team time
- Composite formula: (Reach × Impact × Confidence) ÷ Effort

### Impact/Effort
- Impact: business + user value, scaled 1-5
- Effort: total team cost to deliver, scaled 1-5
- Composite formula: rank by Impact ÷ Effort; quick wins are high-impact / low-effort

### WSJF (Weighted Shortest Job First)
- User/business value: 1-10 relative scale
- Time criticality: 1-10 relative scale
- Risk reduction / opportunity enablement: 1-10 relative scale
- Job size: 1-10 relative scale (proxy for effort)
- Composite formula: (Value + Time criticality + Risk reduction) ÷ Job size

## Scored Backlog

| Initiative | [component] | [component] | [component] | [component] | Composite | Confidence | Justification |
|------------|-------------|-------------|-------------|-------------|-----------|------------|---------------|
| Initiative A | | | | | | | |
| Initiative B | | | | | | | |

(Replace the `[component]` headers with the chosen framework's components. Every cell scored; every row has a justification.)

## Sequenced Roadmap

Cut line: (what fits within capacity vs. what does not)

### Now
- Initiative — composite score; dependencies: ; rationale for placement:

### Next
- Initiative — composite score; dependencies: ; rationale for placement:

### Later
- Initiative — composite score; dependencies: ; rationale for placement:

(Note any dependency-driven exception where a lower-scored item precedes a higher-scored one.)

## Deprioritized & Trade-offs

- Deprioritized item 1:
  - Trade-off of not doing it:
- Deprioritized item 2:
  - Trade-off of not doing it:

## Assumptions & Risks

- Assumption 1: (flag confidence where the evidence behind a score is thin)
- Risk 1:

---

## Starter Example

Below is a concrete example of a scored initiative and a sequencing decision. Use as a quality reference.

### Scored Initiative Example (RICE)

- **Initiative:** Inline validation on the signup form
- **Reach:** 12,000 signups/month
- **Impact:** 2 (high — directly removes a top funnel drop-off point)
- **Confidence:** 80% (backed by funnel analytics + 3 usability sessions showing field-level confusion)
- **Effort:** 1.5 person-months
- **Composite:** (12,000 × 2 × 0.8) ÷ 1.5 = 12,800
- **Justification:** Funnel data shows 18% of signups abandon at the form; usability sessions traced it to late, page-level error messaging. High confidence because both quantitative and qualitative evidence agree.

### Sequencing Decision Example

- **Now:** Design-system token migration (composite 4,200) is placed in Now despite a lower score than two later items because three Next-horizon initiatives depend on the migrated tokens. Dependency-driven exception, flagged.
- **Cut line:** Capacity is ~6 person-months this quarter; the migration plus inline validation consume it. Everything below the validation row moves to Next or Later.
