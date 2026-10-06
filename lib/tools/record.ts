export const SPONSOR_MAX_AGE_DAYS = 45

const GENERATION_BANNED = new Set(['higgsfield'])

const ORACLE_EXCLUDED = new Set([
  'aws',
  'amazon-web-services',
  'gcp',
  'google-cloud',
  'azure',
  'microsoft-azure',
  'digitalocean',
  'vultr',
  'linode',
  'hetzner',
])

export type ToolEvidence = 'official-docs' | 'vendor-claim' | 'first-party' | 'not-tested'

export type ToolRelationship =
  | { kind: 'editorial' }
  | { kind: 'program-closed' }
  | { kind: 'enroll'; signupUrl: string }
  | { kind: 'live'; href: string; checkedOn: string }

export type ToolRecord = {
  id: string
  name: string
  job: string
  bestFor: string
  caution: string
  price: string
  capabilities: string[]
  evidence: ToolEvidence
  verifiedOn: string
  usedIn: string[]
  essay?: string
  relationship: ToolRelationship
  oracleExcluded: boolean
}

export type SponsorDecision = {
  sponsored: boolean
  rel: 'sponsored noopener' | 'noopener'
  href?: string
  reason: string
}

export type ProgramSource = {
  tool: string
  aliases?: readonly string[]
  hasProgram?: boolean
  status?: string
  ourLink?: string | null
  signupUrl?: string
  evidence?: ToolEvidence
  verifiedOn?: string
  checkedOn?: string
  oracleExcluded?: boolean
  note?: string
}

export function toolSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function httpsHref(value?: string | null): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? value : undefined
  } catch {
    return undefined
  }
}

export function isFresh(iso: string | undefined, now: Date, maxDays = SPONSOR_MAX_AGE_DAYS) {
  if (!iso) return false
  const then = Date.parse(iso)
  if (Number.isNaN(then)) return false
  const age = now.getTime() - then
  return age >= 0 && age <= maxDays * 24 * 60 * 60 * 1000
}

function banned(id: string, name: string) {
  return GENERATION_BANNED.has(id) || GENERATION_BANNED.has(toolSlug(name)) || name.toLowerCase().includes('higgsfield')
}

export function programToRecord(program: ProgramSource): ToolRecord {
  const id = toolSlug(program.tool)
  const oracleExcluded = program.oracleExcluded === true || ORACLE_EXCLUDED.has(id)
  const evidence = program.evidence ?? 'not-tested'
  const canBeLive = program.hasProgram === true
    && program.status === 'active'
    && Boolean(program.ourLink)
    && Boolean(program.checkedOn)
    && (evidence === 'official-docs' || evidence === 'first-party')

  let relationship: ToolRelationship
  if (canBeLive && program.ourLink && program.checkedOn) {
    relationship = { kind: 'live', href: program.ourLink, checkedOn: program.checkedOn }
  } else if (!program.hasProgram || program.status === 'closed' || program.status === 'dead-end' || program.status === 'deprioritized') {
    relationship = { kind: 'program-closed' }
  } else if (program.signupUrl) {
    relationship = { kind: 'enroll', signupUrl: program.signupUrl }
  } else {
    relationship = { kind: 'editorial' }
  }

  return {
    id,
    name: program.tool,
    job: program.note ?? '',
    bestFor: '',
    caution: '',
    price: '',
    capabilities: [],
    evidence,
    verifiedOn: program.verifiedOn ?? '',
    usedIn: [],
    relationship,
    oracleExcluded,
  }
}

export function recordsFromPrograms(programs: readonly ProgramSource[]) {
  return programs.map(programToRecord)
}

const SOCIAL_EVIDENCE: Record<string, ToolEvidence> = {
  'Official documentation': 'official-docs',
  'First-party pilot': 'first-party',
  'Vendor claim': 'vendor-claim',
  'Not tested': 'not-tested',
}

