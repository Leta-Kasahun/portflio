import { notFound } from "next/navigation";
import { getEducationById } from "@/features/education/queries";
import { EducationForm } from "@/features/education/components/education-form";

type EditEducationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEducationPage({
  params,
}: EditEducationPageProps) {
  const { id } = await params;
  const education = await getEducationById(id);

  if (!education) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Education: {education.degree} at {education.institution}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update institution details, coursework, and graduation dates.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <EducationForm education={education} />
      </div>
    </div>
  );
}
