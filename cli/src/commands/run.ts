import path from "node:path";
import { defaultCategory, findSkill, type DiscoveredSkill } from "../skills/discover.js";
import { assemblePrompt } from "../skills/prompt.js";
import { invokeClaude } from "../claude/invoke.js";
import { collectInputs } from "../io/prompts.js";
import { writeOutput } from "../io/fs.js";
import { slugify } from "../io/slug.js";
import { provenanceBlock } from "../io/provenance.js";
import { logRunEvent } from "../io/eventlog.js";
import { CLI_VERSION } from "../version.js";

interface RunOptions {
  yes?: boolean;
  dryRun?: boolean;
  outDir?: string;
  model?: string;
  maxBudgetUsd?: number;
  noNext?: boolean;
}

function slugForOutput(filename: string, fallback: string): string {
  return slugify(filename.replace(/\.md$/i, ""), fallback);
}

function nextNudges(skill: DiscoveredSkill): string[] {
  return skill.frontmatter.downstream_skills.slice(0, 3).map((name) => `  design run ${name}`);
}

export interface RunResult {
  outputPath: string;
  sidecarPaths: string[];
  costUsd?: number;
}

export async function runCommand(
  name: string,
  flags: Record<string, unknown>,
  opts: RunOptions,
): Promise<RunResult | undefined> {
  const skill = await findSkill(name);
  if (!skill) {
    console.error(`Skill not found: ${name}`);
    process.exitCode = 1;
    return undefined;
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

  const outRoot = path.resolve(process.cwd(), opts.outDir ?? "design");
  const skillDir = path.join(outRoot, defaultCategory(skill));

  console.error(`Running ${skill.frontmatter.name}...`);
  const startedAt = Date.now();
  try {
    const { raw, envelope } = await invokeClaude({
      systemPrompt: assembled.systemPrompt,
      userMessage: assembled.userMessage,
      model,
      maxBudgetUsd: opts.maxBudgetUsd,
    });
    const duration = Date.now() - startedAt;

    const provenance = provenanceBlock({
      skill: skill.frontmatter.name,
      model,
      inputs,
      userAnswers,
      cliVersion: CLI_VERSION,
      generatedAt: new Date(),
      costUsd: raw.total_cost_usd,
      sessionId: raw.session_id,
    });
    const baseSlug = slugForOutput(envelope.filename, skill.frontmatter.name);
    const outputPath = await writeOutput(skillDir, `${baseSlug}.md`, provenance + envelope.body);
    console.error(`Wrote ${outputPath}`);
    const sidecarPaths: string[] = [];
    for (const side of envelope.sidecars ?? []) {
      const slug = slugForOutput(side.filename, "sidecar");
      const p = await writeOutput(skillDir, `${baseSlug}.${slug}.md`, provenance + side.body);
      console.error(`Wrote ${p}`);
      sidecarPaths.push(p);
    }

    if (typeof raw.total_cost_usd === "number") {
      console.error(`(cost: $${raw.total_cost_usd.toFixed(4)})`);
    }

    await logRunEvent(outRoot, {
      ts: new Date().toISOString(),
      skill: skill.frontmatter.name,
      duration_ms: duration,
      exit: 0,
      cost_usd: raw.total_cost_usd,
      output: path.relative(process.cwd(), outputPath),
    });

    if (!opts.noNext) {
      const nudges = nextNudges(skill);
      if (nudges.length > 0) console.error(`\nNext:\n${nudges.join("\n")}`);
    }

    return { outputPath, sidecarPaths, costUsd: raw.total_cost_usd };
  } catch (err) {
    await logRunEvent(outRoot, {
      ts: new Date().toISOString(),
      skill: skill.frontmatter.name,
      duration_ms: Date.now() - startedAt,
      exit: 1,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
