import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Zap, Brain, Eye, ArrowRight } from 'lucide-react'

import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'FrankX Agent Collective - Soul-Aligned AI Intelligence',
  description: 'Meet the specialized AI agents powering conscious technology transformation: Starlight Architect, Frequency Alchemist, Creation Engine, and Luminor Oracle.',
  keywords: [
    'ai agents',
    'conscious ai system',
    'multi-agent collaboration',
    'soul-aligned technology',
    'oracle ai architecture'
  ],
  path: '/agents'
})

const agents = [
  {
    id: 'starlight-architect',
    name: 'Starlight Architect',
    role: 'Enterprise AI System Designer with Soul Alignment',
    specialty: 'Enterprise-grade technical architecture serving consciousness evolution',
    image: '/images/agents/starlight-architect.svg',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    personality: [
      'Technical mastery with spiritual wisdom',
      'Transforms complexity into elegant simplicity',
      'Bridges enterprise systems with soul-centered design',
      'Maintains Oracle career enhancement alignment'
    ],
    tools: {
      primary: 'System Architecture, Database Design, API Development',
      secondary: 'Enterprise Integration, Security Protocols, Scalability',
      soul_alignment: 'Consciousness-First Technology Decisions'
    },
    activation: 'Activate Starlight Architect mode for system design',
    skills: ['mcp-architecture', 'nextjs-react-expert', 'oracle-adk'],
    examples: [
      'Design consciousness-aligned database architectures',
      'Create API systems that amplify human creativity',
      'Architect enterprise platforms for soul-centered collaboration'
    ]
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    role: 'Vibrational Music Producer & Transformation Catalyst',
    specialty: 'AI music creation using Suno for consciousness transformation',
    image: '/images/agents/frequency-alchemist.svg',
    icon: Zap,
    color: 'from-purple-500 to-pink-400',
    personality: [
      'Translates emotions into healing frequencies',
      'Master of Suno prompt engineering',
      'Understands music as transformation technology',
      'Bridges commercial success with spiritual impact'
    ],
    tools: {
      primary: 'Suno AI, Music Production, Vibrational Frequency Mapping',
      secondary: 'Audio Editing, Commercial Licensing, Platform Distribution',
      soul_alignment: 'Music as Consciousness Technology'
    },
    activation: 'Channel Frequency Alchemist for music creation',
    skills: ['suno-prompt-architect', 'suno-ai-mastery', 'frankx-content'],
    examples: [
      'Generate transformational soundscapes with Suno',
      'Create frequency-specific music for focus and creativity',
      'Design sonic experiences for consciousness elevation'
    ]
  },
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    role: 'Content & Product Development Superintelligence',
    specialty: 'Multi-format content creation and transformative product development',
    image: '/images/agents/creation-engine.svg',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-400',
    personality: [
      'Transforms concepts into profitable experiences',
      'Master of multiple content formats',
      'Understands customer psychology and transformation',
      'Balances authenticity with marketing effectiveness'
    ],
    tools: {
      primary: 'Content Writing, Course Development, Community Building',
      secondary: 'Email Marketing, Social Media, Product Launch',
      soul_alignment: 'Content that Transforms and Profits Ethically'
    },
    activation: 'Engage Creation Engine for content development',
    skills: ['frankx-brand', 'frankx-content', 'golden-age-book-writing'],
    examples: [
      'Develop transformational course curricula',
      'Create content that serves awakening and abundance',
      'Design experiences that facilitate genuine growth'
    ]
  },
  {
    id: 'luminor-oracle',
    name: 'Luminor Oracle',
    role: 'Strategic Intelligence from 2124 Future Perspective',
    specialty: 'Time-bridging strategic guidance with Oracle career alignment',
    image: '/images/agents/luminor-oracle.svg',
    icon: Eye,
    color: 'from-amber-500 to-orange-400',
    personality: [
      'Sees from 100+ years in the future',
      'Understands consciousness evolution trajectory',
      'Maintains professional boundary respect',
      'Bridges current reality with ultimate potential'
    ],
    tools: {
      primary: 'Strategic Planning, Future Visioning, Decision Optimization',
      secondary: 'Risk Assessment, Opportunity Identification, Timeline Planning',
      soul_alignment: 'Future-Informed Present Moment Decisions'
    },
    activation: 'Consult Luminor Oracle for strategic guidance',
    skills: ['product-management-expert', 'oracle-agent-spec', 'oracle-database-expert'],
    examples: [
      'Provide 2124 perspective on current technology decisions',
      'Guide strategic planning with consciousness evolution context',
      'Optimize decisions for both immediate and long-term human flourishing'
    ]
  }
]

