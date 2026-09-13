"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/upload";
import { blogPostSchema } from "./validation";

export type BlogActionResult = {
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

export async function createBlogPostAction(
  _prevState: BlogActionResult | null,
  formData: FormData
): Promise<BlogActionResult> {
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
    coverImageUrl = await saveUploadedFile(coverImageFile, "blog");
  }

  const rawTags = String(formData.get("tags") || "");
  const tags = rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const isPublished =
    formData.get("published") === "on" || formData.get("published") === "true";
  const isFeatured =
    formData.get("featured") === "on" || formData.get("featured") === "true";

  const rawData = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    coverImage: coverImageUrl || String(formData.get("coverImage") || "").trim() || null,
    tags,
    published: isPublished,
    featured: isFeatured,
  };

  const validation = blogPostSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid blog post input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const existingSlug = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return { error: "An article with this slug already exists" };
    }

    await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags,
        published: data.published,
        featured: data.featured,
        publishedAt: data.published ? new Date() : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
  } catch {
    return { error: "Failed to create blog post. Please try again." };
  }

  redirect("/admin/blog");
}

export async function updateBlogPostAction(
  id: string,
  _prevState: BlogActionResult | null,
  formData: FormData
): Promise<BlogActionResult> {
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
    coverImageUrl = await saveUploadedFile(coverImageFile, "blog");
  }

  const rawTags = String(formData.get("tags") || "");
  const tags = rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const isPublished =
    formData.get("published") === "on" || formData.get("published") === "true";
  const isFeatured =
    formData.get("featured") === "on" || formData.get("featured") === "true";

  const rawData = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    coverImage: coverImageUrl || String(formData.get("coverImage") || "").trim() || null,
    tags,
    published: isPublished,
    featured: isFeatured,
  };

  const validation = blogPostSchema.safeParse(rawData);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Invalid blog post input";
    return { error: firstError };
  }

  const data = validation.data;

  try {
    const conflicting = await prisma.blogPost.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (conflicting) {
      return { error: "Another article with this slug already exists" };
    }

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    const publishedAt =
      data.published && !existingPost?.publishedAt
        ? new Date()
        : existingPost?.publishedAt;

    await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        tags: data.tags,
        published: data.published,
        featured: data.featured,
        publishedAt: data.published ? publishedAt : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}`);
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
  } catch {
    return { error: "Failed to update blog post. Please try again." };
  }

  redirect("/admin/blog");
}

export async function deleteBlogPostAction(id: string): Promise<BlogActionResult> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");

    return { success: true };
  } catch {
    return { error: "Failed to delete blog post" };
  }
}
