import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(5, "Message must be at least 5 characters").max(3000),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
