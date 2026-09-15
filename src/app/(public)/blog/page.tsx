import { Metadata } from "next";
import { getPublishedBlogPosts } from "@/features/blog/queries";
import { BlogList } from "@/features/blog/components/BlogList";
import { Container } from "@/components/layout/Container";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Engineering Blog & Insights | Leta Kasahun",
  description: "Technical notes, tutorials, and insights on software engineering, Python, JavaScript, Docker, and AI applications by Leta Kasahun.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="pt-24 pb-20 sm:pt-28 sm:pb-24">
      <Container>
        <div className="flex flex-col items-start text-left mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#3FC7B0]">
            Blogs & Insights
          </h1>
        </div>

        <BlogList posts={posts} />
      </Container>
    </div>
  );
}
