import programs from '@/data/affiliate/programs.json'
import { getAffiliate } from './affiliate-manager'
import { resolveProgramDestination } from './resolve-destination'

interface AffiliateLinkOptions {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export function getAffiliateDestination(affiliateId: string) {
  return resolveProgramDestination(affiliateId, programs.programs, getAffiliate(affiliateId))
}

export function editorialLinkRel(href?: string, rel?: string) {
  const sponsored = programs.programs.some(program =>
    program.hasProgram && program.status === 'active' && program.ourLink === href)
  if (!sponsored) return rel
  return [...new Set([...(rel ?? '').split(/\s+/).filter(Boolean), 'sponsored'])].join(' ')
}

// Keep the public signature compatible. Tracking stays local; partner URLs are immutable.
export const buildAffiliateLink = (
  affiliateId: string,
  _trackingId: string,
  _options: AffiliateLinkOptions = {},
): string | undefined => getAffiliateDestination(affiliateId)?.href
