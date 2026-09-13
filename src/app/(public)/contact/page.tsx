import { Metadata } from "next";
import { getProfile } from "@/features/profile/queries";
import { getAllSocialLinks } from "@/features/social-links/queries";
import { ContactSection } from "@/features/contact/components/ContactSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | Leta Kasahun",
  description: "Get in touch with Leta Kasahun for software engineering roles, full-stack development, and technical collaboration.",
};

export default async function ContactPage() {
  const profile = await getProfile();
  const socialLinks = await getAllSocialLinks();

  return (
    <div className="pt-16 sm:pt-20">
      <ContactSection profile={profile} socialLinks={socialLinks} />
    </div>
  );
}
