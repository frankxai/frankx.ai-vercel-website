import { NextResponse } from 'next/server'
import leadMagnets from '@/data/lead-magnets.json'

export async function GET() {
  return NextResponse.json({
    name: 'FrankX AI Sovereign Agent Hub',
    description: 'Machine-readable interface for Autonomous AI Agents, Human-AI Companions, and AI Architects.',
    url: 'https://frankx.ai',
    version: '2026.1.0',
    capabilities: [
      'lead_ingest',
      'digital_asset_distribution',
      'agent_to_agent_discovery',
      'prompt_hub_query',
      'split_testing_telemetry'
    ],
    agentEndpoints: {
      leadIngest: 'https://frankx.ai/api/v1/lead-ingest',
      promptHub: 'https://frankx.ai/api/v1/prompts',
      llmsTxt: 'https://frankx.ai/llms.txt',
      agentCard: 'https://frankx.ai/.well-known/agent-card'
    },
    availableLeadMagnets: leadMagnets.map((lm) => ({
      id: lm.id,
      title: lm.title,
      subtitle: lm.subtitle,
      icp: lm.icp,
      format: lm.format,
      pdfUrl: `https://frankx.ai${lm.pdfUrl}`,
      notionUrl: lm.notionUrl
    })),
    contact: {
      architect: 'Frank Riemer',
      brand: 'FrankX AI',
      voice: 'Elite Creator. AI Architect. Humble Excellence.'
    }
  })
}
