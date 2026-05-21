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
    question: 'When does the Inner Circle launch?',
    answer:
      "We're currently in waitlist mode. Join now to be first in line for launch pricing, onboarding bonuses, and early access to the vault.",
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
