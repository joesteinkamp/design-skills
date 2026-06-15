import { describe, it, expect } from "vitest";
import { provenanceBlock } from "../src/io/provenance.js";

describe("provenanceBlock", () => {
  const baseline = {
    skill: "design-spec-writer",
    model: "sonnet",
    inputs: { feature_description: "checkout redesign" },
    userAnswers: { "Decision stage?": "proposal" },
    cliVersion: "0.2.0",
    generatedAt: new Date("2026-06-15T12:34:56Z"),
    costUsd: 0.0123,
  };

  it("emits a yaml frontmatter block", () => {
    const block = provenanceBlock(baseline);
    expect(block.startsWith("---\n")).toBe(true);
    expect(block).toContain("generated_by: design-cli/0.2.0");
    expect(block).toContain("skill: design-spec-writer");
    expect(block).toContain("model: sonnet");
    expect(block).toContain("inputs_hash: ");
    expect(block).toContain("generated_at: 2026-06-15T12:34:56.000Z");
    expect(block).toContain("cost_usd: 0.0123");
    expect(block.endsWith("---\n\n")).toBe(true);
  });

  it("produces a deterministic inputs_hash regardless of key order", () => {
    const a = provenanceBlock({ ...baseline, inputs: { a: 1, b: 2 }, userAnswers: { x: "y" } });
    const b = provenanceBlock({ ...baseline, inputs: { b: 2, a: 1 }, userAnswers: { x: "y" } });
    const hashOf = (block: string) => block.match(/inputs_hash: (\w+)/)![1];
    expect(hashOf(a)).toBe(hashOf(b));
  });

  it("produces a different hash when inputs change", () => {
    const a = provenanceBlock({ ...baseline, inputs: { feature: "a" } });
    const b = provenanceBlock({ ...baseline, inputs: { feature: "b" } });
    const hashOf = (block: string) => block.match(/inputs_hash: (\w+)/)![1];
    expect(hashOf(a)).not.toBe(hashOf(b));
  });

  it("omits optional fields when absent", () => {
    const block = provenanceBlock({
      skill: "x",
      inputs: {},
      userAnswers: {},
      cliVersion: "0.2.0",
      generatedAt: new Date("2026-01-01T00:00:00Z"),
    });
    expect(block).not.toContain("model:");
    expect(block).not.toContain("cost_usd:");
    expect(block).not.toContain("session_id:");
  });
});
