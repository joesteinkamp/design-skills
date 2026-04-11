---
name: stakeholder-presentation-writer
description: "Structure compelling design presentations for stakeholder audiences with narrative arcs, evidence framing, and clear decision asks. Use when requests involve stakeholder updates, executive summaries, design rationale presentations, or communicating design decisions to non-design audiences — not design critiques, not dev handoffs."

# Discovery & Auto-Selection
category: documentation
tags: [presentation, stakeholders, narrative, decision-ask, objection-handling]
complexity: moderate
output_length: long

# Skill Graph
upstream_skills: [design-spec-writer, research-synthesizer, design-critique, design-success-metrics-writer]
downstream_skills: []

# Input Contract
inputs:
  - name: presentation_topic
    required: true
    type: text
    description: "Design work, decision, or initiative to present"
  - name: design_spec
    required: false
    type: design_spec
    source_skill: design-spec-writer
    description: "Design spec with rationale and requirements"
  - name: research_insights
    required: false
    type: research_synthesis
    source_skill: research-synthesizer
    description: "Research synthesis with evidence and recommendations"
  - name: critique_findings
    required: false
    type: design_critique
    source_skill: design-critique
    description: "Design critique findings and priority actions"
  - name: metrics_framework
    required: false
    type: metrics_framework
    source_skill: design-success-metrics-writer
    description: "Success metrics and measurement plan"

# Output Contract
outputs:
  - name: presentation
    type: stakeholder_presentation
    template: references/presentation-template.md

# Batch Execution
batch:
  enabled: true
  input_key: presentation_topic
  parallelizable: true

# Tool Integration
tools:
  - name: google_slides
    actions: [create_presentation, add_slide, update_slide]
    when: "Creating the actual presentation deck"
  - name: figma
    actions: [get_screenshot]
    when: "Pulling design visuals for presentation slides"
  - name: gmail
    actions: [create_draft, send_email]
    when: "Drafting and sending pre-read email to stakeholders"
  - name: slack
    actions: [send_message, share_link]
    when: "Sharing deck link for async review"
  - name: google_calendar
    actions: [find_availability, get_event]
    when: "Checking meeting time constraints and attendee availability"

# User Input Gates
user_inputs:
  - step: 1
    question: "Who is the audience? (names + roles)"
    required: true
  - step: 1
    question: "What specific decision do you need from them?"
    required: true
  - step: 2
    question: "What is the time constraint?"
    options: [5_min, 15_min, 30_min, 60_min]
    default: 30_min
  - step: 4
    question: "What objections do you anticipate?"
    required: false
  - step: 6
    question: "Create a Google Slides deck? Send a pre-read email?"
    required: false
    default: false
---

# Stakeholder Presentation Writer

## Overview

Use this skill to structure persuasive design presentations that communicate decisions, rationale, and recommendations to stakeholders. Accepts design specs (from `$design-spec-writer`), research findings (from `$research-synthesizer`), critique outcomes (from `$design-critique`), or any design artifact and produces a structured presentation narrative.

The output should be presentation-ready: a clear narrative arc, evidence-backed arguments, anticipated objections, and explicit decision asks that drive alignment. Output is formatted for use in Google Slides, Keynote, Figma, or as a structured Notion document. When the target tool is specified, adapt the slide structure and layout guidance accordingly.

## Tool Integration

This skill can connect to the following tools. For each, the skill describes what it does and how to proceed if the tool is unavailable.

| Tool | What This Skill Does With It | If Unavailable |
|------|------------------------------|----------------|
| **Google Slides** | Create the actual presentation deck with slides, speaker notes, and visual placeholders | Output a slide-by-slide outline with title, key message, visual guidance, and speaker notes; user builds deck manually |
| **Figma** | Pull design screenshots for embedding as visuals in presentation slides | Include Figma URLs and frame references; user takes screenshots manually |
| **Gmail** | Draft and send a pre-read email to stakeholders with deck link, context summary, and decision ask | Output pre-read email as draft text; user sends manually |
| **Slack** | Share deck link in relevant channel for async review before the meeting | Include sharing instructions; user posts manually |
| **Google Calendar** | Check meeting time constraints and attendee availability to right-size the presentation | User states time constraint; skill adapts accordingly |

