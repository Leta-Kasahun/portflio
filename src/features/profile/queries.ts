import { prisma } from "@/lib/prisma";
import { Profile } from "@/generated/prisma/client";

export async function getProfile(): Promise<Profile> {
  const profile = await prisma.profile.findFirst();

  if (profile) {
    return profile;
  }

  return prisma.profile.create({
    data: {
      name: "Leta Kasahun",
      title: "Senior Full-Stack & Systems Engineer",
      bio: "Crafting resilient distributed systems, high-performance web applications, and intuitive developer experiences.",
      about: "Passionate software engineer focused on building clean, accessible, and scalable systems using modern web and backend technologies.",
      location: "Addis Ababa, Ethiopia",
      email: "letakasahun2@gmail.com",
    },
  });
}
