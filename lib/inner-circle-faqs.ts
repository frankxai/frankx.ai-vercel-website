/**
 * Inner Circle FAQs — single source of truth.
 * Consumed by:
 *   - app/inner-circle/page.tsx (client component — renders the FAQ UI)
 *   - app/inner-circle/layout.tsx (server component — emits FAQPage JSON-LD)
 *
 * When updating FAQs, edit ONLY this file.
 */

export interface InnerCircleFAQ {
  question: string
  answer: string
}

export const INNER_CIRCLE_FAQS: InnerCircleFAQ[] = [
  {
    question: 'What is the Inner Circle?',
    answer:
      "The Inner Circle is FrankX's premium community for builders and creators serious about AI. You get access to the vault, live labs, templates, prompt packs, and direct support from the agent collective.",
  },
  {
    question: 'How much does the Inner Circle cost?',
    answer:
      "Circle tier is $119/month or $999/year (annual saves ~30%). Alliance starts at $2,000/month with custom scope. Signal stays free. Doors open Monday June 1, 2026 at 09:00 CET. Billing starts the same day. Cancel anytime in one click — no lock-in, no fees, no questions. Annual plans charged once; monthly plans charged monthly via Stripe.",
  },
  {
    question: "What's the founding-member bonus?",
    answer:
      "The first 100 to join during launch week (June 1-7) lock the founding rate for life, get a founders-only Slack channel that closes after June 7, and an exclusive July masterclass not available to later joiners. After 100, standard renewal pricing applies.",
  },
  {
    question: 'When are the first masterclasses?',
    answer:
      "Three confirmed dates: Monday June 22, 19:00 CET — Agent Orchestration with Frank · Monday July 20, 19:00 CET — Prompt Engineering at Scale · Monday August 10, 19:00 CET — Shipping AI Products. All recorded + indexed in the vault. Live attendance is encouraged but not required; replay drops within 24h.",
  },
  {
    question: 'Can I see what\'s inside before I commit?',
    answer:
      "Yes. The vault preview at frankx.ai/inner-circle/vault-preview shows five items you'll have within the first 30 days: the Oracle-style use-case intake form, the agent template collection, the Creator Mode prompt pack (47 prompts), the first masterclass details, and the first lab recording. Updated every week after launch.",
  },
  {
    question: 'What\'s the cancellation policy?',
    answer:
      "One-click cancel anytime, no lock-in, no fees to exit. Your data exports anytime. If you cancel within 30 days of joining and weren't satisfied, hit reply on the launch email and Frank will refund the first payment directly — no questions, no friction.",
  },
  {
    question: "What's included in the free Signal tier?",
    answer:
      'Signal members receive the weekly Creation Chronicles dispatch, access to public blog posts and research, and early product announcements. It\'s the best way to stay connected with FrankX intelligence.',
  },
  {
    question: 'How are the live labs structured?',
    answer:
      'You receive a pre-lab brief 48 hours before. During the session, we build in real time and ship something real. After, every lab drops into the Vault with a recap, templates, and implementation checklist.',
  },
  {
    question: 'What does Alliance include?',
    answer:
      'Alliance is our enterprise tier with custom strategy work, dedicated agent builds, executive briefings, and bespoke governance frameworks. Contact us to discuss your specific needs.',
  },
]
