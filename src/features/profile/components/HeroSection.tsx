import Link from "next/link";
import { Profile, SocialLink } from "@/generated/prisma/client";
import { HeroAvatar } from "./HeroAvatar";

type HeroSectionProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("github")) {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (p.includes("linkedin")) {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
      </svg>
    );
  }
  if (p.includes("twitter") || p.includes("x")) {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (p.includes("mail") || p.includes("email")) {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const linksToDisplay = socialLinks || [];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-18 lg:py-24">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div
            className={`flex flex-col items-start text-left ${profile.imageUrl ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl"
              }`}
          >
            <span className="text-xl font-extrabold tracking-tight text-white xs:text-3xl sm:text-4xl lg:text-5xl">
              Hi, I&apos;m
            </span>

            <h1 className="mt-1 font-serif text-4xl font-normal tracking-tight text-[#3FC7B0] xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {profile.name}
            </h1>

            <h3 className="text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white">
              {profile.title}
            </h3>
            <p className="mt-3.5 max-w-xl font-mono text-xs font-light leading-relaxed tracking-wide text-[#8A9295] sm:mt-5 sm:text-sm">
              {profile.bio}
            </p>

            <div className="mt-5 flex flex-row flex-wrap items-center gap-2 sm:mt-10 sm:gap-3.5">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-[#22282B] bg-transparent px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 font-sans text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:border-[#3FC7B0] hover:text-[#3FC7B0] hover:bg-[#3FC7B0]/10 hover:shadow-lg hover:shadow-[#3FC7B0]/10 hover:-translate-y-0.5 active:translate-y-0 text-center shrink-0"
              >
                View Project
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[#22282B] bg-transparent px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 font-sans text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:border-[#3FC7B0] hover:text-[#3FC7B0] hover:bg-[#3FC7B0]/10 hover:shadow-lg hover:shadow-[#3FC7B0]/10 hover:-translate-y-0.5 active:translate-y-0 text-center shrink-0"
              >
                Contact
              </a>

              <Link
                href="/resume"
                className="inline-flex items-center justify-center rounded-lg border border-[#22282B] bg-transparent px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 font-sans text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:border-[#3FC7B0] hover:text-[#3FC7B0] hover:bg-[#3FC7B0]/10 hover:shadow-lg hover:shadow-[#3FC7B0]/10 hover:-translate-y-0.5 active:translate-y-0 text-center shrink-0"
              >
                View Resume
              </Link>
            </div>

            {linksToDisplay.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-1.5 xs:gap-2 sm:mt-10 sm:gap-3 border-t border-[#22282B]/60 pt-5 sm:pt-7 w-full">
                {linksToDisplay.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 xs:gap-2 rounded-lg border border-[#22282B] bg-[#171B1D]/40 px-2.5 py-1.5 sm:px-3.5 sm:py-2 font-mono text-[11px] xs:text-xs sm:text-[13px] font-light tracking-wider text-[#E7EAEA] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#3FC7B0]/60 hover:bg-[#3FC7B0]/10 hover:text-[#3FC7B0] hover:shadow-[0_0_15px_rgba(63,199,176,0.18)] active:translate-y-0 shrink-0"
                  >
                    <span className="text-[#8A9295] transition-colors duration-300 group-hover:text-[#3FC7B0]">
                      {getSocialIcon(link.platform)}
                    </span>
                    <span>{link.platform}</span>
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="h-3 w-3 text-[#8A9295] transition-all duration-300 group-hover:text-[#3FC7B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {profile.imageUrl ? (
            <div className="flex items-center justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-full max-w-[250px] xs:max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] xl:max-w-[450px]">
                <div className="relative aspect-[5/6] w-full p-2 sm:p-2.5 rounded-tl-[36px] sm:rounded-tl-[54px] rounded-br-[36px] sm:rounded-br-[54px] rounded-tr-none rounded-bl-none border-[3px] border-[#3FC7B0] bg-[#0E1113] shadow-2xl transition-all duration-300">
                  <HeroAvatar src={profile.imageUrl} alt={profile.name || "Profile"} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
