"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

type CommandPaletteProject = {
  id: string;
  title: string;
  slug: string;
  technologies: string[];
};

type CommandPaletteSocial = {
  platform: string;
  url: string;
};

type CommandPaletteProps = {
  projects?: CommandPaletteProject[];
  email?: string | null;
  resumeUrl?: string | null;
  socialLinks?: CommandPaletteSocial[];
};

type CommandItem = {
  id: string;
  category: "Navigation" | "Projects" | "Quick Actions";
  label: string;
  detail?: string;
  shortcut?: string;
  action: () => void;
  iconType: "nav" | "project" | "copy" | "download" | "external";
};

export function CommandPalette({
  projects = [],
  email = "letakasahun2@gmail.com",
  resumeUrl = "/resumes/1789312486309_myresumefinal.pdf_3_.pdf",
  socialLinks = [],
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    }

    function handleCustomOpen() {
      openPalette();
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, closePalette, openPalette]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const allItems = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-home",
        category: "Navigation",
        label: "Home",
        detail: "Hero, about & overview",
        action: () => {
          router.push("/");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-about",
        category: "Navigation",
        label: "About Me",
        detail: "Background, bio & journey",
        action: () => {
          router.push("/about");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-projects",
        category: "Navigation",
        label: "Projects",
        detail: "Full-stack & distributed works",
        action: () => {
          router.push("/projects");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-skills",
        category: "Navigation",
        label: "Technical Skills",
        detail: "Architecture, frameworks & databases",
        action: () => {
          router.push("/skills");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-experience",
        category: "Navigation",
        label: "Experience",
        detail: "Career history & milestones",
        action: () => {
          router.push("/experience");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-certificates",
        category: "Navigation",
        label: "Certificates",
        detail: "Accreditations & verified licenses",
        action: () => {
          router.push("/certificates");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-blog",
        category: "Navigation",
        label: "Engineering Blogs",
        detail: "Architecture write-ups & lessons",
        action: () => {
          router.push("/blog");
          closePalette();
        },
        iconType: "nav",
      },
      {
        id: "nav-contact",
        category: "Navigation",
        label: "Contact",
        detail: "Direct message & inquiries",
        action: () => {
          router.push("/contact");
          closePalette();
        },
        iconType: "nav",
      },
    ];

    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      category: "Projects",
      label: p.title,
      detail: p.technologies.slice(0, 3).join(", "),
      action: () => {
        router.push(`/projects/${p.slug}`);
        closePalette();
      },
      iconType: "project",
    }));

    const resolvedEmail = email || "letakasahun2@gmail.com";
    const resolvedResume = resumeUrl || "/resumes/1789312486309_myresumefinal.pdf_3_.pdf";

    const githubLink = socialLinks.find((s) => s.platform.toLowerCase().includes("github"))?.url || "https://github.com/Leta-Kasahun";
    const linkedInLink = socialLinks.find((s) => s.platform.toLowerCase().includes("linkedin"))?.url || "https://linkedin.com/in/lkasahun";

    const actionItems: CommandItem[] = [
      {
        id: "act-copy-email",
        category: "Quick Actions",
        label: "Copy Email Address",
        detail: resolvedEmail,
        shortcut: "Copy",
        action: () => {
          navigator.clipboard.writeText(resolvedEmail);
          showToast(`Copied ${resolvedEmail} to clipboard`);
          closePalette();
        },
        iconType: "copy",
      },
      {
        id: "act-download-resume",
        category: "Quick Actions",
        label: "Download Resume",
        detail: "PDF curriculum vitae",
        shortcut: "PDF",
        action: () => {
          window.open(resolvedResume, "_blank");
          closePalette();
        },
        iconType: "download",
      },
      {
        id: "act-github",
        category: "Quick Actions",
        label: "GitHub Profile",
        detail: "Open repositories & contributions",
        shortcut: "↗",
        action: () => {
          window.open(githubLink, "_blank");
          closePalette();
        },
        iconType: "external",
      },
      {
        id: "act-linkedin",
        category: "Quick Actions",
        label: "LinkedIn Profile",
        detail: "Connect professionally",
        shortcut: "↗",
        action: () => {
          window.open(linkedInLink, "_blank");
          closePalette();
        },
        iconType: "external",
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [projects, email, resumeUrl, socialLinks, router, closePalette, showToast]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;

    return allItems.filter((item) => {
      const matchLabel = item.label.toLowerCase().includes(q);
      const matchDetail = item.detail ? item.detail.toLowerCase().includes(q) : false;
      const matchCategory = item.category.toLowerCase().includes(q);
      return matchLabel || matchDetail || matchCategory;
    });
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleItemClick = (index: number) => {
    const item = filteredItems[index];
    if (item) {
      item.action();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleItemClick(selectedIndex);
    }
  };

  const renderIcon = (type: CommandItem["iconType"]) => {
    switch (type) {
      case "nav":
        return (
          <svg className="h-4 w-4 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        );
      case "project":
        return (
          <svg className="h-4 w-4 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        );
      case "copy":
        return (
          <svg className="h-4 w-4 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        );
      case "download":
        return (
          <svg className="h-4 w-4 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case "external":
        return (
          <svg className="h-4 w-4 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        );
    }
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-tl-[12px] rounded-br-[12px] rounded-tr-none rounded-bl-none border-2 border-[#3FC7B0] bg-[#171B1D] px-4 py-2.5 font-mono text-xs text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3FC7B0]/20 text-[#3FC7B0]">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-16 sm:px-4 sm:pt-24 bg-[#0E1113]/55 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={closePalette} aria-hidden="true" />

          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-tl-[20px] sm:rounded-tl-[28px] rounded-br-[20px] sm:rounded-br-[28px] rounded-tr-none rounded-bl-none border-2 border-[#22282B]/80 bg-[#171B1D]/85 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_25px_rgba(63,199,176,0.06)]">
            <div className="flex items-center gap-2.5 border-b border-[#22282B]/70 px-4 py-3 bg-[#0E1113]/60 backdrop-blur-md">
              <svg className="h-4 w-4 shrink-0 text-[#3FC7B0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search projects, pages, or actions..."
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-white placeholder-[#8A9295] outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded p-1 text-[#8A9295] hover:text-white transition-colors"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={closePalette}
                aria-label="Close command palette"
                className="flex sm:hidden shrink-0 items-center justify-center rounded-md border border-[#22282B] bg-[#171B1D] px-2 py-1 font-mono text-[10px] text-[#8A9295] hover:text-white hover:border-[#3FC7B0] transition-colors"
              >
                ✕ Close
              </button>
              <kbd
                onClick={closePalette}
                className="hidden sm:inline-flex cursor-pointer rounded border border-[#22282B] bg-[#171B1D] px-1.5 py-0.5 font-mono text-[10px] text-[#8A9295] hover:text-white hover:border-[#3FC7B0] transition-colors"
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 [scrollbar-width:thin] [scrollbar-color:#22282B_transparent]">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-[#8A9295]">
                  No matching commands or projects found.
                </div>
              ) : (
                <ul className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const isFirstInCategory = idx === 0 || filteredItems[idx - 1].category !== item.category;

                    return (
                      <li key={item.id}>
                        {isFirstInCategory && (
                          <div className="px-3 pt-2 pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#3FC7B0]">
                            {item.category}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleItemClick(idx)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-all duration-150 rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none ${
                            isSelected
                              ? "bg-[#3FC7B0]/10 border-l-2 border-[#3FC7B0] text-white"
                              : "border-l-2 border-transparent text-[#E7EAEA] hover:bg-[#22282B]/40"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0">{renderIcon(item.iconType)}</span>
                            <div className="min-w-0">
                              <span className="block truncate font-mono text-xs sm:text-sm font-medium">
                                {item.label}
                              </span>
                              {item.detail && (
                                <span className="block truncate font-mono text-[10px] text-[#8A9295]">
                                  {item.detail}
                                </span>
                              )}
                            </div>
                          </div>

                          {item.shortcut && (
                            <span className="shrink-0 rounded border border-[#22282B] bg-[#0E1113] px-1.5 py-0.5 font-mono text-[9px] text-[#8A9295]">
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#22282B]/70 bg-[#0E1113]/60 px-4 py-2 font-mono text-[10px] text-[#8A9295] backdrop-blur-md">
              <div className="hidden sm:flex items-center gap-3">
                <span>
                  <strong className="text-[#E7EAEA]">↑↓</strong> Navigate
                </span>
                <span>
                  <strong className="text-[#E7EAEA]">↵</strong> Select
                </span>
              </div>
              <div className="sm:hidden text-[10px] text-[#8A9295]">
                Tap item to select
              </div>
              <div className="hidden sm:block">
                <button
                  type="button"
                  onClick={closePalette}
                  className="cursor-pointer text-[#8A9295] hover:text-white transition-colors"
                >
                  <strong className="text-[#E7EAEA]">Esc</strong> to exit
                </button>
              </div>
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={closePalette}
                  className="rounded border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-[10px] font-medium text-[#3FC7B0] active:scale-95 transition-transform"
                >
                  Done ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
