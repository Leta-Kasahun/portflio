import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/features/projects/queries";
import { Container } from "@/components/layout/Container";
import { TechIcon } from "@/components/ui/TechIcons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Leta Kasahun",
  description: "Featured engineering projects, systems, and platforms built by Leta Kasahun",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#3FC7B0]">
            Selected Projects
          </h1>

          <p className="mt-2.5 max-w-2xl font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#8A9295]">
            Engineering full-stack architectures, distributed platforms, and cloud-native solutions.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {projects.map((project) => {
            const caseStudy =
              project.caseStudy && typeof project.caseStudy === "object"
                ? (project.caseStudy as Record<string, unknown>)
                : null;
            const category =
              (caseStudy?.category as string) || "Full-Stack Development";

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-tl-[14px] sm:rounded-tl-[20px] rounded-br-[14px] sm:rounded-br-[20px] rounded-tr-none rounded-bl-none border border-[#22282B] bg-[#0E1113] mb-3 sm:mb-4">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain scale-[1.06] transition-transform duration-500 group-hover:scale-[1.10]"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center">
                        <span className="font-mono text-xs font-semibold text-[#3FC7B0]">
                          {project.title}
                        </span>
                        <span className="mt-1 font-mono text-[10px] text-[#8A9295]">
                          {category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-[#22282B] pb-2.5 sm:pb-3">
                    <span className="font-mono text-[10px] xs:text-[11px] sm:text-xs font-light tracking-wider text-[#3FC7B0]">
                      {category}
                    </span>
                    <h2 className="mt-1 text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#3FC7B0] leading-snug">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  <p className="mt-2.5 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#8A9295] line-clamp-2 xs:line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-row items-center gap-1.5 overflow-x-auto no-scrollbar py-1 flex-nowrap w-full">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-md border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10px] xs:text-[11px] font-medium text-[#E7EAEA] shrink-0 whitespace-nowrap transition-colors hover:border-[#3FC7B0]/60"
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
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-row items-center justify-between gap-1 xs:gap-1.5 border-t border-[#22282B] pt-3 sm:pt-3.5 w-full flex-nowrap">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/link inline-flex items-center gap-0.5 xs:gap-1 font-mono text-[9.5px] xs:text-[11px] sm:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
                  >
                    <svg
                      className="h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 text-[#8A9295] transition-colors group-hover/link:text-[#3FC7B0] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Case Study</span>
                    <svg
                      className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </Link>

                  <a
                    href={project.githubUrl || "https://github.com/Leta-Kasahun"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-0.5 xs:gap-1 font-mono text-[9.5px] xs:text-[11px] sm:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
                  >
                    <svg
                      className="h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 text-[#8A9295] transition-colors group-hover/link:text-[#3FC7B0] shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Code</span>
                    <svg
                      className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>

                  <a
                    href={project.liveUrl || `/projects/${project.slug}`}
                    target={project.liveUrl ? "_blank" : undefined}
                    rel={project.liveUrl ? "noopener noreferrer" : undefined}
                    className="group/link inline-flex items-center gap-0.5 xs:gap-1 font-mono text-[9.5px] xs:text-[11px] sm:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
                  >
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FC7B0] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                    </span>
                    <span>Live Demo</span>
                    <svg
                      className="h-2 w-2 xs:h-2.5 xs:w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
