import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform name is required").max(50),
  url: z.string().url("Invalid URL").min(4),
  order: z.number().int().default(0),
});

export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
