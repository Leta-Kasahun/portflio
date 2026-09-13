import { notFound } from "next/navigation";
import { getExperienceById } from "@/features/experience/queries";
import { ExperienceForm } from "@/features/experience/components/experience-form";

type EditExperiencePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Experience: {experience.role} at {experience.company}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update role description, timelines, and measurable achievements.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <ExperienceForm experience={experience} />
      </div>
    </div>
  );
}
