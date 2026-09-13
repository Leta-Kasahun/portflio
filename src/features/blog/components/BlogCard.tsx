import Link from "next/link";
import { BlogPost } from "@/generated/prisma/client";
import { calculateReadingTime, formatBlogDate } from "../utils";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const readTime = calculateReadingTime(post.content);
  const formattedDate = formatBlogDate(post.publishedAt || post.createdAt);

  return (
    <article className="group relative flex flex-col justify-between w-full max-w-full min-w-0 overflow-hidden rounded-tl-[20px] sm:rounded-tl-[32px] rounded-br-[20px] sm:rounded-br-[32px] rounded-tr-none rounded-bl-none border-2 border-[#22282B] bg-[#171B1D] p-5 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#3FC7B0]/60 hover:-translate-y-1">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#22282B] pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3FC7B0]" />
            <time
              dateTime={new Date(post.publishedAt || post.createdAt).toISOString()}
              className="font-mono text-xs text-[#8A9295]"
            >
              {formattedDate}
            </time>
          </div>

          <span className="rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10.5px] text-[#3FC7B0]">
            {readTime}
          </span>
        </div>

        <h3 className="mt-4 text-base xs:text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#3FC7B0] leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 font-mono text-xs sm:text-[13px] font-light leading-relaxed text-[#8A9295] line-clamp-3">
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded border border-[#22282B] bg-[#0E1113] px-2 py-0.5 font-mono text-[10.5px] text-[#E7EAEA] transition-colors group-hover:border-[#3FC7B0]/40 group-hover:text-[#3FC7B0]"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 border-t border-[#22282B] pt-4 flex items-center justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#3FC7B0] transition-colors hover:text-white"
        >
          <span>Read Blog Post</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
