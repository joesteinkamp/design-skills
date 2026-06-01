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
```

## How it works

1. **Discovery.** Scans `./skills/`, `~/.design/skills/`, and the bundled `design-skills/*/` for `SKILL.md` files (project > user > bundled precedence).
2. **Prompt assembly.** Combines `SKILL.md` body + any templates referenced under `outputs[].template|schema` + an output-envelope instruction asking the model to emit `{ filename, body, sidecars? }`.
3. **Invocation.** Spawns `claude -p --bare --system-prompt … --output-format json --json-schema …`, pipes the user message on stdin, and reads back the JSON envelope.
4. **Output.** Writes `body` to `./design/<skill category>/<slug>.md` and any `sidecars` alongside it.

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
