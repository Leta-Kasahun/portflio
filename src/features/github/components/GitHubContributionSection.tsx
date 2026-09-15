"use client";

import { useState } from "react";
import { GitHubStats, ContributionDay } from "../types";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type GitHubContributionSectionProps = {
  stats: GitHubStats;
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["Mon", "Wed", "Fri"];

function chunkIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  for (let i = 0; i < days.length; i++) {
    currentWeek.push(days[i]);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return weeks;
}

function getLevelClass(level: 0 | 1 | 2 | 3 | 4) {
  switch (level) {
    case 1:
      return "bg-[#1B4A43] border border-[#226359]/40";
    case 2:
      return "bg-[#24786A] border border-[#2FA995]/50";
    case 3:
      return "bg-[#30A391] border border-[#3FC7B0]/60";
    case 4:
      return "bg-[#3FC7B0] border border-[#5EEAD4] shadow-[0_0_8px_rgba(63,199,176,0.5)]";
    default:
      return "bg-[#171B1D] border border-[#22282B]";
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GitHubContributionSection({
  stats,
}: GitHubContributionSectionProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const weeks = chunkIntoWeeks(stats.days);

  return (
    <section
      id="activity"
      className="relative bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <RevealOnScroll direction="up" duration={850}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="flex flex-col items-start text-left">
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#3FC7B0]">
                GitHub Activity
              </h2>
            </div>

            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 xs:gap-2 rounded-lg border border-[#22282B] bg-[#171B1D]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 font-mono text-[11px] xs:text-xs sm:text-[13px] font-light tracking-wider text-[#E7EAEA] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#3FC7B0]/60 hover:bg-[#3FC7B0]/10 hover:text-[#3FC7B0] hover:shadow-[0_0_15px_rgba(63,199,176,0.18)] active:translate-y-0 shrink-0 self-start sm:self-auto"
            >
              <span className="text-[#8A9295] transition-colors duration-300 group-hover:text-[#3FC7B0]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </span>
              <span>@{stats.username}</span>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                className="h-3 w-3 text-[#8A9295] transition-all duration-300 group-hover:text-[#3FC7B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </RevealOnScroll>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2.5 xs:gap-3 sm:gap-4">
          <RevealOnScroll direction="up" delay={0} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Contributions
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.totalContributions.toLocaleString()}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">events</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={60} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Pull Requests
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                    <line x1="6" y1="9" x2="6" y2="21" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.pullRequests.toLocaleString()}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">prs</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={120} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Repositories
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.contributedRepos.toLocaleString()}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">repos</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={180} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Current Streak
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.currentStreak}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">days</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={240} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Longest Streak
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.longestStreak}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">days</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={300} duration={800}>
            <div className="rounded-tl-[16px] sm:rounded-tl-[24px] rounded-br-[16px] sm:rounded-br-[24px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3 xs:p-3.5 sm:p-4 text-left shadow-xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1 group flex flex-col justify-between h-full min-w-0">
              <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A9295] truncate">
                  Stars Earned
                </span>
                <div className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-tl-[6px] xs:rounded-tl-[8px] rounded-br-[6px] xs:rounded-br-[8px] rounded-tr-none rounded-bl-none border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0] transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline gap-1 xs:gap-1.5 flex-wrap">
                <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  {stats.stars.toLocaleString()}
                </span>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#3FC7B0] font-medium">stars</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll direction="up" delay={200} duration={900}>
          <div className="mt-6 sm:mt-8 rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#22282B] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#E7EAEA] tracking-wide">
                Contribution Heatmap
              </span>
            </div>

            <div className="font-mono text-[11px] text-[#8A9295] min-h-[16px]">
              {hoveredDay ? (
                <span>
                  <strong className="text-white font-medium">
                    {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"}
                  </strong>{" "}
                  on {formatDate(hoveredDay.date)}
                </span>
              ) : (
                <span>Hover over any tile for activity details</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="inline-block min-w-max">
              <div className="flex gap-[3px] sm:gap-[4px]">
                <div className="flex flex-col justify-between pr-2 font-mono text-[9px] text-[#8A9295] select-none h-[88px] sm:h-[108px] py-[2px]">
                  <span>{DAY_LABELS[0]}</span>
                  <span>{DAY_LABELS[1]}</span>
                  <span>{DAY_LABELS[2]}</span>
                </div>

                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px] sm:gap-[4px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[2px] transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getLevelClass(
                          day.level
                        )}`}
                        title={`${day.count} contributions on ${day.date}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#22282B]/60 text-[10px] font-mono text-[#8A9295]">
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#171B1D] border border-[#22282B]" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#1B4A43] border border-[#226359]/40" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#24786A] border border-[#2FA995]/50" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#30A391] border border-[#3FC7B0]/60" />
                  <div className="h-2.5 w-2.5 rounded-[2px] bg-[#3FC7B0] border border-[#5EEAD4]" />
                  <span>More</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Activity timezone: UTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);
}
