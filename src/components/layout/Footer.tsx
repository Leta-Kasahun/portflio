import { Container } from "@/components/layout/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#22282B] bg-[#0E1113] py-8 sm:py-10">
      <Container>
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
