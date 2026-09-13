import { Container } from "@/components/layout/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#22282B] bg-[#0E1113] py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#3FC7B0]" />
            <span className="font-mono text-xs text-[#8A9295]">
              Distributed Systems &amp; Full-Stack Engineering
            </span>
          </div>

          <div>
            <a
              href="#"
              className="font-mono text-xs text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
            >
              Back to top &uarr;
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#22282B]/60 pt-6 text-center sm:text-left">
          <p className="font-mono text-[11px] text-[#8A9295]/70">
            &copy; {currentYear} Leta Kasahun. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
