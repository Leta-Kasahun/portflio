import { BlogPostForm } from "@/features/blog/components/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Write New Article
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Draft a technical post, system breakdown, or engineering tutorial.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <BlogPostForm />
      </div>
    </div>
  );
}
