export interface NewsletterContactInput {
  email: string
  firstName?: string
  properties?: Record<string, string>
  segmentId: string
  newsletterTopicId: string
  topics: Array<{ id: string; subscription: 'opt_in' | 'opt_out' }>
}

export type NewsletterContactResult = {
  kind: 'existing' | 'created' | 'updated' | 'suppressed' | 'pending' | 'provider-error'
  response: Response
}

type Options = { apiKey: string; fetchImpl?: typeof fetch }

function requestContext(input: NewsletterContactInput, options: Options) {
  if (!options.apiKey || !input.segmentId || !input.newsletterTopicId) {
    throw new Error('Newsletter contact configuration is missing')
  }
  return {
    fetchImpl: options.fetchImpl ?? fetch,
    email: input.email.trim().toLowerCase(),
    headers: { Authorization: `Bearer ${options.apiKey}`, 'Content-Type': 'application/json' },
    newsletter: input.topics.some(topic => topic.id === input.newsletterTopicId && topic.subscription === 'opt_in'),
  }
}

export async function createNewsletterContact(
  input: NewsletterContactInput,
  options: Options,
): Promise<NewsletterContactResult> {
  const { fetchImpl, email, headers, newsletter } = requestContext(input, options)
  const existing = await fetchImpl(
    `https://api.resend.com/contacts/${encodeURIComponent(email)}`,
    { headers, cache: 'no-store', signal: AbortSignal.timeout(10_000) },
  )
  // A contact observed by this lookup requires the signed preference flow.
  // Concurrent provider creation semantics remain a separate integration gate.
  if (existing.ok) return { kind: 'existing', response: existing }
  if (existing.status !== 404) return { kind: 'provider-error', response: existing }
  const response = await fetchImpl('https://api.resend.com/contacts', {
    method: 'POST', headers, signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      email,
      ...(input.firstName ? { first_name: input.firstName } : {}),
      ...(input.properties ? { properties: input.properties } : {}),
      ...(newsletter ? { segments: [{ id: input.segmentId }] } : {}),
      topics: input.topics,
    }),
  })
  return { kind: response.ok ? 'created' : 'provider-error', response }
}

// Invoke only after the route validates its email-bound, expiring HMAC token.
// Global suppression is preserved; withdrawal removes targeting first.
// Confirmed enrollment is pending durable consent revision fencing.
export async function updateConfirmedNewsletterPreferences(
  input: NewsletterContactInput,
  options: Options,
): Promise<NewsletterContactResult> {
  const { fetchImpl, email, headers, newsletter } = requestContext(input, options)
  const url = `https://api.resend.com/contacts/${encodeURIComponent(email)}`
  const contact = await fetchImpl(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(10_000) })
  if (!contact.ok) return { kind: 'provider-error', response: contact }
  const data = await contact.json().catch(() => null) as { unsubscribed?: unknown } | null
  if (newsletter && data?.unsubscribed !== false) {
    return { kind: 'suppressed', response: new Response(null, { status: 409 }) }
  }
  // Enrollment must be fenced by an authoritative consent revision. A process-local
  // mutex cannot serialize concurrent serverless invocations or revoke old links.
  // Keep this staged path fail-closed until that durable contract is implemented.
  if (newsletter) return { kind: 'pending', response: new Response(null, { status: 503 }) }
  const segmentUrl = `${url}/segments/${encodeURIComponent(input.segmentId)}`
  const removal = await fetchImpl(segmentUrl, { method: 'DELETE', headers, signal: AbortSignal.timeout(10_000) })
  if (!removal.ok && removal.status !== 404) return { kind: 'provider-error', response: removal }
  const topics = await fetchImpl(`${url}/topics`, {
    method: 'PATCH', headers, signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({ topics: input.topics }),
  })
  if (!topics.ok) return { kind: 'provider-error', response: topics }
  return { kind: 'updated', response: topics }
}
