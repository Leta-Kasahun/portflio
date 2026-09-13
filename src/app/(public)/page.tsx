import { getProfile } from "@/features/profile/queries";
import { getAllSocialLinks } from "@/features/social-links/queries";
import { HeroSection } from "@/features/profile/components/HeroSection";

export const revalidate = 60;

export default async function HomePage() {
  const profile = await getProfile();
  const socialLinks = await getAllSocialLinks();

  return <HeroSection profile={profile} socialLinks={socialLinks} />;
}
