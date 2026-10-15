// Public copy for each per-product waitlist page. Every line describes what the product is meant to
// be, never what it has done: none of these products exists yet, so there is nothing to quote,
// count or guarantee. Founding benefits from the registry rows are left off until Frank publishes
// them, because a stated benefit is a commitment to every person who joins.

export interface WaitlistCopy {
  name: string
  lede: string
  includes: string[]
  freeNow?: { text: string; href: string; label: string }
}

export const WAITLIST_COPY: Record<string, WaitlistCopy> = {
  'creative-ai-toolkit': {
    name: 'Creative AI Toolkit',
    lede: 'Prompt patterns and workflow templates for creators who use AI every day.',
    includes: [
      'Prompt patterns for storytelling, marketing, content and operations',
      'Worked examples with each pattern, and a test file that shows where it fails',
      'Workflow templates for drafting, email and social posts',
    ],
    freeNow: {
      text: 'The open prompt library is already public. No email needed.',
      href: '/prompt-library',
      label: 'Browse the prompt library',
    },
  },
  'creation-chronicles': {
    name: 'Creation Chronicles',
    lede: 'A storytelling system for founders and creators who want to publish on a steady rhythm.',
    includes: [
      'Story architecture: your core story, message order and hooks',
      'Production routines: editorial calendar, prompt packs and format adaptation',
      'Audience development: reader profiles and feedback loops',
      'Distribution templates for search, social and partnerships',
    ],
    freeNow: {
      text: 'Essays and music from the studio are already public. No email needed.',
      href: '/creation-chronicles',
      label: 'Read the Chronicles',
    },
  },
}
