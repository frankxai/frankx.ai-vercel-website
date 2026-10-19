import { createHash } from 'node:crypto'
import { frankxMcpServerInfo } from './mcp/server-identity.ts'

const SITE = 'https://www.frankx.ai'

export const MCP_ENDPOINT = `${SITE}/api/mcp`
export const SERVER_CARD_URL = `${MCP_ENDPOINT}/server-card`
export const AI_CATALOG_URL = `${SITE}/.well-known/ai-catalog.json`

export const serverCardContentType = 'application/mcp-server-card+json; charset=utf-8'
export const aiCatalogContentType = 'application/ai-catalog+json; charset=utf-8'

export const SERVER_CARD_SCHEMA =
  'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json'

export type FrankxServerCard = {
  $schema: string
  name: string
  version: string
  description: string
  title: string
  websiteUrl: string
  repository: { url: string; source: string; subfolder: string }
  remotes: Array<{ type: 'streamable-http'; url: string }>
}

export function frankxServerCard(): FrankxServerCard {
  return {
    $schema: SERVER_CARD_SCHEMA,
    name: frankxMcpServerInfo.name,
    version: frankxMcpServerInfo.version,
    description: 'Read-only MCP for FrankX search, articles, and the public product list.',
    title: 'FrankX',
    websiteUrl: `${SITE}/developers`,
    repository: {
      url: 'https://github.com/frankxai/frankx.ai-vercel-website',
      source: 'github',
      subfolder: 'lib/mcp',
    },
    remotes: [{ type: 'streamable-http', url: MCP_ENDPOINT }],
  }
}

export type FrankxAiCatalog = {
  specVersion: '1.0'
  entries: Array<{
    identifier: string
    type: 'application/mcp-server-card+json'
    url: string
  }>
}

export function frankxAiCatalog(): FrankxAiCatalog {
  return {
    specVersion: '1.0',
    entries: [
      {
        identifier: 'urn:air:frankx.ai:mcp:frankx',
        type: 'application/mcp-server-card+json',
        url: SERVER_CARD_URL,
      },
    ],
  }
}

export const publicRobotAllows = [
  '/api/mcp',
  '/api/v1',
  '/api/quote/',
  '/api/dare/',
  '/api/md',
  '/api/404/match',
  '/api/vcard',
  '/.well-known/',
  '/openapi.json',
]

function entityTag(body: string): string {
  return `"${createHash('sha256').update(body).digest('hex')}"`
}

function opaqueTag(value: string): string | null {
  let token = value.trim()
  if (token.startsWith('W/')) token = token.slice(2)
  if (token.length >= 2 && token.startsWith('"') && token.endsWith('"')) return token
  return null
}

/** If-None-Match uses weak comparison (RFC 9110 §13.1.2): W/"tag" matches "tag". */
function matchesTag(ifNoneMatch: string | null, etag: string): boolean {
  if (!ifNoneMatch) return false
  const current = opaqueTag(etag)
  if (!current) return false
  return ifNoneMatch.split(',').some((part) => {
    const value = part.trim()
    if (value === '*') return true
    return opaqueTag(value) === current
  })
}

const sharedHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD',
  'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
  'Access-Control-Expose-Headers': 'ETag',
  'Cache-Control': 'public, max-age=3600',
  'X-Content-Type-Options': 'nosniff',
}

function taggedResponse(method: 'GET' | 'HEAD', body: string, contentType: string, ifNoneMatch: string | null): Response {
  const etag = entityTag(body)
  const headers = { ...sharedHeaders, 'Content-Type': contentType, ETag: etag }
  if (matchesTag(ifNoneMatch, etag)) {
    return new Response(null, { status: 304, headers })
  }
  return new Response(method === 'HEAD' ? null : body, { status: 200, headers })
}

export function serverCardResponse(method: 'GET' | 'HEAD', ifNoneMatch: string | null): Response {
  return taggedResponse(method, JSON.stringify(frankxServerCard()), serverCardContentType, ifNoneMatch)
}

export function aiCatalogResponse(method: 'GET' | 'HEAD', ifNoneMatch: string | null): Response {
  return taggedResponse(method, JSON.stringify(frankxAiCatalog()), aiCatalogContentType, ifNoneMatch)
}
