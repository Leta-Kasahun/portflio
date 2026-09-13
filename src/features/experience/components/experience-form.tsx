"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Experience } from "@/generated/prisma/client";
import {
  createExperienceAction,
  updateExperienceAction,
  ExperienceActionResult,
} from "../mutations";

type ExperienceFormProps = {
  experience?: Experience | null;
};

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const [isCurrent, setIsCurrent] = useState<boolean>(!experience?.endDate && !!experience);

  const boundAction = experience
    ? updateExperienceAction.bind(null, experience.id)
    : createExperienceAction;

  const [state, formAction, isPending] = useActionState<
    ExperienceActionResult | null,
    FormData
  >(boundAction, null);

  const formatDateInput = (date?: Date | null) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

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
            htmlFor="company"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            defaultValue={experience?.company || ""}
            placeholder="e.g. Acme Cloud Corp"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Role / Job Title
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            defaultValue={experience?.role || ""}
            placeholder="e.g. Senior Backend Engineer"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={formatDateInput(experience?.startDate)}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            disabled={isCurrent}
            defaultValue={formatDateInput(experience?.endDate)}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0] disabled:cursor-not-allowed disabled:opacity-40"
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              id="current"
              name="current"
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
            />
            <label
              htmlFor="current"
              className="font-mono text-xs text-[#8A9295] cursor-pointer"
            >
              I currently work here
            </label>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Role Overview
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          defaultValue={experience?.description || ""}
          placeholder="Brief summary of domain, responsibilities, and team scope."
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div>
        <label
          htmlFor="highlights"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Key Achievements & Bullet Points (one per line)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={5}
          defaultValue={experience?.highlights.join("\n") || ""}
          placeholder="Architected event-driven ingestion pipeline handling 50k req/sec&#10;Reduced database query latency by 65% with Redis caching&#10;Mentored 4 junior engineers on distributed systems best practices"
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div>
        <label
          htmlFor="order"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Sort Order Index (0 = highest priority)
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={experience?.order ?? 0}
          className="mt-1.5 w-32 rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/experience"
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
            : experience
            ? "Update Experience"
            : "Create Experience"}
        </button>
      </div>
    </form>
  );
}
