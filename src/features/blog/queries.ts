import { prisma } from "@/lib/prisma";
import { BlogPost } from "@/generated/prisma/client";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({
    where: { id },
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [
      { publishedAt: "desc" },
      { createdAt: "desc" },
    ],
  });
}
