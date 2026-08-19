# IndexNow Setup Guide

## What is IndexNow?

IndexNow is an open protocol that allows you to instantly notify search engines (Bing, Google, Yandex) about new or updated URLs, eliminating the need to wait for them to crawl your site.

**Benefits:**
- Instant indexing of new blog posts
- Faster updates for modified content
- No need to wait for crawl schedules
- Works with Bing, Google, and Yandex

---

## Implementation Status

✅ **Already Configured:**

1. **IndexNow Key File**
   - Location: `/.well-known/85b2fb258d324f95a60b9550fce9347c.txt`
   - Contains your IndexNow API key
   - Verifies ownership to search engines

2. **API Route**
   - Endpoint: `/api/indexnow`
   - Accepts POST requests with URL list
   - Submits to Bing, Google, Yandex simultaneously
   - Health check via GET request

3. **Helper Functions**
   - `submitToIndexNow(url)` - Submit single URL
   - `submitBatchToIndexNow(urls)` - Submit multiple URLs
   - `getIndexNowStatus()` - Check API status

---

## Using IndexNow

### Option 1: Submit a Single URL

**When publishing a blog post:**

```typescript
import { submitToIndexNow } from "@/lib/indexnow";

// After publishing a blog post
await submitToIndexNow("/blog/my-new-post");
```

### Option 2: Submit Multiple URLs

**When publishing multiple posts or tools:**

```typescript
import { submitBatchToIndexNow } from "@/lib/indexnow";

const urls = [
  "/blog/post-1",
  "/blog/post-2",
  "/tools/leverage",
];

await submitBatchToIndexNow(urls);
```

### Option 3: API Request

**Direct HTTP POST request:**

```bash
curl -X POST https://propfundsy.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://propfundsy.com/blog/my-post",
      "https://propfundsy.com/tools/position-size"
    ]
  }'
```

### Option 4: Check API Status

```typescript
import { getIndexNowStatus } from "@/lib/indexnow";

const status = await getIndexNowStatus();
console.log(status);
// Returns:
// {
//   status: "IndexNow API ready",
//   host: "propfundsy.com",
//   keyFile: "https://propfundsy.com/.well-known/85b2fb258d324f95a60b9550fce9347c.txt",
//   endpoints: ["https://api.indexnow.org/indexnow", ...]
// }
```

---

## Integration Points

### 1. Publish New Blog Post
Add to your blog publishing workflow:

```typescript
// After creating a new blog post
const postSlug = "my-new-article";
await submitToIndexNow(`/blog/${postSlug}`);
```

### 2. Update Blog Post
When modifying an existing post, resubmit:

```typescript
await submitToIndexNow(`/blog/${postSlug}`);
```

### 3. Publish New Tool/Calculator
When adding a new calculator:

```typescript
await submitToIndexNow("/tools/new-calculator");
```

### 4. Update Comparison Page
When adding new firms:

```typescript
await submitToIndexNow("/compare");
```

---

## Limits & Guidelines

- **Max URLs per request:** 10,000
- **Frequency:** Can submit multiple times daily
- **Best practice:** Submit within minutes of publishing
- **No penalty:** Submitting same URL multiple times is safe

---

## Verification

### Verify Key File is Live

Visit: `https://propfundsy.com/.well-known/85b2fb258d324f95a60b9550fce9347c.txt`

Should display: `85b2fb258d324f95a60b9550fce9347c`

### Test API Endpoint

```bash
curl https://propfundsy.com/api/indexnow
```

Should return status information.

---

## Monitoring

### In Bing Webmaster Tools
1. Go to your dashboard
2. Look for "Crawl Index" stats
3. Should see immediate indexing of submitted URLs
4. Check "Index History" for submission confirmation

### In Google Search Console
1. Go to Coverage report
2. Submitted URLs appear almost instantly
3. Status updates within hours

### In Yandex Webmaster
1. Check "Crawl Statistics"
2. Recent submissions will show in logs

---

## Troubleshooting

### Issue: "Key file not found" error

**Solution:**
- Verify file exists at: `/.well-known/85b2fb258d324f95a60b9550fce9347c.txt`
- File must contain only: `85b2fb258d324f95a60b9550fce9347c`
- No extra whitespace or characters

### Issue: URLs not being indexed

**Solution:**
- Wait 24 hours (first submission takes longer)
- Check robots.txt doesn't block the URL
- Verify URL is valid and accessible
- Check for noindex meta tag

### Issue: API returns 500 error

**Solution:**
- Check environment variable `INDEXNOW_KEY` if set
- Verify API route is deployed
- Check server logs for errors
- Try submitting single URL first

---

## Best Practices

1. **Submit immediately after publishing**
   - Submit within minutes of going live
   - Ensures fastest possible indexing

2. **Batch submit related updates**
   - Group related URLs in one request
   - More efficient than individual submissions

3. **Monitor via Webmaster Tools**
   - Bing Webmaster Tools shows immediate confirmation
   - Google Search Console updates within hours

4. **Use consistent URLs**
   - Always submit full URLs (including https://)
   - Avoid query parameters (?sort=, ?search=, etc.)

5. **Update existing content**
   - Resubmit URLs when making significant changes
   - Ensures Google re-crawls the page

---

## Integration Examples

### Example 1: Blog Publishing Pipeline

```typescript
// pages/api/publish-blog.ts
import { submitToIndexNow } from "@/lib/indexnow";

export async function publishBlogPost(slug: string) {
  // ... your publishing logic ...
  
  // Submit to IndexNow immediately after publishing
  const success = await submitToIndexNow(`/blog/${slug}`);
  
  if (success) {
    console.log(`✅ ${slug} submitted to IndexNow`);
  } else {
    console.log(`⚠️ Failed to submit ${slug} to IndexNow (will retry)`);
  }
}
```

### Example 2: Batch Tool Updates

```typescript
import { submitBatchToIndexNow } from "@/lib/indexnow";

async function updateAllTools() {
  const toolUrls = [
    "/tools/leverage",
    "/tools/recovery",
    "/tools/edge",
    "/tools/position",
    "/tools/compound",
  ];
  
  await submitBatchToIndexNow(toolUrls);
  console.log("✅ All tools submitted to IndexNow");
}
```

---

## Additional Resources

- **IndexNow Official:** https://www.indexnow.org/
- **Microsoft IndexNow Docs:** https://learn.microsoft.com/en-us/bing/webmaster-tools/indexnow-api-info
- **Google on IndexNow:** https://developers.google.com/search/blog/2022/02/indexing-api-open-to-anyone

---

**Last Updated:** August 2026  
**Status:** Ready to use  
**API Key:** Configured ✅  
**Key File:** Active ✅
