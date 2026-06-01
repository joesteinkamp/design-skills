import { describe, it, expect } from "vitest";
import { collectInputs } from "../src/io/prompts.js";
import type { DiscoveredSkill } from "../src/skills/discover.js";

const skill: DiscoveredSkill = {
  source: "bundled",
  dir: "/tmp/test",
  skillMdPath: "/tmp/test/SKILL.md",
  body: "",
  frontmatter: {
    name: "test",
    description: "test",
    tags: [],
    upstream_skills: [],
    downstream_skills: [],
    inputs: [
      { name: "feature_description", required: true, description: "feature" },
      { name: "personas", required: false, description: "personas" },
    ],
    outputs: [],
    tools: [],
    user_inputs: [
      {
        question: "Decision stage: proposal, refinement, or build-ready?",
        required: true,
        options: ["proposal", "refinement", "build-ready"],
      },
      { question: "Figma URL?", required: false },
    ],
  },
  userInputs: [
    {
      question: "Decision stage: proposal, refinement, or build-ready?",
      required: true,
      options: ["proposal", "refinement", "build-ready"],
      flagKey: "decision-stage",
    },
    { question: "Figma URL?", required: false, flagKey: "figma-url" },
  ],
};

describe("collectInputs (non-interactive)", () => {
  it("maps --<input> flags to skill inputs and user_inputs", async () => {
    const out = await collectInputs(skill, {
      flags: { feature_description: "checkout redesign", "decision-stage": "proposal" },
      interactive: false,
    });
    expect(out.inputs.feature_description).toBe("checkout redesign");
    expect(out.userAnswers["Decision stage: proposal, refinement, or build-ready?"]).toBe(
      "proposal",
    );
  });

  it("throws on missing required input", async () => {
    await expect(collectInputs(skill, { flags: {}, interactive: false })).rejects.toThrow(
      /feature_description/,
    );
  });

  it("throws on missing required user_input", async () => {
    await expect(
      collectInputs(skill, { flags: { feature_description: "x" }, interactive: false }),
    ).rejects.toThrow(/decision-stage/);
  });

  it("skips optional inputs/questions when not provided", async () => {
    const out = await collectInputs(skill, {
      flags: { feature_description: "x", "decision-stage": "proposal" },
      interactive: false,
    });
    expect(out.inputs.personas).toBeUndefined();
    expect(out.userAnswers["Figma URL?"]).toBeUndefined();
  });
});
