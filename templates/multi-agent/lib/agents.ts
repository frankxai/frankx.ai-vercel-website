import { createOpenAI } from '@ai-sdk/openai';
import { Agent, tool, stepCountIs, generateText } from 'ai';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Provider — BYOK. The key is passed in per request and never persisted.
// ---------------------------------------------------------------------------
function model(providerKey?: string) {
  const apiKey = providerKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('No provider key. Send one in the `x-provider-key` header.');
  }
  return createOpenAI({ apiKey })('gpt-4o-mini');
}

// ---------------------------------------------------------------------------
// Worker tools. The orchestrator agent calls these. The "search" worker is
// stubbed with deterministic results so the template runs with zero external
// dependencies — replace its body with a real search API (Tavily, Exa, Brave).
// The "write" worker spins up a focused sub-agent: a small, single-purpose
// model call. This is the orchestrator -> workers pattern in miniature.
// ---------------------------------------------------------------------------
function workerTools(providerKey?: string) {
  return {
    search: tool({
      description:
        'Search the web for factual snippets about a topic. Returns a list of result strings.',
      inputSchema: z.object({
        query: z.string().describe('The search query'),
      }),
      execute: async ({ query }) => {
        // --- Replace this stub with a real search call. ---
        // const res = await fetch('https://api.tavily.com/search', { ... });
        return {
          query,
          results: [
            `Overview: ${query} — a concise factual summary would appear here.`,
            `Key point: a notable detail about "${query}".`,
            `Context: background relevant to "${query}".`,
          ],
        };
      },
    }),

    write: tool({
      description:
        'Draft a well-structured prose answer from a set of research notes. Use after gathering enough material.',
      inputSchema: z.object({
        topic: z.string().describe('What the answer is about'),
        notes: z
          .array(z.string())
          .describe('Research notes / facts to base the draft on'),
      }),
      execute: async ({ topic, notes }) => {
        // A focused worker sub-agent: one tight call, single responsibility.
        const { text } = await generateText({
          model: model(providerKey),
          system:
            'You are a precise writer. Turn the supplied notes into a clear, ' +
            'well-structured answer. Do not invent facts beyond the notes.',
          prompt: `Topic: ${topic}\n\nNotes:\n${notes
            .map((n) => `- ${n}`)
            .join('\n')}\n\nWrite the answer.`,
        });
        return { draft: text };
      },
    }),
  };
}

// ---------------------------------------------------------------------------
// Orchestrator agent. It decides when to search, when it has enough, and when
// to delegate the final draft to the write worker. `stopWhen` caps the loop so
// it can't run away. Step streaming surfaces each tool call to the UI.
// ---------------------------------------------------------------------------
export function researchAgent(providerKey?: string) {
  return new Agent({
    model: model(providerKey),
    system: [
      'You are a research orchestrator.',
      'Plan: use the `search` tool to gather facts (call it more than once if',
      'the topic has distinct sub-questions), then call the `write` tool to',
      'produce the final answer from your gathered notes.',
      'Do not write the final prose yourself — always delegate it to `write`.',
      'Keep going until you have a complete answer, then stop.',
    ].join('\n'),
    tools: workerTools(providerKey),
    stopWhen: stepCountIs(8),
  });
}
