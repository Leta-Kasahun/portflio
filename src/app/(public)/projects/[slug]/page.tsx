import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/features/projects/queries";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Leta Kasahun",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseStudy =
    project.caseStudy && typeof project.caseStudy === "object"
      ? (project.caseStudy as Record<string, unknown>)
      : null;

  const category = (caseStudy?.category as string) || "Full-Stack Architecture";
  const role = (caseStudy?.role as string) || null;
  const problem = (caseStudy?.problem as string) || null;
  const solution = (caseStudy?.solution as string) || project.content;
  const challenge = (caseStudy?.challenge as string) || null;
  const outcome = (caseStudy?.outcome as string) || null;
  const keyFeatures = Array.isArray(caseStudy?.keyFeatures)
    ? (caseStudy.keyFeatures as string[])
    : [];

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs font-light tracking-wider text-[#8A9295] transition-colors hover:text-[#3FC7B0] mb-6"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            <span>Back to Projects</span>
          </Link>

          <div className="flex flex-col items-start text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3FC7B0]">
              {project.title}
            </h1>

            <p className="mt-3 max-w-3xl font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#8A9295]">
              {project.description}
            </p>

            <div className="mt-5 flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 w-full border-b border-[#22282B] pb-5 sm:pb-6">
              <div className="flex flex-wrap items-center gap-2 xs:gap-2.5">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 rounded-md border border-[#22282B] bg-[#171B1D] px-2.5 xs:px-3 py-1.5 font-mono text-[11px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                  >
                    <svg className="h-3.5 w-3.5 text-[#8A9295] transition-colors group-hover/link:text-[#3FC7B0]" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Code</span>
                    <svg className="h-2.5 w-2.5 text-[#8A9295] transition-transform group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 rounded-md border border-[#22282B] bg-[#171B1D] px-2.5 xs:px-3 py-1.5 font-mono text-[11px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FC7B0] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                    </span>
                    <span>Live Demo</span>
                    <svg className="h-2.5 w-2.5 text-[#8A9295] transition-transform group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}

                {category ? (
                  <span className="font-mono text-[11px] xs:text-xs font-semibold text-[#3FC7B0] pl-0.5">
                    {category}
                  </span>
                ) : null}

                {role ? (
                  <span className="font-mono text-[11px] xs:text-xs text-[#8A9295] pl-0.5">
                    • Role: <span className="text-white font-medium">{role}</span>
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-md border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10px] xs:text-[11px] font-medium text-[#E7EAEA]"
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
          </div>

          {project.coverImage ? (
            <div className="relative mt-6 sm:mt-8 aspect-[16/9] w-full overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D]">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : null}

          <div className="mt-6 sm:mt-8 rounded-tl-[20px] sm:rounded-tl-[36px] rounded-br-[20px] sm:rounded-br-[36px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 sm:space-y-8">
            {problem ? (
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3FC7B0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  <span>Problem</span>
                </div>
                <p className="mt-3 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#E7EAEA] whitespace-pre-line">
                  {problem}
                </p>
              </div>
            ) : null}

            {solution ? (
              <div className="border-t border-[#22282B] pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3FC7B0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  <span>Solution</span>
                </div>
                <p className="mt-3 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#E7EAEA] whitespace-pre-line">
                  {solution}
                </p>
              </div>
            ) : null}

            {keyFeatures.length > 0 ? (
              <div className="border-t border-[#22282B] pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3FC7B0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  <span>Key Features</span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-lg border border-[#22282B] bg-[#0E1113] p-3 transition-colors hover:border-[#3FC7B0]/40"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3FC7B0]" />
                      <span className="font-mono text-xs font-light text-[#E7EAEA] leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {challenge ? (
              <div className="border-t border-[#22282B] pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3FC7B0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  <span>Challenge</span>
                </div>
                <p className="mt-3 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#E7EAEA] whitespace-pre-line">
                  {challenge}
                </p>
              </div>
            ) : null}

            {outcome ? (
              <div className="border-t border-[#22282B] pt-6 sm:pt-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3FC7B0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  <span>Outcome</span>
                </div>
                <p className="mt-3 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#E7EAEA] whitespace-pre-line">
                  {outcome}
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#22282B] pt-6 font-mono text-xs">
            <Link
              href="/projects"
              className="text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
            >
              &larr; All Projects
            </Link>
            <a
              href="mailto:letakasahun2@gmail.com"
              className="text-[#3FC7B0] transition-colors hover:text-white"
            >
              Discuss Project &rarr;
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
