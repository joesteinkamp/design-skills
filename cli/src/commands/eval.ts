import { readdir } from "node:fs/promises";
import path from "node:path";
import { findSkill } from "../skills/discover.js";
import { evalsRoot, loadEvalFile } from "../evals/cases.js";
import { runCase, type CaseResult } from "../evals/run.js";
import { writeOutput } from "../io/fs.js";

interface EvalOptions {
  judge: boolean;
  case?: string;
  model?: string;
  judgeModel?: string;
  maxBudgetUsd?: number;
  outDir?: string;
}

export async function evalCommand(skills: string[], opts: EvalOptions): Promise<void> {
  const names =
    skills.length > 0
      ? skills
      : (await readdir(evalsRoot())).filter((f) => f.endsWith(".yaml")).map((f) => f.replace(/\.yaml$/, ""));

  const results: CaseResult[] = [];
  for (const name of names.sort()) {
    const skill = await findSkill(name);
    if (!skill) {
      console.error(`Skill not found: ${name}`);
      process.exitCode = 1;
      continue;
    }
    const file = await loadEvalFile(name);
    for (const c of file.cases.filter((x) => !opts.case || x.id === opts.case)) {
      console.error(`Evaluating ${name} / ${c.id}...`);
      const r = await runCase(skill, c, opts);
      results.push(r);
      const failedRules = r.rules.filter((x) => !x.pass);
      console.error(
        `  ${r.pass ? "PASS" : "FAIL"}` +
          (r.error ? `  error: ${r.error}` : "") +
          (r.missingSections.length ? `  missing sections: ${r.missingSections.join(", ")}` : "") +
          (r.failedExpectations.length ? `  ${r.failedExpectations.join("; ")}` : "") +
          (failedRules.length
            ? `  failed rules: ${failedRules.map((x) => `${x.id}(${x.severity})`).join(", ")}`
            : ""),
      );
    }
  }

  const passed = results.filter((r) => r.pass).length;
  const cost = results.reduce((s, r) => s + r.costUsd, 0);
  console.error(`\n${passed}/${results.length} cases passed (cost: $${cost.toFixed(4)})`);

  const outDir = path.resolve(process.cwd(), opts.outDir ?? path.join("design", "evals"));
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const report = await writeOutput(outDir, `eval-${stamp}.json`, JSON.stringify(results, null, 2));
  console.error(`Report: ${report}`);

  if (passed < results.length) process.exitCode = 1;
}
