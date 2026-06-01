import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { DiscoveredSkill } from "./discover.js";

export interface AssembledPrompt {
  systemPrompt: string;
  userMessage: string;
  model?: string;
}

const OUTPUT_ENVELOPE_INSTRUCTIONS = `
## Output Format

Return your response as a single JSON object matching this schema:

\`\`\`json
{
  "filename": "<kebab-case>.md",
  "body": "<full markdown body of the primary output>",
  "sidecars": [
    { "filename": "<kebab-case>.md", "body": "<markdown>" }
  ]
}
\`\`\`

- \`filename\` must end in \`.md\` and be derived from the feature/topic (no path, just a name).
- \`body\` must contain every required section from the Output Contract above, as well-formed markdown.
- \`sidecars\` is for optional secondary outputs declared in the Output Contract (e.g. a dev-handoff summary); omit or use [] if none.
- Do NOT wrap the JSON in markdown code fences. Emit raw JSON only.
`.trim();

async function loadReferenceTemplates(skill: DiscoveredSkill): Promise<string> {
  const refs = new Set<string>();
  for (const out of skill.frontmatter.outputs) {
    if (out.template) refs.add(out.template);
    if (out.schema) refs.add(out.schema);
  }
  if (refs.size === 0) return "";

  const blocks: string[] = [];
  for (const rel of refs) {
    const abs = path.isAbsolute(rel) ? rel : path.join(skill.dir, rel);
    if (!existsSync(abs)) continue;
    const content = await readFile(abs, "utf8");
    blocks.push(`### Reference: \`${rel}\`\n\n${content.trim()}`);
  }
  if (blocks.length === 0) return "";
  return `\n\n## Reference Templates\n\n${blocks.join("\n\n---\n\n")}`;
}

function renderInputs(inputs: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(inputs)) {
    if (v === undefined || v === null || v === "") continue;
    const value = typeof v === "string" ? v : JSON.stringify(v);
    const isMultiline = value.includes("\n");
    if (isMultiline) {
      lines.push(`### ${k}\n\n${value}`);
    } else {
      lines.push(`- **${k}**: ${value}`);
    }
  }
  return lines.join("\n\n");
}

export async function assemblePrompt(
  skill: DiscoveredSkill,
  inputs: Record<string, unknown>,
): Promise<AssembledPrompt> {
  const refs = await loadReferenceTemplates(skill);
  const systemPrompt = [
    `You are running the **${skill.frontmatter.name}** skill.`,
    skill.frontmatter.description,
    "",
    "Follow the workflow, output contract, and quality bar defined below precisely.",
    "",
    "---",
    "",
    skill.body,
    refs,
    "",
    "---",
    "",
    OUTPUT_ENVELOPE_INSTRUCTIONS,
  ].join("\n");

  const userMessage = [
    `Run the **${skill.frontmatter.name}** skill with the following inputs.`,
    "",
    "## Inputs",
    "",
    renderInputs(inputs) || "_(no inputs provided)_",
    "",
    "Produce the output JSON envelope as instructed in the system prompt.",
  ].join("\n");

  return {
    systemPrompt,
    userMessage,
    model: skill.agent?.interface?.model,
  };
}

export const OUTPUT_JSON_SCHEMA = {
  type: "object",
  properties: {
    filename: { type: "string", pattern: ".+\\.md$" },
    body: { type: "string", minLength: 1 },
    sidecars: {
      type: "array",
      items: {
        type: "object",
        properties: {
          filename: { type: "string", pattern: ".+\\.md$" },
          body: { type: "string", minLength: 1 },
        },
        required: ["filename", "body"],
        additionalProperties: false,
      },
    },
  },
  required: ["filename", "body"],
  additionalProperties: false,
} as const;
