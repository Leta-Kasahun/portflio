"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Articles" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative font-mono text-xs transition-colors ${
              isActive
                ? "font-medium text-[#3FC7B0]"
                : "text-[#8A9295] hover:text-[#E7EAEA]"
            }`}
          >
            <span>{item.label}</span>
            {isActive ? (
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-[#3FC7B0]" />
            ) : (
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#3FC7B0] transition-all duration-200 group-hover:w-full" />
            )}
          </Link>
        );
      })}

      <Link
        href="/contact"
        className="rounded-lg border border-[#22282B] bg-[#171B1D] px-3.5 py-1.5 font-mono text-xs text-[#8A9295] transition-all hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
      >
        Contact
      </Link>
    </nav>
  );
}
