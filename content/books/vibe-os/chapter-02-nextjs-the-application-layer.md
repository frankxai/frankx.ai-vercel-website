# Next.js -- The Application Layer

Every creator platform needs a place where content becomes a page, a page becomes a route, and a route becomes a URL that someone can find, read, and share. That place is the application layer. For frankx.ai, the application layer is Next.js.

This chapter explains why Next.js is the right framework for a creator platform, how the actual application is structured, and how the key systems -- blog, books, API routes -- work at the code level. No hand-waving. Real files, real patterns, real decisions.

---

## I. Why Next.js

The framework decision is the most consequential technical choice in the entire stack. Everything downstream -- hosting, deployment, rendering strategy, content pipeline -- depends on what you choose here. I chose Next.js 16 with the App Router for five reasons.

**File-system routing.** Every file in the `app/` directory becomes a route. `app/blog/page.tsx` becomes `/blog`. `app/books/[slug]/page.tsx` becomes `/books/love-and-poetry`. There is no routing configuration file. The file tree is the sitemap. This means a creator can add a new section to the website by creating a folder, and the infrastructure handles the rest.

**Server Components by default.** In the App Router, every component is a Server Component unless you mark it otherwise with `'use client'`. Server Components render on the server, send HTML to the browser, and never ship JavaScript to the client. For a content-heavy site like frankx.ai, this means most pages load with zero client-side JavaScript. The blog, the books, the about page -- all pure HTML.

**MDX support.** Blog posts and book chapters are written in MDX -- Markdown with embedded React components. This means content is authored in plain text (fast to write, easy to diff, trivial to version-control) but can include interactive components when needed. A blog post can contain a code block, a comparison table, an embedded audio player, or a lead capture form, all within the same Markdown file.

**API routes.** Any file at `app/api/*/route.ts` becomes a serverless API endpoint. frankx.ai has 35 API routes handling everything from PDF delivery to Stripe checkout to coaching applications. These run as Vercel Serverless Functions with zero infrastructure management.

**Static generation with escape hatches.** Next.js can statically generate pages at build time (SSG), render them on the server per request (SSR), or incrementally revalidate them (ISR). For a creator platform, this flexibility is essential: blog posts are static (they change rarely), the homepage is statically generated (fast load times), but API routes are dynamic by nature.

---

## II. The Application Structure

Here is the actual directory structure of the `app/` folder in frankx.ai, simplified to show the architecture:

```
app/
  page.tsx              # Homepage
  layout.tsx            # Root layout (nav, footer, providers)
  about/page.tsx        # /about
  blog/
    page.tsx            # /blog (listing)
    [slug]/page.tsx     # /blog/any-article-slug (dynamic)
  books/
    page.tsx            # /books (listing)
    [slug]/
      page.tsx          # /books/love-and-poetry
      [chapter]/page.tsx # /books/love-and-poetry/chapter-01
    lib/
      books-registry.ts # Book configuration and metadata
  coaching/page.tsx     # /coaching
  music/
    page.tsx            # /music
    learn/
      piano/page.tsx    # /music/learn/piano
      violin/page.tsx   # /music/learn/violin
  api/
    send-pdf/route.ts   # PDF email delivery
    checkout/route.ts   # Stripe checkout
    coaching-apply/route.ts
    download/route.ts   # Product downloads
    welcome-sequence/route.ts
    ... (35 routes total)
```

Every page follows the same pattern: a `page.tsx` file exports a default React component that returns JSX and an exported `metadata` object (or `generateMetadata` function) that provides SEO data.

### The Homepage Pattern

The homepage is the simplest example of how a Next.js page works in this architecture:

```typescript
// app/page.tsx
import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/blog'
import { getPublishedBooks } from '@/app/books/lib/books-registry'

export const metadata = createMetadata({
  title: 'FrankX -- AI Architect & Creator',
  description: 'AI Architect & Creator...',
  path: '/',
})

export default function Page() {
  const latestPosts = getAllBlogPosts().slice(0, 6)
  const books = getPublishedBooks()

  return <HomePageElite latestPosts={latestPosts} books={books} />
}
```

