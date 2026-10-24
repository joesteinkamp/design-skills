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
        checkpoint: false,
      },
      { question: "Figma URL?", required: false, checkpoint: false },
      { question: "Found [N] themes. Review them?", required: false, checkpoint: true },
    ],
  },
  userInputs: [
    {
      question: "Decision stage: proposal, refinement, or build-ready?",
      required: true,
      options: ["proposal", "refinement", "build-ready"],
      checkpoint: false,
      flagKey: "decision-stage",
    },
    { question: "Figma URL?", required: false, checkpoint: false, flagKey: "figma-url" },
    {
      question: "Found [N] themes. Review them?",
      required: false,
      checkpoint: true,
      flagKey: "found-n-themes-review-them",
    },
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

  it("uses the default for a required question instead of failing", async () => {
    const withDefault: DiscoveredSkill = {
      ...skill,
      userInputs: [
        {
          question: "Add error branches?",
          required: true,
          default: true,
          checkpoint: false,
          flagKey: "add-error-branches",
        },
      ],
    };
    const out = await collectInputs(withDefault, {
      flags: { feature_description: "x" },
      interactive: false,
    });
    expect(out.userAnswers["Add error branches?"]).toBe(true);
  });

  it("never asks mid-run checkpoints up front", async () => {
    const out = await collectInputs(skill, {
      flags: { feature_description: "x", "decision-stage": "proposal" },
      interactive: false,
    });
    expect(out.userAnswers).not.toHaveProperty("Found [N] themes. Review them?");
  });
});
