Locked: **two-repo architecture.**
Private brain stays private; website stays clean. Here’s the tight, long-term setup that’s simple today.

# Shape of the system

```
FrankX (private)
├─ knowledge/         # drafts, books, newsletter, social, brand voice
├─ pipelines/         # exporters, QA, SEO, image/OG generation
├─ agents/            # local + cloud agents read here
└─ .github/workflows/ # publish pipeline → opens PRs to website repo
        │
        ▼ (bot PRs)
frankx.ai-vercel-website (public)
├─ content/blog/*.mdx
├─ content/pages/*.mdx
├─ public/images/*
└─ Vercel build → live
```

# Content contract (so agents “just work”)

**Private repo → MDX with frontmatter → Website.**

Frontmatter (minimal, stable):

```md
---
id: frankx-{YYYY}-{slug}      # stable canonical id
title: "..."
slug: "{kebab-case}"
date: "2025-09-16"
summary: "1–2 sentences"
tags: ["newsletter","playbook"]
cover: "/images/{slug}.jpg"
status: draft|review|publish
source_sha: "{commit SHA of private doc}"
---
```

Agents write to `knowledge/{pillar}/drafts/*.mdx`.
Exporter only emits files with `status: publish` (or label-driven).

# CI: from private → PR into website

**In the private repo**, add a PAT or GitHub App with write access to the website repo (store as `WEBSITE_REPO_TOKEN`). Then drop this workflow:

`.github/workflows/publish.yml`

```yaml
name: Publish → Website
on:
  workflow_dispatch:
  push:
    paths:
      - 'knowledge/**'
      - 'pipelines/**'
jobs:
  export-and-pr:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: corepack enable && pnpm i
      - name: Export MDX + assets for website
        run: pnpm tsx pipelines/exporters/vercel.ts
      - name: Checkout website repo
        uses: actions/checkout@v4
        with:
          repository: frankxai/frankx.ai-vercel-website
          token: ${{ secrets.WEBSITE_REPO_TOKEN }}
          path: site
      - name: Sync content into website repo working tree
        run: |
          rsync -av --delete exported/content/ site/content/
          rsync -av --delete exported/public/  site/public/
      - name: Create PR
        uses: peter-evans/create-pull-request@v6
        with:
          token: ${{ secrets.WEBSITE_REPO_TOKEN }}
          path: site
          commit-message: "chore(content): sync from FrankX private"
          branch: content/sync-${{ github.run_id }}
          title: "Content sync from FrankX"
          body: |
            Source SHA(s): see contentmap.json
            Auto-generated. Review & merge to publish.
```

**What `pipelines/exporters/vercel.ts` does (sketch):**

* Scan `knowledge/**.{md,mdx}`
* Keep only `status: publish`
* Normalize frontmatter, slugify, inject `source_sha`
* Copy referenced images → `exported/public/images` (optimize with `sharp`)
* Write MDX to `exported/content/blog|pages`
* Generate/update `exported/contentmap.json` (maps `id` ↔ source path/SHA)

Skeleton (TypeScript):

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { globby } from "globby";
import slugify from "@sindresorhus/slugify";

const SRC = "knowledge";
const OUT = "exported";
const OUT_CONTENT = path.join(OUT, "content");
const OUT_PUBLIC  = path.join(OUT, "public", "images");

async function run() {
  await fs.mkdir(OUT_CONTENT, { recursive: true });
  await fs.mkdir(OUT_PUBLIC, { recursive: true });
  const files = await globby([`${SRC}/**/*.{md,mdx}`]);
  const map:any[] = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = matter(raw);
    const fm = parsed.data as any;
    if ((fm.status ?? "draft") !== "publish") continue;

    const slug = fm.slug ?? slugify(fm.title ?? path.parse(file).name);
    const id = fm.id ?? `frankx-${new Date().getFullYear()}-${slug}`;
    const outDir = fm.page ? "pages" : "blog";
    const outPath = path.join(OUT_CONTENT, outDir, `${slug}.mdx`);

    const source_sha = process.env.GITHUB_SHA ?? "local";
    const nextFM = { ...fm, id, slug, source_sha };

    const mdx = matter.stringify(parsed.content.trim(), nextFM);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, mdx, "utf8");

    map.push({ id, slug, out: `${outDir}/${slug}.mdx`, src: file, source_sha });
    // TODO: copy images referenced in MDX into OUT_PUBLIC (regex for ![]() + copy)
  }

  await fs.writeFile(path.join(OUT, "contentmap.json"), JSON.stringify(map, null, 2));
}

run().catch(e => { console.error(e); process.exit(1); });
```

# Website repo (Vercel) basics

* Use **Next.js (App Router) + MDX (Contentlayer or mdx-bundler)**
* Keep all authored content under `/content/**` and images under `/public/images/**`
* Vercel auto-builds on PR → Preview; merge to `main` → Production.

*Optional*: Add `/drafts` route that reads PR previews only (guard behind preview token) for editor review.

# Secrets + security

* Create a **machine user** (e.g., `frankx-bot`) with access to the website repo only.
* Store its PAT in the **private repo** as `WEBSITE_REPO_TOKEN`.
* Keep `OPENAI_API_KEY`, Supabase, etc., **only** in the private repo.
* In website repo, expose only what’s required for rendering (no private keys).

# Agent ops (clear guardrails)

* Agents read only from `knowledge/**` in the private repo.
* Output must be **valid MDX + the frontmatter** above.
* For social/newsletter, exporter can also emit:

  * `/content/social/{date}-{slug}.md` → for a later scheduler
  * RSS/Atom feed update step (optional).

# Risks of split repos (and how we neutralize them)

* **Drift**: Source vs. published copy diverges → we embed `source_sha` in frontmatter + keep `contentmap.json`.
* **Cross-repo friction**: Publishing needs write to website → we use a bot + PRs, not direct pushes.
* **Review chaos**: Editors in both places → enforce **read-only main** on website; all content changes come from PRs opened by the bot.
* **Preview parity**: Use Vercel PR previews; reviewers never touch the private repo.

# Local workflow (Windows)

```
# Private (authoring)
cd C:\Users\Frank\FrankX
pnpm dev           # your agent runner / local preview if you want
git switch -c feat/new-post
# write knowledge/*.mdx (status: publish when ready)
git commit -am "feat(content): new post"
git push
# CI opens PR on website → review → merge → live
```

# “Which template on Vercel?”

Stick to **Next.js App Router + MDX** (Contentlayer) with Tailwind + shadcn/ui. It’s future-proof, MDX-native, and dead simple for the exporter. If you want a docs area later, add Nextra as a separate route or subpath.

---

**Net:** Separate repos are fine. With this pipeline, you keep your **private brain** sealed, your **public site** pristine, and publishing becomes a one-button PR. If you want, I can also drop a PR template + minimal Next.js MDX wiring for the website repo.
