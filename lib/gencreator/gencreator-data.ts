import {
  Zap,
  Layers,
  Shield,
  Rocket,
  TrendingUp,
  Bot,
  Eye,
  Target,
  DollarSign,
  Battery,
  Network,
  FileText,
  Compass,
  Wrench,
  PenTool,
  BarChart3,
  Cog,
  Calendar,
  Users,
  Telescope,
  Share2,
  Music,
  Package,
  Mail,
  Code2,
  Search,
  Video,
  Palette,
  GitBranch,
  Globe,
  Sparkles,
} from 'lucide-react'

import type {
  Principle,
  HandbookChapter,
  Blueprint,
  SoulDimension,
  ManifestoLine,
} from './gencreator-types'

// ── 12 GenCreator Principles ─────────────────────────────

export const principles: Principle[] = [
  {
    number: 1,
    title: 'Create Daily',
    tagline: 'Output is the only metric that matters.',
    description:
      'A GenCreator publishes, ships, and creates every single day. Not because discipline demands it, but because creation compounds. Day 1 is raw. Day 100 is dangerous. Day 1,000 is undeniable. The gap between amateurs and professionals is not talent — it is accumulated reps.',
    example:
      'Write one blog post, produce one track, ship one component. Every day. The streak is the strategy.',
    icon: Zap,
  },
  {
    number: 2,
    title: 'Stack Intelligence',
    tagline: 'Layer AI tools. Never use them in isolation.',
    description:
      'A single AI tool is a parlor trick. Stacked intelligence — where Claude writes, Suno composes, Gemini generates, and n8n orchestrates — is a production studio. The GenCreator builds systems where each AI multiplies the others, creating output no single tool could produce alone.',
    example:
      'Claude drafts the article. Gemini generates the hero image. n8n atomizes it into 6 social posts. Resend delivers the newsletter. One input, five outputs.',
    icon: Layers,
  },
  {
    number: 3,
    title: 'Own Your System',
    tagline: 'Build infrastructure you control, not platforms you rent.',
    description:
      'Platforms change terms, raise prices, and deprecate features. The GenCreator builds on open protocols: git repos, self-hosted workflows, personal domains, and exportable data. When you own the system, algorithm changes become irrelevant.',
    example:
      'Your blog lives on your domain. Your music is on Vercel Blob. Your workflows are n8n on Railway. Your audience is on your email list. Zero platform risk.',
    icon: Shield,
  },
  {
    number: 4,
    title: 'Ship Before Perfect',
    tagline: 'Iteration beats perfection. Publish, measure, improve.',
    description:
      'Perfection is the enemy of presence. The GenCreator ships v1, gathers signal, and iterates. Every piece of published work teaches something that unpublished work never can. The market gives better feedback than your inner critic.',
    example:
      'Launch the product with 3 features, not 30. Publish the article at 80% polish. The first version is for learning, not for legacy.',
    icon: Rocket,
  },
  {
    number: 5,
    title: 'Compound Creativity',
    tagline: 'Each creation makes the next one easier and better.',
    description:
      'A blog post becomes a newsletter. The newsletter becomes a course module. The course becomes a consulting framework. The GenCreator never creates in isolation — every output feeds the next. This is creative compounding, and it is the single greatest advantage of prolific creation.',
    example:
      'One deep research session yields: 1 blog post, 1 Twitter thread, 1 newsletter issue, 3 LinkedIn posts, and 1 YouTube script. Five assets from one hour of thinking.',
    icon: TrendingUp,
  },
  {
    number: 6,
    title: 'Automate the Boring',
    tagline: 'Humans create. Machines execute. Never reverse this.',
    description:
      'The GenCreator identifies every repetitive task in the creative workflow and eliminates it with automation. Formatting, scheduling, cross-posting, image resizing, SEO checks, email sequences — these are machine tasks. Humans handle taste, judgment, and originality.',
    example:
      'n8n workflow: blog post published → auto-generates social posts → schedules across platforms → sends newsletter → updates analytics dashboard. Zero manual steps after clicking "publish."',
    icon: Bot,
  },
  {
    number: 7,
    title: 'Build in Public',
    tagline: 'Transparency accelerates trust and feedback.',
    description:
      'The GenCreator shares the process, not just the product. Work-in-progress posts, behind-the-scenes breakdowns, failure postmortems, and revenue reports — these build audience trust faster than polished marketing. Authenticity is the ultimate differentiator.',
    example:
      'Monthly revenue report. Weekly build log. "Here\'s what I shipped this week" threads. Let people watch you build — they\'ll want to buy from someone they\'ve watched grow.',
    icon: Eye,
  },
  {
    number: 8,
    title: 'Master One, Touch Many',
    tagline: 'Deep expertise in one domain, broad awareness across all.',
    description:
      'The GenCreator goes deep in one vertical — AI architecture, music production, content systems — while maintaining working knowledge of adjacent domains. T-shaped expertise creates unique combinations. The intersection of deep and broad is where original work lives.',
    example:
      'Frank\'s depth: AI architecture. Frank\'s breadth: music production, content strategy, product design, SEO. The intersection: ACOS, a system that no pure architect or pure creator would build.',
    icon: Target,
  },
  {
    number: 9,
    title: 'Revenue is Validation',
    tagline: 'If people pay, the work matters. Revenue is signal.',
    description:
      'The GenCreator does not create for applause — they create for impact, and revenue is the clearest signal of impact. Free content builds audience. Paid products prove value. The transition from free to paid is the moment your work graduates from hobby to profession.',
    example:
      'Free: blog posts, open-source tools, social content. Paid: premium templates, guided systems, 1:1 support. The free work earns trust. The paid work earns a living.',
    icon: DollarSign,
  },
  {
    number: 10,
    title: 'Protect Your Energy',
    tagline: 'Creative output is proportional to input energy quality.',
    description:
      'The GenCreator treats energy as the primary resource — not time, not money, not followers. Sleep, movement, nutrition, and mental clarity directly determine creative output quality. A rested creator in 2 hours outproduces a burned-out creator in 12.',
    example:
      'Morning routine before opening any screen. Physical movement daily. Hard stop on work hours. Energy management is time management for creators.',
    icon: Battery,
  },
  {
    number: 11,
    title: 'Think in Systems',
    tagline: 'Every creation connects to your larger ecosystem.',
    description:
      'The GenCreator does not create isolated artifacts — they build interconnected systems. A blog feeds the newsletter. The newsletter feeds the product. The product feeds the community. The community feeds new content. Everything loops. Isolated creation is wasted creation.',
    example:
      'Blog post links to product. Product includes community access. Community generates content ideas. Content ideas become blog posts. The flywheel spins.',
    icon: Network,
  },
  {
    number: 12,
    title: 'Leave Artifacts',
    tagline: 'Make your work reusable. Templates, frameworks, systems.',
    description:
      'The GenCreator documents everything. Every workflow becomes a template. Every decision becomes a framework. Every system becomes a blueprint. Artifacts are the residue of excellent work, and they create passive value long after the original effort ends.',
    example:
      'ACOS is an artifact. This handbook is an artifact. Every blueprint in this collection is an artifact. The work you do today should help someone (including future you) tomorrow.',
    icon: FileText,
  },
]

