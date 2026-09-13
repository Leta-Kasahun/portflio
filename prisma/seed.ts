import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import crypto from "crypto";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeonHttp(connectionString, {});
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
  const adminEmail = "letakasahun2@gmail.com";
  const rawPassword = "Admin@123";
  const hashedPassword = hashPassword(rawPassword);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });

  const existingProfile = await prisma.profile.findFirst();
  let profileId = existingProfile?.id;

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        name: "Leta Kasahun",
        title: "Senior Full-Stack & Distributed Systems Engineer",
        bio: "Architecting resilient distributed systems, event-driven backends, and high-performance modern web platforms.",
        about: "Software Engineer with deep expertise in full-stack web architecture, distributed systems, and cloud infrastructure. Passionate about craftsmanship, zero-trust security, sub-millisecond query optimization, and engineering maintainable, scalable software.",
        location: "Addis Ababa, Ethiopia",
        email: "letakasahun2@gmail.com",
      },
    });
  } else {
    const createdProfile = await prisma.profile.create({
      data: {
        name: "Leta Kasahun",
        title: "Senior Full-Stack & Distributed Systems Engineer",
        bio: "Architecting resilient distributed systems, event-driven backends, and high-performance modern web platforms.",
        about: "Software Engineer with deep expertise in full-stack web architecture, distributed systems, and cloud infrastructure. Passionate about craftsmanship, zero-trust security, sub-millisecond query optimization, and engineering maintainable, scalable software.",
        location: "Addis Ababa, Ethiopia",
        email: "letakasahun2@gmail.com",
      },
    });
    profileId = createdProfile.id;
  }

  if (profileId) {
    const existingLinks = await prisma.socialLink.findMany({
      where: { profileId },
    });

    if (existingLinks.length === 0) {
      await prisma.socialLink.createMany({
        data: [
          {
            profileId,
            platform: "GitHub",
            url: "https://github.com/Leta-Kasahun",
            order: 0,
          },
          {
            profileId,
            platform: "LinkedIn",
            url: "https://linkedin.com/in/letakasahun",
            order: 1,
          },
          {
            profileId,
            platform: "Twitter / X",
            url: "https://x.com/letakasahun",
            order: 2,
          },
          {
            profileId,
            platform: "Email",
            url: "mailto:letakasahun2@gmail.com",
            order: 3,
          },
        ],
      });
    }

    const existingExperiences = await prisma.experience.findMany({
      where: { profileId },
    });

    if (existingExperiences.length === 0) {
      await prisma.experience.create({
        data: {
          profileId,
          company: "FinTech Global Infrastructure",
          role: "Senior Full-Stack Engineer",
          description: "Leading core ledger settlement engines and real-time transaction ingestion pipelines.",
          highlights: [
            "Architected event-driven settlement pipeline processing $5M+ daily transaction volume with zero data loss.",
            "Reduced p99 API latency from 450ms to 42ms via tiered Redis caching and query indexing.",
            "Spearheaded migration of legacy dashboards to Next.js 16 App Router with responsive dark mode UI.",
          ],
          startDate: new Date("2023-01-15"),
          endDate: null,
          order: 0,
        },
      });

      await prisma.experience.create({
        data: {
          profileId,
          company: "CloudCore Systems",
          role: "Distributed Systems Software Engineer",
          description: "Built scalable telemetry streaming services and cloud-native Kubernetes infrastructure.",
          highlights: [
            "Engineered high-throughput Go telemetry ingestion service handling 80,000 events/second.",
            "Automated multi-region Kubernetes deployments using ArgoCD, Helm, and GitHub Actions.",
            "Designed resilient database migration strategies with zero downtime across PostgreSQL clusters.",
          ],
          startDate: new Date("2021-03-01"),
          endDate: new Date("2022-12-31"),
          order: 1,
        },
      });

      await prisma.experience.create({
        data: {
          profileId,
          company: "Apex Digital Solutions",
          role: "Full-Stack Software Developer",
          description: "Developed modern web applications and microservices for enterprise clients.",
          highlights: [
            "Built responsive full-stack applications using React, TypeScript, Node.js, and PostgreSQL.",
            "Implemented secure OAuth2 authentication, JWT session lifecycle, and role-based access control.",
          ],
          startDate: new Date("2019-07-01"),
          endDate: new Date("2021-02-28"),
          order: 2,
        },
      });
    }

    const existingEducations = await prisma.education.findMany({
      where: { profileId },
    });

    if (existingEducations.length === 0) {
      await prisma.education.create({
        data: {
          profileId,
          institution: "Addis Ababa University",
          degree: "B.Sc. in Computer Science & Software Engineering",
          field: "Distributed Systems & Computer Networks",
          description: "Graduated with High Distinction. Capstone project on distributed consensus and Paxos replication.",
          courses: [
            "Distributed Systems",
            "Algorithms & Data Structures",
            "Database Management Systems",
            "Computer Architecture",
            "Operating Systems",
            "Compiler Design",
          ],
          startDate: new Date("2015-09-01"),
          endDate: new Date("2019-06-30"),
          order: 0,
        },
      });
    }
  }

  const existingProjects = await prisma.project.findMany();
  if (existingProjects.length === 0) {
    await prisma.project.create({
      data: {
        title: "Distributed Event Ingestion Engine",
        slug: "distributed-event-engine",
        description: "High-throughput fault-tolerant event broker with persistent write-ahead log and sub-millisecond dispatching.",
        content: "Detailed architectural breakdown of the event broker featuring lock-free ring buffers, Raft replication, and zero-copy network serialization.",
        technologies: ["Go", "Kafka", "Redis", "PostgreSQL", "Docker", "gRPC"],
        githubUrl: "https://github.com/Leta-Kasahun/event-broker",
        liveUrl: "https://event-broker.demo.dev",
        featured: true,
        published: true,
        order: 0,
        caseStudy: {
          situation: "Legacy event ingestion suffered from consumer lag spikes and occasional message duplication during peak traffic of 30k req/sec.",
          task: "Architect a resilient, horizontally scalable broker capable of sustaining 100k+ req/sec with guaranteed exactly-once processing semantics.",
          action: "Implemented a custom partition scheduler in Go with memory-mapped write-ahead logging and Redis-backed state coordination.",
          result: "Achieved 120k req/sec peak throughput, zero message loss across node failure simulations, and cut infrastructure costs by 45%.",
        },
      },
    });

    await prisma.project.create({
      data: {
        title: "Real-Time Financial Settlement Ledger",
        slug: "financial-settlement-ledger",
        description: "Double-entry accounting and real-time transaction processing API with strict ACID guarantees.",
        content: "Cryptographically verifiable ledger engine engineered in Rust with Tokio async runtime and PostgreSQL transaction isolation.",
        technologies: ["Rust", "PostgreSQL", "Tokio", "Docker", "REST API"],
        githubUrl: "https://github.com/Leta-Kasahun/ledger-core",
        featured: true,
        published: true,
        order: 1,
        caseStudy: {
          situation: "Financial reconciliation required nightly batch jobs that frequently timed out due to lock contention in legacy monolithic database.",
          task: "Design an immutable ledger ledger service with real-time balance resolution and automated audit trails.",
          action: "Utilized event-sourcing patterns with optimistic concurrency control and partitioned database tables in PostgreSQL.",
          result: "Eliminated batch reconciliation window, enabled sub-second settlement verification, and passed SOC2 audit standards.",
        },
      },
    });

    await prisma.project.create({
      data: {
        title: "Collaborative Analytics & Workflow Canvas",
        slug: "collaborative-analytics-canvas",
        description: "Interactive real-time visual canvas for distributed telemetry metrics, query building, and incident collaboration.",
        content: "Browser-based infinite canvas with WebSocket sync, CRDT conflict resolution, and fluid SVG/Canvas rendering.",
        technologies: ["TypeScript", "Next.js 16", "React 19", "Tailwind CSS", "Prisma", "WebSockets"],
        githubUrl: "https://github.com/Leta-Kasahun/analytics-canvas",
        liveUrl: "https://canvas.demo.dev",
        featured: true,
        published: true,
        order: 2,
        caseStudy: {
          situation: "Engineering teams lacked a unified real-time dashboard to diagnose multi-service incident graphs collaboratively.",
          task: "Build an ultra-responsive visual workspace supporting 50+ concurrent users with zero latency jitter.",
          action: "Built client state management using Yjs CRDTs over WebSockets and optimized React 19 rendering pipelines.",
          result: "Decreased mean time to resolution (MTTR) during outages by 35% across engineering teams.",
        },
      },
    });
  }

  const existingSkills = await prisma.skill.findMany();
  if (existingSkills.length === 0) {
    const skillsData = [
      { name: "Go", category: "Languages & Runtimes", level: "Expert", order: 0 },
      { name: "TypeScript", category: "Languages & Runtimes", level: "Expert", order: 1 },
      { name: "Rust", category: "Languages & Runtimes", level: "Advanced", order: 2 },
      { name: "JavaScript", category: "Languages & Runtimes", level: "Expert", order: 3 },
      { name: "SQL", category: "Languages & Runtimes", level: "Expert", order: 4 },
      { name: "Python", category: "Languages & Runtimes", level: "Proficient", order: 5 },

      { name: "Next.js 16", category: "Frameworks & Web", level: "Expert", order: 0 },
      { name: "React 19", category: "Frameworks & Web", level: "Expert", order: 1 },
      { name: "Node.js", category: "Frameworks & Web", level: "Expert", order: 2 },
      { name: "Tailwind CSS v4", category: "Frameworks & Web", level: "Expert", order: 3 },

      { name: "PostgreSQL", category: "Databases & Storage", level: "Expert", order: 0 },
      { name: "Neon Serverless", category: "Databases & Storage", level: "Expert", order: 1 },
      { name: "Redis", category: "Databases & Storage", level: "Expert", order: 2 },
      { name: "Prisma ORM", category: "Databases & Storage", level: "Expert", order: 3 },

      { name: "Apache Kafka", category: "Distributed Systems & Cloud", level: "Advanced", order: 0 },
      { name: "Docker", category: "Distributed Systems & Cloud", level: "Expert", order: 1 },
      { name: "Kubernetes", category: "Distributed Systems & Cloud", level: "Advanced", order: 2 },
      { name: "AWS", category: "Distributed Systems & Cloud", level: "Advanced", order: 3 },
      { name: "gRPC & Protocol Buffers", category: "Distributed Systems & Cloud", level: "Advanced", order: 4 },

      { name: "System Architecture", category: "Architecture & Security", level: "Expert", order: 0 },
      { name: "Microservices", category: "Architecture & Security", level: "Expert", order: 1 },
      { name: "CI/CD & GitHub Actions", category: "Architecture & Security", level: "Expert", order: 2 },
      { name: "Zero-Trust Security", category: "Architecture & Security", level: "Advanced", order: 3 },
    ];

    for (const skill of skillsData) {
      await prisma.skill.upsert({
        where: {
          name_category: {
            name: skill.name,
            category: skill.category,
          },
        },
        update: {
          level: skill.level,
          order: skill.order,
        },
        create: skill,
      });
    }
  }

  const existingCerts = await prisma.certificate.findMany();
  if (existingCerts.length === 0) {
    await prisma.certificate.create({
      data: {
        name: "AWS Certified Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        issueDate: new Date("2023-06-15"),
        credentialUrl: "https://www.credly.com/org/amazon-web-services",
        description: "Advanced validation of designing distributed systems, cloud migration, and high-availability architectures on AWS.",
        order: 0,
      },
    });

    await prisma.certificate.create({
      data: {
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation (CNCF)",
        issueDate: new Date("2022-11-20"),
        credentialUrl: "https://www.credly.com/org/linux-foundation",
        description: "Hands-on competency in Kubernetes cluster architecture, networking, workload scheduling, and security policies.",
        order: 1,
      },
    });
  }

  const existingPosts = await prisma.blogPost.findMany();
  if (existingPosts.length === 0) {
    await prisma.blogPost.create({
      data: {
        title: "Designing Fault-Tolerant Distributed State Machines with Raft Consensus",
        slug: "raft-consensus-distributed-systems",
        excerpt: "A deep architectural exploration of leader election, log replication, and split-brain mitigation in distributed clusters.",
        content: `## Introduction to Distributed Consensus

Building reliable distributed systems requires nodes to agree on a sequence of state transitions even in the presence of network partitions and node crashes.

\`\`\`go
type RaftNode struct {
    mu        sync.Mutex
    peers     []*rpc.Client
    currentTerm int
    votedFor   int
    log        []LogEntry
    commitIndex int
}
\`\`\`

### Leader Election Mechanics

In Raft, at any given time, each server is in one of three states: **Leader**, **Follower**, or **Candidate**. When heartbeat timeouts expire without receiving an \`AppendEntries\` RPC, followers transition to candidates and initiate a term election with randomized election timeouts.

### Key Takeaways
1. Randomized timeouts prevent election split-vote deadlocks.
2. Log completeness invariant ensures committed entries are never overwritten.
3. Linearizable reads can be served by verifying current leader quorum lease.`,
        tags: ["Distributed Systems", "Go", "Raft", "Consensus", "Architecture"],
        published: true,
        featured: true,
        publishedAt: new Date("2024-02-10"),
      },
    });

    await prisma.blogPost.create({
      data: {
        title: "Optimizing PostgreSQL Query Performance: From Sequential Scans to B-Tree Mastery",
        slug: "postgresql-query-optimization",
        excerpt: "Practical guide to database indexing strategies, EXPLAIN ANALYZE execution plans, and lock contention reduction.",
        content: `## Understanding Postgres Query Execution

When optimizing queries under high concurrent write loads, understanding the difference between Index Scans, Index Only Scans, and Bitmap Heap Scans is essential.

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, email, created_at
FROM "Admin"
WHERE email = 'letakasahun2@gmail.com';
\`\`\`

### Covering Indexes & Included Columns
By utilizing PostgreSQL \`INCLUDE\` clauses, index-only scans can satisfy queries without incurring random I/O disk lookups on the main heap table.`,
        tags: ["PostgreSQL", "Database", "Performance", "SQL", "Indexing"],
        published: true,
        featured: true,
        publishedAt: new Date("2024-01-20"),
      },
    });
  }

  const existingMessages = await prisma.contactMessage.findMany();
  if (existingMessages.length === 0) {
    await prisma.contactMessage.create({
      data: {
        name: "Sarah Jenkins",
        email: "sarah.jenkins@enterprisecloud.io",
        subject: "Senior Distributed Systems Architect Opportunity",
        message: "Hi Leta,\n\nI came across your projects on distributed event brokers and state machines. We are scaling our core platform infrastructure and would love to connect about a Principal Engineer role.\n\nBest regards,\nSarah",
        createdAt: new Date(),
      },
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