This is a Server Component. It reads blog posts and books from the filesystem at build time, passes them as props to the UI component, and ships zero JavaScript to the browser. The `createMetadata` utility generates the full SEO metadata object -- title, description, Open Graph tags, Twitter cards, canonical URL -- from a simple input.

---

## III. The Blog System

The blog is the highest-traffic section of the site and the most architecturally interesting. It demonstrates how MDX, dynamic routing, static generation, and structured data work together.

### Content as Files

Every blog post is a single `.mdx` file in `content/blog/`:

```
content/blog/
  ai-doesnt-have-to-be-soulless.mdx
  agentic-creator-os.mdx
  golden-age-of-intelligence.mdx
  props-to-the-builders-of-this-era.mdx
  suno-prompt-engineering-complete-guide.mdx
  ...
```

Each file has YAML frontmatter at the top:

```yaml
---
title: "The Complete Guide to Suno Prompt Engineering"
description: "The 5-Layer Prompt Architecture..."
date: "2026-01-15"
author: "Frank Riemer"
category: "AI Music"
tags: ["suno", "prompt engineering", "music production"]
image: "/images/blog/suno-prompt-engineering-complete-guide-hero.png"
keywords: ["suno ai prompts", "ai music production"]
tldr: "A systematic approach to Suno prompt engineering..."
---
```

Below the frontmatter is standard Markdown with optional React component embeds.

### The Content Library

The `lib/blog.ts` file is the entire blog backend. It reads every `.mdx` file from the filesystem, parses the frontmatter with `gray-matter`, calculates reading time, normalizes field names, and returns typed `BlogPost` objects:

```typescript
// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { cache } from 'react'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export const getAllBlogPosts = cache((): BlogPost[] => {
  const fileNames = fs.readdirSync(blogDirectory)
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)
      return { slug, content, readingTime: readTime.text, ...data }
    })
    .sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1)
})
```

Notice the `cache()` wrapper from React. This memoizes the function so that if multiple components on the same page call `getAllBlogPosts()`, the filesystem is read only once. This is a React Server Component optimization that eliminates redundant I/O without any caching infrastructure.

There is no database. There is no CMS. The filesystem is the database. `git log` is the audit trail. `git diff` is the content review process.

### Dynamic Routing

The dynamic blog route at `app/blog/[slug]/page.tsx` handles every individual blog post URL. The `[slug]` directory name tells Next.js this is a dynamic segment -- the URL parameter is extracted and passed to the page component.

Two functions make this work:

```typescript
// Generate all possible slugs at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Generate SEO metadata for each post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
  })
}
```

`generateStaticParams` tells Next.js every valid slug at build time, so it can pre-render every blog post as static HTML. The `dynamicParams = false` export tells Next.js to return a 404 for any slug not in the list. No server-side rendering required. No database queries at runtime.

### FAQ Extraction and Structured Data

Every blog post automatically generates Schema.org structured data. The `extractFAQFromContent` function parses the Markdown content for FAQ sections and converts them into FAQPage schema:

```typescript
export function extractFAQFromContent(content: string) {
  const faqMatch = content.match(
    /^## (?:FAQ|Frequently Asked[^\n]*)\n([\s\S]*?)(?=\n## |$)/m
  )
  if (!faqMatch) return []
  // Parse Q&A patterns from the section
}
```

This means every blog post that includes an FAQ section automatically gets rich search results in Google -- no manual schema markup required. The content is the configuration.

---

## IV. The Books System

The books system follows the same file-based architecture but adds a registry layer for metadata and theming.

### The Books Registry

Every book is defined in `app/books/lib/books-registry.ts` as a typed configuration object:

```typescript
export const booksRegistry: BookConfig[] = [
  {
    slug: 'love-and-poetry',
    title: 'Love & Poetry',
    subtitle: 'Verses Across Time and Tongue',
    author: 'Frank Riemer',
    coverImage: '/images/books/love-and-poetry-cover.png',
    theme: {
      primary: 'rose',
      accent: 'gold',
      bgDark: '#0a0a0f',
      headingFont: 'serif',
      bodyFont: 'serif',
    },
    status: 'published',
    contentDir: 'content/books/love-and-poetry',
    chapters: [
      { slug: 'chapter-01-rumi-speaks', title: 'Rumi Speaks', ... },
      { slug: 'chapter-02-dichter-der-liebe', title: 'Dichter der Liebe', ... },
    ],
  },
  // ... 7 more books
]
```

