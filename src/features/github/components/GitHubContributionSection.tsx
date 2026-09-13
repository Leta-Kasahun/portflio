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
              <p className="mt-1.5 font-mono text-xs sm:text-sm font-light tracking-wide text-[#8A9295]">
                Real-time commit telemetry & code contribution cadence.
              </p>
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

        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <RevealOnScroll direction="up" delay={0} duration={800}>
            <div className="rounded-lg border border-[#22282B] bg-[#171B1D] p-3.5 sm:p-4 text-left shadow-lg h-full">
              <span className="block font-mono text-[10px] xs:text-[11px] font-medium uppercase tracking-wider text-[#8A9295]">
                Yearly Contributions
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white">
                  {stats.totalContributions.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-[#3FC7B0]">events</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={80} duration={800}>
            <div className="rounded-lg border border-[#22282B] bg-[#171B1D] p-3.5 sm:p-4 text-left shadow-lg h-full">
              <span className="block font-mono text-[10px] xs:text-[11px] font-medium uppercase tracking-wider text-[#8A9295]">
                Current Streak
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-[#3FC7B0]">
                  {stats.currentStreak}
                </span>
                <span className="font-mono text-[10px] text-[#8A9295]">days</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={160} duration={800}>
            <div className="rounded-lg border border-[#22282B] bg-[#171B1D] p-3.5 sm:p-4 text-left shadow-lg h-full">
              <span className="block font-mono text-[10px] xs:text-[11px] font-medium uppercase tracking-wider text-[#8A9295]">
                Longest Streak
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white">
                  {stats.longestStreak}
                </span>
                <span className="font-mono text-[10px] text-[#8A9295]">days</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={240} duration={800}>
            <div className="rounded-lg border border-[#22282B] bg-[#171B1D] p-3.5 sm:p-4 text-left shadow-lg h-full">
              <span className="block font-mono text-[10px] xs:text-[11px] font-medium uppercase tracking-wider text-[#8A9295]">
                Active Weeks
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white">
                  {stats.activeWeeks}
                </span>
                <span className="font-mono text-[10px] text-[#8A9295]">/ 52 wks</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll direction="up" delay={200} duration={900}>
          <div className="mt-6 sm:mt-8 rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#22282B] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#3FC7B0] animate-pulse" />
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
