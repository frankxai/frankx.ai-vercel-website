import { getAllBlogPosts } from '@/lib/blog'
import { getJournalEntrySummaries } from '@/lib/journal'
import { siteConfig } from '@/lib/seo'

const SITE_URL = siteConfig.url

/**
 * Concise, source-bound map for AI search systems and agents.
 * Product status and the primary proposition mirror the human-facing pages.
 */
export async function GET() {
  const blogLinks = getAllBlogPosts()
    .slice(0, 20)
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`)
    .join('\n')

  const journalLinks = getJournalEntrySummaries()
    .slice(0, 20)
    .map(
      (entry) =>
        `- [${entry.title}](${SITE_URL}/journal/${entry.slug}): ${entry.summary || entry.title}`,
    )
    .join('\n')

  const content = `# FrankX

> FrankX is Frank Riemer’s independent studio for bounded agent systems, production patterns, and field notes for creator-operators. The primary service maps one recurring founder-routed workflow and defines its agent decisions, human approvals, evaluations, cost limits, failure paths, and handover.

Frank Riemer is an AI Architect. FrankX is an independent project and is not affiliated with, endorsed by, or sponsored by Oracle.

## Start
- [Homepage](${SITE_URL}/): Primary proposition, operating method, and public proof routes
- [Choose by current state](${SITE_URL}/start): Routes for a first agent, production reliability, founder-routed operations, or a creator publishing system
- [Work with Frank](${SITE_URL}/work-with-me): Bounded workflow mapping and contact
- [Frank Riemer](${SITE_URL}/frank-riemer): Canonical person page

## Build status
- [Build release board](${SITE_URL}/build): Current availability and release gates
- [Six Primitives Toolkit](${SITE_URL}/build/six-primitives-toolkit): Planned price €197; checkout is not open while files, access, and refund terms are verified
- [Six Primitives Primer](${SITE_URL}/start-here): Free starting route linked from the release board

## Systems and field work
- [AI Architecture](${SITE_URL}/ai-architecture): Architecture guides and patterns
- [Blueprints](${SITE_URL}/ai-architecture/blueprints): Reference architecture library
- [MVU field journal](${SITE_URL}/mvu): Public Tallinn field notes and research pages
- [Research](${SITE_URL}/research): Public research index
- [GenCreator](${SITE_URL}/gencreator): Creator-system route

## Durable essays
${blogLinks}

## Dated field notes
- [Journal](${SITE_URL}/journal): Notes written as the work happens
${journalLinks}

## Feeds and machine-readable surfaces
- [Comprehensive map](${SITE_URL}/llms-full.txt): Longer site map and editorial boundaries
- [Sitemap](${SITE_URL}/sitemap.xml): Public URL inventory
- [Blog feed](${SITE_URL}/rss.xml): Recent essays
- [Journal feed](${SITE_URL}/journal/feed.xml): Recent field notes
- [GitHub profile](https://github.com/frankxai): Public repositories; verify each repository’s own status and license before reuse
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

export const revalidate = 3600
