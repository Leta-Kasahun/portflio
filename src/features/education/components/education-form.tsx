"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Education } from "@/generated/prisma/client";
import {
  createEducationAction,
  updateEducationAction,
  EducationActionResult,
} from "../mutations";

type EducationFormProps = {
  education?: Education | null;
};

export function EducationForm({ education }: EducationFormProps) {
  const boundAction = education
    ? updateEducationAction.bind(null, education.id)
    : createEducationAction;

  const [state, formAction, isPending] = useActionState<
    EducationActionResult | null,
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
            htmlFor="institution"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Institution / University
          </label>
          <input
            id="institution"
            name="institution"
            type="text"
            required
            defaultValue={education?.institution || ""}
            placeholder="e.g. Addis Ababa University"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="degree"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Degree / Qualification
          </label>
          <input
            id="degree"
            name="degree"
            type="text"
            required
            defaultValue={education?.degree || ""}
            placeholder="e.g. B.Sc. in Computer Science"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="field"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Field of Study (Optional)
          </label>
          <input
            id="field"
            name="field"
            type="text"
            defaultValue={education?.field || ""}
            placeholder="e.g. Software Engineering & Systems"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
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
            defaultValue={education?.order ?? 0}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
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
            defaultValue={formatDateInput(education?.startDate)}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Graduation / End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={formatDateInput(education?.endDate)}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="courses"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Relevant Coursework (comma separated)
          </label>
          <input
            id="courses"
            name="courses"
            type="text"
            defaultValue={education?.courses.join(", ") || ""}
            placeholder="Distributed Systems, Algorithms & Data Structures, Database Internals, Compiler Design"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Description / Academic Honors (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={education?.description || ""}
          placeholder="Graduated Magna Cum Laude, Dean's List, Capstone project on distributed consensus."
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/education"
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
            : education
            ? "Update Education"
            : "Create Education"}
        </button>
      </div>
    </form>
  );
}
