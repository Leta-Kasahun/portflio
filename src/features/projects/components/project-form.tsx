"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Project } from "@/generated/prisma/client";
import {
  createProjectAction,
  updateProjectAction,
  ProjectActionResult,
} from "../mutations";

type ArchitectureNodeInput = {
  id: string;
  layer: string;
  name: string;
  badge: string;
  protocol: string;
  role: string;
  specifications: string[];
};

type CaseStudyData = {
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  problem?: string;
  solution?: string;
  challenge?: string;
  outcome?: string;
  keyFeatures?: string[] | string;
  architecturePattern?: string;
  architectureNodes?: ArchitectureNodeInput[];
};

const ARCHITECTURE_TEMPLATES: Record<
  string,
  { label: string; pattern: string; nodes: Omit<ArchitectureNodeInput, "id">[] }
> = {
  mvc: {
    label: "+ MVC",
    pattern: "MVC Architecture",
    nodes: [
      {
        layer: "View",
        name: "Next.js / React UI",
        badge: "Client View",
        protocol: "HTTPS / TLS",
        role: "Renders responsive interfaces, handles optimistic updates, and coordinates user interactions.",
        specifications: ["Optimistic UI updates", "SSR client hydration", "Responsive layout"],
      },
      {
        layer: "Controller",
        name: "REST Controller",
        badge: "Routing & Guard",
        protocol: "HTTP / JSON",
        role: "Intercepts incoming requests, sanitizes parameters, and dispatches actions to service layers.",
        specifications: ["Input sanitization", "JWT token validation", "Route dispatching"],
      },
      {
        layer: "Service Layer",
        name: "Domain Services",
        badge: "Business Logic",
        protocol: "Internal Call",
        role: "Executes core transactional rules, orchestrates data pipelines, and enforces security constraints.",
        specifications: ["Transactional integrity", "Domain business logic", "Error boundary recovery"],
      },
      {
        layer: "Model",
        name: "ORM Entities & DB",
        badge: "Data Model",
        protocol: "TCP Pool",
        role: "Manages data entity definitions, executes database queries, and guarantees referential consistency.",
        specifications: ["ACID transactions", "Composite indexing", "Connection pooling"],
      },
    ],
  },
  multiTier: {
    label: "+ Multi-Tier",
    pattern: "Multi-Tier Layered",
    nodes: [
      {
        layer: "Presentation Layer",
        name: "Web & Mobile Client",
        badge: "Client Edge",
        protocol: "HTTPS / TLS 1.3",
        role: "Delivers interactive user experience across all device viewports.",
        specifications: ["Cross-browser responsiveness", "Asset compression", "Component modularity"],
      },
      {
        layer: "Security & Gateway",
        name: "API Gateway & RBAC",
        badge: "Security Guard",
        protocol: "REST / JWT",
        role: "Enforces authentication boundaries, rate limiting, and request routing.",
        specifications: ["Bearer token verification", "CORS policy enforcement", "Rate limit monitoring"],
      },
      {
        layer: "Application Core",
        name: "Microservice Engine",
        badge: "Domain Engine",
        protocol: "HTTP / RPC",
        role: "Coordinates application state machines and complex transactional workflows.",
        specifications: ["Service orchestration", "Asynchronous task workers", "Fault isolation"],
      },
      {
        layer: "Persistence Layer",
        name: "Relational Database",
        badge: "Storage Engine",
        protocol: "Connection Pool",
        role: "Stores persistent relational data with strict schema normalization.",
        specifications: ["ACID compliance", "Index-optimized query plans", "Automated backups"],
      },
    ],
  },
  hybrid: {
    label: "+ Hybrid Cloud",
    pattern: "Hybrid Cloud & Microservices",
    nodes: [
      {
        layer: "Edge & Presentation",
        name: "Next.js Edge CDN",
        badge: "Edge SSR",
        protocol: "HTTPS / TLS 1.3",
        role: "Serves globally distributed assets, manages optimistic client state, and renders dynamic interfaces.",
        specifications: ["Global edge caching", "Dynamic SSR streaming", "Client bundle compression"],
      },
      {
        layer: "Core Gateway & API",
        name: "API Gateway & Auth",
        badge: "Central Gateway",
        protocol: "REST / GraphQL",
        role: "Orchestrates incoming client traffic, verifies session tokens, and executes primary transactional logic.",
        specifications: ["JWT authentication", "Rate limiting proxy", "API schema validation"],
      },
      {
        layer: "Serverless Workers",
        name: "Async Event Workers",
        badge: "Microservices",
        protocol: "AMQP / EventQueue",
        role: "Processes asynchronous tasks, heavy computing workloads, email dispatch, and background queues.",
        specifications: ["Event-driven triggers", "Independent autoscaling", "Isolated fault boundaries"],
      },
      {
        layer: "Polyglot Persistence",
        name: "PostgreSQL & Redis",
        badge: "Relational + Cache",
        protocol: "TCP Connection Pool",
        role: "Combines ACID-compliant relational data modeling with sub-millisecond in-memory cache and pub/sub.",
        specifications: ["Relational ACID integrity", "Sub-ms cache hit ratio", "Pub/Sub event queuing"],
      },
      {
        layer: "Cloud & Third-Party",
        name: "Managed Cloud Services",
        badge: "Cloud SaaS",
        protocol: "TLS REST Webhooks",
        role: "Integrates specialized managed services like payment gateways (Stripe) and media storage (S3/Cloudinary).",
        specifications: ["HMAC signature verification", "Zero server storage overhead", "Managed reliability SLA"],
      },
    ],
  },
  devOps: {
    label: "+ DevOps",
    pattern: "DevOps & CI/CD Pipeline",
    nodes: [
      {
        layer: "Source Control",
        name: "GitHub Repository",
        badge: "Git Versioning",
        protocol: "SSH / Git",
        role: "Tracks code revisions, manages branch policies, and triggers webhook pipelines.",
        specifications: ["Branch protection rules", "Automated PR reviews", "Semantic version tagging"],
      },
      {
        layer: "CI / CD Engine",
        name: "GitHub Actions",
        badge: "Automation Runner",
        protocol: "YAML Workflow",
        role: "Runs automated typechecking, lint verification, unit tests, and production build checks.",
        specifications: ["Automated test suites", "Static type verification", "Build artifact generation"],
      },
      {
        layer: "Containerization",
        name: "Docker Engine",
        badge: "Container Image",
        protocol: "OCI Image / Dockerfile",
        role: "Packages application and dependencies into reproducible, lightweight container images.",
        specifications: ["Multi-stage build optimization", "Zero vulnerability scans", "Minimal image footprint"],
      },
      {
        layer: "Cloud Deployment",
        name: "Edge Cluster & DB",
        badge: "Cloud Production",
        protocol: "HTTPS / CDN",
        role: "Hosts production workloads with global edge caching and zero-downtime rolling deploys.",
        specifications: ["Global edge caching", "Automatic health checks", "High availability failover"],
      },
    ],
  },
};

