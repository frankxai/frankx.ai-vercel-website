import { NextResponse } from 'next/server'
import { getPartner, listPartners } from '@/content/partnerships'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'
import { SURFACE_HREFS } from '@/lib/cross-links'

const SITE_URL = 'https://frankx.ai'

export function generateStaticParams() {
  return listPartners().map((p) => ({ slug: p.slug }))
}

/**
 * Plain-text LLM-readable partnership summary.
 *
 * Optimized for AEO citation — AI agents (ChatGPT, Claude, Perplexity, Gemini)
 * extracting partnership context. Sanitized to public-only content. Names of
 * named individuals and Oracle transition timing remain in the private brief
 * (`.frankx/private/partnerships/<slug>-brief.md`), never here.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const partner = getPartner(slug)
  if (!partner) {
    return new NextResponse('Partner not found', { status: 404 })
  }

  const isProposalTier = partner.status === 'active'
  const lines: string[] = []

  lines.push(`# FrankX × ${partner.name} — Partnership`)
  lines.push('')
  lines.push(`URL: ${SITE_URL}/partnerships/${partner.slug}`)
  lines.push(`Tier: ${partner.tier}`)
  lines.push(`Status: ${partner.status}`)
  lines.push('')

  lines.push('## Positioning')
  lines.push(partner.tagline)
  lines.push(partner.subTagline)
  lines.push('')

  if (partner.contextWindow) {
    lines.push('## Context')
    lines.push(partner.contextWindow.trim())
    lines.push('')
  }

  if (partner.workingReality.length > 0) {
    lines.push('## Working reality (verifiable today)')
    for (const block of partner.workingReality) {
      lines.push(`- ${block.label}: ${block.detail}`)
    }
    lines.push('')
  }

  if (partner.proofPoints.length > 0) {
    lines.push('## Evidence')
    for (const p of partner.proofPoints) {
      if (p.href.startsWith('#')) continue
      lines.push(`- ${p.label}: ${p.href}`)
    }
    lines.push('')
  }

  if (isProposalTier) {
    lines.push('## Proposal — operating modes')
    for (const program of partner.programs) {
      lines.push(
        `${program.number}. ${program.name} (${program.cadence}) — ${program.whatItIs}`
      )
    }
    lines.push('')

    if (partner.compoundingModel.length > 0) {
      lines.push('## Compounding model')
      for (const node of partner.compoundingModel) {
        lines.push(`Month ${node.month}: ${node.title}. ${node.body}`)
      }
      lines.push('')
    }

    if (partner.crossLinks.length > 0) {
      lines.push('## Cross-link tour')
      for (const link of partner.crossLinks) {
        const href = link.href.startsWith('http')
          ? link.href
          : `${SITE_URL}${link.href}`
        lines.push(`- ${link.label} (${href}) — ${link.rationale}`)
      }
      lines.push('')
    }

    if (partner.whatThisIsNot.length > 0) {
      lines.push('## Scope limits')
      for (const item of partner.whatThisIsNot) {
        lines.push(`- Not: ${item}`)
      }
      lines.push('')
    }
  } else {
    lines.push('## State')
    lines.push(
      `A deeper conversation with ${partner.shortName} is in motion. The full proposal page comes online when both sides are ready to publish.`
    )
    lines.push('')
  }

  lines.push('## Engage')
  lines.push(`Book Meet & Grow: ${MEET_AND_GROW_URL}`)
  lines.push(`Email: frank@frankx.ai`)
  lines.push('')

  lines.push('## Related surfaces')
  lines.push(`- AI CoE blueprint: ${SITE_URL}${SURFACE_HREFS['ai-coe']}`)
  lines.push(
    `- Reference architectures: ${SITE_URL}${SURFACE_HREFS['ai-architecture']}`
  )
  lines.push(
    `- AI Architect Academy: ${SITE_URL}${SURFACE_HREFS['ai-architect-academy']}`
  )
  lines.push(`- Research Hub: ${SITE_URL}${SURFACE_HREFS['research']}`)
  lines.push(`- Workshops: ${SITE_URL}${SURFACE_HREFS['workshops']}`)

  return new NextResponse(lines.join('\n') + '\n', {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
      // Defense-in-depth: this surface is for AI fetchers (ChatGPT/Claude/Perplexity/
      // Gemini extracting context), NOT for search-engine indexing. AI agents that
      // fetch the URL directly still get the content; this header just keeps the .txt
      // out of search results to avoid thin-content / duplicate-content SEO penalties
      // since the HTML page at /partnerships/<slug> carries the same information in
      // rich form. Added 2026-05-21 per /hub-audit partnerships v1 finding.
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}
