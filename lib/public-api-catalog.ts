import { apiDiscoveryLink } from './api-problem.ts'

const SITE = 'https://www.frankx.ai'

export type PublicEndpoint = {
  method: 'GET' | 'POST'
  path: string
  description: string
  example: string
}

export const publicApiCatalog = {
  name: 'FrankX public API',
  product: 'FrankX',
  version: '1.0.0',
  description:
    'Read-only routes on frankx.ai. Account, checkout, admin, and webhook routes are not listed.',
  authentication:
    'The listed reads do not use an API key. POST /api/mcp allows 30 requests per minute per address. A 429 means wait and retry.',
  endpoints: [
    {
      method: 'GET',
      path: '/api/quote/today',
      description:
        'Returns the quote for the calendar day in the given IANA timezone. The default timezone is UTC. An unrecognized tz returns HTTP 400 with an error message.',
      example: `${SITE}/api/quote/today?tz=UTC`,
    },
    {
      method: 'GET',
      path: '/api/quote/random',
      description:
        'Returns random quotes. author and book are optional filters. count is from 1 to 20 and defaults to 1. A filter that matches nothing returns 404 JSON.',
      example: `${SITE}/api/quote/random?count=1`,
    },
    {
      method: 'GET',
      path: '/api/dare/today',
      description:
        'Returns the daily dare. tz is an IANA timezone and defaults to UTC. An unrecognized tz still returns HTTP 200. The date is the UTC day, and the timezone field echoes the query value.',
      example: `${SITE}/api/dare/today?tz=UTC`,
    },
    {
      method: 'GET',
      path: '/api/md',
      description:
        'Returns one blog article as markdown. path is required, for example /blog/agentic-ai-roadmap-2025. A missing path returns the text Missing path parameter.',
      example: `${SITE}/api/md?path=/blog/agentic-ai-roadmap-2025`,
    },
    {
      method: 'GET',
      path: '/api/404/match',
      description:
        'Suggests an existing page for a path. The response is always 200 JSON and does not redirect.',
      example: `${SITE}/api/404/match?path=/guids`,
    },
    {
      method: 'GET',
      path: '/api/vcard',
      description: 'Returns a text/vcard contact card.',
      example: `${SITE}/api/vcard`,
    },
    {
      method: 'GET',
      path: '/api/mcp',
      description:
        'Opens the stateless MCP session when Accept includes text/event-stream. The body is an event stream. A GET without that media type returns 406 JSON-RPC. No API key is required. The server card is https://www.frankx.ai/api/mcp/server-card.',
      example: `${SITE}/api/mcp`,
    },
    {
      method: 'GET',
      path: '/api/mcp/server-card',
      description:
        'Returns the MCP server card (application/mcp-server-card+json). It names the transport and does not list tools.',
      example: `${SITE}/api/mcp/server-card`,
    },
    {
      method: 'GET',
      path: '/openapi.json',
      description:
        'OpenAPI 3.1 document for these public reads. The content type is application/vnd.oai.openapi+json;version=3.1.',
      example: `${SITE}/openapi.json`,
    },
    {
      method: 'GET',
      path: '/.well-known/ai-catalog.json',
      description: 'SEP-2127 AI Catalog. One entry points at the FrankX MCP server card.',
      example: `${SITE}/.well-known/ai-catalog.json`,
    },
    {
      method: 'POST',
      path: '/api/mcp',
      description:
        'Calls an MCP tool on the stateless server. Limited to 30 requests per minute per address.',
      example: `${SITE}/api/mcp`,
    },
  ] satisfies PublicEndpoint[],
}

export function publicApiCatalogResponse(): Response {
  return Response.json(publicApiCatalog, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      Link: apiDiscoveryLink,
    },
  })
}
