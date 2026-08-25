import { createHash } from 'node:crypto'

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308])

function assertPositiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`)
}

function assertAllowedUrl(rawUrl, allowedHosts, { allowHttp = false } = {}) {
  const url = new URL(rawUrl)
  if (url.username || url.password) throw new Error(`credentials are forbidden in URL ${url.origin}`)
  if (url.protocol !== 'https:' && !(allowHttp && url.protocol === 'http:')) {
    throw new Error(`only HTTPS is allowed for ${url.href}`)
  }
  if (!allowedHosts.includes(url.hostname)) {
    throw new Error(`host ${url.hostname} is outside allowlist [${allowedHosts.join(', ')}]`)
  }
  return url
}

export async function fetchBytesBounded(rawUrl, {
  allowedHosts,
  maxBytes,
  maxRedirects,
  timeoutMs,
  headers = {},
  allowHttp = false,
  fetchImpl = fetch,
} = {}) {
  if (!Array.isArray(allowedHosts) || !allowedHosts.length) throw new Error('allowedHosts is required')
  assertPositiveInteger(maxBytes, 'maxBytes')
  if (!Number.isSafeInteger(maxRedirects) || maxRedirects < 0) throw new Error('maxRedirects must be a non-negative safe integer')
  assertPositiveInteger(timeoutMs, 'timeoutMs')

  let current = assertAllowedUrl(rawUrl, allowedHosts, { allowHttp })
  let requestHeaders = new Headers(headers)
  for (let redirectCount = 0; ; redirectCount++) {
    const response = await fetchImpl(current, {
      headers: requestHeaders,
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    })

    if (REDIRECT_STATUSES.has(response.status)) {
      if (redirectCount >= maxRedirects) throw new Error(`redirect limit ${maxRedirects} exceeded`)
      const location = response.headers.get('location')
      if (!location) throw new Error(`redirect ${response.status} has no Location header`)
      const next = assertAllowedUrl(new URL(location, current).href, allowedHosts, { allowHttp })
      if (next.origin !== current.origin) {
        requestHeaders = new Headers(requestHeaders)
        for (const sensitive of ['authorization', 'cookie', 'proxy-authorization']) requestHeaders.delete(sensitive)
      }
      current = next
      continue
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const finalUrl = assertAllowedUrl(response.url || current.href, allowedHosts, { allowHttp })
    const contentLength = response.headers.get('content-length')
    if (contentLength !== null) {
      const declared = Number(contentLength)
      if (!Number.isSafeInteger(declared) || declared < 0) throw new Error('invalid Content-Length')
      if (declared > maxBytes) throw new Error(`response exceeds ${maxBytes} bytes (Content-Length ${declared})`)
    }

    if (!response.body) throw new Error('response has no body')
    const chunks = []
    let total = 0
    for await (const chunk of response.body) {
      total += chunk.byteLength
      if (total > maxBytes) {
        try { await response.body.cancel() } catch { /* best effort */ }
        throw new Error(`response exceeds ${maxBytes} bytes`)
      }
      chunks.push(chunk)
    }

    const bytes = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)), total)
    return { bytes, finalUrl: finalUrl.href, redirects: redirectCount }
  }
}

export async function fetchTextBounded(rawUrl, options) {
  const result = await fetchBytesBounded(rawUrl, options)
  return { ...result, text: new TextDecoder('utf-8', { fatal: true }).decode(result.bytes) }
}

export async function fetchJsonBounded(rawUrl, options) {
  const result = await fetchTextBounded(rawUrl, options)
  try {
    return { ...result, value: JSON.parse(result.text) }
  } catch (error) {
    throw new Error(`invalid JSON response: ${error.message}`)
  }
}

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}
