// Single source of truth for the templates FAQ — rendered by the client page
// and emitted as FAQPage JSON-LD by the route layout for rich-result eligibility.
export const templatesFaq = [
  {
    q: 'What do these cost?',
    a: 'Nothing. Every starter is free and MIT-licensed. View the source on GitHub or deploy your own copy to Vercel in one click.',
  },
  {
    q: 'Can I use them for commercial projects?',
    a: 'Yes. MIT means you can use, modify, and ship them in client projects, SaaS products, or internal tools.',
  },
  {
    q: 'Do they work with OCI GenAI?',
    a: 'Starters marked "OCI Ready" include notes for swapping in an OCI GenAI provider variant alongside Anthropic / OpenAI / Google.',
  },
  {
    q: 'Do I need my own API keys?',
    a: 'Yes. Each starter is BYOK — you supply keys for the providers you use (Anthropic, OpenAI, Google, or OCI), so you control costs.',
  },
  {
    q: 'Are these turnkey production systems?',
    a: 'No — they are honest starting points. Core logic is implemented and runnable; you still add auth, evals, and hardening for production.',
  },
]
