import { Profile, SocialLink } from "@/generated/prisma/client";
import { ThreeCanvas } from "@/components/ui/ThreeCanvas";

type HeroSectionProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden border-b border-[#22282B] bg-[#0E1113] px-4 py-24 sm:px-6 lg:px-8">
      <ThreeCanvas />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#22282B] bg-[#171B1D]/80 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3FC7B0] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3FC7B0]" />
          </span>
          <span className="font-mono text-xs text-[#E7EAEA]">
            Available for Senior / Staff Roles
          </span>
        </div>

        <h1 className="mt-8 text-5xl font-light tracking-tight text-[#E7EAEA] sm:text-7xl lg:text-8xl">
          {profile.name}
        </h1>

        <p className="mt-4 font-mono text-sm tracking-wide text-[#3FC7B0] sm:text-base">
          {profile.title}
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[#8A9295] leading-relaxed sm:text-lg">
          {profile.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="/projects"
            className="rounded-lg bg-[#3FC7B0] px-6 py-3 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            Explore Projects &rarr;
          </a>

          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#22282B] bg-[#171B1D] px-6 py-3 font-sans text-sm font-medium text-[#E7EAEA] transition-all hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
            >
              Resume (PDF)
            </a>
          ) : null}

          <a
            href="/contact"
            className="rounded-lg border border-[#22282B] bg-transparent px-6 py-3 font-sans text-sm font-medium text-[#8A9295] transition-all hover:border-[#8A9295] hover:text-[#E7EAEA]"
          >
            Contact
          </a>
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-[#22282B]/60 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
              >
                <span>{link.platform}</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
