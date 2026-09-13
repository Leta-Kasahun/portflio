"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { skillSchema } from "./validation";

export type SkillActionResult = {
  success?: boolean;
  error?: string;
};

export async function createSkillAction(
  _prevState: SkillActionResult | null,
  formData: FormData
): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const rawData = {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    level: String(formData.get("level") || "").trim() || null,
    icon: String(formData.get("icon") || "").trim() || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = skillSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid skill input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const existing = await prisma.skill.findUnique({
      where: {
        name_category: {
          name: data.name,
          category: data.category,
        },
      },
    });

    if (existing) {
      return { error: `Skill "${data.name}" already exists in category "${data.category}"` };
    }

    await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category,
        level: data.level,
        icon: data.icon,
        order: data.order,
      },
    });

    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create skill. Please try again." };
  }

  redirect("/admin/skills");
}

export async function updateSkillAction(
  id: string,
  _prevState: SkillActionResult | null,
  formData: FormData
): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const rawData = {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    level: String(formData.get("level") || "").trim() || null,
    icon: String(formData.get("icon") || "").trim() || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = skillSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid skill input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const conflicting = await prisma.skill.findFirst({
      where: {
        name: data.name,
        category: data.category,
        NOT: { id },
      },
    });

    if (conflicting) {
      return { error: `Another skill named "${data.name}" already exists in "${data.category}"` };
    }

    await prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        level: data.level,
        icon: data.icon,
        order: data.order,
      },
    });

    revalidatePath("/admin/skills");
    revalidatePath(`/admin/skills/${id}`);
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update skill. Please try again." };
  }

  redirect("/admin/skills");
}

export async function deleteSkillAction(id: string): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete skill" };
  }
}
