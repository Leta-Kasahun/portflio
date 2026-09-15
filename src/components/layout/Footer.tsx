import { Container } from "@/components/layout/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#0E1113] pt-16 sm:pt-24 pb-8 sm:pb-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[280px] rounded-full bg-[#3FC7B0]/6 blur-[130px]" />

        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M -50 80 C 60 20 180 30 260 80 C 370 10 520 20 620 90 C 740 20 920 30 1030 100 C 1150 30 1320 50 1420 120 C 1480 100 1530 130 1560 160 L 1560 260 L -50 260 Z"
            fill="#12181B"
          />
          <path
            d="M -50 130 C 80 70 230 80 330 140 C 450 70 630 80 740 150 C 870 80 1060 90 1180 160 C 1300 100 1450 120 1540 180 L 1540 260 L -50 260 Z"
            fill="#151E22"
          />
          <path
            d="M -50 180 C 100 120 270 130 390 190 C 530 130 720 140 860 200 C 1020 140 1230 160 1370 210 C 1440 200 1500 210 1540 230 L 1540 260 L -50 260 Z"
            fill="#182328"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#8A9295]">
            &copy; {currentYear} Leta Kasahun. All rights reserved.
          </p>

          <a
            href="#"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
          >
            <span>Back to top</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">&uarr;</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
