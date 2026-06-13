# Maturity Assessment Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Org/team | yes | text | must name the team or org being assessed |
> | Structure | yes | text | team size, reporting lines, and structure |
> | Evidence basis | yes | enum | evidence-backed / mixed / self-report |
> | Model used | yes | text | default set or named custom model |
> | Level scale | yes | text | the named 5-level scale used |
> | Target level | yes | text | aspired level and horizon; "not specified" if none |
> | Date of assessment | yes | text | valid date |
> | Overall maturity | yes | text | overall level that reflects the dimension spread, not a flat average |
> | Dimension Scorecard | yes | table | one row per dimension |
> | Dimension | yes | text | named capability dimension |
> | Current level | yes | enum | 1 Initial / 2 Developing / 3 Defined / 4 Managed / 5 Optimizing |
> | Target | yes | enum | 1 Initial / 2 Developing / 3 Defined / 4 Managed / 5 Optimizing |
> | Evidence | yes | text | at least one supporting fact or stated rationale |
> | Gap | yes | text | explicit current-vs-target gap |
> | Roadmap to Next Level | yes | list | min 1 action per gapped dimension |
> | Action type | yes | enum | quick-win / systemic |
> | Risks & Dependencies | yes | list | min 2 items |
> | Open Questions | yes | list | min 1 item |

Use this as the default response structure for `design-maturity-assessment`.

## Level Scale

| Level | Name | Meaning |
|-------|------|---------|
| 1 | Initial | Ad hoc, inconsistent, reactive; depends on individuals |
| 2 | Developing | Some practices exist but are uneven and not yet standard |
| 3 | Defined | Practices are documented, standard, and broadly applied |
| 4 | Managed | Practices are measured, governed, and improving on data |
| 5 | Optimizing | Practices are continuously optimized and influence the wider org |

## Assessment Context

- Org/team:
- Structure:
- Evidence basis: (evidence-backed / mixed / self-report)
- Model used:
- Level scale: 1 Initial / 2 Developing / 3 Defined / 4 Managed / 5 Optimizing
- Target level:
- Date of assessment:

## Maturity Summary

- Overall maturity:
- One line per dimension (level + headline):
  - [Dimension]: [level] — [headline]

## Dimension Scorecard

| Dimension | Current Level | Target | Evidence | Gap |
|-----------|---------------|--------|----------|-----|
|           |               |        |          |     |

## Roadmap to Next Level

For each gapped dimension:
- Dimension:
  - Action 1: [quick-win / systemic]
  - Action 2: [quick-win / systemic]
  - Sequencing / dependency note:

## Risks & Dependencies

- Risk/dependency 1:
- Risk/dependency 2:

## Open Questions

- Question 1:

---

## Starter Example

Below is a concrete example of completed scorecard rows and a roadmap entry. Use as a quality reference.

### Dimension Scorecard (excerpt)

| Dimension | Current Level | Target | Evidence | Gap |
|-----------|---------------|--------|----------|-----|
| User research practice | 2 Developing | 4 Managed | 2 of 6 squads run regular research; no shared repository; insights cited in 3 of last 10 specs (artifact review) | 2 levels — research is squad-dependent and not yet standard or measured |
| Design system & tooling | 3 Defined | 4 Managed | Component library covers 80% of UI, documented in Storybook; no adoption metrics or governance board (self-report + repo audit) | 1 level — system exists and is standard but unmeasured and ungoverned |
| Cross-functional influence | 2 Developing | 3 Defined | Design reports into Eng, not a peer of PM; invited to roadmap reviews but not planning (org chart + interviews) | 1 level — present but reactive, not embedded in planning |

### Roadmap entry (excerpt)

**Dimension: User research practice (2 Developing -> 4 Managed)**
- Stand up a shared research repository and tag insights by squad and theme. [quick-win]
- Add a mandatory "evidence" field to the spec template citing research. [quick-win]
- Hire or assign a research lead to set standards and a quarterly research cadence across all 6 squads. [systemic]
- Define and track a research-coverage metric (% of shipped features with prior research). [systemic]
- Sequencing / dependency note: the repository and spec-field changes can land this quarter; the coverage metric depends on the research lead being in place first.
