import { prisma } from "@/lib/prisma";
import { ContactMessage } from "@/generated/prisma/client";

export async function getAllMessages(): Promise<ContactMessage[]> {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getMessageById(id: string): Promise<ContactMessage | null> {
  return prisma.contactMessage.findUnique({
    where: { id },
  });
}
