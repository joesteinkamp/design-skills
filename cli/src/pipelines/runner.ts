import type { Pipeline, PipelineStep } from "./schema.js";

export interface PlannedBatch {
  steps: PipelineStep[];
}

// Kahn's algorithm — group steps into successive batches where each batch's
// dependencies are satisfied by prior batches. Steps in the same batch can run
// in parallel; batches run sequentially.
export function planExecution(pipeline: Pipeline, from?: string): PlannedBatch[] {
  const allSteps = pipeline.steps;
  const stepByName = new Map(allSteps.map((s) => [s.skill, s]));

  // If --from is provided, drop steps that come before it (and trim their deps from later steps).
  let active: PipelineStep[] = allSteps;
  if (from) {
    if (!stepByName.has(from)) {
      throw new Error(`Step "${from}" is not in pipeline "${pipeline.name}"`);
    }
    const fromIdx = allSteps.findIndex((s) => s.skill === from);
    active = allSteps.slice(fromIdx);
  }
  const activeNames = new Set(active.map((s) => s.skill));

  const remainingDeps = new Map<string, Set<string>>();
  for (const s of active) {
    remainingDeps.set(s.skill, new Set(s.depends_on.filter((d) => activeNames.has(d))));
  }

  const batches: PlannedBatch[] = [];
  while (remainingDeps.size > 0) {
    const ready = [...remainingDeps.entries()]
      .filter(([, deps]) => deps.size === 0)
      .map(([name]) => stepByName.get(name)!)
      .sort((a, b) => a.skill.localeCompare(b.skill));
    if (ready.length === 0) {
      const left = [...remainingDeps.keys()].join(", ");
      throw new Error(`Cycle or unresolved dependency in pipeline "${pipeline.name}": ${left}`);
    }
    batches.push({ steps: ready });
    for (const s of ready) remainingDeps.delete(s.skill);
    for (const deps of remainingDeps.values()) for (const r of ready) deps.delete(r.skill);
  }
  return batches;
}

// Parse `input_from` entries into `{ skill, outputKey }` references.
export function parseInputFrom(step: PipelineStep): { skill: string; outputKey: string }[] {
  if (!step.input_from) return [];
  const list = Array.isArray(step.input_from) ? step.input_from : [step.input_from];
  return list.map((s) => {
    const dot = s.indexOf(".");
    if (dot < 0) throw new Error(`Invalid input_from "${s}" in step ${step.skill}`);
    return { skill: s.slice(0, dot), outputKey: s.slice(dot + 1) };
  });
}
