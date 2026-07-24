import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { retrieve, buildContext } from '@/lib/rag';

// Run on the Node.js runtime — the Supabase client and embeddings call need it.
export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  const providerKey = req.headers.get('x-provider-key') ?? undefined;

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response('Invalid JSON body.', { status: 400 });
  }

  // The last user message is the retrieval query. AI SDK clients send `parts`;
  // simpler clients may send a plain `content` string — handle both.
  const last = [...messages].reverse().find((m) => m.role === 'user');
  const fromParts = last?.parts
    ?.filter((p) => p.type === 'text')
    .map((p) => (p as { text: string }).text)
    .join(' ')
    .trim();
  const rawContent = (last as { content?: unknown } | undefined)?.content;
  const fromContent = typeof rawContent === 'string' ? rawContent.trim() : '';
  const query = fromParts || fromContent;

  if (!query) {
    return new Response('No user message to answer.', { status: 400 });
  }

  let context: string;
  let sources: { n: number; source: string; similarity: number }[];
  try {
    const chunks = await retrieve(query, providerKey);
    context = buildContext(chunks);
    sources = chunks.map((c, i) => ({
      n: i + 1,
      source: c.source,
      similarity: Number(c.similarity.toFixed(3)),
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Retrieval error.';
    return new Response(message, { status: 500 });
  }

  const apiKey = providerKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      'No provider key. Send one in the `x-provider-key` header.',
      { status: 401 }
    );
  }
  const openai = createOpenAI({ apiKey });

  const system = [
    'You answer strictly from the provided context.',
    'Cite sources inline using the bracketed numbers, e.g. [1], [2].',
    'If the context does not contain the answer, say so plainly — do not invent.',
    '',
    'Context:',
    context,
  ].join('\n');

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages: await convertToModelMessages(messages),
  });

  // Stream the answer; attach the resolved sources as response headers so the
  // client can render citations without a second round-trip.
  return result.toUIMessageStreamResponse({
    headers: {
      'x-sources': encodeURIComponent(JSON.stringify(sources)),
    },
  });
}
