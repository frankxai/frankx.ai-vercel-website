# Build Your Stack This Weekend

> "The best time to plant a tree was twenty years ago. The second best time is now."
> — Chinese proverb

---

## I. The Weekend Workshop

Ten chapters of architecture. This chapter is the construction manual — the hour-by-hour guide that takes you from zero to a fully operational Vibe OS stack in a single weekend.

Everything described in this book — the five-layer infrastructure, the two-repo architecture, the automation workflows, the AI-assisted content pipeline — can be built in approximately sixteen hours of focused work. Not because it is simple. Because the services are designed for rapid deployment, and this guide eliminates the decision overhead that turns a weekend project into a month-long research exercise.

The end state: a production website running on Vercel, content stored in Git, email working through Resend, automation running on n8n via Railway, and Claude Code connected to your entire stack through MCP servers. Total recurring cost: approximately $50 per month.

These instructions assume you have a laptop, a terminal, a GitHub account, and a credit card. No prior experience with any of these tools is required — though familiarity with a text editor and basic command-line operations will help.

---

## II. Saturday Morning — The Application Layer (9:00 AM - 12:00 PM)

### Hour 1: Environment Setup (9:00 - 10:00)

Install the foundation tools. If you already have Node.js and Git, skip ahead.

```bash
# Install Node.js 20+ (LTS)
# macOS:
brew install node

# Windows (WSL recommended):
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
node --version   # Should show v20.x or higher
npm --version    # Should show 10.x or higher
git --version    # Should show 2.x or higher
```

Install the Vercel CLI:

```bash
npm install -g vercel
```

Create your project directory and initialize:

```bash
mkdir my-creator-stack && cd my-creator-stack
git init
```

### Hour 2: Next.js Application (10:00 - 11:00)

Create the Next.js application with the App Router:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint \
  --app --src-dir --import-alias "@/*"
```

Accept all defaults. This creates a Next.js 15+ application with TypeScript, Tailwind CSS, ESLint, the App Router, and a `src/` directory.

Verify the application runs:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. You should see the Next.js welcome page. Stop the dev server with `Ctrl+C`.

Create the content structure:

```bash
mkdir -p content/blog
mkdir -p content/books
mkdir -p public/images/blog
mkdir -p data
```

Create your first MDX blog post. Install the MDX dependencies:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter \
  reading-time rehype-slug rehype-autolink-headings
```

Create `content/blog/hello-world.mdx`:

```mdx
---
title: "Hello World"
description: "The first post from my creator stack."
date: "2026-03-22"
author: "Your Name"
---

# Hello World

This is the first post from my Vibe OS stack. The infrastructure is live.
The work begins now.
```

Create a minimal blog route at `src/app/blog/[slug]/page.tsx`:

```tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.mdx`
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <article className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-8">{data.date}</p>
      <div className="prose">{content}</div>
    </article>
  );
}
```

Verification checkpoint: run `npm run dev` and navigate to `http://localhost:3000/blog/hello-world`. You should see your blog post rendered with the title, date, and content.

### Hour 3: Vercel Deployment (11:00 - 12:00)

Connect to Vercel and deploy:

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account. If you do not have a Vercel account, create one at vercel.com — the free tier is sufficient to start.

Deploy to Vercel:

```bash
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (create new)
- Project name? Your choice (e.g., `my-creator-stack`)
- Directory? `./` (current directory)

Vercel will build and deploy your application. When it completes, you will receive a production URL. Open it in your browser.

Verification checkpoint: your site is live on the internet. The URL will look like `my-creator-stack.vercel.app`. Navigate to `/blog/hello-world` to confirm the blog post renders in production.

Connect your custom domain (optional but recommended):

```bash
vercel domains add yourdomain.com
```

Follow the DNS configuration instructions Vercel provides. If your domain is registered with a provider that supports automatic DNS configuration (Vercel, Cloudflare), the process takes minutes.

Push to GitHub for automatic deployments:

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo.git
git add -A
git commit -m "feat: initial Next.js application with blog"
git push -u origin main
```

Connect the GitHub repository to Vercel via the Vercel dashboard: Settings > Git > Connected Git Repository. From this point forward, every push to `main` triggers an automatic production deployment.

---

## III. Saturday Afternoon — The Data Layer (1:00 PM - 5:00 PM)

### Hour 4: Supabase Setup (1:00 - 2:00)

Go to supabase.com and create a new project. Select the free tier. Choose a region close to your audience. Set a strong database password — you will need it later.

While the project provisions (takes 1-2 minutes), install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Find your project URL and anon key in the Supabase dashboard: Settings > API. Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Add `.env.local` to your `.gitignore` if it is not already there. Never commit API keys to Git.

Create your first table. In the Supabase SQL Editor, run:

