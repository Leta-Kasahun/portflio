import { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/features/profile/queries";
import { Container } from "@/components/layout/Container";
import { PdfViewer } from "@/components/ui/PdfViewer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume & Curriculum Vitae | Leta Kasahun",
  description: "Senior Full-Stack & Distributed Systems Engineer Resume of Leta Kasahun with interactive PDF viewer, zoom controls, and download options.",
};

export default async function ResumePage() {
  const profile = await getProfile();
  const resumeUrl =
    profile.resumeUrl || "/resumes/1789312486309_myresumefinal.pdf_3_.pdf";

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-light tracking-wider text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              <span>Back to Home</span>
            </Link>

            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#22282B] bg-[#171B1D] px-3.5 py-1.5 font-mono text-xs font-medium text-[#E7EAEA] transition-all hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            >
              <svg
                className="h-3.5 w-3.5 text-[#3FC7B0]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Direct PDF</span>
            </a>
          </div>

          <div className="flex flex-col items-start text-left mb-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3FC7B0]">
              Curriculum Vitae
            </h1>
            <p className="mt-2.5 max-w-2xl font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#8A9295]">
              Interactive document reader with zoom in, zoom out, fit view, and high-fidelity page rendering.
            </p>
          </div>

          <PdfViewer url={resumeUrl} title="Leta_Kasahun_Resume.pdf" />
        </div>
      </Container>
    </div>
  );
}
