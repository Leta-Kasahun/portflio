import { prisma } from "@/lib/prisma";
import { Experience } from "@/generated/prisma/client";

export async function getAllExperiences(): Promise<Experience[]> {
  return prisma.experience.findMany({
    orderBy: [
      { order: "asc" },
      { startDate: "desc" },
    ],
  });
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  return prisma.experience.findUnique({
    where: { id },
  });
}
