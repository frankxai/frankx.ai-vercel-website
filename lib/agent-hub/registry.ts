/**
 * Typed access to data/agent-registry.json.
 *
 * Deliberately mirrors the shape of lib/llm-hub/registry.ts rather than
 * introducing a shared generic layer: the two registries answer different
 * questions and share no fields beyond name and sources, so a common
 * abstraction would cost more than it saves today.
 */

import registry from '@/data/agent-registry.json'

export type AgentKind = 'platform' | 'framework'
export type EvidenceGrade = 'A' | 'B' | 'C' | 'D'
/** How deeply an entry speaks MCP — the interop question that decides tool reuse. */
export type McpSupport = 'native' | 'supported' | 'none'

export interface AgentAccess {
  name: string
  url: string
}

export interface AgentEntry {
  name: string
  /** Registry key; also the URL slug at /agent-hub/[slug]. */
  id: string
  kind: AgentKind
  organization: string
  status: string
  one_liner: string
  interfaces: string[]
  mcp: McpSupport
  best_for: string[]
  watch_out?: string
  pricing_note: string
  /** Reuses the research layer's A–D vocabulary (A = reproducible, D = vendor-stated). */
  evidence_grade: EvidenceGrade
  access: AgentAccess[]
  frankx_note?: string
  sources: string[]
}

export interface AgentOrganization {
  name: string
  url: string
  accent_color: string
}

export interface AgentKindMeta {
  id: AgentKind
  label: string
  description: string
  accent: string
  count: number
}

interface RawRegistry {
  _updated?: string
  _note?: string
  evidence_grades: Record<string, string>
  kinds: Record<string, { label: string; description: string; accent: string }>
  organizations: Record<string, AgentOrganization>
  entries: Record<string, Omit<AgentEntry, 'id'> & { id?: string }>
}

const RAW = registry as unknown as RawRegistry

/** Registry key wins over any `id` in the data, so URLs cannot drift from keys. */
function normalise(key: string, raw: RawRegistry['entries'][string]): AgentEntry {
  return { ...(raw as Omit<AgentEntry, 'id'>), id: key }
}

export function getAllAgentEntries(): AgentEntry[] {
  return Object.entries(RAW.entries).map(([key, raw]) => normalise(key, raw))
}

export function getAgentEntry(slug: string | undefined): AgentEntry | undefined {
  if (!slug) return undefined
  const raw = RAW.entries[slug]
  return raw ? normalise(slug, raw) : undefined
}

export function getAgentEntriesByKind(kind: AgentKind): AgentEntry[] {
  return getAllAgentEntries().filter((entry) => entry.kind === kind)
}

export function getAgentKinds(): AgentKindMeta[] {
  return Object.entries(RAW.kinds).map(([id, meta]) => ({
    id: id as AgentKind,
    ...meta,
    count: getAgentEntriesByKind(id as AgentKind).length,
  }))
}

export function getAgentOrganization(slug: string): AgentOrganization | undefined {
  return RAW.organizations[slug]
}

/** The registry's own freshness stamp, so copy never claims to be fresher than data. */
export function agentRegistryLastUpdated(): string {
  return RAW._updated ?? ''
}

/** The standing caveat the hub leads with. Kept in data so page and JSON agree. */
export function agentRegistryCaveat(): string {
  return RAW._note ?? ''
}

export function evidenceGradeLabel(grade: EvidenceGrade): string {
  return RAW.evidence_grades[grade] ?? ''
}
