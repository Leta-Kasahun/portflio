import { Metadata } from "next";
import { getProfile } from "@/features/profile/queries";
import { getAllEducations } from "@/features/education/queries";
import { AboutSection } from "@/features/profile/components/AboutSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About | Leta Kasahun",
  description: "About Leta Kasahun - Background and Focus",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const educations = await getAllEducations();

  return (
    <div className="pt-16">
      <AboutSection profile={profile} educations={educations} />
    </div>
  );
}
