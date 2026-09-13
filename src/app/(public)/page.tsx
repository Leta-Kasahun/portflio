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
import { ContactSection } from "@/features/contact/components/ContactSection";
import { GitHubContributionSection } from "@/features/github/components/GitHubContributionSection";
import { getGitHubStats } from "@/features/github/queries";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const revalidate = 60;

export default async function HomePage() {
  const profile = await getProfile();
  const socialLinks = await getAllSocialLinks();
  const educations = await getAllEducations();
  const featuredProjects = await getFeaturedProjects();
  const skillsGrouped = await getSkillsGroupedByCategory();
  const experiences = await getAllExperiences();
  const certificates = await getAllCertificates();
  const githubStats = await getGitHubStats("Leta-Kasahun");

  return (
    <div className="flex flex-col">
      <HeroSection profile={profile} socialLinks={socialLinks} />
      <SectionDivider speed={1.1} />
      <AboutSection profile={profile} educations={educations} />
      <SectionDivider speed={0.9} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <SectionDivider speed={1.2} />
      <SkillsSection skillsGrouped={skillsGrouped} />
      <SectionDivider speed={0.85} />
      <GitHubContributionSection stats={githubStats} />
      <SectionDivider speed={1.15} />
      <ExperienceSection experiences={experiences} />
      <SectionDivider speed={1.0} />
      <CertificatesSection certificates={certificates} />
      <SectionDivider speed={1.05} />
      <ContactSection profile={profile} socialLinks={socialLinks} />
    </div>
  );
}
