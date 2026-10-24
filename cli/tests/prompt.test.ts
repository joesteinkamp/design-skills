import { describe, it, expect } from "vitest";
import { assemblePrompt } from "../src/skills/prompt.js";
import { findSkill } from "../src/skills/discover.js";

describe("assemblePrompt", () => {
  it("includes SKILL.md body, references, and output envelope instructions", async () => {
    const skill = await findSkill("design-spec-writer");
    expect(skill).toBeDefined();
    const out = await assemblePrompt(skill!, { feature_description: "checkout redesign" });
    expect(out.systemPrompt).toContain("design-spec-writer");
    expect(out.systemPrompt).toContain("## Quality Bar");
    expect(out.systemPrompt).toContain("## Reference Templates");
    expect(out.systemPrompt).toContain("design-spec-template.md");
    expect(out.systemPrompt).toContain('"filename"');
    expect(out.userMessage).toContain("feature_description");
    expect(out.userMessage).toContain("checkout redesign");
    expect(out.model).toBe("opus");
  });

  it("handles skills without declared inputs / outputs, inlining body references", async () => {
    const skill = await findSkill("sketch-to-code");
    expect(skill).toBeDefined();
    const out = await assemblePrompt(skill!, { description: "login page" });
    expect(out.systemPrompt).toContain("sketch-to-code");
    expect(out.systemPrompt).toContain("references/component-catalog.json");
  });

  it("inlines rubrics the workflow reads, not just output templates", async () => {
    const skill = await findSkill("design-critique");
    const out = await assemblePrompt(skill!, { design_artifact: "settings page" });
    expect(out.systemPrompt).toContain("### Reference: `references/critique-rubric.md`");
    expect(out.systemPrompt).toContain("## Running Non-Interactively");
  });

  it("inlines cross-skill references", async () => {
    const skill = await findSkill("workshop-planner");
    const out = await assemblePrompt(skill!, { workshop_goal: "kickoff" });
    expect(out.systemPrompt).toContain(
      "../figjam-workshop-prompt-creator/references/ai-native-workshop-instructions.md",
    );
  });
});
