"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getProfile } from "@/features/profile/queries";
import { educationSchema } from "./validation";

export type EducationActionResult = {
  success?: boolean;
  error?: string;
};

export async function createEducationAction(
  _prevState: EducationActionResult | null,
  formData: FormData
): Promise<EducationActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const profile = await getProfile();

  const rawCourses = String(formData.get("courses") || "");
  const courses = rawCourses
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const rawStartDate = String(formData.get("startDate") || "").trim();
  const rawEndDate = String(formData.get("endDate") || "").trim();

  const rawData = {
    institution: String(formData.get("institution") || "").trim(),
    degree: String(formData.get("degree") || "").trim(),
    field: String(formData.get("field") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    courses,
    startDate: rawStartDate || null,
    endDate: rawEndDate || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = educationSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid education input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.education.create({
      data: {
        profileId: profile.id,
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        description: data.description,
        courses: data.courses,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: data.order,
      },
    });

    revalidatePath("/admin/education");
    revalidatePath("/admin");
    revalidatePath("/education");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create education record. Please try again." };
  }

  redirect("/admin/education");
}

export async function updateEducationAction(
  id: string,
  _prevState: EducationActionResult | null,
  formData: FormData
): Promise<EducationActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const rawCourses = String(formData.get("courses") || "");
  const courses = rawCourses
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const rawStartDate = String(formData.get("startDate") || "").trim();
  const rawEndDate = String(formData.get("endDate") || "").trim();

  const rawData = {
    institution: String(formData.get("institution") || "").trim(),
    degree: String(formData.get("degree") || "").trim(),
    field: String(formData.get("field") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    courses,
    startDate: rawStartDate || null,
    endDate: rawEndDate || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = educationSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid education input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.education.update({
      where: { id },
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        description: data.description,
        courses: data.courses,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: data.order,
      },
    });

    revalidatePath("/admin/education");
    revalidatePath(`/admin/education/${id}`);
    revalidatePath("/admin");
    revalidatePath("/education");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update education record. Please try again." };
  }

  redirect("/admin/education");
}

export async function deleteEducationAction(
  id: string
): Promise<EducationActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.education.delete({
      where: { id },
    });

    revalidatePath("/admin/education");
    revalidatePath("/admin");
    revalidatePath("/education");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete education record" };
  }
}
