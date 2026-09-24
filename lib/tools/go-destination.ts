import { findRecord, sponsorDecision, type ToolRecord } from './record.ts'

export type GoDestination =
  | { action: 'hop'; href: string }
  | { action: 'stack'; id: string }
  | { action: 'outbound'; href: string }
  | { action: 'missing' }

export function resolveGoDestination(args: {
  slug: string
  records: readonly ToolRecord[]
  outboundDestination?: string | null
  now?: Date
}): GoDestination {
  const record = findRecord(args.records, args.slug)
  const outbound = args.outboundDestination || undefined
  if (!record) {
    return outbound ? { action: 'outbound', href: outbound } : { action: 'missing' }
  }

  const decision = sponsorDecision(record, args.now)
  if (decision.sponsored && decision.href) {
    return { action: 'hop', href: decision.href }
  }

  if (outbound && !isUnissuedPartnerUrl(outbound, record)) {
    return { action: 'outbound', href: outbound }
  }

  return { action: 'stack', id: record.id }
}

function isUnissuedPartnerUrl(destination: string, record: ToolRecord) {
  if (record.relationship.kind === 'live' && destination === record.relationship.href) return true
  try {
    const url = new URL(destination)
    return url.hostname === 'go.agenticincome.ai' || url.searchParams.has('ref')
  } catch {
    return true
  }
}
