"use client";

import { useTransition } from "react";
import { deleteEducationAction } from "../mutations";

type DeleteEducationButtonProps = {
  educationId: string;
  institutionName: string;
};

export function DeleteEducationButton({
  educationId,
  institutionName,
}: DeleteEducationButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete education record at "${institutionName}"?`)) {
      startTransition(async () => {
        await deleteEducationAction(educationId);
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
