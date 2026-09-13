import { prisma } from "@/lib/prisma";
import { Experience } from "@/generated/prisma/client";

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    profileId: "default",
    company: "Distributed Tech Solutions",
    role: "Senior Full-Stack & Systems Engineer",
    description: "Architecting resilient distributed backend architectures, high-performance event pipelines, and scalable Next.js web applications with zero-trust security.",
    highlights: [
      "Engineered distributed microservices and asynchronous queue processing handling high concurrent request volumes.",
      "Spearheaded database schema design, Flyway migrations, and PostgreSQL indexing optimizations resulting in sub-50ms query latency.",
      "Built modern client-facing platforms with Next.js, TypeScript, and Tailwind CSS with 100% responsive cross-device fidelity."
    ],
    startDate: new Date("2023-01-01"),
    endDate: null,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "exp-2",
    profileId: "default",
    company: "Digital Horizon Technologies",
    role: "Full-Stack Software Engineer",
    description: "Developed multi-tier enterprise web platforms, secure payment integrations, and modular RESTful APIs for fintech and marketplace ecosystems.",
    highlights: [
      "Integrated secure Chapa payment gateways, automated webhooks, and transactional state machines for job and technician marketplaces.",
      "Refactored monolithic endpoints into decoupled services, reducing server latency by 35% and improving uptime.",
      "Standardized TypeScript strict typings, component libraries, and automated CI/CD deployment pipelines."
    ],
    startDate: new Date("2021-03-01"),
    endDate: new Date("2022-12-31"),
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "exp-3",
    profileId: "default",
    company: "Addis Software Labs",
    role: "Backend & Database Developer",
    description: "Designed normalized relational database schemas, complex SQL query optimizations, and core backend services using Spring Boot, Java, and Node.js.",
    highlights: [
      "Architected relational schemas across PostgreSQL and MySQL with strict referential integrity and composite indexing.",
      "Implemented secure authentication pipelines featuring JWTs, OTP validations, and role-based access control (RBAC).",
      "Collaborated with product engineers to ship 10+ robust web modules on time and within production quality benchmarks."
    ],
    startDate: new Date("2019-07-01"),
    endDate: new Date("2021-02-28"),
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const dbExperiences = await prisma.experience.findMany({
      orderBy: [
        { order: "asc" },
        { startDate: "desc" },
      ],
    });
    if (dbExperiences && dbExperiences.length > 0) {
      return dbExperiences;
    }
  } catch {}
  return DEFAULT_EXPERIENCES;
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  return prisma.experience.findUnique({
    where: { id },
  });
}
