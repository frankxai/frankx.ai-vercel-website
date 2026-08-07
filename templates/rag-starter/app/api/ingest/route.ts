import { ingest } from '@/lib/rag';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  const providerKey = req.headers.get('x-provider-key') ?? undefined;

  let source: string;
  let text: string;
  try {
    ({ source, text } = await req.json());
  } catch {
    return new Response('Invalid JSON body.', { status: 400 });
  }

  if (!text?.trim()) {
    return new Response('`text` is required.', { status: 400 });
  }

  try {
    const count = await ingest(source?.trim() || 'untitled', text, providerKey);
    return Response.json({ chunks: count });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ingest error.';
    return new Response(message, { status: 500 });
  }
}
