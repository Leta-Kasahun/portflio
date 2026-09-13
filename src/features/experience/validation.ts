import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  highlights: z.array(z.string()).default([]),
  startDate: z.string().min(4, "Start date is required"),
  endDate: z.string().optional().nullable(),
  current: z.boolean().default(false),
  order: z.number().int().default(0),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
