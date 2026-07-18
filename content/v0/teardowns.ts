import type { Spectrum } from './blueprints'

// Concise architecture teardowns per archetype — the "analyze their architecture
// and plan the upgrade" layer. Full versions live in v0-template-os/analyses/ and
// v0-template-os/playbooks/. Upgrade vectors verified against Next.js 16 / AI SDK.

export interface Teardown {
  id: string
  archetype: string
  spectrum: Spectrum
  shape: string
  examples: string[]
  upgrades: string[]
}

export const teardowns: Teardown[] = [
  {
    id: 'landing-saas',
    archetype: 'Landing / marketing SaaS',
    spectrum: 'tech',
    shape: 'nav → hero (single CTA) → social proof → feature grid → pricing → CTA banner',
    examples: ['Pointer AI Landing', 'Brillance SaaS Landing'],
    upgrades: [
      'Cache Components (`use cache`) to split the static shell from dynamic proof',
      'Server Actions + useActionState for lead capture — no third-party form embed',
      'View Transitions on route changes',
      'Keep it on the Node runtime — edge is incompatible with Cache Components',
    ],
  },
  {
    id: 'dashboard-admin',
    archetype: 'Dashboard / admin',
    spectrum: 'tech',
    shape: 'sidebar shell → KPI row → data table (filters) → detail panel',
    examples: ['Financial Dashboard', 'Shadcn Dashboard'],
    upgrades: [
      'Tiered `use cache` / `use cache: private` per widget',
      'Per-widget Suspense streaming so slow panels never block the shell',
      'Server Actions + useOptimistic for mutations',
      'AI SDK tool-calling for natural-language filtering',
    ],
  },
  {
    id: 'ai-chat-agent',
    archetype: 'AI chat / agent app',
    spectrum: 'tech',
    shape: 'useChat client → /api/chat Route Handler → message.parts tool-state renderer',
    examples: ['OpenAI + AI SDK Chatbot', 'Modern AI Chatbot Interface'],
    upgrades: [
      'Typed ToolSet / InferUITools for end-to-end tool types',
      'validateUIMessages on the server boundary',
      'Custom SSE shaping for richer streamed parts',
      'Edge runtime for the chat route specifically',
    ],
  },
  {
    id: 'portfolio-showcase',
    archetype: 'Portfolio / showcase',
    spectrum: 'soul',
    shape: 'image grid → case-study detail → about / contact',
    examples: ['Portfolio Template (joyco)', 'Brutalist Void Portfolio'],
    upgrades: [
      '`use cache` + cacheTag for MDX-driven case studies',
      'View Transitions for a card → hero morph',
      '3D / motion strictly behind reduced-motion + a performance budget',
    ],
  },
  {
    id: 'ecommerce',
    archetype: 'E-commerce',
    spectrum: 'soul',
    shape: 'product grid (PLP) → PDP (variant selector) → cart drawer → Stripe webhook',
    examples: ['Shopify Ecommerce (joyco)', 'KATACHI Furniture'],
    upgrades: [
      'Static / remote / private `use cache` split across catalog, session, and cart',
      'PPR (partial prerender) on the PDP',
      'Server Actions + useOptimistic for the cart',
    ],
  },
  {
    id: 'blog-content',
    archetype: 'Blog / content platform',
    spectrum: 'soul',
    shape: 'post index → article (typed MDX or CMS fetch) → tag filters → RSS route',
    examples: ['BaseHub CMS Blog', 'Vercel Blog Starter Kit', 'ISR WordPress Blog'],
    upgrades: [
      'Stream the article body in its own Suspense so the header paints before a slow CMS fetch',
      '`cacheTag` post fetching + webhook revalidation — publish without redeploy',
      'AI SDK "ask about this post" panel grounded on the single article, not site-wide RAG',
      'Programmatic RSS/JSON Feed route reading the same cached source',
    ],
  },
  {
    id: 'game-animation',
    archetype: 'Game / animation experience',
    spectrum: 'soul',
    shape: 'canvas or WebGL scene mount → imperative rAF loop outside React → DOM HUD overlay',
    examples: ['Pixel Survivor', 'Martian Parallax', 'Scroll 3D Product Explode'],
    upgrades: [
      'Lazy-mount every scene behind `next/dynamic({ ssr: false })` + IntersectionObserver',
      'Reduced-motion = static poster branch, not a CSS pause — the cost is GPU work',
      'Web Worker offload for noise/particle physics',
      'Pause rendering on visibilitychange and scroll-out, not just unmount',
    ],
  },
  {
    id: 'auth-flow',
    archetype: 'Auth flow',
    spectrum: 'tech',
    shape: '(auth) route group → shared auth card → Server Action or provider SDK → middleware gate',
    examples: ['shadcn Login Block', 'Clerk Waitlist Starter', 'Auth Flows UI Kit'],
    upgrades: [
      'Most templates are visual mockups — wiring a real provider end-to-end is the differentiator',
      'Passkeys/WebAuthn as a first-class option (zero templates surveyed ship it)',
      'Rate-limiting + challenge on sign-up and reset, keyed on IP + email',
      'Middleware session verification for protected routes, not per-page checks',
    ],
  },
]
