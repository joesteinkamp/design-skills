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

**Auth.** If `ANTHROPIC_API_KEY` is set, skills run with `claude -p --bare` (fast, ignores your hooks and CLAUDE.md). Otherwise they run without `--bare`, so your claude.ai login works — `--bare` never reads OAuth credentials.

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
design eval                                  # run every golden eval case and grade it
design eval design-critique --no-judge       # structural checks only (no judge call)
design mcp add figma                         # wire a known MCP server
design mcp list
design mcp doctor
```

## How it works

1. **Discovery.** Scans `./skills/`, `~/.design/skills/`, and the bundled `design-skills/*/` for `SKILL.md` files (project > user > bundled precedence).
2. **Prompt assembly.** Combines `SKILL.md` body + any templates referenced under `outputs[].template|schema` + an output-envelope instruction asking the model to emit `{ filename, body, sidecars? }`.
   Every reference file the SKILL.md mentions (rubrics, checklists, cross-skill files) is inlined, plus rules for running non-interactively: unanswered questions fall back to defaults and are listed under `Assumptions`, and no external writes happen without an explicit yes. Mid-run `checkpoint` gates are never asked up front.
3. **Invocation.** Spawns `claude -p --bare --system-prompt … --output-format json --json-schema …`, pipes the user message on stdin, and reads back the JSON envelope.
4. **Output.** Writes `body` to `./design/<skill category>/<slug>.md` and any `sidecars` alongside it.

   The project's `.mcp.json` is passed with `--mcp-config`, and the directory of any input that is a file path (e.g., a sketch image) is passed with `--add-dir` so the model can open it.

## Evals

`evals/<skill>.yaml` holds golden cases: inputs, gate answers keyed by flag (same as `design run`), and optional `expect.contains` / `expect.not_contains`. `design eval` runs each case and grades it three ways:

1. **Structure** — every required Output Contract section appears as a heading.
2. **Expectations** — the `contains` / `not_contains` strings.
3. **Quality bar** — a judge model grades the output against the skill's Quality Bar table; any failed **blocker** fails the case.

Results print as PASS/FAIL per case and are written to `./design/evals/eval-<timestamp>.json`. The exit code is non-zero if any case fails, so it can gate CI. Each case costs roughly $0.20–$0.50; use `--no-judge` for a cheaper structural pass. `npm test` checks offline that every skill has a valid case.

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
