import { prisma } from "@/lib/prisma";
import { Skill } from "@/generated/prisma/client";

export async function getAllSkills(): Promise<Skill[]> {
  try {
    return await prisma.skill.findMany({
      orderBy: [
        { category: "asc" },
        { order: "asc" },
        { name: "asc" },
      ],
    });
  } catch {
    return [];
  }
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

export async function getSkillCategories(): Promise<string[]> {
  try {
    const skills = await prisma.skill.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });
    const categoriesFromDb = skills.map((s) => s.category).filter(Boolean);
    const defaults = [
      "Languages & Runtimes",
      "Distributed Systems & Cloud",
      "Databases & Storage",
      "Frameworks & Web",
      "DevOps & Infrastructure",
      "Architecture & Security",
    ];
    return Array.from(new Set([...categoriesFromDb, ...defaults]));
  } catch {
    return [
      "Languages & Runtimes",
      "Distributed Systems & Cloud",
      "Databases & Storage",
      "Frameworks & Web",
      "DevOps & Infrastructure",
      "Architecture & Security",
    ];
  }
}