Each book has its own visual theme -- colors, typography, background -- so that reading "Love & Poetry" feels different from reading "Spartan Mindset." The registry is the source of truth. Chapter content lives as MDX files in the book's `contentDir`.

The registry also supports multilingual variants. The "Hope" book exists as both `hope` (English) and `hoffnung` (German), linked by a `variantGroup` field. The `getPublishedBooks(locale)` function returns the correct variant based on the reader's language preference.

---

## V. API Routes as Serverless Functions

Every file at `app/api/*/route.ts` becomes a serverless function. These are backend endpoints that run on-demand, with no server to manage and no uptime to monitor.

A typical API route follows this pattern:

```typescript
// app/api/send-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'

export async function POST(request: NextRequest) {
  // Rate limiting
  const identifier = getClientIdentifier(request)
  const { success } = await emailRatelimit.limit(identifier)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429 }
    )
  }

  // Validate, process, respond
  const resend = new Resend(process.env.RESEND_API_KEY)
  // ... send email, store lead, return response
}
```

The 35 API routes on frankx.ai handle:

- **Content delivery:** PDF downloads, product file serving
- **Email operations:** Welcome sequences, PDF delivery, coaching applications
- **Commerce:** Stripe checkout sessions, webhook handlers
- **Analytics:** Download tracking, view tracking, dashboard data
- **Admin:** Content inventory, file uploads, YouTube metadata
- **Integration:** n8n webhook receivers, content studio triggers

Each route is isolated, stateless, and independently deployable. A failure in the checkout route does not affect the blog. A spike in PDF downloads does not slow down the homepage.

---

## VI. The outputFileTracingExcludes Pattern

This is the most important optimization in the entire Next.js configuration, and the one most likely to save you from failed deployments.

Vercel Serverless Functions have a 250MB compressed size limit. When Next.js builds a serverless function, it traces every file that the function imports, directly or transitively, and bundles them together. For a content-heavy site with hundreds of images in the `public/` directory, this trace can easily exceed the limit.

The fix is `outputFileTracingExcludes` in `next.config.mjs`:

```javascript
outputFileTracingExcludes: {
  '*': [
    './public/images/blog/**',
    './public/images/mascot/**',
    './public/images/acos/**',
    './public/images/golden-age/**',
    './public/images/arcanea/**',
    './public/reading/**',
  ],
},
```

This tells Next.js: when tracing file dependencies for serverless functions, exclude these image directories. The images are still served by Vercel's static file server -- they just are not bundled into the serverless function payload.

This single configuration saved frankx.ai from four consecutive failed deployments. The error message was opaque ("Function size exceeds maximum"), the documentation was sparse, and the fix was a six-line configuration change. This is the kind of knowledge that saves hours of debugging.

---

## VII. Rendering Strategy Decision Framework

Not every page should render the same way. Here is the decision framework used for frankx.ai:

| Page Type        | Strategy | Why                                            |
|------------------|----------|------------------------------------------------|
| Blog posts       | SSG      | Content changes rarely, maximum performance    |
| Book chapters    | SSG      | Same as blog, static content                   |
| Homepage         | SSG      | High traffic, content updates via rebuild      |
| Product pages    | SSG      | Stable content, fast load for conversions      |
| API routes       | Dynamic  | Inherently request-dependent                   |
| Search           | Client   | Requires user input, runs Lunr.js in browser   |
| Admin dashboard  | Dynamic  | Authenticated, data-fresh requirements         |
| OG image API     | Dynamic  | Generated per-request based on URL parameters  |

**SSG (Static Site Generation)** means the page is built once and served as a static file. This is the fastest possible delivery and the cheapest to serve. Use it for any page where the content does not change between deployments.

**Dynamic** means the page or route is executed per request. Use it for anything that depends on the request context: authentication, form submissions, real-time data.

