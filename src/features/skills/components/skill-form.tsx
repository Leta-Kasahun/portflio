"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Skill } from "@/generated/prisma/client";
import {
  createSkillAction,
  updateSkillAction,
  SkillActionResult,
} from "../mutations";

type SkillFormProps = {
  skill?: Skill | null;
};

const COMMON_CATEGORIES = [
  "Languages & Runtimes",
  "Distributed Systems & Cloud",
  "Databases & Storage",
  "Frameworks & Web",
  "DevOps & Infrastructure",
  "Architecture & Security",
];

export function SkillForm({ skill }: SkillFormProps) {
  const boundAction = skill
    ? updateSkillAction.bind(null, skill.id)
    : createSkillAction;

  const [state, formAction, isPending] = useActionState<
    SkillActionResult | null,
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
            htmlFor="name"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Skill / Technology Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={skill?.name || ""}
            placeholder="e.g. Go, PostgreSQL, Kafka"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            list="category-suggestions"
            type="text"
            required
            defaultValue={skill?.category || ""}
            placeholder="Select or enter custom category"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
          <datalist id="category-suggestions">
            {COMMON_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Proficiency Level (Optional)
          </label>
          <select
            id="level"
            name="level"
            defaultValue={skill?.level || "Advanced"}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          >
            <option value="Expert">Expert (Production Architecture)</option>
            <option value="Advanced">Advanced (High Competency)</option>
            <option value="Proficient">Proficient (Solid Working Knowledge)</option>
            <option value="Familiar">Familiar (Foundational)</option>
          </select>
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
            defaultValue={skill?.order ?? 0}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/skills"
          className="rounded-lg border border-[#22282B] px-5 py-2.5 text-center font-sans text-sm text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
        </button>
      </div>
    </form>
  );
}
