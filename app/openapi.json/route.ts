import { methodNotAllowedResponse, readOnlyOptionsResponse } from '@/lib/api-problem'
import { publicOpenApiResponse } from '@/lib/public-openapi'

export const revalidate = 86400

export function GET() {
  return publicOpenApiResponse('GET')
}

export function HEAD() {
  return publicOpenApiResponse('HEAD')
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
