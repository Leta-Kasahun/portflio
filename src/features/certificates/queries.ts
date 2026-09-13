import { prisma } from "@/lib/prisma";
import { Certificate } from "@/generated/prisma/client";

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: new Date("2023-08-15"),
    credentialUrl: "https://aws.amazon.com/verification",
    imageUrl: null,
    description: "Design and deployment of resilient, highly scalable, and cost-effective distributed cloud architectures on AWS with zero-trust security.",
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cert-2",
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issueDate: new Date("2023-02-20"),
    credentialUrl: "https://coursera.org/verify/professional-cert",
    imageUrl: null,
    description: "Advanced React architectures, modern TypeScript design patterns, state machines, component performance profiling, and cross-device responsiveness.",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cert-3",
    name: "PostgreSQL Database Architecture & Query Optimization",
    issuer: "EnterpriseDB / PostgreSQL",
    issueDate: new Date("2022-11-10"),
    credentialUrl: "https://www.enterprisedb.com",
    imageUrl: null,
    description: "Relational data modeling, ACID transactions, complex indexing strategies, query execution plan tuning, and high-concurrency connection pooling.",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cert-4",
    name: "Distributed Systems & Cloud-Native Microservices",
    issuer: "Linux Foundation / CNCF",
    issueDate: new Date("2022-05-18"),
    credentialUrl: "https://www.cncf.io",
    imageUrl: null,
    description: "Containerization with Docker, Kubernetes orchestration, CI/CD pipeline automation, and fault-tolerant event-driven asynchronous processing.",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getAllCertificates(): Promise<Certificate[]> {
  try {
    const dbCertificates = await prisma.certificate.findMany({
      orderBy: [
        { order: "asc" },
        { issueDate: "desc" },
      ],
    });
    if (dbCertificates && dbCertificates.length > 0) {
      return dbCertificates;
    }
  } catch {}
  return DEFAULT_CERTIFICATES;
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  return prisma.certificate.findUnique({
    where: { id },
  });
}
