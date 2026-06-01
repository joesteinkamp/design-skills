import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";
import { discoverSkills } from "../skills/discover.js";

const RC_TEMPLATE = {
  $schema: "https://design-skills.dev/schema/designrc.json",
  outputDir: "./design",
  model: "sonnet",
  mcpServers: [] as string[],
};

const MCP_TEMPLATE = {
  mcpServers: {},
};

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function writeIfMissing(p: string, content: string): Promise<"created" | "skipped"> {
  if (await exists(p)) return "skipped";
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, content, "utf8");
  return "created";
}

async function appendGitignoreEntry(cwd: string, entry: string): Promise<void> {
  const p = path.join(cwd, ".gitignore");
  const existing = (await exists(p)) ? await readFile(p, "utf8") : "";
  if (existing.split("\n").some((l) => l.trim() === entry)) return;
  const updated = existing.endsWith("\n") || existing === "" ? existing : existing + "\n";
  await writeFile(p, updated + entry + "\n", "utf8");
}

export async function initCommand(opts: { gitignore?: boolean }): Promise<void> {
  const cwd = process.cwd();

  const { skills } = await discoverSkills(cwd);
  const categories = new Set<string>();
  for (const s of skills) if (s.frontmatter.category) categories.add(s.frontmatter.category);
  if (categories.size === 0) categories.add("outputs");

  for (const c of categories) {
    await mkdir(path.join(cwd, "design", c), { recursive: true });
  }

  const rcStatus = await writeIfMissing(
    path.join(cwd, ".designrc.json"),
    JSON.stringify(RC_TEMPLATE, null, 2) + "\n",
  );
  const mcpStatus = await writeIfMissing(
    path.join(cwd, ".mcp.json"),
    JSON.stringify(MCP_TEMPLATE, null, 2) + "\n",
  );

  if (opts.gitignore) await appendGitignoreEntry(cwd, "design/");

  console.log(`Initialized design workspace at ${cwd}`);
  console.log(`  design/ directories: ${[...categories].sort().join(", ")}`);
  console.log(`  .designrc.json: ${rcStatus}`);
  console.log(`  .mcp.json: ${mcpStatus}`);
  if (opts.gitignore) console.log(`  .gitignore: appended design/`);
}
