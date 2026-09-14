"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload";
import { projectSchema } from "./validation";

export type ProjectActionResult = {
  success?: boolean;
  error?: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createProjectAction(
  _prevState: ProjectActionResult | null,
  formData: FormData
): Promise<ProjectActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugify(title);

  const coverImageFile = formData.get("coverImageFile");
  let coverImageUrl: string | null = null;

  if (coverImageFile && coverImageFile instanceof File && coverImageFile.size > 0) {
    coverImageUrl = await saveUploadedFile(coverImageFile, "projects");
  }

  const rawTechnologies = String(formData.get("technologies") || "");
  const technologies = rawTechnologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  const category = String(formData.get("category") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const problem = String(formData.get("problem") || formData.get("situation") || "").trim();
  const solution = String(formData.get("solution") || formData.get("action") || "").trim();
  const challenge = String(formData.get("challenge") || formData.get("task") || "").trim();
  const outcome = String(formData.get("outcome") || formData.get("result") || "").trim();
  const rawKeyFeatures = String(formData.get("keyFeatures") || "").trim();
  const keyFeatures = rawKeyFeatures
    ? rawKeyFeatures
        .split("\n")
        .map((item) => item.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean)
    : [];

  const hasCaseStudy =
    category ||
    role ||
    problem ||
    solution ||
    challenge ||
    outcome ||
    keyFeatures.length > 0;

  const caseStudyData = hasCaseStudy
    ? {
        category: category || null,
        role: role || null,
        problem: problem || null,
        solution: solution || null,
        challenge: challenge || null,
        outcome: outcome || null,
        keyFeatures,
        situation: problem || null,
        task: challenge || null,
        action: solution || null,
        result: outcome || null,
      }
    : undefined;

  const rawData = {
    title,
    slug,
    description: String(formData.get("description") || "").trim(),
    content: String(formData.get("content") || "").trim() || null,
    technologies,
    githubUrl: String(formData.get("githubUrl") || "").trim() || null,
    liveUrl: String(formData.get("liveUrl") || "").trim() || null,
    coverImage: coverImageUrl || String(formData.get("coverImage") || "").trim() || null,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    published: formData.get("published") === "on" || formData.get("published") === "true",
    order: Number(formData.get("order")) || 0,
    category: category || null,
    role: role || null,
    problem: problem || null,
    solution: solution || null,
    challenge: challenge || null,
    outcome: outcome || null,
    keyFeatures,
    situation: problem || null,
    task: challenge || null,
    action: solution || null,
    result: outcome || null,
  };

  const validation = projectSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid project input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const existingSlug = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return { error: "A project with this slug already exists" };
    }

    await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        technologies: data.technologies,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured,
        published: data.published,
        order: data.order,
        caseStudy: caseStudyData,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create project. Please try again." };
  }

  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectActionResult | null,
  formData: FormData
): Promise<ProjectActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugify(title);

  const coverImageFile = formData.get("coverImageFile");
  let coverImageUrl: string | null = null;

  if (coverImageFile && coverImageFile instanceof File && coverImageFile.size > 0) {
    coverImageUrl = await saveUploadedFile(coverImageFile, "projects");
  }

  const rawTechnologies = String(formData.get("technologies") || "");
  const technologies = rawTechnologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  const category = String(formData.get("category") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const problem = String(formData.get("problem") || formData.get("situation") || "").trim();
  const solution = String(formData.get("solution") || formData.get("action") || "").trim();
  const challenge = String(formData.get("challenge") || formData.get("task") || "").trim();
  const outcome = String(formData.get("outcome") || formData.get("result") || "").trim();
  const rawKeyFeatures = String(formData.get("keyFeatures") || "").trim();
  const keyFeatures = rawKeyFeatures
    ? rawKeyFeatures
        .split("\n")
        .map((item) => item.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean)
    : [];

  const hasCaseStudy =
    category ||
    role ||
    problem ||
    solution ||
    challenge ||
    outcome ||
    keyFeatures.length > 0;

  const caseStudyData = hasCaseStudy
    ? {
        category: category || null,
        role: role || null,
        problem: problem || null,
        solution: solution || null,
        challenge: challenge || null,
        outcome: outcome || null,
        keyFeatures,
        situation: problem || null,
        task: challenge || null,
        action: solution || null,
        result: outcome || null,
      }
    : undefined;

  const rawData = {
    title,
    slug,
    description: String(formData.get("description") || "").trim(),
    content: String(formData.get("content") || "").trim() || null,
    technologies,
    githubUrl: String(formData.get("githubUrl") || "").trim() || null,
    liveUrl: String(formData.get("liveUrl") || "").trim() || null,
    coverImage: coverImageUrl || String(formData.get("coverImage") || "").trim() || null,
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    published: formData.get("published") === "on" || formData.get("published") === "true",
    order: Number(formData.get("order")) || 0,
    category: category || null,
    role: role || null,
    problem: problem || null,
    solution: solution || null,
    challenge: challenge || null,
    outcome: outcome || null,
    keyFeatures,
    situation: problem || null,
    task: challenge || null,
    action: solution || null,
    result: outcome || null,
  };

  const validation = projectSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid project input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const conflicting = await prisma.project.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (conflicting) {
      return { error: "A different project with this slug already exists" };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        technologies: data.technologies,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured,
        published: data.published,
        order: data.order,
        caseStudy: caseStudyData,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update project. Please try again." };
  }

  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string): Promise<ProjectActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete project" };
  }
}
