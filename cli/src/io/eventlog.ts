import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export interface RunEvent {
  ts: string;
  skill: string;
  pipeline?: string;
  duration_ms: number;
  exit: 0 | 1;
  cost_usd?: number;
  output?: string;
  error?: string;
}

// Append one JSON line to <outDir>/.runs.jsonl. Creates the directory if needed.
// Best-effort: failures here must not bubble up and kill the user's run.
export async function logRunEvent(outDir: string, event: RunEvent): Promise<void> {
  try {
    await mkdir(outDir, { recursive: true });
    await appendFile(path.join(outDir, ".runs.jsonl"), JSON.stringify(event) + "\n", "utf8");
  } catch {
    // swallow — telemetry must never break the primary task
  }
}
