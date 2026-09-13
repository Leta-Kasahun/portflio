import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 sm:gap-3 transition-colors shrink-0 ${className}`}
      aria-label="Leta Kasahun Home"
    >
      <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-none rounded-bl-none border border-[#22282B] bg-[#171B1D] p-1.5 transition-all duration-300 ease-out group-hover:border-[#3FC7B0] group-hover:shadow-[0_0_15px_rgba(63,199,176,0.25)] group-hover:scale-105">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3FC7B0" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>
          </defs>

          <path
            d="M 6 13 V 6 H 13"
            stroke="#3FC7B0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-opacity duration-300 group-hover:stroke-white"
          />
          <path
            d="M 30 23 V 30 H 23"
            stroke="#3FC7B0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-opacity duration-300 group-hover:stroke-white"
          />

          <path
            d="M 11 11 V 24 H 17"
            stroke="url(#logoGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 21 11 V 24"
            stroke="#E7EAEA"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-colors duration-300 group-hover:stroke-[#3FC7B0]"
          />
          <path
            d="M 27 12 L 21 17.5 L 27 24"
            stroke="url(#logoGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="21" cy="17.5" r="1.5" fill="#3FC7B0" />
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