```sql
-- Email subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: allow inserts from the anon key (for the signup form)
CREATE POLICY "Allow anonymous inserts" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);
```

### Hour 5: Email Signup Form (2:00 - 3:00)

Create a reusable email signup component at `src/components/EmailSignup.tsx`:

```tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email, source: "website" });

    if (error) {
      setStatus(error.code === "23505" ? "success" : "error");
    } else {
      setStatus("success");
    }
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-2 bg-black text-white rounded-lg
                   hover:bg-gray-800 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-1">Subscribed.</p>
      )}
    </form>
  );
}
```

Add the component to your homepage at `src/app/page.tsx`:

```tsx
import { EmailSignup } from "@/components/EmailSignup";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Your Name</h1>
      <p className="text-lg text-gray-600 mb-8">
        Builder. Creator. Architect.
      </p>
      <EmailSignup />
    </main>
  );
}
```

Verification checkpoint: run `npm run dev`, enter an email in the signup form, then check the Supabase Table Editor. Your subscriber should appear in the `subscribers` table.

### Hours 6-7: First Content Piece (3:00 - 5:00)

Write your first real blog post. Not a placeholder — an actual article about something you know. The topic does not matter for the infrastructure. What matters is that real content flows through the system.

Create `content/blog/your-first-real-article.mdx` with proper frontmatter:

```mdx
---
title: "Your Article Title"
description: "A one-sentence summary for SEO and social sharing."
date: "2026-03-22"
author: "Your Name"
tags: ["your-topic", "another-tag"]
---

Write the article here. Use your voice. Be specific.
The system handles the infrastructure. You handle the ideas.
```

Deploy:

```bash
git add -A
git commit -m "feat: first real article and email signup"
git push origin main
```

Vercel will build and deploy automatically. Check the deployment status:

```bash
vercel ls --prod
```

Verification checkpoint: your production site has a homepage with an email signup form that writes to Supabase, and a blog with at least two posts. The entire stack is version-controlled in Git and deployed automatically on push.

---

## IV. Saturday Evening — The Email Layer (7:00 PM - 9:00 PM)

### Hour 8: Resend Configuration (7:00 - 8:00)

Go to resend.com and create an account. The free tier provides 3,000 emails per month — more than sufficient for a growing creator platform.

Add your domain. In the Resend dashboard: Domains > Add Domain. Resend will provide DNS records (SPF, DKIM) that you must add to your domain's DNS settings. This step is critical for email deliverability — without proper DNS records, your emails will land in spam.

After adding the DNS records, wait for verification (usually 5-30 minutes). Resend will show a green checkmark when the domain is verified.

Get your API key from the Resend dashboard: API Keys > Create API Key. Add it to your environment:

```bash
# Add to .env.local
RESEND_API_KEY=re_your_api_key_here
```

Add it to Vercel:

```bash
vercel env add RESEND_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development
```

Install the Resend SDK:

```bash
npm install resend
```

### Hour 9: Welcome Email API Route (8:00 - 9:00)

Create an API route that sends a welcome email when someone subscribes. Create `src/app/api/welcome/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    await resend.emails.send({
      from: "Your Name <hello@yourdomain.com>",
      to: email,
      subject: "Welcome — here is what to expect",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
          <h1 style="font-size: 24px;">Welcome${name ? `, ${name}` : ""}.</h1>
          <p>You are now part of a small group of people who care about
             building systems that compound.</p>
          <p>Here is what you will receive:</p>
          <ul>
            <li>Weekly articles on building with AI</li>
            <li>Early access to tools and frameworks</li>
            <li>The occasional behind-the-scenes note</li>
          </ul>
          <p>The first article is already waiting for you on the site.</p>
          <p>-- Your Name</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
```

Update your `EmailSignup` component to call this API after a successful signup:

```tsx
// After the successful Supabase insert, add:
if (!error) {
  fetch("/api/welcome", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
```

Verification checkpoint: subscribe with your own email address. You should receive the welcome email within seconds. Check the Resend dashboard to confirm delivery. If the email lands in spam, verify your DNS records are correctly configured.

Deploy the email integration:

```bash
git add -A
git commit -m "feat: Resend welcome email on subscriber signup"
git push origin main
```

Also add the Supabase environment variables to Vercel:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## V. Sunday Morning — The Automation Layer (9:00 AM - 12:00 PM)

### Hour 10: Railway Account and n8n Deployment (9:00 - 10:00)

Go to railway.app and create an account. Railway provides $5 of free credits per month, and n8n typically costs $5-7/month at idle.

Deploy n8n from the Railway template:

1. Click "New Project" in the Railway dashboard
2. Search for "n8n" in the template marketplace
3. Click "Deploy" on the official n8n template
4. Railway will provision a PostgreSQL database and an n8n instance automatically

