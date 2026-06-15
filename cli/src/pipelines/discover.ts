import { readdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { PipelineSchema, type Pipeline } from "./schema.js";

export type PipelineSource = "bundled" | "user" | "project";

export interface DiscoveredPipeline {
  source: PipelineSource;
  path: string;
  pipeline: Pipeline;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function bundledRoot(): string {
  // dist/pipelines/discover.js -> ../../../pipelines
  return path.resolve(__dirname, "..", "..", "..", "pipelines");
}

function userRoot(): string {
  return path.join(homedir(), ".design", "pipelines");
}

function projectRoot(cwd: string): string {
  return path.join(cwd, "pipelines");
}

function roots(cwd: string): { root: string; source: PipelineSource }[] {
  return [
    { root: bundledRoot(), source: "bundled" },
    { root: userRoot(), source: "user" },
    { root: projectRoot(cwd), source: "project" },
  ];
}

function isEnoent(err: unknown): boolean {
  return (err as NodeJS.ErrnoException)?.code === "ENOENT";
}

async function listYamlFiles(root: string): Promise<string[]> {
  try {
    const entries = await readdir(root, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.ya?ml$/i.test(e.name))
      .map((e) => path.join(root, e.name));
  } catch (err) {
    if (isEnoent(err)) return [];
    throw err;
  }
}

async function loadPipeline(p: string, source: PipelineSource): Promise<DiscoveredPipeline> {
  const raw = await readFile(p, "utf8");
  const parsed = parseYaml(raw);
  const pipeline = PipelineSchema.parse(parsed);
  return { source, path: p, pipeline };
}

export async function discoverPipelines(
  cwd = process.cwd(),
): Promise<{ pipelines: DiscoveredPipeline[]; errors: { path: string; error: string }[] }> {
  const byName = new Map<string, DiscoveredPipeline>();
  const errors: { path: string; error: string }[] = [];

  for (const { root, source } of roots(cwd)) {
    const files = await listYamlFiles(root);
    const loaded = await Promise.all(
      files.map((f) =>
        loadPipeline(f, source).catch((err: unknown) => ({
          err: err instanceof Error ? err.message : String(err),
          path: f,
        })),
      ),
    );
    for (const r of loaded) {
      if ("err" in r) errors.push({ path: r.path, error: r.err });
      else byName.set(r.pipeline.name, r);
    }
  }

  const pipelines = [...byName.values()].sort((a, b) =>
    a.pipeline.name.localeCompare(b.pipeline.name),
  );
  return { pipelines, errors };
}

export async function findPipeline(name: string): Promise<DiscoveredPipeline | undefined> {
  const { pipelines } = await discoverPipelines();
  return pipelines.find((p) => p.pipeline.name === name);
}
