import { describe, it, expect } from "vitest";
import { discoverSkills } from "../src/skills/discover.js";

describe("discoverSkills (bundled)", () => {
  it("loads every bundled SKILL.md without errors", async () => {
    const { skills, errors } = await discoverSkills("/tmp/__nonexistent_cwd__");
    expect(errors).toEqual([]);
    expect(skills.length).toBeGreaterThanOrEqual(20);
  });

  it("includes design-spec-writer with expected contract", async () => {
    const { skills } = await discoverSkills("/tmp/__nonexistent_cwd__");
    const dsw = skills.find((s) => s.frontmatter.name === "design-spec-writer");
    expect(dsw, "design-spec-writer should be discovered").toBeDefined();
    expect(dsw!.frontmatter.category).toBe("documentation");
    expect(dsw!.frontmatter.inputs.some((i) => i.name === "feature_description")).toBe(true);
    expect(dsw!.frontmatter.outputs.some((o) => o.name === "design_spec")).toBe(true);
    expect(dsw!.agent?.interface?.model).toBe("sonnet");
  });
});
