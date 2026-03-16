# Persona Handoff Schema

Use this schema when passing persona output to downstream skills like `$journey-mapper`, `$design-spec-writer`, or `$design-critique`.

## Required Handoff Block

```markdown
## Persona Handoff

### Persona Summary
- Name:
- Role:
- Primary goal:
- Key frustration:
- Context:
- Evidence quality:

### Behavioral Dimensions
- Behavior 1:
- Behavior 2:
- Behavior 3:

### Decision Triggers
- Trigger 1:
- Trigger 2:

### Mental Models
- Model 1:
- Model 2:

### Tools & Touchpoints
- Tool/touchpoint 1:
- Tool/touchpoint 2:
```

## Mapping to Downstream Skills

- `Persona Summary` + `Behavioral Dimensions` -> `$journey-mapper` persona scope
- `Persona Summary` + `Decision Triggers` -> `$design-spec-writer` user stories
- `Persona Summary` + `Mental Models` -> `$design-critique` evaluation lens
- `Behavioral Dimensions` + `Tools & Touchpoints` -> `$competitive-analyzer` evaluation criteria

## Validation Checklist

Before final output, confirm:
- Every persona has a primary goal and at least one frustration.
- Evidence quality is stated per persona.
- Behavioral dimensions are observable, not demographic.
- Anti-personas are included when relevant to scope decisions.
