"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Certificate } from "@/generated/prisma/client";
import { PdfViewerModal, PdfThumbnail } from "@/components/ui/PdfViewer";

type CertificateCardProps = {
  certificate: Certificate;
};

type CertificateImageModalProps = {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

function CertificateImageModal({
  url,
  title,
  isOpen,
  onClose,
}: CertificateImageModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 xs:p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative flex flex-col w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] shadow-2xl z-10">
        <div className="flex items-center justify-between border-b border-[#22282B] bg-[#0E1113] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#3FC7B0]" />
            <h3 className="font-mono text-xs sm:text-sm font-medium text-[#E7EAEA] truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-xs text-[#E7EAEA] hover:border-[#3FC7B0] hover:text-[#3FC7B0] transition-colors"
            >
              <span>Full Size</span>
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded border border-[#22282B] bg-[#171B1D] text-[#8A9295] hover:border-[#3FC7B0] hover:text-[#3FC7B0] transition-colors"
              aria-label="Close"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex-1 overflow-auto bg-[#0A0D0E] p-3 sm:p-6 flex items-center justify-center min-h-[50vh]">
          <div className="relative max-h-[75vh] w-full flex items-center justify-center">
            <Image
              src={url}
              alt={title}
              width={1600}
              height={1000}
              className="max-h-[75vh] w-auto max-w-full rounded border border-[#22282B] object-contain shadow-2xl"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPdf = certificate.imageUrl?.toLowerCase().endsWith(".pdf");
  const hasImage = Boolean(certificate.imageUrl && !isPdf);
  const hasPdf = Boolean(certificate.imageUrl && isPdf);

  return (
    <>
      <div className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-3.5 xs:p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-0.5">
        <div>
          <div
            onClick={() => {
              if (certificate.imageUrl) {
                setIsModalOpen(true);
              }
            }}
            className={`group/preview relative aspect-[16/9] w-full overflow-hidden rounded-tl-[14px] sm:rounded-tl-[20px] rounded-br-[14px] sm:rounded-br-[20px] rounded-tr-none rounded-bl-none border border-[#22282B] bg-[#0E1113] mb-3.5 sm:mb-4 ${
              certificate.imageUrl ? "cursor-pointer" : ""
            }`}
          >
            {hasImage ? (
              <>
                <Image
                  src={certificate.imageUrl!}
                  alt={certificate.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover/preview:scale-105"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1113]/90 via-[#0E1113]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 flex items-center justify-center p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3FC7B0] bg-[#171B1D]/95 px-3.5 py-1.5 font-mono text-xs font-medium text-[#3FC7B0] shadow-xl backdrop-blur-sm">
                    <span>View Certificate</span>
                    <svg
                      className="h-3 w-3 text-[#3FC7B0] transition-transform duration-300 group-hover/preview:translate-x-1 group-hover/preview:-translate-y-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </>
            ) : hasPdf ? (
              <div className="relative h-full w-full overflow-hidden bg-[#0A0D0E] transition-transform duration-500 group-hover/preview:scale-[1.02]">
                <PdfThumbnail
                  url={certificate.imageUrl!}
                  title={certificate.name}
                  className="w-full h-full"
                />

                <div className="absolute inset-0 bg-[#0E1113]/70 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 flex items-center justify-center z-20 p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3FC7B0] bg-[#171B1D]/95 px-4 py-2 font-mono text-xs font-medium text-[#3FC7B0] shadow-2xl">
                    <span>View PDF</span>
                    <svg
                      className="h-3.5 w-3.5 text-[#3FC7B0] transition-transform duration-300 group-hover/preview:translate-x-1 group-hover/preview:-translate-y-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full bg-gradient-to-br from-[#171B1D] via-[#0E1113] to-[#0A0D0E] p-4 flex flex-col justify-between">
                <div className="absolute inset-2 rounded-tl-[10px] sm:rounded-tl-[16px] rounded-br-[10px] sm:rounded-br-[16px] border border-[#22282B] pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] xs:text-[11px] font-semibold text-[#3FC7B0] uppercase tracking-wider truncate">
                    {certificate.issuer}
                  </span>
                  <span className="inline-flex items-center gap-1 shrink-0 rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[9px] xs:text-[10px] text-[#8A9295] uppercase">
                    Verified
                  </span>
                </div>

                <div className="relative z-10 my-auto text-center px-2 sm:px-4">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#22282B] bg-[#0E1113] text-[#3FC7B0]">
                    <svg
                      className="h-4.5 w-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="font-sans text-xs xs:text-sm sm:text-base font-semibold text-white tracking-tight line-clamp-2 leading-snug">
                    {certificate.name}
                  </h4>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8A9295]">
                  <span>Accreditation</span>
                  <span>Authentication Active</span>
                </div>
              </div>
            )}
          </div>

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
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group/link inline-flex items-center gap-1 font-mono text-[10.5px] xs:text-xs font-medium text-[#E7EAEA] transition-colors hover:text-[#3FC7B0] shrink-0 whitespace-nowrap cursor-pointer"
              >
                {isPdf ? (
                  <svg className="h-3.5 w-3.5 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
                <span>{isPdf ? "View PDF" : "View Certificate"}</span>
                <svg
                  className="h-2.5 w-2.5 text-[#8A9295] transition-transform duration-300 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 shrink-0"
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
                <svg
                  className="h-2.5 w-2.5 text-[#8A9295] transition-transform duration-300 group-hover/link:text-[#3FC7B0] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
      ) : certificate.imageUrl ? (
        <CertificateImageModal
          url={certificate.imageUrl}
          title={certificate.name}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </>
  );
}
