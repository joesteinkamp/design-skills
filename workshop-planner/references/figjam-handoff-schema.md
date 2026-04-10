# FigJam Handoff Schema

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Topic | yes | text | clear workshop subject |
> | Audience | yes | text | who will participate |
> | Duration | yes | text | time value |
> | Team size | yes | number | positive integer |
> | Workshop objective | yes | text | specific, measurable outcome |
> | Key constraints | no | list | known blockers or limitations |
> | Assumptions | yes | list | min 3 items |
> | Agenda blocks | yes | list | min 3; each needs Title, Time box, Purpose |
> | Time box | yes | text | duration per agenda block |
> | Exercises | yes | list | min 1; each needs Objective, Participant prompt, Duration, Board zones, Expected outputs |
> | Participant prompt | yes | text | copy-ready facilitator prompt |
> | Board zones | yes | list | named zones for FigJam board per exercise |
> | Expected outputs | yes | list | what each exercise produces |
> | Discussion Prompts | yes | list | min 3; must include at least one ownership prompt |
> | Decisions | yes | list | synthesis requirement; decisions made |
> | Risks/Blockers | yes | list | synthesis requirement |
> | Commitments | yes | list | synthesis requirement |
> | Owners | yes | list | synthesis requirement; named owners |
> | Immediate Next Steps | yes | list | next 2 weeks |
> | Future Next Steps | yes | list | 30/60/90 days |
> | Success Signals | yes | list | observable behaviors |
> | Output Rules | yes | list | copy/paste-ready, specific, facilitator-friendly, explicit ownership and timing |

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

