export type CourseRelationship = 'editorial' | 'affiliate' | 'owned'

export type CourseRecommendation = {
  slug: string
  provider: string
  title: string
  canonicalUrl: string
  affiliateUrl?: string
  relationship: CourseRelationship
  level: string
  effort: string
  format: string
  bestFor: string
  verdict: string
  whyItMadeTheList: string
  tags: string[]
  lastVerified: string
  relatedArticle?: {
    title: string
    href: string
  }
}

export type LearningOutcome = {
  id: string
  title: string
  audience: string
  capability: string
  href: string
  routeLabel: string
}

export type LearningFieldNote = {
  title: string
  description: string
  href: string
  readingTime: string
  label: string
}

/**
 * Coursera affiliate destinations belong in `affiliateUrl` only after the
 * FrankX Impact account is approved and a real tracking link is available.
 * Until then the UI uses the verified canonical provider URL.
 */
export const recommendedCourses: CourseRecommendation[] = [
  {
    slug: 'google-ai-professional-certificate',
    provider: 'Google',
    title: 'Google AI Professional Certificate',
    canonicalUrl: 'https://www.coursera.org/professional-certificates/google-ai',
    relationship: 'editorial',
    level: 'Beginner',
    effort: 'Multi-course certificate',
    format: 'Self-paced',
    bestFor: 'Knowledge workers who want a practical, broad AI operating baseline',
    verdict:
      'The strongest general starting point when the goal is better work across research, writing, analysis, and coding.',
    whyItMadeTheList:
      'It is current, practical, and designed for people without prior AI experience.',
    tags: ['AI fluency', 'Workflows', 'Responsible use'],
    lastVerified: '2026-07-24',
    relatedArticle: {
      title: 'ChatGPT vs Claude vs Gemini',
      href: '/blog/chatgpt-vs-claude-vs-gemini-2026',
    },
  },
  {
    slug: 'ai-for-everyone',
    provider: 'DeepLearning.AI',
    title: 'AI For Everyone',
    canonicalUrl: 'https://www.coursera.org/learn/ai-for-everyone',
    relationship: 'editorial',
    level: 'Beginner',
    effort: 'About 6 hours',
    format: '4 modules',
    bestFor: 'Leaders and operators who need sound AI vocabulary and strategy',
    verdict:
      'A compact nontechnical primer for deciding where AI belongs in an organization—and where it does not.',
    whyItMadeTheList:
      'It teaches opportunity selection, team collaboration, and realistic AI strategy without requiring code.',
    tags: ['Strategy', 'AI literacy', 'Leadership'],
    lastVerified: '2026-07-24',
    relatedArticle: {
      title: 'The frontier model landscape',
      href: '/blog/frontier-model-landscape-2026-claude-gpt-gemini-deepseek',
    },
  },
  {
    slug: 'machine-learning-specialization',
    provider: 'DeepLearning.AI + Stanford Online',
    title: 'Machine Learning Specialization',
    canonicalUrl: 'https://www.coursera.org/specializations/machine-learning-introduction',
    relationship: 'editorial',
    level: 'Beginner technical',
    effort: '3-course series',
    format: 'Python + applied labs',
    bestFor: 'Builders who want the foundations beneath modern AI systems',
    verdict:
      'The best bridge from using AI tools to understanding how learning systems are built and evaluated.',
    whyItMadeTheList:
      'The sequence combines a beginner-friendly entry with hands-on work on real machine-learning problems.',
    tags: ['Machine learning', 'Python', 'Foundations'],
    lastVerified: '2026-07-24',
    relatedArticle: {
      title: 'Best AI coding tools for beginners',
      href: '/blog/best-ai-coding-tools-for-beginners-2026',
    },
  },
  {
    slug: 'generative-ai-with-llms',
    provider: 'DeepLearning.AI + AWS',
    title: 'Generative AI with Large Language Models',
    canonicalUrl: 'https://www.coursera.org/learn/generative-ai-with-llms',
    relationship: 'editorial',
    level: 'Intermediate',
    effort: '1–4 weeks',
    format: '3 modules',
    bestFor: 'Technical practitioners moving from prompts to the LLM lifecycle',
    verdict:
      'A focused technical course on model selection, evaluation, fine-tuning, inference, and deployment tradeoffs.',
    whyItMadeTheList:
      'It connects model internals to the practical decisions behind building and deploying LLM applications.',
    tags: ['LLMs', 'Evaluation', 'Deployment'],
    lastVerified: '2026-07-24',
    relatedArticle: {
      title: 'Agentic AI roadmap',
      href: '/blog/agentic-ai-roadmap-2026',
    },
  },
  {
    slug: 'ai-product-management',
    provider: 'Duke University',
    title: 'AI Product Management Specialization',
    canonicalUrl: 'https://www.coursera.org/specializations/ai-product-management-duke',
    relationship: 'editorial',
    level: 'Beginner',
    effort: '3-course series',
    format: 'Self-paced',
    bestFor: 'Product leaders responsible for useful, human-centered AI products',
    verdict:
      'A credible route for product judgment: problem selection, data work, privacy, and responsible delivery.',
    whyItMadeTheList:
      'It treats AI product work as a design and operating discipline rather than a feature checklist.',
    tags: ['Product', 'Human-centered AI', 'Responsible AI'],
    lastVerified: '2026-07-24',
  },
]