type ProjectFormProps = {
  project?: Project | null;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const boundAction = project
    ? updateProjectAction.bind(null, project.id)
    : createProjectAction;

  const [state, formAction, isPending] = useActionState<
    ProjectActionResult | null,
    FormData
  >(boundAction, null);

  const caseStudy = (project?.caseStudy as CaseStudyData | null) || null;
  const situationValue = caseStudy?.situation || caseStudy?.problem || "";
  const taskValue = caseStudy?.task || caseStudy?.challenge || "";
  const actionValue = caseStudy?.action || caseStudy?.solution || "";
  const resultValue = caseStudy?.result || caseStudy?.outcome || "";
  const keyFeaturesValue = Array.isArray(caseStudy?.keyFeatures)
    ? caseStudy.keyFeatures.join("\n")
    : typeof caseStudy?.keyFeatures === "string"
    ? caseStudy.keyFeatures
    : "";

  const [archPattern, setArchPattern] = useState(
    caseStudy?.architecturePattern || "MVC Architecture"
  );
  const [archNodes, setArchNodes] = useState<ArchitectureNodeInput[]>(
    Array.isArray(caseStudy?.architectureNodes) && caseStudy.architectureNodes.length > 0
      ? caseStudy.architectureNodes
      : []
  );

  const applyTemplate = (key: keyof typeof ARCHITECTURE_TEMPLATES) => {
    const tpl = ARCHITECTURE_TEMPLATES[key];
    if (!tpl) return;
    setArchPattern(tpl.pattern);
    setArchNodes(
      tpl.nodes.map((node, i) => ({
        ...node,
        id: `node-${Date.now()}-${i + 1}`,
      }))
    );
  };

  const addNode = () => {
    setArchNodes((prev) => [
      ...prev,
      {
        id: `node-${Date.now()}`,
        layer: "Component Layer",
        name: "New Service",
        badge: "Subsystem",
        protocol: "HTTP / REST",
        role: "Description of node responsibilities and operations.",
        specifications: ["Specification 1", "Specification 2"],
      },
    ]);
  };

  const updateNode = (
    index: number,
    field: keyof ArchitectureNodeInput,
    value: string | string[]
  ) => {
    setArchNodes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeNode = (index: number) => {
    setArchNodes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          Core Details
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Project Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={project?.title || ""}
              placeholder="e.g. Distributed Event Broker"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Slug (URL Identifier)
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={project?.slug || ""}
              placeholder="auto-generated from title if blank"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="githubUrl"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              GitHub Repository URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              defaultValue={project?.githubUrl || ""}
              placeholder="https://github.com/..."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="liveUrl"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Live Demo / Product URL
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={project?.liveUrl || ""}
              placeholder="https://..."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="technologies"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Technologies (comma separated)
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              defaultValue={project?.technologies.join(", ") || ""}
              placeholder="Go, Rust, PostgreSQL, Next.js, Redis, Docker"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="coverImageFile"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Cover Image Upload
            </label>
            <input
              id="coverImageFile"
              name="coverImageFile"
              type="file"
              accept="image/*"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
            />
            {project?.coverImage && (
              <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
                Current:{" "}
                <a
                  href={project.coverImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3FC7B0] underline"
                >
                  View Image
                </a>
              </p>
            )}
            <input
              type="hidden"
              name="coverImage"
              defaultValue={project?.coverImage || ""}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Summary Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            defaultValue={project?.description || ""}
            placeholder="High-level engineering overview of what this project accomplishes."
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="space-y-4 rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#0E1113] p-4 sm:p-5">
          <input
            type="hidden"
            name="architectureNodes"
            value={JSON.stringify(archNodes)}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#22282B] pb-3">
            <div>
              <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#3FC7B0]">
                Architecture & Deep Dive Designer
              </span>
              <span className="mt-0.5 block font-mono text-[11px] text-[#8A9295]">
                Configure the architectural paradigm and interactive nodes for this project.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {Object.entries(ARCHITECTURE_TEMPLATES).map(([key, tpl]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyTemplate(key)}
                  className="rounded border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-[10px] text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  {tpl.label}
                </button>
              ))}
              <button
                type="button"
                onClick={addNode}
                className="rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2.5 py-1 font-mono text-[10px] text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0]/20"
              >
                + Add Node
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="architecturePattern"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Architectural Paradigm / Pattern Name
            </label>
            <input
              id="architecturePattern"
              name="architecturePattern"
              type="text"
              value={archPattern}
              onChange={(e) => setArchPattern(e.target.value)}
              placeholder="e.g. MVC Architecture, Multi-Tier Layered, Event-Driven, Microservices"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#171B1D] px-3.5 py-2 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0]"
            />
          </div>

          {archNodes.length > 0 && (
            <div className="space-y-3">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8A9295]">
                Configured System Nodes ({archNodes.length})
              </span>

              <div className="space-y-3">
                {archNodes.map((node, idx) => (
                  <div
                    key={node.id || idx}
                    className="rounded-tl-[10px] sm:rounded-tl-[16px] rounded-br-[10px] sm:rounded-br-[16px] rounded-tr-none rounded-bl-none border border-[#22282B] bg-[#171B1D] p-3 sm:p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#22282B] pb-2">
                      <span className="font-mono text-xs font-bold text-[#3FC7B0]">
                        Node #{idx + 1}: {node.layer || "Component"}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNode(idx)}
                        className="font-mono text-[11px] text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="block font-mono text-[10px] text-[#8A9295]">
                          Layer Name (e.g. View, Controller, Model)
                        </label>
                        <input
                          type="text"
                          value={node.layer}
                          onChange={(e) => updateNode(idx, "layer", e.target.value)}
                          className="mt-1 w-full rounded border border-[#22282B] bg-[#0E1113] px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-[#3FC7B0]"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-[#8A9295]">
                          Component / Tech (e.g. Next.js, Spring Boot)
                        </label>
                        <input
                          type="text"
                          value={node.name}
                          onChange={(e) => updateNode(idx, "name", e.target.value)}
                          className="mt-1 w-full rounded border border-[#22282B] bg-[#0E1113] px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-[#3FC7B0]"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] text-[#8A9295]">
                          Communication Protocol
                        </label>
                        <input
                          type="text"
                          value={node.protocol}
                          onChange={(e) => updateNode(idx, "protocol", e.target.value)}
                          placeholder="HTTPS / REST, TCP Pool, etc."
                          className="mt-1 w-full rounded border border-[#22282B] bg-[#0E1113] px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-[#3FC7B0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#8A9295]">
                        Responsibilities & Role
                      </label>
                      <input
                        type="text"
                        value={node.role}
                        onChange={(e) => updateNode(idx, "role", e.target.value)}
                        placeholder="What this layer does in the system..."
                        className="mt-1 w-full rounded border border-[#22282B] bg-[#0E1113] px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-[#3FC7B0]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#8A9295]">
                        Guarantees & Specs (comma separated)
                      </label>
                      <input
                        type="text"
                        value={node.specifications?.join(", ") || ""}
                        onChange={(e) =>
                          updateNode(
                            idx,
                            "specifications",
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                        placeholder="e.g. ACID transactions, Optimistic UI, Rate limiting"
                        className="mt-1 w-full rounded border border-[#22282B] bg-[#0E1113] px-2.5 py-1.5 font-mono text-xs text-white outline-none focus:border-[#3FC7B0]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="content"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Additional Written Architecture Notes (Optional Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              defaultValue={project?.content || ""}
              placeholder="Detailed architecture write-up, data structures, trade-offs, and design choices."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#171B1D] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          STAR Framework Case Study
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="situation"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Situation (Context & Problem)
            </label>
            <textarea
              id="situation"
              name="situation"
              rows={3}
              defaultValue={situationValue}
              placeholder="What was the initial bottleneck, legacy constraint, or challenge?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="task"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Task (Engineering Objective)
            </label>
            <textarea
              id="task"
              name="task"
              rows={3}
              defaultValue={taskValue}
              placeholder="What specific goal or throughput requirement needed to be achieved?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="action"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Action (Technical Implementation)
            </label>
            <textarea
              id="action"
              name="action"
              rows={3}
              defaultValue={actionValue}
              placeholder="How did you architect, optimize, and deliver the solution?"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="result"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Result (Measurable Impact & Metrics)
            </label>
            <textarea
              id="result"
              name="result"
              rows={3}
              defaultValue={resultValue}
              placeholder="Latency reduced by 40%, 99.99% uptime, 10x throughput, etc."
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="keyFeatures"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Key Features & Deliverables (one bullet per line)
            </label>
            <textarea
              id="keyFeatures"
              name="keyFeatures"
              rows={4}
              defaultValue={keyFeaturesValue}
              placeholder="Real-time geo-location matching with WebSocket dispatch&#10;Optimistic cache invalidation for seamless offline edits&#10;Role-based access control protecting technician payouts"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="border-b border-[#22282B] pb-2 font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          Visibility & Display Order
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 pt-4">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={project?.featured ?? false}
              className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
            />
            <label
              htmlFor="featured"
              className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
            >
              Feature on Homepage
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={project?.published ?? true}
              className="h-4 w-4 rounded border-[#22282B] bg-[#0E1113] text-[#3FC7B0] accent-[#3FC7B0] focus:ring-[#3FC7B0]"
            />
            <label
              htmlFor="published"
              className="font-mono text-xs text-[#E7EAEA] cursor-pointer"
            >
              Published (Publicly Visible)
            </label>
          </div>

          <div>
            <label
              htmlFor="order"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Sort Order Index
            </label>
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={project?.order ?? 0}
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/projects"
          className="rounded-lg border border-[#22282B] px-5 py-2.5 text-center font-sans text-sm text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving Project..."
            : project
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}
