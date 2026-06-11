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
    expect(out.model).toBe("sonnet");
  });

  it("handles minimal skills (no inputs / outputs / references)", async () => {
    const skill = await findSkill("sketch-to-code");
    expect(skill).toBeDefined();
    const out = await assemblePrompt(skill!, { description: "login page" });
    expect(out.systemPrompt).toContain("sketch-to-code");
    expect(out.systemPrompt).not.toContain("## Reference Templates");
  });
});
