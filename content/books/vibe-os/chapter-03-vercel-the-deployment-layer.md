# Vercel -- The Deployment Layer

The deployment layer is where code becomes a live website. For most of computing history, this layer was expensive, fragile, and required a dedicated operations team. You needed servers, load balancers, SSL certificates, CDN configuration, monitoring, log aggregation, and someone to wake up at 3 AM when the deployment pipeline broke.

Vercel eliminated all of that. The deployment model is: push to main, and the site is live in under 60 seconds, served from a global edge network, with automatic SSL, image optimization, and serverless function execution. The cost is $20 per month.

This chapter covers every aspect of the deployment infrastructure: how Vercel works under the hood, how the configuration is set up, what the Pro plan includes, how Blob storage works, and how Claude Code monitors and manages deployments through the Vercel MCP server.

---

## I. Vercel's Architecture

Vercel is not a traditional hosting provider. It is a deployment platform built specifically for frontend frameworks, with Next.js as the primary target. Understanding the architecture explains why it works so well for a creator platform.

### The Edge Network

When you deploy to Vercel, your static assets -- HTML files, images, CSS, JavaScript bundles -- are distributed to edge nodes in 70+ locations worldwide. When a reader in Berlin requests a page, the HTML is served from a Frankfurt edge node. When a reader in Tokyo requests the same page, it is served from a Tokyo edge node. The content is the same; the distance is different.

For a statically generated site like frankx.ai, this means every page loads in under 100ms regardless of the reader's location. No origin server involved. No round-trip to a data center. The edge node has the file and serves it directly.

### Serverless Functions

Dynamic routes and API endpoints deploy as Vercel Serverless Functions. Each function runs in an isolated container that spins up on demand, handles the request, and shuts down. There is no idle server consuming resources. There is no "scaling" to configure. If one person visits the site, one function instance runs. If a thousand people visit simultaneously, a thousand instances run.

The Pro plan provides:

- 1,000 GB-hours of function execution per month
- 100 GB of bandwidth
- 12 concurrent function executions
- 10-second default timeout (configurable up to 300 seconds)
- Node.js 20 runtime

For a creator platform with moderate traffic, these limits are generous. frankx.ai has never approached them.

### Build Pipeline

Every deployment goes through the same pipeline:

1. **Git push** triggers a webhook from GitHub to Vercel
2. Vercel clones the repository and installs dependencies
3. The `prebuild` script runs (search index, RSS feed, content indexes)
4. `next build` compiles the application, generating static pages and serverless functions
5. The output is distributed to the edge network
6. The DNS record is updated to point to the new deployment
7. The previous deployment remains available for instant rollback

The entire process takes 60-90 seconds for frankx.ai. During this time, the previous deployment continues serving traffic. There is zero downtime.

---

## II. The Git-Push Deployment Model

This is the core deployment workflow, and it is worth understanding precisely because of how simple it is.

```bash
# In the production repository
cd /mnt/c/Users/Frank/FrankX/.worktrees/vercel-ui-ux

# Stage and commit changes
git add content/blog/new-article.mdx
git add public/images/blog/new-article-hero.png
git commit -m "feat: publish article on MCP architecture"

# Deploy to production
git push origin main
```

That last command -- `git push origin main` -- is the entire deployment process. Vercel watches the `main` branch of the production repository. When a new commit arrives, the build pipeline triggers automatically.

### Preview Deployments

Every branch and every pull request gets its own preview deployment with a unique URL. If you push to a branch called `draft/new-design`, Vercel deploys it to a URL like `frankx-ai-draft-new-design.vercel.app`. You can share this URL with reviewers, test it on mobile, or verify changes before merging to main.

Preview deployments use the same build pipeline as production. They are not approximations or dev-mode renders. They are full production builds with the only difference being the URL.

For a solo creator, preview deployments serve as a safety net. Before merging a major design change or a new feature, you can verify the preview deployment looks correct, loads correctly, and does not break existing pages.

---

## III. Configuration

Vercel is configured through two files: `vercel.json` for deployment settings, and `next.config.mjs` for the Next.js build.

### vercel.json

The frankx.ai `vercel.json` is minimal:

```json
{
  "framework": "nextjs",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

Three security headers applied to every route. `cleanUrls` removes `.html` extensions from URLs. The `framework` field tells Vercel to use the Next.js build adapter.

### next.config.mjs: The Critical Sections

The Next.js configuration handles four concerns:

**Image optimization.** Vercel automatically optimizes images served through the `next/image` component, converting them to AVIF and WebP formats and serving the right size for each device:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  minimumCacheTTL: 31536000, // Cache for 1 year
}
```

**Console removal.** In production builds, all `console.log` statements are stripped automatically:

```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
}
```

**Redirects.** Twenty-one permanent and temporary redirects handle URL migrations, product page consolidations, and legacy URL support:

```javascript
async redirects() {
  return [
    { source: '/realm', destination: '/inner-circle', permanent: true },
    { source: '/store', destination: '/shop', permanent: true },
    { source: '/ai-art', destination: '/gallery', permanent: true },
    // ... 18 more
  ]
}
```

