import { findSkill } from "../skills/discover.js";
import { flagKey } from "../io/slug.js";

export async function describeCommand(name: string): Promise<void> {
  const skill = await findSkill(name);
  if (!skill) {
    console.error(`Skill not found: ${name}`);
    process.exitCode = 1;
    return;
  }
  const fm = skill.frontmatter;
  const lines: string[] = [];
  lines.push(`# ${fm.name}`);
  if (skill.agent?.interface?.display_name) {
    lines.push(`_${skill.agent.interface.display_name}_`);
  }
  lines.push("");
  lines.push(fm.description);
  lines.push("");
  lines.push(`- source: ${skill.source}`);
  lines.push(`- dir: ${skill.dir}`);
  if (fm.category) lines.push(`- category: ${fm.category}`);
  if (fm.complexity) lines.push(`- complexity: ${fm.complexity}`);
  if (fm.output_length) lines.push(`- output_length: ${fm.output_length}`);
  if (skill.agent?.interface?.model) {
    lines.push(`- model: ${skill.agent.interface.model}`);
  }
  if (fm.tags.length > 0) lines.push(`- tags: ${fm.tags.join(", ")}`);

  if (fm.upstream_skills.length > 0) {
    lines.push("", "## Upstream", ...fm.upstream_skills.map((s) => `- ${s}`));
  }
  if (fm.downstream_skills.length > 0) {
    lines.push("", "## Downstream", ...fm.downstream_skills.map((s) => `- ${s}`));
  }

  if (fm.inputs.length > 0) {
    lines.push("", "## Inputs (pass as --<name>)");
    for (const i of fm.inputs) {
      lines.push(`- --${i.name}${i.required ? " (required)" : ""}: ${i.description ?? ""}`);
    }
  }
  if (fm.outputs.length > 0) {
    lines.push("", "## Outputs");
    for (const o of fm.outputs) {
      lines.push(`- ${o.name}${o.optional ? " (optional)" : ""}: ${o.type ?? ""}`);
    }
  }
  if (fm.user_inputs.length > 0) {
    lines.push("", "## Interactive questions (pass as --<flag>)");
    for (const q of fm.user_inputs) {
      const key = flagKey(q.question);
      const opts = q.options ? ` [${q.options.join("|")}]` : "";
      const def = q.default !== undefined ? ` (default: ${q.default})` : "";
      lines.push(`- --${key}${opts}${def}: ${q.question}`);
    }
  }
  if (fm.tools.length > 0) {
    lines.push("", "## Tools (delegated to MCP servers)");
    for (const t of fm.tools) lines.push(`- ${t.name}: ${t.actions.join(", ")}`);
  }
  console.log(lines.join("\n"));
}
