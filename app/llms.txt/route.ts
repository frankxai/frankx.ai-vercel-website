import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'
import { osModules } from '@/data/os-modules'
import { researchDomains } from '@/lib/research/domains'
import { siteConfig } from '@/lib/seo'
import { getAllModels } from '@/lib/llm-hub/registry'
import { COMPARISONS } from '@/lib/llm-hub/comparisons'
import { getEditorial } from '@/lib/llm-hub/editorial'
import { getCategories as getGenCategories, getGenModelsByCategory } from '@/lib/models-hub/registry'

const SITE_URL = siteConfig.url

/**
 * /llms.txt — May 2026 AEO surface for AI search engines and agentic crawlers.
 * Spec: https://llmstxt.org/ (concise, link-rich, machine-readable site map)
 *
 * Sibling: /llms-full.txt (comprehensive, includes per-page summaries)
 */
export async function GET() {
  const recentPosts = getAllBlogPosts().slice(0, 20)
  const featuredBooks = bookReviews.slice(0, 12)

  const blogLinks = recentPosts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join('\n')

  const osLinks = osModules
    .map((m) => `- [${m.name}](${SITE_URL}${m.route}): ${m.oneLine}`)
    .join('\n')

  const libraryLinks = featuredBooks
    .map((b) => `- [${b.title} — ${b.author}](${SITE_URL}/library/${b.slug}): ${b.tldr || ''}`)
    .join('\n')

  const researchLinks = researchDomains
    .map((d) => `- [${d.title}](${SITE_URL}/research/${d.slug}): ${d.subtitle}`)
    .join('\n')

  const modelLinks = getAllModels()
    .map((m) => `- [${m.name}](${SITE_URL}/llm-hub/${m.id}): ${getEditorial(m.id)?.tagline || `${m.name} specs, benchmarks, pricing`}`)
    .join('\n')

  const comparisonLinks = COMPARISONS
    .map((c) => `- [${c.title}](${SITE_URL}/llm-hub/compare/${c.slug}): ${c.verdict}`)
    .join('\n')

  const genCategoryBlocks = getGenCategories()
    .map((c) => {
      const models = getGenModelsByCategory(c.id)
        .map((m) => `  - [${m.name}](${SITE_URL}/models/${m.category}/${m.id}): ${m.tagline || m.highlight || ''}`)
        .join('\n')
      return `- [${c.label}](${SITE_URL}/models/${c.id}): ${c.blurb}\n${models}`
    })
    .join('\n')

  const content = `# FrankX

> Personal hub of Frank X. Riemer — AI Architect at Oracle EMEA AI Center of Excellence, creator of 12,000+ AI-generated songs with Suno. ${siteConfig.description}

The site combines enterprise-grade AI architecture (multi-agent orchestration, MCP, agentic SDLC) with creative practice (AI music production, content systems, transformation work). Frank builds AI Center of Excellence frameworks for Fortune 500 companies and translates the same 6-pillar architecture into free, personal-scale tooling for creators, individuals, and families.

## Foundations
- [Homepage](${SITE_URL}/): Hub with recent work and primary funnels
- [About Frank](${SITE_URL}/about): Story, identity, current work
- [Start Here](${SITE_URL}/start): Guided entry point for new visitors
- [Build with Me](${SITE_URL}/products): 5-tier product ladder (€0 Primer to €2,997 Founder's Circle)
- [Founder's Circle](${SITE_URL}/inner-circle): Application-only quarterly cohort

## Operating Systems (the FrankX OS spine)
${osLinks}

## Library OS (book intelligence)
- [Library Index](${SITE_URL}/library): All book reviews, sorted by recency
- [Library Approach](${SITE_URL}/library/approach): The manifesto — why books matter for creators
- [Library Build](${SITE_URL}/library/build): How to build your own library OS
- [Library Quotes](${SITE_URL}/library/quotes): Curated quotation collection
${libraryLinks}

## Research Hub
- [Research Index](${SITE_URL}/research): All research domains
- [Research Sources](${SITE_URL}/research/sources): How research is sourced
- [Research Methodology](${SITE_URL}/research/methodology): Validation rigor
${researchLinks}

## LLM Provider Hub (the decision layer over the frontier model landscape)
- [LLM Hub](${SITE_URL}/llm-hub): Every frontier provider, model, and agentic platform — categorized, priced, with verdicts
- [LLM Hub JSON](${SITE_URL}/llm-hub.json): Machine-readable registry + verdicts + decision matrix for agents
- [Frontier Models Arena](${SITE_URL}/ai-ops/models-2026): Head-to-head benchmark visualization
${modelLinks}

### Model Comparisons (head-to-head)
${comparisonLinks}

## Generative Model Hub (multimodal — image, video, music, voice, embeddings, world)
- [Generative Model Hub](${SITE_URL}/models): Every frontier multimodal model, categorized, with verdicts
- [Generative Model Hub JSON](${SITE_URL}/models.json): Machine-readable multimodal registry for agents
${genCategoryBlocks}

## Workshops (live, application or open)
- [Build First AI Agent](${SITE_URL}/workshops/build-first-ai-agent): Multi-path workshop with Vercel AI SDK + 6 branches
- [Ikigai Branding](${SITE_URL}/workshops/ikigai-branding): Brand discovery wizard with Coach GPT
- [AI 2026 Graduates](${SITE_URL}/workshops/ai-2026-graduates): Career path workshop
- [AI Music Masterclass](${SITE_URL}/workshops/ai-music-masterclass): Suno-grade music production

## Tools
- [ROI Calculator](${SITE_URL}/tools/roi-calculator): AI ROI estimator for enterprise
- [Strategy Canvas](${SITE_URL}/tools/strategy-canvas): One-page AI strategy template
- [Builder](${SITE_URL}/tools/builder): Interactive system designer
- [AI Assessment](${SITE_URL}/assessment): Adaptive multi-track quiz

## Personal
- [Papa](${SITE_URL}/papa): Witali Riemer (1969-2018) — Frank's father, Wolgadeutsche, family witness page
- [Familie](${SITE_URL}/familie): Family hub (German + English)
- [Chronicle](${SITE_URL}/chronicle): The reflective layer — weekly Palace, monthly Survey, quarterly Census, annual Audit

## Recent Writing
${blogLinks}

## Optional
- [llms-full.txt](${SITE_URL}/llms-full.txt): Comprehensive site map with per-page tldrs (longer; ~50KB)
- [sitemap.xml](${SITE_URL}/sitemap.xml): Full URL inventory
- [rss.xml](${SITE_URL}/rss.xml): Latest 50 posts as RSS 2.0
- [Open Source Repos](https://github.com/frankxai): Library OS, SIS, ACOS, and more
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const revalidate = 3600