## Workflow

### Step 1: Define the presentation context
- **Reads:** presentation_topic, design_spec (if provided), research_insights (if provided), critique_findings (if provided), metrics_framework (if provided)
- **Ask user:** "Who is the audience? (names + roles)" — needed to tailor the narrative, evidence selection, and objection handling.
- **Ask user:** "What specific decision do you need from them?" — the entire presentation is structured around this ask.
- **Actions:**
  - Identify the audience: who is in the room, their roles, and what they care about.
  - Determine the presentation goal: inform, align, get approval, or request resources.
  - Clarify the key decision(s) the audience needs to make.
  - Note constraints: time limit, format, and prior context the audience has.
- **Tool action — Google Calendar (if available):** Check meeting time and attendee list to confirm time constraint and audience composition.
- **If** research_insights provided → flag that evidence-led narrative is available.
- **If** no research evidence and no metrics_framework → flag that presentation will rely on design rationale and competitive examples.
- **Produces:** Populated `Presentation Brief` section

### Step 2: Craft the narrative arc
- **Reads:** Step 1 output
- **Ask user:** "What is the time constraint?" — options: 5 min, 15 min, 30 min, 60 min. Default: 30 min.
- **Actions:**
  - Open with the problem or opportunity (why this matters now).
  - Set context: user evidence, business metrics, or competitive pressure.
  - Present the design direction with rationale (not just the solution).
  - Show alternatives considered and why they were deprioritized.
  - Close with a clear ask: decision, feedback, or next steps.
- **If** research evidence available → lead with data narrative (user quotes, metrics, behavioral patterns).
- **If** no evidence → lead with design rationale + competitive examples to build credibility.
- **Checkpoint:** "Here's the narrative arc: [problem] → [context] → [direction] → [ask]. Does this framing match how you want to position this?"
- **Produces:** Populated `Narrative Arc` section

