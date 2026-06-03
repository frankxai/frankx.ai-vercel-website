/**
 * Agent Observatory — shared data model.
 *
 * Consumed by BOTH surfaces (the frankx.ai showcase and the localhost live
 * monitor). Mirrors the output of agentic-creator-os/scripts/build-catalog.mjs.
 */

export type NodeKind = 'agent' | 'skill' | 'command' | 'workflow' | 'iam-profile'
export type Tier = 'haiku' | 'sonnet' | 'opus'
export type Status = 'shipped' | 'in-progress' | 'gap'

export interface CatalogNode {
  id: string
  kind: NodeKind
  name: string
  group: string
  description: string
  tier?: Tier
  status?: Status
  tools?: string[]
  mcpServers?: string[]
  keywords?: string[]
  priority?: string | null
  file?: string
  tierLabel?: string | null
  allowedTools?: string[]
  deniedTools?: string[]
}

export type EdgeRel = 'uses-skill' | 'triggers' | 'composes' | 'governed-by'

export interface CatalogEdge {
  source: string
  target: string
  rel: EdgeRel
}

export interface IamProfile {
  description?: string
  allowedTools?: string[]
  deniedTools?: string[]
  allowedPaths?: string[]
  deniedPaths?: string[]
  maxFileEdits?: number
  canCreateFiles?: boolean
  canDeleteFiles?: boolean
}

export interface Catalog {
  generatedAt: string
  version: string
  source: string
  counts: Record<string, number>
  iam: Record<string, IamProfile>
  nodes: CatalogNode[]
  edges: CatalogEdge[]
}

/** Live-monitor activity event (mirrors disler/observability + ACOS hooks). */
export interface ActivityEvent {
  session_id: string
  source_app: string
  hook_event_type:
    | 'SessionStart'
    | 'PreToolUse'
    | 'PostToolUse'
    | 'SubagentStart'
    | 'SubagentStop'
    | 'Stop'
  agent_id?: string
  tool_name?: string
  timestamp: string
  payload?: Record<string, unknown>
}

export type ObservatoryView = 'galaxy' | 'groups' | 'iam' | 'workflows'