Redirects are defined in code, not in a hosting dashboard. This means they are version-controlled, reviewable in pull requests, and deployed with the application. When you rename a URL, the redirect ships in the same commit as the new page.

**Content Security Policy.** A comprehensive CSP header controls which domains can load scripts, styles, frames, and connections:

```javascript
headers: [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://plausible.io",
          "frame-src 'self' https://suno.com https://www.youtube.com https://open.spotify.com",
          // ...
        ].join('; '),
      },
    ],
  },
]
```

Every external service that loads in the browser must be explicitly allowed in this policy. When you add a new embed source -- a Spotify player, a YouTube video, a Suno music widget -- you add the domain to the CSP. This is defense-in-depth against XSS attacks and unauthorized script injection.

---

## IV. The outputFileTracingExcludes Save

This deserves its own section because it saved the project from four consecutive deployment failures, and the solution is not well-documented.

Vercel Serverless Functions have a 250MB compressed size limit. When Next.js builds a function, it traces every file imported by that function and bundles them together. For a content-rich site, the public directory can contain hundreds of high-resolution images that get caught in the trace.

The symptom: builds complete successfully but deployments fail with "Function size exceeds maximum." The error does not tell you which files are causing the overflow.

The fix:

```javascript
outputFileTracingRoot: __dirname,
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

The `'*'` key applies the exclusion to all serverless functions. Each glob pattern removes a directory of static assets from the function bundle. These assets are still served by Vercel's static file server -- they are just not included in the serverless function payload.

On frankx.ai, this exclusion reduced the function bundle from approximately 310MB to 180MB, well under the limit. The build time also decreased because fewer files needed to be traced and compressed.

The lesson: when your Vercel deployment fails with a size error, check what the file tracer is including. The fix is almost always excluding static assets, not reducing code.

---

## V. Environment Variables

Vercel manages environment variables through its dashboard, with separate values for Production, Preview, and Development environments. frankx.ai uses the following:

| Variable             | Purpose                              | Environment  |
|----------------------|--------------------------------------|--------------|
| `RESEND_API_KEY`     | Email delivery via Resend            | Production   |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage access        | Production   |
| `KV_REST_API_URL`    | Vercel KV (Redis) for rate limiting  | Production   |
| `KV_REST_API_TOKEN`  | Vercel KV authentication             | Production   |
| `STRIPE_SECRET_KEY`  | Payment processing                   | Production   |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification    | Production   |
| `ADMIN_SECRET`       | Admin API route authentication       | Production   |
| `NEXTAUTH_SECRET`    | Authentication session encryption    | All          |

Environment variables never appear in the codebase. They are set in the Vercel dashboard and injected at build time and runtime. The production repository contains no `.env` file. If someone cloned the repository, they would have the code but none of the secrets.

This is another advantage of the two-repo architecture: the development repo has a `.env` file for local development, but it never touches the production repository.

---

## VI. Vercel Blob Storage

Vercel Blob is object storage integrated into the Vercel platform. It stores files with a permanent, CDN-backed URL. frankx.ai uses it for three categories of binary assets:

### Product Downloads

When a user purchases or requests a product, the PDF is served from Blob storage:

```
https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/
  products/acos/ACOS-Product-Guide-v2.pdf
  products/soulbook/SoulBook-Complete.pdf
  products/gencreator-os/GenCreator-OS-v1.pdf
```

### Music Files

The 61 self-hosted music tracks live on Blob at predictable paths:

```
https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/
  music/{sunoId}/{sunoId}.mp3
```

### The Storage Wrapper

The `lib/storage.ts` file provides a typed interface over the raw Vercel Blob SDK:

```typescript
import { put, list, del, head } from '@vercel/blob'

