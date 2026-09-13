"use client";

import { useTransition } from "react";
import { deleteMessageAction } from "../mutations";

type DeleteMessageButtonProps = {
  messageId: string;
};

export function DeleteMessageButton({ messageId }: DeleteMessageButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this message?")) {
      startTransition(async () => {
        await deleteMessageAction(messageId);
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
