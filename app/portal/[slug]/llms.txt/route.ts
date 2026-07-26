import { NextResponse } from 'next/server'
import { getPortalPartner, getAllPortalSlugs } from '@/content/portal'
import { toRecommendationGroups } from '@/lib/portal/recommend'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return getAllPortalSlugs().map((slug) => ({ slug }))
}

/**
 * Plain-text, machine-readable summary of a Partner Portal page — the dual
 * human/agent surface. A partner's own AI agents can ingest this to know
 * what FrankX provides, the active build, the year plan, and curated
 * recommendations, without parsing rendered HTML.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const partner = getPortalPartner(slug)
  if (!partner) {
    return new NextResponse('Partner not found', { status: 404 })
  }

  const lines: string[] = []

  lines.push(`# FrankX × ${partner.name} — Partner Portal`)
  lines.push('')
  lines.push(`URL: ${SITE_URL}/portal/${partner.slug}`)
  lines.push(`Relationship: ${partner.relationship}`)
  lines.push(`Status: ${partner.status}`)
  lines.push('')

  lines.push('## Positioning')
  lines.push(partner.tagline)
  lines.push('')

  if (partner.provides.length > 0) {
    lines.push('## What FrankX provides')
    for (const item of partner.provides) {
      lines.push(`- ${item.title}: ${item.detail}`)
    }
    lines.push('')
  }

  if (partner.projectPlan.length > 0) {
    lines.push('## Project plan')
    for (const phase of partner.projectPlan) {
      lines.push(`- [${phase.status}] ${phase.phase} (${phase.window}): ${phase.outcome}`)
    }
    lines.push('')
  }

  if (partner.yearPlan.length > 0) {
    lines.push('## Year plan')
    for (const q of partner.yearPlan) {
      lines.push(`${q.quarter} — ${q.theme}`)
      for (const m of q.milestones) {
        lines.push(`  - ${m}`)
      }
    }
    lines.push('')
  }

  const groups = toRecommendationGroups(partner.recommendations)
  if (groups.length > 0) {
    lines.push('## Recommendations')
    for (const group of groups) {
      lines.push(`### ${group.label}`)
      for (const item of group.items) {
        const href = item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`
        lines.push(`- ${item.title} (${href}) — ${item.why}`)
      }
    }
    lines.push('')
  }

  if (partner.sharedUpside.length > 0) {
    lines.push('## How we both win')
    for (const item of partner.sharedUpside) {
      lines.push(`- ${item}`)
    }
    lines.push('')
  }

  if (partner.team.length > 0) {
    lines.push('## Team')
    for (const member of partner.team) {
      lines.push(`- ${member.role}: ${member.howFrankHelps}`)
    }
    lines.push('')
  }

  const relatedSurfaces = [
    partner.alliesHref ? `- Allies page: ${SITE_URL}${partner.alliesHref}` : null,
    partner.friendsHref ? `- Friend page: ${SITE_URL}${partner.friendsHref}` : null,
    partner.partnershipsHref ? `- Partnership proposal: ${SITE_URL}${partner.partnershipsHref}` : null,
    partner.downloadHref ? `- Download kit: ${SITE_URL}${partner.downloadHref}` : null,
  ].filter((line): line is string => line !== null)

  if (relatedSurfaces.length > 0) {
    lines.push('## Related surfaces')
    lines.push(...relatedSurfaces)
    lines.push('')
  }

  lines.push('## Engage')
  lines.push(`${partner.cta.label}: ${partner.cta.href.startsWith('http') ? partner.cta.href : `${SITE_URL}${partner.cta.href}`}`)
  lines.push(`Email: frank@frankx.ai`)

  return new NextResponse(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
      // For AI-fetcher consumption, not search-engine indexing — the HTML
      // page at /portal/<slug> carries the same content in rich form.
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}
