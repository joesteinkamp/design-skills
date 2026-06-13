# Portfolio Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Candidate | yes | text | candidate name or identifier |
> | Role | yes | text | target role title |
> | Level | yes | text | target level |
> | Recommendation | yes | enum | advance / hold / decline |
> | Overall read | yes | text | one-sentence summary against the target level |
> | Dimension Scores | yes | list | one entry per rubric dimension with score and level vs target |
> | Strengths to Confirm | yes | list | min 2; strengths worth validating in interview |
> | Gaps to Probe | yes | list | min 2; gaps and unclear attribution to test |
> | Interview Probes | yes | list | min 3; each maps to a gap |

Use this schema when passing portfolio output to downstream skills like `$interview-scorecard`.

## Required Handoff Block

```markdown
## Portfolio Handoff

### Candidate Summary
- Candidate:
- Role:
- Level:
- Recommendation:
- Overall read:

### Dimension Scores
- Dimension 1: score, level vs target
- Dimension 2: score, level vs target
- Dimension 3: score, level vs target

### Strengths to Confirm
- Strength 1:
- Strength 2:

### Gaps to Probe
- Gap 1:
- Gap 2:

### Interview Probes
- Probe 1 (targets gap):
- Probe 2 (targets gap):
- Probe 3 (targets gap):
```

## Mapping to Downstream Skills

- `Candidate Summary` + `Gaps to Probe` -> `$interview-scorecard` focus areas
- `Interview Probes` -> `$interview-scorecard` question set
- `Dimension Scores` + `Strengths to Confirm` -> `$interview-scorecard` rating criteria

## Validation Checklist

Before final output, confirm:
- A recommendation (advance / hold / decline) is stated.
- Every dimension score carries an explicit level-vs-target calibration.
- Every interview probe maps to a named gap.
- Unclear role attribution is carried forward as a gap to probe, not as confirmed credit.
