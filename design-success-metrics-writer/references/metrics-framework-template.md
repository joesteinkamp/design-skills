# Metrics Framework Template

> **Field Definitions** — use for output validation.
>
> | Field | Required | Type | Validation |
> |-------|----------|------|------------|
> | Product/feature | yes | text | specific product or feature name |
> | Design initiative | yes | text | describes the initiative |
> | Core user problem | yes | text | specific user problem being addressed |
> | Business objective | yes | text | measurable business goal |
> | Upstream inputs | no | text | references to personas, journeys, specs if available |
> | User Outcomes | yes | list | min 1 per persona; each has Persona/segment, Desired behavioral change, Current state, Target state |
> | Business Outcomes | yes | list | min 1 objective; each has Leading indicator and Lagging indicator |
> | Primary Metrics | yes | list | 1-2 only; each has Definition, Type, Measurement method, Data source, Baseline, Target, Timeframe, Tied to user goal |
> | Metric Type | yes | enum | behavioral / attitudinal / business |
> | Secondary Metrics | yes | list | 2-4 metrics; same fields as Primary minus Tied to user goal |
> | Guardrail Metrics | yes | list | min 1; each has Definition, Measurement method, Threshold, Why it matters |
> | Metrics NOT to Track | no | list | each has Why excluded and Better alternative |
> | Why excluded | yes | enum | vanity metric / not actionable / gameable |
> | Instrumentation Needed | yes | list | min 1; each has Status and Owner |
> | Status | yes | enum | exists / needs implementation |
> | Data Sources | yes | list | min 1 source |
> | Cadence | yes | key-value | Daily monitoring, Weekly review, Post-launch milestone reviews |
> | Decision Triggers | yes | key-value | if exceeds target, if flat, if guardrail degrades |
> | Assumptions & Risks | yes | list | min 1; Confidence is high/medium/low; each has Validation needed |

Use this as the default response structure for `design-success-metrics-writer`.

## Design Context

- Product/feature:
- Design initiative:
- Core user problem:
- Business objective:
- Upstream inputs: (personas, journey maps, specs — if available)

## Outcome Goals

### User Outcomes
For each persona or user segment:
- Persona/segment:
- Desired behavioral change:
- Current state:
- Target state:

### Business Outcomes
- Objective 1:
  - Leading indicator:
  - Lagging indicator:
- Objective 2:
  - Leading indicator:
  - Lagging indicator:

## Metrics Framework

### Primary Metrics (1-2 only)
- Metric name:
  - Definition:
  - Type: (behavioral / attitudinal / business)
  - Measurement method:
  - Data source:
  - Current baseline:
  - Target:
  - Timeframe:
  - Tied to user goal:

### Secondary Metrics (2-4)
- Metric name:
  - Definition:
  - Type:
  - Measurement method:
  - Data source:
  - Current baseline:
  - Target:
  - Timeframe:

### Guardrail Metrics (must-not-degrade)
- Metric name:
  - Definition:
  - Measurement method:
  - Threshold:
  - Why it matters:

### Metrics NOT to Track
- Metric name:
  - Why excluded: (vanity metric / not actionable / gameable)
  - Better alternative:

## Measurement Plan

### Instrumentation Needed
- Event/tracking 1:
  - Status: (exists / needs implementation)
  - Owner:
- Event/tracking 2:
  - Status:
  - Owner:

### Data Sources
- Source 1: (analytics platform, survey tool, support system, etc.)
- Source 2:

### Cadence
- Daily monitoring:
- Weekly review:
- Post-launch milestone reviews:
  - Milestone 1: (e.g., 1 week post-launch)
  - Milestone 2: (e.g., 1 month post-launch)

### Decision Triggers
- If primary metric exceeds target:
- If primary metric is flat:
- If guardrail metric degrades:

## Assumptions & Risks

- Assumption 1:
  - Confidence: (high / medium / low)
  - Validation needed:
- Assumption 2:
  - Confidence:
  - Validation needed:
- Risk 1:
  - Mitigation:

---

## Starter Example

Below is a concrete example of completed primary and guardrail metrics. Use as a quality reference.

### Primary Metric: Onboarding task completion rate

- **Definition:** Percentage of new users who complete all 3 onboarding steps (create profile, invite teammate, create first project) within 7 days of signup.
- **Type:** Behavioral
- **Measurement method:** Server-side event sequence: `signup_completed` → `profile_created` → `teammate_invited` → `first_project_created`, all within 7-day window.
- **Data source:** Amplitude (events already instrumented)
- **Current baseline:** 34% (30-day average, all new signups)
- **Target:** 50% within 90 days of redesign launch
- **Timeframe:** Measured weekly, reviewed at 30/60/90 day milestones
- **Tied to user goal:** Maya (primary persona) wants to "get set up and productive quickly" — completion of these 3 steps is the minimum for a productive workspace.
- **Why this metric:** Directly measures whether the redesigned onboarding reduces the 66% drop-off we see today. Chose completion rate over time-to-complete because speed without completion is meaningless.

### Guardrail Metric: 7-day retention rate

- **Definition:** Percentage of new users who return to the app at least once in days 2-7 after signup.
- **Measurement method:** Any authenticated session event in days 2-7 post-signup.
- **Data source:** Amplitude (event exists)
- **Current baseline:** 41%
- **Threshold:** Must not drop below 38% (3-point tolerance)
- **Why it matters:** A faster onboarding that skips meaningful setup could inflate completion rate but produce users who don't stick. If retention drops, the onboarding is trading depth for speed.

### Metric NOT to Track: Total signups

- **Why excluded:** Vanity metric — signups are driven by marketing spend, not onboarding design. Changes to onboarding will not meaningfully affect signup volume.
- **Better alternative:** Signup-to-activation rate (signups who complete onboarding ÷ total signups) isolates the onboarding design's contribution.
