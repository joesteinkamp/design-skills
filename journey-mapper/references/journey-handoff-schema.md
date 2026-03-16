# Journey Handoff Schema

Use this schema when passing journey map output to downstream skills like `$design-spec-writer`, `$design-critique`, or `$ab-test-planner`.

## Required Handoff Block

```markdown
## Journey Handoff

### Journey Context
- Persona:
- Scenario:
- Journey type:
- Key phases:

### Critical Pain Points
- Pain point 1:
  - Phase:
  - Severity:
  - Description:
- Pain point 2:
  - Phase:
  - Severity:
  - Description:

### Opportunities
- Opportunity 1:
  - Type:
  - Impact:
  - Related pain point:
- Opportunity 2:
  - Type:
  - Impact:
  - Related pain point:

### Emotional Low Points
- Low point 1:
  - Phase:
  - Trigger:
  - Current experience:
```

## Mapping to Downstream Skills

- `Critical Pain Points` + `Opportunities` -> `$design-spec-writer` problem context and scope
- `Journey Context` + `Emotional Low Points` -> `$design-critique` evaluation context
- `Opportunities` -> `$ab-test-planner` test candidates
- `Critical Pain Points` + `Journey Context` -> `$competitive-analyzer` evaluation scope

## Validation Checklist

Before final output, confirm:
- Every phase has actions, thoughts, and emotions documented.
- Every pain point has a severity rating.
- Opportunities map to specific pain points.
- Emotional arc covers all phases without gaps.
