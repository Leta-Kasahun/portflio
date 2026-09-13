import { notFound } from "next/navigation";
import { getCertificateById } from "@/features/certificates/queries";
import { CertificateForm } from "@/features/certificates/components/certificate-form";

type EditCertificatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCertificatePage({
  params,
}: EditCertificatePageProps) {
  const { id } = await params;
  const certificate = await getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Certificate: {certificate.name}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update certification details, verification link, and badge asset.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <CertificateForm certificate={certificate} />
      </div>
    </div>
  );
}
