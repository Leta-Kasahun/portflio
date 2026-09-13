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

  await prisma.admin.upsert({
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

  const profilePayload = {
    name: "Leta Kasahun",
    title: "Senior Full-Stack & Distributed Systems Engineer",
    bio: "Architecting resilient distributed systems, event-driven backends, and high-performance modern web platforms.",
    about: "Software Engineer with deep expertise in full-stack web architecture, distributed systems, and cloud infrastructure. Passionate about craftsmanship, zero-trust security, sub-millisecond query optimization, and engineering maintainable, scalable software.",
    location: "Addis Ababa, Ethiopia",
    email: "letakasahun2@gmail.com",
    imageUrl: "/images/hero.JPG",
    resumeUrl: "/resumes/1789312486309_myresumefinal.pdf_3_.pdf",
  };

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profilePayload,
    });
  } else {
    const createdProfile = await prisma.profile.create({
      data: profilePayload,
    });
    profileId = createdProfile.id;
  }

  if (profileId) {
    const socialLinksData = [
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
    ];

    await prisma.socialLink.deleteMany({ where: { profileId } });
    await prisma.socialLink.createMany({ data: socialLinksData });

    const experiencesData = [
      {
        profileId,
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
      },
      {
        profileId,
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
      },
      {
        profileId,
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
      },
    ];

    await prisma.experience.deleteMany({ where: { profileId } });
    for (const exp of experiencesData) {
      await prisma.experience.create({ data: exp });
    }

    const educationsData = [
      {
        profileId,
        institution: "Addis Ababa University",
        degree: "B.Sc. in Computer Science & Software Engineering",
        field: "Distributed Systems & Computer Networks",
        description: "Graduated with High Distinction. Comprehensive focus on distributed systems, operating system kernels, and database architecture.",
        courses: [
          "Distributed Systems",
          "Algorithms & Data Structures",
          "Database Management Systems",
          "Computer Architecture",
          "Operating Systems",
          "Computer Networks"
        ],
        startDate: new Date("2015-09-01"),
        endDate: new Date("2019-06-30"),
        order: 0,
      },
    ];

    await prisma.education.deleteMany({ where: { profileId } });
    for (const edu of educationsData) {
      await prisma.education.create({ data: edu });
    }
  }

  const projectsData = [
    {
      slug: "haseri",
      title: "Haseri — Local Technician Finder Platform",
      description: "A verified service marketplace connecting customers with trusted technicians for secure hiring and streamlined service delivery.",
      content: "Haseri is a unified platform where customers can post jobs, hire verified technicians, communicate in real-time, and execute secure transactions. Built with Next.js, TypeScript, Tailwind CSS, PHP, and MySQL.",
      coverImage: "/images/haseri.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
      githubUrl: "https://github.com/Leta-Kasahun/haseri",
      liveUrl: null,
      featured: true,
      published: true,
      order: 0,
      caseStudy: {
        category: "Web-Based Local Technician Finder",
        role: "Full-Stack Developer",
        problem: "Finding reliable local technicians often suffers from fragmented channels, lack of credential verification, and absence of accountability.",
        solution: "Engineered a centralized platform featuring verified technician profiles, review aggregation, direct messaging, and secure milestone payments.",
        keyFeatures: [
          "Job posting and technician hiring system",
          "Verified technician profiles with ratings and reviews",
          "Real-time chat between users",
          "Secure payments via Chapa",
          "Admin dashboard for user and job management",
          "Document-based technician verification"
        ],
        challenge: "Developing a trustworthy verification system solved through an admin approval pipeline validating uploaded identity documents.",
        outcome: "Delivers an efficient, verified local services marketplace with structured job management and high user trust."
      }
    },
    {
      slug: "etworks",
      title: "Etworks — Job Site Marketplace Platform",
      description: "An intelligent job portal enabling secure recruitment, candidate matching, and structured hiring workflows.",
      content: "Centralized recruitment platform providing role-based portals for employers and candidates, verified company profiles, and CV tracking. Built with Spring Boot, Java, PostgreSQL, React, and Tailwind CSS.",
      coverImage: "/images/Etworks.png",
      technologies: ["Spring Boot", "Java", "PostgreSQL", "React", "Tailwind CSS"],
      githubUrl: "https://github.com/Leta-Kasahun/Jobsphere",
      liveUrl: null,
      featured: true,
      published: true,
      order: 1,
      caseStudy: {
        category: "Web-Based Job Portal & HR Tech",
        role: "Backend & Database Developer",
        problem: "Traditional job recruitment suffers from disorganized candidate submissions, manual application tracking, and inadequate employer verification.",
        solution: "Designed a high-throughput backend in Spring Boot with normalized PostgreSQL schemas and comprehensive role-based access control.",
        keyFeatures: [
          "Secure authentication with JWT, OTP, and role-based access control",
          "Job posting, application tracking, and bookmarking",
          "Employer company verification workflow",
          "Candidate profile and resume builder",
          "Administrative dashboard for platform management"
        ],
        challenge: "Designing relational database schemas supporting high-concurrency applications, solved with indexed PostgreSQL tables and connection pooling.",
        outcome: "A production-grade recruitment ecosystem connecting verified enterprises with qualified job seekers."
      }
    },
    {
      slug: "bondex",
      title: "Bondex — CRM System",
      description: "A centralized CRM platform for lead management, business communication, and multi-channel customer engagement automation.",
      content: "Full-stack customer relationship management platform streamlining sales pipelines, automated communication, and client analytics. Built with TypeScript, Node.js, Express, and PostgreSQL.",
      coverImage: "/images/bondex.png",
      technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/Leta-Kasahun/bondex_frontend",
      liveUrl: null,
      featured: true,
      published: true,
      order: 2,
      caseStudy: {
        category: "Customer Relationship Management (CRM)",
        role: "Full-Stack Developer",
        problem: "Businesses struggle with disconnected lead tracking, inconsistent follow-ups, and fragmented customer data.",
        solution: "Built a consolidated CRM engine organizing leads into customizable pipelines with automated activity logs and real-time statuses.",
        keyFeatures: [
          "Lead tracking and pipeline stage management",
          "Contact organization and historical interaction logs",
          "Activity dashboards with real-time conversion metrics",
          "Role-based permission matrix for sales teams"
        ],
        challenge: "Maintaining low API response times during complex relational queries across lead interactions, addressed with composite database indexing.",
        outcome: "Empowers sales and operations teams with real-time visibility into client conversions and customer lifecycles."
      }
    },
    {
      slug: "ethiointernship",
      title: "EthioInternship — Student Internship Management System",
      description: "A specialized platform connecting university students with industry internships and academic supervision workflows.",
      content: "Web-based university internship portal coordinating student applications, enterprise supervisor approvals, and academic evaluation. Built with React, Node.js, Express, and MongoDB.",
      coverImage: "/images/ethiointernship.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/Leta-Kasahun/EthioInternShip",
      liveUrl: null,
      featured: false,
      published: true,
      order: 3,
      caseStudy: {
        category: "Academic & Internship Management",
        role: "Full-Stack Developer",
        problem: "Managing student internship placements manually creates administrative friction and delayed evaluation reporting.",
        solution: "Engineered a three-tier portal linking students, company mentors, and university advisors in a unified evaluation loop.",
        keyFeatures: [
          "Student internship application and placement tracking",
          "Company supervisor progress logging",
          "University academic advisor evaluation portal",
          "Automated completion certification generation"
        ],
        challenge: "Managing multi-party document submission and approval states, solved via a structured workflow state machine.",
        outcome: "Drastically reduced placement cycle times and improved verification integrity for university faculties."
      }
    },
    {
      slug: "e-commerce",
      title: "Modern Full-Stack E-Commerce Platform",
      description: "A responsive online marketplace featuring product catalogs, cart management, and secure checkout processing.",
      content: "Full-featured online retail platform with product filtering, inventory management, user profiles, and payment integration. Built with React, Node.js, Express, and MongoDB.",
      coverImage: "/images/e-commerce.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/Leta-Kasahun/CodeAlpha_Ecommerce_Frontend",
      liveUrl: null,
      featured: false,
      published: true,
      order: 4,
      caseStudy: {
        category: "E-Commerce & Digital Commerce",
        role: "Full-Stack Developer",
        problem: "Shoppers require smooth navigation, fast search, and dependable checkout security across mobile and desktop.",
        solution: "Developed an intuitive storefront backed by a performant catalog API and asynchronous order fulfillment services.",
        keyFeatures: [
          "Dynamic product search, category filtering, and sorting",
          "Persistent shopping cart and checkout pipeline",
          "Secure payment integration with Stripe",
          "User order tracking and profile dashboard"
        ],
        challenge: "Preventing inventory race conditions during high-demand checkouts, solved with transactional stock reservation locks.",
        outcome: "A dependable, responsive e-commerce application delivering seamless transactions."
      }
    },
    {
      slug: "social-media-platform",
      title: "Full-Stack Social Media Platform",
      description: "An interactive social network with real-time posts, multimedia uploads, social engagement, and stories.",
      content: "Social networking application enabling users to share media posts, engage with feeds, publish temporary stories, and customize profiles. Built with React, Node.js, Express, MongoDB, and Cloudinary.",
      coverImage: "/images/social.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
      githubUrl: "https://github.com/Leta-Kasahun/CodeAlpha_SocialMediaApp_Frontend",
      liveUrl: null,
      featured: false,
      published: true,
      order: 5,
      caseStudy: {
        category: "Social Networking & Media Sharing",
        role: "Full-Stack Developer",
        problem: "Social platforms require immediate feedback, high-concurrency feeds, and reliable media delivery.",
        solution: "Architected optimized REST endpoints with Cloudinary CDN integration and efficient client-side state caching.",
        keyFeatures: [
          "User authentication with JWT and Google Sign-In",
          "Post creation, multimedia uploading, likes, and comments",
          "Temporary stories with 24-hour expiration",
          "User profile customization and followers graph"
        ],
        challenge: "Minimizing client latency when rendering image-heavy media feeds, solved via lazy-loading and responsive CDN image transformations.",
        outcome: "An engaging social application built for high interactivity and reliable media distribution."
      }
    }
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const skillsData = [
    { name: "TypeScript", category: "Languages & Runtimes", level: "Expert", order: 0 },
    { name: "JavaScript", category: "Languages & Runtimes", level: "Expert", order: 1 },
    { name: "Java", category: "Languages & Runtimes", level: "Advanced", order: 2 },
    { name: "Go", category: "Languages & Runtimes", level: "Advanced", order: 3 },
    { name: "PHP", category: "Languages & Runtimes", level: "Proficient", order: 4 },
    { name: "Python", category: "Languages & Runtimes", level: "Proficient", order: 5 },
    { name: "SQL", category: "Languages & Runtimes", level: "Expert", order: 6 },

    { name: "Next.js 16", category: "Frameworks & Web", level: "Expert", order: 0 },
    { name: "React 19", category: "Frameworks & Web", level: "Expert", order: 1 },
    { name: "Spring Boot", category: "Frameworks & Web", level: "Advanced", order: 2 },
    { name: "Node.js", category: "Frameworks & Web", level: "Expert", order: 3 },
    { name: "Express", category: "Frameworks & Web", level: "Expert", order: 4 },
    { name: "Tailwind CSS v4", category: "Frameworks & Web", level: "Expert", order: 5 },

    { name: "PostgreSQL", category: "Databases & Storage", level: "Expert", order: 0 },
    { name: "Neon Serverless", category: "Databases & Storage", level: "Expert", order: 1 },
    { name: "MySQL", category: "Databases & Storage", level: "Advanced", order: 2 },
    { name: "MongoDB", category: "Databases & Storage", level: "Advanced", order: 3 },
    { name: "Redis", category: "Databases & Storage", level: "Proficient", order: 4 },
    { name: "Prisma ORM", category: "Databases & Storage", level: "Expert", order: 5 },

    { name: "Docker", category: "Distributed Systems & Cloud", level: "Advanced", order: 0 },
    { name: "RESTful APIs", category: "Distributed Systems & Cloud", level: "Expert", order: 1 },
    { name: "Microservices", category: "Distributed Systems & Cloud", level: "Advanced", order: 2 },
    { name: "Git & GitHub", category: "Distributed Systems & Cloud", level: "Expert", order: 3 },
    { name: "CI / CD Pipelines", category: "Distributed Systems & Cloud", level: "Advanced", order: 4 },
    { name: "Linux / Bash", category: "Distributed Systems & Cloud", level: "Advanced", order: 5 },
  ];

  await prisma.skill.deleteMany();
  for (const s of skillsData) {
    await prisma.skill.create({ data: s });
  }

  const certificatesData = [
    {
      name: "Bondex Certified Software Engineering Professional",
      issuer: "Bondex Technology",
      issueDate: new Date("2023-10-15"),
      credentialUrl: "https://github.com/Leta-Kasahun/bondex_frontend",
      imageUrl: "/certificates/1789320195109_bondex.png",
      description: "Professional certification validating full-stack web application architecture, CRM pipeline engineering, and relational database design.",
      order: 0,
    },
  ];

  await prisma.certificate.deleteMany();
  for (const cert of certificatesData) {
    await prisma.certificate.create({ data: cert });
  }

  const blogPostsData = [
    {
      title: "Architecting Resilient Distributed Systems: Lessons from Production",
      slug: "architecting-resilient-distributed-systems",
      excerpt: "A deep architectural analysis of event-driven architectures, distributed transactions, idempotency patterns, and failure recovery in high-concurrency systems.",
      content: `## The Reality of Distributed Architecture

When designing distributed systems across microservice boundaries, network partitions and component failures are inevitable realities.

\`\`\`typescript
interface IdempotentCommand<T> {
  idempotencyKey: string;
  timestamp: number;
  payload: T;
  retryCount: number;
}
\`\`\`

### Idempotency Keys and State Deduplication
Every state mutation entering an event queue or HTTP API gateway must carry a unique idempotency key. By checking this key against a fast key-value store like Redis with atomic SETNX operations, duplicate executions caused by transient network retries are prevented.

### Outbox Pattern for Guaranteed Delivery
Directly writing to a message broker and database within the same transaction creates two-phase commit overhead. The transactional outbox pattern writes events directly to an outbox table in PostgreSQL within the business transaction, ensuring at-least-once delivery without distributed locks.

### Key Architectural Tenets
1. Treat every external network call as inherently fallible.
2. Design every message consumer to be strictly idempotent.
3. Decouple synchronous HTTP request chains into asynchronous event streams.`,
      tags: ["Distributed Systems", "Architecture", "Microservices", "Event-Driven"],
      published: true,
      featured: true,
      publishedAt: new Date("2024-03-15"),
    },
    {
      title: "PostgreSQL Query Optimization: From Sequential Scans to Sub-Millisecond Execution",
      slug: "postgresql-query-optimization",
      excerpt: "Mastering EXPLAIN ANALYZE, B-Tree and GIN indexes, composite indexing, lock contention reduction, and connection pooling for production databases.",
      content: `## Demystifying PostgreSQL Execution Plans

Slow database queries in production often stem from missing indexes, unindexed foreign keys, or poor query planning that forces full table scans.

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT p.id, p.title, p.slug, p.created_at
FROM "Project" p
WHERE p.published = true
ORDER BY p.order ASC, p.created_at DESC;
\`\`\`

### Index Strategies: B-Tree vs Composite Indexes
A standard single-column B-tree index is insufficient when queries filter on multiple predicates. A composite index matching the query filter and ordering columns allows PostgreSQL to execute an Index Scan or Index-Only Scan directly from cache buffers.

\`\`\`sql
CREATE INDEX CONCURRENTLY idx_project_published_order 
ON "Project" (published, "order" ASC, created_at DESC);
\`\`\`

### Minimizing Connection Overhead with Connection Pooling
PostgreSQL forks a backend process for each client connection. In serverless environments like Neon or AWS Lambda, sudden traffic surges cause connection exhaustion. Implementing PgBouncer or serverless connection pooling bounds active connections to hardware limits.`,
      tags: ["PostgreSQL", "Databases", "Performance", "SQL", "Backend"],
      published: true,
      featured: true,
      publishedAt: new Date("2024-02-28"),
    },
    {
      title: "Building Scalable Microservices with Spring Boot, PostgreSQL, and Next.js",
      slug: "building-scalable-microservices-spring-boot",
      excerpt: "Practical patterns for clean hexagonal architecture, Flyway schema migrations, asynchronous request processing, and zero-downtime deployments.",
      content: `## Multi-Tier Enterprise Architecture

Modern web platforms like Job Portals and Enterprise CRMs demand robust separation of concerns between client presentation and domain business logic.

\`\`\`java
@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobPostingController {

    private final JobPostingService jobService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobResponseDto> createJob(
            @Valid @RequestBody JobRequestDto request,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobService.createPosting(request, principal.getId()));
    }
}
\`\`\`

### Clean Hexagonal Boundaries
By separating controllers, service interfaces, domain models, and JPA repository adapters, the business logic remains entirely decoupled from infrastructure drivers.

### Flyway Database Versioning
Manual database edits create schema drift between development and production. Integrating Flyway migrations into Spring Boot automates repeatable, version-controlled schema transformations with rollback safety.`,
      tags: ["Spring Boot", "Java", "Backend", "PostgreSQL", "APIs"],
      published: true,
      featured: true,
      publishedAt: new Date("2024-01-20"),
    },
    {
      title: "Full-Stack Web Performance: Next.js 16 Server Components and Streaming Architecture",
      slug: "nextjs-server-components-streaming-performance",
      excerpt: "Advanced strategies for React Server Components, streaming SSR, dynamic database caching with Prisma, and mobile-first responsiveness.",
      content: `## Evolution of Server-Side React

The App Router in Next.js shifts the paradigm from heavyweight client bundles to zero-bundle-size React Server Components running on the edge.

\`\`\`tsx
export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
\`\`\`

### Eliminating Waterfall Fetches
By colocating data requirements directly within Server Components, the server resolves database queries in parallel before sending HTML over the wire, completely eliminating client-side loading spinners and layout shift.

### Mobile-First Layout Architecture
Every component must be architected starting from narrow 320px screens up to widescreen displays without horizontal scroll overflow. Using CSS grid with fluid minmax columns ensures clean responsive typography across all viewports.`,
      tags: ["Next.js", "React", "TypeScript", "Frontend", "Performance"],
      published: true,
      featured: true,
      publishedAt: new Date("2023-12-10"),
    },
  ];

  await prisma.blogPost.deleteMany();
  for (const post of blogPostsData) {
    await prisma.blogPost.create({ data: post });
  }

  await prisma.contactMessage.deleteMany({
    where: { email: "sarah.jenkins@enterprisecloud.io" },
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
