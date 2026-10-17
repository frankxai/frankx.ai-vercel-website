import { methodNotAllowedResponse, readOnlyOptionsResponse } from '@/lib/api-problem'
import { publicApiCatalogResponse } from '@/lib/public-api-catalog'

export const revalidate = 86400

export function GET() {
  return publicApiCatalogResponse()
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
