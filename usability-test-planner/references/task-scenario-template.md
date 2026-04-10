# Task Scenario Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Context Setting | yes | text | realistic situation; no internal jargon; not step-by-step instructions |
> | User Goal | yes | text | states what to achieve, not how; no solution path revealed |
> | Success Criteria | yes | list | must include: Completion, Correctness, Confidence; all observable |
> | Measurables | yes | key-value | Completion rate, Time on task, Error count, Path efficiency, Satisfaction (1-7 scale) |
> | Writing Checklist | yes | list | all 7 checklist items must be addressed |
> | Task Order | yes | number | follows ordering principles: simple first, hardest in middle, exploratory last |

Reference guide for writing effective usability test task scenarios.

## Task Scenario Structure

**Template:** Imagine you are [context]. You want to [goal]. Using this [prototype/product], [action framing].

### Components

#### 1. Context Setting
- Place the participant in a realistic situation.
- Use language natural to the user, not internal jargon.
- Bad: "Navigate to the account settings module." (instructions, not a scenario)
- Good: "Imagine you just moved to a new city and need to update your shipping address."

#### 2. User Goal (Not Steps)
- State what the participant wants to achieve, not how to achieve it.
- Bad: "Click the menu, then click Settings, then click Profile." (step-by-step)
- Good: "Find where you would change your profile photo."

#### 3. Success Criteria
- Define observable signals that the task is complete.
- Completion: Did the participant reach the target state?
- Correctness: Did they make the right selection or input?
- Confidence: Did they express certainty they were done?

#### 4. Measurables
- Completion rate: % of participants who finish successfully
- Time on task: seconds/minutes from start to completion signal
- Error count: wrong clicks, backtracking, dead ends
- Path efficiency: actual steps vs. optimal steps
- Satisfaction: post-task difficulty rating (1-7 scale)

## Writing Checklist

- [ ] Scenario uses realistic, relatable context
- [ ] Goal is stated without revealing the solution path
- [ ] No internal jargon or feature names the user wouldn't know
- [ ] No leading language that hints at the correct action
- [ ] Success criteria are observable and unambiguous
- [ ] Task is completable within the prototype's scope
- [ ] Task maps to at least one research question

## Task Ordering Principles

1. Start with a simple, confidence-building task.
2. Progress to moderate complexity.
3. Place the most critical tasks in the middle (peak attention).
4. End with an exploratory or open-ended task.
5. Never place the hardest task first.

## Common Anti-Patterns

- **Leading language:** "Use the blue button to..." tells the participant where to look.
- **Compound tasks:** "Find your order history and then change your payment method" tests two things at once.
- **Impossible tasks:** Ensure the task is completable in the current prototype state.
- **Jargon exposure:** "Access the CMS dashboard" uses internal terminology.
- **Yes/no tasks:** "Can you find the search bar?" has a trivial answer; prefer "You want to find a specific product—show me how you'd do that."
