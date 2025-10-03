import Link from 'next/link'
import { Sparkles, Zap, Brain, Eye, ArrowRight } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Agent Collective ? Creator Systems in Motion',
  description:
    'Meet the FrankX agents who help creators design operating systems, craft stories, score releases, and see the future of their practice.',
  keywords: [
    'creator ai agents',
    'creative operating system',
    'vibe os',
    'frankx agent collective',
    'ai for creators'
  ],
  path: '/agents'
})

const agents = [
  {
    id: 'starlight-architect',
    name: 'Starlight Architect',
    role: 'Creator Systems Architect',
    specialty: 'Designs automations, dashboards, and rituals that keep creators shipping.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    personality: [
      'Turns messy creative chaos into clear operating systems.',
      'Asks ?what helps you release next?? before suggesting tooling.',
      'Keeps the stack lightweight, flexible, and artist-friendly.',
      'Measures progress with momentum, not corporate KPIs.'
    ],
    tools: {
      primary: 'Workflow architecture, automation design, analytics instrumentation',
      secondary: 'Notion, Supabase, Next.js, n8n/Zapier',
      soul_alignment: 'Systems that protect and amplify creative flow'
    },
    activation: 'Activate Starlight Architect for creator system design',
    examples: [
      'Map a creator?s weekly release ritual with automations and prompts.',
      'Build an analytics dashboard that shows what content resonates.',
      'Wire CallToAction + trackEvent instrumentation for new funnels.'
    ]
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    role: 'Vibe OS Storyteller & Sonic Guide',
    specialty: 'Shapes Suno-powered sessions and music rituals for releases and focus.',
    icon: Zap,
    color: 'from-purple-500 to-pink-400',
    personality: [
      'Speaks in rhythm, imagery, and emotion.',
      'Translates creative intent into precise Suno prompts.',
      'Designs playlists and rituals that move audiences.',
      'Keeps every sonic asset aligned with the FrankX sound.'
    ],
    tools: {
      primary: 'Suno AI, audio editing, session scripting',
      secondary: 'DAW workflows, distribution tactics, sound design',
      soul_alignment: 'Music as a catalyst for courage and momentum'
    },
    activation: 'Channel Frequency Alchemist for music creation',
    examples: [
      'Produce a Suno session pack for an upcoming drop.',
      'Write liner notes that invite fans into the ritual.',
      'Design focus soundscapes for the Creator Lab cohort.'
    ]
  },
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    role: 'Story & Launch Architect',
    specialty: 'Crafts essays, funnels, and campaigns that convert curiosity into action.',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-400',
    personality: [
      'Writes like Frank is in the room with you.',
      'Connects every story to a tangible creator outcome.',
      'Builds multi-format campaigns without losing authenticity.',
      'Keeps metrics and magic in the same sentence.'
    ],
    tools: {
      primary: 'Longform storytelling, landing pages, email arcs',
      secondary: 'Social scripts, product launches, community prompts',
      soul_alignment: 'Narratives that unlock creative bravery'
    },
    activation: 'Engage Creation Engine for content development',
    examples: [
      'Write the launch page for a new toolkit or session bundle.',
      'Draft Creation Chronicles essays with CTA flow.',
      'Script onboarding emails for Creator Lab OS.'
    ]
  },
  {
    id: 'luminor-oracle',
    name: 'Luminor Oracle',
    role: 'Future-Sighted Strategist',
    specialty: 'Looks from 2124 back to now to guide creator decisions.',
    icon: Eye,
    color: 'from-amber-500 to-orange-400',
    personality: [
      'Sees patterns across releases, platforms, and culture.',
      'Frames choices as timelines, not isolated tasks.',
      'Keeps creators grounded while dreaming boldly.',
      'Checks every plan against the Creator-First blueprint.'
    ],
    tools: {
      primary: 'Scenario design, strategic mapping, ritual planning',
      secondary: 'Signal scanning, opportunity analysis, retrospectives',
      soul_alignment: 'Decisions that protect future creative freedom'
    },
    activation: 'Consult Luminor Oracle for strategic guidance',
    examples: [
      'Map a season-long release calendar with checkpoints.',
      'Stress-test a new offer against future creator needs.',
      'Create reflection prompts for Inner Circle members.'
    ]
  }
]

