"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { renameCategoryAction, deleteCategoryAction } from "../mutations";

type CategoryActionsProps = {
  category: string;
  count: number;
};

export function CategoryActions({ category, count }: CategoryActionsProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(category);
  const [isPending, startTransition] = useTransition();

  const handleRename = () => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === category) {
      setIsRenaming(false);
      return;
    }

    startTransition(async () => {
      await renameCategoryAction(category, trimmed);
      setIsRenaming(false);
    });
  };

  const handleDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete the category "${category}" and all its ${count} skills? This cannot be undone.`
      )
    ) {
      startTransition(async () => {
        await deleteCategoryAction(category);
      });
    }
  };

  if (isRenaming) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleRename();
            } else if (e.key === "Escape") {
              setIsRenaming(false);
              setNewName(category);
            }
          }}
          disabled={isPending}
          autoFocus
          className="rounded border border-[#3FC7B0] bg-[#0E1113] px-2.5 py-1 font-mono text-xs text-[#E7EAEA] outline-none"
        />
        <button
          type="button"
          onClick={handleRename}
          disabled={isPending}
          className="rounded bg-[#3FC7B0] px-2.5 py-1 font-mono text-[11px] font-medium text-[#0E1113] transition-colors hover:bg-[#35B8A3] disabled:opacity-50"
        >
          {isPending ? "..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRenaming(false);
            setNewName(category);
          }}
          disabled={isPending}
          className="rounded border border-[#22282B] px-2 py-1 font-mono text-[11px] text-[#8A9295] transition-colors hover:text-[#E7EAEA]"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/skills/new?category=${encodeURIComponent(category)}`}
        className="rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2.5 py-1 font-mono text-[11px] font-medium text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0] hover:text-[#0E1113]"
      >
        + Add Skills
      </Link>
      <button
        type="button"
        onClick={() => setIsRenaming(true)}
        disabled={isPending}
        className="rounded border border-[#22282B] px-2 py-1 font-mono text-[11px] text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
      >
        Rename
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded border border-red-500/20 px-2 py-1 font-mono text-[11px] text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      >
        {isPending ? "..." : "Delete"}
      </button>
    </div>
  );
}
