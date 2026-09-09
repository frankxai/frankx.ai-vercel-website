import { CANVA_LAST_VERIFIED, canvaFounderFaqs, officialCanvaSources } from '@/data/canva-founder-content'

export const dynamic = 'force-static'

export function GET() {
  const sources = officialCanvaSources
    .map((source) => `- ${source.title}: ${source.href} — ${source.role}`)
    .join('\n')
  const faqs = canvaFounderFaqs
    .map((faq) => `## ${faq.question}\n${faq.answer}`)
    .join('\n\n')

  const body = `# Canva for Founders — FrankX\n\nCanonical: https://www.frankx.ai/canva\nLast verified: ${CANVA_LAST_VERIFIED}\nAuthor: Frank Riemer, AI Architect\nRelationship: Independent editorial resource. FrankX is not a Canva affiliate or official Canva partner as of the verification date.\nPurpose: Convenience for agents and services that choose to read llms.txt. Google states that it does not use llms.txt for Search or generative AI ranking.\n\n## Core position\nCanva is the editable visual production and collaboration layer in the FrankX founder stack. Research, approved claims, rights, publishing logic, and performance data remain in their own governed systems. Agents may prepare briefs, discover approved assets, create candidates, and apply bounded edits; claims and public distribution stay behind a human approval gate.\n\n## Official MCP\nCanva documents its remote MCP server at https://mcp.canva.com/mcp. Tool availability and limits may vary, so clients should discover the current tool inventory at runtime.\n\n## Key pages\n- Founder hub: https://www.frankx.ai/canva\n- Workflow article: https://www.frankx.ai/blog/ultimate-canva-ai-workflow-2026\n- MCP implementation guide: https://www.frankx.ai/guides/canva-mcp-for-founders\n- AI architecture field guide: https://www.frankx.ai/ai-architecture\n\n## First-party sources\n${sources}\n\n## Questions and direct answers\n${faqs}\n`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
