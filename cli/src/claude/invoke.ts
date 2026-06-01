import { execa, type ExecaError } from "execa";
import { OUTPUT_JSON_SCHEMA } from "../skills/prompt.js";

export interface InvokeOptions {
  systemPrompt: string;
  userMessage: string;
  model?: string;
  cwd?: string;
  maxBudgetUsd?: number;
  extraArgs?: string[];
}

export interface SkillOutputEnvelope {
  filename: string;
  body: string;
  sidecars?: { filename: string; body: string }[];
}

export interface ClaudeInvocationResult {
  raw: { result: string; total_cost_usd?: number; session_id?: string; is_error?: boolean };
  envelope: SkillOutputEnvelope;
}

export async function invokeClaude(opts: InvokeOptions): Promise<ClaudeInvocationResult> {
  const args: string[] = [
    "-p",
    "--bare",
    "--system-prompt",
    opts.systemPrompt,
    "--output-format",
    "json",
    "--permission-mode",
    "acceptEdits",
    "--no-session-persistence",
    "--json-schema",
    JSON.stringify(OUTPUT_JSON_SCHEMA),
  ];
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

  let raw: ClaudeInvocationResult["raw"];
  try {
    raw = JSON.parse(stdout);
  } catch {
    throw new Error(`claude returned non-JSON output:\n${stdout.slice(0, 500)}`);
  }
  if (raw.is_error || !raw.result) {
    throw new Error(`claude returned error envelope: ${JSON.stringify(raw)}`);
  }

  let envelope: SkillOutputEnvelope;
  try {
    envelope = JSON.parse(raw.result);
  } catch {
    throw new Error(`Skill result was not valid JSON envelope:\n${raw.result.slice(0, 500)}`);
  }
  if (!envelope.filename || !envelope.body) {
    throw new Error(`Envelope missing filename/body: ${JSON.stringify(envelope)}`);
  }
  return { raw, envelope };
}
