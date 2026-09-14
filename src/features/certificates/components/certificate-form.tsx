"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Certificate } from "@/generated/prisma/client";
import {
  createCertificateAction,
  updateCertificateAction,
  CertificateActionResult,
} from "../mutations";

type CertificateFormProps = {
  certificate?: Certificate | null;
};

export function CertificateForm({ certificate }: CertificateFormProps) {
  const boundAction = certificate
    ? updateCertificateAction.bind(null, certificate.id)
    : createCertificateAction;

  const [state, formAction, isPending] = useActionState<
    CertificateActionResult | null,
    FormData
  >(boundAction, null);

  const formatDateInput = (date?: Date | null) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      {state?.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Certificate Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={certificate?.name || ""}
            placeholder="e.g. AWS Certified Solutions Architect"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="issuer"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Issuing Authority / Organization
          </label>
          <input
            id="issuer"
            name="issuer"
            type="text"
            required
            defaultValue={certificate?.issuer || ""}
            placeholder="e.g. Amazon Web Services, CNCF, Google Cloud"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="issueDate"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Issue Date
          </label>
          <input
            id="issueDate"
            name="issueDate"
            type="date"
            defaultValue={formatDateInput(certificate?.issueDate)}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="credentialUrl"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Credential Verification URL
          </label>
          <input
            id="credentialUrl"
            name="credentialUrl"
            type="url"
            defaultValue={certificate?.credentialUrl || ""}
            placeholder="https://www.credly.com/badges/..."
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="imageFile"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Certificate Document (Image or PDF)
          </label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*,application/pdf"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-xs text-[#8A9295] file:mr-3 file:rounded-md file:border-0 file:bg-[#22282B] file:px-2.5 file:py-1 file:font-mono file:text-xs file:text-[#E7EAEA] file:cursor-pointer hover:file:bg-[#3FC7B0] hover:file:text-[#0E1113]"
          />
          {certificate?.imageUrl && (
            <p className="mt-1.5 font-mono text-xs text-[#8A9295]">
              Current:{" "}
              <a
                href={certificate.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3FC7B0] underline"
              >
                {certificate.imageUrl.toLowerCase().endsWith(".pdf")
                  ? "View Current PDF Document"
                  : "View Current Certificate Image"}
              </a>
            </p>
          )}
          <input
            type="hidden"
            name="imageUrl"
            defaultValue={certificate?.imageUrl || ""}
          />
        </div>

        <div>
          <label
            htmlFor="order"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Sort Order Index (0 = highest priority)
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={certificate?.order ?? 0}
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-mono text-xs font-medium text-[#8A9295]"
        >
          Description / Core Competencies Covered
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={certificate?.description || ""}
          placeholder="Covers high availability architectures, security postures, multi-region deployments, and cost optimization."
          className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
        <Link
          href="/admin/certificates"
          className="rounded-lg border border-[#22282B] px-5 py-2.5 text-center font-sans text-sm text-[#8A9295] transition-colors hover:border-[#3FC7B0] hover:text-[#E7EAEA]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3FC7B0] px-6 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : certificate
            ? "Update Certificate"
            : "Create Certificate"}
        </button>
      </div>
    </form>
  );
}