// ── 8 Handbook Chapters ──────────────────────────────────

export const chapters: HandbookChapter[] = [
  {
    number: 1,
    title: 'The GenCreator Identity',
    subtitle: 'Who you are becoming',
    description:
      'Define your creative identity at the intersection of human taste and AI capability. Understand what makes a GenCreator different from a traditional creator, a developer, or an AI hobbyist.',
    readTime: '12 min',
    topics: [
      'The GenCreator mindset',
      'Human + AI creative partnership',
      'Finding your creative intersection',
      'Identity vs. tools — the permanent differentiator',
    ],
    icon: Compass,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    number: 2,
    title: 'Your Creative Stack',
    subtitle: 'Tools, AI, workflows',
    description:
      'Build a production-grade creative stack. Choose tools that compound together, configure AI assistants for your specific workflow, and create the infrastructure that makes daily creation frictionless.',
    readTime: '18 min',
    topics: [
      'Core AI tools (Claude, Suno, Gemini, GPT)',
      'Automation layer (n8n, Make, Zapier)',
      'Publishing infrastructure (Vercel, GitHub, Resend)',
      'The ACOS approach to tool orchestration',
    ],
    icon: Wrench,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    number: 3,
    title: 'Content as Currency',
    subtitle: 'Publishing systems that compound',
    description:
      'Build content systems, not content pieces. Learn the atomization framework that turns one deep piece into 10 distribution-ready assets. Develop your content flywheel — the system that makes every piece of content feed the next.',
    readTime: '15 min',
    topics: [
      'The content atomization framework',
      'Blog → social → newsletter pipeline',
      'SEO-first content architecture',
      'Content compounding over time',
    ],
    icon: PenTool,
    color: 'from-purple-500 to-violet-500',
  },
  {
    number: 4,
    title: 'The Revenue Engine',
    subtitle: 'Products, services, monetization',
    description:
      'Transform creative output into revenue. From free content that builds audience to paid products that prove value. The GenCreator monetization ladder: audience → trust → products → recurring revenue.',
    readTime: '20 min',
    topics: [
      'The monetization ladder',
      'Digital product design',
      'Pricing psychology for creators',
      'From free content to paid ecosystem',
    ],
    icon: BarChart3,
    color: 'from-amber-500 to-orange-500',
  },
  {
    number: 5,
    title: 'System Architecture',
    subtitle: 'Building infrastructure that scales',
    description:
      'Design the technical foundation that lets you create at scale without burning out. From git-based content management to automated deployment pipelines — the engineering behind effortless creation.',
    readTime: '22 min',
    topics: [
      'Git-based content workflows',
      'Automated deployment pipelines',
      'Self-hosted vs. managed services',
      'The ACOS orchestration pattern',
    ],
    icon: Cog,
    color: 'from-rose-500 to-pink-500',
  },
  {
    number: 6,
    title: 'The Daily Practice',
    subtitle: 'Routines, rituals, energy management',
    description:
      'The daily operating system of a GenCreator. Morning creation blocks, energy management, deep work protocols, and the rituals that make prolific output sustainable — not exhausting.',
    readTime: '14 min',
    topics: [
      'The creator morning routine',
      'Deep work blocks and flow states',
      'Energy management over time management',
      'The Full Presence Activation protocol',
    ],
    icon: Calendar,
    color: 'from-teal-500 to-emerald-500',
  },
  {
    number: 7,
    title: 'Community & Network',
    subtitle: 'Building your circle',
    description:
      'No GenCreator builds alone. Learn to build authentic community, find mentors and collaborators, and create network effects that amplify everything you create.',
    readTime: '13 min',
    topics: [
      'Building authentic community',
      'The mentor-peer-apprentice triangle',
      'Collaboration over competition',
      'Network effects for solo creators',
    ],
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    number: 8,
    title: 'The Long Game',
    subtitle: 'Legacy, compounding, 10-year thinking',
    description:
      'Think beyond the next post, the next launch, the next quarter. The GenCreator plays infinite games — building assets that compound over years, systems that outlive trends, and a body of work that becomes undeniable.',
    readTime: '16 min',
    topics: [
      'Infinite games vs. finite games',
      'The 1,000-day compounding effect',
      'Building assets that appreciate',
      'Your creative legacy architecture',
    ],
    icon: Telescope,
    color: 'from-violet-500 to-fuchsia-500',
  },
]

