import { prisma } from "@/lib/prisma";
import { Certificate } from "@/generated/prisma/client";

export async function getAllCertificates(): Promise<Certificate[]> {
  return prisma.certificate.findMany({
    orderBy: [
      { order: "asc" },
      { issueDate: "desc" },
    ],
  });
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  return prisma.certificate.findUnique({
    where: { id },
  });
}
