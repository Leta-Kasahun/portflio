"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getProfile } from "@/features/profile/queries";
import { experienceSchema } from "./validation";

export type ExperienceActionResult = {
  success?: boolean;
  error?: string;
};

export async function createExperienceAction(
  _prevState: ExperienceActionResult | null,
  formData: FormData
): Promise<ExperienceActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const profile = await getProfile();

  const isCurrent =
    formData.get("current") === "on" || formData.get("current") === "true";
  const rawHighlights = String(formData.get("highlights") || "");
  const highlights = rawHighlights
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rawData = {
    company: String(formData.get("company") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    highlights,
    startDate: String(formData.get("startDate") || "").trim(),
    endDate: isCurrent ? null : String(formData.get("endDate") || "").trim() || null,
    current: isCurrent,
    order: Number(formData.get("order")) || 0,
  };

  const validation = experienceSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid experience input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.experience.create({
      data: {
        profileId: profile.id,
        company: data.company,
        role: data.role,
        description: data.description,
        highlights: data.highlights,
        startDate: new Date(data.startDate),
        endDate: data.current || !data.endDate ? null : new Date(data.endDate),
        order: data.order,
      },
    });

    revalidatePath("/admin/experience");
    revalidatePath("/admin");
    revalidatePath("/experience");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create experience entry. Please try again." };
  }

  redirect("/admin/experience");
}

export async function updateExperienceAction(
  id: string,
  _prevState: ExperienceActionResult | null,
  formData: FormData
): Promise<ExperienceActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const isCurrent =
    formData.get("current") === "on" || formData.get("current") === "true";
  const rawHighlights = String(formData.get("highlights") || "");
  const highlights = rawHighlights
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const rawData = {
    company: String(formData.get("company") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    highlights,
    startDate: String(formData.get("startDate") || "").trim(),
    endDate: isCurrent ? null : String(formData.get("endDate") || "").trim() || null,
    current: isCurrent,
    order: Number(formData.get("order")) || 0,
  };

  const validation = experienceSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid experience input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.experience.update({
      where: { id },
      data: {
        company: data.company,
        role: data.role,
        description: data.description,
        highlights: data.highlights,
        startDate: new Date(data.startDate),
        endDate: data.current || !data.endDate ? null : new Date(data.endDate),
        order: data.order,
      },
    });

    revalidatePath("/admin/experience");
    revalidatePath(`/admin/experience/${id}`);
    revalidatePath("/admin");
    revalidatePath("/experience");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update experience entry. Please try again." };
  }

  redirect("/admin/experience");
}

export async function deleteExperienceAction(
  id: string
): Promise<ExperienceActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/admin/experience");
    revalidatePath("/admin");
    revalidatePath("/experience");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete experience entry" };
  }
}
