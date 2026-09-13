import { notFound } from "next/navigation";
import { getBlogPostById } from "@/features/blog/queries";
import { BlogPostForm } from "@/features/blog/components/blog-post-form";

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-[#E7EAEA] sm:text-3xl">
          Edit Article: {post.title}
        </h1>
        <p className="mt-1 text-sm text-[#8A9295]">
          Update content, tags, publication status, and metadata.
        </p>
      </div>

      <div className="rounded-xl border border-[#22282B] bg-[#171B1D] p-6 shadow-xl sm:p-8">
        <BlogPostForm post={post} />
      </div>
    </div>
  );
}