export function socialToolToRecord(tool: {
  id: string
  name: string
  bestFor: string
  caution: string
  price: string
  capabilities?: readonly string[]
  evidenceClass: string
  affiliate: { frankxRelationship: string }
}, verifiedOn: string): ToolRecord {
  return {
    id: tool.id,
    name: tool.name,
    job: tool.bestFor,
    bestFor: tool.bestFor,
    caution: tool.caution,
    price: tool.price,
    capabilities: [...(tool.capabilities ?? [])],
    evidence: SOCIAL_EVIDENCE[tool.evidenceClass] ?? 'not-tested',
    verifiedOn,
    usedIn: [],
    relationship: { kind: 'editorial' },
    oracleExcluded: false,
  }
}

export function findRecord(records: readonly ToolRecord[], slug: string) {
  const id = toolSlug(slug)
  return records.find(record => record.id === id || toolSlug(record.name) === id)
}

export function sponsorDecision(record: ToolRecord, now = new Date()): SponsorDecision {
  const editorial = (reason: string): SponsorDecision => ({ sponsored: false, rel: 'noopener', reason })

  if (banned(record.id, record.name)) return editorial('generation-banned')
  if (record.oracleExcluded || ORACLE_EXCLUDED.has(record.id)) return editorial('oracle-excluded')
  if (record.evidence !== 'official-docs' && record.evidence !== 'first-party') return editorial('evidence')
  if (!isFresh(record.verifiedOn, now)) return editorial('stale-verification')
  if (record.relationship.kind !== 'live') return editorial(record.relationship.kind)

  if (!isFresh(record.relationship.checkedOn, now)) return editorial('stale-check')
  const href = httpsHref(record.relationship.href)
  if (!href || href !== record.relationship.href) return editorial('unsafe-href')

  return { sponsored: true, rel: 'sponsored noopener', href, reason: 'live' }
}

export type AssetPermission = 'permitted' | 'unknown' | 'forbidden'

export type AssetProvenance =
  | {
      kind: 'brand-kit'
      permission: AssetPermission
      sourceUrl?: string
      recordedOn?: string
      localPath?: string
    }
  | {
      kind: 'screenshot'
      party: 'first-party' | 'generated'
      sourceUrl?: string
      recordedOn?: string
      localPath?: string
    }
  | { kind: 'remote'; sourceUrl?: string; localPath?: string }
  | { kind: 'generated'; localPath?: string; sourceUrl?: string }
  | { kind: 'unknown' }

export type AssetDecision =
  | { show: true; src: string; reason: 'brand-kit' | 'screenshot' }
  | { show: false; reason: string }

export function assetDecision(asset: AssetProvenance | undefined): AssetDecision {
  if (!asset || asset.kind === 'unknown') return { show: false, reason: 'unknown' }
  if (asset.kind === 'remote') return { show: false, reason: 'remote-only' }
  if (asset.kind === 'generated') return { show: false, reason: 'generated' }

  const source = 'sourceUrl' in asset ? asset.sourceUrl : undefined
  if (bannedHost(source) || bannedHost(asset.localPath)) return { show: false, reason: 'generation-banned' }

  if (asset.kind === 'brand-kit' && asset.permission !== 'permitted') {
    return { show: false, reason: 'permission' }
  }
  if (asset.kind === 'screenshot' && asset.party !== 'first-party') {
    return { show: false, reason: 'generated' }
  }
  if (!httpsHref(source) || !asset.recordedOn || Number.isNaN(Date.parse(asset.recordedOn))) {
    return { show: false, reason: 'unrecorded' }
  }
  if (!siteImage(asset.localPath)) return { show: false, reason: 'not-local' }
  return { show: true, src: asset.localPath, reason: asset.kind === 'brand-kit' ? 'brand-kit' : 'screenshot' }
}

function bannedHost(value?: string) {
  if (!value) return false
  const host = (() => {
    try { return new URL(value).hostname.toLowerCase() } catch { return value.toLowerCase() }
  })()
  return host === 'higgsfield.ai' || host.endsWith('.higgsfield.ai') || host.includes('higgsfield')
}

function siteImage(path?: string): path is string {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('://') || path.includes('..')) return false
  return /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(path)
}
