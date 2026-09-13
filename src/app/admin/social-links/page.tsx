import Link from "next/link";
import { getAllSocialLinks } from "@/features/social-links/queries";
import { DeleteSocialLinkButton } from "@/features/social-links/components/delete-social-link-button";

export default async function AdminSocialLinksPage() {
  const links = await getAllSocialLinks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Social & External Links
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage links to GitHub, LinkedIn, Twitter/X, and online profiles.
          </p>
        </div>
        <div>
          <Link
            href="/admin/social-links/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + Add Social Link
          </Link>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No social links added yet.
          </p>
          <Link
            href="/admin/social-links/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Add your GitHub or LinkedIn &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1">
                <span className="text-base font-medium text-[#E7EAEA]">
                  {link.platform}
                </span>
                <div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#8A9295] hover:text-[#3FC7B0] underline break-all"
                  >
                    {link.url}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="mr-2 font-mono text-xs text-[#8A9295]">
                  #{link.order}
                </span>
                <Link
                  href={`/admin/social-links/${link.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteSocialLinkButton
                  linkId={link.id}
                  platformName={link.platform}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
