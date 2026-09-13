"use client";

import { useState } from "react";
import Image from "next/image";
import { Certificate } from "@/generated/prisma/client";
import { PdfViewerModal } from "@/components/ui/PdfViewer";

type CertificateCardProps = {
  certificate: Certificate;
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPdf = certificate.imageUrl?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-0.5">
        <div>
          {certificate.imageUrl && !isPdf ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-tl-[14px] sm:rounded-tl-[20px] rounded-br-[14px] sm:rounded-br-[20px] rounded-tr-none rounded-bl-none border border-[#22282B] bg-[#0E1113] mb-3.5 sm:mb-4">
              <Image
                src={certificate.imageUrl}
                alt={certificate.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                unoptimized
              />
            </div>
          ) : certificate.imageUrl && isPdf ? (
            <div className="flex items-center justify-between rounded-lg border border-[#22282B] bg-[#0E1113] p-3 mb-3.5 transition-colors hover:border-[#3FC7B0]/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#3FC7B0]/30 bg-[#3FC7B0]/10 text-[#3FC7B0]">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div>
                  <span className="block font-mono text-xs font-medium text-[#E7EAEA]">Official Certificate (PDF)</span>
                  <span className="block font-mono text-[10px] text-[#8A9295]">Verified Digital Document</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#3FC7B0] hover:underline shrink-0"
              >
                <span>Preview</span>
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </button>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-2 border-b border-[#22282B] pb-3 sm:pb-3.5">
            <span className="font-mono text-xs sm:text-sm font-semibold text-[#3FC7B0]">
              {certificate.issuer}
            </span>

            <span className="inline-flex items-center gap-1 rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2 py-0.5 font-mono text-[10px] xs:text-[11px] font-semibold text-[#3FC7B0] tracking-wider uppercase">
              <svg
                className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-[#3FC7B0] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verified</span>
            </span>
          </div>

          <h3 className="mt-3 text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#3FC7B0] transition-colors leading-snug">
            {certificate.name}
          </h3>

          {certificate.issueDate ? (
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10.5px] xs:text-xs text-[#E7EAEA]">
                Issued:{" "}
                {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          ) : null}

          {certificate.description ? (
            <p className="mt-3 font-mono text-xs sm:text-[13px] font-light leading-relaxed text-[#8A9295]">
              {certificate.description}
            </p>
          ) : null}
        </div>

        <div className="mt-5 border-t border-[#22282B] pt-3 sm:pt-3.5 flex flex-wrap items-center justify-between gap-2 w-full">
          <div className="flex flex-wrap items-center gap-3">
            {certificate.imageUrl ? (
              isPdf ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group/link inline-flex items-center gap-1 font-mono text-[10.5px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>View PDF</span>
                  <svg className="h-2.5 w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </button>
              ) : (
                <a
                  href={certificate.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1 font-mono text-[10.5px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
                >
                  <svg className="h-3.5 w-3.5 text-[#8A9295] transition-colors group-hover/link:text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>View Certificate</span>
                  <svg className="h-2.5 w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              )
            ) : null}

            {certificate.credentialUrl ? (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1 font-mono text-[10.5px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap"
              >
                <svg className="h-3.5 w-3.5 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Verify Credential</span>
                <svg className="h-2.5 w-2.5 text-[#8A9295] transition-transform duration-200 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ) : null}
          </div>

          <span className="font-mono text-[10px] text-[#8A9295]/60">
            ID: Authenticated
          </span>
        </div>
      </div>

      {isPdf && certificate.imageUrl ? (
        <PdfViewerModal
          url={certificate.imageUrl}
          title={certificate.name}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </>
  );
}
