import Link from "next/link";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

const DASHBOARD_MODULES = [
  {
    href: "/admin/profile",
    title: "Profile & Bio",
    description: "Personal headline, bio, contact details, and resume link.",
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description: "STAR case studies, architecture, tech stack, and demos.",
  },
  {
    href: "/admin/experience",
    title: "Work Experience",
    description: "Engineering roles, achievements, timelines, and metrics.",
  },
  {
    href: "/admin/education",
    title: "Education",
    description: "Degrees, institutions, coursework, and milestones.",
  },
  {
    href: "/admin/skills",
    title: "Skills Matrix",
    description: "Categorized technical competencies, languages, and tools.",
  },
  {
    href: "/admin/certificates",
    title: "Certificates",
    description: "Industry credentials, verification links, and issuers.",
  },
  {
    href: "/admin/blog",
    title: "Blog Articles",
    description: "Technical writings, architectural breakdowns, and guides.",
  },
  {
    href: "/admin/social-links",
    title: "Social Links",
    description: "GitHub, LinkedIn, Twitter/X, and external profiles.",
  },
  {
    href: "/admin/messages",
    title: "Contact Messages",
    description: "Inbound messages and inquiries from visitors.",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Control Panel Overview
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Manage your portfolio content modules and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_MODULES.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="group rounded-xl border border-[#22282B] bg-[#171B1D] p-5 transition-all hover:border-[#3FC7B0]/60 hover:bg-[#1E2326]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-[#E7EAEA] group-hover:text-[#3FC7B0] transition-colors">
                {module.title}
              </h2>
              <span className="font-mono text-xs text-[#8A9295] group-hover:text-[#3FC7B0] transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </div>
            <p className="mt-2 text-xs text-[#8A9295] leading-relaxed">
              {module.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="pt-4">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
