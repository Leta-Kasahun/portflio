"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SocialLink } from "@/generated/prisma/client";
import {
  createSocialLinkAction,
  updateSocialLinkAction,
  SocialLinkActionResult,
} from "../mutations";

type SocialLinkFormProps = {
  socialLink?: SocialLink | null;
};

const COMMON_PLATFORMS = [
  "GitHub",
  "LinkedIn",
  "Twitter / X",
  "Email",
  "YouTube",
  "Discord",
  "Telegram",
  "Substack",
];

export function SocialLinkForm({ socialLink }: SocialLinkFormProps) {
  const boundAction = socialLink
    ? updateSocialLinkAction.bind(null, socialLink.id)
    : createSocialLinkAction;

  const [state, formAction, isPending] = useActionState<
    SocialLinkActionResult | null,
    FormData
  >(boundAction, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="platform"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Platform Name
          </label>
          <input
            id="platform"
            name="platform"
            list="platform-suggestions"
            type="text"
            required
            defaultValue={socialLink?.platform || ""}
            placeholder="e.g. GitHub, LinkedIn"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
          <datalist id="platform-suggestions">
            {COMMON_PLATFORMS.map((plat) => (
              <option key={plat} value={plat} />
            ))}
          </datalist>
        </div>

        <div>
          <label
            htmlFor="order"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Display Order Index (0 = highest priority)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={socialLink?.order ?? 0}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="url"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Profile URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            defaultValue={socialLink?.url || ""}
            placeholder="https://github.com/yourhandle"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/social-links"
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
            : socialLink
            ? "Update Social Link"
            : "Create Social Link"}
        </button>
      </div>
    </form>
  );
}
