import { ProjectForm } from "@/features/projects/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Create New Project
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add a technical case study with STAR architecture and live links.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
