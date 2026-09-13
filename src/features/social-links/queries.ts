import { prisma } from "@/lib/prisma";
import { SocialLink } from "@/generated/prisma/client";

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  return prisma.socialLink.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  return prisma.socialLink.findUnique({
    where: { id },
  });
}
