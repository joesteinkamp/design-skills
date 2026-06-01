import { z } from "zod";

const SkillInput = z.object({
  name: z.string(),
  required: z.boolean().optional().default(false),
  type: z.string().optional(),
  description: z.string().optional(),
  source_skill: z.string().optional(),
});

const SkillOutput = z.object({
  name: z.string(),
  type: z.string().optional(),
  template: z.string().optional(),
  schema: z.string().optional(),
  optional: z.boolean().optional().default(false),
  target_skill: z.string().optional(),
});

const SkillTool = z.object({
  name: z.string(),
  actions: z.array(z.string()).optional().default([]),
  when: z.string().optional(),
});

const UserInput = z.object({
  step: z.number().optional(),
  question: z.string(),
  required: z.boolean().optional().default(false),
  options: z.array(z.string()).optional(),
  default: z.union([z.string(), z.boolean(), z.number()]).optional(),
});

const Batch = z.object({
  enabled: z.boolean().optional(),
  input_key: z.string().optional(),
  parallelizable: z.boolean().optional(),
  notes: z.string().optional(),
});

export const SkillFrontmatterSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  complexity: z.enum(["light", "moderate", "heavy"]).optional(),
  output_length: z.enum(["short", "medium", "long"]).optional(),
  upstream_skills: z.array(z.string()).optional().default([]),
  downstream_skills: z.array(z.string()).optional().default([]),
  inputs: z.array(SkillInput).optional().default([]),
  outputs: z.array(SkillOutput).optional().default([]),
  tools: z.array(SkillTool).optional().default([]),
  user_inputs: z.array(UserInput).optional().default([]),
  batch: Batch.optional(),
});

export type SkillFrontmatter = z.infer<typeof SkillFrontmatterSchema>;

export const AgentConfigSchema = z.object({
  interface: z
    .object({
      display_name: z.string().optional(),
      short_description: z.string().optional(),
      default_prompt: z.string().optional(),
      model: z.string().optional(),
      context_strategy: z.string().optional(),
    })
    .optional(),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;
