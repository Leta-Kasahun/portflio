"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/generated/prisma/client";
import { BlogCard } from "./BlogCard";

type BlogListProps = {
  posts: BlogPost[];
};

export function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTag && matchesQuery;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#22282B] pb-6">
        <div className="flex flex-wrap gap-1.5 xs:gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border border-[#3FC7B0] bg-[#3FC7B0]/15 text-[#3FC7B0] shadow-[0_0_12px_rgba(63,199,176,0.2)]"
                    : "border border-[#22282B] bg-[#171B1D] text-[#8A9295] hover:border-[#3FC7B0]/40 hover:text-white"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] pl-9 pr-3.5 py-2 font-mono text-xs text-white placeholder:text-[#8A9295]/50 transition-colors focus:border-[#3FC7B0] focus:outline-none focus:ring-1 focus:ring-[#3FC7B0]/30"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-[#8A9295]"
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
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-[#22282B] bg-[#171B1D] p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] mb-3">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 className="font-mono text-sm font-semibold text-white">No blogs match your criteria</h3>
          <p className="mt-1 font-mono text-xs text-[#8A9295]">
            Try adjusting your search query or selected category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag("All");
              setSearchQuery("");
            }}
            className="mt-4 rounded-lg border border-[#3FC7B0] bg-[#3FC7B0]/10 px-4 py-2 font-mono text-xs font-semibold text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0] hover:text-[#0E1113] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
