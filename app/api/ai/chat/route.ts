/**
 * Studio Crew streaming chat endpoint.
 *
 * Flow:
 *  1. Resolve tier (byok > pro > signedIn > anon) from session + KV.
 *  2. Atomically consume one message from the daily quota.
 *  3. Pick the right Gemini model for the tier; load BYOK key if applicable.
 *  4. streamText() with the persona system prompt + studio tools.
 *  5. Return a UI-message stream the @ai-sdk/react useChat hook can consume.
 */

import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai'
import { NextResponse } from 'next/server'

import { getLanguageModel, selectModelForTier } from '@/lib/ai/gemini'
import { getPersona, type PersonaId } from '@/lib/ai/personas'
import { studioTools } from '@/lib/ai/tools'
import { consumeMessage, resolveTier } from '@/lib/ai/usage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

interface ChatRequestBody {
  messages: UIMessage[]
  persona?: PersonaId
}

export async function POST(req: Request) {
  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: 'messages[] is required' }, { status: 400 })
  }

  const ctx = await resolveTier(req)
  const persona = getPersona(body.persona)
  const byokKey = ctx.byokKey

  // Preflight model availability BEFORE touching the quota counter. If we
  // can't actually serve the request, consuming a message from the visitor's
  // daily cap would lock them out for a server-config error they can't fix.
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY && !byokKey) {
    return NextResponse.json(
      {
        error: 'no_api_key',
        message:
          'The studio is offline — no Gemini API key is configured. Add GOOGLE_GENERATIVE_AI_API_KEY to the server or paste your own key under "Bring your key".',
      },
      { status: 503 }
    )
  }

  let model
  try {
    model = getLanguageModel(ctx.tier, byokKey)
  } catch (e) {
    return NextResponse.json(
      { error: 'model_unavailable', message: e instanceof Error ? e.message : 'Model setup failed' },
      { status: 500 }
    )
  }

  const consumed = await consumeMessage(ctx)
  if (!consumed.allowed) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: `You've used your ${consumed.status.limit} free messages for today. Sign in for more, bring your own Gemini key, or upgrade to Studio Pro.`,
        status: consumed.status,
      },
      {
        status: 429,
        headers: {
          'X-Studio-Tier': consumed.status.tier,
          'X-Studio-Remaining': '0',
        },
      }
    )
  }

  const modelMessages = await convertToModelMessages(body.messages)

  // stepCountIs(8) gives the model enough headroom to call 2-3 tools (search,
  // recommend, booking) AND still emit a final synthesized text answer.
  // stepCountIs(5) was too tight — a Concierge turn that fanned out across
  // searchSite → recommendProduct → bookDiscoveryCall could exhaust the budget
  // before the model produced its text response.
  const result = streamText({
    model,
    system: persona.systemPrompt,
    messages: modelMessages,
    tools: studioTools,
    stopWhen: stepCountIs(8),
    onError: ({ error }) => {
      console.error('[studio-chat] streamText error:', error)
    },
  })

  const { modelId } = selectModelForTier(ctx.tier)
  return result.toUIMessageStreamResponse({
    headers: {
      'X-Studio-Tier': consumed.status.tier,
      'X-Studio-Persona': persona.id,
      'X-Studio-Model': modelId,
      'X-Studio-Remaining':
        consumed.status.remaining === null ? 'unlimited' : String(consumed.status.remaining),
    },
  })
}