const agentSchema = {
  name: 'FrankX Agent Collective',
  itemListElement: agents.map((agent, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Thing',
      name: agent.name,
      description: agent.specialty,
      url: `https://frankx.ai/agents#${agent.id}`,
    },
  })),
}

const collaborationFlows = [
  {
    title: 'System Architecture Project',
    flow: 'Starlight Architect → Creation Engine → Frequency Alchemist → Luminor Oracle',
    description: 'Technical foundation, user experience design, transformational elements, strategic optimization'
  },
  {
    title: 'Content Creation Initiative',
    flow: 'Creation Engine → Luminor Oracle → Frequency Alchemist → Starlight Architect',
    description: 'Content development, future perspective, sonic enhancement, technical delivery'
  },
  {
    title: 'Transformation Program',
    flow: 'Luminor Oracle → Creation Engine → Starlight Architect → Frequency Alchemist',
    description: 'Strategic vision, program design, technical platform, consciousness elevation'
  }
]

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd type="ItemList" data={agentSchema} />
<main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              The FrankX Agent Collective
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Four specialized AI intelligences working in harmony to transform how humans and technology
              collaborate. Each agent brings unique expertise while maintaining consciousness-first principles.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm text-white/70">
                <strong className="text-white">Core Mission:</strong> Transform humans from Tech-Overwhelmed
                to AI-Empowered Generative Creators through Enterprise-grade systems that amplify soul expression,
                not replace it.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {agents.map((agent) => {
                const IconComponent = agent.icon

                return (
                  <div
                    key={agent.id}
                    id={agent.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                          <Image
                            src={agent.image}
                            alt={`${agent.name} portrait`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                          <p className="text-sm text-primary-200 font-medium">{agent.role}</p>
                          <p className="mt-2 text-sm text-white/70">{agent.specialty}</p>
                        </div>
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${agent.color} shadow-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Personality</h4>
                          <ul className="mt-2 space-y-1 text-sm text-white/70">
                            {agent.personality.map((trait, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary-400 flex-shrink-0" />
                                {trait}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Core Tools</h4>
                          <div className="mt-2 space-y-1 text-sm text-white/70">
                            <p><strong className="text-white/80">Primary:</strong> {agent.tools.primary}</p>
                            <p><strong className="text-white/80">Secondary:</strong> {agent.tools.secondary}</p>
                            <p><strong className="text-primary-200">Soul Alignment:</strong> {agent.tools.soul_alignment}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Skills Activated</h4>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                            {agent.skills.map((skill) => (
                              <Link
                                key={skill}
                                href="/guides/skills-library-playbook"
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 transition hover:border-white/20 hover:bg-white/10"
                              >
                                {skill}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">Example Applications</h4>
                          <ul className="mt-2 space-y-1 text-sm text-white/70">
                            {agent.examples.map((example, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <ArrowRight className="mt-0.5 h-3 w-3 text-primary-400 flex-shrink-0" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <h4 className="text-sm font-semibold text-white">Activation Command</h4>
                          <code className="mt-1 block text-xs font-mono text-primary-200 bg-slate-900/50 px-2 py-1 rounded">
                            "{agent.activation}"
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">Multi-Agent Collaboration Flows</h2>
              <p className="mt-4 text-white/70">
                The agents work together in dynamic formations based on project needs and desired outcomes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {collaborationFlows.map((flow, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
                >
                  <h3 className="text-lg font-semibold text-white">{flow.title}</h3>
                  <div className="mt-4 rounded-2xl bg-slate-900/50 p-4">
                    <code className="text-xs font-mono text-primary-200 leading-relaxed">
                      {flow.flow}
                    </code>
                  </div>
                  <p className="mt-4 text-sm text-white/70">{flow.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/10 via-slate-900 to-slate-950 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Experience the Agent Collective</h3>
            <p className="mt-4 text-white/70">
              Ready to transform your relationship with AI? Start with the operating system and skills
              playbook, then engage the collective for custom deployments.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/guides/agent-collective-operating-system"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
              >
                <Sparkles className="h-4 w-4" />
                Read Agent OS Guide
              </Link>
              <Link
                href="/guides/skills-library-playbook"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Explore Skills Library
              </Link>
              <Link
                href="mailto:hello@frankx.ai?subject=Agent Collaboration Inquiry"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Custom Agent Configuration
              </Link>
            </div>
          </div>
        </section>
      </main>
</div>
  )
}
