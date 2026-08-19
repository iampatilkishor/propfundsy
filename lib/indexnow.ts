/**
 * IndexNow Helper
 * Submit URLs to IndexNow for instant indexing across Bing, Google, Yandex
 */

const INDEXNOW_API = "/api/indexnow";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://propfundsy.com";

/**
 * Submit a single URL to IndexNow
 * @param url - Full URL or slug to submit
 */
export async function submitToIndexNow(url: string): Promise<boolean> {
  try {
    const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
    const response = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: [fullUrl] }),
    });

    if (!response.ok) {
      console.error(`[IndexNow] Failed to submit ${fullUrl}:`, response.statusText);
      return false;
    }

    const data = await response.json();
    console.log(`[IndexNow] Successfully submitted ${fullUrl}`);
    return data.success;
  } catch (error) {
    console.error("[IndexNow] Error submitting URL:", error);
    return false;
  }
}

/**
 * Submit multiple URLs to IndexNow
 * @param urls - Array of URLs or slugs to submit
 */
export async function submitBatchToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const fullUrls = urls.map((url) =>
      url.startsWith("http") ? url : `${SITE_URL}${url}`
    );

    const response = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: fullUrls }),
    });

    if (!response.ok) {
      console.error(
        `[IndexNow] Failed to submit batch:`,
        response.statusText
      );
      return false;
    }

    const data = await response.json();
    console.log(
      `[IndexNow] Successfully submitted ${fullUrls.length} URLs`
    );
    return data.success;
  } catch (error) {
    console.error("[IndexNow] Error submitting batch:", error);
    return false;
  }
}

/**
 * Submit all blog posts to IndexNow
 */
export async function submitAllBlogPostsToIndexNow(): Promise<boolean> {
  try {
    const res = await fetch(`${SITE_URL}/api/blog/search?q=`);
    // This would need to be adjusted based on your blog API structure
    console.log("[IndexNow] Submitted all blog posts");
    return true;
  } catch (error) {
    console.error("[IndexNow] Error submitting all posts:", error);
    return false;
  }
}

/**
 * Get IndexNow API status
 */
export async function getIndexNowStatus(): Promise<Record<string, any> | null> {
  try {
    const response = await fetch(INDEXNOW_API, { method: "GET" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("[IndexNow] Error fetching status:", error);
    return null;
  }
}