// ── 12 Blueprints ────────────────────────────────────────

export const blueprints: Blueprint[] = [
  {
    title: 'Blog-to-Social Atomizer',
    description:
      'Turn one blog post into 6+ social media assets automatically. Thread, carousel, newsletter snippet, LinkedIn post, quote graphics, and audio summary.',
    category: 'Content',
    difficulty: 'Beginner',
    timeEstimate: '30 min setup',
    tools: ['Claude', 'n8n', 'Canva'],
    icon: Share2,
  },
  {
    title: 'AI Music Production Pipeline',
    description:
      'End-to-end music production: prompt engineering, Suno generation, track selection, mastering, metadata, and distribution to streaming platforms.',
    category: 'Music',
    difficulty: 'Intermediate',
    timeEstimate: '2 hours setup',
    tools: ['Suno', 'Claude', 'DistroKid'],
    icon: Music,
  },
  {
    title: 'Digital Product Launch Sequence',
    description:
      'A complete launch system: landing page, email sequence, social campaign, pricing strategy, and post-launch iteration framework.',
    category: 'Product',
    difficulty: 'Intermediate',
    timeEstimate: '1 week',
    tools: ['Next.js', 'Resend', 'Gumroad'],
    icon: Package,
  },
  {
    title: 'Newsletter Growth Engine',
    description:
      'Build a newsletter that grows itself. Lead magnets, signup forms, welcome sequences, content calendar, and referral mechanics.',
    category: 'Growth',
    difficulty: 'Beginner',
    timeEstimate: '2 hours setup',
    tools: ['Resend', 'Next.js', 'Claude'],
    icon: Mail,
  },
  {
    title: 'ACOS Custom Agent Builder',
    description:
      'Design, build, and deploy custom AI agents for your specific creative workflow. Agent definition, skill mapping, tool integration, and testing.',
    category: 'System',
    difficulty: 'Advanced',
    timeEstimate: '3 hours',
    tools: ['Claude Code', 'ACOS', 'MCP'],
    icon: Code2,
  },
  {
    title: 'SEO Topic Cluster Strategy',
    description:
      'Build topic authority through pillar content and supporting clusters. Keyword research, content mapping, internal linking, and schema markup.',
    category: 'Content',
    difficulty: 'Intermediate',
    timeEstimate: '4 hours',
    tools: ['Claude', 'Search Console', 'Ahrefs'],
    icon: Search,
  },
  {
    title: 'Creator Revenue Dashboard',
    description:
      'Track all revenue streams in one place. Product sales, affiliate income, ad revenue, coaching — visualized with automated data collection.',
    category: 'Product',
    difficulty: 'Intermediate',
    timeEstimate: '3 hours setup',
    tools: ['n8n', 'Google Sheets', 'Notion'],
    icon: BarChart3,
  },
  {
    title: 'Video-to-Blog Repurposer',
    description:
      'Transform long-form video into written content. Transcription, AI-powered editing, SEO optimization, and image extraction for blog publication.',
    category: 'Content',
    difficulty: 'Beginner',
    timeEstimate: '1 hour setup',
    tools: ['Whisper', 'Claude', 'Next.js'],
    icon: Video,
  },
  {
    title: 'AI Art Portfolio Builder',
    description:
      'Build a professional portfolio of AI-generated art. Style development, prompt engineering, curation framework, and gallery deployment.',
    category: 'Music',
    difficulty: 'Beginner',
    timeEstimate: '2 hours',
    tools: ['Gemini', 'Midjourney', 'Vercel'],
    icon: Palette,
  },
  {
    title: 'n8n Workflow Automation Kit',
    description:
      'A starter kit of 5 essential n8n workflows for creators: content distribution, social monitoring, email automation, analytics collection, and backup systems.',
    category: 'System',
    difficulty: 'Advanced',
    timeEstimate: '4 hours',
    tools: ['n8n', 'Railway', 'Slack'],
    icon: GitBranch,
  },
  {
    title: 'Community Launch Playbook',
    description:
      'Launch a creator community from scratch. Platform selection, founding member strategy, content seeding, engagement mechanics, and growth tactics.',
    category: 'Growth',
    difficulty: 'Intermediate',
    timeEstimate: '1 week',
    tools: ['Discord', 'Notion', 'Resend'],
    icon: Globe,
  },
  {
    title: 'Personal Brand Architecture',
    description:
      'Design your complete brand system. Visual identity, voice guidelines, content pillars, positioning statement, and brand asset library.',
    category: 'Growth',
    difficulty: 'Beginner',
    timeEstimate: '3 hours',
    tools: ['Figma', 'Claude', 'Canva'],
    icon: Sparkles,
  },
]

