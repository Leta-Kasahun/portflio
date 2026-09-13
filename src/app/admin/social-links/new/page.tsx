import { SocialLinkForm } from "@/features/social-links/components/social-link-form";

export default function NewSocialLinkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Add Social Link
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Add a platform name, profile URL, and display priority.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <SocialLinkForm />
      </div>
    </div>
  );
}
