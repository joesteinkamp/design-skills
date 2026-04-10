# Persona Card Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Persona Summary Table | yes | table | one row per persona; columns: Name, Role, Primary Goal, Key Frustration, Evidence Quality |
> | Persona Name | yes | text | memorable, descriptive name |
> | Role | yes | text | job title or situational role |
> | Age range | no | text | range, not exact age |
> | Context | yes | text | work environment, tools, team structure |
> | Evidence quality | yes | enum | research-backed / partially-evidenced / assumed |
> | Primary goal | yes | text | one clear goal statement |
> | Secondary goals | no | list | min 1 item if provided |
> | Frustrations | yes | list | min 3 items |
> | Behaviors | yes | list | min 3 items; observable, not demographic |
> | Mental Models | yes | key-value | must include: how they think about the problem, assumptions, decision triggers |
> | Day-in-the-Life Scenario | yes | text | 3-5 sentences; narrative form |
> | Tools & Touchpoints | yes | list | min 2 items |
> | Anti-Personas | no | list | each must include Name, Why out of scope, Risk if designed for them |
> | Assumptions Log | no | list | each must include Source (research/stakeholder input/inferred), Confidence, Validation needed |

Use this as the default response structure for `persona-creator`.

## Persona Summary Table

| Name | Role | Primary Goal | Key Frustration | Evidence Quality |
|------|------|-------------|-----------------|------------------|
|      |      |             |                 |                  |

## Persona Cards

For each persona:

### [Persona Name]

- Role:
- Age range:
- Context: (work environment, tools, team structure)
- Evidence quality: (research-backed / partially-evidenced / assumed)

#### Goals
- Primary goal:
- Secondary goals:

#### Frustrations
- Frustration 1:
- Frustration 2:
- Frustration 3:

#### Behaviors
- Key behavior 1:
- Key behavior 2:
- Key behavior 3:

#### Mental Models
- How they think about the problem:
- Assumptions they carry:
- Decision triggers:

#### Day-in-the-Life Scenario
A brief narrative (3-5 sentences) describing a typical interaction with the product/service in context.

#### Tools & Touchpoints
- Tool 1:
- Tool 2:
- Touchpoint 1:
- Touchpoint 2:

## Anti-Personas

For each anti-persona (optional):
- Name:
- Why they are out of scope:
- Risk if designed for them:

## Assumptions Log

- Assumption 1:
  - Source: (research / stakeholder input / inferred)
  - Confidence:
  - Validation needed:

## Downstream Handoff

Produce this section using `persona-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of a completed persona card. Use this as a quality reference, not a copy-paste template.

### Maya the Momentum Builder

- **Role:** Mid-level product designer at a 200-person SaaS company
- **Evidence quality:** Research-backed (8 interviews, 3 contextual inquiries)
- **Design relevance:** Primary persona

**Goals:**
- Ship design work faster without sacrificing craft quality. *(research-backed)*
- Reduce back-and-forth with engineering during handoff. *(research-backed)*
- Build a portfolio of shipped products, not just mockups. *(partially-evidenced)*

**Frustrations:**
- Spends 40% of her week in Figma polishing screens that change after eng review. *(research-backed)*
- Handoff documents go stale within days of writing them. *(research-backed)*
- Feels pressure to be "pixel perfect" but also "move fast." *(partially-evidenced)*

**Behaviors:**
- Designs in high fidelity from the start — skips wireframes. *(research-backed)*
- Keeps a personal component library separate from the team's design system. *(research-backed)*
- Screenshots competitor products weekly for inspiration. *(partially-evidenced)*

**Mental Models:**
- Believes design quality = visual polish, not interaction completeness.
- Thinks of engineering as "downstream" rather than collaborative.

**Decision Triggers:**
- Will adopt a new tool if it saves > 1 hour/week.
- Abandons processes that require more than 3 steps to follow.

**Day-in-the-Life:**
Maya starts her morning reviewing Figma comments from yesterday's eng review — three screens need state changes she hadn't considered. She spends 90 minutes updating empty and error states, then joins a design critique where feedback focuses on visual consistency rather than the interaction gaps she just fixed. After lunch, she writes a handoff doc in Notion, knowing it will be outdated by Friday.
