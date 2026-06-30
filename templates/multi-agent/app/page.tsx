'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useMemo, useState } from 'react';

export default function Home() {
  const [providerKey, setProviderKey] = useState('');
  const [input, setInput] = useState('');

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/agent',
        headers: providerKey ? { 'x-provider-key': providerKey } : undefined,
      }),
    [providerKey]
  );

  const { messages, sendMessage, status } = useChat({ transport });

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>Multi-Agent Starter</h1>
      <p style={{ color: '#9a9aa3', marginTop: 0 }}>
        AI SDK 6 Agent · orchestrator delegates to a search worker and a writer worker
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((m) => (
            <div key={m.id}>
              <strong
                style={{ color: m.role === 'user' ? '#7dd3fc' : '#a7f3d0', fontSize: 14 }}
              >
                {m.role === 'user' ? 'You' : 'Agent'}
              </strong>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {m.parts.map((part, i) => {
                  if (part.type === 'text') {
                    return (
                      <div key={i} style={{ fontSize: 15, lineHeight: 1.5 }}>
                        {part.text}
                      </div>
                    );
                  }
                  // Tool-call parts are typed `tool-${name}` in AI SDK 6.
                  if (part.type.startsWith('tool-')) {
                    const p = part as {
                      type: string;
                      state?: string;
                      input?: unknown;
                      output?: unknown;
                    };
                    const name = part.type.replace('tool-', '');
                    return (
                      <div key={i} style={step}>
                        <span style={{ color: '#fbbf24' }}>⚙ {name}</span>
                        {p.input != null && (
                          <pre style={pre}>{JSON.stringify(p.input, null, 2)}</pre>
                        )}
                        {p.state === 'output-available' && p.output != null && (
                          <pre style={{ ...pre, color: '#a7f3d0' }}>
                            {JSON.stringify(p.output, null, 2)}
                          </pre>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <p style={{ color: '#6b6b75', fontSize: 14 }}>
              Try: “Compare REST and GraphQL for a public API.”
            </p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage({ text: input });
            setInput('');
          }}
          style={{ display: 'flex', gap: 8, marginTop: 16 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the research agent…"
            style={{ ...field, marginBottom: 0 }}
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            style={button}
          >
            Run
          </button>
        </form>
        {status !== 'ready' && status !== 'error' && (
          <p style={{ color: '#9a9aa3', fontSize: 13, marginBottom: 0 }}>
            Agent working…
          </p>
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
const step: React.CSSProperties = {
  background: '#0b0b0f',
  border: '1px solid #2d2d38',
  borderRadius: 8,
  padding: '8px 10px',
  fontSize: 13,
};
const pre: React.CSSProperties = {
  margin: '6px 0 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: 12,
  color: '#c9c9d1',
};
