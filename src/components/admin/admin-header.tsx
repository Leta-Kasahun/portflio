"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/social-links", label: "Socials" },
  { href: "/admin/messages", label: "Messages" },
];

type AdminHeaderProps = {
  adminEmail: string;
};

export function AdminHeader({ adminEmail }: AdminHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#22282B] bg-[#171B1D]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#3FC7B0]" />
            <span className="font-mono text-sm font-medium tracking-wider uppercase text-[#E7EAEA]">
              Panel
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-[#8A9295] sm:inline-block">
            {adminEmail}
          </span>
          <Link
            href="/"
            target="_blank"
            className="rounded-lg border border-[#22282B] px-3 py-1.5 font-mono text-xs text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
          >
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg bg-[#22282B] px-3 py-1.5 font-mono text-xs text-[#E7EAEA] transition-colors hover:bg-red-500/20 hover:text-red-400"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <nav className="flex overflow-x-auto border-t border-[#22282B]/60 px-4 sm:px-6">
        <div className="flex space-x-1 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  isActive
                    ? "bg-[#3FC7B0]/10 text-[#3FC7B0] font-medium"
                    : "text-[#8A9295] hover:bg-[#22282B]/50 hover:text-[#E7EAEA]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
