"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/generated/prisma/client";
import { updateProfileAction, ProfileActionResult } from "../mutations";

type ProfileFormProps = {
  profile: Profile;
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ProfileActionResult | null, FormData>(
    updateProfileAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={profile.id} />

      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Profile saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block font-mono text-xs font-medium text-[#8A9295]">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={profile.name}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label htmlFor="title" className="block font-mono text-xs font-medium text-[#8A9295]">
            Professional Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={profile.title}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs font-medium text-[#8A9295]">
            Contact Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={profile.email || ""}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label htmlFor="location" className="block font-mono text-xs font-medium text-[#8A9295]">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={profile.location || ""}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label htmlFor="imageFile" className="block font-mono text-xs font-medium text-[#8A9295]">
            Profile Photo
          </label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />
          {profile.imageUrl && (
            <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
              Current: <a href={profile.imageUrl} target="_blank" rel="noopener noreferrer" className="text-[#3FC7B0] underline">View Image</a>
            </p>
          )}
          <input type="hidden" name="imageUrl" defaultValue={profile.imageUrl || ""} />
        </div>

        <div>
          <label htmlFor="resumeFile" className="block font-mono text-xs font-medium text-[#8A9295]">
            Resume (PDF)
          </label>
          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            accept=".pdf"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />
          {profile.resumeUrl && (
            <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
              Current: <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[#3FC7B0] underline">View Resume</a>
            </p>
          )}
          <input type="hidden" name="resumeUrl" defaultValue={profile.resumeUrl || ""} />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block font-mono text-xs font-medium text-[#8A9295]">
          Bio (Headline Summary)
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          required
          defaultValue={profile.bio}
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div>
        <label htmlFor="about" className="block font-mono text-xs font-medium text-[#8A9295]">
          About (Narrative)
        </label>
        <textarea
          id="about"
          name="about"
          rows={5}
          required
          defaultValue={profile.about}
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
