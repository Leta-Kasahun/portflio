import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { getPublishedProjects } from "@/features/projects/queries";
import { getProfile } from "@/features/profile/queries";
import { getAllSocialLinks } from "@/features/social-links/queries";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, profile, socialLinks] = await Promise.all([
    getPublishedProjects().catch(() => []),
    getProfile().catch(() => null),
    getAllSocialLinks().catch(() => []),
  ]);

  const sanitizedProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    technologies: p.technologies,
  }));

  const sanitizedSocials = socialLinks.map((s) => ({
    platform: s.platform,
    url: s.url,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#0E1113] font-sans text-[#E7EAEA] selection:bg-[#3FC7B0]/20 selection:text-[#3FC7B0]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandPalette
        projects={sanitizedProjects}
        email={profile?.email}
        resumeUrl={profile?.resumeUrl}
        socialLinks={sanitizedSocials}
      />
    </div>
  );
}
