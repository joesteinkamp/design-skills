import path from "node:path";
import { defaultCategory, findSkill } from "../skills/discover.js";
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

// Schema validates `.+\.md$` on the envelope; strip extension once here.
function slugForOutput(filename: string, fallback: string): string {
  return slugify(filename.replace(/\.md$/i, ""), fallback);
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
  const { inputs, userAnswers } = await collectInputs(skill, { flags, interactive });
  const assembled = await assemblePrompt(skill, inputs, userAnswers);
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

  const outRoot = path.resolve(
    process.cwd(),
    opts.outDir ?? "design",
    defaultCategory(skill),
  );
  const baseSlug = slugForOutput(envelope.filename, skill.frontmatter.name);
  console.error(`Wrote ${await writeOutput(outRoot, `${baseSlug}.md`, envelope.body)}`);

  for (const side of envelope.sidecars ?? []) {
    const slug = slugForOutput(side.filename, "sidecar");
    console.error(
      `Wrote ${await writeOutput(outRoot, `${baseSlug}.${slug}.md`, side.body)}`,
    );
  }

  if (typeof raw.total_cost_usd === "number") {
    console.error(`(cost: $${raw.total_cost_usd.toFixed(4)})`);
  }
}
