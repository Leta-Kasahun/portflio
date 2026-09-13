"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload";
import { certificateSchema } from "./validation";

export type CertificateActionResult = {
  success?: boolean;
  error?: string;
};

export async function createCertificateAction(
  _prevState: CertificateActionResult | null,
  formData: FormData
): Promise<CertificateActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const imageFile = formData.get("imageFile");
  let imageUrl: string | null = null;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await saveUploadedFile(imageFile, "certificates");
  }

  const rawIssueDate = String(formData.get("issueDate") || "").trim();

  const rawData = {
    name: String(formData.get("name") || "").trim(),
    issuer: String(formData.get("issuer") || "").trim(),
    issueDate: rawIssueDate || null,
    credentialUrl: String(formData.get("credentialUrl") || "").trim() || null,
    imageUrl: imageUrl || String(formData.get("imageUrl") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = certificateSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid certificate input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.certificate.create({
      data: {
        name: data.name,
        issuer: data.issuer,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        credentialUrl: data.credentialUrl,
        imageUrl: data.imageUrl,
        description: data.description,
        order: data.order,
      },
    });

    revalidatePath("/admin/certificates");
    revalidatePath("/admin");
    revalidatePath("/certificates");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create certificate. Please try again." };
  }

  redirect("/admin/certificates");
}

export async function updateCertificateAction(
  id: string,
  _prevState: CertificateActionResult | null,
  formData: FormData
): Promise<CertificateActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const imageFile = formData.get("imageFile");
  let imageUrl: string | null = null;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await saveUploadedFile(imageFile, "certificates");
  }

  const rawIssueDate = String(formData.get("issueDate") || "").trim();

  const rawData = {
    name: String(formData.get("name") || "").trim(),
    issuer: String(formData.get("issuer") || "").trim(),
    issueDate: rawIssueDate || null,
    credentialUrl: String(formData.get("credentialUrl") || "").trim() || null,
    imageUrl: imageUrl || String(formData.get("imageUrl") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    order: Number(formData.get("order")) || 0,
  };

  const validation = certificateSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid certificate input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    await prisma.certificate.update({
      where: { id },
      data: {
        name: data.name,
        issuer: data.issuer,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        credentialUrl: data.credentialUrl,
        imageUrl: data.imageUrl,
        description: data.description,
        order: data.order,
      },
    });

    revalidatePath("/admin/certificates");
    revalidatePath(`/admin/certificates/${id}`);
    revalidatePath("/admin");
    revalidatePath("/certificates");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update certificate. Please try again." };
  }

  redirect("/admin/certificates");
}

export async function deleteCertificateAction(
  id: string
): Promise<CertificateActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.certificate.delete({
      where: { id },
    });

    revalidatePath("/admin/certificates");
    revalidatePath("/admin");
    revalidatePath("/certificates");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete certificate" };
  }
}
