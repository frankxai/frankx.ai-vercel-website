import { NextResponse } from 'next/server'
import leadMagnets from '@/data/lead-magnets.json'

const SITE = 'https://frankx.ai'

type LeadMagnet = {
  id: string
  title: string
  subtitle: string
  icp: string
  format: string[]
  status: string
  pdfUrl?: string
}

export async function GET() {
  const published = (leadMagnets as LeadMagnet[]).filter((m) => m.status === 'published' && m.pdfUrl)

  return NextResponse.json({
    name: 'FrankX AI Agent Hub',
    description: 'Machine-readable interface for discovering and retrieving FrankX digital assets.',
    url: SITE,
    version: '2026.1.0',
    capabilities: ['lead_ingest', 'digital_asset_distribution', 'agent_to_agent_discovery'],
    agentEndpoints: {
      leadIngest: `${SITE}/api/v1/lead-ingest`,
      assetMetadata: `${SITE}/api/v1/deliver/{id}`,
      llmsTxt: `${SITE}/llms.txt`,
      agentCard: `${SITE}/.well-known/agent-card`,
    },
    availableLeadMagnets: published.map((m) => ({
      id: m.id,
      title: m.title,
      subtitle: m.subtitle,
      icp: m.icp,
      format: m.format,
      pdfUrl: `${SITE}${m.pdfUrl}`,
    })),
    contact: {
      architect: 'Frank Riemer',
      brand: 'FrankX',
    },
  })
}
