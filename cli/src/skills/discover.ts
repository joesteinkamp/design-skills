import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
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

export type SkillSource = "bundled" | "user" | "project";

export interface DiscoveredSkill {
  source: SkillSource;
  dir: string;
  skillMdPath: string;
  frontmatter: SkillFrontmatter;
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

async function isDir(p: string): Promise<boolean> {
  try {
    const s = await stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}

async function listSkillDirs(root: string): Promise<string[]> {
  if (!(await isDir(root))) return [];
  const entries = await readdir(root, { withFileTypes: true });
  const dirs: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const skillMd = path.join(root, e.name, "SKILL.md");
    if (existsSync(skillMd)) dirs.push(path.join(root, e.name));
  }
  return dirs;
}

async function loadAgentConfig(skillDir: string): Promise<AgentConfig | undefined> {
  const p = path.join(skillDir, "agents", "claude.yaml");
  if (!existsSync(p)) return undefined;
  try {
    const raw = await readFile(p, "utf8");
    const parsed = parseYaml(raw);
    return AgentConfigSchema.parse(parsed);
  } catch {
    return undefined;
  }
}

async function loadSkill(
  skillDir: string,
  source: SkillSource,
): Promise<DiscoveredSkill | { error: string; dir: string }> {
  const skillMdPath = path.join(skillDir, "SKILL.md");
  try {
    const raw = await readFile(skillMdPath, "utf8");
    const parsed = matter(raw);
    const frontmatter = SkillFrontmatterSchema.parse(parsed.data);
    const agent = await loadAgentConfig(skillDir);
    return {
      source,
      dir: skillDir,
      skillMdPath,
      frontmatter,
      body: parsed.content.trim(),
      agent,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : String(err),
      dir: skillDir,
    };
  }
}

export interface DiscoveryResult {
  skills: DiscoveredSkill[];
  errors: { dir: string; error: string }[];
}

export async function discoverSkills(cwd = process.cwd()): Promise<DiscoveryResult> {
  // Precedence: project > user > bundled. Later entries with same name win.
  const sources: { root: string; source: SkillSource }[] = [
    { root: bundledSkillsRoot(), source: "bundled" },
    { root: userSkillsRoot(), source: "user" },
    { root: projectSkillsRoot(cwd), source: "project" },
  ];

  const byName = new Map<string, DiscoveredSkill>();
  const errors: DiscoveryResult["errors"] = [];

  for (const { root, source } of sources) {
    const dirs = await listSkillDirs(root);
    for (const dir of dirs) {
      const loaded = await loadSkill(dir, source);
      if ("error" in loaded) {
        errors.push({ dir: loaded.dir, error: loaded.error });
      } else {
        byName.set(loaded.frontmatter.name, loaded);
      }
    }
  }

  const skills = [...byName.values()].sort((a, b) =>
    a.frontmatter.name.localeCompare(b.frontmatter.name),
  );
  return { skills, errors };
}

export async function findSkill(
  name: string,
  cwd = process.cwd(),
): Promise<DiscoveredSkill | undefined> {
  const { skills } = await discoverSkills(cwd);
  return skills.find((s) => s.frontmatter.name === name);
}
