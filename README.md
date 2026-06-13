# Design Skills

A library of composable AI skills for product designers and design leaders. Each skill automates a recurring design task — from research synthesis to dev handoff to hiring — and produces a structured, quality-checked deliverable. Skills are designed to chain: the output of one is a typed input to the next.

The goal is to take the trivial, repetitive parts of design work off your plate (microcopy, alt text, QA redlines, meeting recaps, status rollups) and to raise the floor on the high-stakes deliverables (specs, journey maps, research synthesis, portfolios) with consistent structure and an explicit quality bar.

## How a skill works

Every skill is a self-contained folder with the same shape:

```
<skill-name>/
  SKILL.md                 # the skill: contract + workflow + quality bar
  agents/
    claude.yaml            # interface config per runtime
    openai.yaml
    generic.yaml
  references/
    <output>-template.md   # the output shell, with field typing
    <output>-handoff-schema.md   # contract for passing output downstream (when applicable)
```

`SKILL.md` is the heart of it. Each one declares:

- **Input Contract** — what it needs, what's required vs. optional, and which upstream skill can supply each input.
- **Output Contract** — the named sections it returns, in order, with required/min-items/format.
- **Tool Integration** — the tools it can use (Figma, Linear, Notion, etc.) and, critically, a manual fallback for every tool so the skill still works when nothing is connected.
- **User Input Gates** — the few questions it asks up front (and where) instead of guessing.
- **Workflow** — numbered steps, each declaring what it reads, does, and produces, with explicit conditional branches.
- **Quality Bar** — a table of pass-condition rules (blocker/warning) the output is checked against before it's returned.
- **Trigger Examples** — positive, negative (routes to the right sibling skill), and ambiguous cases, so the right skill gets selected.

## The skill graph

Skills reference each other as `$skill-name`. The registry in [`skills.yaml`](./skills.yaml) is the canonical graph — it records each skill's category, tags, complexity, upstream/downstream links, and tool needs, and is what discovery, auto-selection, and pipeline validation read from. A typical chain:

```
research-synthesizer → persona-creator → journey-mapper → design-spec-writer → dev-handoff-writer
```

## Catalog

**Research** — understand the problem
- `research-plan-writer` — interview/survey plans, methodology, discussion guides
- `research-synthesizer` — turn raw transcripts/surveys into themed, evidence-backed insights
- `inspiration-browser` — curate cross-industry design references for a challenge

**Planning** — decide what to build and where to aim
- `persona-creator` — evidence-based behavioral personas
- `design-spectrums-creator` — surface design tensions and trade-offs
- `workshop-planner` — agendas, exercises, time-boxed run-of-show
- `design-okr-writer` — design-team OKRs that ladder to company goals *(leader)*
- `roadmap-prioritizer` — RICE / impact-effort / WSJF prioritization and sequencing *(leader)*

**Documentation** — capture intent and hand it off
- `design-spec-writer` — specs, user stories, acceptance criteria, interaction details
- `journey-mapper` — experience maps with emotional arc and opportunities
- `user-flow-mapper` — task/screen flows, decision trees, error paths
- `dev-handoff-writer` — engineering-ready component specs and states
- `design-success-metrics-writer` — measurable success criteria and instrumentation
- `stakeholder-presentation-writer` — narrative decks with a clear decision ask
- `ux-copy-writer` — microcopy: labels, errors, empty states, tooltips
- `alt-text-generator` — accessible alt text and ARIA labels at scale
- `critique-notes-summarizer` — turn review notes into decisions and owned action items
- `design-rationale-writer` — ADR-style decision records with trade-offs
- `design-status-rollup` — leadership-ready status digests from raw updates *(leader)*

**Evaluation** — check quality and make calls
- `design-critique` — structured, severity-ranked design feedback
- `heuristic-evaluator` — Nielsen heuristic scoring with a severity matrix
- `accessibility-auditor` — WCAG audit with remediation patterns
- `design-qa-reviewer` — redline a built UI against the design source of truth
- `competitive-analyzer` — benchmark against competitors
- `ab-test-planner` — hypotheses, variants, and statistical test plans
- `usability-test-planner` — task scenarios and moderated test plans
- `portfolio-reviewer` — level-calibrated candidate portfolio evaluation *(leader/hiring)*
- `interview-scorecard` — competency rubrics and behavioral question banks *(leader/hiring)*
- `design-maturity-assessment` — leveled org maturity scorecard and roadmap *(leader)*

**Facilitation** — run the room
- `figjam-workshop-prompt-creator` — FigJam board prompts and facilitation flow

## Pipelines

Pre-defined multi-skill flows live in [`pipelines/`](./pipelines). Each declares steps, dependencies, parallel groups, and entry points so you can join at the right stage.

- `research-to-design` — research plan → synthesis → personas → journey → spec
- `design-to-dev` — spec → (a11y audit ‖ success metrics) → dev handoff
- `evaluation-suite` — heuristic ‖ accessibility ‖ critique, in parallel, against a design
- `workshop-to-figjam` — workshop plan → FigJam prompts
- `ship-readiness` — pre-ship gate: QA ‖ a11y ‖ heuristic ‖ critique against the built UI
- `hiring-loop` — portfolio review → calibrated interview scorecards
- `leadership-planning` — maturity assessment → OKRs → roadmap → status rollup

## Conventions

- **Quality-bar rules are pass-conditions** — each rule states what must be *true* for the output to ship, and the output is revised if any rule fails.
- **Every tool has a fallback** — skills degrade gracefully to manual/markdown output when a tool isn't connected.
- **Behavior over format** — skills produce structured content first; tool-specific formatting (Notion page, Linear ticket, FigJam board) is an optional last step.
- **Handoffs are typed** — when a skill feeds another, it emits a handoff block matching the downstream skill's schema, so chains stay lossless.
