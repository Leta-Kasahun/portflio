"use client";

import { useActionState } from "react";
import Link from "next/link";
import { BlogPost } from "@/generated/prisma/client";
import {
  createBlogPostAction,
  updateBlogPostAction,
  BlogActionResult,
} from "../mutations";

type BlogPostFormProps = {
  post?: BlogPost | null;
};

export function BlogPostForm({ post }: BlogPostFormProps) {
  const boundAction = post
    ? updateBlogPostAction.bind(null, post.id)
    : createBlogPostAction;

  const [state, formAction, isPending] = useActionState<
    BlogActionResult | null,
    FormData
  >(boundAction, null);

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Article Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={post?.title || ""}
            placeholder="e.g. Scaling Distributed State Machines with Raft"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Slug (URL Identifier)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={post?.slug || ""}
            placeholder="auto-generated from title if blank"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="tags"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Tags / Topics (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={post?.tags.join(", ") || ""}
            placeholder="Distributed Systems, Go, Concurrency, Performance"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="coverImageFile"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Cover Image
          </label>
          <input
            id="coverImageFile"
            name="coverImageFile"
            type="file"
            accept="image/*"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />
          {post?.coverImage && (
            <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
              Current:{" "}
              <a
                href={post.coverImage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3FC7B0] underline"
              >
                View Cover Image
              </a>
            </p>
          )}
          <input
            type="hidden"
            name="coverImage"
            defaultValue={post?.coverImage || ""}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="excerpt"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Excerpt / Executive Summary
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          required
          defaultValue={post?.excerpt || ""}
          placeholder="Brief 2-3 sentence overview for search previews and article cards."
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Full Article Content (Markdown supported)
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          required
          defaultValue={post?.content || ""}
          placeholder="Write in Markdown. Include headers, code blocks, bullet points, and diagrams."
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div className="flex flex-wrap gap-6 pt-2">
        <div className="flex items-center gap-2">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={post?.published ?? false}
            className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
          />
          <label
            htmlFor="published"
            className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
          >
            Publish Article
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            defaultChecked={post?.featured ?? false}
            className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
          />
          <label
            htmlFor="featured"
            className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
          >
            Feature on Homepage
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/blog"
          className="rounded-lg border border-[#22282B] px-5 py-2.5 text-center font-sans text-sm text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : post
            ? "Update Article"
            : "Create Article"}
        </button>
      </div>
    </form>
  );
}
