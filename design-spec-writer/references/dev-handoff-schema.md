# Dev Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Feature name | yes | text | concise feature identifier |
> | Problem statement | yes | text | clear problem being solved |
> | Target personas | yes | list | min 1 named persona |
> | Decision stage | yes | text | current stage in decision process |
> | User Stories | yes | list | min 2 stories; each needs Description, Acceptance criteria, Priority |
> | Acceptance criteria | yes | list | must be testable per story |
> | Priority (story) | yes | text | relative priority per story |
> | Interaction Summary | yes | list | min 1 screen/component; each needs States, Key interactions, Edge cases |
> | States | yes | list | from: default, empty, loading, error, disabled (per component) |
> | Accessibility Requirements | yes | list | min 2 requirements |
> | Content Requirements | no | list | each needs Variants and Character limits |
> | Open Questions | no | list | each needs Owner and Impact on implementation |

Use this schema when passing design spec output to `$dev-handoff-writer`.

## Required Handoff Block

```markdown
## Dev Handoff Summary

### Feature Context
- Feature name:
- Problem statement:
- Target personas:
- Decision stage:

### User Stories
- Story 1:
  - Description:
  - Acceptance criteria:
  - Priority:
- Story 2:
  - Description:
  - Acceptance criteria:
  - Priority:

### Interaction Summary
- Screen/component 1:
  - States: (default, empty, loading, error, disabled)
  - Key interactions:
  - Edge cases:
- Screen/component 2:
  - States:
  - Key interactions:
  - Edge cases:

### Accessibility Requirements
- Requirement 1:
- Requirement 2:

### Content Requirements
- Content block 1:
  - Variants:
  - Character limits:

### Open Questions
- Question 1:
  - Owner:
  - Impact on implementation:
```

## Mapping to Downstream Skills

- `Feature Context` + `User Stories` -> `$dev-handoff-writer` implementation scope
- `Interaction Summary` -> `$dev-handoff-writer` component specs
- `Accessibility Requirements` -> `$accessibility-auditor` audit scope
- `User Stories` + `Feature Context` -> `$ab-test-planner` test context

## Validation Checklist

Before final output, confirm:
- Every user story has testable acceptance criteria.
- Every screen/component has all relevant states documented.
- Edge cases are identified for each interaction.
- Accessibility requirements are specified per story.
- Open questions have owners and deadlines.
