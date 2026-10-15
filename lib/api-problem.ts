const SITE = 'https://www.frankx.ai'

export type ApiProblem = {
  type: string
  title: string
  status: number
  code: 'api_route_not_found' | 'method_not_allowed'
  detail: string
  message: string
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
  const detail = `No API route exists at ${path}.`
  return {
    type: `${SITE}/llms.txt#api-route-not-found`,
    title: 'API route not found',
    status: 404,
    code: 'api_route_not_found',
    detail,
    message: detail,
    resolution: `Read ${SITE}/api/v1 for the public routes, or ${SITE}/llms.txt for the agent index.`,
  }
}

export function methodNotAllowedProblem(): ApiProblem {
  const detail = 'Use GET for the public API catalog.'
  return {
    type: `${SITE}/llms.txt#method-not-allowed`,
    title: 'Method not allowed',
    status: 405,
    code: 'method_not_allowed',
    detail,
    message: detail,
    resolution: `Send GET ${SITE}/api/v1. The response lists the public read routes.`,
  }
}

function problemResponse(problem: ApiProblem, method: string, extraHeaders: HeadersInit = {}): Response {
  return new Response(method === 'HEAD' ? null : JSON.stringify(problem), {
    status: problem.status,
    headers: {
      'Content-Type': 'application/problem+json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      ...extraHeaders,
    },
  })
}

export function apiRouteNotFoundResponse(method: string, pathname: string): Response {
  return problemResponse(apiRouteNotFoundProblem(pathname), method)
}

export function methodNotAllowedResponse(method: string): Response {
  return problemResponse(methodNotAllowedProblem(), method, { Allow: 'GET, HEAD, OPTIONS' })
}
