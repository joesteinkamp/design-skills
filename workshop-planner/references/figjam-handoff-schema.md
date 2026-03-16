# FigJam Handoff Schema

Use this schema exactly when handing output to `$figjam-workshop-prompt-creator`.

## Required Handoff Block

```markdown
## FigJam Creator Handoff

### Workshop Profile
- Topic:
- Audience:
- Duration:
- Team size:
- Workshop objective:
- Key constraints:

### Assumptions
- Assumption 1:
- Assumption 2:
- Assumption 3:

### Agenda
- Block 1:
  - Title:
  - Time box:
  - Purpose:
- Block 2:
  - Title:
  - Time box:
  - Purpose:
- Block 3:
  - Title:
  - Time box:
  - Purpose:
- Block 4:
  - Title:
  - Time box:
  - Purpose:

### Exercises
- Exercise:
  - Objective:
  - Participant prompt:
  - Duration:
  - Board zones:
  - Expected outputs:

### Discussion Prompts
- Prompt 1:
- Prompt 2:
- Prompt 3:

### Synthesis Requirements
- Decisions:
- Risks/Blockers:
- Commitments:
- Owners:
- Immediate Next Steps (next 2 weeks):
- Future Next Steps (30/60/90 days):
- Success Signals (observable behaviors):

### Output Rules
- Keep prompts copy/paste-ready.
- Keep language specific and facilitator-friendly.
- Keep ownership and timing explicit.
```

## Mapping to figjam-workshop-prompt-creator

Map these fields directly into the downstream prompt-pack sections:

- `Workshop Profile` -> `Workshop Profile`
- `Assumptions` -> `Assumptions`
- `Agenda` + `Exercises` -> `Prompt A - FigJam Board Builder`
- `Agenda` + `Discussion Prompts` -> `Prompt B - Facilitator Script`
- `Synthesis Requirements` + `Output Rules` -> `Prompt C - Synthesis + Action Plan`

## Validation Checklist

Before final output, confirm:
- Every agenda block has a time box.
- Every exercise includes board zones and expected outputs.
- Discussion prompts include at least one ownership prompt.
- Synthesis requirements include immediate and future next steps.

