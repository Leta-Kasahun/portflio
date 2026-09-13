import Link from "next/link";
import { getAllBlogPosts } from "@/features/blog/queries";
import { DeleteBlogPostButton } from "@/features/blog/components/delete-blog-post-button";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  const formatDateDisplay = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
            Blog & Technical Writings
          </h1>
          <p className="mt-1 text-sm text-[#8A9295]">
            Manage engineering deep dives, architecture breakdowns, and published articles.
          </p>
        </div>
        <div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center rounded-lg bg-[#3FC7B0] px-4 py-2 font-sans text-sm font-medium text-[#0E1113] transition-all hover:bg-[#35B8A3] active:bg-[#2FA995]"
          >
            + New Article
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#22282B] bg-[#171B1D]/40 p-12 text-center">
          <p className="font-mono text-sm text-[#8A9295]">
            No blog posts published yet.
          </p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-block font-mono text-xs text-[#3FC7B0] underline"
          >
            Draft your first article &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-4 rounded-xl border border-[#22282B] bg-[#171B1D] p-4 transition-colors hover:border-[#3FC7B0]/40 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-medium text-[#E7EAEA]">
                    {post.title}
                  </span>
                  <span className="font-mono text-xs text-[#8A9295]">
                    /{post.slug}
                  </span>
                  {post.published ? (
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                      Published
                    </span>
                  ) : (
                    <span className="rounded bg-[#8A9295]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#8A9295]">
                      Draft
                    </span>
                  )}
                  {post.featured && (
                    <span className="rounded bg-[#3FC7B0]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#3FC7B0]">
                      Featured
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs text-[#8A9295]">
                  Created: {formatDateDisplay(post.createdAt)}
                  {post.publishedAt && ` \u2022 Published: ${formatDateDisplay(post.publishedAt)}`}
                </p>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10px] text-[#8A9295]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="rounded border border-[#22282B] px-3 py-1 font-mono text-xs text-[#E7EAEA] transition-colors hover:border-[#3FC7B0] hover:text-[#3FC7B0]"
                >
                  Edit
                </Link>
                <DeleteBlogPostButton
                  postId={post.id}
                  postTitle={post.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
