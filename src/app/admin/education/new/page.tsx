import { EducationForm } from "@/features/education/components/education-form";

export default function NewEducationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Add Education
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add an academic degree, university, graduation date, and coursework.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <EducationForm />
      </div>
    </div>
  );
}
