import Link from "next/link";
import { getAllExperiences } from "@/features/experience/queries";
import { DeleteExperienceButton } from "@/features/experience/components/delete-experience-button";

export default async function AdminExperiencePage() {
  const experiences = await getAllExperiences();

  const formatDateDisplay = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Work Experience
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage professional roles, engineering milestones, and team impact.
          </p>
        </div>
        <div>
          <Link
            href="/admin/experience/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Experience
          </Link>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No experience records added yet.
          </p>
          <Link
            href="/admin/experience/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Add your first work experience &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-medium text-[#E7EAEA]">
                    {exp.role}
                  </span>
                  <span className="font-mono text-xs text-[#3FC7B0]">
                    @{exp.company}
                  </span>
                </div>

                <p className="font-mono text-xs text-[#8A9295]">
                  {formatDateDisplay(exp.startDate)} &mdash;{" "}
                  {exp.endDate ? formatDateDisplay(exp.endDate) : "Present"}
                </p>

                {exp.highlights.length > 0 && (
                  <p className="text-xs text-[#8A9295]">
                    {exp.highlights.length} highlight bullet
                    {exp.highlights.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="mr-2 font-mono text-xs text-[#8A9295]">
                  #{exp.order}
                </span>
                <Link
                  href={`/admin/experience/${exp.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteExperienceButton
                  experienceId={exp.id}
                  companyName={exp.company}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