const collaborationFlows = [
  {
    title: 'Album or Session Drop',
    flow: 'Frequency Alchemist ? Creation Engine ? Starlight Architect ? Luminor Oracle',
    description: 'Craft the sonic experience, tell the story, automate the release ritual, then future-proof the follow-up.'
  },
  {
    title: 'Creator Lab Build',
    flow: 'Starlight Architect ? Creation Engine ? Luminor Oracle ? Frequency Alchemist',
    description: 'Design the operating system, wrap it in narrative, map the long game, and anchor it with music rituals.'
  },
  {
    title: 'Storyworld Expansion',
    flow: 'Creation Engine ? Luminor Oracle ? Starlight Architect ? Frequency Alchemist',
    description: 'Write the mythos, plan the arc, automate the touchpoints, and soundscape the experience.'
  }
]

const principles = [
  {
    title: 'Creator Outcome First',
    description: 'Every collaboration starts with the release, ritual, or revenue moment we want to unlock.'
  },
  {
    title: 'Lightweight Systems',
    description: 'We build with reusable primitives so creators spend time creating, not managing dashboards.'
  },
  {
    title: 'Studio-Grade Craft',
    description: 'Experiences must feel cinematic, considered, and alive?never templated to boredom.'
  },
  {
    title: 'Document the Why',
    description: 'We capture decisions in pods and strategy docs so momentum compounds with each hand-off.'
  }
]

export default function AgentsPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-20">
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-slate-900 to-slate-950" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              FrankX Agent Collective
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Creative Intelligence, Orchestrated for Makers
            </h1>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              Four agents move in sync to help you design systems, craft stories, score releases, and navigate the future of your practice. Pick the agent you need?or bring them together for your next drop.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/products/creative-ai-toolkit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-purple-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1"
              >
                Explore the Toolkit
              </Link>
              <Link
                href="/realm"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Join the Realm Waitlist
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pt-10">
          <div className="mx-auto max-w-6xl space-y-12">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-950 to-slate-950 p-8 md:grid-cols-[280px,1fr]"
              >
                <div className="space-y-6">
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${agent.color} p-6`}>
                    <agent.icon className="h-10 w-10 text-white" />
                    <h2 className="mt-4 text-xl font-semibold text-white">{agent.name}</h2>
                    <p className="text-sm text-white/75">{agent.role}</p>
                    <p className="mt-3 text-sm text-white/70">{agent.specialty}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Activation Command</h3>
                    <code className="mt-2 block text-xs font-mono text-primary-200 bg-slate-900/50 px-3 py-2 rounded">
                      "{agent.activation}"
                    </code>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Personality</h3>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {agent.personality.map((trait, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Core Tools</h3>
                    <div className="mt-2 space-y-1 text-sm text-white/70">
                      <p><strong className="text-white/80">Primary:</strong> {agent.tools.primary}</p>
                      <p><strong className="text-white/80">Secondary:</strong> {agent.tools.secondary}</p>
                      <p><strong className="text-primary-200">Soul Alignment:</strong> {agent.tools.soul_alignment}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Example Sessions</h3>
                    <ul className="mt-2 space-y-2 text-sm text-white/70">
                      {agent.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight className="mt-0.5 h-3 w-3 text-primary-400 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-white">How the Agents Collaborate</h2>
              <p className="mt-4 text-white/70">
                Each project calls a different formation. These are the flows we run most often for creators stepping into the lab.
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
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold text-white">Operating Principles</h2>
            <p className="mt-4 text-center text-white/70">
              These rules keep the collective anchored in the creator-first strategy.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary-500/10 via-slate-900 to-slate-950 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Bring the Collective Into Your Studio</h3>
            <p className="mt-4 text-white/70">
              Whether you need a new operating system, a ritual soundtrack, or a story that moves people, the FrankX agents stand ready. Start with a toolkit, join the Realm, or tap the lab for a residency.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products/creative-ai-toolkit"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
              >
                <Sparkles className="h-4 w-4" />
                Grab the Toolkit
              </Link>
              <Link
                href="/products/agentic-creator-os"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Meet the Creator Lab
              </Link>
              <Link
                href="/realm"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Enter the Realm
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
