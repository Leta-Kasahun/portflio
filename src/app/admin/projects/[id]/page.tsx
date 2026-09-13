import { notFound } from "next/navigation";
import { getProjectById } from "@/features/projects/queries";
import { ProjectForm } from "@/features/projects/components/project-form";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Project: {project.title}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update case study architecture, metrics, and deployment links.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
