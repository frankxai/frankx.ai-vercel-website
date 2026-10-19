// Error messages and names can contain commands, credentials and visitor data.
// Public responses and logs use only these fixed descriptions and classifications.
type FailureStage = 'request' | 'ratelimit' | 'store' | 'read'
const networkCodes = new Set(['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT'])
const errorNames = new Set(['Error', 'TypeError', 'SyntaxError', 'AbortError', 'TimeoutError', 'UpstashError'])

export function failureKind(error: unknown): string {
  if (!(error instanceof Error)) return 'other'
  if (error.name === 'UpstashError') return 'store-refused'
  const code = (error.cause as { code?: unknown } | undefined)?.code
  if (typeof code === 'string' && networkCodes.has(code)) return `network:${code}`
  if (/fetch failed/i.test(error.message)) return 'network'
  if (/url/i.test(error.message)) return 'config'
  return 'other'
}

export function describeStoreFailure(error: unknown, stage: FailureStage) {
  const kind = failureKind(error)
  return {
    stage,
    cause: error instanceof Error && errorNames.has(error.name) ? error.name : 'unknown',
    kind,
    detail: kind === 'store-refused' ? 'The analytics store refused the request.'
      : kind.startsWith('network') ? 'The analytics store could not be reached.'
      : kind === 'config' ? 'The analytics store configuration is invalid.'
      : 'The request could not be completed.',
  }
}
