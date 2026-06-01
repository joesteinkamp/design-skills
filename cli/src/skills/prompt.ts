import { readFile } from "node:fs/promises";
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

function isEnoent(err: unknown): boolean {
  return (err as NodeJS.ErrnoException)?.code === "ENOENT";
}

async function loadReferenceTemplates(skill: DiscoveredSkill): Promise<string> {
  const refs = new Set<string>();
  for (const out of skill.frontmatter.outputs) {
    if (out.template) refs.add(out.template);
    if (out.schema) refs.add(out.schema);
  }
  if (refs.size === 0) return "";

  const loaded = await Promise.all(
    [...refs].map(async (rel) => {
      const abs = path.isAbsolute(rel) ? rel : path.join(skill.dir, rel);
      try {
        const content = await readFile(abs, "utf8");
        return `### Reference: \`${rel}\`\n\n${content.trim()}`;
      } catch (err) {
        if (isEnoent(err)) return null;
        throw err;
      }
    }),
  );
  const blocks = loaded.filter((b): b is string => b !== null);
  return blocks.length === 0 ? "" : `\n\n## Reference Templates\n\n${blocks.join("\n\n---\n\n")}`;
}

function renderKeyValues(entries: [string, unknown][]): string {
  const lines: string[] = [];
  for (const [k, v] of entries) {
    if (v === undefined || v === null || v === "") continue;
    const value = typeof v === "string" ? v : JSON.stringify(v);
    if (value.includes("\n")) lines.push(`### ${k}\n\n${value}`);
    else lines.push(`- **${k}**: ${value}`);
  }
  return lines.join("\n\n");
}

export async function assemblePrompt(
  skill: DiscoveredSkill,
  inputs: Record<string, unknown>,
  userAnswers: Record<string, unknown> = {},
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

  const sections: string[] = [
    `Run the **${skill.frontmatter.name}** skill with the following inputs.`,
    "",
    "## Inputs",
    "",
    renderKeyValues(Object.entries(inputs)) || "_(no inputs provided)_",
  ];
  const answerEntries = Object.entries(userAnswers);
  if (answerEntries.length > 0) {
    sections.push("", "## Answers to workflow questions", "", renderKeyValues(answerEntries));
  }
  sections.push("", "Produce the output JSON envelope as instructed in the system prompt.");

  return {
    systemPrompt,
    userMessage: sections.join("\n"),
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