### Step 3: Build the evidence layer
- **Reads:** Step 1 context, research_insights (if provided), metrics_framework (if provided)
- **Actions:**
  - Map each design decision to supporting evidence (research, data, heuristics, best practices).
  - Select the strongest 2-3 proof points per decision (don't overwhelm).
  - Include user quotes, metrics, or competitive examples where available.
  - Cite sources: link to research studies, analytics, or upstream skill outputs.
- **Tool action — Figma (if available):** Pull design screenshots for key screens and states to embed as slide visuals.
- **If** Figma unavailable → reference Figma URLs with frame names for manual screenshot capture.
- **Produces:** Populated `Evidence & Supporting Data` section

### Step 4: Anticipate objections
- **Reads:** Step 1 audience context, Step 2 narrative
- **Ask user:** "What objections do you anticipate?" — helps surface concerns the designer already knows about.
- **Actions:**
  - Identify likely pushback based on audience priorities (cost, timeline, risk, scope).
  - Prepare concise responses for each objection.
  - Acknowledge trade-offs honestly—don't oversell.
  - Identify what is not yet resolved and frame it as a known next step.
- **Produces:** Populated `Objection Handling` section

### Step 5: Define the ask
- **Reads:** All previous step outputs
- **Actions:**
  - Write explicit decision points: what you need from the audience.
  - Provide clear options if a decision is needed (with a recommendation).
  - Specify what happens after approval (next steps, timeline, owners).
  - Define what happens if the decision is deferred.
- **Checkpoint:** "The ask is: [specific decision]. Is this the right level of commitment to request?"
- **Produces:** Populated `Decision Ask & Next Steps` section

### Step 6: Format, publish, and distribute
- **Reads:** All previous step outputs
- **Ask user:** "Create a Google Slides deck? Send a pre-read email?" — Default: output as structured outline.
- **Actions:**
  - Use `references/presentation-template.md` for the response structure.
  - Use `references/slide-framework.md` for slide-by-slide breakdown guidance.
  - Ensure the presentation works within the stated time constraint.
- **If** Google Slides available and user confirms → create deck with slides, speaker notes, and visual placeholders.
- **Tool action — Google Slides (if available and user confirms):** Create presentation deck with one slide per outline card, including title, key message, visual placeholder, and speaker notes.
- **If** Google Slides unavailable → output slide-by-slide outline with all content structured for manual deck creation.
- **Tool action — Gmail (if available and user confirms):** Draft pre-read email with deck link, 3-sentence context summary, the specific decision ask, and suggested pre-read time.
- **Tool action — Slack (if available):** Share deck link in relevant channel with a brief summary for async review.
- **If** Gmail unavailable → output pre-read email as draft text.
- **Next steps:** Based on output, suggest:
  - "After the meeting, capture decisions and action items — consider a follow-up summary email."
  - "If the presentation led to a research request, use `$research-plan-writer` to scope the study."
  - "If design changes are approved, update the spec with `$design-spec-writer`."
- **Produces:** Complete presentation with all required sections
- **References:** `references/presentation-template.md`, `references/slide-framework.md`

## Output Contract

Return sections in this order. Sections marked required must always appear.

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Presentation Brief | yes | - | key-value fields: audience, goal, key decisions, time constraint, format, prior context |
| Narrative Arc | yes | - | structured arc: problem/opportunity, context, design direction with rationale, alternatives considered, closing ask |
| Slide-by-Slide Outline | yes | 1 slide | slide cards with title, key message, visual guidance, speaker notes, and time allocation |
| Evidence & Supporting Data | yes | 1 proof point | evidence mapped to decisions with 2-3 proof points per decision (quotes, metrics, competitive examples) |
| Objection Handling | yes | 2 objections | objection-response pairs with trade-off acknowledgments |
| Decision Ask & Next Steps | yes | 1 ask | explicit decision points with options, recommendation, post-approval steps, and deferral consequences |

## Quality Bar

Revise before finalizing if any rule fails.

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Presentation Brief | Audience is described specifically ("VP of Product, 2 Engineering leads, Head of Design"), not generically ("stakeholders") | blocker |
| QB-02 | Narrative Arc | Narrative follows the problem → context → solution → ask arc | blocker |
| QB-03 | Evidence & Supporting Data | Every design decision has at least one supporting evidence point (research quote, metric, competitive example, or heuristic) | blocker |
| QB-04 | Narrative Arc | At least one deprioritized alternative is shown with rationale | blocker |
| QB-05 | Objection Handling | Objection handling section has at least 2 anticipated pushbacks | blocker |
| QB-06 | Decision Ask & Next Steps | The ask is specific ("approve Option B so engineering can begin sprint planning next Monday"), not vague ("let us know what you think") | blocker |
| QB-07 | Slide-by-Slide Outline | Presentation does not exceed the stated time constraint by more than 10% | warning |
| QB-08 | Narrative Arc | Every recommendation acknowledges what it costs (time, scope, complexity, or risk) — trade-offs are not hidden | warning |

## Reference Navigation

Read only what is needed:
- presentation output shell: `references/presentation-template.md`
- slide structure guide: `references/slide-framework.md`

## Trigger Examples

### Positive
Intents: [write_presentation, prepare_stakeholder_update, structure_narrative, frame_decision_ask, handle_objections]

- "Help me present this design to leadership."
- "Structure a design review for the product team."
- "Write an executive summary of our research findings."
- "Prepare a presentation to get buy-in for the redesign."

### Negative
- "Write a design spec for the checkout flow." -> `$design-spec-writer`
- "Critique this design." -> `$design-critique`
- "Synthesize this research." -> `$research-synthesizer`

### Ambiguous
- "I need to share this with stakeholders." -> Clarify: whether they need a presentation, a document, or just talking points?