export const learningOutcomes: LearningOutcome[] = [
  {
    id: 'use-ai-at-work',
    title: 'Use AI at work',
    audience: 'Operators, founders, and knowledge workers',
    capability: 'Research, write, analyze, and automate routine work with sound judgment.',
    href: '/learn/chatgpt-mastery',
    routeLabel: 'Start with an assistant',
  },
  {
    id: 'build-ai-products',
    title: 'Build with AI',
    audience: 'Developers and technical creators',
    capability: 'Move from AI-assisted coding to working tools, agents, and product loops.',
    href: '/learn/codex-mastery',
    routeLabel: 'Open the builder path',
  },
  {
    id: 'architect-ai-systems',
    title: 'Architect production AI',
    audience: 'Architects, platform teams, and technical leads',
    capability: 'Design governed, observable, multi-cloud systems that survive production.',
    href: '/ai-architect-academy',
    routeLabel: 'Enter the Academy',
  },
  {
    id: 'lead-ai-adoption',
    title: 'Lead AI adoption',
    audience: 'Product and business leaders',
    capability: 'Choose credible use cases, align teams, and set responsible operating boundaries.',
    href: '/courses#course-picks',
    routeLabel: 'See leader picks',
  },
  {
    id: 'create-with-ai',
    title: 'Create with AI',
    audience: 'Writers, musicians, and independent creators',
    capability: 'Build a repeatable creative practice around taste, authorship, and distribution.',
    href: '/gencreator',
    routeLabel: 'Open GenCreator',
  },
]

export const learningFieldNotes: LearningFieldNote[] = [
  {
    title: 'ChatGPT vs Claude vs Gemini: pick by daily use',
    description:
      'A results-first comparison for choosing one assistant instead of paying for three overlapping subscriptions.',
    href: '/blog/chatgpt-vs-claude-vs-gemini-2026',
    readingTime: '10 min',
    label: 'Decision guide',
  },
  {
    title: 'The AI coding tool a beginner should start with',
    description:
      'Cursor, GitHub Copilot, and Replit Agent compared by learning curve, cost, and ability to ship.',
    href: '/blog/best-ai-coding-tools-for-beginners-2026',
    readingTime: '12 min',
    label: 'Comparison',
  },
  {
    title: 'The 2026 route into agentic AI',
    description:
      'A practical sequence from single-agent workflows to MCP, orchestration, governance, and production.',
    href: '/blog/agentic-ai-roadmap-2026',
    readingTime: '14 min',
    label: 'Roadmap',
  },
]
