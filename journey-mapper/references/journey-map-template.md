# Journey Map Template

Use this as the default response structure for `journey-mapper`.

## Journey Overview

- Persona:
- Scenario:
- Journey type: (current-state / future-state / service-blueprint)
- Start point:
- End point:
- Total duration:
- Channels/touchpoints covered:

## Phase Map

For each phase (4-7 phases):

### Phase [N]: [Phase Name]

- Goal:
- Duration:
- Touchpoints:
- Channels:

#### Actions
- Action 1:
- Action 2:

#### Thoughts
- Thought 1:
- Thought 2:

#### Emotions
- Emotion: (with valence: positive / neutral / negative)
- Intensity: (high / medium / low)

#### Pain Points
- Pain point 1:
  - Severity: (critical / high / moderate / low)
  - Description:
- Pain point 2:
  - Severity:
  - Description:

#### Moments of Delight
- Delight 1:

## Emotional Arc

A summary of the emotional trajectory across all phases, noting high points, low points, and transitions.

## Opportunity Map

For each opportunity:
- Opportunity:
- Related pain point:
- Phase:
- Type: (quick-win / strategic / systemic)
- Impact: (high / medium / low)
- Effort: (high / medium / low)

## Key Insights

- Insight 1:
- Insight 2:
- Insight 3:

## Downstream Handoff

Produce this section using `journey-handoff-schema.md` when passing to other skills.

---

## Starter Example

Below is a concrete example of one completed journey phase. Use as a quality reference.

### Phase 3: First Configuration (Day 1, 15-45 minutes)

**Goal:** Set up the product to match the user's workflow.

**Touchpoints:** Web app settings page, email invite flow, help docs
**Channels:** Desktop browser, email
**Duration:** 15-45 minutes

**Actions:**
- Opens settings from the sidebar.
- Searches for "team" to find team management.
- Invites 3 colleagues via email.
- Attempts to configure notification preferences — gives up after 2 minutes.

**Thoughts:**
- "Where is the team setup? I expected it in onboarding."
- "Why can't I set roles when I invite people?"
- "I'll figure out notifications later — this is too buried."

**Emotions:**
- Valence: Negative → Neutral
- Intensity: Medium (frustration, not rage — user persists but notes friction)

**Pain Points:**
- Team setup is not part of onboarding flow — users must hunt for it. (Severity: Major)
- Role assignment requires a separate step after invite acceptance. (Severity: Minor)
- Notification settings are 4 levels deep in the settings hierarchy. (Severity: Major)

**Moments of Delight:**
- Email invites are sent instantly with a clear preview of what the recipient will see.
