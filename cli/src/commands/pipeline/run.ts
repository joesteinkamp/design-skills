import path from "node:path";
import { findPipeline } from "../../pipelines/discover.js";
import { findSkill } from "../../skills/discover.js";
import { planExecution, parseInputFrom } from "../../pipelines/runner.js";
import { runCommand } from "../run.js";
import { logRunEvent } from "../../io/eventlog.js";

interface PipelineRunOptions {
  yes?: boolean;
  dryRun?: boolean;
  from?: string;
  outDir?: string;
  model?: string;
}

export async function pipelineRunCommand(
  name: string,
  opts: PipelineRunOptions,
): Promise<void> {
  const p = await findPipeline(name);
  if (!p) {
    console.error(`Pipeline not found: ${name}`);
    process.exitCode = 1;
    return;
  }

  const plan = planExecution(p.pipeline, opts.from);
  console.error(
    `Pipeline: ${p.pipeline.name} (${plan.length} batch${plan.length === 1 ? "" : "es"})`,
  );
  plan.forEach((batch, i) => {
    const tag = batch.steps.length > 1 ? " (parallel)" : "";
    console.error(`  ${i + 1}.${tag} ${batch.steps.map((s) => s.skill).join(", ")}`);
  });

  if (opts.dryRun) return;

  const outRoot = path.resolve(process.cwd(), opts.outDir ?? "design");
  const startedAt = Date.now();
  // Track the most recent output path per skill so downstream steps can read it.
  const outputsBySkill = new Map<string, string>();

  try {
    for (const batch of plan) {
      const results = await Promise.all(
        batch.steps.map(async (step) => {
          const skill = await findSkill(step.skill);
          if (!skill) throw new Error(`Skill not found: ${step.skill} (referenced by pipeline)`);

          // Build inputs: prior outputs threaded through input_from become file paths.
          const flags: Record<string, unknown> = {};
          for (const ref of parseInputFrom(step)) {
            const file = outputsBySkill.get(ref.skill);
            if (file) flags[ref.outputKey] = file;
          }

          const result = await runCommand(step.skill, flags, {
            yes: true,
            outDir: opts.outDir,
            model: opts.model,
            noNext: true,
          });
          return { step: step.skill, result };
        }),
      );
      for (const { step, result } of results) {
        if (result) outputsBySkill.set(step, result.outputPath);
      }
    }
    await logRunEvent(outRoot, {
      ts: new Date().toISOString(),
      skill: "(pipeline)",
      pipeline: p.pipeline.name,
      duration_ms: Date.now() - startedAt,
      exit: 0,
    });
    console.error(`\nPipeline complete: ${p.pipeline.name}`);
  } catch (err) {
    await logRunEvent(outRoot, {
      ts: new Date().toISOString(),
      skill: "(pipeline)",
      pipeline: p.pipeline.name,
      duration_ms: Date.now() - startedAt,
      exit: 1,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}
