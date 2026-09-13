"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction } from "@/actions/auth";
import { AuthResult } from "@/lib/auth";

export function ChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    changePasswordAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl">
      <div className="mb-6">
        <div className="font-mono text-xs uppercase tracking-wider text-[#3FC7B0]">
          Security Settings
        </div>
        <h2 className="mt-1 text-xl font-light text-[#E7EAEA]">
          Change Password
        </h2>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update your admin account password. New password cannot be the same as your previous password.
        </p>
      </div>

      {state?.error && (
        <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Password updated successfully. Your new credentials are now active.
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4 max-w-md">
        <div>
          <label
            htmlFor="currentPassword"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            New Password (min 8 characters)
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••••••"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-mono text-xs font-medium text-[#8A9295]"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••••••"
            className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3FC7B0] px-5 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