Wait for the deployment to complete (2-3 minutes). Railway will provide a URL for your n8n instance.

Set essential environment variables in Railway (Settings > Variables):

```
N8N_TRUST_PROXY=true
WEBHOOK_URL=https://your-n8n-instance.railway.app
```

Open the n8n instance URL and create your admin account. This is your automation control center.

### Hour 11: First Automation Workflow (10:00 - 11:00)

Create a workflow that monitors your RSS feed and posts new content to Slack (or sends you a notification).

In n8n, create a new workflow:

**Node 1: Schedule Trigger**
- Type: Schedule Trigger
- Interval: Every 6 hours

**Node 2: RSS Read**
- Type: RSS Feed Read
- URL: `https://yourdomain.com/feed.xml` (you will create this next)

**Node 3: IF**
- Type: IF
- Condition: Check if new items exist since last run

**Node 4: Send Email (Resend HTTP Request)**
- Type: HTTP Request
- Method: POST
- URL: `https://api.resend.com/emails`
- Headers: `Authorization: Bearer your-resend-api-key`
- Body:
```json
{
  "from": "Automation <hello@yourdomain.com>",
  "to": "your@email.com",
  "subject": "New content published: {{$json.title}}",
  "html": "<p>New post: {{$json.title}}</p><p>{{$json.link}}</p>"
}
```

Create an RSS feed for your Next.js site. Create `src/app/feed.xml/route.ts`:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data } = matter(content);
    const slug = file.replace(".mdx", "");
    return { ...data, slug };
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Your Site</title>
    <link>https://yourdomain.com</link>
    <description>Your description</description>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://yourdomain.com/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/xml" },
  });
}
```

### Hour 12: Content Atomizer Workflow (11:00 - 12:00)

Create a second workflow — the Content Atomizer. This workflow takes a blog post URL and generates social media variants.

**Node 1: Webhook**
- Type: Webhook
- Method: POST
- Path: `/atomize`

**Node 2: HTTP Request**
- Fetch the blog post content from the URL provided in the webhook payload

**Node 3: AI (HTTP Request to your AI provider)**
- Send the content to Claude or another AI API with the prompt:

```
Take this blog post and create:
1. A Twitter/X thread (5-7 tweets)
2. A LinkedIn post (200 words)
3. A newsletter snippet (100 words)

Blog post content:
{{$json.content}}
```

**Node 4: Send results via email**
- Email yourself the generated social content for review before posting

Activate both workflows. Verify the webhook by sending a test request:

```bash
curl -X POST https://your-n8n.railway.app/webhook/atomize \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com/blog/hello-world"}'
```

Verification checkpoint: you have two active n8n workflows — one that monitors your RSS feed for new content, and one that atomizes content into social media formats when triggered. Both are running on Railway at approximately $5-7/month.

Deploy the RSS feed:

```bash
git add -A
git commit -m "feat: RSS feed and n8n automation integration"
git push origin main
```

---

## VI. Sunday Afternoon — The Compute Layer (1:00 PM - 5:00 PM)

### Hour 13: Claude Code Installation (1:00 - 2:00)

Install Claude Code:

```bash
npm install -g @anthropic-ai/claude-code
```

You will need a Claude Pro subscription ($20/month) at claude.ai. After subscribing, authenticate:

```bash
claude
```

Follow the authentication prompts. Once authenticated, Claude Code has access to your terminal, your filesystem, and your codebase.

### Hour 14: MCP Server Configuration (2:00 - 3:00)

MCP (Model Context Protocol) servers extend Claude Code's capabilities. Configure the essential servers.

Create `.claude/settings.json` in your project root (or configure globally at `~/.claude/settings.json`):

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(git *)",
      "Bash(vercel *)"
    ]
  }
}
```

Add the Vercel MCP server (if available through your Claude subscription):

```bash
claude mcp add vercel -- npx -y @vercel/mcp-server
```

This gives Claude Code the ability to check deployment status, read build logs, and monitor your production site — all from the terminal.

Add the memory MCP server for persistent context across sessions:

```bash
claude mcp add memory -- npx -y @anthropic-ai/memory-mcp-server
```

### Hour 15: CLAUDE.md Configuration (3:00 - 4:00)

Create the `CLAUDE.md` file in your project root. This file is the instruction set that Claude Code reads at the start of every session. It defines your project context, your brand voice, your content standards, and your deployment workflow.

