# Auto-Submit Blog Posts to IndexNow

## Overview

This system automatically detects new blog posts and submits them to IndexNow (Bing, Google, Yandex) without any manual action needed.

**How it works:**
1. A cron job calls `/api/auto-submit-blogs` periodically
2. The API checks for new blog posts
3. Any new posts are automatically submitted to IndexNow
4. A tracking file remembers which posts have been submitted
5. You just write and publish - everything else is automatic!

---

## Setup (One-Time)

### Step 1: Set Environment Variable

Add to your `.env.local`:

```bash
CRON_SECRET=your-super-secret-token-here
```

Replace `your-super-secret-token-here` with a strong random string. This secures the endpoint so only your cron job can call it.

**Generate a secret:**
```bash
# Run this in terminal to generate a random token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Set Up Free Cron Job

Choose one of these free cron services:

#### Option A: EasyCron (Easiest)
1. Go to https://www.easycron.com/
2. Click "Add a cron job"
3. Fill in:
   - **Cron Expression:** `0 * * * *` (runs every hour)
   - **URL:** `https://propfundsy.com/api/auto-submit-blogs`
   - **HTTP Headers:**
     ```
     x-cron-secret: your-super-secret-token-here
     ```
4. Save and enable

#### Option B: Cron-Job.org
1. Go to https://cron-job.org/en/
2. Sign up (free)
3. Click "Create cronjob"
4. Fill in:
   - **URL:** `https://propfundsy.com/api/auto-submit-blogs`
   - **Execution schedule:** Every 1 hour
   - **HTTP Headers:**
     ```
     x-cron-secret: your-super-secret-token-here
     ```
5. Save

#### Option C: Google Cloud Scheduler
1. Go to https://cloud.google.com/scheduler
2. Create a new job
3. Fill in:
   - **Frequency:** `0 * * * *` (every hour)
   - **Timezone:** Your timezone
   - **HTTP method:** POST
   - **URL:** `https://propfundsy.com/api/auto-submit-blogs`
   - **Add header:**
     - Name: `x-cron-secret`
     - Value: `your-super-secret-token-here`

### Step 3: Test the Setup

#### Check Status
```bash
curl https://propfundsy.com/api/auto-submit-blogs
```

Should show:
- Total posts
- Submitted count
- Pending posts

#### Manual Trigger (for testing)
```bash
curl -X POST https://propfundsy.com/api/auto-submit-blogs \
  -H "x-cron-secret: your-super-secret-token-here"
```

Should show which posts were submitted.

---

## Usage

### Publish a Blog Post

1. Create new markdown file: `content/blog/my-new-post.md`
2. Add content with frontmatter:
   ```yaml
   ---
   title: "My New Post"
   description: "Post description"
   date: "2026-08-20"
   author: "Kishor"
   category: "Guides"
   featured: true
   ---
   
   Your content here...
   ```
3. Save the file
4. **That's it!** The cron job will automatically submit it to IndexNow within the hour

---

## Monitoring

### Check What's Been Submitted
```bash
curl https://propfundsy.com/api/auto-submit-blogs
```

Response shows:
- Total posts
- How many submitted
- Which are pending
- Last 5 submissions

### View Recent Submissions
The cron job logs show:
- How many posts were submitted
- Titles and URLs
- Exact timestamp
- Confirmation from search engines

### In Search Engine Webmaster Tools
- **Bing Webmaster Tools:** Check "Indexing" section for recent submissions
- **Google Search Console:** New URLs appear in Coverage report
- **Yandex Webmaster:** Check "Crawl Statistics" for recent activity

---

## How It Works Behind the Scenes

### 1. Tracking File
`.submitted-posts.json` keeps track of which posts have been submitted:
```json
{
  "my-first-post": "2026-08-15T10:30:00.000Z",
  "my-second-post": "2026-08-16T11:00:00.000Z"
}
```

### 2. Auto-Detection
When cron job runs, it:
1. Gets all blog posts from `content/blog/`
2. Checks against tracking file
3. Finds new posts (not in tracking file)
4. Submits new posts to IndexNow
5. Updates tracking file

### 3. Idempotent
Safe to run multiple times:
- Posts already submitted won't be resubmitted
- No duplicate submissions to search engines
- Tracking file prevents duplicates

---

## Troubleshooting

### Cron job not running
- Check cron service status dashboard
- Verify URL is correct (including protocol https://)
- Verify secret token matches
- Check that your domain is live and accessible

### Posts not being submitted
- Wait for next cron run (if using hourly, max 1 hour)
- Check `/api/auto-submit-blogs` status endpoint
- Verify blog post has proper frontmatter
- Check `.submitted-posts.json` file exists and has content

### "Unauthorized" error
- Check `x-cron-secret` header in your cron job
- Verify it matches `CRON_SECRET` in `.env.local`
- Make sure token is set in environment variables

### Posts showing as "pending" forever
- The cron job may not have run yet
- Manually trigger: `curl -X POST https://propfundsy.com/api/auto-submit-blogs -H "x-cron-secret: your-token"`
- Check your cron service logs for errors

---

## Best Practices

1. **Unique Secret Token**
   - Use strong, random secret
   - Change it if exposed
   - Don't commit to git

2. **Hourly Schedule**
   - Submits new posts within 1 hour of publishing
   - Not too aggressive
   - Good balance of freshness and server load

3. **Monitor First Week**
   - Check Bing Webmaster Tools for submissions
   - Verify posts appear in Google Search Console
   - Monitor logs for any errors

4. **Backup Tracking File**
   - `.submitted-posts.json` stores history
   - Don't delete it (posts would resubmit)
   - Consider version control if important

---

## Workflow Summary

**Before (Manual):**
1. Write blog post
2. Publish
3. Manually call IndexNow
4. Search engines index (days later)

**After (Automatic):**
1. Write blog post
2. Publish
3. ✅ Done! (Automatic indexing within 1 hour)

---

## Testing Checklist

- [ ] `.env.local` has `CRON_SECRET` set
- [ ] Cron job created and enabled
- [ ] Secret token matches in both places
- [ ] Manual test successful (curl command worked)
- [ ] Status endpoint shows posts
- [ ] Published a test blog post
- [ ] Cron job ran (check logs)
- [ ] New post appeared in status
- [ ] Appeared in Bing Webmaster Tools

---

## Need Help?

1. **Check API Status:** `curl https://propfundsy.com/api/auto-submit-blogs`
2. **Manual Test:** `curl -X POST https://propfundsy.com/api/auto-submit-blogs -H "x-cron-secret: your-token"`
3. **Check Logs:** Look at your cron service dashboard
4. **Verify Domain:** Ensure propfundsy.com is live

---

**Status:** ✅ Ready to use  
**Last Updated:** August 2026  
**Automatic:** Yes - no manual action needed!
