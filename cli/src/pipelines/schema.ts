import { z } from "zod";

// `input_from` is either a single "skill.output_key" string or an array of them.
const InputFrom = z.union([z.string(), z.array(z.string())]).optional();

const Step = z.object({
  skill: z.string(),
  input_key: z.string().optional(),
  input_from: InputFrom,
  output_key: z.string().optional(),
  depends_on: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
});

const EntryPoint = z.object({
  step: z.string(),
  when: z.string().optional(),
});

const ParallelGroup = z.object({
  name: z.string(),
  steps: z.array(z.string()),
  notes: z.string().optional(),
});

const Batch = z.object({
  input_key: z.string().optional(),
  parallelizable_steps: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
});

const OptionalAddition = Step.extend({
  when: z.string().optional(),
});

export const PipelineSchema = z.object({
  name: z.string(),
  description: z.string(),
  steps: z.array(Step).min(1),
  parallel: z.boolean().optional().default(false),
  parallel_groups: z.array(ParallelGroup).optional().default([]),
  entry_points: z.array(EntryPoint).optional().default([]),
  optional_additions: z.array(OptionalAddition).optional().default([]),
  batch: Batch.optional(),
});

export type Pipeline = z.infer<typeof PipelineSchema>;
export type PipelineStep = z.infer<typeof Step>;
