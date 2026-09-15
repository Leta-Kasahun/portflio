"use client";

import React, { useMemo, useState } from "react";

export type ArchitectureNode = {
  id: string;
  layer: string;
  name: string;
  badge?: string;
  protocol?: string;
  role?: string;
  specifications?: string[];
};

type ProjectArchitectureFlowProps = {
  title: string;
  technologies: string[];
  category?: string | null;
  role?: string | null;
  architecturePattern?: string | null;
  architectureNodes?: ArchitectureNode[] | null;
};

export function ProjectArchitectureFlow({
  technologies,
  architecturePattern,
  architectureNodes,
}: ProjectArchitectureFlowProps) {
  const nodes: ArchitectureNode[] = useMemo(() => {
    if (architectureNodes && architectureNodes.length > 0) {
      return architectureNodes;
    }

    const fallback: ArchitectureNode[] = [];
    const techSet = new Set(technologies.map((t) => t.toLowerCase()));

    const clientTech = technologies.find((t) =>
      /react|next|vue|angular|html|tailwind|css|svelte/i.test(t)
    ) || technologies[0] || "Client Interface";

    fallback.push({
      id: "node-presentation",
      layer: "Presentation Layer",
      name: clientTech,
      badge: "Client View",
      protocol: "HTTPS / TLS",
      role: "Renders responsive interfaces, handles user input, and manages client-side application states.",
      specifications: ["Client-side hydration", "Responsive UI", "User interaction dispatch"],
    });

    const apiTech = technologies.find((t) =>
      /node|express|nest|fastapi|django|flask|spring|laravel|php|go|rust/i.test(t)
    ) || (technologies.length > 1 ? technologies[1] : "Application Controller");

    fallback.push({
      id: "node-controller",
      layer: "Controller & API Layer",
      name: apiTech,
      badge: "API Gateway",
      protocol: "REST / JSON API",
      role: "Processes incoming HTTP requests, enforces authentication, and coordinates domain logic execution.",
      specifications: ["Route guards", "Request validation", "Stateless session parsing"],
    });

    const dbTech = technologies.find((t) =>
      /postgres|mysql|mongo|redis|sqlite|supabase|prisma|firebase/i.test(t)
    ) || "Persistence Layer";

    fallback.push({
      id: "node-persistence",
      layer: "Data & Storage Layer",
      name: dbTech,
      badge: "Storage Engine",
      protocol: "Database Pool",
      role: "Stores persistent application data, manages transaction consistency, and optimizes query execution.",
      specifications: ["ACID compliance", "Index-optimized lookups", "Connection pooling"],
    });

    if (techSet.has("docker") || techSet.has("aws") || techSet.has("vercel") || techSet.has("github actions")) {
      fallback.push({
        id: "node-devops",
        layer: "Infra & Deployment",
        name: "Cloud Pipeline",
        badge: "DevOps & Edge",
        protocol: "CI/CD Pipeline",
        role: "Automates continuous integration, containerization, and distributed edge deployments.",
        specifications: ["Automated builds", "Zero-downtime deployment", "Edge caching"],
      });
    }

    return fallback;
  }, [technologies, architectureNodes]);

  const [selectedId, setSelectedId] = useState<string>(nodes[0]?.id || "");
  const selectedNode = nodes.find((n) => n.id === selectedId) || nodes[0];

  return (
    <div className="mt-4 rounded-xl border border-[#22282B] bg-[#0E1113]/80 p-4 sm:p-5 backdrop-blur-md">
      {architecturePattern ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22282B] pb-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3FC7B0]">
            {architecturePattern}
          </span>
          <span className="rounded-full border border-[#22282B] bg-[#171B1D] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#8A9295]">
            Click node to inspect
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-end border-b border-[#22282B] pb-2.5">
          <span className="rounded-full border border-[#22282B] bg-[#171B1D] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#8A9295]">
            Click node to inspect
          </span>
        </div>
      )}

      <div className="mt-4 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {nodes.map((node, index) => {
            const isSelected = node.id === (selectedNode?.id || nodes[0]?.id);
            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={`group relative flex flex-col items-start rounded-lg border px-3.5 py-2.5 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#3FC7B0] bg-[#171B1D] shadow-[0_0_15px_rgba(63,199,176,0.15)]"
                      : "border-[#22282B] bg-[#171B1D]/60 hover:border-[#3FC7B0]/50 hover:bg-[#171B1D]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${
                        isSelected ? "text-[#3FC7B0]" : "text-[#E7EAEA]/60"
                      }`}
                    >
                      {node.layer}
                    </span>
                    {node.badge ? (
                      <span className="rounded border border-[#22282B] bg-[#0E1113] px-1.5 py-0.2 font-mono text-[9px] text-[#E7EAEA]/70">
                        {node.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-1 font-mono text-xs font-bold text-[#E7EAEA]">
                    {node.name}
                  </span>
                  {node.protocol ? (
                    <span className="mt-0.5 font-mono text-[9px] text-[#3FC7B0]/80">
                      {node.protocol}
                    </span>
                  ) : null}
                </button>

                {index < nodes.length - 1 ? (
                  <div className="flex items-center px-1 text-[#3FC7B0]/40">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {selectedNode ? (
        <div className="mt-3 rounded-lg border border-[#22282B] bg-[#171B1D]/90 p-3.5 sm:p-4 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22282B] pb-2.5">
            <div>
              <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-[#3FC7B0]">
                {selectedNode.layer}
              </div>
              <div className="font-mono text-sm font-bold text-[#E7EAEA]">
                {selectedNode.name}
              </div>
            </div>
            {selectedNode.protocol ? (
              <span className="rounded-md border border-[#22282B] bg-[#0E1113] px-2 py-1 font-mono text-[10px] text-[#3FC7B0]">
                Protocol: {selectedNode.protocol}
              </span>
            ) : null}
          </div>

          {selectedNode.role ? (
            <p className="mt-2.5 font-mono text-xs leading-relaxed text-[#E7EAEA]/90">
              {selectedNode.role}
            </p>
          ) : null}

          {selectedNode.specifications && selectedNode.specifications.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {selectedNode.specifications.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10px] text-[#E7EAEA]"
                >
                  <svg
                    className="h-2.5 w-2.5 text-[#3FC7B0]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
