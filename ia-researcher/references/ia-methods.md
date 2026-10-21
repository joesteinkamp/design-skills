# IA Methods

## Choosing a method

| Question | Method | Output |
|----------|--------|--------|
| How do users group and name this content? | Open card sort | Groups, user-written labels, similarity |
| Do our proposed categories make sense? | Closed card sort | Placement agreement per category |
| Mostly settled categories, but users may need new ones | Hybrid card sort | Agreement + new user categories |
| Can people find things in this structure? | Tree test | Success, directness, time, first-click |
| Where do people click first on the real UI? | First-click test | First-click success per task |

Typical sequence: open sort → draft tree → tree test → revise → tree test again.

## Sample sizes (rules of thumb)

| Study | Minimum | Comfortable |
|-------|---------|-------------|
| Open card sort | 15 | 20–30 |
| Closed card sort | 20 | 30+ |
| Tree test | 50 | 50–100 per tree variant |

Below the minimum, report findings as directional.

## Card sort metrics

- **Agreement (closed/hybrid):** % of participants who placed a card in its most common category.
- **Similarity matrix:** for each card pair, % of participants who put both in the same group.
- **Clusters:** hierarchical clustering (average linkage) on 1 − similarity; cut where groups are interpretable.
- **Orphans:** cards with no category above ~40% agreement.

## Tree test metrics

- **Success:** % who chose a correct destination. Report a 95% interval (Wilson or adjusted Wald).
- **Directness:** % who reached their answer without backtracking.
- **Time:** median time to answer (not mean — times are skewed).
- **First click:** % whose first click was on the correct top-level branch; strongly predicts success.
- **Incorrect destinations:** top wrong answers per task show which labels absorb intent.

### Interpreting success

| Success | Read as |
|---------|---------|
| ≥ 80% | Findable |
| 60–79% | Findable with friction; check directness |
| < 60% | Problem: inspect first clicks and wrong destinations |

## Writing tree test tasks

- Phrase as a goal: "You were charged twice this month. Where would you go to sort it out?"
- Never reuse the target label's words ("Where are billing settings?" gives away "Billing").
- One correct area per task (multiple correct nodes are allowed if equivalent).
- Randomize task order; 8–10 tasks per participant.
