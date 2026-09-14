"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { Skill } from "@/generated/prisma/client";
import {
  createSkillAction,
  updateSkillAction,
  SkillActionResult,
} from "../mutations";

type SkillFormProps = {
  skill?: Skill | null;
  availableCategories?: string[];
  initialCategory?: string;
};

type QueuedSkill = {
  name: string;
  level: string;
};

const PROFICIENCY_LEVELS = [
  { value: "Expert", label: "Expert (Production Architecture)" },
  { value: "Advanced", label: "Advanced (High Competency)" },
  { value: "Proficient", label: "Proficient (Solid Working Knowledge)" },
  { value: "Familiar", label: "Familiar (Foundational)" },
];

export function SkillForm({
  skill,
  availableCategories = [],
  initialCategory = "",
}: SkillFormProps) {
  const boundAction = skill
    ? updateSkillAction.bind(null, skill.id)
    : createSkillAction;

  const [state, formAction, isPending] = useActionState<
    SkillActionResult | null,
    FormData
  >(boundAction, null);

  const [category, setCategory] = useState<string>(
    skill?.category || initialCategory || availableCategories[0] || "Languages & Runtimes"
  );
  const [isCustomCategory, setIsCustomCategory] = useState<boolean>(
    Boolean(
      initialCategory &&
      !availableCategories.includes(initialCategory)
    )
  );

  const [currentInput, setCurrentInput] = useState("");
  const [defaultLevel, setDefaultLevel] = useState("Advanced");
  const [queuedSkills, setQueuedSkills] = useState<QueuedSkill[]>([]);
  const [batchText, setBatchText] = useState("");
  const [showBatchPaste, setShowBatchPaste] = useState(false);

  const handleAddSkillsFromInput = () => {
    const raw = currentInput.trim();
    if (!raw) return;

    const names = raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(
        (s) =>
          s.length > 0 &&
          !queuedSkills.some((q) => q.name.toLowerCase() === s.toLowerCase())
      );

    if (names.length > 0) {
      const newItems = names.map((name) => ({
        name,
        level: defaultLevel,
      }));
      setQueuedSkills((prev) => [...prev, ...newItems]);
      setCurrentInput("");
    }
  };

  const handleAddFromBatchText = () => {
    const raw = batchText.trim();
    if (!raw) return;

    const names = raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(
        (s) =>
          s.length > 0 &&
          !queuedSkills.some((q) => q.name.toLowerCase() === s.toLowerCase())
      );

    if (names.length > 0) {
      const newItems = names.map((name) => ({
        name,
        level: defaultLevel,
      }));
      setQueuedSkills((prev) => [...prev, ...newItems]);
      setBatchText("");
      setShowBatchPaste(false);
    }
  };

  const handleRemoveSkill = (nameToRemove: string) => {
    setQueuedSkills((prev) =>
      prev.filter((q) => q.name.toLowerCase() !== nameToRemove.toLowerCase())
    );
  };

  const handleUpdateLevel = (skillName: string, newLevel: string) => {
    setQueuedSkills((prev) =>
      prev.map((q) =>
        q.name.toLowerCase() === skillName.toLowerCase()
          ? { ...q, level: newLevel }
          : q
      )
    );
  };

  return (
    <form
      action={formAction}
      className="space-y-8"
      onSubmit={() => {
        if (!skill && currentInput.trim()) {
          const names = currentInput
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter(
              (s) =>
                s.length > 0 &&
                !queuedSkills.some(
                  (q) => q.name.toLowerCase() === s.toLowerCase()
                )
            );
          if (names.length > 0) {
            const newItems = names.map((name) => ({
              name,
              level: defaultLevel,
            }));
            setQueuedSkills((prev) => [...prev, ...newItems]);
            setCurrentInput("");
          }
        }
      }}
    >
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="space-y-3 rounded-xl border border-[#22282B] bg-[#0E1113]/70 p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#3FC7B0]">
              Category Selection
            </label>
            <p className="text-xs text-[#8A9295]">
              Choose from your existing categories or define a brand new category.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCustomCategory(!isCustomCategory);
              if (!isCustomCategory) {
                setCategory("");
              }
            }}
            className="self-start font-mono text-xs text-[#3FC7B0] hover:underline sm:self-auto"
          >
            {isCustomCategory ? "← Pick from existing" : "+ Create new category"}
          </button>
        </div>

        {!isCustomCategory && availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {availableCategories.map((cat) => {
              const isSelected = category.trim() === cat.trim();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                  }}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                    isSelected
                      ? "border-[#3FC7B0] bg-[#3FC7B0]/15 text-[#3FC7B0] shadow-sm shadow-[#3FC7B0]/10"
                      : "border-[#22282B] bg-[#171B1D] text-[#8A9295] hover:border-[#3FC7B0]/40 hover:text-[#E7EAEA]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div className="pt-2">
          <label
            htmlFor="category"
            className="block font-mono text-[11px] text-[#8A9295]"
          >
            Category Name
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Distributed Systems & Cloud, AI & Machine Learning, Mobile..."
            className="mt-1 w-full rounded-lg border border-[#22282B] bg-[#171B1D] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/50 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      {skill ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Skill Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={skill.name}
              placeholder="e.g. Go, PostgreSQL, Kafka"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Proficiency Level
            </label>
            <select
              id="level"
              name="level"
              defaultValue={skill.level || "Advanced"}
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            >
              {PROFICIENCY_LEVELS.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Display Order Index
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={skill.order ?? 0}
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <input
            type="hidden"
            name="skillsData"
            value={JSON.stringify(queuedSkills)}
          />
          <input
            type="hidden"
            name="name"
            value={queuedSkills.map((s) => s.name).join(", ")}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label
                htmlFor="skillInput"
                className="block font-mono text-xs font-medium text-[#8A9295]"
              >
                Add Skill(s) to Category
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id="skillInput"
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkillsFromInput();
                    }
                  }}
                  placeholder="Type skill name (e.g. Next.js) or comma-separated list..."
                  className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
                />
                <button
                  type="button"
                  onClick={handleAddSkillsFromInput}
                  className="shrink-0 rounded-lg border border-[#3FC7B0]/50 bg-[#3FC7B0]/10 px-4 py-2.5 font-mono text-xs font-medium text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0] hover:text-[#0E1113]"
                >
                  + Add
                </button>
              </div>
              <p className="mt-1 text-[11px] text-[#8A9295]">
                Tip: Separate multiple skills with commas (e.g. Go, Docker, Kubernetes) and press Enter.
              </p>
            </div>

            <div>
              <label
                htmlFor="defaultLevel"
                className="block font-mono text-xs font-medium text-[#8A9295]"
              >
                Default Proficiency
              </label>
              <select
                id="defaultLevel"
                name="level"
                value={defaultLevel}
                onChange={(e) => setDefaultLevel(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
              >
                {PROFICIENCY_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowBatchPaste(!showBatchPaste)}
              className="font-mono text-xs text-[#3FC7B0] hover:underline"
            >
              {showBatchPaste
                ? "− Hide batch paste"
                : "+ Or batch paste a list of skills at once"}
            </button>

            {showBatchPaste && (
              <div className="mt-2 space-y-2 rounded-lg border border-[#22282B] bg-[#0E1113] p-4">
                <label className="block font-mono text-xs text-[#8A9295]">
                  Paste multiple skills (comma or newline separated):
                </label>
                <textarea
                  rows={3}
                  value={batchText}
                  onChange={(e) => setBatchText(e.target.value)}
                  placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS, GraphQL, Redux"
                  className="w-full rounded-lg border border-[#22282B] bg-[#171B1D] p-3 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/50 outline-none focus:border-[#3FC7B0]"
                />
                <button
                  type="button"
                  onClick={handleAddFromBatchText}
                  className="rounded-lg bg-[#3FC7B0] px-4 py-2 font-mono text-xs font-medium text-[#0E1113] transition-colors hover:bg-[#35B8A3]"
                >
                  Parse & Add All Skills
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#22282B] bg-[#0E1113]/80 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#22282B] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#E7EAEA]">
                  Skills to Add Under &quot;{category || "Unassigned"}&quot;
                </span>
                <span className="rounded-full bg-[#3FC7B0]/20 px-2 py-0.5 font-mono text-[10px] text-[#3FC7B0]">
                  {queuedSkills.length} queued
                </span>
              </div>
              {queuedSkills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQueuedSkills([])}
                  className="font-mono text-[11px] text-red-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {queuedSkills.length === 0 ? (
              <div className="py-6 text-center">
                <p className="font-mono text-xs text-[#8A9295]">
                  No skills queued yet. Enter skill names above to add multiple skills to this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {queuedSkills.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-[#22282B] bg-[#171B1D] px-3 py-2 text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="truncate font-medium text-[#E7EAEA]">
                        {item.name}
                      </div>
                      <select
                        value={item.level}
                        onChange={(e) =>
                          handleUpdateLevel(item.name, e.target.value)
                        }
                        className="mt-0.5 bg-transparent font-mono text-[10px] text-[#3FC7B0] outline-none cursor-pointer"
                      >
                        {PROFICIENCY_LEVELS.map((lvl) => (
                          <option
                            key={lvl.value}
                            value={lvl.value}
                            className="bg-[#171B1D] text-[#E7EAEA]"
                          >
                            {lvl.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(item.name)}
                      className="rounded p-1 text-[#8A9295] transition-colors hover:bg-red-500/10 hover:text-red-400"
                      title="Remove skill"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full sm:w-1/3">
            <label
              htmlFor="order"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Starting Display Order
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={0}
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/skills"
          className="rounded-lg border border-[#22282B] px-5 py-2.5 text-center font-sans text-sm text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={
            isPending ||
            (!skill && queuedSkills.length === 0 && !currentInput.trim())
          }
          className="rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : skill
            ? "Update Skill"
            : queuedSkills.length > 1
            ? `Save All ${queuedSkills.length} Skills`
            : "Save Skill"}
        </button>
      </div>
    </form>
  );
}
