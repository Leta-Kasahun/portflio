import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/features/blog/queries";
import { Container } from "@/components/layout/Container";
import { BlogContent } from "@/features/blog/components/BlogContent";
import { calculateReadingTime, formatBlogDate } from "@/features/blog/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    return {
      title: "Blog Post Not Found | Leta Kasahun",
    };
  }

  return {
    title: `${post.title} | Leta Kasahun`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const readTime = calculateReadingTime(post.content);
  const formattedDate = formatBlogDate(post.publishedAt || post.createdAt);

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <article className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#22282B] pb-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-light tracking-wider text-[#8A9295] transition-colors hover:text-[#3FC7B0]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              <span>Back to Blogs</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="rounded border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-xs text-[#3FC7B0]">
                {readTime}
              </span>
              <time
                dateTime={new Date(post.publishedAt || post.createdAt).toISOString()}
                className="font-mono text-xs text-[#8A9295]"
              >
                {formattedDate}
              </time>
            </div>
          </div>

          <header className="mb-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 font-mono text-xs sm:text-sm font-light leading-relaxed text-[#8A9295] border-l-2 border-[#3FC7B0] pl-4">
              {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded border border-[#22282B] bg-[#171B1D] px-2.5 py-1 font-mono text-[11px] text-[#3FC7B0]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className="rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-5 sm:p-8 lg:p-10 shadow-2xl">
            <BlogContent content={post.content} />
          </div>

          <div className="mt-10 rounded-xl border border-[#22282B] bg-[#121517] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="block font-mono text-xs font-semibold text-white">
                Written by Leta Kasahun
              </span>
              <span className="block font-mono text-[11px] text-[#8A9295] mt-0.5">
                Senior Full-Stack &amp; Distributed Systems Engineer
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="rounded-lg border border-[#3FC7B0] bg-[#3FC7B0]/10 px-4 py-2 font-mono text-xs font-semibold text-[#3FC7B0] transition-colors hover:bg-[#3FC7B0] hover:text-[#0E1113]"
              >
                Discuss Blog Post
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