// ── 7 Soul Dimensions ────────────────────────────────────

export const soulDimensions: SoulDimension[] = [
  {
    number: 1,
    name: 'Energy',
    symbol: '⚡',
    tagline: 'The engine of creation',
    description:
      'Physical vitality, presence, and the raw fuel that powers everything you create. Without energy, tools are useless and talent is dormant. The GenCreator treats energy as the primary resource — optimizing sleep, movement, nutrition, and recovery before optimizing workflows.',
    questions: [
      'How many hours of quality sleep did you average this week?',
      'Did you move your body today before opening a screen?',
      'What drains your energy that you could eliminate or delegate?',
      'When is your peak creative energy window?',
    ],
    color: 'from-amber-400 to-orange-500',
    glowColor: 'amber',
  },
  {
    number: 2,
    name: 'Mind',
    symbol: '🧠',
    tagline: 'Clarity, learning velocity, decision quality',
    description:
      'Mental clarity and the speed at which you acquire new skills. The GenCreator is a learning machine — consuming, processing, and applying new knowledge faster than peers because the stack amplifies every hour of study into days of output.',
    questions: [
      'What did you learn this week that changed how you work?',
      'Are you reading/consuming content that challenges you or confirms you?',
      'How quickly can you go from "I don\'t know how" to "I shipped it"?',
      'What mental model would simplify your biggest current problem?',
    ],
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'cyan',
  },
  {
    number: 3,
    name: 'Craft',
    symbol: '🔨',
    tagline: 'Technical mastery and creative skill',
    description:
      'The work itself. Your craft is the intersection of technical skill and creative taste. The GenCreator sharpens both — developing deep technical abilities while cultivating the aesthetic judgment that makes output exceptional, not just competent.',
    questions: [
      'What is the one skill that, if you mastered it, would 10x your output?',
      'When was the last time you practiced your craft without publishing?',
      'Can you articulate what makes your best work better than your average work?',
      'What craft would you practice even if no one ever saw the results?',
    ],
    color: 'from-emerald-400 to-teal-500',
    glowColor: 'emerald',
  },
  {
    number: 4,
    name: 'Voice',
    symbol: '📡',
    tagline: 'Authentic expression and communication',
    description:
      'Your unique signal in a world of noise. Voice is not just writing style — it is your perspective, your opinions, your willingness to say what others think but won\'t publish. The GenCreator develops a voice so distinct that readers recognize it before seeing the byline.',
    questions: [
      'If someone read your work without your name on it, would they know it was you?',
      'What opinion do you hold that most people in your space disagree with?',
      'Are you writing in your voice or in "professional content creator" voice?',
      'What would you say if you knew it would never be judged?',
    ],
    color: 'from-purple-400 to-violet-500',
    glowColor: 'violet',
  },
  {
    number: 5,
    name: 'Capital',
    symbol: '💎',
    tagline: 'Financial health and business sense',
    description:
      'Revenue, pricing, and the business of creation. Capital is not greed — it is the fuel that sustains creative freedom. The GenCreator builds multiple revenue streams, prices with confidence, and treats financial sustainability as a creative practice, not a necessary evil.',
    questions: [
      'How many months of runway do you have if all income stopped today?',
      'What is your hourly rate — and does your pricing reflect it?',
      'Which revenue stream has the highest leverage (most income per hour)?',
      'What would you create differently if money were irrelevant?',
    ],
    color: 'from-yellow-400 to-amber-500',
    glowColor: 'amber',
  },
  {
    number: 6,
    name: 'Circle',
    symbol: '🔗',
    tagline: 'Community, collaboration, relationships',
    description:
      'The people who amplify you. No GenCreator builds in isolation. Circle encompasses mentors who challenge you, peers who collaborate with you, and an audience that grows with you. The quality of your circle determines the ceiling of your creative output.',
    questions: [
      'Who are the 5 people you learn the most from right now?',
      'When was the last time you collaborated instead of competing?',
      'Do you have peers who will tell you when your work is not good enough?',
      'What community are you actively contributing to (not just consuming)?',
    ],
    color: 'from-indigo-400 to-blue-500',
    glowColor: 'blue',
  },
  {
    number: 7,
    name: 'Legacy',
    symbol: '∞',
    tagline: 'Long-term impact and systems that outlive you',
    description:
      'What remains after you stop. Legacy is not fame — it is the systems, templates, frameworks, and knowledge you leave behind. The GenCreator builds with permanence: open-source tools, documented processes, and a body of work that helps others long after you have moved on.',
    questions: [
      'If you stopped creating today, what would still provide value in 5 years?',
      'What system have you built that someone else could operate without you?',
      'Are you building assets or just producing outputs?',
      'What will your 1,000th creation look like if you maintain your current trajectory?',
    ],
    color: 'from-rose-400 to-pink-500',
    glowColor: 'rose',
  },
]

