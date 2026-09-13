import { prisma } from "@/lib/prisma";
import { Profile } from "@/generated/prisma/client";

export async function getProfile(): Promise<Profile> {
  const profile = await prisma.profile.findFirst({
    orderBy: { updatedAt: "desc" },
  });

  if (profile) {
    return profile;
  }

  return prisma.profile.create({
    data: {
      name: "",
      title: "",
      bio: "",
      about: "",
      location: null,
      email: null,
      imageUrl: null,
      resumeUrl: null,
    },
  });
}
