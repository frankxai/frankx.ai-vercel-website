import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

async function streamAnthropicResponse(messages: Message[], apiKey: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      stream: true,
      messages: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        content: m.content,
      })),
      system: messages.find(m => m.role === 'system')?.content,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Anthropic API error')
  }

  return response.body
}

async function streamOpenAIResponse(messages: Message[], apiKey: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 4096,
      stream: true,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'OpenAI API error')
  }

  return response.body
}

async function streamGoogleResponse(messages: Message[], apiKey: string) {
  // Convert messages to Google format
  const contents = messages.filter(m => m.role !== 'system').map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const systemInstruction = messages.find(m => m.role === 'system')?.content

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
        generationConfig: {
          maxOutputTokens: 4096,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Google AI API error')
  }

  return response.body
}

function createSSEStream(
  provider: string,
  inputStream: ReadableStream<Uint8Array>
): ReadableStream {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  return new ReadableStream({
    async start(controller) {
      const reader = inputStream.getReader()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          if (provider === 'anthropic') {
            // Parse Anthropic SSE
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content: parsed.delta.text })}\n\n`)
                    )
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          } else if (provider === 'openai') {
            // Parse OpenAI SSE
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    )
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          } else if (provider === 'google') {
            // Parse Google streaming response (JSON array chunks)
            try {
              // Google returns JSON array chunks
              const jsonStr = buffer.replace(/^\[/, '').replace(/\]$/, '').replace(/^,/, '')
              if (jsonStr.trim()) {
                const chunks = jsonStr.split(/\n(?=\{)/)
                for (const chunk of chunks) {
                  try {
                    const parsed = JSON.parse(chunk.trim().replace(/^,/, ''))
                    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
                    if (text) {
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`)
                      )
                    }
                  } catch {
                    // Keep in buffer
                  }
                }
                buffer = ''
              }
            } catch {
              // Keep accumulating
            }
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('X-User-API-Key')
    const provider = req.headers.get('X-Provider') || 'anthropic'

    if (!apiKey) {
      return Response.json({ error: 'API key required' }, { status: 401 })
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages array required' }, { status: 400 })
    }

    let responseStream: ReadableStream<Uint8Array> | null = null

    switch (provider) {
      case 'anthropic':
        responseStream = await streamAnthropicResponse(messages, apiKey)
        break
      case 'openai':
        responseStream = await streamOpenAIResponse(messages, apiKey)
        break
      case 'google':
        responseStream = await streamGoogleResponse(messages, apiKey)
        break
      default:
        return Response.json({ error: 'Unsupported provider' }, { status: 400 })
    }

    if (!responseStream) {
      return Response.json({ error: 'Failed to get response stream' }, { status: 500 })
    }

    const sseStream = createSSEStream(provider, responseStream)

    return new Response(sseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('BYOK Chat Error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
