import { confirm, input, select } from "@inquirer/prompts";
import type { DiscoveredSkill } from "../skills/discover.js";

export interface CollectedInputs {
  inputs: Record<string, unknown>;
  userAnswers: Record<string, unknown>;
}

interface CollectOptions {
  flags: Record<string, unknown>;
  interactive: boolean;
}

export async function collectInputs(
  skill: DiscoveredSkill,
  opts: CollectOptions,
): Promise<CollectedInputs> {
  const inputs: Record<string, unknown> = {};
  const userAnswers: Record<string, unknown> = {};

  for (const inputDef of skill.frontmatter.inputs) {
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

  for (const q of skill.userInputs) {
    const fromFlag = opts.flags[q.flagKey];
    if (fromFlag !== undefined) {
      userAnswers[q.question] = fromFlag;
      continue;
    }
    if (!opts.interactive) {
      if (q.required) throw new Error(`Missing required answer --${q.flagKey}: ${q.question}`);
      if (q.default !== undefined) userAnswers[q.question] = q.default;
      continue;
    }
    if (q.options && q.options.length > 0) {
      userAnswers[q.question] = await select({
        message: q.question,
        choices: q.options.map((o) => ({ name: o, value: o })),
        default: typeof q.default === "string" ? q.default : undefined,
      });
    } else if (typeof q.default === "boolean") {
      userAnswers[q.question] = await confirm({ message: q.question, default: q.default });
    } else {
      const v = await input({
        message: q.question,
        default: typeof q.default === "string" ? q.default : undefined,
        validate: (val) => (q.required && !val.trim() ? "Required" : true),
      });
      if (v.trim()) userAnswers[q.question] = v.trim();
    }
  }

  return { inputs, userAnswers };
}
