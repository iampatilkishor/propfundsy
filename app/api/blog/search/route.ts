import { getAllPosts } from "@/lib/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const allPosts = getAllPosts();

  if (!query.trim()) {
    return Response.json([]);
  }

  const results = allPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
    )
    .slice(0, 6)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
    }));

  return Response.json(results);
}
