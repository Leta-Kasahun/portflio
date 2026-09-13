import { prisma } from "@/lib/prisma";
import { Experience } from "@/generated/prisma/client";

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const dbExperiences = await prisma.experience.findMany({
      orderBy: [
        { order: "asc" },
        { startDate: "desc" },
      ],
    });
    return dbExperiences || [];
  } catch {
    return [];
  }
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  return prisma.experience.findUnique({
    where: { id },
  });
}
