import { SkillForm } from "@/features/skills/components/skill-form";
import { getSkillCategories } from "@/features/skills/queries";

type NewSkillPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewSkillPage({ searchParams }: NewSkillPageProps) {
  const params = await searchParams;
  const categories = await getSkillCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Add Technical Skills
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add single or multiple skills under a custom or existing category.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <SkillForm
          availableCategories={categories}
          initialCategory={params.category || ""}
        />
      </div>
    </div>
  );
}
