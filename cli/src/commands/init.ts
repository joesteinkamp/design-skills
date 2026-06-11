import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { defaultCategory } from "../skills/discover.js";
import { discoverSkills } from "../skills/discover.js";

async function writeIfMissing(p: string, content: string): Promise<"created" | "skipped"> {
  if (existsSync(p)) return "skipped";
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, content, "utf8");
  return "created";
}

async function appendGitignoreEntry(cwd: string, entry: string): Promise<void> {
  const p = path.join(cwd, ".gitignore");
  const existing = existsSync(p) ? await readFile(p, "utf8") : "";
  if (existing.split("\n").some((l) => l.trim() === entry)) return;
  const sep = existing === "" || existing.endsWith("\n") ? "" : "\n";
  await writeFile(p, existing + sep + entry + "\n", "utf8");
}

export async function initCommand(opts: { gitignore?: boolean }): Promise<void> {
  const cwd = process.cwd();

  const { skills } = await discoverSkills(cwd);
  const categories = new Set(skills.map(defaultCategory));
  if (categories.size === 0) categories.add("outputs");

  for (const c of categories) await mkdir(path.join(cwd, "design", c), { recursive: true });

  const rcStatus = await writeIfMissing(
    path.join(cwd, ".designrc.json"),
    JSON.stringify(
      {
        $schema: "https://design-skills.dev/schema/designrc.json",
        outputDir: "./design",
        model: "sonnet",
        mcpServers: [],
      },
      null,
      2,
    ) + "\n",
  );
  const mcpStatus = await writeIfMissing(
    path.join(cwd, ".mcp.json"),
    JSON.stringify({ mcpServers: {} }, null, 2) + "\n",
  );

  if (opts.gitignore) await appendGitignoreEntry(cwd, "design/");

  console.log(`Initialized design workspace at ${cwd}`);
  console.log(`  design/ directories: ${[...categories].sort().join(", ")}`);
  console.log(`  .designrc.json: ${rcStatus}`);
  console.log(`  .mcp.json: ${mcpStatus}`);
  if (opts.gitignore) console.log(`  .gitignore: appended design/`);
}