// ── Manifesto Lines ──────────────────────────────────────

export const manifestoLines: ManifestoLine[] = [
  { text: 'We are GenCreators.' , emphasis: true },
  { text: 'We create with AI, not despite it.' },
  { text: 'We ship daily. We compound relentlessly.' },
  { text: 'We build systems, not content pieces.' },
  { text: 'We own our infrastructure. We control our distribution.' },
  { text: 'We automate the boring and protect the creative.' },
  { text: 'We publish before perfect. We iterate in public.' },
  { text: 'We stack intelligence — layering tools into production studios.' },
  { text: 'We price our work with confidence. Revenue is validation.' },
  { text: 'We master one domain deeply. We touch many broadly.' },
  { text: 'We leave artifacts — templates, frameworks, systems.' },
  { text: 'We protect our energy because creation demands our best.' },
  { text: 'We think in decades, not in posts.' },
  { text: 'We are not content creators. We are not developers. We are not influencers.' , emphasis: true },
  { text: 'We are the new breed.' , emphasis: true },
  { text: 'Human taste. Machine scale. Permanent artifacts.' },
  { text: 'This is the GenCreator way.' , emphasis: true },
]

// ── Hub Stats ────────────────────────────────────────────

export const hubStats = [
  { label: 'Principles', value: '12', icon: Zap, color: 'from-emerald-500 to-teal-500' },
  { label: 'Chapters', value: '8', icon: PenTool, color: 'from-cyan-500 to-blue-500' },
  { label: 'Blueprints', value: '12', icon: GitBranch, color: 'from-purple-500 to-violet-500' },
  { label: 'Soul Dimensions', value: '7', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
]

// ── Blueprint Categories (for filtering) ─────────────────

export const blueprintCategories = [
  'All',
  'Content',
  'Music',
  'Product',
  'System',
  'Growth',
] as const

// ── Difficulty colors ────────────────────────────────────

export const difficultyColors: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Intermediate: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Advanced: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
}
