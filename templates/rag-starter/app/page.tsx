'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useMemo, useState } from 'react';

type Source = { n: number; source: string; similarity: number };

export default function Home() {
  const [providerKey, setProviderKey] = useState('');
  const [docSource, setDocSource] = useState('');
  const [docText, setDocText] = useState('');
  const [ingestStatus, setIngestStatus] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [input, setInput] = useState('');

  // BYOK header is attached to every chat request and never stored. The chat
  // route returns retrieved sources in an `x-sources` header; a fetch wrapper
  // captures it (AI SDK 6's useChat no longer exposes an onResponse hook).
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        headers: providerKey ? { 'x-provider-key': providerKey } : undefined,
        fetch: async (input, init) => {
          const res = await fetch(input, init);
          const raw = res.headers.get('x-sources');
          if (raw) {
            try {
              setSources(JSON.parse(decodeURIComponent(raw)));
            } catch {
              setSources([]);
            }
          }
          return res;
        },
      }),
    [providerKey]
  );

  const { messages, sendMessage, status } = useChat({ transport });

  async function ingest() {
    setIngestStatus('Ingesting…');
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(providerKey ? { 'x-provider-key': providerKey } : {}),
        },
        body: JSON.stringify({ source: docSource, text: docText }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { chunks } = await res.json();
      setIngestStatus(`Stored ${chunks} chunk(s).`);
      setDocText('');
    } catch (err) {
      setIngestStatus(err instanceof Error ? err.message : 'Ingest failed.');
    }
  }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>RAG Starter</h1>
      <p style={{ color: '#9a9aa3', marginTop: 0 }}>
        Vercel AI SDK 6 · Supabase pgvector · streaming answers with citations
      </p>

      <section style={card}>
        <label style={label}>OpenAI key (BYOK — sent per request, never stored)</label>
        <input
          type="password"
          value={providerKey}
          onChange={(e) => setProviderKey(e.target.value)}
          placeholder="sk-…"
          style={field}
        />
      </section>

      <section style={card}>
        <h2 style={h2}>1. Ingest a document</h2>
        <input
          value={docSource}
          onChange={(e) => setDocSource(e.target.value)}
          placeholder="Source label (e.g. handbook.md)"
          style={field}
        />
        <textarea
          value={docText}
          onChange={(e) => setDocText(e.target.value)}
          placeholder="Paste document text here…"
          rows={5}
          style={{ ...field, resize: 'vertical' }}
        />
        <button onClick={ingest} disabled={!docText.trim()} style={button}>
          Ingest
        </button>
        {ingestStatus && (
          <p style={{ color: '#9a9aa3', fontSize: 13 }}>{ingestStatus}</p>
        )}
      </section>

      <section style={card}>
        <h2 style={h2}>2. Ask a question</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m) => (
            <div key={m.id} style={{ fontSize: 15 }}>
              <strong style={{ color: m.role === 'user' ? '#7dd3fc' : '#a7f3d0' }}>
                {m.role === 'user' ? 'You' : 'Assistant'}:
              </strong>{' '}
              {m.parts
                .filter((p) => p.type === 'text')
                .map((p, i) => (
                  <span key={i}>{(p as { text: string }).text}</span>
                ))}
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage({ text: input });
            setInput('');
          }}
          style={{ display: 'flex', gap: 8, marginTop: 12 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What does the document say about…?"
            style={{ ...field, marginBottom: 0 }}
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            style={button}
          >
            Send
          </button>
        </form>

        {sources.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <p style={{ ...label, marginBottom: 6 }}>Sources</p>
            <ul style={{ margin: 0, paddingLeft: 18, color: '#9a9aa3', fontSize: 13 }}>
              {sources.map((s) => (
                <li key={s.n}>
                  [{s.n}] {s.source} — score {s.similarity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

const card: React.CSSProperties = {
  background: '#15151c',
  border: '1px solid #26262f',
  borderRadius: 12,
  padding: 16,
  marginTop: 16,
};
const h2: React.CSSProperties = { fontSize: 16, marginTop: 0 };
const label: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: '#9a9aa3',
  marginBottom: 6,
};
const field: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '9px 11px',
  marginBottom: 10,
  background: '#0b0b0f',
  border: '1px solid #2d2d38',
  borderRadius: 8,
  color: '#e7e7ea',
  fontSize: 14,
};
const button: React.CSSProperties = {
  padding: '9px 16px',
  background: '#2563eb',
  border: 'none',
  borderRadius: 8,
  color: 'white',
  fontSize: 14,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};
