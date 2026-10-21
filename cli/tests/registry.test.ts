import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { parse as parseYaml } from "yaml";
import { bundledSkillsRoot, discoverSkills } from "../src/skills/discover.js";

interface RegistryEntry {
  name: string;
  upstream_skills?: string[];
  downstream_skills?: string[];
}

const root = bundledSkillsRoot();
const registry: RegistryEntry[] = parseYaml(
  readFileSync(path.join(root, "skills.yaml"), "utf8"),
).skills;
const sorted = (xs: string[] = []) => [...xs].sort();

describe("skills.yaml registry", async () => {
  const { skills } = await discoverSkills("/tmp/__nonexistent_cwd__");
  const bundled = skills.filter((s) => s.source === "bundled");
  const names = new Set(bundled.map((s) => s.frontmatter.name));

  it("lists only skills that exist", () => {
    for (const entry of registry) expect(names, entry.name).toContain(entry.name);
  });

  it.each(registry.map((e) => [e.name, e] as const))(
    "%s frontmatter graph matches the registry",
    (name, entry) => {
      const fm = bundled.find((s) => s.frontmatter.name === name)!.frontmatter;
      expect(sorted(fm.upstream_skills)).toEqual(sorted(entry.upstream_skills));
      expect(sorted(fm.downstream_skills)).toEqual(sorted(entry.downstream_skills));
      for (const s of [...fm.upstream_skills, ...fm.downstream_skills]) {
        expect(names, `${name} links unknown skill ${s}`).toContain(s);
      }
    },
  );

  it("every reference a SKILL.md mentions exists", () => {
    const ref = /(?:\.\.\/[a-z0-9-]+\/)?references\/[\w.-]+\.(?:md|json|html|ya?ml)/g;
    for (const skill of bundled) {
      for (const m of skill.body.matchAll(ref)) {
        expect(existsSync(path.join(skill.dir, m[0])), `${skill.frontmatter.name}: ${m[0]}`).toBe(
          true,
        );
      }
    }
  });
});
