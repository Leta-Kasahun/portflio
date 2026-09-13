import Link from "next/link";
import { Certificate } from "@/generated/prisma/client";
import { CertificateCard } from "./CertificateCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type CertificatesSectionProps = {
  certificates: Certificate[];
};

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section
      id="certificates"
      className="relative bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <RevealOnScroll direction="up" duration={850}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="flex flex-col items-start text-left">
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#3FC7B0]">
                Licenses & Certifications
              </h2>
            </div>

            <Link
              href="/certificates"
              className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-light tracking-wider text-[#E7EAEA] transition-colors hover:text-[#3FC7B0]"
            >
              <span>View All Credentials</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {certificates.slice(0, 4).map((cert, certIdx) => (
            <RevealOnScroll
              key={cert.id}
              direction="up"
              delay={certIdx * 120}
              duration={850}
              className="h-full"
            >
              <CertificateCard certificate={cert} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
