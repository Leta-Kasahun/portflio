"use client";

import { useActionState, useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

  const [imagePreview, setImagePreview] = useState<string | null>(profile.imageUrl || null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [selectedResumeName, setSelectedResumeName] = useState<string | null>(null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    } else {
      setSelectedImageName(null);
    }
  }

  function handleResumeChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedResumeName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
    } else {
      setSelectedResumeName(null);
    }
  }

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="id" value={profile.id} />

      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Profile saved successfully. Changes are now live on your portfolio.
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

        <div className="rounded-lg border border-[#22282B] bg-[#0E1113]/50 p-4">
          <label htmlFor="imageFile" className="block font-mono text-xs font-medium text-[#3FC7B0]">
            Profile Photo Upload
          </label>

          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />

          {selectedImageName && (
            <div className="mt-2 flex items-center gap-2 rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2.5 py-1.5 text-xs text-[#3FC7B0]">
              <span className="font-semibold">Selected:</span>
              <span className="truncate">{selectedImageName}</span>
            </div>
          )}

          {imagePreview && (
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-[#3FC7B0]/50 bg-[#171B1D]">
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-xs text-[#8A9295] font-mono">
                <span>Active Image Preview</span>
              </div>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-[#22282B]">
            <label htmlFor="imageUrl" className="block font-mono text-[11px] text-[#8A9295]">
              Or Direct Image URL / Path
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              defaultValue={profile.imageUrl || ""}
              placeholder="e.g. /images/hero.jpg or https://..."
              className="mt-1 w-full rounded-md border border-[#22282B] bg-[#0E1113] px-3 py-1.5 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/40 outline-none transition-colors focus:border-[#3FC7B0]"
            />
          </div>
        </div>

        <div className="rounded-lg border border-[#22282B] bg-[#0E1113]/50 p-4">
          <label htmlFor="resumeFile" className="block font-mono text-xs font-medium text-[#3FC7B0]">
            Resume File Upload (PDF)
          </label>

          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleResumeChange}
            className="mt-2 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />

          {selectedResumeName && (
            <div className="mt-2 flex items-center gap-2 rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2.5 py-1.5 text-xs text-[#3FC7B0]">
              <span className="font-semibold">Selected:</span>
              <span className="truncate">{selectedResumeName}</span>
            </div>
          )}

          {profile.resumeUrl && !selectedResumeName && (
            <div className="mt-2 flex items-center gap-2 text-xs text-[#8A9295] font-mono">
              <span>Current saved in DB:</span>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3FC7B0] underline truncate max-w-[200px]"
              >
                {profile.resumeUrl}
              </a>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-[#22282B]">
            <label htmlFor="resumeUrl" className="block font-mono text-[11px] text-[#8A9295]">
              Or Direct Resume URL / Path
            </label>
            <input
              id="resumeUrl"
              name="resumeUrl"
              type="text"
              defaultValue={profile.resumeUrl || ""}
              placeholder="e.g. /resumes/cv.pdf or https://..."
              className="mt-1 w-full rounded-md border border-[#22282B] bg-[#0E1113] px-3 py-1.5 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/40 outline-none transition-colors focus:border-[#3FC7B0]"
            />
          </div>
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
          {isPending ? "Saving Profile..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
