"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getProfile } from "@/features/profile/queries";
import { socialLinkSchema } from "./validation";

export type SocialLinkActionResult = {
  success?: boolean;
  error?: string;
};

export async function createSocialLinkAction(
  _prevState: SocialLinkActionResult | null,
  formData: FormData
): Promise<SocialLinkActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const profile = await getProfile();

  const rawData = {
    platform: String(formData.get("platform") || "").trim(),
    url: String(formData.get("url") || "").trim(),
    order: Number(formData.get("order")) || 0,
  };

  const validation = socialLinkSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.socialLink.create({
      data: {
        profileId: profile.id,
        platform: data.platform,
        url: data.url,
        order: data.order,
      },
    });

    revalidatePath("/admin/social-links");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create social link. Please try again." };
  }

  redirect("/admin/social-links");
}

export async function updateSocialLinkAction(
  id: string,
  _prevState: SocialLinkActionResult | null,
  formData: FormData
): Promise<SocialLinkActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const rawData = {
    platform: String(formData.get("platform") || "").trim(),
    url: String(formData.get("url") || "").trim(),
    order: Number(formData.get("order")) || 0,
  };

  const validation = socialLinkSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.socialLink.update({
      where: { id },
      data: {
        platform: data.platform,
        url: data.url,
        order: data.order,
      },
    });

    revalidatePath("/admin/social-links");
    revalidatePath(`/admin/social-links/${id}`);
    revalidatePath("/admin");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update social link. Please try again." };
  }

  redirect("/admin/social-links");
}

export async function deleteSocialLinkAction(id: string): Promise<SocialLinkActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.socialLink.delete({
      where: { id },
    });

    revalidatePath("/admin/social-links");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete social link" };
  }
}
