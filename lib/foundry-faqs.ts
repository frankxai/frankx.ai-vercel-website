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
      'The Foundry installs a website, AI-agent harness, pre-publish quality gates, and business memory using the same contract-and-gate pattern applied on frankx.ai. The system is adapted to your brand in a guided derivation, and you own the resulting repository.',
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
      'Pricing and scope follow the fit review. The underlying template is MIT-licensed; what the Foundry prices is the guided install, brand derivation, and agreed support relationship.',
  },
  {
    question: 'What does "staying connected" mean?',
    answer:
      'Your repo can be registered as a downstream instance. When an upstream harness improvement applies, it can arrive as a pull request with a plain-language changelog. You read the diff and merge or decline; nothing auto-merges, and brand files remain under your control.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. The operating layer uses plain-language contracts that teach a coding agent the business context, boundaries, and quality checks. The operating rhythm is documented during the install and adjusted to the company rather than sold as a universal time promise.',
  },
  {
    question: 'How does this relate to Founder’s Circle?',
    answer:
      'The Foundry is implementation: one business, one operating system, installed around real work. Founder’s Circle is strategic access for consequential decisions under uncertainty. Neither requires the other.',
  },
  {
    question: 'What can I verify before applying?',
    answer:
      'The operating guide, Agentic Business OS template, harness contract, and related public repositories are linked from the page. Inspect the source, the quality gates, and the ownership model before deciding whether an application makes sense.',
  },
]
