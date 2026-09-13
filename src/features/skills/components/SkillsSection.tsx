import { Skill } from "@/generated/prisma/client";

type SkillsSectionProps = {
  skillsGrouped: Record<string, Skill[]>;
};

export function SkillsSection({ skillsGrouped }: SkillsSectionProps) {
  const categories = Object.keys(skillsGrouped);
  if (categories.length === 0) return null;

  return (
    <section
      id="skills"
      className="relative border-b border-[#22282B] bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3FC7B0]">
            Technical Skills
          </h2>
        </div>

        <div className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {categories.map((category) => {
            const skills = skillsGrouped[category] || [];

            return (
              <div
                key={category}
                className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#22282B] pb-2.5 sm:pb-3.5 mb-3 sm:mb-4">
                    <h3 className="text-sm xs:text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#3FC7B0] transition-colors">
                      {category}
                    </h3>
                    <span className="font-mono text-[10px] xs:text-[11px] text-[#8A9295]">
                      {skills.length} skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 xs:gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="group/skill inline-flex items-center gap-1 xs:gap-1.5 rounded-md border border-[#22282B] bg-[#0E1113] px-2 xs:px-2.5 py-1 xs:py-1.5 font-mono text-[11px] xs:text-xs font-medium text-[#E7EAEA] transition-all duration-200 hover:border-[#3FC7B0]/60 hover:text-white"
                      >
                        <svg
                          className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-[#3FC7B0] shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                        <span>{skill.name}</span>
                        {skill.level ? (
                          <span className="text-[9.5px] xs:text-[10px] text-[#8A9295] font-light">
                            • {skill.level}
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 border-t border-[#22282B]/60 pt-2.5 sm:pt-3 flex items-center justify-between font-mono text-[10px] xs:text-[11px] text-[#8A9295]">
                  <span>Proficiency</span>
                  <span className="text-[#3FC7B0]">Production-grade</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
