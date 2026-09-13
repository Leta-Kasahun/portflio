import { z } from "zod";

export const certificateSchema = z.object({
  name: z.string().min(2, "Certificate name must be at least 2 characters").max(150),
  issuer: z.string().min(2, "Issuer must be at least 2 characters").max(150),
  issueDate: z.string().optional().nullable(),
  credentialUrl: z.string().url("Invalid credential URL").optional().nullable().or(z.literal("")),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export type CertificateInput = z.infer<typeof certificateSchema>;
