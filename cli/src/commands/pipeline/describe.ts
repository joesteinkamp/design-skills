import { findPipeline } from "../../pipelines/discover.js";
import { planExecution } from "../../pipelines/runner.js";

export async function pipelineDescribeCommand(name: string): Promise<void> {
  const p = await findPipeline(name);
  if (!p) {
    console.error(`Pipeline not found: ${name}`);
    process.exitCode = 1;
    return;
  }
  const pipeline = p.pipeline;
  const lines: string[] = [];
  lines.push(`# ${pipeline.name}`);
  lines.push("");
  lines.push(pipeline.description);
  lines.push("");
  lines.push(`- source: ${p.source}`);
  lines.push(`- path: ${p.path}`);
  lines.push(`- steps: ${pipeline.steps.length}`);

  if (pipeline.entry_points.length > 0) {
    lines.push("", "## Entry points");
    for (const e of pipeline.entry_points) lines.push(`- ${e.step}: ${e.when ?? ""}`);
  }

  lines.push("", "## Execution plan");
  const plan = planExecution(pipeline);
  plan.forEach((batch, i) => {
    const parallel = batch.steps.length > 1 ? " (parallel)" : "";
    lines.push(`${i + 1}.${parallel}`);
    for (const s of batch.steps) {
      const deps = s.depends_on.length > 0 ? ` ← ${s.depends_on.join(", ")}` : "";
      lines.push(`   - ${s.skill}${deps}`);
    }
  });

  if (pipeline.optional_additions.length > 0) {
    lines.push("", "## Optional additions");
    for (const o of pipeline.optional_additions) {
      lines.push(`- ${o.skill}: ${o.when ?? ""}`);
    }
  }
  console.log(lines.join("\n"));
}
