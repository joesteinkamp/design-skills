import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { discoverSkills } from "../src/skills/discover.js";
import { evalsRoot, loadEvalFile } from "../src/evals/cases.js";
import {
  missingSections,
  parseOutputContract,
  parseQualityBar,
} from "../src/evals/contract.js";
import { answersByQuestion, checkExpectations, resolveFixturePaths } from "../src/evals/run.js";

describe("contract parsing", () => {
  const body = `
## Output Contract

| Section | Required | Min Items | Format |
|---------|----------|-----------|--------|
| Executive Summary | yes | - | text |
| Themes & Evidence | yes | 3 | list |
| Appendix | no | - | text |

## Quality Bar

| ID | Section | Rule | Severity |
|----|---------|------|----------|
| QB-01 | Themes | Every theme has evidence | blocker |
| QB-02 | Appendix | Appendix is short | warning |
`;

  it("reads required sections and rules", () => {
    expect(parseOutputContract(body)).toEqual([
      { name: "Executive Summary", required: true },
      { name: "Themes & Evidence", required: true },
      { name: "Appendix", required: false },
    ]);
    expect(parseQualityBar(body).map((r) => [r.id, r.severity])).toEqual([
      ["QB-01", "blocker"],
      ["QB-02", "warning"],
    ]);
  });

  it("matches headings loosely and reports missing required sections", () => {
    const output = "# Report\n\n## Executive summary\n\ntext\n\n### Themes and Evidence\n";
    expect(missingSections(output, parseOutputContract(body))).toEqual([]);
    expect(missingSections("## Executive Summary\n", parseOutputContract(body))).toEqual([
      "Themes & Evidence",
    ]);
  });
});

describe("eval cases", async () => {
  const { skills } = await discoverSkills("/tmp/__nonexistent_cwd__");
  const bundled = skills.filter((s) => s.source === "bundled");

  it.each(bundled.map((s) => [s.frontmatter.name, s] as const))(
    "%s has a runnable eval case",
    async (name, skill) => {
      expect(existsSync(path.join(evalsRoot(), `${name}.yaml`)), `evals/${name}.yaml`).toBe(true);
      const file = await loadEvalFile(name);
      expect(file.skill).toBe(name);

      // Every skill must expose a contract and quality bar the harness can grade.
      expect(parseOutputContract(skill.body).some((s) => s.required)).toBe(true);
      expect(parseQualityBar(skill.body).length).toBeGreaterThan(0);

      for (const c of file.cases) {
        for (const input of skill.frontmatter.inputs.filter((i) => i.required)) {
          expect(c.inputs, `${name}/${c.id} input ${input.name}`).toHaveProperty(input.name);
        }
        const answered = answersByQuestion(skill, c.answers); // throws on unknown flags
        for (const q of skill.userInputs) {
          if (q.required && !q.checkpoint && q.default === undefined) {
            expect(answered, `${name}/${c.id} answer --${q.flagKey}`).toHaveProperty(q.question);
          }
        }
        for (const v of Object.values(resolveFixturePaths(c.inputs))) {
          if (typeof v === "string" && v.startsWith(evalsRoot())) expect(existsSync(v), v).toBe(true);
        }
      }
    },
  );
});

describe("checkExpectations", () => {
  it("is case-insensitive and reports both directions", () => {
    const c = {
      id: "x",
      inputs: {},
      answers: {},
      expect: { contains: ["Hypothesis", "missing"], not_contains: ["lorem"] },
    };
    expect(checkExpectations("Our hypothesis… lorem ipsum", c)).toEqual([
      'missing "missing"',
      'unexpected "lorem"',
    ]);
  });
});

describe("inputFileDirs", async () => {
  const { inputFileDirs } = await import("../src/claude/invoke.js");
  it("returns directories of inputs that are existing files only", () => {
    const fixture = path.join(evalsRoot(), "fixtures", "login-sketch.png");
    expect(inputFileDirs({ img: fixture, text: "a login screen", n: 3 })).toEqual([
      path.dirname(fixture),
    ]);
  });
});
