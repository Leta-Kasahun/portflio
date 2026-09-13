"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload";
import { profileSchema } from "./validation";

export type ProfileActionResult = {
  success?: boolean;
  error?: string;
};

export async function updateProfileAction(
  _prevState: ProfileActionResult | null,
  formData: FormData
): Promise<ProfileActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const imageFile = formData.get("imageFile");
  const resumeFile = formData.get("resumeFile");

  let uploadedImageUrl: string | null = null;
  let uploadedResumeUrl: string | null = null;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    uploadedImageUrl = await saveUploadedFile(imageFile, "images");
  }

  if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
    uploadedResumeUrl = await saveUploadedFile(resumeFile, "resumes");
  }

  const rawData = {
    name: formData.get("name"),
    title: formData.get("title"),
    bio: formData.get("bio"),
    about: formData.get("about"),
    location: formData.get("location") || null,
    email: formData.get("email") || null,
    imageUrl: uploadedImageUrl || formData.get("imageUrl") || null,
    resumeUrl: uploadedResumeUrl || formData.get("resumeUrl") || null,
  };

  const validation = profileSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input data";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const existing = await prisma.profile.findFirst();

    if (existing) {
      await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          title: data.title,
          bio: data.bio,
          about: data.about,
          location: data.location || null,
          email: data.email || null,
          imageUrl: data.imageUrl || null,
          resumeUrl: data.resumeUrl || null,
        },
      });
    } else {
      await prisma.profile.create({
        data: {
          name: data.name,
          title: data.title,
          bio: data.bio,
          about: data.about,
          location: data.location || null,
          email: data.email || null,
          imageUrl: data.imageUrl || null,
          resumeUrl: data.resumeUrl || null,
        },
      });
    }

    revalidatePath("/admin/profile");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to update profile. Please try again." };
  }
}
