// Runtime console output is not visible through the log tooling in use, so a
// storage failure has to be diagnosable from the HTTP response alone, without
// echoing hosts, tokens or the stored payload.

export function failureKind(error: unknown): string {
  if (!(error instanceof Error)) return 'other'
  if (error.name === 'UpstashError') return 'store-refused'
  const code = (error.cause as { code?: unknown } | undefined)?.code
  if (typeof code === 'string' && /^[A-Z_]{3,20}$/.test(code)) return `network:${code}`
  if (/fetch failed/i.test(error.message)) return 'network'
  if (/url/i.test(error.message)) return 'config'
  return 'other'
}

// Upstash appends ", command was: [...]" with the full command, which carries the
// visitor's data, so everything from there on is dropped before redaction.
export function redactedDetail(error: unknown): string {
  if (!(error instanceof Error)) return ''
  return error.message
    .split(', command was:')[0]
    .replace(/https?:\/\/\S+/gi, '<url>')
    .replace(/[\w.-]+\.upstash\.io/gi, '<host>')
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '<email>')
    .replace(/[A-Za-z0-9_\-+/=]{20,}/g, '<redacted>')
    .slice(0, 160)
}

export function describeStoreFailure(error: unknown, stage: string) {
  return {
    stage,
    cause: error instanceof Error ? error.name : 'unknown',
    kind: failureKind(error),
    detail: redactedDetail(error),
  }
}
