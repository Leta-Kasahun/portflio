"use client";

import { useActionState, useRef, useEffect } from "react";
import { createMessageAction, MessageActionResult } from "@/features/messages/mutations";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<MessageActionResult | null, FormData>(
    createMessageAction,
    null
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className="w-full">
      {state?.success ? (
        <div className="rounded-xl border border-[#3FC7B0]/60 bg-[#3FC7B0]/10 p-5 text-left animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 text-[#3FC7B0]">
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h4 className="font-mono text-sm font-bold">Message Sent</h4>
          </div>
          <p className="mt-2 font-mono text-xs text-[#E7EAEA] leading-relaxed">
            Thank you for reaching out. I will respond to your email shortly.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#3FC7B0] hover:underline cursor-pointer"
          >
            <span>Send another message</span>
            <span>&rarr;</span>
          </button>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="space-y-4">
          {state?.error ? (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-left">
              <p className="font-mono text-xs text-red-400">
                {state.error}
              </p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col text-left">
              <label htmlFor="name" className="font-mono text-[11px] font-medium text-[#8A9295] mb-1.5">
                Name <span className="text-[#3FC7B0]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-[#8A9295]/40 transition-colors focus:border-[#3FC7B0] focus:outline-none focus:ring-1 focus:ring-[#3FC7B0]/30"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="email" className="font-mono text-[11px] font-medium text-[#8A9295] mb-1.5">
                Email <span className="text-[#3FC7B0]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-[#8A9295]/40 transition-colors focus:border-[#3FC7B0] focus:outline-none focus:ring-1 focus:ring-[#3FC7B0]/30"
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="subject" className="font-mono text-[11px] font-medium text-[#8A9295] mb-1.5">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-[#8A9295]/40 transition-colors focus:border-[#3FC7B0] focus:outline-none focus:ring-1 focus:ring-[#3FC7B0]/30"
            />
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="message" className="font-mono text-[11px] font-medium text-[#8A9295] mb-1.5">
              Message <span className="text-[#3FC7B0]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Your message..."
              className="w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-[#8A9295]/40 transition-colors focus:border-[#3FC7B0] focus:outline-none focus:ring-1 focus:ring-[#3FC7B0]/30 resize-none"
            />
          </div>

          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-[#3FC7B0] bg-[#3FC7B0]/10 px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold text-[#3FC7B0] transition-all duration-300 hover:bg-[#3FC7B0] hover:text-[#0E1113] hover:shadow-[0_0_20px_rgba(63,199,176,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
