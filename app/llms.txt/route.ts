import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'
import { osModules } from '@/data/os-modules'
import { researchDomains } from '@/lib/research/domains'
import { siteConfig } from '@/lib/seo'
import prototypesData from '@/data/ai-architecture/prototypes.json'
import type { ArchitecturePrototype } from '@/types/ai-architecture'
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

  const osLinks = osModules
    .map((m) => `- [${m.name}](${SITE_URL}${m.route}): ${m.oneLine}`)
    .join('\n')

  const libraryLinks = featuredBooks
    .map((b) => `- [${b.title} — ${b.author}](${SITE_URL}/library/${b.slug}): ${b.tldr || ''}`)
    .join('\n')

  const researchLinks = researchDomains
    .map((d) => `- [${d.title}](${SITE_URL}/research/${d.slug}): ${d.subtitle}`)
    .join('\n')

  const blueprintLinks = (prototypesData as ArchitecturePrototype[])
    .filter((b) => b.status === 'published')
    .map((b) => `- [${b.title}](${SITE_URL}/ai-architecture/${b.slug}): ${b.subtitle}`)
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
- [Media Kit](${SITE_URL}/media-kit): Press bio, story angles, speaking topics, proof points, boundaries, and contact
- [Start Here](${SITE_URL}/start): Founder-led entry spine for new visitors
- [Signal Loop](${SITE_URL}/newsletter): Main weekly letter on AI architecture, creator systems, music experiments, and peak-state notes
- [Peak State Systems](${SITE_URL}/peak-performance): Evidence-led attention, energy, recovery, and work-review system; not medical advice
- [Build with Me](${SITE_URL}/build): 5-tier product ladder (€0 Primer to €2,997 Founder's Circle)
- [Founder's Circle](${SITE_URL}/founders-circle): Application-only quarterly cohort

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

## AI Architecture Hub (reference patterns, decisive verdicts, deployable starters)
- [AI Architecture Hub](${SITE_URL}/ai-architecture): Production AI system design — blueprints, live BYOK prototypes, free Deploy-to-Vercel templates, and a curated tool directory
- [Blueprints](${SITE_URL}/ai-architecture/blueprints): Reference architectures with interactive diagrams, "use when / skip when" verdicts, and current cloud-agent-runtime mapping (AWS Bedrock AgentCore, Azure AI Foundry, Google Vertex ADK, Oracle OCI Enterprise AI)
- [Prototypes](${SITE_URL}/ai-architecture/prototypes): Live in-browser BYOK demos — chat playground, RAG tester, agent simulator (bring your own Anthropic/OpenAI/Google/OCI key)
- [Templates](${SITE_URL}/ai-architecture/templates): Free, MIT, one-click Deploy-to-Vercel starter kits
- [Tools](${SITE_URL}/ai-architecture/tools): Curated 2026 stack — agent frameworks, vector DBs, eval/observability, cloud agent runtimes
- [Multi-Cloud Comparison](${SITE_URL}/ai-architecture/multi-cloud-comparison): Same pattern across AWS, Azure, GCP, OCI
- [Methodology](${SITE_URL}/ai-architecture/methodology): How every number is sourced, dated, verified, and retired; how to challenge one; what this reference does not cover
- [Cost & Reliability Dataset](${SITE_URL}/ai-architecture/data): Forkable, denominator-tagged dataset of production-AI statistics — each row carries its N, definition, source, date, and confidence; corrections by PR
- [Benchmark Spine](https://github.com/frankxai/frankx.ai-vercel-website/tree/main/benchmarks): First-party reproducible benchmarks (retrieval miss rate across lexical/dense/hybrid) with harness, corpus, and raw logs — run it yourself
${blueprintLinks}

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
