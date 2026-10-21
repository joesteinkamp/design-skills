import type { DiscoveredSkill } from "../skills/discover.js";
import { assemblePrompt } from "../skills/prompt.js";
import { inputFileDirs, invokeClaude, invokeClaudeJson } from "../claude/invoke.js";
import path from "node:path";
import { evalsRoot, type EvalCaseDef } from "./cases.js";
import { missingSections, parseOutputContract, parseQualityBar, type QualityRule } from "./contract.js";

export interface RuleVerdict {
  id: string;
  pass: boolean;
  reason: string;
}

export interface CaseResult {
  skill: string;
  caseId: string;
  pass: boolean;
  missingSections: string[];
  failedExpectations: string[];
  rules: (RuleVerdict & { severity: QualityRule["severity"] })[];
  costUsd: number;
  error?: string;
}

const JUDGE_SCHEMA = {
  type: "object",
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          pass: { type: "boolean" },
          reason: { type: "string" },
        },
        required: ["id", "pass", "reason"],
        additionalProperties: false,
      },
    },
  },
  required: ["results"],
  additionalProperties: false,
} as const;

const JUDGE_SYSTEM_PROMPT = `
You grade the output of a design skill against its Quality Bar. You are strict and literal.

For each rule, decide whether the output satisfies it. A rule that does not apply to this kind of
request (for example, a refinement-only rule on a first-pass output) passes, with the reason
"not applicable". But if the output did not do the task — it refused, said it was blocked, or left
out the deliverable a rule is about — every rule about that missing deliverable FAILS; missing work
is never "not applicable".
Quote or point to the specific part of the output that justifies each verdict in one sentence.
Return one result per rule id, in the order given.
`.trim();

/** Maps eval answers keyed by flag to the question text the prompt expects. */
export function answersByQuestion(
  skill: DiscoveredSkill,
  answers: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [flag, value] of Object.entries(answers)) {
    const q = skill.userInputs.find((u) => u.flagKey === flag);
    if (!q) throw new Error(`${skill.frontmatter.name}: unknown answer flag --${flag}`);
    out[q.question] = value;
  }
  return out;
}

/** Rewrites `fixtures/…` input values to absolute paths so the model can open them from any cwd. */
export function resolveFixturePaths(
  inputs: Record<string, unknown>,
  root = evalsRoot(),
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(inputs).map(([k, v]) => [
      k,
      typeof v === "string" && v.startsWith("fixtures/") ? path.join(root, v) : v,
    ]),
  );
}

export function checkExpectations(output: string, c: EvalCaseDef): string[] {
  const lower = output.toLowerCase();
  return [
    ...c.expect.contains.filter((s) => !lower.includes(s.toLowerCase())).map((s) => `missing "${s}"`),
    ...c.expect.not_contains
      .filter((s) => lower.includes(s.toLowerCase()))
      .map((s) => `unexpected "${s}"`),
  ];
}

export async function runCase(
  skill: DiscoveredSkill,
  c: EvalCaseDef,
  opts: { judge: boolean; model?: string; judgeModel?: string; maxBudgetUsd?: number },
): Promise<CaseResult> {
  const name = skill.frontmatter.name;
  const base = { skill: name, caseId: c.id, missingSections: [], failedExpectations: [], rules: [] };
  try {
    const inputs = resolveFixturePaths(c.inputs);
    const prompt = await assemblePrompt(skill, inputs, answersByQuestion(skill, c.answers));
    const { raw, envelope } = await invokeClaude({
      systemPrompt: prompt.systemPrompt,
      userMessage: prompt.userMessage,
      model: opts.model ?? prompt.model,
      maxBudgetUsd: opts.maxBudgetUsd,
      addDirs: inputFileDirs(inputs),
    });
    let costUsd = raw.total_cost_usd ?? 0;
    const output = envelope.body;

    const missing = missingSections(output, parseOutputContract(skill.body));
    const failedExpectations = checkExpectations(output, c);

    let rules: CaseResult["rules"] = [];
    const qualityBar = parseQualityBar(skill.body);
    if (opts.judge && qualityBar.length > 0) {
      const ruleList = qualityBar
        .map((r) => `- ${r.id} [${r.severity}] (${r.section}): ${r.rule}`)
        .join("\n");
      const judged = await invokeClaudeJson<{ results: RuleVerdict[] }>({
        systemPrompt: JUDGE_SYSTEM_PROMPT,
        userMessage: `## Quality Bar for ${name}\n\n${ruleList}\n\n## Output to grade\n\n${output}`,
        model: opts.judgeModel,
        schema: JUDGE_SCHEMA,
      });
      costUsd += judged.raw.total_cost_usd ?? 0;
      rules = qualityBar.map((r) => {
        const v = judged.value.results.find((x) => x.id === r.id);
        return {
          id: r.id,
          severity: r.severity,
          pass: v?.pass ?? false,
          reason: v?.reason ?? "judge returned no verdict",
        };
      });
    }

    const blockerFailed = rules.some((r) => r.severity === "blocker" && !r.pass);
    return {
      ...base,
      pass: missing.length === 0 && failedExpectations.length === 0 && !blockerFailed,
      missingSections: missing,
      failedExpectations,
      rules,
      costUsd,
    };
  } catch (err) {
    return { ...base, pass: false, costUsd: 0, error: (err as Error).message };
  }
}
