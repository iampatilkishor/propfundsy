import { NextRequest, NextResponse } from "next/server";

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "85b2fb258d324f95a60b9550fce9347c";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://propfundsy.com";

// IndexNow endpoints
const SEARCH_ENGINES = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow/submit",
  "https://yandex.com/indexnow/submit",
];

/**
 * POST /api/indexnow
 * Submit URLs to IndexNow for instant indexing
 *
 * Request body:
 * {
 *   "urls": ["https://propfundsy.com/blog/post-slug"]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "URLs array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Limit to 10,000 URLs per request (IndexNow limit)
    const urlsToSubmit = urls.slice(0, 10000);

    const payload: IndexNowPayload = {
      host: new URL(SITE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/.well-known/${INDEXNOW_KEY}.txt`,
      urlList: urlsToSubmit,
    };

    // Submit to all search engines
    const results = await Promise.allSettled(
      SEARCH_ENGINES.map((endpoint) =>
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      )
    );

    const responses = results.map((result, index) => ({
      engine: SEARCH_ENGINES[index],
      status: result.status === "fulfilled" ? result.value.status : "failed",
      message:
        result.status === "fulfilled"
          ? `Status ${result.value.status}`
          : result.reason?.message || "Unknown error",
    }));

    console.log("[IndexNow] Submitted URLs:", urlsToSubmit);
    console.log("[IndexNow] Responses:", responses);

    return NextResponse.json(
      {
        success: true,
        submitted: urlsToSubmit.length,
        responses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[IndexNow] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit URLs to IndexNow",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Health check and key verification
 */
export async function GET() {
  return NextResponse.json({
    status: "IndexNow API ready",
    host: new URL(SITE_URL).hostname,
    keyFile: `${SITE_URL}/.well-known/${INDEXNOW_KEY}.txt`,
    endpoints: SEARCH_ENGINES,
  });
}
