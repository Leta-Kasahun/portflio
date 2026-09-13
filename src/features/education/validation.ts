import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().min(2, "Institution name must be at least 2 characters").max(150),
  degree: z.string().min(2, "Degree must be at least 2 characters").max(150),
  field: z.string().max(150).optional().nullable(),
  description: z.string().optional().nullable(),
  courses: z.array(z.string()).default([]),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export type EducationInput = z.infer<typeof educationSchema>;
