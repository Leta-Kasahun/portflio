import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-colors ${className}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#22282B] bg-[#171B1D] p-2 transition-colors group-hover:border-[#3FC7B0]">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M16 2L28 8.5V23.5L16 30L4 23.5V8.5L16 2Z"
            stroke="#3FC7B0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors group-hover:stroke-white"
          />
          <path
            d="M16 16L28 8.5M16 16V30M16 16L4 8.5"
            stroke="#3FC7B0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.7"
          />
          <circle cx="16" cy="16" r="2.5" fill="#3FC7B0" />
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E7EAEA] transition-colors group-hover:text-[#3FC7B0]">
            Leta Kasahun
          </span>
          <span className="font-mono text-[10px] text-[#8A9295]">
            Software Engineer
          </span>
        </div>
      )}
    </Link>
  );
}
