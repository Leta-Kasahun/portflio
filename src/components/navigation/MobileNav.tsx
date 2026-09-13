"use client";

import { useState } from "react";
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <Link
          href="/contact"
          className="rounded-lg border border-[#22282B] bg-transparent px-3.5 py-1.5 font-sans text-sm font-medium text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#3FC7B0] hover:bg-[#3FC7B0] hover:text-[#0E1113] hover:shadow-[0_0_20px_rgba(63,199,176,0.35)] active:translate-y-0"
        >
          Contact
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#22282B] bg-transparent text-[#8A9295] transition-all duration-300 hover:border-[#3FC7B0] hover:text-white"
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
          <nav className="flex flex-col space-y-2.5">
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
                  className={`rounded-lg px-4 py-2.5 font-sans text-sm font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? "border border-[#3FC7B0] bg-transparent text-white shadow-[0_0_12px_rgba(63,199,176,0.15)] hover:border-[#3FC7B0] hover:bg-[#3FC7B0] hover:text-[#0E1113]"
                      : "border border-[#22282B] bg-transparent text-white hover:border-[#3FC7B0] hover:bg-[#3FC7B0] hover:text-[#0E1113]"
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
