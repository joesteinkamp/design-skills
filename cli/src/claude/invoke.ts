import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { execa, type ExecaError } from "execa";
import { OUTPUT_JSON_SCHEMA } from "../skills/prompt.js";

export interface InvokeOptions {
  systemPrompt: string;
  userMessage: string;
  model?: string;
  cwd?: string;
  maxBudgetUsd?: number;
  // Directories outside cwd the model may read (e.g., where an input image lives).
  addDirs?: string[];
  extraArgs?: string[];
}

/** Parent directories of inputs that are paths to existing files, so `claude` can open them. */
export function inputFileDirs(inputs: Record<string, unknown>, cwd = process.cwd()): string[] {
  const dirs = new Set<string>();
  for (const v of Object.values(inputs)) {
    if (typeof v !== "string" || v.includes("\n") || v.length > 1024) continue;
    const abs = path.resolve(cwd, v);
    try {
      if (statSync(abs).isFile()) dirs.add(path.dirname(abs));
    } catch {
      // not a path
    }
  }
  return [...dirs];
}

export interface SkillOutputEnvelope {
  filename: string;
  body: string;
  sidecars?: { filename: string; body: string }[];
}

export interface RawResult {
  result: string;
  structured_output?: unknown;
  total_cost_usd?: number;
  session_id?: string;
  is_error?: boolean;
}

export interface ClaudeInvocationResult {
  raw: RawResult;
  envelope: SkillOutputEnvelope;
}

// --bare is faster and ignores the user's hooks and CLAUDE.md, but it only
// authenticates with ANTHROPIC_API_KEY (never a claude.ai login), so use it
// only when a key is present.
export function baseArgs(env: NodeJS.ProcessEnv = process.env): string[] {
  return env.ANTHROPIC_API_KEY ? ["-p", "--bare"] : ["-p"];
}

/** Runs `claude -p` with a JSON schema and returns the validated object. */
export async function invokeClaudeJson<T>(
  opts: InvokeOptions & { schema: object },
): Promise<{ raw: RawResult; value: T }> {
  const args: string[] = [
    ...baseArgs(),
    "--system-prompt",
    opts.systemPrompt,
    "--output-format",
    "json",
    "--permission-mode",
    "acceptEdits",
    "--no-session-persistence",
    "--json-schema",
    JSON.stringify(opts.schema),
  ];
  // --bare skips MCP auto-discovery, so pass the project's servers (from `design init`) explicitly.
  const mcpConfig = path.join(opts.cwd ?? process.cwd(), ".mcp.json");
  if (existsSync(mcpConfig)) args.push("--mcp-config", mcpConfig);
  for (const dir of opts.addDirs ?? []) args.push("--add-dir", dir);
  if (opts.model) args.push("--model", opts.model);
  if (opts.maxBudgetUsd !== undefined) args.push("--max-budget-usd", String(opts.maxBudgetUsd));
  if (opts.extraArgs) args.push(...opts.extraArgs);

  let stdout: string;
  try {
    const result = await execa("claude", args, {
      cwd: opts.cwd ?? process.cwd(),
      input: opts.userMessage,
      stdin: "pipe",
      stdout: "pipe",
      stderr: "inherit",
      env: process.env,
    });
    stdout = result.stdout;
  } catch (err) {
    const e = err as ExecaError;
    throw new Error(
      `claude invocation failed (exit ${e.exitCode}): ${e.shortMessage ?? e.message}`,
    );
  }

  let raw: RawResult;
  try {
    raw = JSON.parse(stdout);
  } catch {
    throw new Error(`claude returned non-JSON output:\n${stdout.slice(0, 500)}`);
  }
  if (raw.is_error || (!raw.result && raw.structured_output === undefined)) {
    throw new Error(`claude returned error envelope: ${JSON.stringify(raw)}`);
  }

  try {
    // --json-schema returns the validated object in structured_output; older CLIs put it in result.
    const value =
      raw.structured_output !== undefined ? (raw.structured_output as T) : JSON.parse(raw.result);
    return { raw, value };
  } catch {
    throw new Error(`Result was not valid JSON:\n${raw.result.slice(0, 500)}`);
  }
}

export async function invokeClaude(opts: InvokeOptions): Promise<ClaudeInvocationResult> {
  const { raw, value: envelope } = await invokeClaudeJson<SkillOutputEnvelope>({
    ...opts,
    schema: OUTPUT_JSON_SCHEMA,
  });
  if (!envelope.filename || !envelope.body) {
    throw new Error(`Envelope missing filename/body: ${JSON.stringify(envelope)}`);
  }
  return { raw, envelope };
}
