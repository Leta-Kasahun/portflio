"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { contactMessageSchema } from "./validation";

export type MessageActionResult = {
  success?: boolean;
  error?: string;
};

export async function createMessageAction(
  _prevState: MessageActionResult | null,
  formData: FormData
): Promise<MessageActionResult> {
  const rawData = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    subject: String(formData.get("subject") || "").trim() || null,
    message: String(formData.get("message") || "").trim(),
  };

  const validation = contactMessageSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return { success: true };
  } catch {
    return { error: "Failed to send message. Please try again." };
  }
}

export async function deleteMessageAction(id: string): Promise<MessageActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    revalidatePath("/admin/messages");
    revalidatePath("/admin");

    return { success: true };
  } catch {
    return { error: "Failed to delete message" };
  }
}
