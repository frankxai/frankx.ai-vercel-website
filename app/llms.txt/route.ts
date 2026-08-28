import { getAllBlogPosts } from '@/lib/blog'
import { getJournalEntrySummaries } from '@/lib/journal'
import { bookReviews } from '@/data/book-reviews'
import { osModules } from '@/data/os-modules'
import { researchDomains } from '@/lib/research/domains'
import { siteConfig } from '@/lib/seo'
import { askQuestions } from '@/data/ask-questions'

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

  // Private and unpublished entries are filtered out by the loader before they
  // reach here, so this never leaks a note that is not on the public site.
  const journalLinks = getJournalEntrySummaries()
    .slice(0, 20)
    .map((e) => `- [${e.title}](${SITE_URL}/journal/${e.slug}): ${e.summary || e.title}`)
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

  const askLinks = askQuestions
    .map((q) => `- [${q.question}](${SITE_URL}/ask/${q.slug}): ${q.tldr}`)
    .join('\n')

  const content = `# FrankX

> Personal hub of Frank X. Riemer — AI Architect & Creator. 12,000+ AI-generated songs with Suno. ${siteConfig.description}

The site combines enterprise-grade AI architecture (multi-agent orchestration, MCP, agentic SDLC) with creative practice (AI music production, content systems, practical creator workflows). Frank translates lessons from enterprise-scale AI/cloud work into free, personal-scale tooling for creators, individuals, and families. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.

## Foundations
- [Homepage](${SITE_URL}/): Hub with recent work and primary funnels
- [Frank Riemer](${SITE_URL}/frank-riemer): Canonical founder/entity page for Frank Riemer and FrankX
- [About Frank](${SITE_URL}/about): Story, identity, and work patterns
- [Core Qualities](${SITE_URL}/qualities): Freedom, Mastery, Meaning, and Connection — the governing constraints behind FrankX
- [Freedom](${SITE_URL}/qualities/freedom): Agency and optionality as the direction of the system
- [Mastery](${SITE_URL}/qualities/mastery): Inherited craft, durable skill, and judgment as the method
- [Meaning](${SITE_URL}/qualities/meaning): Relevance, purpose, and coherence as the compass
- [Connection](${SITE_URL}/qualities/connection): Trust, belonging, and collective capability as the multiplier
- [Media Kit](${SITE_URL}/media-kit): Press bio, story angles, speaking topics, proof points, boundaries, and contact

## Founder Path
Founder Stack → Foundry or Founder's Circle → Human Layer and Signal Loop.
- [Founder Stack](${SITE_URL}/founder-stack): Diagnose the current constraint across State, Signal, Systems, Scale, and Stewardship
- [Foundry](${SITE_URL}/foundry): Apply for an evaluated operating-system install adapted to the founder's business
- [Founder's Circle](${SITE_URL}/founders-circle): Application-only quarterly strategic AI retainer for consequential decisions
- [Human Layer](${SITE_URL}/human-layer): Evidence-aware founder statecraft governed by established, emerging, experiential, and symbolic lenses
- [Signal Loop](${SITE_URL}/newsletter): Main founder letter, with additional editorial lanes available through the newsletter hub
- [Start Here](${SITE_URL}/start): Founder-led entry spine for new visitors
- [Peak State Systems](${SITE_URL}/peak-performance): Evidence-led attention, energy, recovery, and work-review system; not medical advice
- [Build with Me](${SITE_URL}/build): 5-tier product ladder (€0 Primer to €2,997 Founder's Circle)

## Operating Systems (the FrankX OS spine)
${osLinks}

## Library OS (book intelligence)
- [Library Index](${SITE_URL}/library): All book reviews, sorted by recency
- [Library Approach](${SITE_URL}/library/approach): The manifesto — why books matter for creators
- [Library Build](${SITE_URL}/library/build): How to build your own library OS
- [Library Quotes](${SITE_URL}/library/quotes): Curated quotation collection
${libraryLinks}

## Model & Agent Intelligence (the decision layers)
- [LLM Hub](${SITE_URL}/llm-hub): Every frontier model - context, pricing, benchmarks, verdicts, each entry sourced
- [Model Arena](${SITE_URL}/research/model-arena): First-party measured model rounds with published run receipts
- [Agent Hub](${SITE_URL}/agent-hub): Agent platforms and frameworks compared, every claim carrying an evidence grade
- [Agent Catalog](${SITE_URL}/agents): The 99-agent Creator OS, packaged as installable artifacts
- [LLM Hub JSON](${SITE_URL}/llm-hub.json): Machine-readable model registry for agents

## Research Hub
- [Research Index](${SITE_URL}/research): All research domains
- [Research Sources](${SITE_URL}/research/sources): How research is sourced
- [Research Methodology](${SITE_URL}/research/methodology): Validation rigor
${researchLinks}

## Workshops (live, application or open)
- [Build First AI Agent](${SITE_URL}/workshops/build-first-ai-agent): Multi-path workshop with Vercel AI SDK + 6 branches
- [Ikigai Branding](${SITE_URL}/workshops/ikigai-branding): Brand discovery wizard with Coach GPT
- [AI 2026 Graduates](${SITE_URL}/workshops/ai-2026-graduates): Career path workshop
- [AI Music Masterclass](${SITE_URL}/workshops/ai-music-masterclass): Suno-grade music production

## Ask FrankX (Q&A)
- [Ask FrankX Hub](${SITE_URL}/ask): Practical answers on AI architecture, music production, and creator workflows
${askLinks}

## Tools
- [ROI Calculator](${SITE_URL}/tools/roi-calculator): AI ROI estimator for enterprise
- [Strategy Canvas](${SITE_URL}/tools/strategy-canvas): One-page AI strategy template
- [Builder](${SITE_URL}/tools/builder): Interactive system designer
- [AI Assessment](${SITE_URL}/assessment): Adaptive multi-track quiz

## Personal
- [Papa](${SITE_URL}/papa): Witali Riemer (1969-2018) — Frank's father, Wolgadeutsche, family witness page
- [Familie](${SITE_URL}/familie): Family hub (German + English)
- [Chronicle](${SITE_URL}/chronicle): The reflective layer — weekly Palace, monthly Survey, quarterly Census, annual Audit

## Recent Writing (long-form articles)
${blogLinks}

## Journal (short, dated working notes)
- [Journal](${SITE_URL}/journal): Short dated notes written as the work happens — the unedited counterpart to the long-form articles above
${journalLinks}

## Optional
- [llms-full.txt](${SITE_URL}/llms-full.txt): Comprehensive site map with per-page tldrs (longer; ~50KB)
- [sitemap.xml](${SITE_URL}/sitemap.xml): Full URL inventory
- [rss.xml](${SITE_URL}/rss.xml): Latest 50 posts as RSS 2.0
- [journal/feed.xml](${SITE_URL}/journal/feed.xml): Journal entries as RSS 2.0
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
