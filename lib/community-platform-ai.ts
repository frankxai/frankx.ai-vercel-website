import type { CommunityPlatform } from './community-platforms'

export type CommunityPlatformAiMode =
  | 'Official MCP'
  | 'API-buildable'
  | 'Native AI'
  | 'No public agent surface'

export function getCommunityPlatformAiMode(
  platform: Pick<CommunityPlatform, 'aiMcpAgentIntegration'>
): CommunityPlatformAiMode {
  const claim = platform.aiMcpAgentIntegration.toLowerCase()

  if (claim.startsWith('official') && claim.includes('mcp')) {
    return 'Official MCP'
  }

  if (
    claim.includes('buildable') ||
    claim.includes('custom agent') ||
    claim.includes('through api') ||
    claim.includes('through the api')
  ) {
    return 'API-buildable'
  }
  if (claim.includes('native ai') || claim.includes('ai agent')) return 'Native AI'
  return 'No public agent surface'
}
