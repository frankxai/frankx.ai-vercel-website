import { getAllBlogPosts } from '@/lib/blog'
import { getJournalEntrySummaries } from '@/lib/journal'
import { siteConfig } from '@/lib/seo'

const SITE_URL = siteConfig.url

/**
 * Comprehensive machine-readable map. It describes only public routes and
 * keeps offer availability aligned with the human-facing release board.
 */
export async function GET() {
  const allPosts = getAllBlogPosts()

  const blogSection = allPosts
    .map((post) => {
      const summary = post.tldr || post.description || ''
      const tags = post.tags?.length ? ` [${post.tags.slice(0, 5).join(', ')}]` : ''
      return `### ${post.title}
${SITE_URL}/blog/${post.slug}
${post.category || 'AI & Systems'} · ${post.date || 'undated'}${tags}

${summary}
`
    })
    .join('\n')

  const journalSection = getJournalEntrySummaries()
    .map(
      (entry) => `### ${entry.title}
${SITE_URL}/journal/${entry.slug}

${entry.summary || entry.title}
`,
    )
    .join('\n')

  const content = `# FrankX — Comprehensive Site Map

> FrankX is Frank Riemer’s independent studio for bounded agent systems, production patterns, and field notes for creator-operators. The primary service maps one recurring founder-routed workflow and defines its agent decisions, human approvals, evaluations, cost limits, failure paths, and handover.

This is the longer sibling of [/llms.txt](${SITE_URL}/llms.txt). It gives AI systems route context before they fetch individual public pages.

## Entity and editorial boundaries
- **Person:** Frank Riemer
- **Public title:** AI Architect
- **Practice:** Independent
- **Third-party boundary:** FrankX is not affiliated with, endorsed by, or sponsored by Oracle
- **Blog:** Durable essays and guides
- **Journal:** Dated notes from work in progress
- **Offer rule:** A product is not described as purchasable until checkout, delivery, contents, and terms are verified
- **Evidence rule:** Worked examples and client outcomes are not implied when no public artifact exists

## Primary route

The primary service starts with one recurring workflow that still returns to a creator-operator. The work identifies the queue, the decisions an agent may make, the human approvals that remain, the evaluation cases, cost limits, failure path, operating notes, and rollback.

- [Homepage](${SITE_URL}/): Proposition, method, and public proof routes
- [Choose by current state](${SITE_URL}/start): First agent, production reliability, operations, or creator-system routing
- [Work with Frank](${SITE_URL}/work-with-me): Engagement context and contact
- [Frank Riemer](${SITE_URL}/frank-riemer): Canonical person page
- [Media kit](${SITE_URL}/media-kit): Public identity and contact material

## Current build status

- [Build release board](${SITE_URL}/build): Canonical availability source
- [Six Primitives Toolkit](${SITE_URL}/build/six-primitives-toolkit): Intended for builders with a working agent and production gaps in evaluation, observability, cost, or deployment
- **Toolkit status:** Checkout is not open
- **Toolkit planned price:** €197 one-time
- **Toolkit release gate:** Verify files, access path, and refund terms before taking payment
- [Six Primitives Primer](${SITE_URL}/start-here): Free starting route

## Public systems

- [AI Architecture](${SITE_URL}/ai-architecture): Architecture guides and patterns
- [Architecture Blueprints](${SITE_URL}/ai-architecture/blueprints): Reference pattern library
- [Agentic Creator OS](${SITE_URL}/acos): Public creator-operations route
- [GenCreator](${SITE_URL}/gencreator): Repeatable creator-system route
- [Research](${SITE_URL}/research): Public research index
- [MVU field journal](${SITE_URL}/mvu): Tallinn field notes and research
- [Visual Vault](${SITE_URL}/vault): Public visual asset index

## Journal

${journalSection}

## Blog (${allPosts.length} public posts)

${blogSection}

## Machine-readable surfaces

- [Concise map](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [Blog feed](${SITE_URL}/rss.xml)
- [Journal feed](${SITE_URL}/journal/feed.xml)
- [GitHub profile](https://github.com/frankxai): Public repositories; repository status, installation steps, and licenses must be verified at the repository itself
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const revalidate = 3600
