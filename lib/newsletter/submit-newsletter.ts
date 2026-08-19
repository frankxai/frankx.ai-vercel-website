export type NewsletterSubmissionResult =
  | { ok: true }
  | { ok: false; message: string }

type NewsletterResponse = {
  success?: boolean
  error?: string
}

const DEFAULT_ERROR = 'Subscription could not be completed. Please try again.'

export async function submitNewsletter(
  email: string,
  request: typeof fetch = fetch
): Promise<NewsletterSubmissionResult> {
  try {
    const response = await request('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listType: 'newsletter',
        source: 'email-capture-form',
      }),
    })
    const body = (await response.json().catch(() => ({}))) as NewsletterResponse

    if (!response.ok || body.success !== true) {
      return { ok: false, message: body.error || DEFAULT_ERROR }
    }

    return { ok: true }
  } catch {
    return { ok: false, message: DEFAULT_ERROR }
  }
}
