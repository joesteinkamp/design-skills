# Interview Scorecard Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Role | yes | text | role title |
> | Level | yes | text | level/band (e.g. IC4, senior, staff) |
> | Round | yes | enum | portfolio / craft / collaboration / leadership |
> | Mode | yes | enum | generate / score |
> | Competencies assessed | yes | list | min 3; scoped to this round |
> | Interviewer | yes | text | named person or role |
> | Date | yes | text | interview date or "TBD" |
> | Competency Rubric | yes | table | columns: Competency, What to Probe, Below Bar, At Bar, Above Bar; min 3 rows |
> | What to Probe | yes | text | observable behaviors that reveal the competency |
> | Rating Anchors | yes | text | per level, describe observable behavior — not adjectives |
> | Question Bank | yes | list | per competency: min 2 open behavioral questions, each with min 1 follow-up probe |
> | Follow-up probes | yes | list | push for the candidate's actual role, the tradeoff, how they knew it worked |
> | Evaluation | conditional | table | columns: Competency, Rating, Evidence; required when Mode is score |
> | Rating | conditional | enum | strong yes / yes / no / strong no / not assessed (per competency) |
> | Evidence | conditional | text | specific behavior or direct quote from notes |
> | Recommendation | yes | enum | strong yes / yes / no / strong no |
> | Recommendation rationale | yes | text | must tie to the competency scores |
> | Notes for Debrief | yes | list | min 1; what to dig into next, unresolved signal |

Use this as the default response structure for `interview-scorecard`.

## Interview Context

- Role:
- Level:
- Round: (portfolio / craft / collaboration / leadership)
- Mode: (generate / score)
- Competencies assessed:
- Interviewer:
- Date:

## Competency Rubric

Anchors describe observable behavior at this level, not adjectives.

| Competency | What to Probe | Below Bar | At Bar | Above Bar |
|------------|---------------|-----------|--------|-----------|
| | | | | |
| | | | | |
| | | | | |

## Question Bank

### [Competency 1]
- Q1: (open behavioral — "Tell me about a time...", "Walk me through how you...")
  - Probe:
  - Probe:
- Q2:
  - Probe:

### [Competency 2]
(repeat structure)

### [Competency 3]
(repeat structure)

## Evaluation

> Complete only when Mode is score. Mark a competency "not assessed" if the notes contain no supporting evidence.

| Competency | Rating | Evidence (specific behavior or quote) |
|------------|--------|---------------------------------------|
| | | |
| | | |
| | | |

## Recommendation

- Overall: (strong yes / yes / no / strong no)
- Rationale: (must map to the competency scores above)

## Notes for Debrief

- What other interviewers should dig into:
- Unresolved signal / what this round could not assess:

---

## Starter Rubric Example

### Competency: Craft (visual & interaction)

| What to Probe | Below Bar | At Bar | Above Bar |
|---------------|-----------|--------|-----------|
| How they make and defend visual/interaction decisions, attention to states and edge cases | Showed final screens but could not explain why; missed empty/error/loading states | Walked through decisions with rationale; covered the main states | Showed the decision space they ruled out and why; designed states and transitions other candidates skip |

### Sample behavioral questions
- "Walk me through a screen you're proud of. What were the alternatives you considered, and why did you land here?"
  - Probe: "What did the first version look like, and what made you change it?"
  - Probe: "How did you handle the empty and error states?"
- "Tell me about a time you had to cut scope on the craft. How did you decide what to protect?"
  - Probe: "Who did you involve in that call?"
