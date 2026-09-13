import { ExperienceForm } from "@/features/experience/components/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Add Work Experience
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add a career role, company, dates, and technical impact highlights.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <ExperienceForm />
      </div>
    </div>
  );
}
