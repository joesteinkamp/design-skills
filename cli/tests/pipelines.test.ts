import { describe, it, expect } from "vitest";
import { discoverPipelines, findPipeline } from "../src/pipelines/discover.js";
import { planExecution, parseInputFrom } from "../src/pipelines/runner.js";
import { PipelineSchema } from "../src/pipelines/schema.js";

describe("pipelines discovery", () => {
  it("loads all bundled pipelines", async () => {
    const { pipelines, errors } = await discoverPipelines("/tmp/__nx__");
    expect(errors).toEqual([]);
    expect(pipelines.length).toBeGreaterThanOrEqual(4);
    const names = pipelines.map((p) => p.pipeline.name);
    expect(names).toContain("research-to-design");
    expect(names).toContain("evaluation-suite");
    expect(names).toContain("design-to-dev");
    expect(names).toContain("workshop-to-figjam");
  });
});

describe("planExecution", () => {
  it("topologically batches steps", async () => {
    const p = await findPipeline("design-to-dev");
    expect(p).toBeDefined();
    const plan = planExecution(p!.pipeline);
    expect(plan[0]!.steps.map((s) => s.skill)).toEqual(["design-spec-writer"]);
    // accessibility-auditor and design-success-metrics-writer both depend only on design-spec-writer
    const batch2 = plan[1]!.steps.map((s) => s.skill).sort();
    expect(batch2).toEqual(["accessibility-auditor", "design-success-metrics-writer"]);
    // dev-handoff-writer depends on accessibility-auditor (transitively all)
    expect(plan[plan.length - 1]!.steps.map((s) => s.skill)).toEqual(["dev-handoff-writer"]);
  });

  it("supports --from to start mid-pipeline", async () => {
    const p = await findPipeline("design-to-dev");
    const plan = planExecution(p!.pipeline, "accessibility-auditor");
    // design-spec-writer should be dropped
    const allSteps = plan.flatMap((b) => b.steps.map((s) => s.skill));
    expect(allSteps).not.toContain("design-spec-writer");
    expect(allSteps).toContain("accessibility-auditor");
    expect(allSteps).toContain("dev-handoff-writer");
  });

  it("throws on a cycle", () => {
    const cyclic = PipelineSchema.parse({
      name: "cyclic",
      description: "test",
      steps: [
        { skill: "a", depends_on: ["b"] },
        { skill: "b", depends_on: ["a"] },
      ],
    });
    expect(() => planExecution(cyclic)).toThrow(/Cycle/);
  });
});

describe("parseInputFrom", () => {
  it("handles string and array forms", () => {
    expect(parseInputFrom({ skill: "x", input_from: "a.b", depends_on: [] })).toEqual([
      { skill: "a", outputKey: "b" },
    ]);
    expect(
      parseInputFrom({ skill: "x", input_from: ["a.b", "c.d"], depends_on: [] }),
    ).toEqual([
      { skill: "a", outputKey: "b" },
      { skill: "c", outputKey: "d" },
    ]);
  });

  it("returns empty when input_from is absent", () => {
    expect(parseInputFrom({ skill: "x", depends_on: [] })).toEqual([]);
  });
});
