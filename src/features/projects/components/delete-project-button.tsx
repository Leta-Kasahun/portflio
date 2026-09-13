"use client";

import { useTransition } from "react";
import { deleteProjectAction } from "../mutations";

type DeleteProjectButtonProps = {
  projectId: string;
  projectTitle: string;
};

export function DeleteProjectButton({ projectId, projectTitle }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      startTransition(async () => {
        await deleteProjectAction(projectId);
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
