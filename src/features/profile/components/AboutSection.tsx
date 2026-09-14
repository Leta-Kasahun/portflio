import { Profile, Education } from "@/generated/prisma/client";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type AboutSectionProps = {
  profile: Profile;
  educations?: Education[];
};

function formatEducationDates(startDate?: Date | null, endDate?: Date | null) {
  if (!startDate) return null;
  const start = new Date(startDate).getFullYear();
  if (isNaN(start)) return null;
  if (!endDate) return `${start} – Present`;
  const end = new Date(endDate).getFullYear();
  return isNaN(end) ? `${start} – Present` : `${start} – ${end}`;
}

export function AboutSection({ profile, educations }: AboutSectionProps) {
  const hasEducations = educations && educations.length > 0;

  return (
    <section
      id="about"
      className="relative bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className={`grid grid-cols-1 ${
            hasEducations ? "lg:grid-cols-2 gap-8 lg:gap-10" : "max-w-4xl"
          } items-stretch`}
        >
          <RevealOnScroll direction="up" duration={850} className="h-full">
            <div className="flex flex-col items-start text-left h-full">
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#3FC7B0]">
                About Me
              </h2>

              <div className="relative mt-5 sm:mt-6 w-full flex-1 flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[36px] rounded-br-[20px] sm:rounded-br-[36px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/50">
                <div>
                  <div className="border-b border-[#22282B] pb-3 sm:pb-4">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white">
                      {profile.title}
                    </h3>
                  </div>

                  <div className="mt-4 sm:mt-5 space-y-3 font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#E7EAEA] whitespace-pre-line">
                    <p>{profile.about || profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {hasEducations ? (
            <RevealOnScroll direction="up" delay={150} duration={850} className="h-full mt-8 lg:mt-0">
              <div
                id="education"
                className="flex flex-col items-start text-left h-full"
              >
                <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#3FC7B0]">
                  Education
                </h2>

                <div className="relative mt-5 sm:mt-6 w-full flex-1 w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[36px] rounded-br-[20px] sm:rounded-br-[36px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/50">
                <div className="space-y-5 sm:space-y-6 divide-y divide-[#22282B]">
                  {educations.map((edu, index) => (
                    <div key={edu.id} className={index > 0 ? "pt-5 sm:pt-6" : ""}>
                      <div className="border-b border-[#22282B] pb-3 sm:pb-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white">
                            {edu.institution}
                          </h3>
                          {formatEducationDates(edu.startDate, edu.endDate) ? (
                            <span className="font-mono text-xs font-light tracking-wider text-[#8A9295]">
                              {formatEducationDates(edu.startDate, edu.endDate)}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-1.5 font-mono text-xs sm:text-sm font-normal text-[#3FC7B0]">
                          {edu.degree}
                          {edu.field ? ` · ${edu.field}` : ""}
                        </div>
                      </div>

                      {edu.description ? (
                        <p className="mt-4 font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#8A9295] whitespace-pre-line">
                          {edu.description}
                        </p>
                      ) : null}

                      {edu.courses && edu.courses.length > 0 ? (
                        <div className="mt-5">
                          <span className="block font-mono text-[10px] sm:text-[11px] font-light tracking-wider uppercase text-[#8A9295] mb-2">
                            Key Coursework
                          </span>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {edu.courses.map((course, cIdx) => (
                              <span
                                key={cIdx}
                                className="inline-flex items-center rounded-md border border-[#22282B] bg-[#0E1113] px-2.5 py-1 font-mono text-[11px] sm:text-xs font-light text-[#E7EAEA] transition-colors duration-300 hover:border-[#3FC7B0]/60 hover:text-[#3FC7B0]"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
          ) : null}
        </div>
      </div>
    </section>
  );
}
