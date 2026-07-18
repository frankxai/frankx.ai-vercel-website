import { convertToModelMessages, type UIMessage } from 'ai';
import { researchAgent } from '@/lib/agents';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  const providerKey = req.headers.get('x-provider-key') ?? undefined;

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response('Invalid JSON body.', { status: 400 });
  }

  let agent;
  try {
    agent = researchAgent(providerKey);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Agent init error.';
    return new Response(message, { status: 401 });
  }

  // The agent loops internally (search -> ... -> write). Streaming the UI
  // message stream surfaces every step — tool calls and results included — so
  // the client can show the orchestrator's work as it happens.
  const result = await agent.stream({
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
