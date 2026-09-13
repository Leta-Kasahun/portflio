import Link from "next/link";
import { getSkillsGroupedByCategory } from "@/features/skills/queries";
import { DeleteSkillButton } from "@/features/skills/components/delete-skill-button";

export default async function AdminSkillsPage() {
  const groupedSkills = await getSkillsGroupedByCategory();
  const categories = Object.keys(groupedSkills);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Skills Matrix
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage technical competencies, languages, tools, and proficiency levels.
          </p>
        </div>
        <div>
          <Link
            href="/admin/skills/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Skill
          </Link>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No skills added yet.
          </p>
          <Link
            href="/admin/skills/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Add your first skill &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-xl border border-[#22282B] bg-[#171B1D] p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#22282B] pb-3">
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
                  {category}
                </h2>
                <span className="font-mono text-xs text-[#8A9295]">
                  {groupedSkills[category].length} item
                  {groupedSkills[category].length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groupedSkills[category].map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-lg border border-[#22282B] bg-[#0E1113] p-3 transition-colors hover:border-[#3FC7B0]/40"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#E7EAEA]">
                        {skill.name}
                      </div>
                      {skill.level && (
                        <div className="font-mono text-[10px] text-[#8A9295]">
                          {skill.level}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/skills/${skill.id}`}
                        className="rounded border border-[#22282B] px-2 py-0.5 font-mono text-[11px] text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                      >
                        Edit
                      </Link>
                      <DeleteSkillButton
                        skillId={skill.id}
                        skillName={skill.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
