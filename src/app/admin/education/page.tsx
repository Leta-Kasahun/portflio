import Link from "next/link";
import { getAllEducations } from "@/features/education/queries";
import { DeleteEducationButton } from "@/features/education/components/delete-education-button";

export default async function AdminEducationPage() {
  const educations = await getAllEducations();

  const formatDateDisplay = (date?: Date | null) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Education & Academics
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage degrees, academic qualifications, and relevant coursework.
          </p>
        </div>
        <div>
          <Link
            href="/admin/education/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Education
          </Link>
        </div>
      </div>

      {educations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No education records added yet.
          </p>
          <Link
            href="/admin/education/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Add your degree &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-medium text-[#E7EAEA]">
                    {edu.degree}
                  </span>
                  {edu.field && (
                    <span className="font-mono text-xs text-[#8A9295]">
                      in {edu.field}
                    </span>
                  )}
                  <span className="font-mono text-xs text-[#3FC7B0]">
                    @{edu.institution}
                  </span>
                </div>

                {(edu.startDate || edu.endDate) && (
                  <p className="font-mono text-xs text-[#8A9295]">
                    {edu.startDate ? formatDateDisplay(edu.startDate) : ""}
                    {edu.startDate && edu.endDate ? " \u2014 " : ""}
                    {edu.endDate ? formatDateDisplay(edu.endDate) : ""}
                  </p>
                )}

                {edu.courses.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {edu.courses.slice(0, 4).map((course) => (
                      <span
                        key={course}
                        className="rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10px] text-[#8A9295]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="mr-2 font-mono text-xs text-[#8A9295]">
                  #{edu.order}
                </span>
                <Link
                  href={`/admin/education/${edu.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteEducationButton
                  educationId={edu.id}
                  institutionName={edu.institution}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
