import { apiDiscoveryLink } from './api-problem.ts'
import { publicApiCatalog } from './public-api-catalog.ts'

const SITE = 'https://www.frankx.ai'

export const apiCatalogContentType =
  'application/linkset+json; charset=utf-8; profile="https://www.rfc-editor.org/info/rfc9727"'

type LinkTarget = { href: string; type: string }

export type ApiCatalogDocument = {
  linkset: Array<{
    anchor: string
    'service-desc'?: LinkTarget[]
    'service-doc': LinkTarget[]
  }>
}

const serviceDoc: LinkTarget[] = [
  { href: `${SITE}/developers`, type: 'text/html' },
  { href: `${SITE}/llms.txt`, type: 'text/plain' },
]

export function apiCatalogDocument(): ApiCatalogDocument {
  const reads = publicApiCatalog.endpoints.filter((endpoint) => endpoint.method === 'GET')
  return {
    linkset: [
      {
        anchor: `${SITE}/api/v1`,
        'service-desc': [{ href: `${SITE}/openapi.json`, type: 'application/vnd.oai.openapi+json' }],
        'service-doc': serviceDoc,
      },
      ...reads.map((endpoint) => ({
        anchor: `${SITE}${endpoint.path}`,
        'service-doc': serviceDoc,
      })),
    ],
  }
}

const catalogHeaders = {
  'Content-Type': apiCatalogContentType,
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
  Link: apiDiscoveryLink,
}

export function apiCatalogResponse(method: 'GET' | 'HEAD'): Response {
  return new Response(method === 'HEAD' ? null : JSON.stringify(apiCatalogDocument()), {
    status: 200,
    headers: catalogHeaders,
  })
}
