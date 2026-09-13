import { Metadata } from "next";
import { getAllExperiences } from "@/features/experience/queries";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Professional Experience | Leta Kasahun",
  description: "Career journey, software engineering roles, and architectural contributions by Leta Kasahun",
};

function formatPeriod(startDate: Date | string, endDate?: Date | string | null) {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const isCurrent = !endDate;
  const end = endDate ? new Date(endDate) : new Date();
  const endStr = isCurrent
    ? "Present"
    : end.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const totalMonths = Math.max(
    1,
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = "";
  if (years > 0 && months > 0) {
    duration = `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  } else if (years > 0) {
    duration = `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    duration = `${months} mo${months > 1 ? "s" : ""}`;
  }

  return { dateRange: `${startStr} — ${endStr}`, duration, isCurrent };
}

export default async function ExperiencePage() {
  const experiences = await getAllExperiences();

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="flex flex-col items-start text-left">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3FC7B0]">
            Professional Experience
          </h1>
        </div>

        <div className="relative mt-8 sm:mt-12">
          <div className="absolute left-2 xs:left-3 sm:left-5 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#3FC7B0] via-[#22282B] to-[#22282B]/30" />

          <div className="space-y-6 sm:space-y-10">
            {experiences.map((exp) => {
              const { dateRange, duration, isCurrent } = formatPeriod(
                exp.startDate,
                exp.endDate
              );

              return (
                <div key={exp.id} className="relative pl-6 xs:pl-8 sm:pl-14">
                  <div className="absolute left-2 xs:left-3 sm:left-5 top-6 -translate-x-1/2 flex items-center justify-center">
                    {isCurrent ? (
                      <div className="relative flex h-4 w-4 xs:h-4.5 xs:w-4.5 items-center justify-center rounded-full border-2 border-[#3FC7B0] bg-[#0E1113] shadow-[0_0_10px_rgba(63,199,176,0.5)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                      </div>
                    ) : (
                      <div className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#22282B] bg-[#171B1D]">
                        <span className="h-1 w-1 rounded-full bg-[#8A9295]/40" />
                      </div>
                    )}
                  </div>

                  <div className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#22282B] pb-3.5 sm:pb-4">
                      <div>
                        <h2 className="text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#3FC7B0]">
                          {exp.role}
                        </h2>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs sm:text-sm font-semibold text-[#3FC7B0]">
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2 py-0.5 font-mono text-[10px] xs:text-[11px] font-semibold text-[#3FC7B0] tracking-wider uppercase">
                            Present Role
                          </span>
                        ) : null}

                        <span className="rounded-md border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10.5px] xs:text-xs text-[#E7EAEA]">
                          {dateRange}
                        </span>

                        <span className="font-mono text-[10px] xs:text-[11px] text-[#8A9295]">
                          ({duration})
                        </span>
                      </div>
                    </div>

                    <p className="mt-3.5 sm:mt-4 font-mono text-xs sm:text-[13px] font-light leading-relaxed text-[#E7EAEA]/90">
                      {exp.description}
                    </p>

                    {exp.highlights && exp.highlights.length > 0 ? (
                      <div className="mt-4 sm:mt-5 space-y-2 border-t border-[#22282B]/60 pt-3.5 sm:pt-4">
                        <span className="block font-mono text-[10px] xs:text-[11px] font-semibold tracking-wider uppercase text-[#3FC7B0]/90 mb-2">
                          Key Deliverables & Impact
                        </span>
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="font-mono text-xs xs:text-sm font-bold text-[#3FC7B0] select-none shrink-0 leading-tight">
                              ›
                            </span>
                            <span className="font-mono text-xs sm:text-[13px] font-light text-[#8A9295] leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
