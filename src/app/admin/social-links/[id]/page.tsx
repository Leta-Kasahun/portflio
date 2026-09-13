import { notFound } from "next/navigation";
import { getSocialLinkById } from "@/features/social-links/queries";
import { SocialLinkForm } from "@/features/social-links/components/social-link-form";

type EditSocialLinkPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSocialLinkPage({
  params,
}: EditSocialLinkPageProps) {
  const { id } = await params;
  const link = await getSocialLinkById(id);

  if (!link) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Social Link: {link.platform}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update platform URL or display priority.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <SocialLinkForm socialLink={link} />
      </div>
    </div>
  );
}
