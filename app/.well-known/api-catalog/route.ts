import { methodNotAllowedResponse, readOnlyOptionsResponse } from '@/lib/api-problem'
import { apiCatalogResponse } from '@/lib/api-catalog'

export const revalidate = 86400

export function GET() {
  return apiCatalogResponse('GET')
}

export function HEAD() {
  return apiCatalogResponse('HEAD')
}

function methodNotAllowed(request: Request): Response {
  return methodNotAllowedResponse(request.method, new URL(request.url).pathname)
}

export const POST = methodNotAllowed
export const PUT = methodNotAllowed
export const PATCH = methodNotAllowed
export const DELETE = methodNotAllowed

export function OPTIONS() {
  return readOnlyOptionsResponse()
}
