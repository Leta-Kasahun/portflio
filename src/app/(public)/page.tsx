import { getProfile } from "@/features/profile/queries";
import { getAllSocialLinks } from "@/features/social-links/queries";
import { getAllEducations } from "@/features/education/queries";
import { getFeaturedProjects } from "@/features/projects/queries";
import { getSkillsGroupedByCategory } from "@/features/skills/queries";
import { getAllExperiences } from "@/features/experience/queries";
import { getAllCertificates } from "@/features/certificates/queries";
import { HeroSection } from "@/features/profile/components/HeroSection";
import { AboutSection } from "@/features/profile/components/AboutSection";
import { FeaturedProjectsSection } from "@/features/projects/components/FeaturedProjectsSection";
import { SkillsSection } from "@/features/skills/components/SkillsSection";
import { ExperienceSection } from "@/features/experience/components/ExperienceSection";
import { CertificatesSection } from "@/features/certificates/components/CertificatesSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const profile = await getProfile();
  const socialLinks = await getAllSocialLinks();
  const educations = await getAllEducations();
  const featuredProjects = await getFeaturedProjects();
  const skillsGrouped = await getSkillsGroupedByCategory();
  const experiences = await getAllExperiences();
  const certificates = await getAllCertificates();

  return (
    <div className="flex flex-col">
      <HeroSection profile={profile} socialLinks={socialLinks} />
      <AboutSection profile={profile} educations={educations} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <SkillsSection skillsGrouped={skillsGrouped} />
      <ExperienceSection experiences={experiences} />
      <CertificatesSection certificates={certificates} />
    </div>
  );
}
