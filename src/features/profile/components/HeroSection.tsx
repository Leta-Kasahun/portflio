import Link from "next/link";
import { Profile, SocialLink } from "@/generated/prisma/client";
import { HeroAvatar } from "./HeroAvatar";

type HeroSectionProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const linksToDisplay = socialLinks || [];

  return (
    <section className="relative w-full overflow-hidden bg-[#0E1113] pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[600px] h-[450px] rounded-full bg-[#3FC7B0]/8 blur-[140px]" />
        <div className="absolute top-1/3 left-0 w-[450px] h-[350px] rounded-full bg-[#3FC7B0]/5 blur-[120px]" />

        <svg
          viewBox="0 0 1440 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M 850 0 C 880 40 930 60 980 40 C 1040 10 1100 50 1120 100 C 1170 80 1230 110 1240 160 C 1300 160 1350 200 1370 260 C 1410 270 1450 310 1460 360 L 1460 0 Z"
            fill="#12181B"
          />
          <path
            d="M -60 180 C 20 120 100 130 150 170 C 210 110 320 120 370 180 C 430 130 530 140 580 200 C 650 150 770 160 830 220 C 900 170 1020 180 1080 240 C 1160 190 1280 210 1340 270 C 1400 240 1470 270 1520 320 L 1520 750 L -60 750 Z"
            fill="#151E22"
          />
          <path
            d="M -60 320 C 60 250 180 260 260 320 C 360 260 500 270 590 330 C 700 270 860 280 960 350 C 1080 290 1240 310 1340 380 C 1420 360 1490 390 1540 440 L 1540 750 L -60 750 Z"
            fill="#182328"
          />
          <path
            d="M -60 460 C 120 400 280 410 400 470 C 560 410 740 430 880 490 C 1040 430 1240 450 1380 520 C 1450 510 1510 530 1540 560 L 1540 750 L -60 750 Z"
            fill="#0E1113"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div
            className={`flex flex-col items-start text-left ${profile.imageUrl ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl"
              }`}
          >
            <h1 className="font-serif text-4xl font-normal tracking-tight text-white xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.06]">
              Hi, I&apos;m{" "}
              <span className="text-[#3FC7B0]">{profile.name}</span>
            </h1>

            <h2 className="mt-3 text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white">
              {profile.title}
            </h2>

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

