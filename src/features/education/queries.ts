import { prisma } from "@/lib/prisma";
import { Education } from "@/generated/prisma/client";

export async function getAllEducations(): Promise<Education[]> {
  return prisma.education.findMany({
    orderBy: [
      { order: "asc" },
      { startDate: "desc" },
    ],
  });
}

export async function getEducationById(id: string): Promise<Education | null> {
  return prisma.education.findUnique({
    where: { id },
  });
}
