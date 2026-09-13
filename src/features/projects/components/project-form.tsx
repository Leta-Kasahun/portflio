"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Project } from "@/generated/prisma/client";
import {
  createProjectAction,
  updateProjectAction,
  ProjectActionResult,
} from "../mutations";

type CaseStudyData = {
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
};

type ProjectFormProps = {
  project?: Project | null;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const boundAction = project
    ? updateProjectAction.bind(null, project.id)
    : createProjectAction;

  const [state, formAction, isPending] = useActionState<
    ProjectActionResult | null,
    FormData
  >(boundAction, null);

  const caseStudy = (project?.caseStudy as CaseStudyData | null) || null;

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          Core Details
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Project Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={project?.title || ""}
              placeholder="e.g. Distributed Event Broker"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Slug (URL Identifier)
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={project?.slug || ""}
              placeholder="auto-generated from title if blank"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="githubUrl"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              GitHub Repository URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={project?.githubUrl || ""}
              placeholder="https://github.com/..."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="liveUrl"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Live Demo / Product URL
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={project?.liveUrl || ""}
              placeholder="https://..."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="technologies"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Technologies (comma separated)
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              defaultValue={project?.technologies.join(", ") || ""}
              placeholder="Go, Rust, PostgreSQL, Next.js, Redis, Docker"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="coverImageFile"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Cover Image Upload
            </label>
            <input
              id="coverImageFile"
              name="coverImageFile"
              type="file"
              accept="image/*"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
            />
            {project?.coverImage && (
              <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
                Current:{" "}
                <a
                  href={project.coverImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3FC7B0] underline"
                >
                  View Image
                </a>
              </p>
            )}
            <input
              type="hidden"
              name="coverImage"
              defaultValue={project?.coverImage || ""}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Summary Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            defaultValue={project?.description || ""}
            placeholder="High-level engineering overview of what this project accomplishes."
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Architecture & Deep Dive (Markdown supported)
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            defaultValue={project?.content || ""}
            placeholder="System architecture, data structures, trade-offs, and design choices."
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          STAR Framework Case Study
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="situation"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Situation (Context & Problem)
            </label>
            <textarea
              id="situation"
              name="situation"
              rows={3}
              defaultValue={caseStudy?.situation || ""}
              placeholder="What was the initial bottleneck, legacy constraint, or challenge?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="task"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Task (Engineering Objective)
            </label>
            <textarea
              id="task"
              name="task"
              rows={3}
              defaultValue={caseStudy?.task || ""}
              placeholder="What specific goal or throughput requirement needed to be achieved?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="action"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Action (Technical Implementation)
            </label>
            <textarea
              id="action"
              name="action"
              rows={3}
              defaultValue={caseStudy?.action || ""}
              placeholder="How did you architect, optimize, and deliver the solution?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="result"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Result (Measurable Impact & Metrics)
            </label>
            <textarea
              id="result"
              name="result"
              rows={3}
              defaultValue={caseStudy?.result || ""}
              placeholder="Latency reduced by 40%, 99.99% uptime, 10x throughput, etc."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          Visibility & Display Order
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 pt-4">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={project?.featured ?? false}
              className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
            />
            <label
              htmlFor="featured"
              className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
            >
              Feature on Homepage
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={project?.published ?? true}
              className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
            />
            <label
              htmlFor="published"
              className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
            >
              Published (Publicly Visible)
            </label>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Sort Order Index
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={project?.order ?? 0}
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/projects"
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
            ? "Saving Project..."
            : project
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}
