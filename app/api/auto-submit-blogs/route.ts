import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { submitBatchToIndexNow } from "@/lib/indexnow";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://propfundsy.com";

/**
 * GET /api/auto-submit-blogs
 *
 * Automatically detects and submits new blog posts to IndexNow
 * Called on blog page load - completely automatic, no setup needed!
 *
 * Uses post dates to determine if "new" (published today or within last 2 days)
 */
export async function GET(request: NextRequest) {
  try {
    const allPosts = getAllPosts();
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

    // Find recently published posts (last 2 days) that should be submitted
    const recentPosts = allPosts.filter((post) => {
      const postDate = new Date(post.date);
      return postDate >= twoDaysAgo;
    });

    if (recentPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No recent posts to submit",
        submitted: [],
        count: 0,
      });
    }

    // Submit recent posts to IndexNow
    const urlsToSubmit = recentPosts.map((post) => `/blog/${post.slug}`);
    const indexNowSuccess = await submitBatchToIndexNow(urlsToSubmit);

    console.log(`[Auto-Submit] Submitted ${recentPosts.length} recent blog posts to IndexNow`);

    return NextResponse.json({
      success: indexNowSuccess,
      message: `Submitted ${recentPosts.length} recent blog posts to IndexNow`,
      submitted: recentPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
      count: recentPosts.length,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[Auto-Submit] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit blogs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
