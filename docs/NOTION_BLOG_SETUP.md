# Notion Blog Integration Setup Guide

## Overview

This integration allows you to write blog posts in Notion (including from your mobile device) and automatically sync them to your FrankX.ai blog as MDX files. Photos/videos added in Notion will be downloaded and embedded properly.

## Features

✅ **Mobile Writing** - Write from Notion mobile app with camera photos
✅ **Rich Media** - Images, YouTube, Vimeo videos supported
✅ **Auto-Sync** - Webhook triggers deploy when you mark "Ready to Publish"
✅ **Unified Blog** - Appears at `/blog` alongside MDX posts
✅ **Image Download** - Notion-hosted images downloaded to `/public/images/notion/`
✅ **Same Styling** - Uses your existing blog design system

---

## Step 1: Create Notion Integration

### 1.1 Create Internal Integration

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. **Name**: "FrankX Blog Sync"
4. **Associated workspace**: Select your workspace
5. **Capabilities**: Enable:
   - ✅ Read content
   - ✅ Update content
   - ❌ Insert content (not needed)
   - ❌ Delete content (not needed)
6. Click "Submit"
7. **Copy the "Internal Integration Token"** - this is your `NOTION_API_KEY`

### 1.2 Add to Environment Variables

Create or update `.env.local`:

```bash
NOTION_API_KEY=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_BLOG_DB_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Create Notion Database

### 2.1 Create Blog Database

1. Create a new **full-page database** in Notion
2. Name it "FrankX Blog Posts"
3. Click the `•••` menu → **Copy link to database**
4. Extract the database ID from URL:
   ```
   https://www.notion.so/your-workspace/DATABASE_ID?v=view_id
                                       ↑
                                  Copy this part
   ```
5. Add to `.env.local` as `NOTION_BLOG_DB_ID`

### 2.2 Add Required Properties

Add these properties to your database:

| Property Name | Type | Options | Required | Description |
|---------------|------|---------|----------|-------------|
| **Name** | Title | - | ✅ | Post title (already exists) |
| **Slug** | Text | - | ✅ | URL slug (e.g., `my-post-title`) |
| **Description** | Text | - | ✅ | Meta description for SEO |
| **Status** | Select | Draft, Ready to Publish, Published | ✅ | Publishing workflow |
| **Date** | Date | - | ✅ | Publish date |
| **Category** | Select | Your categories* | ✅ | Content category |
| **Tags** | Multi-select | Your tags* | ⚠️ | Topic tags |
| **Author** | Text | - | ⚠️ | Author name (defaults to "FrankX.ai") |
| **Featured** | Checkbox | - | ⚠️ | Feature on homepage |

*Match your existing categories from MDX files (e.g., "Creation Chronicles", "Technical Guide")

### 2.3 Status Select Options

Create these exact status options:
- 🟡 **Draft** (default)
- 🟢 **Ready to Publish** (triggers sync)
- 🔵 **Published** (automatically set after sync)

### 2.4 Connect Integration

1. In your Notion database, click `•••` → **Connections**
2. Search for "FrankX Blog Sync"
3. Click **Connect**

---

## Step 3: Usage Workflow

### Writing a Post

1. **Create new page** in your Notion blog database
2. **Fill in properties**:
   - Title: Your post title
   - Slug: `my-amazing-post`
   - Description: SEO meta description
   - Category: Select category
   - Tags: Add relevant tags
   - Date: Publish date
3. **Write content** in the page body
4. **Add media**:
   - 📷 **Images**: Paste or upload directly (mobile: take photo)
   - 🎥 **Videos**: Paste YouTube/Vimeo URLs - they'll auto-embed
   - **Formatting**: Use Notion's rich text (headings, lists, code blocks, etc.)

### Publishing

1. Change **Status** to "Ready to Publish"
2. Wait 1-2 minutes for webhook (or run `npm run sync:notion` manually)
3. Deploy triggers automatically
4. Within 10 minutes → Live at `frankx.ai/blog/your-slug`
5. Status automatically changes to "Published"

### Supported Content

✅ **Text Formatting**: Bold, italic, code, links
✅ **Headings**: H1, H2, H3
✅ **Lists**: Bulleted, numbered
✅ **Images**: PNG, JPG, GIF (auto-downloaded)
✅ **Videos**: YouTube, Vimeo (auto-embedded)
✅ **Code Blocks**: Syntax highlighting
✅ **Quotes**: Block quotes
✅ **Callouts**: Notion callouts → styled boxes

⚠️ **Not Yet Supported**:
- Notion databases/tables
- Toggle lists
- Synced blocks
- Embeds (besides YouTube/Vimeo)

---

## Step 4: Webhook Auto-Deploy Setup

### 4.1 Get Vercel Deploy Hook

1. Go to https://vercel.com/your-team/frankx-ai-vercel-website/settings/git
2. Scroll to "Deploy Hooks"
3. Click "Create Hook"
4. **Name**: `Notion Blog Sync`
5. **Branch**: `v3` (or your deployment branch)
6. Click "Create Hook"
7. **Copy the webhook URL** (looks like: `https://api.vercel.com/v1/integrations/deploy/prj_XXXXX/XXXXXX`)

