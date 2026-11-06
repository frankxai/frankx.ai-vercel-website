const SITE = 'https://www.frankx.ai'

export const apiDiscoveryLink = [
  `<${SITE}/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"`,
  `<${SITE}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
  `<${SITE}/developers>; rel="service-doc"; type="text/html"`,
  `<${SITE}/llms.txt>; rel="describedby"; type="text/plain"`,
].join(', ')

export type ApiProblem = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  code: 'api_route_not_found' | 'method_not_allowed'
  resolution: string
}

export function displayedApiPath(pathname: string): string {
  const cut = pathname.split(/[?#]/)[0] ?? ''
  let cleaned = cut.replace(/[\u0000-\u001f\u007f`<>]/g, '')
  cleaned = cleaned.replace(/[^A-Za-z0-9/._~%-]/g, '').slice(0, 200)
  if (!cleaned.startsWith('/')) cleaned = `/${cleaned}`
  cleaned = `/${cleaned.replace(/^\/+/, '')}`
  return cleaned === '/' ? '/' : cleaned
}

export function apiRouteNotFoundProblem(pathname: string): ApiProblem {
  const path = displayedApiPath(pathname)
  return {
    type: `${SITE}/llms.txt#api-route-not-found`,
    title: 'API route not found',
    status: 404,
    detail: `No API route exists at ${path}.`,
    instance: `${SITE}${path}`,
    code: 'api_route_not_found',
    resolution: `Discover the public API through ${SITE}/.well-known/api-catalog or ${SITE}/llms.txt.`,
  }
}

export function methodNotAllowedProblem(pathname: string): ApiProblem {
  const path = displayedApiPath(pathname)
  return {
    type: `${SITE}/llms.txt#method-not-allowed`,
    title: 'Method not allowed',
    status: 405,
    detail: `Use GET for ${path}.`,
    instance: `${SITE}${path}`,
    code: 'method_not_allowed',
    resolution: `Send GET ${SITE}/api/v1. The response lists the public read routes.`,
  }
}

function problemResponse(problem: ApiProblem, method: string, extraHeaders: HeadersInit = {}): Response {
  return new Response(method === 'HEAD' ? null : JSON.stringify(problem), {
    status: problem.status,
    headers: {
      'Content-Type': 'application/problem+json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
      Link: apiDiscoveryLink,
      ...extraHeaders,
    },
  })
}

export function apiRouteNotFoundResponse(method: string, pathname: string): Response {
  return problemResponse(apiRouteNotFoundProblem(pathname), method)
}

export function methodNotAllowedResponse(method: string, pathname: string): Response {
  return problemResponse(methodNotAllowedProblem(pathname), method, { Allow: 'GET, HEAD, OPTIONS' })
}

export function readOnlyOptionsResponse(): Response {
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
