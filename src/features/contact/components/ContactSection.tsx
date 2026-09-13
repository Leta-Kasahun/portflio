import { Profile, SocialLink } from "@/generated/prisma/client";
import { ContactForm } from "./ContactForm";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ContactSectionProps = {
  profile?: Profile | null;
  socialLinks?: SocialLink[];
};

export function ContactSection({ profile, socialLinks }: ContactSectionProps) {
  const email = profile?.email || "letakasahun2@gmail.com";
  const phone = "+251923695611";
  const location = profile?.location || "Addis Ababa, Ethiopia";

  return (
    <section
      id="contact"
      className="relative bg-[#0E1113] px-3 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 lg:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <RevealOnScroll direction="up" duration={850}>
          <div className="flex flex-col items-start text-left">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#3FC7B0]">
              Get In Touch
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          <RevealOnScroll direction="up" delay={50} duration={850} className="lg:col-span-5 flex flex-col h-full">
            <div className="flex flex-col justify-between h-full rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-5 sm:p-7 shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-[#22282B] pb-4">
                  <span className="font-mono text-xs font-semibold text-[#3FC7B0] uppercase tracking-wider">
                    Contact Details
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#3FC7B0]/40 bg-[#3FC7B0]/10 px-2 py-0.5 font-mono text-[10px] text-[#3FC7B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
                    <span>Available</span>
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-left">
                  <div>
                    <span className="block font-mono text-[10.5px] font-medium uppercase tracking-wider text-[#8A9295]">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-medium text-white transition-colors hover:text-[#3FC7B0]"
                    >
                      <svg className="h-4 w-4 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="break-all">{email}</span>
                    </a>
                  </div>

                  <div>
                    <span className="block font-mono text-[10.5px] font-medium uppercase tracking-wider text-[#8A9295]">
                      Phone
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="mt-1 inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-medium text-white transition-colors hover:text-[#3FC7B0]"
                    >
                      <svg className="h-4 w-4 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{phone}</span>
                    </a>
                  </div>

                  <div>
                    <span className="block font-mono text-[10.5px] font-medium uppercase tracking-wider text-[#8A9295]">
                      Location
                    </span>
                    <div className="mt-1 flex items-center gap-2 font-mono text-xs sm:text-sm text-[#E7EAEA]">
                      <svg className="h-4 w-4 text-[#3FC7B0] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {socialLinks && socialLinks.length > 0 ? (
                <div className="mt-6 border-t border-[#22282B] pt-4">
                  <span className="block font-mono text-[10px] font-medium uppercase tracking-wider text-[#8A9295] mb-2.5 text-left">
                    Socials
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#22282B] bg-[#0E1113] px-3 py-1.5 font-mono text-xs text-[#E7EAEA] transition-all duration-200 hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                      >
                        <span>{link.platform}</span>
                        <svg className="h-2.5 w-2.5 text-[#8A9295]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={150} duration={850} className="lg:col-span-7 flex flex-col h-full">
            <div className="flex flex-col justify-between h-full rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-5 sm:p-7 shadow-2xl">
              <div className="border-b border-[#22282B] pb-4 mb-5 text-left">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Send Message
                </h3>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <ContactForm />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
