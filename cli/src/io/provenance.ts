import { createHash } from "node:crypto";

export interface ProvenanceFields {
  skill: string;
  model?: string;
  inputs: Record<string, unknown>;
  userAnswers: Record<string, unknown>;
  cliVersion: string;
  generatedAt: Date;
  costUsd?: number;
  sessionId?: string;
}

// Hash a stable JSON view of inputs+answers so an identical re-run
// produces the same hash (and a different one when meaningful inputs change).
function hashInputs(inputs: Record<string, unknown>, userAnswers: Record<string, unknown>): string {
  const sortKeys = (o: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
  const payload = JSON.stringify({ inputs: sortKeys(inputs), answers: sortKeys(userAnswers) });
  return createHash("sha256").update(payload).digest("hex").slice(0, 16);
}

export function provenanceBlock(p: ProvenanceFields): string {
  const lines = [
    "---",
    `generated_by: design-cli/${p.cliVersion}`,
    `skill: ${p.skill}`,
    ...(p.model ? [`model: ${p.model}`] : []),
    `inputs_hash: ${hashInputs(p.inputs, p.userAnswers)}`,
    `generated_at: ${p.generatedAt.toISOString()}`,
    ...(typeof p.costUsd === "number" ? [`cost_usd: ${p.costUsd.toFixed(4)}`] : []),
    ...(p.sessionId ? [`session_id: ${p.sessionId}`] : []),
    "---",
  ];
  return lines.join("\n") + "\n\n";
}
