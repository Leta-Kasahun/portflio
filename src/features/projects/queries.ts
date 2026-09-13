import { prisma } from "@/lib/prisma";
import { Project } from "@/generated/prisma/client";

export async function getAllProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });
}

export async function getProjectById(id: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function getPublishedProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });
}