```markdown
# My Creator Stack

## Project Overview
Personal creator platform built on the Vibe OS architecture.

## Stack
- Next.js 15+ (App Router, TypeScript, Tailwind)
- Vercel (hosting, deployments, blob storage)
- Supabase (database, auth)
- Resend (transactional email)
- n8n on Railway (automation)

## Content Structure
- Blog posts: `content/blog/*.mdx`
- Images: `public/images/`
- Data: `data/*.json`

## Deployment
Push to `main` branch triggers automatic Vercel deployment.

## Content Standards
- Every factual claim must be verifiable
- Voice: [describe your voice here]
- Author name: [your full name]

## Commands
- `npm run dev` — local development
- `npm run build` — production build
- `vercel --prod` — manual deploy
```

### Hour 16: First AI-Assisted Content Piece (4:00 - 5:00)

This is where the stack comes together. Use Claude Code to create a complete piece of content, end to end.

Open Claude Code in your project directory:

```bash
claude
```

Then give it a task:

```
Write a blog post about [your topic of expertise]. Save it as
content/blog/[slug].mdx with proper frontmatter including title,
description, date, author, and tags. The post should be 1,500 words,
include practical examples, and end with a clear takeaway.
```

Claude Code will:
1. Create the MDX file with proper frontmatter
2. Write the content based on your instructions
3. Save the file to the correct location in your project

Review the output. Edit for voice. Verify any claims. Then deploy:

```bash
git add content/blog/your-new-article.mdx
git commit -m "feat: publish article on [topic]"
git push origin main
```

Vercel deploys. Your article is live. The RSS workflow will detect it on the next cycle. You can trigger the Content Atomizer to generate social variants.

Verification checkpoint: you have created, reviewed, and published a complete article using Claude Code, deployed it to production via Git push, and can generate social media content from it via n8n automation.

---

## VII. The Complete Stack Verification

Before you close your laptop on Sunday evening, run through the full verification checklist:

| Component | Test | Expected Result |
|-----------|------|-----------------|
| Next.js | Visit your production URL | Homepage loads with email signup |
| Blog | Navigate to `/blog/hello-world` | Blog post renders correctly |
| Supabase | Submit the email signup form | New row appears in `subscribers` table |
| Resend | Check your email after subscribing | Welcome email received, not in spam |
| Vercel | Push a change to `main` | Automatic deployment completes |
| RSS | Navigate to `/feed.xml` | Valid RSS XML with your posts |
| n8n | Check workflow execution logs | Schedule trigger has fired at least once |
| Claude Code | Run `claude` in your project directory | Claude loads, reads CLAUDE.md |

If all eight checks pass, your stack is operational.

---

## VIII. What $50 Per Month Gets You

Here is the recurring cost of what you just built:

| Service | Monthly Cost |
|---------|-------------|
| Claude Pro | $20 |
| Vercel Pro (upgrade when ready) | $20 |
| Railway (n8n) | $5-7 |
| Resend | $0 (free tier) |
| Supabase | $0 (free tier) |
| GitHub | $0 (free tier) |
| **Total** | **$45-47** |

For this cost, you have:

- A production website with automatic deployments from Git
- A blog system with MDX content and proper SEO metadata
- An email subscriber database with row-level security
- Automated welcome emails on signup
- An RSS feed for content syndication
- Two automation workflows (RSS monitor and Content Atomizer)
- An AI coding assistant that understands your entire project
- MCP integrations connecting your AI to your infrastructure

This is the infrastructure that previously required a team of five and a budget north of $500,000. The architecture is the same. The capability is comparable. The cost is $50 per month.

---

## IX. The Next 90 Days

The stack is built. The infrastructure is running. The work begins now.

**Week 1-2:** Publish two articles per week. Every article flows through the system: write with Claude Code, review for voice and accuracy, commit to Git, push to deploy, atomize for social distribution. The goal is to establish the rhythm, not to produce masterpieces.

**Week 3-4:** Set up your weekly review. Every Sunday, spend thirty minutes reviewing: what was published, what performed, what is planned for next week. This is Chapter 10 — The Operating Manual — in practice.

**Month 2:** Add complexity gradually. A second n8n workflow. A digital product (a PDF, a template, a checklist). A Stripe integration for paid downloads. Each addition follows the same pattern: build locally, test, deploy, verify.

**Month 3:** Evaluate the compound effect. Is the content library growing? Is the email list growing? Is the quality improving? Are you spending less time on infrastructure and more time on creation? The evidence will tell you.

---

## X. The Final Word

You now have a $50/month creator infrastructure that runs on the same architectural principles as platforms costing a thousand times more. The deployment is automatic. The email is configured. The automation is running. The AI assistant knows your codebase.

The next step is to use it — daily, consistently, for years.

The compound effect handles the rest.

Not the tools. Not the architecture. Not the automation. The compound effect of showing up, creating work that meets your standard, publishing it through a system that handles the distribution, and doing it again tomorrow.

The stack is the foundation. The work is the building. The time is the architect.

Start building.

— Frank Riemer
