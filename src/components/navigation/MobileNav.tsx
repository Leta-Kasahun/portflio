"use client";

import { useState } from "react";
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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden shrink-0">
      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 shrink-0">
        <Link
          href="/contact"
          className="hidden xs:inline-flex items-center justify-center rounded-lg border border-[#22282B] bg-[#171B1D]/50 px-3 py-1.5 font-mono text-xs font-light tracking-wider text-[#E7EAEA] transition-all duration-300 hover:border-[#3FC7B0] hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
        >
          Contact
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#22282B] bg-[#171B1D]/60 text-[#8A9295] transition-all duration-300 hover:border-[#3FC7B0]/60 hover:text-[#3FC7B0] active:scale-95"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
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
        <div className="fixed inset-x-0 top-16 z-50 border-b border-[#22282B] bg-[#0E1113]/98 backdrop-blur-xl px-5 py-5 shadow-2xl">
          <nav className="flex flex-col space-y-1.5">
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
                  className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 font-mono text-xs sm:text-[13px] font-light tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#171B1D] text-[#3FC7B0] border border-[#3FC7B0]/30"
                      : "text-[#E7EAEA] hover:bg-[#171B1D]/60 hover:text-[#3FC7B0]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
