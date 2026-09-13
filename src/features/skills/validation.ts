import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(100),
  category: z.string().min(1, "Category is required").max(100),
  level: z.string().max(50).optional().nullable(),
  icon: z.string().max(100).optional().nullable(),
  order: z.number().int().default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;
