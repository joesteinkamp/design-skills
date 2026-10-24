# Survey Metrics Reference

## Standard scores

| Metric | Question | Formula | Range |
|--------|----------|---------|-------|
| NPS | "How likely are you to recommend…" 0–10 | % promoters (9–10) − % detractors (0–6) | −100 to 100 |
| CSAT | Satisfaction, usually 1–5 | % of responses 4–5 ("top-2 box") | 0–100% |
| CES | Effort, usually 1–7 ("easy to…") | Mean score; also report % 5–7 | 1–7 |
| SUS | 10 items, 1–5 | Odd items: score − 1; even items: 5 − score; sum × 2.5 | 0–100 |
| UMUX-Lite | 2 items, 1–7 | ((item1 − 1) + (item2 − 1)) / 12 × 100 | 0–100 |

SUS benchmarks: 68 ≈ average (50th percentile); ≥ 80.3 ≈ top 10%. Report SUS as a score, not a percentage.

## Confidence intervals

- **Proportion (e.g., % top-2 box):** Wilson interval. For n ≥ 30 and p not near 0/1, p ± 1.96·√(p(1−p)/n) is close enough.
- **NPS:** treat each response as +1 (promoter), 0 (passive), −1 (detractor); CI = mean ± 1.96·sd/√n, × 100.
- **Mean (SUS, CES):** mean ± t·sd/√n.

Rough margin of error for a proportion near 50%: n=100 → ±10 pts; n=400 → ±5 pts; n=1,000 → ±3 pts.

## Comparing segments

| Data | Test | Effect size |
|------|------|-------------|
| Proportions (top-2 box, promoter %) | Chi-square / two-proportion z-test | Difference in points; Cohen's h |
| Likert (ordinal) | Mann-Whitney U | Rank-biserial r |
| Means (SUS) | Welch's t-test | Cohen's d |
| NPS between groups | Bootstrap CI of the difference, or t-test on the +1/0/−1 coding | Difference in points |

- Minimum n ≈ 30 per segment before comparing.
- Testing many cuts inflates false positives: apply Holm or Benjamini-Hochberg correction and say so.
- "Significant" ≠ "important": report effect size and whether it would change a decision.

## Data quality rules

- **Speeders:** completion time < ⅓ of median.
- **Straight-liners:** identical answers across a grid of ≥ 5 items, especially with reverse-worded items.
- **Duplicates:** same respondent ID or identical response fingerprint.
- **Open text:** gibberish or copy-pasted text across respondents.

## Open-ended coding

1. Read a random sample (~100 or 20%) and draft codes inductively.
2. Write a codebook: code name, definition, include/exclude rules, example.
3. Apply to all responses; allow multiple codes per response.
4. Report counts as % of respondents who answered the question, not of all respondents.
5. Quote verbatim, including typos; never paraphrase inside quotation marks.
