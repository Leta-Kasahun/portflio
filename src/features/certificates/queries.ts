import { prisma } from "@/lib/prisma";
import { Certificate } from "@/generated/prisma/client";

export async function getAllCertificates(): Promise<Certificate[]> {
  try {
    const dbCertificates = await prisma.certificate.findMany({
      orderBy: [
        { order: "asc" },
        { issueDate: "desc" },
      ],
    });
    return dbCertificates || [];
  } catch {
    return [];
  }
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  return prisma.certificate.findUnique({
    where: { id },
  });
}
