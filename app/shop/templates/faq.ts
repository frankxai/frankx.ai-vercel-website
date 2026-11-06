// Single source for the /shop/templates FAQ: the visible section in page.tsx and the
// FAQPage JSON-LD in layout.tsx both import this, so the two cannot drift apart.
export const templatesFaq = [
  {
    q: 'Can I buy these templates now?',
    a: 'No. There is no checkout yet and nothing is on sale. Join the launch list at /waitlist to hear when a kit is released.',
  },
  {
    q: 'Do I need my own API keys?',
    a: 'Planned kits may need your own API keys for the services they use. Details will be confirmed per kit before launch.',
  },
  {
    q: 'What platforms can I deploy to?',
    a: 'It varies by kit and is not final. Some kits are n8n workflows, Next.js starters or Python backends, and the platforms for each are confirmed per kit before launch. No deploy buttons exist yet.',
  },
] as const
