# Research Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Research type | yes | text | matches source study type |
> | Research questions | yes | list | min 1 question |
> | Participant segments | yes | list | min 1 segment |
> | Methods | yes | list | min 1 method |
> | Confidence level | yes | enum | high / medium / low |
> | Key Insights | yes | list | min 2; each needs Summary, Impact, Confidence, Supporting evidence |
> | Summary (insight) | yes | text | concise insight statement |
> | Impact (insight) | yes | text | expected effect |
> | Confidence (insight) | yes | text | per-insight confidence level |
> | Supporting evidence | yes | list | min 1 quote or data point per insight |
> | Behavioral Patterns | yes | list | min 1; each needs Description, Segments, Frequency |
> | Segments (pattern) | yes | list | min 1 segment per pattern |
> | Frequency (pattern) | yes | text | how common the pattern is |
> | Pain Points | yes | list | min 1; each needs Description, Severity, Context |
> | Severity (pain point) | yes | text | severity rating |
> | Recommendations | yes | list | min 1; each needs Action, Priority, Target skill |
> | Priority (recommendation) | yes | text | relative priority |
> | Target skill | no | text | valid downstream skill name |

Use this schema when passing research synthesis output to downstream skills like `$persona-creator`, `$journey-mapper`, or `$design-spec-writer`.

## Required Handoff Block

```markdown
## Research Handoff

### Study Context
- Research type:
- Research questions:
- Participant segments:
- Methods:
- Confidence level: (high / medium / low)

### Key Insights
- Insight 1:
  - Summary:
  - Impact:
  - Confidence:
  - Supporting evidence:
- Insight 2:
  - Summary:
  - Impact:
  - Confidence:
  - Supporting evidence:

### Behavioral Patterns
- Pattern 1:
  - Description:
  - Segments:
  - Frequency:
- Pattern 2:
  - Description:
  - Segments:
  - Frequency:

### Pain Points
- Pain point 1:
  - Description:
  - Severity:
  - Context:
- Pain point 2:
  - Description:
  - Severity:
  - Context:

### Recommendations
- Recommendation 1:
  - Action:
  - Priority:
  - Target skill:
```

## Mapping to Downstream Skills

- `Key Insights` + `Behavioral Patterns` -> `$persona-creator` persona dimensions
- `Pain Points` + `Key Insights` -> `$journey-mapper` pain point layer
- `Recommendations` + `Key Insights` -> `$design-spec-writer` problem context
- `Behavioral Patterns` + `Pain Points` -> `$competitive-analyzer` evaluation dimensions

## Validation Checklist

Before final output, confirm:
- Every insight has at least one supporting quote or data point.
- Every behavioral pattern includes segment information.
- Every recommendation maps to a downstream action or skill.
- Confidence levels are stated for the overall study and per-insight.
