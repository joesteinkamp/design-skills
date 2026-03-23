# Progress Rating Guide

Reference for consistently rating objective and key result progress.

## Status Scale

| Status | Icon | Definition | When to Use |
|--------|------|------------|-------------|
| On track | 🟢 | Progress is consistent with achieving the target by end of cycle. | Evidence shows steady progress. No intervention needed. |
| Needs attention | 🟡 | Behind pace, but recoverable with focused effort or minor scope adjustment. | Progress has slowed or a soft deadline was missed. Recovery is possible with action. |
| At risk | 🔴 | Unlikely to achieve the target without significant intervention or objective revision. | Little to no progress, major blockers, or insufficient time remaining. |
| Achieved | 🔵 | Target has been fully met. | Evidence confirms the key result is done. |
| Blocked | ⚪ | Cannot progress due to external dependency. | Progress is impossible until a dependency is resolved — this is not about effort. |

## Rating Decision Tree

```
Has significant progress been made?
├── Yes → Is the pace sufficient to finish by end of cycle?
│   ├── Yes → 🟢 On track
│   └── No → Can it be recovered with focused effort?
│       ├── Yes → 🟡 Needs attention
│       └── No → 🔴 At risk
├── No → Is it blocked by something external?
│   ├── Yes → ⚪ Blocked
│   └── No → Is there still enough time to complete it?
│       ├── Yes → 🟡 Needs attention
│       └── No → 🔴 At risk
└── Already done → 🔵 Achieved
```

## Progress Calculation Patterns

### Countable Key Results
"Complete 3 of X" → Progress = completed / target × 100%
- 0 of 3 = 0%
- 1 of 3 = 33%
- 2 of 3 = 67%
- 3 of 3 = 100%

### Metric-Based Key Results
"Improve X from baseline to target" → Progress = (current - baseline) / (target - baseline) × 100%
- Baseline: 34%, Target: 50%, Current: 42% → (42-34)/(50-34) = 50%

### Artifact-Based Key Results
"Deliver [artifact] reviewed and accepted" → Use milestone progress:
- 0% — Not started
- 25% — In progress, early draft
- 50% — Draft complete, in review
- 75% — Reviewed, revisions in progress
- 100% — Accepted / shipped

### Observation-Based Key Results
"Manager observes [behavior] consistently" → Use frequency:
- 0% — Not yet observed
- 33% — Observed once
- 67% — Observed in most relevant situations
- 100% — Consistent pattern across all relevant situations

## Pace Assessment

Use this formula to determine if progress is on pace:

**Expected progress at mid-cycle check-in:**
- Linear KRs (steady work): Should be ~50% at mid-cycle.
- Front-loaded KRs (research, discovery): Should be ~60-70% at mid-cycle.
- Back-loaded KRs (launch, ship): May be ~30-40% at mid-cycle if setup work is done.

**Pace check:**
- Actual progress ≥ expected → 🟢
- Actual progress within 15 points of expected → 🟡
- Actual progress > 15 points below expected → 🔴

## Trend Indicators

| Indicator | Meaning |
|-----------|---------|
| ↑ Improving | Progress has accelerated since last check-in |
| → Steady | Progress pace is unchanged |
| ↓ Slipping | Progress has slowed or stalled since last check-in |

## Common Rating Mistakes

- **Everything is green:** If all objectives are 🟢, you're either not looking closely enough or the objectives were too easy. At least one should challenge the report.
- **Yellow = failure:** 🟡 is not a bad rating — it's a signal for action. The point of mid-cycle tracking is to catch yellows before they become reds.
- **Ignoring context changes:** An objective set 8 weeks ago may no longer be relevant. Don't rate against stale targets — recommend revision instead.
- **Gut-feel ratings:** Every rating must cite evidence. "Feels on track" is not a rating.
- **Forgetting manager commitments:** If the manager promised support and didn't deliver, that's a legitimate reason a KR is behind. Track it.
