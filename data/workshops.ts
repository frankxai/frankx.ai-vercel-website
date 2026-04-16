export interface WorkshopModule {
  title: string
  duration: string
  description: string
  instructorNotes: string
  resources: { label: string; href: string }[]
}

export interface Workshop {
  slug: string
  title: string
  subtitle: string
  duration: string
  audience: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  moduleCount: number
  color: 'cyan' | 'violet' | 'amber'
  overview: string
  objectives: string[]
  prerequisites: string[]
  modules: WorkshopModule[]
}

export const workshops: Workshop[] = [
  {
    slug: 'ikigai-branding',
    title: 'Ikigai & Branding Workshop',
    subtitle: 'Find your purpose, then turn it into a brand the world recognizes',
    duration: '45-75 min',
    audience: 'Creators, students, professionals reshaping their path',
    difficulty: 'Beginner',
    moduleCount: 4,
    color: 'violet',
    overview:
      'An interactive, coach-guided workshop. You map your Ikigai through a 4-step wizard (what you love, what you are good at, what the world needs, what pays), synthesize your purpose statement, and immediately translate it into a brand: positioning, audience-of-one, and three content pillars. Pair it with the free Ikigai & Branding Coach GPT for deeper Socratic questioning.',
    objectives: [
      'Map your Ikigai with specific, evidence-backed inputs (not vague feelings)',
      'Write a 2-3 line purpose statement that fits on a business card',
      'Translate purpose into a brand positioning sentence and audience-of-one avatar',
      'Leave with three content pillars and a 30-day expression plan',
    ],
    prerequisites: [
      'A willingness to be specific (vague answers produce vague brands)',
      '45-75 minutes of uninterrupted time',
      'Optional: a free ChatGPT account to chat with the Coach GPT',
    ],
    modules: [
      {
        title: 'The Ikigai Map',
        duration: '20 min',
        description:
          'Work through the four circles of Ikigai as a guided wizard. Each question comes with Socratic prompts and real examples. Progress saves in your browser automatically — nothing leaves your device until you explicitly export.',
        instructorNotes:
          'Encourage participants to write evidence-backed answers — specific moments, real skills others named, actual markets they have been paid from. Vague inputs create vague outputs. If stuck, open the Coach GPT side-by-side.',
        resources: [
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
          { label: 'The 3Cs: Human Skills That Compound', href: '#three-cs' },
        ],
      },
      {
        title: 'Your Purpose Statement',
        duration: '10 min',
        description:
          'Distill your four circles into one sentence: "I help [who] achieve [outcome] by [how], using [skills] in [domain]." The synthesis panel writes a draft from your inputs — you sharpen it.',
        instructorNotes:
          'The fastest shortcut to a great statement is naming the audience precisely. "Early-career data analysts" beats "professionals". Push participants to replace any word a competitor could also use.',
        resources: [
          { label: 'Export your Ikigai (JSON + Markdown)', href: '#synthesis' },
        ],
      },
      {
        title: 'Ikigai → Brand Bridge',
        duration: '15 min',
        description:
          'Turn your purpose statement into a positioning sentence, an audience-of-one avatar, and three content pillars. This is where most ikigai workshops stop — here it is where yours begins producing visible work.',
        instructorNotes:
          'Positioning = what you are for and what you are not. Force a trade-off. The pillars should be publishable for 12 months straight without repeating yourself. If not, sharpen them.',
        resources: [
          { label: 'Coach GPT (free)', href: '/go/ikigai-coach' },
          { label: 'Prompt Library: Branding', href: '/prompt-library/marketing' },
        ],
      },
      {
        title: 'Activation: 30-Day Expression Plan',
        duration: '10 min',
        description:
          'Ship your brand into reality. Pick one pillar, commit to 4 visible artifacts in the next 30 days (a post, a video, a conversation, a small product). Subscribe to receive the Resource Pack with templates and a check-in email at Day 7.',
        instructorNotes:
          'Shipping calibrates the brand. Two weeks of visible output teaches you more than two months of planning. Keep artifacts small — one tweet, one 2-minute video, one coffee chat.',
        resources: [
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
          { label: 'Creator Economy Guide', href: '/for/creators' },
        ],
      },
    ],
  },
  {
    slug: 'ai-2026-graduates',
    title: 'AI in 2026: What Graduates Need to Know',
    subtitle: 'A practical orientation to AI literacy for students entering the workforce',
    duration: '45-60 min',
    audience: 'University students, recent graduates',
    difficulty: 'Beginner',
    moduleCount: 5,
    color: 'cyan',
    overview:
      'This workshop equips graduates with practical AI literacy — from understanding the current landscape to hands-on prompting techniques. Students leave with a clear mental model of where AI is heading and how to position themselves.',
    objectives: [
      'Understand the three waves of AI development and where we are today',
      'Identify career opportunities that leverage AI proficiency',
      'Write effective prompts for real-world tasks',
      'Build a personal AI toolkit for professional growth',
    ],
    prerequisites: [
      'Access to a laptop or tablet with internet',
      'A free ChatGPT or Claude account (instructions provided)',
    ],
    modules: [
      {
        title: 'The AI Landscape',
        duration: '10 min',
        description:
          'A grounded overview of where AI stands in 2026 — beyond the hype. What works, what is still emerging, and what matters for your career.',
        instructorNotes:
          'Open with a live demo of an AI tool completing a real task (writing an email, analyzing data, generating code). This grounds the session in practical reality rather than abstract concepts.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Three Waves of AI',
        duration: '10 min',
        description:
          'From prediction engines (Wave 1) to generative AI (Wave 2) to agentic systems (Wave 3). Understanding the trajectory helps graduates anticipate where value is moving.',
        instructorNotes:
          'Use a timeline visual. Ask the audience: "Which wave does your field interact with most?" This creates engagement and helps tailor the remaining content.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Career Implications',
        duration: '10 min',
        description:
          'How AI is reshaping job roles across industries. The skills that compound in value. How to frame AI proficiency on a resume and in interviews.',
        instructorNotes:
          'Avoid fear-based framing. Focus on augmentation and new roles that did not exist two years ago. Share concrete examples: AI ops engineer, prompt strategist, AI product manager.',
        resources: [
          { label: 'AI Briefing for Students', href: '/students/ai-briefing' },
        ],
      },
      {
        title: 'Hands-On Prompting',
        duration: '15 min',
        description:
          'Interactive session where participants write and refine prompts for real tasks: drafting cover letters, summarizing research papers, brainstorming project ideas.',
        instructorNotes:
          'Have 3-4 pre-built prompt templates ready. Let students modify them and compare outputs. Pair programming style works well here — one person drives, the other observes.',
        resources: [
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Resources and Next Steps',
        duration: '5 min',
        description:
          'Curated pathways for continued learning. Tools, communities, and frameworks to build on after the workshop.',
        instructorNotes:
          'End with the QR code linking to the resource pack. Encourage students to bookmark the GenCreator principles page for ongoing reference.',
        resources: [
          { label: 'GenCreator Principles', href: '/gencreator/principles' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
    ],
  },
  {
    slug: 'build-first-ai-agent',
    title: 'Build Your First AI Agent',
    subtitle: 'From concept to working prototype in 90 minutes',
    duration: '90 min',
    audience: 'Developers, CS students, technical professionals',
    difficulty: 'Intermediate',
    moduleCount: 4,
    color: 'violet',
    overview:
      'A hands-on technical workshop that takes participants from zero to a working AI agent. Covers the core architecture — tools, memory, and reasoning loops — then builds a functional agent using open-source tooling.',
    objectives: [
      'Define the architectural components of an AI agent',
      'Understand the difference between prompting and agentic workflows',
      'Build a functional agent with tool use and memory',
      'Deploy and share an agent prototype',
    ],
    prerequisites: [
      'Basic programming experience (Python or JavaScript)',
      'Laptop with Node.js or Python installed',
      'API key for an LLM provider (OpenAI, Anthropic, or similar)',
    ],
    modules: [
      {
        title: 'What Are AI Agents',
        duration: '15 min',
        description:
          'The difference between a chatbot, an assistant, and an agent. Why the agentic paradigm matters. Real-world agent architectures in production.',
        instructorNotes:
          'Start with a comparison: show the same task done via a single prompt vs. an agentic loop. The contrast makes the concept tangible immediately.',
        resources: [
          { label: 'Agentic Creator OS', href: '/acos' },
        ],
      },
      {
        title: 'Anatomy of an Agent',
        duration: '25 min',
        description:
          'Deep dive into the three pillars: tools (what the agent can do), memory (what the agent remembers), and reasoning (how the agent decides). Architecture diagrams and code walkthrough.',
        instructorNotes:
          'Use a whiteboard or slide to draw the agent loop: Observe -> Think -> Act -> Reflect. Map each pillar to a code module participants will build.',
        resources: [
          { label: 'Agentic Creator OS', href: '/acos' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Hands-On Build',
        duration: '35 min',
        description:
          'Build an agent from scratch. Participants implement a simple agent that can search the web, summarize content, and maintain conversation memory. Guided coding with checkpoints.',
        instructorNotes:
          'Provide a starter repo with boilerplate already set up. Each checkpoint should produce a working artifact — even if a participant falls behind, they have something functional at each stage.',
        resources: [
          { label: 'ACOS GitHub Repository', href: 'https://github.com/frankxai/acos' },
          { label: 'Prompt Library', href: '/prompt-library' },
        ],
      },
      {
        title: 'Deploy and Share',
        duration: '15 min',
        description:
          'Deploy the agent to a shareable endpoint. Discussion on production considerations: rate limiting, cost management, safety guardrails.',
        instructorNotes:
          'Use Vercel or Replit for quick deployment. End with a gallery walk where participants demo their agents to each other.',
        resources: [
          { label: 'Agentic Creator OS', href: '/acos' },
        ],
      },
    ],
  },
  {
    slug: 'ai-music-masterclass',
    title: 'AI Music Production with Suno',
    subtitle: 'Create professional-quality tracks using AI in under an hour',
    duration: '60 min',
    audience: 'Creators, musicians, content producers',
    difficulty: 'Beginner',
    moduleCount: 4,
    color: 'amber',
    overview:
      'This workshop demystifies AI music production. Participants learn prompt engineering techniques specific to Suno, create original tracks during the session, and understand the publishing and distribution landscape.',
    objectives: [
      'Understand the current AI music generation landscape',
      'Write effective Suno prompts with genre, mood, and structure control',
      'Create at least one original track during the session',
      'Know the basics of publishing and distributing AI-generated music',
    ],
    prerequisites: [
      'A free Suno account (suno.com)',
      'Headphones or earbuds recommended',
      'Laptop, tablet, or phone with internet access',
    ],
    modules: [
      {
        title: 'AI Music Landscape',
        duration: '10 min',
        description:
          'Where AI music generation stands in 2026. The major platforms, their strengths, and the creative possibilities. Listening session with examples across genres.',
        instructorNotes:
          'Play 3-4 diverse AI-generated tracks without revealing they are AI-made. Then reveal. This creates a productive conversation about quality and perception.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
        ],
      },
      {
        title: 'Suno Prompt Engineering',
        duration: '15 min',
        description:
          'The anatomy of a great Suno prompt. Genre tags, mood descriptors, structure markers, and style references. Common mistakes and how to avoid them.',
        instructorNotes:
          'Show a side-by-side comparison: a vague prompt vs. a well-structured one. Play the outputs. The quality difference sells the technique.',
        resources: [
          { label: 'Vibe Producer', href: '/vibe/producer' },
        ],
      },
      {
        title: 'Live Creation Session',
        duration: '25 min',
        description:
          'Guided creation where every participant produces an original track. Start with a template prompt, then iterate. Instructor circulates and offers feedback.',
        instructorNotes:
          'Provide 3 template prompts (pop, cinematic, lo-fi) as starting points. Encourage experimentation after the first successful generation. Share results in a group playlist if time allows.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
          { label: 'FrankX on Suno', href: 'https://suno.com/@frankx' },
        ],
      },
      {
        title: 'Publishing and Distribution',
        duration: '10 min',
        description:
          'How to publish AI-generated music. Platform policies, distribution services, licensing considerations, and building an audience.',
        instructorNotes:
          'Be transparent about the evolving legal landscape. Focus on what is clearly permissible today and point to resources for staying current.',
        resources: [
          { label: 'Music Lab', href: '/music-lab' },
        ],
      },
    ],
  },
]

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((w) => w.slug === slug)
}

export function getAllWorkshopSlugs(): string[] {
  return workshops.map((w) => w.slug)
}
