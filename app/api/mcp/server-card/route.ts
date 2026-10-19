import { serverCardResponse } from '@/lib/mcp-server-card'

export const revalidate = 3600

function read(request: Request, method: 'GET' | 'HEAD') {
  return serverCardResponse(method, request.headers.get('if-none-match'))
}

export function GET(request: Request) {
  return read(request, 'GET')
}

export function HEAD(request: Request) {
  return read(request, 'HEAD')
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
    },
  })
}
