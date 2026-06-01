import { readdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import {
  AgentConfigSchema,
  SkillFrontmatterSchema,
  type AgentConfig,
  type SkillFrontmatter,
} from "./schema.js";
import { flagKey } from "../io/slug.js";

export type SkillSource = "bundled" | "user" | "project";

export interface UserInputWithFlag {
  step?: number;
  question: string;
  required: boolean;
  options?: string[];
  default?: string | boolean | number;
  flagKey: string;
}

export interface DiscoveredSkill {
  source: SkillSource;
  dir: string;
  skillMdPath: string;
  frontmatter: SkillFrontmatter;
  userInputs: UserInputWithFlag[];
  body: string;
  agent?: AgentConfig;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function bundledSkillsRoot(): string {
  // dist/skills/discover.js -> ../../.. -> repo root
  return path.resolve(__dirname, "..", "..", "..");
}

export function userSkillsRoot(): string {
  return path.join(homedir(), ".design", "skills");
}

export function projectSkillsRoot(cwd = process.cwd()): string {
  return path.join(cwd, "skills");
}

function skillRoots(cwd: string): { root: string; source: SkillSource }[] {
  return [
    { root: bundledSkillsRoot(), source: "bundled" },
    { root: userSkillsRoot(), source: "user" },
    { root: projectSkillsRoot(cwd), source: "project" },
  ];
}

export function defaultCategory(skill: DiscoveredSkill): string {
  return skill.frontmatter.category ?? "outputs";
}

function isEnoent(err: unknown): boolean {
  return (err as NodeJS.ErrnoException)?.code === "ENOENT";
}

async function listSkillDirs(root: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch (err) {
    if (isEnoent(err)) return [];
    throw err;
  }
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules")
    .map((e) => path.join(root, e.name));
}

async function loadAgentConfig(skillDir: string): Promise<AgentConfig | undefined> {
  try {
    const raw = await readFile(path.join(skillDir, "agents", "claude.yaml"), "utf8");
    return AgentConfigSchema.parse(parseYaml(raw));
  } catch (err) {
    if (isEnoent(err)) return undefined;
    return undefined;
  }
}

type LoadResult =
  | { ok: true; skill: DiscoveredSkill }
  | { ok: false; dir: string; error: string }
  | { ok: false; dir: string; skipped: true };

async function loadSkill(skillDir: string, source: SkillSource): Promise<LoadResult> {
  const skillMdPath = path.join(skillDir, "SKILL.md");
  let raw: string;
  try {
    raw = await readFile(skillMdPath, "utf8");
  } catch (err) {
    if (isEnoent(err)) return { ok: false, dir: skillDir, skipped: true };
    return { ok: false, dir: skillDir, error: (err as Error).message };
  }
  try {
    const parsed = matter(raw);
    const frontmatter = SkillFrontmatterSchema.parse(parsed.data);
    const agent = await loadAgentConfig(skillDir);
    const userInputs: UserInputWithFlag[] = frontmatter.user_inputs.map((q) => ({
      ...q,
      flagKey: flagKey(q.question),
    }));
    return {
      ok: true,
      skill: {
        source,
        dir: skillDir,
        skillMdPath,
        frontmatter,
        userInputs,
        body: parsed.content.trim(),
        agent,
      },
    };
  } catch (err) {
    return { ok: false, dir: skillDir, error: (err as Error).message };
  }
}

export interface DiscoveryResult {
  skills: DiscoveredSkill[];
  errors: { dir: string; error: string }[];
}

export async function discoverSkills(cwd = process.cwd()): Promise<DiscoveryResult> {
  const byName = new Map<string, DiscoveredSkill>();
  const errors: DiscoveryResult["errors"] = [];

  // Walk sources in precedence order; later (project > user > bundled) wins on name collision.
  for (const { root, source } of skillRoots(cwd)) {
    const dirs = await listSkillDirs(root);
    const results = await Promise.all(dirs.map((d) => loadSkill(d, source)));
    for (const r of results) {
      if (r.ok) byName.set(r.skill.frontmatter.name, r.skill);
      else if (!("skipped" in r)) errors.push({ dir: r.dir, error: r.error });
    }
  }

  const skills = [...byName.values()].sort((a, b) =>
    a.frontmatter.name.localeCompare(b.frontmatter.name),
  );
  return { skills, errors };
}

export async function findSkill(name: string): Promise<DiscoveredSkill | undefined> {
  // Project > user > bundled. First match wins; no need to scan everything.
  for (const { root, source } of skillRoots(process.cwd()).reverse()) {
    const dir = path.join(root, name);
    const r = await loadSkill(dir, source);
    if (r.ok) return r.skill;
  }
  return undefined;
}
