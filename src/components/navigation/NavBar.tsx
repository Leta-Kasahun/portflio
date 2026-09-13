"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg border px-3.5 py-1.5 font-sans text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(63,199,176,0.35)] active:translate-y-0 active:scale-[0.98] ${
              isActive
                ? "border-[#3FC7B0] bg-transparent text-white shadow-[0_0_12px_rgba(63,199,176,0.15)] hover:border-[#3FC7B0] hover:bg-[#3FC7B0] hover:text-[#0E1113]"
                : "border-[#22282B] bg-transparent text-white hover:border-[#3FC7B0] hover:bg-[#3FC7B0] hover:text-[#0E1113]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
