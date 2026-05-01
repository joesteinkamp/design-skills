# sketch-to-code (Claude Code skill)

A portable Claude Code skill that converts hand-drawn UI wireframes into a self-contained HTML preview and a Next.js React component using shadcn/ui + Tailwind CSS. Also handles iterative refinement when you mark up a previous render with annotations.

The prompts and component catalog are distilled from the [ipad-sketch-to-web](https://github.com/joesteinkamp/ipad-sketch-to-web) iPadOS app, but the skill itself runs entirely inside Claude Code using its built-in vision — no Gemini API key required.

## Install

### Project-level (this repo)

Already in place at `.claude/skills/sketch-to-code/`. Claude Code picks it up automatically when run from the repo root.

### User-level (any project)

Copy the directory into `~/.claude/skills/`:

```sh
mkdir -p ~/.claude/skills
cp -r .claude/skills/sketch-to-code ~/.claude/skills/
```

After that, any Claude Code session in any project can invoke it.

## Use

Just ask, with an image:

```
Convert this sketch into a webpage:
/path/to/wireframe.png
```

```
Build the React component from this whiteboard photo: ./mockups/login.jpg
```

For refinement, drop an annotated screenshot:

```
Apply these changes:
./annotated.png
Pin 1: change the heading to "Welcome back"
Pin 2: make this card 2 columns
```

## Files

- `SKILL.md` — frontmatter + instructions Claude follows when the skill triggers
- `references/system-prompt.md` — generation rubric (sketch → code)
- `references/refinement-prompt.md` — annotation interpretation rules
- `references/component-catalog.json` — 20 shadcn/ui components with sketch patterns
- `references/preview-template.html` — base HTML template with shadcn CSS variables
