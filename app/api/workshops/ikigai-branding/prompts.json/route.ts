/**
 * Public JSON endpoint exposing the Ikigai workshop prompt library.
 *
 * Designed for browser agents (Perplexity Comet, OpenAI Operator,
 * Anthropic Computer Use, Arc Search "Browse for me") and any other
 * automation that wants to run the workshop programmatically.
 *
 * Discovery:
 *   GET https://frankx.ai/api/workshops/ikigai-branding/prompts.json
 *
 * Returns:
 *   - Workshop metadata (title, url, facilitator)
 *   - All 6 prompts with full body + chain instructions
 *   - Connector setup paths (ChatGPT native / Claude MCP / CSV)
 *   - License: CC BY 4.0
 */

import { WORKSHOP_PROMPTS, CONNECTOR_PATHS } from '@/lib/workshop-prompts'
import { FRANK_CREDENTIALS, FRANK_RECEIPTS } from '@/lib/workshop-citations'

// Static — regenerated at build time, served from CDN edge.
export const dynamic = 'force-static'

export function GET() {
  return Response.json(
    {
      schemaVersion: '1',
      workshop: {
        slug: 'ikigai-branding',
        title: 'Ikigai & Branding Workshop',
        subtitle:
          'Find your purpose, turn it into a brand, ship a 30-day content plan.',
        url: 'https://frankx.ai/workshops/ikigai-branding',
        presentUrl: 'https://frankx.ai/workshops/ikigai-branding/present',
        durationMinutes: 75,
        difficulty: 'Beginner',
      },
      facilitator: {
        name: 'Frank Riemer',
        role: FRANK_CREDENTIALS.role,
        org: FRANK_CREDENTIALS.org,
        site: 'https://frankx.ai',
        receipts: FRANK_RECEIPTS,
      },
      prompts: WORKSHOP_PROMPTS.map((p) => ({
        id: p.id,
        module: p.module,
        title: p.title,
        subtitle: p.subtitle,
        body: p.body,
        bestIn: p.bestIn,
        outputHandling: p.outputHandling,
        // Direct ChatGPT prefill URL — agents can deep-link here
        chatgptUrl: `https://chatgpt.com/?q=${encodeURIComponent(p.body)}`,
      })),
      connectorPaths: CONNECTOR_PATHS,
      license: 'CC BY 4.0',
      attribution: 'Frank Riemer · frankx.ai · 2026',
      contact: 'https://frankx.ai/contact',
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    },
  )
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  })
}
