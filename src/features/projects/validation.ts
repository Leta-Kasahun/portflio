import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(150),
  slug: z.string().min(2, "Slug must be at least 2 characters").max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().optional().nullable(),
  technologies: z.array(z.string()).default([]),
  githubUrl: z.string().url("Invalid GitHub URL").optional().nullable().or(z.literal("")),
  liveUrl: z.string().url("Invalid Live URL").optional().nullable().or(z.literal("")),
  coverImage: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
  category: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  challenge: z.string().optional().nullable(),
  outcome: z.string().optional().nullable(),
  keyFeatures: z.array(z.string()).default([]),
  situation: z.string().optional().nullable(),
  task: z.string().optional().nullable(),
  action: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  architecturePattern: z.string().optional().nullable(),
  architectureNodes: z
    .array(
      z.object({
        id: z.string(),
        layer: z.string(),
        name: z.string(),
        badge: z.string().optional().nullable(),
        protocol: z.string().optional().nullable(),
        role: z.string(),
        specifications: z.array(z.string()).default([]),
      })
    )
    .optional()
    .nullable(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
