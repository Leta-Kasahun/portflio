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
  { href: "/blog", label: "Blogs" },
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

      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-command-palette"));
          }
        }}
        className="flex items-center gap-1.5 rounded-md border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-[11px] text-[#8A9295] transition-all duration-200 hover:border-[#3FC7B0]/60 hover:text-white"
        aria-label="Open command palette"
      >
        <svg
          className="h-3 w-3 text-[#3FC7B0]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hidden xl:inline">Search</span>
        <kbd className="rounded border border-[#22282B] bg-[#0E1113] px-1 py-0.5 text-[9px] text-[#8A9295]">
          ⌘K
        </kbd>
      </button>
    </nav>
  );
}
