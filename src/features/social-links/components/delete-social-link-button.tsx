"use client";

import { useTransition } from "react";
import { deleteSocialLinkAction } from "../mutations";

type DeleteSocialLinkButtonProps = {
  linkId: string;
  platformName: string;
};

export function DeleteSocialLinkButton({
  linkId,
  platformName,
}: DeleteSocialLinkButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${platformName} link?`)) {
      startTransition(async () => {
        await deleteSocialLinkAction(linkId);
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
