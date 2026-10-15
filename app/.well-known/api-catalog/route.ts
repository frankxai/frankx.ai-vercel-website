import { apiDiscoveryLink, methodNotAllowedResponse } from '@/lib/api-problem'
import { apiCatalogContentType, apiCatalogDocument } from '@/lib/api-catalog'

export const revalidate = 86400

const headers = {
  'Content-Type': apiCatalogContentType,
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  'Access-Control-Allow-Origin': '*',
  'X-Content-Type-Options': 'nosniff',
  Link: apiDiscoveryLink,
}

export function GET() {
  return new Response(JSON.stringify(apiCatalogDocument()), { status: 200, headers })
}

export function HEAD() {
  return new Response(null, { status: 200, headers })
}

function methodNotAllowed(request: Request): Response {
  return methodNotAllowedResponse(request.method, new URL(request.url).pathname)
}

export const POST = methodNotAllowed
export const PUT = methodNotAllowed
export const PATCH = methodNotAllowed
export const DELETE = methodNotAllowed

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
    },
  })
}
