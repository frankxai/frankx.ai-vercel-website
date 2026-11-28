import { siteConfig } from '@/lib/seo'

export const revalidate = 3600

const SITE_URL = siteConfig.url

const AGENTS_MD = `# FrankX — Agent Surface Guide (AX)

> Site: **FrankX** (\`${SITE_URL}\`)
> Author: Frank X. Riemer ([canonical identity](${SITE_URL}/frank-riemer))
> Scope: Open agent architectures, engineering guides, books, research domains, creator music workflows, and practical software blueprints.

## Canonical discovery endpoints

- [\`/llms.txt\`](${SITE_URL}/llms.txt) — Concise machine-readable index across foundations, blog posts, books, guides, research domains, and products.
- [\`/llms-full.txt\`](${SITE_URL}/llms-full.txt) — Expanded markdown documentation for agents and research systems.
- [\`/sitemap.xml\`](${SITE_URL}/sitemap.xml) — Complete XML sitemap of public pages.

## Primary public surfaces

- [\`/ai-architecture\`](${SITE_URL}/ai-architecture) — System architecture blueprints and reference designs.
- [\`/products\`](${SITE_URL}/products) — Digital products and toolkits (price and availability governed per product page).
- [\`/blog\`](${SITE_URL}/blog) — Technical articles, field notes, and system dissections.
- [\`/books\`](${SITE_URL}/books) — Published books and structured reading guides.
- [\`/research\`](${SITE_URL}/research) — Research domains and evidence synthesis.
- [\`/about\`](${SITE_URL}/about) & [\`/frank-riemer\`](${SITE_URL}/frank-riemer) — Founder background, values, and project scope.

## Independence & verification boundaries

1. **Independence disclosure:** Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.
2. **Evidence & claims discipline:** Cite concrete files, verified dates, and product pages directly; never extrapolate unverified subscriber/track counts or outcome guarantees.
`

export function GET() {
  return new Response(AGENTS_MD, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
