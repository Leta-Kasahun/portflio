import Link from "next/link";
import { getAllCertificates } from "@/features/certificates/queries";
import { DeleteCertificateButton } from "@/features/certificates/components/delete-certificate-button";

export default async function AdminCertificatesPage() {
  const certificates = await getAllCertificates();

  const formatDateDisplay = (date?: Date | null) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Certificates & Credentials
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage industry certifications, issuing bodies, and verification links.
          </p>
        </div>
        <div>
          <Link
            href="/admin/certificates/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Certificate
          </Link>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No certificates added yet.
          </p>
          <Link
            href="/admin/certificates/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Add your first certificate &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-medium text-[#E7EAEA]">
                    {cert.name}
                  </span>
                  <span className="font-mono text-xs text-[#3FC7B0]">
                    @{cert.issuer}
                  </span>
                </div>

                {cert.issueDate && (
                  <p className="font-mono text-xs text-[#8A9295]">
                    Issued: {formatDateDisplay(cert.issueDate)}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-xs text-[#8A9295] hover:text-[#3FC7B0] underline"
                  >
                    Verify Credential &rarr;
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="mr-2 font-mono text-xs text-[#8A9295]">
                  #{cert.order}
                </span>
                <Link
                  href={`/admin/certificates/${cert.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteCertificateButton
                  certificateId={cert.id}
                  certificateName={cert.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
