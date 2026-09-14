import { notFound } from "next/navigation";
import { getSkillById, getSkillCategories } from "@/features/skills/queries";
import { SkillForm } from "@/features/skills/components/skill-form";

type EditSkillPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const [skill, categories] = await Promise.all([
    getSkillById(id),
    getSkillCategories(),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Skill: {skill.name}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update category, proficiency tier, or display priority.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <SkillForm skill={skill} availableCategories={categories} />
      </div>
    </div>
  );
}
