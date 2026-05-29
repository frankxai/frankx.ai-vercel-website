/**
 * Studio Crew streaming chat endpoint.
 *
 * Flow:
 *  1. Read optional BYOK key from the x-studio-byok-key header (never stored).
 *  2. Resolve tier (pro > signedIn > anon) from session + KV; BYOK header
 *     upgrades to the unlimited tier.
 *  3. Preflight: Gateway configured OR a BYOK key present, else 503.
 *  4. Consume one message from the daily quota (skipped for unlimited tiers).
 *  5. streamText() with the persona system prompt + studio tools.
 *  6. Return a UI-message stream the @ai-sdk/react useChat hook can consume.
 */

import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai'
import { NextResponse } from 'next/server'

import { getLanguageModel, isGatewayAvailable, selectModelForTier } from '@/lib/ai/model'
import { getPersona, type PersonaId } from '@/lib/ai/personas'
import { studioTools } from '@/lib/ai/tools'
import { consumeMessage, resolveTier, withByok } from '@/lib/ai/usage'

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

  // BYOK key arrives per-request in a header (sourced from client localStorage).
  // It is used transiently for this one request and never written to storage.
  const rawByok = req.headers.get('x-studio-byok-key')?.trim() || ''
  const byokKey = rawByok.length >= 20 ? rawByok : null

  const baseCtx = await resolveTier(req)
  const ctx = withByok(baseCtx, !!byokKey)
  const persona = getPersona(body.persona)

  // Preflight model availability BEFORE touching the quota counter. If we
  // can't actually serve the request, consuming a message from the visitor's
  // daily cap would lock them out for a server-config error they can't fix.
  if (!isGatewayAvailable() && !byokKey) {
    return NextResponse.json(
      {
        error: 'no_api_key',
        message:
          'The studio is offline — the AI Gateway is not configured. Set AI_GATEWAY_API_KEY on the server, or bring your own Gemini key under "Bring your key".',
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
