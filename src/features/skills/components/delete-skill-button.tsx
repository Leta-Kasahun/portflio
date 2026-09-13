"use client";

import { useTransition } from "react";
import { deleteSkillAction } from "../mutations";

type DeleteSkillButtonProps = {
  skillId: string;
  skillName: string;
};

export function DeleteSkillButton({ skillId, skillName }: DeleteSkillButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete skill "${skillName}"?`)) {
      startTransition(async () => {
        await deleteSkillAction(skillId);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded border border-red-500/30 px-2 py-0.5 font-mono text-[11px] text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
