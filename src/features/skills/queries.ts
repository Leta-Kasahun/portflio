import { prisma } from "@/lib/prisma";
import { Skill } from "@/generated/prisma/client";

export async function getAllSkills(): Promise<Skill[]> {
  return prisma.skill.findMany({
    orderBy: [
      { category: "asc" },
      { order: "asc" },
      { name: "asc" },
    ],
  });
}

export async function getSkillById(id: string): Promise<Skill | null> {
  return prisma.skill.findUnique({
    where: { id },
  });
}

export async function getSkillsGroupedByCategory(): Promise<Record<string, Skill[]>> {
  const skills = await getAllSkills();
  const grouped: Record<string, Skill[]> = {};

  for (const skill of skills) {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  }

  return grouped;
}
