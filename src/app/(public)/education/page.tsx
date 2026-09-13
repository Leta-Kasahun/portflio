import { Metadata } from "next";
import { getProfile } from "@/features/profile/queries";
import { getAllEducations } from "@/features/education/queries";
import { AboutSection } from "@/features/profile/components/AboutSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Education | Leta Kasahun",
  description: "Academic background and education of Leta Kasahun",
};

export default async function EducationPage() {
  const profile = await getProfile();
  const educations = await getAllEducations();

  return (
    <div className="pt-16">
      <AboutSection profile={profile} educations={educations} />
    </div>
  );
}