**Client** means the rendering happens in the browser after the page loads. Use it sparingly -- only when the feature requires user interaction before it can render anything meaningful.

The default should always be SSG. Start static, add dynamism only when the feature demands it. This is the opposite of most web development instincts, which default to dynamic rendering and optimize later. In a creator platform, static-first is a performance multiplier that costs nothing to maintain.

---

## VIII. The Prebuild Pipeline

Next.js supports a `prebuild` script in `package.json` that runs before every build. frankx.ai uses this to generate derived data that the application needs:

```json
{
  "prebuild": "npm run gen:html && npm run gen:feed && npm run gen:search && npm run content:index && npm run newsletter:index && npm run vault:scan && npm run heroes:scan"
}
```

Each script generates a JSON or HTML artifact:

- `gen:html` -- Generates interlinked HTML pages for SEO
- `gen:feed` -- Generates RSS/Atom feed from blog posts
- `gen:search` -- Builds a Lunr.js search index from all content
- `content:index` -- Indexes YouTube content metadata
- `newsletter:index` -- Generates content index for newsletter system
- `vault:scan` -- Scans and manifests all downloadable assets
- `heroes:scan` -- Catalogs blog hero images for responsive loading

This pipeline runs in seconds and ensures that every build has fresh derived data without requiring a database or external API call. The source of truth is always the filesystem. The derived data is always regenerated.

This is the architectural principle in action: files in, files out, no state to manage, no cache to invalidate, no database migration to run. The entire content system is a pure function of the repository contents.

---

## IX. The Metadata System

Every page on frankx.ai has structured metadata generated by the `createMetadata` utility in `lib/seo.ts`. This function takes a simple input and produces the complete metadata object that Next.js uses for SEO:

```typescript
export const metadata = createMetadata({
  title: 'FrankX -- AI Architect & Creator',
  description: 'AI Architect & Creator...',
  path: '/',
  type: 'website',
  image: '/images/brand/og-template.png',
  keywords: ['ai architect', 'creator tools'],
})
```

This generates:

- HTML `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:image`)
- Canonical URL
- Robots directives
- Author and publisher metadata

The utility centralizes all metadata logic in one place. When Google changes their title length recommendations, or when Twitter updates their card format, you update one function and every page benefits.

For blog posts, the metadata is generated dynamically using `generateMetadata`, which reads the frontmatter from the MDX file:

```typescript
export async function generateMetadata({ params }) {
  const post = getBlogPost(slug)
  return createMetadata({
    title: post.title,
    description: post.description,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    keywords: post.keywords,
  })
}
```

This means every blog post automatically has correct, complete SEO metadata. No manual tag creation. No forgotten Open Graph images. The content itself provides the data; the infrastructure provides the format.

---

## X. Why This Architecture Scales

The file-based architecture of frankx.ai might seem like it would break at scale. Hundreds of blog posts, dozens of books, thousands of images -- surely at some point you need a database?

The answer, for a creator platform, is almost certainly no. Here is why:

**Build-time data.** Blog posts and book chapters are read at build time, not at runtime. Whether you have 10 posts or 10,000, the filesystem read happens once during `next build`. The resulting static HTML is served from a CDN with no filesystem access needed.

**React caching.** The `cache()` wrapper on `getAllBlogPosts()` ensures that even during a single build, multiple components calling the same function share one filesystem read. This is React's built-in request deduplication.

**Incremental adoption.** If a specific feature outgrows the filesystem -- say, user-generated content that requires real-time writes -- you can add a database for that feature while keeping everything else file-based. Next.js does not require a uniform data strategy across all routes. The blog can stay on the filesystem while comments use Supabase. Each route chooses its own data source.

**Git as the audit trail.** Every content change is a git commit with a timestamp, author, and diff. This is a better audit trail than most databases provide. You can answer "who changed what and when" with `git log`, and you can revert any change with `git revert`.

The file-based architecture is not a limitation. It is a deliberate choice that eliminates an entire category of infrastructure (database hosting, migrations, connection pooling, backup schedules) in exchange for a constraint that a creator platform naturally satisfies: content changes are made by the creator, not by anonymous users, and they happen at human speed, not machine speed.
