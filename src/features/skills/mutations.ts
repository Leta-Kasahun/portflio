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

type ParsedSkillItem = {
  name: string;
  level: string | null;
};

export async function createSkillAction(
  _prevState: SkillActionResult | null,
  formData: FormData
): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const category = String(formData.get("category") || "").trim();
  if (!category) {
    return { error: "Category is required. Please select or enter a category." };
  }

  const defaultLevel = String(formData.get("level") || "").trim() || null;
  const baseOrder = Number(formData.get("order")) || 0;
  const icon = String(formData.get("icon") || "").trim() || null;

  let itemsToCreate: ParsedSkillItem[] = [];

  const skillsDataRaw = formData.get("skillsData");
  if (skillsDataRaw && typeof skillsDataRaw === "string") {
    try {
      const parsed = JSON.parse(skillsDataRaw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          const name = typeof item === "string" ? item.trim() : String(item?.name || "").trim();
          const level = typeof item === "object" && item?.level ? String(item.level).trim() : defaultLevel;
          if (name.length > 0) {
            itemsToCreate.push({ name, level });
          }
        }
      }
    } catch {
      itemsToCreate = [];
    }
  }

  if (itemsToCreate.length === 0) {
    const rawName = String(formData.get("name") || "").trim();
    if (rawName) {
      const splitNames = rawName
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const name of splitNames) {
        itemsToCreate.push({ name, level: defaultLevel });
      }
    }
  }

  if (itemsToCreate.length === 0) {
    return { error: "Please enter at least one skill name." };
  }

  try {
    for (let i = 0; i < itemsToCreate.length; i++) {
      const item = itemsToCreate[i];
      await prisma.skill.upsert({
        where: {
          name_category: {
            name: item.name,
            category,
          },
        },
        update: {
          level: item.level,
          icon,
          order: baseOrder + i,
        },
        create: {
          name: item.name,
          category,
          level: item.level,
          icon,
          order: baseOrder + i,
        },
      });
    }

    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create skills. Please try again." };
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

export async function renameCategoryAction(
  oldCategory: string,
  newCategory: string
): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const trimmedOld = oldCategory.trim();
  const trimmedNew = newCategory.trim();

  if (!trimmedOld || !trimmedNew) {
    return { error: "Both old and new category names are required" };
  }

  if (trimmedOld === trimmedNew) {
    return { success: true };
  }

  try {
    const existingOldSkills = await prisma.skill.findMany({
      where: { category: trimmedOld },
    });

    for (const skill of existingOldSkills) {
      const conflict = await prisma.skill.findUnique({
        where: {
          name_category: {
            name: skill.name,
            category: trimmedNew,
          },
        },
      });

      if (conflict) {
        await prisma.skill.delete({ where: { id: skill.id } });
      } else {
        await prisma.skill.update({
          where: { id: skill.id },
          data: { category: trimmedNew },
        });
      }
    }

    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to rename category" };
  }
}

export async function deleteCategoryAction(
  category: string
): Promise<SkillActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const trimmed = category.trim();
  if (!trimmed) {
    return { error: "Category is required" };
  }

  try {
    await prisma.skill.deleteMany({
      where: { category: trimmed },
    });

    revalidatePath("/admin/skills");
    revalidatePath("/admin");
    revalidatePath("/skills");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete category" };
  }
}
