"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Articles" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="rounded-lg border border-[#22282B] bg-[#171B1D] px-3 py-1.5 font-mono text-xs text-[#8A9295] transition-all hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Contact
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#22282B] bg-[#171B1D] text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-[#22282B] bg-[#0E1113]/95 px-6 py-5 shadow-2xl backdrop-blur-xl">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-[#171B1D] font-medium text-[#3FC7B0]"
                      : "text-[#8A9295] hover:bg-[#171B1D] hover:text-[#E7EAEA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
