"use client";

import { useTransition } from "react";
import { deleteBlogPostAction } from "../mutations";

type DeleteBlogPostButtonProps = {
  postId: string;
  postTitle: string;
};

export function DeleteBlogPostButton({ postId, postTitle }: DeleteBlogPostButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete article "${postTitle}"?`)) {
      startTransition(async () => {
        await deleteBlogPostAction(postId);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded border border-red-500/30 px-2.5 py-1 font-mono text-xs text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
