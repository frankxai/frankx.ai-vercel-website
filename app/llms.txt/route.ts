import { getAllBlogPosts } from '@/lib/blog'
import { getAllGuides } from '@/lib/guides'
import { getJournalEntrySummaries } from '@/lib/journal'
import { bookReviews } from '@/data/book-reviews'
import { libraryCollections } from '@/data/library-collections'
import { osModules } from '@/data/os-modules'
import { researchDomains } from '@/lib/research/domains'
import { contentLicense, siteConfig } from '@/lib/seo'
import { getProductCards, productPublicPath } from '@/lib/products'
import { askQuestions } from '@/data/ask-questions'
import { getPublishedBooks } from '@/app/books/lib/books-registry'

const SITE_URL = siteConfig.url

/**
 * /llms.txt — May 2026 AEO surface for AI search engines and agentic crawlers.
 * Spec: https://llmstxt.org/ (concise, link-rich, machine-readable site map)
 *
 * Sibling: /llms-full.txt (comprehensive, includes per-page summaries)
 */
export async function GET() {
  const recentPosts = getAllBlogPosts().slice(0, 20)
  const guideLinks = getAllGuides()
    .slice(0, 12)
    .map((g) => `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.description}`)
    .join('\n')
  const featuredSlugs = new Set(libraryCollections.flatMap(collection => collection.featured.slice(0, 1)))
  const featuredBooks = bookReviews.filter(book => featuredSlugs.has(book.slug))

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
    .map((b) => `- [${b.title} — ${b.author}](${SITE_URL}/library/${b.slug}): ${b.guide ? `${b.guide.kind}; editorial reading guide with source and edition links. ` : b.capture ? 'Reading field note. ' : 'Book review. '}${b.tldr || ''}`)
    .join('\n')

  // Frank's own books (distinct from the reviewed-books library above).
  const bookLinks = getPublishedBooks('en')
    .map((b) => `- [${b.title}](${SITE_URL}/books/${b.slug}): ${b.subtitle ? `${b.subtitle}. ` : ''}${b.description}`)
    .join('\n')

  const researchLinks = researchDomains
    .map((d) => `- [${d.title}](${SITE_URL}/research/${d.slug}): ${d.subtitle}`)
    .join('\n')

  // Product pages that exist at /products/<slug>. Headlines come from
  // data/products.json; price and availability stay on each product page.
  const productLinks = getProductCards()
    .map((p) => `- [${p.name}](${SITE_URL}${productPublicPath(p.href.slice('/products/'.length))}): ${p.headline}`)
    .join('\n')

  const askLinks = askQuestions
    .map((q) => `- [${q.question}](${SITE_URL}/ask/${q.slug}): ${q.tldr}`)
    .join('\n')

  const content = `# FrankX

> Personal hub of Frank X. Riemer, AI Architect and Creator. Songs made with Suno. ${siteConfig.description}

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

## Editorial & Playbooks
- [FrankX Magazine](${SITE_URL}/magazine): Editorial front page: cover story, architecture and infrastructure, agents and creator systems, intelligence dispatches, music and creativity, books, guides, and working notes
- [AI Agent Playbooks](${SITE_URL}/playbooks): Five-step build order for AI agents: AI computer and stack, first agents and SKILL.md skills, running agents as a crew, production architecture, and paid engagements
- [AI Computer Field Guide](${SITE_URL}/ai-computer): Workstations, cloud GPUs, AI mini PCs, DGX Spark, and private AI factory setups for founders and creators

## Books (free to read online)
${bookLinks}
- [Library](${SITE_URL}/books): All published FrankX books

## Claude Code, Agent Skills & MCP
- [Claude Code & Agent Skills Hub](${SITE_URL}/skills): Reusable SKILL.md modules, skill builder, and agent installation workflows
- [Skills Catalog](${SITE_URL}/resources/skills): Curated agent skills across coding, content, research, and operations
- [Implementation Guides](${SITE_URL}/guides): Step-by-step guides across Claude Code, MCP servers, voice workflows, and agent systems
${guideLinks}
- [Claude Skills Library (GitHub)](https://github.com/frankxai/claude-skills-library): Open repository of modular SKILL.md definitions and evaluation harnesses
- [MCP Doctor (GitHub)](https://github.com/frankxai/mcp-doctor): Diagnostic CLI for Model Context Protocol server configurations

## AI Architecture & Blueprints
- [AI Architecture Hub](${SITE_URL}/ai-architecture): Production reference architectures, cost estimators, and governance patterns
- [Architecture Blueprints](${SITE_URL}/ai-architecture/blueprints): Interactive diagrams and specifications for RAG, multi-agent systems, and LLM gateways
- [Starter Templates](${SITE_URL}/ai-architecture/templates): Implementation kits and reference topologies
- [Multi-Cloud AI Comparison](${SITE_URL}/ai-architecture/multi-cloud-comparison): Side-by-side comparison of AWS Bedrock, Azure AI Foundry, Google Vertex AI, and OCI GenAI
- [Architecture Tools](${SITE_URL}/ai-architecture/tools): Curated frameworks, vector stores, and observability stacks

## Founder Path
Founder Stack → Foundry or Founder's Circle → Human Layer and Signal Loop.
- [Founder Stack](${SITE_URL}/founder-stack): Diagnose the current constraint across State, Signal, Systems, Scale, and Stewardship
- [Foundry](${SITE_URL}/foundry): Apply for an evaluated operating-system install adapted to the founder's business
- [Founder's Circle](${SITE_URL}/founders-circle): Application-only quarterly strategic AI retainer for consequential decisions
- [Human Layer](${SITE_URL}/human-layer): Evidence-aware founder statecraft governed by established, emerging, experiential, and symbolic lenses
- [Signal Loop](${SITE_URL}/newsletter): Main founder letter, with additional editorial lanes available through the newsletter hub
- [Start Here](${SITE_URL}/start): Founder-led entry spine for new visitors
- [Peak State Systems](${SITE_URL}/peak-performance): Evidence-led attention, energy, recovery, and work-review system; educational, see page disclosures
- [Build with Me](${SITE_URL}/build): Product ladder: see /build; prices on each product page.

## Products
Each product page states its own price and whether it is available now, on a waitlist, or by application.
- [Products](${SITE_URL}/products): Index of FrankX products
${productLinks}

## Resources
- [Resources](${SITE_URL}/resources): Templates, playbooks, affiliate programs, and GitHub repo maps
- [Templates](${SITE_URL}/resources/templates): Downloadable AI implementation and governance templates
- [Builder stack](${SITE_URL}/resources/builder-stack): Design, publishing, and payment tools, with which programs are open or closed
- [SEO and AEO workflow](${SITE_URL}/resources/seo-aeo): Turn search evidence into a reviewable website change; free evidence and measurement templates

## Operating Systems (the FrankX OS spine)
${osLinks}

## Model & Agent Intelligence (the decision layers)
- [Images 2.5 creator and founder analysis](${SITE_URL}/blog/chatgpt-images-2-5-creator-founder-workflows): Release facts, model choice, product opportunities and evidence limits
- [Reference-to-campaign guide](${SITE_URL}/guides/reference-to-campaign): Practical steps, reusable prompts, acceptance checks and product-specific handoffs
- [Image workflow protocol JSON](${SITE_URL}/research/image-workflows/protocol.json): Versioned tasks, scoring rubric and agent instructions; planned evaluation, zero measured runs
- [Image workflow routing JSON](${SITE_URL}/research/image-workflows/routes.json): User intent, existing destinations and proposed product capabilities, explicitly distinguished

- [LLM Hub Manifest](${SITE_URL}/llm-hub/manifest.json): Versioned discovery document for models, candidate policies, historical editorial comparisons and public evaluation receipts; does not certify production routing.
- [LLM Hub](${SITE_URL}/llm-hub): Every frontier model - context, pricing, benchmarks, verdicts, each entry sourced
- [Cost Calculator](${SITE_URL}/llm-hub#cost-calculator): Interactive token volume and multi-tier routing simulator
- [Model Arena](${SITE_URL}/research/model-arena): First-party measured model rounds with published run receipts
- [Model Arena Receipts JSON](${SITE_URL}/research/model-arena/receipts.json): Machine-readable receipts manifest — lastMeasured: null means nothing measured yet; carry it through rather than substituting a date
- [Agent Hub](${SITE_URL}/agent-hub): Agent platforms and frameworks compared, every claim carrying an evidence grade
- [AI Architecture Field Guide & Blueprints](${SITE_URL}/ai-architecture): Production-grade blueprints for multi-agent orchestration, RAG pipelines & MCP meshes
- [Agent Catalog](${SITE_URL}/agents): The 99-agent Creator OS, packaged as installable artifacts
- [LLM Hub JSON](${SITE_URL}/llm-hub.json): Model rows with pricing source, scope, API ID and registry evaluation status

## Canva Founder System
- [Canva for Founders](${SITE_URL}/canva): Independent, source-led operating system for governed visual production
- [Canva MCP implementation guide](${SITE_URL}/guides/canva-mcp-for-founders): Setup, approval boundaries, and the FrankX agent graph
- [Canva agent-readable brief](${SITE_URL}/canva/llms.txt): Concise claims, relationship disclosure, key pages, and first-party sources

## Voice-first operations
- [Wispr Flow guide](${SITE_URL}/guides/wispr-flow): Setup, spoken-brief protocol, pricing checked against the vendor page, privacy controls and role-specific workflows; contains affiliate links, disclosed on the page
- [Voice typing learning path](${SITE_URL}/learn/voice-typing): Curated tutorials and the official Wispr Flow walkthrough
- [Wispr Flow vs Superwhisper vs MacWhisper vs Willow](${SITE_URL}/blog/wispr-flow-vs-superwhisper-vs-macwhisper-vs-willow): Processing location, platforms, listed pricing and which reader each tool fits

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

## Agent access
- [Developer notes](${SITE_URL}/developers): FrankX developer hub. MCP architecture and how the public tools fit together.
- [Public API catalog](${SITE_URL}/api/v1): JSON list of the public read routes, with authentication notes and example requests.
- [OpenAPI](${SITE_URL}/openapi.json): OpenAPI 3.1 document, application/vnd.oai.openapi+json;version=3.1.
- [API catalog (RFC 9727)](${SITE_URL}/.well-known/api-catalog): Linkset (application/linkset+json) of those same reads.
- Unknown /api paths return application/problem+json (RFC 9457). The code is api_route_not_found. The resolution points at the RFC 9727 catalog.
- [MCP endpoint](${SITE_URL}/api/mcp): Read-only Model Context Protocol server (Streamable HTTP, no key). Tools: frankx_search_site, frankx_get_article, frankx_list_products. Anonymous POST is limited to 30 requests per minute per address; a 429 means wait and retry. Claude Code: \`claude mcp add --transport http frankx ${SITE_URL}/api/mcp\`
- [MCP server card](${SITE_URL}/api/mcp/server-card): application/mcp-server-card+json. It names the transport. Tools stay on the live server.
- [AI catalog (SEP-2127)](${SITE_URL}/.well-known/ai-catalog.json): Domain discovery entry pointing at that server card.
- [Markdown export](${SITE_URL}/api/md?path=/blog/agentic-ai-roadmap-2025): Any article as plain markdown; replace the path with /blog/<slug>

## Optional
- [llms-full.txt](${SITE_URL}/llms-full.txt): Comprehensive site map with per-page tldrs (longer; ~50KB)
- [Library Index](${SITE_URL}/library): Cultural reading notes: searchable book reviews, reading field notes, and editorial reading guides; six curated collections
- [Library Approach](${SITE_URL}/library/approach): Why books matter for builders and creators
- [Library Build](${SITE_URL}/library/build): How to build your own library OS
- [Library Quotes](${SITE_URL}/library/quotes): Curated quotation collection
${libraryLinks}
- [sitemap.xml](${SITE_URL}/sitemap.xml): Full URL inventory
- [rss.xml](${SITE_URL}/rss.xml): Latest 50 posts as RSS 2.0
- [journal/feed.xml](${SITE_URL}/journal/feed.xml): Journal entries as RSS 2.0
- [Open Source Repos](https://github.com/frankxai): Library OS, SIS, ACOS, and more

## Licence
Written content on frankx.ai: ${contentLicense.notice} Terms: [${contentLicense.url}](${contentLicense.url}). Each article declares its canonical URL with <link rel="canonical">.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const revalidate = 3600
