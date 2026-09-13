import { prisma } from "@/lib/prisma";
import { Skill } from "@/generated/prisma/client";

const DEFAULT_SKILLS: Skill[] = [
  { id: "ts", name: "TypeScript", category: "Languages", level: "Advanced", icon: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: "js", name: "JavaScript", category: "Languages", level: "Expert", icon: null, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "java", name: "Java", category: "Languages", level: "Advanced", icon: null, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "php", name: "PHP", category: "Languages", level: "Proficient", icon: null, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "py", name: "Python", category: "Languages", level: "Proficient", icon: null, order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: "sql", name: "SQL", category: "Languages", level: "Advanced", icon: null, order: 5, createdAt: new Date(), updatedAt: new Date() },

  { id: "sb", name: "Spring Boot", category: "Backend & Systems", level: "Advanced", icon: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: "node", name: "Node.js", category: "Backend & Systems", level: "Expert", icon: null, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "exp", name: "Express", category: "Backend & Systems", level: "Expert", icon: null, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "dist", name: "Distributed Systems", category: "Backend & Systems", level: "Advanced", icon: null, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "api", name: "RESTful APIs", category: "Backend & Systems", level: "Expert", icon: null, order: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: "micro", name: "Microservices", category: "Backend & Systems", level: "Advanced", icon: null, order: 5, createdAt: new Date(), updatedAt: new Date() },

  { id: "next", name: "Next.js", category: "Frontend", level: "Expert", icon: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: "react", name: "React", category: "Frontend", level: "Expert", icon: null, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "tw", name: "Tailwind CSS", category: "Frontend", level: "Expert", icon: null, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "zustand", name: "State Management", category: "Frontend", level: "Advanced", icon: null, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "html", name: "HTML5 / CSS3", category: "Frontend", level: "Expert", icon: null, order: 4, createdAt: new Date(), updatedAt: new Date() },

  { id: "psql", name: "PostgreSQL", category: "Databases", level: "Advanced", icon: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: "mysql", name: "MySQL", category: "Databases", level: "Advanced", icon: null, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "mongo", name: "MongoDB", category: "Databases", level: "Advanced", icon: null, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "redis", name: "Redis", category: "Databases", level: "Proficient", icon: null, order: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "prisma", name: "Prisma ORM", category: "Databases", level: "Expert", icon: null, order: 4, createdAt: new Date(), updatedAt: new Date() },

  { id: "docker", name: "Docker", category: "DevOps & Cloud", level: "Advanced", icon: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: "git", name: "Git & GitHub", category: "DevOps & Cloud", level: "Expert", icon: null, order: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "linux", name: "Linux / Bash", category: "DevOps & Cloud", level: "Advanced", icon: null, order: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "cicd", name: "CI / CD", category: "DevOps & Cloud", level: "Proficient", icon: null, order: 3, createdAt: new Date(), updatedAt: new Date() },
];

export async function getAllSkills(): Promise<Skill[]> {
  try {
    const dbSkills = await prisma.skill.findMany({
      orderBy: [
        { category: "asc" },
        { order: "asc" },
        { name: "asc" },
      ],
    });
    if (dbSkills && dbSkills.length > 0) {
      return dbSkills;
    }
  } catch {}
  return DEFAULT_SKILLS;
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
