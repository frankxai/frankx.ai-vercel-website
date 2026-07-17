/**
 * Foundry FAQs — single source of truth.
 * Consumed by:
 *   - app/foundry/page.tsx (renders the FAQ UI + FAQPage JSON-LD)
 *
 * When updating FAQs, edit ONLY this file.
 */

export interface FoundryFAQ {
  question: string
  answer: string
}

export const FOUNDRY_FAQS: FoundryFAQ[] = [
  {
    question: 'What is the FrankX Foundry?',
    answer:
      'The Foundry installs complete operating systems into businesses: a website, an AI-agent harness, pre-publish quality gates, and a compounding business memory — the same architecture that runs frankx.ai, adapted to your brand in a guided derivation. You walk out owning the whole repo.',
  },
  {
    question: 'What exactly gets installed?',
    answer:
      'An instance of the Agentic Business OS: a Next.js site, five contract files that teach any AI agent your brand (doctrine, design tokens, taste, voice, operating skill), specialist agents including a zero-tolerance claims gate, six operating commands, and a file-based business memory. The template is open source — you can inspect every part before applying.',
  },
  {
    question: 'Why is it application-only?',
    answer:
      'Install capacity is limited to a small number per quarter, and the system only compounds for founders who actually operate it weekly. The evaluation protects both sides: we take businesses where the architecture genuinely fits, with priority for sustainable, healthcare, and meaningful products.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Pricing follows evaluation — the founding cohort is forming now and applications are open. The underlying template is MIT-licensed and free forever; what the Foundry prices is the install, the brand derivation, and the connected relationship.',
  },
  {
    question: 'What does "staying connected" mean?',
    answer:
      'Your repo is registered as a downstream instance. When the upstream harness improves — a sharper gate, a new agent — you receive a pull request with a plain-language changelog. You read the diff and merge or decline; nothing ever auto-merges, and your brand files are never touched. The first instance has already merged its first sync.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. The operating layer is plain language: you talk to a coding agent in your repo and it behaves like a trained team member, because the contract files teach it your business. The weekly rhythm is about 30 minutes of structure — a Monday plan and a Friday review.',
  },
  {
    question: 'How does this relate to the Inner Circle and Alliance?',
    answer:
      'The Inner Circle is the FrankX community and vault. Alliance is custom-scope partnership. The Foundry is narrower and deeper than both: one business, one operating system, installed and connected. Alliance conversations often include a Foundry install; an Inner Circle membership is neither required nor assumed.',
  },
  {
    question: 'Is the system actually proven?',
    answer:
      'The architecture runs frankx.ai in production — 500+ routes, automated quality gates, a public agent catalog. The first external install (a European consumer-goods launch) went from zero to a build-verified, gated, deployed-ready operating system in one day, and is now a registered downstream instance receiving harness updates. The repos are public; verify rather than trust.',
  },
]
