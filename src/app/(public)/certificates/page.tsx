import { Metadata } from "next";
import { getAllCertificates } from "@/features/certificates/queries";
import { CertificateCard } from "@/features/certificates/components/CertificateCard";
import { Container } from "@/components/layout/Container";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificates | Leta Kasahun",
  description: "Professional certifications and credentials of Leta Kasahun",
};

export default async function CertificatesPage() {
  const certificates = await getAllCertificates();

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="flex flex-col items-start text-left">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#3FC7B0]">
            Licenses & Certifications
          </h1>
          <p className="mt-2.5 max-w-2xl font-mono text-xs sm:text-sm font-light leading-relaxed tracking-wide text-[#8A9295]">
            Verified industry credentials, cloud architecture specializations, and professional engineering licenses.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </Container>
    </div>
  );
}
