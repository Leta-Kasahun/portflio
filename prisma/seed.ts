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

  const projectsData = [
    {
      slug: "haseri",
      title: "Haseri — Local Technician Finder Platform",
      description: "A verified service marketplace connecting customers with trusted technicians for secure hiring and streamlined service delivery.",
      content: "I built Haseri as a unified platform where customers can post jobs, hire verified technicians, communicate in real-time, and make secure payments. Technicians can build professional profiles, get verified, apply for jobs, and earn reputation through reviews.",
      coverImage: "/images/haseri.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
      githubUrl: "https://github.com/Leta-Kasahun/haseri",
      liveUrl: null,
      featured: true,
      published: true,
      order: 0,
      caseStudy: {
        category: "Web-Based Local Technician Finder",
        role: "Full-stack Developer",
        problem: "In Ethiopia, finding reliable technicians is often unstructured and inefficient. People depend on Telegram groups, social media, or word-of-mouth, which leads to lack of trust, no verification, and poor accountability. At the same time, skilled workers struggle to find consistent and visible job opportunities.",
        solution: "I built Haseri as a unified platform where customers can post jobs, hire verified technicians, communicate in real-time, and make secure payments. Technicians can build professional profiles, get verified, apply for jobs, and earn reputation through reviews.",
        keyFeatures: [
          "Job posting and technician hiring system",
          "Verified technician profiles with ratings and reviews",
          "Real-time chat between users",
          "Secure payments via Chapa",
          "Admin dashboard for user and job management",
          "Document-based technician verification"
        ],
        challenge: "One major challenge was building a trustworthy verification system. I solved this by implementing an admin approval workflow where technicians submit IDs and certificates for validation before getting verified badges.",
        outcome: "The platform improves trust and efficiency in hiring local technicians by centralizing services, reducing reliance on informal channels, and introducing structured job management and verification."
      }
    },
    {
      slug: "etworks",
      title: "Etworks — Job Site Marketplace Platform",
      description: "An intelligent job portal enabling secure recruitment, AI-powered candidate matching, and structured hiring workflows.",
      content: "The system provides a centralized job portal where users can register, manage profiles, post and apply for jobs, and track applications. It also includes admin verification, CV building tools, payment processing, and AI-powered job assistance to improve hiring efficiency.",
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
        problem: "Traditional job searching platforms often suffer from fragmented workflows, limited verification, and lack of structured communication between employers and job seekers. This leads to inefficient hiring processes and poor candidate matching.",
        solution: "The system provides a centralized job portal where users can register, manage profiles, post and apply for jobs, and track applications. It also includes admin verification, CV building tools, payment processing, and AI-powered job assistance to improve hiring efficiency.",
        keyFeatures: [
          "Secure authentication (JWT, OTP, OAuth2, role-based access)",
          "Job posting, filtering, saving, and application system",
          "Employer company profiles with verification workflow",
          "Seeker profile management and CV builder system",
          "Admin dashboard for users, jobs, and analytics",
          "Payment integration for job posting and verification",
          "Notifications and AI-powered job assistant",
          "Job matching and recommendation system"
        ],
        challenge: "One major challenge was designing a scalable relational database that supports complex relationships between users, jobs, applications, and companies. I solved this using normalized PostgreSQL schema design with Flyway migrations and carefully structured API layering for consistency.",
        outcome: "The system delivers a complete job portal ecosystem with structured hiring workflows, improved job matching, and centralized management for seekers, employers, and admins."
      }
    },
    {
      slug: "bondex",
      title: "Bondex — CRM System",
      description: "A centralized CRM platform for lead management, business communication, and multi-channel customer engagement automation.",
      content: "I built a centralized full-stack CRM platform that unifies lead management and communication. It streamlines the entire workflow from lead capture to conversion, with integrations for AI assistance and messaging tools to improve response efficiency.",
      coverImage: "/images/bondex.png",
      technologies: ["TypeScript", "Node.js", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/Leta-Kasahun/bondex_frontend",
      liveUrl: null,
      featured: true,
      published: true,
      order: 2,
      caseStudy: {
        category: "Web-Based CRM & Lead Management",
        role: "Full-stack Developer",
        problem: "Businesses face difficulty managing leads coming from different sources such as web forms, email, and messaging platforms. This leads to disorganized data, missed follow-ups, and inefficient communication with potential customers.",
        solution: "I built a centralized full-stack CRM platform that unifies lead management and communication. It streamlines the entire workflow from lead capture to conversion, with integrations for AI assistance and messaging tools to improve response efficiency.",
        keyFeatures: [
          "User and admin authentication system",
          "Lead lifecycle management (create, track, convert)",
          "Business and deal tracking system",
          "AI-powered assistance for lead analysis and replies",
          "Gmail and Telegram integration for communication",
          "Notification system for updates and alerts",
          "Role-based access control (admin/user)"
        ],
        challenge: "Integrating multiple external services (AI, Gmail, Telegram) while keeping the system modular was challenging. I solved this by organizing the project into feature-based modules with consistent validation, middleware, and service separation.",
        outcome: "The system improves lead organization, automates communication workflows, and provides a scalable solution for managing customer relationships across multiple channels."
      }
    },
    {
      slug: "ethiointernship",
      title: "Ethio Internship — Internship Management Platform",
      description: "A web based internship platform connecting students with opportunities through secure applications and AI-powered recommendations.",
      content: "I developed a full-stack internship platform that connects students and companies through a secure system for internship discovery, application management, AI-powered recommendations, and candidate tracking.",
      coverImage: "/images/ethiointernship.png",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Express"],
      githubUrl: "https://github.com/Leta-Kasahun/EthioInternShip",
      liveUrl: null,
      featured: true,
      published: true,
      order: 3,
      caseStudy: {
        category: "Web-Based Internship & Career Platform",
        role: "Full-stack Developer",
        problem: "Students often struggle to find structured internship opportunities, while companies lack a centralized system for managing applications, filtering candidates, and tracking internship workflows efficiently.",
        solution: "I developed a full-stack internship platform that connects students and companies through a secure system for internship discovery, application management, AI-powered recommendations, and candidate tracking.",
        keyFeatures: [
          "Secure authentication with Google and GitHub OAuth",
          "Student profile creation with CV upload",
          "Internship posting and management system",
          "Advanced internship search and filtering",
          "Application tracking dashboard",
          "AI-powered internship recommendations",
          "Company applicant management dashboard",
          "Role-based access control"
        ],
        challenge: "Designing secure multi-role authentication while integrating third-party OAuth providers and maintaining smooth application workflows was challenging. I solved this by implementing structured role-based access control and modular authentication architecture.",
        outcome: "The platform streamlines internship discovery and application workflows, making it easier for students to find opportunities and for companies to identify qualified candidates efficiently."
      }
    },
    {
      slug: "shopsphere",
      title: "ShopSphere — E-Commerce Platform",
      description: "A scalable e-commerce marketplace supporting product discovery, secure checkout, seller management, and real-time order tracking.",
      content: "I developed a full-stack e-commerce platform that connects customers and sellers in one system. It provides structured product management, secure authentication, cart and order workflows, and seller dashboards for managing stores and sales.",
      coverImage: "/images/shopsphere.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/Leta-Kasahun/CodeAlpha_Ecommerce_Frontend",
      liveUrl: null,
      featured: true,
      published: true,
      order: 4,
      caseStudy: {
        category: "Web-Based E-Commerce",
        role: "Full-stack Developer",
        problem: "Traditional small-scale online selling often lacks a unified platform where sellers can manage products and orders while customers enjoy a smooth shopping experience with proper search, filtering, and order tracking.",
        solution: "I developed a full-stack e-commerce platform that connects customers and sellers in one system. It provides structured product management, secure authentication, cart and order workflows, and seller dashboards for managing stores and sales.",
        keyFeatures: [
          "User authentication with OTP and JWT",
          "Product catalog with filtering, sorting, and search",
          "Shopping cart and wishlist system",
          "Secure checkout and order tracking",
          "Seller dashboard for product and order management",
          "Role-based access (Customer & Seller)",
          "Analytics dashboard for sales insights"
        ],
        challenge: "Managing complex state across cart, orders, and seller dashboards was challenging. I solved this using Zustand for centralized state management and modular component design for scalability and maintainability.",
        outcome: "The platform delivers a complete e-commerce experience with smooth user interaction, efficient seller management, and scalable architecture suitable for real-world online marketplace systems."
      }
    },
    {
      slug: "sharesphere",
      title: "ShareSphere — Social Media Platform",
      description: "A full-stack social networking platform enabling content sharing, real-time interactions, user engagement, and profile management.",
      content: "I developed a full-stack social platform that supports user authentication, post creation, engagement features, and profile management. The system integrates frontend UI with backend APIs to provide a complete social networking experience including stories, media uploads, and Google OAuth login.",
      coverImage: "/images/sharesphere.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/Leta-Kasahun/CodeAlpha_SocialMediaApp_Frontend",
      liveUrl: null,
      featured: true,
      published: true,
      order: 5,
      caseStudy: {
        category: "Web-Based Social Networking",
        role: "Full-stack Developer",
        problem: "Most basic social media clones either lack real interaction features or do not implement a complete full-stack workflow. There is often missing functionality in authentication, media handling, and user interaction systems.",
        solution: "I developed a full-stack social platform that supports user authentication, post creation, engagement features, and profile management. The system integrates frontend UI with backend APIs to provide a complete social networking experience including stories, media uploads, and Google OAuth login.",
        keyFeatures: [
          "User authentication (email/password + Google Sign-In)",
          "Create, edit, delete posts with images and text",
          "Like and comment system",
          "User profiles with editable information",
          "Stories feature with 24-hour expiry",
          "Media upload and storage using Cloudinary",
          "Protected routes and secure API integration"
        ],
        challenge: "A key challenge was managing real-time user interactions (posts, likes, comments) while keeping frontend and backend data synchronized. I solved this through structured API design, centralized state management using Zustand, and clean separation of concerns in components and services.",
        outcome: "The project delivers a complete full-stack social media experience with smooth user interaction, scalable architecture, and practical implementation of authentication, media handling and social features."
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

  const skillsData = [
    { name: "TypeScript", category: "Languages", level: "Advanced", order: 0 },
    { name: "JavaScript", category: "Languages", level: "Expert", order: 1 },
    { name: "Java", category: "Languages", level: "Advanced", order: 2 },
    { name: "PHP", category: "Languages", level: "Proficient", order: 3 },
    { name: "Python", category: "Languages", level: "Proficient", order: 4 },
    { name: "SQL", category: "Languages", level: "Advanced", order: 5 },

    { name: "Spring Boot", category: "Backend & Systems", level: "Advanced", order: 0 },
    { name: "Node.js", category: "Backend & Systems", level: "Expert", order: 1 },
    { name: "Express", category: "Backend & Systems", level: "Expert", order: 2 },
    { name: "Distributed Systems", category: "Backend & Systems", level: "Advanced", order: 3 },
    { name: "RESTful APIs", category: "Backend & Systems", level: "Expert", order: 4 },
    { name: "Microservices", category: "Backend & Systems", level: "Advanced", order: 5 },

    { name: "Next.js", category: "Frontend", level: "Expert", order: 0 },
    { name: "React", category: "Frontend", level: "Expert", order: 1 },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert", order: 2 },
    { name: "State Management", category: "Frontend", level: "Advanced", order: 3 },
    { name: "HTML5 / CSS3", category: "Frontend", level: "Expert", order: 4 },

    { name: "PostgreSQL", category: "Databases", level: "Advanced", order: 0 },
    { name: "MySQL", category: "Databases", level: "Advanced", order: 1 },
    { name: "MongoDB", category: "Databases", level: "Advanced", order: 2 },
    { name: "Redis", category: "Databases", level: "Proficient", order: 3 },
    { name: "Prisma ORM", category: "Databases", level: "Expert", order: 4 },

    { name: "Docker", category: "DevOps & Cloud", level: "Advanced", order: 0 },
    { name: "Git & GitHub", category: "DevOps & Cloud", level: "Expert", order: 1 },
    { name: "Linux / Bash", category: "DevOps & Cloud", level: "Advanced", order: 2 },
    { name: "CI / CD", category: "DevOps & Cloud", level: "Proficient", order: 3 },
  ];

  for (const s of skillsData) {
    await prisma.skill.upsert({
      where: {
        name_category: {
          name: s.name,
          category: s.category,
        },
      },
      update: {
        level: s.level,
        order: s.order,
      },
      create: {
        name: s.name,
        category: s.category,
        level: s.level,
        order: s.order,
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
