import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { bundledSkillsRoot } from "../skills/discover.js";

const EvalCase = z.object({
  id: z.string(),
  description: z.string().optional(),
  // Skill inputs, keyed by input name (same as `design run --<input>`).
  inputs: z.record(z.unknown()),
  // Gate answers, keyed by flag (same as `design run --<flag>`).
  answers: z.record(z.unknown()).optional().default({}),
  expect: z
    .object({
      contains: z.array(z.string()).optional().default([]),
      not_contains: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default({}),
});

export const EvalFileSchema = z.object({
  skill: z.string(),
  cases: z.array(EvalCase).min(1),
});

export type EvalFile = z.infer<typeof EvalFileSchema>;
export type EvalCaseDef = z.infer<typeof EvalCase>;

export function evalsRoot(): string {
  return path.join(bundledSkillsRoot(), "evals");
}

export async function loadEvalFile(skill: string, root = evalsRoot()): Promise<EvalFile> {
  const raw = await readFile(path.join(root, `${skill}.yaml`), "utf8");
  return EvalFileSchema.parse(parseYaml(raw));
}
