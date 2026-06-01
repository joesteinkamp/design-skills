import { confirm, input, select } from "@inquirer/prompts";
import type { SkillFrontmatter } from "../skills/schema.js";
import { flagKey } from "./slug.js";

export interface CollectedInputs {
  inputs: Record<string, unknown>;
  userAnswers: Record<string, unknown>;
}

interface CollectOptions {
  flags: Record<string, unknown>;
  interactive: boolean;
}

function coerceBool(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    if (["true", "yes", "1", "y"].includes(v.toLowerCase())) return true;
    if (["false", "no", "0", "n"].includes(v.toLowerCase())) return false;
  }
  return undefined;
}

export async function collectInputs(
  skill: SkillFrontmatter,
  opts: CollectOptions,
): Promise<CollectedInputs> {
  const inputs: Record<string, unknown> = {};
  const userAnswers: Record<string, unknown> = {};

  for (const inputDef of skill.inputs) {
    const fromFlag = opts.flags[inputDef.name];
    if (fromFlag !== undefined) {
      inputs[inputDef.name] = fromFlag;
      continue;
    }
    if (!opts.interactive) {
      if (inputDef.required) {
        throw new Error(
          `Missing required input --${inputDef.name}. ${inputDef.description ?? ""}`.trim(),
        );
      }
      continue;
    }
    const answer = await input({
      message: `${inputDef.name}${inputDef.required ? " *" : ""}: ${inputDef.description ?? ""}`,
      validate: (v) => (inputDef.required && !v.trim() ? "Required" : true),
    });
    if (answer.trim()) inputs[inputDef.name] = answer.trim();
  }

  for (const q of skill.user_inputs) {
    const key = flagKey(q.question);
    const fromFlag = opts.flags[key];
    if (fromFlag !== undefined) {
      userAnswers[q.question] = fromFlag;
      continue;
    }
    if (!opts.interactive) {
      if (q.required) {
        throw new Error(`Missing required answer --${key}: ${q.question}`);
      }
      if (q.default !== undefined) userAnswers[q.question] = q.default;
      continue;
    }
    if (q.options && q.options.length > 0) {
      const choice = await select({
        message: q.question,
        choices: q.options.map((o) => ({ name: o, value: o })),
        default: typeof q.default === "string" ? q.default : undefined,
      });
      userAnswers[q.question] = choice;
    } else if (typeof q.default === "boolean") {
      const v = await confirm({ message: q.question, default: q.default });
      userAnswers[q.question] = v;
    } else {
      const v = await input({
        message: q.question,
        default: typeof q.default === "string" ? q.default : undefined,
        validate: (val) => (q.required && !val.trim() ? "Required" : true),
      });
      if (v.trim()) userAnswers[q.question] = v.trim();
    }
  }

  if (Object.keys(userAnswers).length > 0) {
    inputs["__user_answers__"] = userAnswers;
  }
  return { inputs, userAnswers };
}

export { coerceBool };
