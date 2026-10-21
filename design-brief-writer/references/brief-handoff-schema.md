# Brief Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Problem statement | yes | text | matches the brief |
> | Primary segment | yes | text | behavioral description |
> | Evidence strength | yes | enum | strong / moderate / assumed |
> | Goals | yes | list | min 2 |
> | Non-goals | yes | list | min 1 |
> | Constraints | yes | list | may be empty only if none exist |
> | Riskiest assumptions | yes | list | min 1; each with test method |
> | How Might We | yes | list | min 3 |
> | Target skill | no | text | valid downstream skill name |

Use this schema when passing a brief to `$research-plan-writer`, `$ideation-facilitator`, `$design-spec-writer`, or `$workshop-planner`.

## Required Handoff Block

```markdown
## Brief Handoff

### Problem
- Problem statement:
- Primary segment:
- Evidence strength: (strong / moderate / assumed)

### Scope
- Goals:
- Non-goals:
- Constraints:

### Open Space
- Riskiest assumptions (with test method):
- How Might We:

### Routing
- Target skill:
- What the target skill should focus on:
```