### 4.2 Configure Notion Automation

**Option A: Using Notion API (Recommended)**

Use a service like Zapier or Make.com:

1. **Trigger**: Notion - Database Item Updated
2. **Filter**: Status = "Ready to Publish"
3. **Action**: Webhooks - POST Request
   - URL: Your Vercel deploy hook
   - Method: POST
   - Body: (empty or `{}`)

**Option B: GitHub Action (Alternative)**

Add to `.github/workflows/sync-notion.yml`:

```yaml
name: Sync Notion Blog
on:
  schedule:
    - cron: '*/10 * * * *'  # Every 10 minutes
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: v3

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci

      - name: Sync Notion Posts
        run: npm run sync:notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          NOTION_BLOG_DB_ID: ${{ secrets.NOTION_BLOG_DB_ID }}

      - name: Commit Changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "🔄 Sync blog posts from Notion"
          file_pattern: "content/blog/*.mdx public/images/notion/*"
```

Then add secrets to GitHub repo settings.

---

## Step 5: Manual Sync

If you don't set up webhooks yet, sync manually:

```bash
# Sync Notion posts to MDX
npm run sync:notion

# Then deploy
git add .
git commit -m "Add Notion blog posts"
git push origin v3
```

---

## Example Notion Page

### Properties
- **Title**: "How I Built an AI Music Studio"
- **Slug**: `ai-music-studio-guide`
- **Description**: "A step-by-step guide to building your own AI-powered music creation studio"
- **Status**: Ready to Publish
- **Date**: 2025-01-15
- **Category**: Creation Chronicles
- **Tags**: music, AI tools, creative tech
- **Featured**: ✓

### Content
```
# Introduction

Here's what you'll learn in this guide...

## Setup Requirements

- DAW software
- Suno AI account
- MIDI controller

![Studio setup](paste-your-image-here.jpg)

## Video Tutorial

https://www.youtube.com/watch?v=YOUR_VIDEO_ID

## Next Steps

Try these exercises...
```

---

## Troubleshooting

### "Database not found" Error

- Check `NOTION_BLOG_DB_ID` is correct
- Ensure integration is connected to the database
- Database must be shared with integration

### Images Not Downloading

- Check Notion image URLs are accessible
- Verify `/public/images/notion/` directory exists
- Check file permissions

### Videos Not Embedding

- Use direct YouTube/Vimeo URLs (not embed codes)
- Format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Format: `https://vimeo.com/VIDEO_ID`

### Status Not Updating to "Published"

- Check integration has "Update content" capability
- Verify property name is exactly "Status"
- Check console logs for errors

---

## Advanced Tips

### Writing from Mobile

1. Open Notion mobile app
2. Navigate to your blog database
3. Tap "+" to create new post
4. Take photo → Insert directly
5. Fill properties using mobile interface
6. Set status to "Ready to Publish"

### Batch Publishing

1. Write multiple posts in Notion
2. Keep all as "Draft"
3. When ready, change multiple to "Ready to Publish"
4. Sync will process all at once

### Scheduling Posts

1. Set future date in "Date" property
2. Posts sync to `/content/blog/` immediately
3. Control visibility in your blog code based on date

---

## Support

Questions? Check:
- Notion API Docs: https://developers.notion.com/
- Integration Issues: Review sync script logs
- GitHub Issues: Report bugs at your repo

**Happy mobile blogging! 📱✨**
