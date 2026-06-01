import path from "node:path";
import { findSkill } from "../skills/discover.js";
import { assemblePrompt } from "../skills/prompt.js";
import { invokeClaude } from "../claude/invoke.js";
import { collectInputs } from "../io/prompts.js";
import { writeOutput } from "../io/fs.js";
import { slugify } from "../io/slug.js";

interface RunOptions {
  yes?: boolean;
  dryRun?: boolean;
  outDir?: string;
  model?: string;
  maxBudgetUsd?: number;
}

export async function runCommand(
  name: string,
  flags: Record<string, unknown>,
  opts: RunOptions,
): Promise<void> {
  const skill = await findSkill(name);
  if (!skill) {
    console.error(`Skill not found: ${name}`);
    process.exitCode = 1;
    return;
  }

  const interactive = !opts.yes && process.stdin.isTTY === true;
  const collected = await collectInputs(skill.frontmatter, { flags, interactive });
  const assembled = await assemblePrompt(skill, collected.inputs);
  const model = opts.model ?? assembled.model;

  if (opts.dryRun) {
    process.stdout.write("=== SYSTEM PROMPT ===\n");
    process.stdout.write(assembled.systemPrompt + "\n\n");
    process.stdout.write("=== USER MESSAGE ===\n");
    process.stdout.write(assembled.userMessage + "\n\n");
    process.stdout.write(`=== MODEL ===\n${model ?? "(default)"}\n`);
    return;
  }

  console.error(`Running ${skill.frontmatter.name}...`);
  const { raw, envelope } = await invokeClaude({
    systemPrompt: assembled.systemPrompt,
    userMessage: assembled.userMessage,
    model,
    maxBudgetUsd: opts.maxBudgetUsd,
  });

  const category = skill.frontmatter.category ?? "outputs";
  const outRoot = path.resolve(process.cwd(), opts.outDir ?? "design", category);

  // Honor envelope filename, but slugify defensively.
  const baseSlug = slugify(envelope.filename.replace(/\.md$/i, ""), skill.frontmatter.name);
  const primaryPath = await writeOutput(outRoot, `${baseSlug}.md`, envelope.body);
  console.error(`Wrote ${primaryPath}`);

  for (const side of envelope.sidecars ?? []) {
    const slug = slugify(side.filename.replace(/\.md$/i, ""), "sidecar");
    const p = await writeOutput(outRoot, `${baseSlug}.${slug}.md`, side.body);
    console.error(`Wrote ${p}`);
  }

  if (typeof raw.total_cost_usd === "number") {
    console.error(`(cost: $${raw.total_cost_usd.toFixed(4)})`);
  }
}
