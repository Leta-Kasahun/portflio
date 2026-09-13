"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/certificates", label: "Certificates" },
  { href: "/blog", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`font-mono text-xs sm:text-[13px] font-light tracking-wider transition-colors duration-300 ease-out hover:text-[#3FC7B0] ${
              isActive
                ? "text-[#3FC7B0]"
                : "text-[#E7EAEA]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
