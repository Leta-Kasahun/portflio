"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { AuthResult } from "@/lib/auth";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1113] px-4 font-sans selection:bg-[#3FC7B0]/20 selection:text-[#3FC7B0]">
      <div className="w-full max-w-[420px] rounded-xl border border-[#22282B] bg-[#171B1D] p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-light tracking-tight text-[#E7EAEA]">
            Admin
          </h1>
        </div>

        {state?.error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue="letakasahun2@gmail.com"
              placeholder="admin@example.com"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-xs font-medium text-[#8A9295]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className="mt-1.5 w-full rounded-lg border border-[#22282B] bg-[#0E1113] px-3.5 py-2.5 text-sm text-[#E7EAEA] placeholder-[#8A9295]/60 outline-none transition-colors focus:border-[#3FC7B0] focus:ring-1 focus:ring-[#3FC7B0]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-[#3FC7B0] px-4 py-2.5 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
