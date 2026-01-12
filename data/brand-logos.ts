export type BrandTreatment = 'mono' | 'color'

export interface BrandCaseStudy {
  anchor: string
  title: string
  summary: string
  href: string
  cta: string
}

export interface BrandLogo {
  slug: string
  name: string
  logo: string
  brandUrl: string
  treatment: BrandTreatment
  caseStudy: BrandCaseStudy
}

export const brandLogos: BrandLogo[] = [
  {
    slug: 'openai',
    name: 'OpenAI',
    logo: '/images/brands/openai.svg',
    brandUrl: 'https://openai.com',
    treatment: 'mono',
    caseStudy: {
      anchor: 'case-openai',
      title: 'GPT-based intelligence briefs',
      summary: 'How we synthesize research into briefings and prompt libraries for fast decision loops.',
      href: '/guides/openai-chatgpt-guide',
      cta: 'Read the guide',
    },
  },
  {
    slug: 'anthropic',
    name: 'Anthropic',
    logo: '/images/brands/anthropic.svg',
    brandUrl: 'https://anthropic.com',
    treatment: 'mono',
    caseStudy: {
      anchor: 'case-anthropic',
      title: 'Claude-assisted build reviews',
      summary: 'How we use Claude to stress-test prompts, specs, and agent workflows.',
      href: '/guides/claude-anthropic-guide',
      cta: 'Read the full guide',
    },
  },
  {
    slug: 'suno',
    name: 'Suno',
    logo: '/images/brands/suno.svg',
    brandUrl: 'https://suno.ai',
    treatment: 'mono',
    caseStudy: {
      anchor: 'case-suno',
      title: 'Suno music lab rituals',
      summary: 'How we prototype soundscapes and creator rituals with rapid iteration loops.',
      href: '/guides/suno-prompt-playbook',
      cta: 'Open the playbook',
    },
  },
  {
    slug: 'midjourney',
    name: 'Midjourney',
    logo: '/images/brands/midjourney.svg',
    brandUrl: 'https://midjourney.com',
    treatment: 'mono',
    caseStudy: {
      anchor: 'case-midjourney',
      title: 'Visual concepting & storyboards',
      summary: 'How we explore visual directions and build cinematic mood boards.',
      href: '/guides/midjourney-guide',
      cta: 'Read the guide',
    },
  },
  {
    slug: 'perplexity',
    name: 'Perplexity',
    logo: '/images/brands/perplexity.svg',
    brandUrl: 'https://perplexity.ai',
    treatment: 'color',
    caseStudy: {
      anchor: 'case-perplexity',
      title: 'Research sweeps & source clustering',
      summary: 'How we gather and map sources for long-form SEO and flagship strategy.',
      href: '/guides/perplexity-ai-guide',
      cta: 'Read the guide',
    },
  },
  {
    slug: 'hugging-face',
    name: 'Hugging Face',
    logo: '/images/brands/hugging-face.svg',
    brandUrl: 'https://huggingface.co',
    treatment: 'color',
    caseStudy: {
      anchor: 'case-hugging-face',
      title: 'Open-model benchmarking',
      summary: 'How we evaluate open-source models for bespoke agent deployments.',
      href: '/blog/enterprise-agent-roadmap',
      cta: 'View the roadmap',
    },
  },
  {
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    logo: '/images/brands/elevenlabs.svg',
    brandUrl: 'https://elevenlabs.io',
    treatment: 'mono',
    caseStudy: {
      anchor: 'case-elevenlabs',
      title: 'Voice prototypes for creators',
      summary: 'How we craft narration tests for lessons, demos, and audio rituals.',
      href: '/guides/elevenlabs-voice-guide',
      cta: 'Read the guide',
    },
  },
  {
    slug: 'stability-ai',
    name: 'Stability AI',
    logo: '/images/brands/stability-ai.svg',
    brandUrl: 'https://stability.ai',
    treatment: 'color',
    caseStudy: {
      anchor: 'case-stability-ai',
      title: 'Image variation workflows',
      summary: 'How we iterate visual systems across brand, product, and campaign assets.',
      href: '/blog/enterprise-intelligence-operating-system-2025',
      cta: 'View the system',
    },
  },
  {
    slug: 'google',
    name: 'Google',
    logo: '/images/brands/google.svg',
    brandUrl: 'https://ai.google',
    treatment: 'color',
    caseStudy: {
      anchor: 'case-google',
      title: 'Market signals & trend scans',
      summary: 'How we map search signals into the intelligence cadence.',
      href: '/blog/intelligence-revolution-2025',
      cta: 'Read the brief',
    },
  },
  {
    slug: 'meta',
    name: 'Meta',
    logo: '/images/brands/meta.svg',
    brandUrl: 'https://ai.meta.com',
    treatment: 'color',
    caseStudy: {
      anchor: 'case-meta',
      title: 'Agentic workflows with open research',
      summary: 'How open research informs our agent orchestration patterns.',
      href: '/blog/what-is-agentic-ai',
      cta: 'Read the explainer',
    },
  },
]
