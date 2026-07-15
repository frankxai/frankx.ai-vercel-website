import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'
import { osModules } from '@/data/os-modules'
import { researchDomains } from '@/lib/research/domains'
import { siteConfig } from '@/lib/seo'

const SITE_URL = siteConfig.url

/**
 * /llms-full.txt — comprehensive AEO surface with per-page tldrs.
 * Sibling of /llms.txt (concise). Useful for AI agents that want richer context
 * before deep-fetching individual pages.
 */
export async function GET() {
  const allPosts = getAllBlogPosts()

  const blogSection = allPosts
    .map((p) => {
      const summary = p.tldr || p.description || ''
      const tags = p.tags?.length ? ` [${p.tags.slice(0, 5).join(', ')}]` : ''
      return `### ${p.title}
${SITE_URL}/blog/${p.slug}
${p.category || 'AI & Systems'} · ${p.date || 'undated'}${tags}

${summary}
`
    })
    .join('\n')

  const osSection = osModules
    .map(
      (m) => `### ${m.name}
${SITE_URL}${m.route}
Status: ${m.status} · Color: ${m.color} · Shipped: ${m.shipped}

${m.oneLine}

${m.description || ''}

Connects to: ${m.connectsTo?.join(', ') || 'standalone'}
Artifacts: ${m.artifacts?.slice(0, 5).join(', ') || '—'}
`
    )
    .join('\n')

  const librarySection = bookReviews
    .map(
      (b) => `### ${b.title} — ${b.author}
${SITE_URL}/library/${b.slug}
${b.categories?.join(', ') || ''}${b.publicationYear ? ` · ${b.publicationYear}` : ''}${b.rating ? ` · ${b.rating}/5` : ''}

${b.tldr || ''}

Best for: ${b.bestFor?.slice(0, 3).join('; ') || '—'}
`
    )
    .join('\n')

  const researchSection = researchDomains
    .map(
      (d) => `### ${d.title}
${SITE_URL}/research/${d.slug}
Category: ${d.category}

${d.subtitle}
`
    )
    .join('\n')

  const content = `# FrankX — Comprehensive Site Map (llms-full.txt)

> Personal hub of Frank X. Riemer — former AI architect at Oracle, creator of 12,000+ AI-generated songs with Suno. ${siteConfig.description}

This is the deep-link variant of /llms.txt — designed for AI agents that benefit from per-page summaries before fetching full content. For the concise version see [/llms.txt](${SITE_URL}/llms.txt).

The site combines enterprise-grade AI architecture (multi-agent orchestration, MCP, agentic SDLC) with creative practice (AI music production, content systems, practical creator workflows). Frank translates lessons from enterprise-scale AI/cloud work into free personal-scale tooling for creators. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.

## Brand Voice & Editorial Stance
- **North star:** Elite Creator. AI Architect. Humble Excellence.
- **Title:** "AI Architect" as the standard public title
- **Position:** Bridge between enterprise AI and personal creator tooling
- **Refusal list:** stock-photo people on laptops, generic SaaS hero language ("empower your team", "unlock your potential", "next-level"), spinning loaders >400ms, two equal CTAs, AI-slop phrases ("delve into", "dive deep", "unleash", "harness", "in conclusion")

## Foundations
- [Homepage](${SITE_URL}/): Hub with recent work and primary funnels
- [Frank Riemer](${SITE_URL}/frank-riemer): Canonical founder/entity page for Frank Riemer and FrankX
- [About Frank](${SITE_URL}/about): Story, identity, work patterns
- [Media Kit](${SITE_URL}/media-kit): Press bio, story angles, speaking topics, public proof, editorial boundaries, and contact
- [Start Here](${SITE_URL}/start): Founder-led entry spine for new visitors
- [Signal Loop](${SITE_URL}/newsletter): Main weekly letter on AI architecture, creator systems, music experiments, peak-state notes, and trustworthy human-AI work
- [Peak State Systems](${SITE_URL}/peak-performance): Evidence-led attention, energy, recovery, environment, and review loops; educational, not medical advice
- [Build with Me](${SITE_URL}/build): 5-tier product ladder (€0 Primer / €7 Pack / €197 Toolkit / €497 Mastery / €997 Architect / €2,997 Founder's Circle)
- [Founder's Circle](${SITE_URL}/founders-circle): Application-only quarterly cohort, 10 seats
- [Coaching](${SITE_URL}/coaching): 1:1 advisory across AI architecture, creator strategy, music production
- [Inner Circle](${SITE_URL}/inner-circle): Membership community
- [Newsletter](${SITE_URL}/newsletter): Weekly Creation Chronicles dispatch
- [Work With Me](${SITE_URL}/work-with-me): Studio engagements

## Operating Systems

${osSection}

## Library OS — Book Intelligence

The Library OS is an open-source book intelligence system built on Next.js 16. Each book has a structured deep-dive with TL;DR, key insights, quotes, chapter summaries, FAQ, related reading, and curated videos.

- [Library Index](${SITE_URL}/library): All book reviews
- [Library Approach](${SITE_URL}/library/approach): Manifesto and methodology
- [Library Build](${SITE_URL}/library/build): How to build your own
- [Library Quotes](${SITE_URL}/library/quotes): Curated quotations across all books
- Open source: https://github.com/frankxai/library-os

${librarySection}

## Research Hub

The Research Hub is a multi-agent research operation with daily-scan, deep-research, and synthesis modes. Each domain has validated sources, methodology notes, and a curated reading list.

- [Research Index](${SITE_URL}/research): Domain registry
- [Sources](${SITE_URL}/research/sources): Source validation rules
- [Methodology](${SITE_URL}/research/methodology): How research is conducted

${researchSection}

## Workshops

- [Build First AI Agent](${SITE_URL}/workshops/build-first-ai-agent): Multi-path workshop with Vercel AI SDK + Claude Agent SDK + Google ADK branches
- [Ikigai Branding](${SITE_URL}/workshops/ikigai-branding): Brand discovery wizard with persistent Coach GPT
- [AI 2026 Graduates](${SITE_URL}/workshops/ai-2026-graduates): Career path workshop for technical graduates
- [AI Music Masterclass](${SITE_URL}/workshops/ai-music-masterclass): Suno-grade music production with frequency science

## Personal

- [Papa](${SITE_URL}/papa): Witali Riemer (1969-2018) — Frank's father. Wolgadeutsche heritage, life timeline, witness page in German + English
- [Familie](${SITE_URL}/familie): Family hub
- [Chronicle](${SITE_URL}/chronicle): The reflective layer of FrankX OS — weekly Palace Review, monthly Survey, quarterly Constellation Census, annual Legacy Audit

## All Recent Writing (full list, ${allPosts.length} posts)

${blogSection}

## API Surfaces (for agentic interaction)

- [/api/og](${SITE_URL}/api/og): Dynamic OG image generation
- [/api/subscribe](${SITE_URL}/api/subscribe): Newsletter signup endpoint
- [/api/coaching-apply](${SITE_URL}/api/coaching-apply): Coaching application form
- [/api/cohort/apply](${SITE_URL}/api/cohort/apply): Cohort application form

## Open Source Repositories

- [Library OS](https://github.com/frankxai/library-os): MIT-licensed book intelligence system
- [Starlight Intelligence System](https://github.com/frankxai/Starlight-Intelligence-System): MIT-licensed substrate (memory palace, IS layers, voice operator)
- [GitHub profile](https://github.com/frankxai): All public repos

## Useful References

- [llms.txt](${SITE_URL}/llms.txt): Concise site map (sibling file)
- [sitemap.xml](${SITE_URL}/sitemap.xml): Full URL inventory
- [rss.xml](${SITE_URL}/rss.xml): RSS 2.0 feed (50 latest posts)
- [Newsletter archive](${SITE_URL}/newsletter): Past weekly dispatches

---
Generated dynamically from canonical source files. Last updated: ${new Date().toISOString()}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const revalidate = 3600
