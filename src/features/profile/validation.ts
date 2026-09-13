import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  title: z.string().min(2, "Title must be at least 2 characters").max(120),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  about: z.string().min(20, "About must be at least 20 characters"),
  location: z.string().max(100).optional().nullable(),
  email: z.string().email("Invalid email address").optional().nullable().or(z.literal("")),
  imageUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
