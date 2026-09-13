import Link from "next/link";
import { getAllProjects } from "@/features/projects/queries";
import { DeleteProjectButton } from "@/features/projects/components/delete-project-button";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Projects Management
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage technical case studies, STAR architectures, and live demos.
          </p>
        </div>
        <div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Project
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">No projects added yet.</p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Create your first project &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-medium text-[#E7EAEA]">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs text-[#8A9295]">
                    /{project.slug}
                  </span>
                  {project.featured && (
                    <span className="rounded bg-[#3FC7B0]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#3FC7B0]">
                      Featured
                    </span>
                  )}
                  {!project.published && (
                    <span className="rounded bg-[#8A9295]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8A9295]">
                      Draft
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[11px] text-[#8A9295]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="font-mono text-[11px] text-[#8A9295] self-center">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="mr-2 font-mono text-xs text-[#8A9295]">
                  #{project.order}
                </span>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteProjectButton
                  projectId={project.id}
                  projectTitle={project.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
