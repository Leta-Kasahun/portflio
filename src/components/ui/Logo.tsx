import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 sm:gap-3 transition-all shrink-0 select-none ${className}`}
      aria-label="Leta Kasahun Portfolio Home"
    >
      <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-[#22282B] bg-[#171B1D] p-1 transition-colors duration-300 group-hover:border-[#3FC7B0]">
        <svg
          viewBox="0 0 60 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="lkFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="50%" stopColor="#3FC7B0" />
              <stop offset="100%" stopColor="#2FA995" />
            </linearGradient>

            <linearGradient id="lkDepthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B403A" />
              <stop offset="100%" stopColor="#0E1113" />
            </linearGradient>
          </defs>

          <g fill="url(#lkDepthGrad)" transform="translate(1.8, -1.2)">
            <path d="M 15 9 H 21 V 27 H 24 L 33 36 H 15 L 9 30 V 15 L 15 9 Z" />
            <path d="M 27 19 L 39 8 H 49 L 33 23 L 49 37 H 39 L 27 26 V 19 Z" />
          </g>

          <g>
            <path
              d="M 15 9 H 21 V 27 H 24 L 33 36 H 15 L 9 30 V 15 L 15 9 Z"
              fill="url(#lkFrontGrad)"
            />
            <path
              d="M 27 19 L 39 8 H 49 L 33 23 L 49 37 H 39 L 27 26 V 19 Z"
              fill="url(#lkFrontGrad)"
            />
          </g>

          <path
            d="M 9 15 L 15 9 H 21"
            stroke="#5EEAD4"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          <path
            d="M 39 8 H 49"
            stroke="#5EEAD4"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </svg>
      </div>

      {!compact && (
        <span className="font-mono text-xs sm:text-[13px] font-light tracking-[0.14em] uppercase text-[#E7EAEA] transition-colors duration-300 group-hover:text-white shrink-0 whitespace-nowrap">
          Leta <span className="text-[#3FC7B0] font-normal">Kasahun</span>
        </span>
      )}
    </Link>
  );
}
