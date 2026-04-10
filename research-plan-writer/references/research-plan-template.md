# Research Plan Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Study title | yes | text | concise descriptive title |
> | Research type | yes | enum | generative / evaluative |
> | Business decision this informs | yes | text | must tie to a specific decision |
> | Sponsor/stakeholder | yes | text | named person or role |
> | Lead researcher | yes | text | named person or role |
> | Status | yes | enum | draft / approved / recruiting / in-field / complete |
> | Research Questions | yes | list | min 3, max 5 |
> | Assumptions to Validate | yes | table | columns: Assumption, Confidence, Evidence, Risk if Wrong; min 2 rows |
> | What We Already Know | no | list | existing data sources |
> | Primary method | yes | text | named research method |
> | Justification | yes | text | why this method fits |
> | Qualitative/quantitative/mixed | yes | enum | qualitative / quantitative / mixed |
> | Session format | yes | enum | 1:1 / group / self-directed |
> | Session duration | yes | text | time value |
> | Session count | yes | number | must justify sample size |
> | Moderation | yes | enum | moderated / unmoderated |
> | Environment | yes | enum | remote / in-person / contextual |
> | Limitations | yes | list | min 1 with mitigation |
> | Discussion Guide sections | yes | list | Warm-Up + min 2 themed sections + Cool-Down |
> | Target segments | yes | list | min 1 segment |
> | Include criteria | yes | list | min 1 criterion |
> | Exclude criteria | yes | list | min 1 criterion |
> | Participant count | yes | number | must include justification |
> | Screening Questionnaire | yes | table | columns: #, Question, Qualifying Answer, Disqualifying Answer; min 3 rows |
> | Diversity & Representation | yes | key-value | dimensions to balance + accessibility accommodations |
> | Incentive | yes | key-value | Amount, Type (gift card / cash / product credit), Delivery |
> | Timeline | yes | table | columns: Phase, Duration, Start, End; min 5 phases |
> | Team Roles | yes | table | columns: Role, Person, Responsibilities |
> | Consent & Data Handling | yes | key-value | consent form must be yes; includes recording, storage, retention, PII |
> | Risks & Mitigation | yes | table | columns: Risk, Likelihood, Impact, Mitigation; min 1 row |

Use this as the default response structure for `research-plan-writer`.

## Research Overview

- Study title:
- Research type: (generative / evaluative)
- Business decision this informs:
- Sponsor/stakeholder:
- Lead researcher:
- Status: (draft / approved / recruiting / in-field / complete)

## Research Questions & Assumptions

### Research Questions
- RQ1:
- RQ2:
- RQ3:
- RQ4:
- RQ5:

### Assumptions to Validate
| Assumption | Confidence | Evidence (if any) | Risk if Wrong |
|------------|-----------|-------------------|---------------|
| | | | |
| | | | |

### What We Already Know
- Existing data source 1:
- Existing data source 2:

## Methodology

### Method Selection
- Primary method:
- Secondary method: (if mixed)
- Justification:
- Qualitative/quantitative/mixed:

### Method Details
- Session format: (1:1 / group / self-directed)
- Session duration:
- Session count:
- Moderation: (moderated / unmoderated)
- Environment: (remote / in-person / contextual)

### Limitations
- Limitation 1:
- Limitation 2:
- Mitigation:

## Research Instrument

### Discussion Guide / Survey / Protocol

(Use `discussion-guide-template.md` for interviews; include survey instrument inline for surveys.)

#### Warm-Up (5 min)
- Q1:
- Q2:

#### Theme 1: [Theme Name] (10-15 min)
- Q3:
  - Probe:
  - Probe:
- Q4:
  - Probe:

#### Theme 2: [Theme Name] (10-15 min)
- Q5:
  - Probe:
- Q6:
  - Probe:

#### Theme 3: [Theme Name] (10-15 min)
- Q7:
  - Probe:
- Q8:
  - Probe:

#### Cool-Down (5 min)
- Q9: "Is there anything else you'd like to share?"
- Q10: "What question should I have asked that I didn't?"

## Recruitment Plan

### Participant Profile
- Target segments:
- Include criteria:
- Exclude criteria:
- Participant count: (with justification)

### Screening Questionnaire
| # | Question | Qualifying Answer | Disqualifying Answer |
|---|----------|------------------|---------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Diversity & Representation
- Dimensions to balance:
- Accessibility accommodations:

### Incentive
- Amount:
- Type: (gift card / cash / product credit)
- Delivery: (immediate / within X days)

### Recruitment Source
- Channel 1:
- Channel 2:

## Logistics & Timeline

### Timeline
| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| Planning & approval | | | |
| Recruitment | | | |
| Pilot session | | | |
| Field research | | | |
| Analysis & synthesis | | | |
| Readout & share-out | | | |

### Team Roles
| Role | Person | Responsibilities |
|------|--------|-----------------|
| Lead researcher | | |
| Moderator | | |
| Note-taker | | |
| Observer(s) | | |

### Tools & Platforms
- Recruiting:
- Scheduling:
- Session platform:
- Recording:
- Note-taking:
- Analysis:

### Consent & Data Handling
- Consent form: (yes / no — must be yes)
- Recording consent: (audio / video / screen)
- Data storage:
- Data retention period:
- PII handling:

### Risks & Mitigation
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| | | | |
| | | | |

### Downstream Handoff
- Analysis output feeds: `$research-synthesizer`
- Findings inform: (e.g., `$persona-creator`, `$journey-mapper`, `$design-spec-writer`)