export async function uploadProductFile(
  productSlug: string,
  filename: string,
  file: Buffer | Blob | ReadableStream,
  contentType?: string
) {
  return put(`products/${productSlug}/${filename}`, file, {
    access: 'public',
    contentType: contentType ?? guessMimeType(filename),
    addRandomSuffix: false,
  })
}
```

The `addRandomSuffix: false` option is critical. By default, Vercel Blob appends a random string to prevent filename collisions. For product downloads, you want stable, predictable URLs that can be referenced from email templates and API routes. Disabling the random suffix means the URL is determined entirely by the path you specify.

### Cost

Blob storage is included in the Vercel Pro plan. The current frankx.ai usage -- approximately 35MB of PDFs and 500MB of music files -- costs nothing incremental. Vercel Blob becomes billable at scale (pennies per GB per month), but for a creator platform, the included storage is more than sufficient.

---

## VII. The Vercel MCP Server

This is where the deployment layer connects to the compute layer. The Vercel MCP server allows Claude Code to interact with Vercel's API directly from the command line.

Available operations:

| Tool                        | Purpose                              |
|-----------------------------|--------------------------------------|
| `list_deployments`          | See recent deployments and status    |
| `get_deployment`            | Get details of a specific deployment |
| `get_deployment_build_logs` | Read build output and errors         |
| `get_runtime_logs`          | View serverless function logs        |
| `get_project`               | Project configuration and settings   |
| `list_projects`             | All projects in the Vercel account   |

The most common workflow: after pushing a commit, Claude Code checks the deployment status by listing recent deployments. If a build fails, it reads the build logs, identifies the error, fixes the code, and pushes a corrected commit. The entire debug-fix-deploy cycle happens within a single conversation.

This eliminates the tab-switching workflow of traditional deployment monitoring. Instead of pushing code, opening the Vercel dashboard in a browser, navigating to the deployment, reading the logs, switching back to the editor, making the fix, and pushing again -- the entire cycle happens in one terminal window.

For verification without a local build (which takes 10-15 minutes in WSL due to NTFS I/O overhead), the Vercel MCP is the authoritative source. The Vercel build runs on fast Linux infrastructure and completes in 60-90 seconds. Checking deployment status through the MCP is faster and more reliable than running `npm run build` locally.

---

## VIII. Cost Analysis: Free vs. Pro

| Feature                    | Hobby (Free)          | Pro ($20/month)           |
|----------------------------|-----------------------|---------------------------|
| Bandwidth                  | 100 GB                | 1 TB                      |
| Serverless execution       | 100 GB-hrs            | 1,000 GB-hrs              |
| Builds per day             | 100                   | 6,000                     |
| Concurrent builds          | 1                     | 12                        |
| Preview deployments        | Unlimited             | Unlimited                 |
| Analytics                  | Basic                 | Advanced                  |
| Image optimization         | 1,000 images/month    | 5,000 images/month        |
| Blob storage               | 250 MB                | Included + pay-per-use    |
| Password protection        | None                  | Available                 |
| Team members               | 1                     | 10                        |

The free tier is sufficient for starting out. Upgrade to Pro when you need advanced analytics, higher bandwidth for growing traffic, or Blob storage beyond 250MB. For frankx.ai, the Pro plan has been the right tier since launch -- the analytics alone justify the $20.

---

## IX. The Deployment Checklist

Before every production push, this checklist runs:

```bash
# Type check -- catches type errors in ~60 seconds
npm run type-check

# Marketing claims audit -- ensures no unverifiable claims
npm run claims:audit:strict

# Link check -- verifies no broken internal links
npm run links:check:ci

# Sync check -- verifies production repo matches development
npm run sync:check
```

These are combined into a single `predeploy` script:

```json
{
  "predeploy": "npm run merge:gate && npm run sync:check"
}
```

The merge gate (`type-check` + `claims:audit:strict` + `links:check:ci`) runs locally before pushing. The Vercel build pipeline runs the full `prebuild` and `next build` on Vercel's infrastructure.

This two-stage verification -- local fast checks, remote full build -- balances speed with thoroughness. You catch most errors in seconds locally and verify the complete build on Vercel's faster hardware.

---

## X. Rollbacks and Recovery

Every Vercel deployment is immutable. When you push a new commit, Vercel creates a new deployment alongside the previous one. The previous deployment remains accessible at its unique URL indefinitely. If the new deployment introduces a bug, rolling back is a single click in the Vercel dashboard -- or a single API call through the Vercel MCP server.

This means production is never at risk. The worst case scenario for a bad deployment is a 30-second rollback to the previous version. There is no "the site is down and we are trying to fix it" state. There is only "the site is serving the previous deployment while we fix the new one."

In practice, the rollback capability has been used twice in six months on frankx.ai -- both times for CSS regressions that were not caught by the type checker (which only catches TypeScript errors, not visual bugs). In both cases, the rollback was executed within five minutes of discovering the issue, and the fix was deployed within the hour.

This is the deployment philosophy in one sentence: make deployments so fast and so reversible that deploying becomes a non-event. When deploying takes 60 seconds and rolling back takes 30, the risk of each deployment approaches zero. And when the risk approaches zero, you deploy more often, which means smaller changes per deployment, which means fewer bugs per deployment. The virtuous cycle compounds.

---

## XI. When to Leave Vercel

No platform is right forever. Here are the signals that would indicate it is time to consider alternatives:

**Serverless function limits.** If your API routes start hitting the 10-second timeout consistently, or if you need long-running background processes (video transcoding, large data processing), you will need a persistent server. Railway, Fly.io, or a dedicated VPS would be better for compute-heavy workloads.

**Cost at scale.** Vercel Pro is exceptional value up to approximately 100,000 monthly page views and moderate API usage. Beyond that, the per-unit pricing for bandwidth, serverless execution, and image optimization starts to matter. At very high scale, a self-hosted Next.js deployment on a dedicated server can be significantly cheaper.

**Vendor lock-in.** Vercel Blob, Vercel KV, and Vercel Analytics are convenient but proprietary. If you use them extensively, migration becomes non-trivial. The mitigation: keep the abstraction layer (like `lib/storage.ts`) between your application code and the Vercel SDK, so you can swap implementations without changing business logic.

For frankx.ai at its current scale, none of these signals are present. The $20/month Pro plan is the correct choice, and is likely to remain so for the foreseeable future.
