import { discoverPipelines } from "../../pipelines/discover.js";

export async function pipelineListCommand(opts: { json?: boolean }): Promise<void> {
  const { pipelines, errors } = await discoverPipelines();
  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          pipelines: pipelines.map((p) => ({
            name: p.pipeline.name,
            description: p.pipeline.description,
            steps: p.pipeline.steps.map((s) => s.skill),
            source: p.source,
          })),
          errors,
        },
        null,
        2,
      ) + "\n",
    );
    return;
  }
  if (pipelines.length === 0) {
    console.log("No pipelines found.");
    return;
  }
  console.table(
    pipelines.map((p) => ({
      name: p.pipeline.name,
      steps: p.pipeline.steps.length,
      source: p.source,
      description: p.pipeline.description.slice(0, 60),
    })),
  );
  if (errors.length > 0) {
    console.error(`\n${errors.length} pipeline(s) failed to load:`);
    for (const e of errors) console.error(`  ${e.path}: ${e.error}`);
  }
}
