# design — CLI for product designers

A small TypeScript CLI that runs the `design-skills` collection by wrapping the [Claude Code CLI](https://docs.claude.com/en/docs/claude-code). External integrations (Figma, Linear, Notion, GitHub) are delegated to MCP servers.

## Install (local dev)

```sh
cd cli
npm install
npm run build
npm link    # exposes `design` on PATH
```

Requires Node 20+ and the `claude` CLI available on PATH.

## Commands

```sh
design init                                  # scaffold ./design/ + .designrc.json + .mcp.json
design list                                  # show discovered skills
design describe design-spec-writer           # show contract for one skill
design run design-spec-writer                # interactive
design run design-spec-writer --yes \
  --feature_description "checkout redesign" \
  --decision-stage build-ready               # one-shot (CI-friendly)
design run accessibility-auditor --dry-run   # print prompt without spending tokens
design mcp add figma                         # wire a known MCP server
design mcp list
design mcp doctor

design pipeline list                         # list multi-skill pipelines
design pipeline describe design-to-dev       # show DAG with parallel batches
design pipeline run design-to-dev --dry-run  # print the execution plan
```

## How it works

1. **Discovery.** Scans `./skills/`, `~/.design/skills/`, and the bundled `design-skills/*/` for `SKILL.md` files (project > user > bundled precedence). Same for `pipelines/*.yaml`.
2. **Prompt assembly.** Combines `SKILL.md` body + any templates referenced under `outputs[].template|schema` + an output-envelope instruction asking the model to emit `{ filename, body, sidecars? }`.
3. **Invocation.** Spawns `claude -p --bare --system-prompt … --output-format json --json-schema …`, pipes the user message on stdin, and reads back the JSON envelope.
4. **Output.** Writes a YAML provenance frontmatter block + `body` to `./design/<skill category>/<slug>.md`, plus any `sidecars` alongside it. Appends a run event to `./design/.runs.jsonl`.
5. **Pipelines.** `design pipeline run <name>` topologically sorts the steps, runs each batch (parallel where `depends_on` allows), and threads outputs via `input_from` so downstream steps receive prior step file paths.
6. **Next: nudges.** After each successful `design run`, prints up to 3 `design run <downstream>` suggestions from the skill graph. Suppressed inside pipelines and behind `--no-next`.

## Provenance frontmatter

Every generated markdown file starts with:

```yaml
---
generated_by: design-cli/0.2.0
skill: design-spec-writer
model: sonnet
inputs_hash: <16-char sha>
generated_at: 2026-06-15T12:34:56.000Z
cost_usd: 0.0123
---
```

The `inputs_hash` is deterministic — an identical re-run produces the same hash. Use it to detect drift between Claude's draft and the human-edited version downstream.

## Short flag keys

`user_inputs` in `SKILL.md` can declare a short `key:` instead of being slugified from the full question:

```yaml
user_inputs:
  - step: 5
    question: "Want me to create Linear tickets for each user story?"
    key: create-linear-tickets        # → --create-linear-tickets
    required: false
    default: false
```

Without `key:`, the question is slugified (e.g. `--want-me-to-create-linear-tickets-for-each-user-story` — usable, but cumbersome).

## Skill source precedence

```
./skills/<name>/         # project-local (highest)
~/.design/skills/<name>/ # user-global
<bundled>/<name>/        # design-skills repo (lowest)
```

A same-named skill in a higher tier overrides lower tiers.

## Adding a new skill

Create `./skills/my-skill/SKILL.md` with the same frontmatter shape used by bundled skills (see `cli/src/skills/schema.ts` for the canonical zod schema). Optional: add `agents/claude.yaml` to override the model, and `references/*.md` files referenced from `outputs[].template`.

## Testing

```sh
npm test            # unit tests (discovery, prompt assembly, slugging)
npm run typecheck
```

A `--dry-run` against any skill is the cheapest E2E check — it asserts the full pipeline up to (but not including) the `claude` subprocess.
