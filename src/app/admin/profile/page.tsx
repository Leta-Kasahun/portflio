import { getProfile } from "@/features/profile/queries";
import { ProfileForm } from "@/features/profile/components/profile-form";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Profile Management
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Manage your personal biography, headline, contact details, and resume link.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <ProfileForm key={profile.id + "_" + (profile.updatedAt?.toISOString() || "")} profile={profile} />
      </div>
    </div>
  );
}
