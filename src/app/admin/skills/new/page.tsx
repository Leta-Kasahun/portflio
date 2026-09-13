import { SkillForm } from "@/features/skills/components/skill-form";

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Add Technical Skill
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add a programming language, framework, database, or cloud technology.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <SkillForm />
      </div>
    </div>
  );
}
