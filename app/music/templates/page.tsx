import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { CopyButton } from '@/components/prompt-library/CopyButton'
import { VibeStatePicker } from '@/components/music/VibeStatePicker'

const PAGE_URL = 'https://frankx.ai/music/templates'

export const metadata = createMetadata({
  title: 'Free Suno Prompt Templates — 9 Research-Backed States | FrankX',
  description:
    'Nine free, copy-paste Suno style prompts from the Vibe OS state library. Each maps BPM, key, mode, and instrumentation to a target state — deep focus, workout, sleep, and more.',
  path: '/music/templates',
  keywords: [
    'suno prompt templates',
    'free suno prompts',
    'suno style prompts',
    'ai music prompts',
    'focus music prompt',
    'vibe os',
  ],
})

type StateTemplate = {
  id: string
  name: string
  research: string
  prompt: string
}

const templates: StateTemplate[] = [
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    research:
      'Around 90 BPM in a major key with minimal percussion keeps arousal low and valence positive — background that leaves working memory alone.',
    prompt:
      'study music, 90 BPM, C Major, soft piano, ambient synth pads, minimal percussion, warm, calm and relaxed, no drums, no vocals',
  },
  {
    id: 'morning-energy',
    name: 'Morning Energy',
    research:
      'Tempo raises arousal; a bright major key keeps the mood positive. 115 BPM is enough lift without tipping into workout intensity.',
    prompt:
      'uplifting acoustic pop, 115 BPM, G Major, acoustic guitar, light percussion, piano, bright and uplifting, building momentum',
  },
  {
    id: 'workout',
    name: 'Workout',
    research:
      'Music reliably improves exercise output and motivation, and tempo drives the effect — 145 BPM sits in the high-arousal zone the research points to.',
    prompt:
      'energetic electronic, 145 BPM, E Minor, driving bass, powerful drums, synth leads, powerful and driving, explosive energy',
  },
  {
    id: 'creative-flow',
    name: 'Creative Flow',
    research:
      'Moderate tempo and low-complexity ambient texture hold arousal mid-range without grabbing attention — the corridor where ideas connect.',
    prompt:
      'ambient electronic, 100 BPM, D Major, warm synths, soft arpeggios, light texture, warm and comforting, gently flowing',
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    research:
      'Slow tempo lowers arousal; the major key keeps it warm rather than melancholic. Soft timbre does the rest.',
    prompt:
      'calm acoustic, 70 BPM, F Major, soft guitar, gentle piano, strings, soft and gentle, calm and relaxed, no drums',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    research:
      '60 BPM sits near resting heart rate, and a sparse texture supports a slow breathing pace — the standard slow-tempo protocol in relaxation studies.',
    prompt:
      'meditation ambient, 60 BPM, C Major, singing bowls, soft pads, nature sounds, soft and gentle, very peaceful, minimal, no drums, no bass',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    research:
      'The gentlest arousal floor in the library: 50 BPM, no percussion, nothing that asks for attention on the way down.',
    prompt:
      'sleep music, 50 BPM, F Major, soft piano, ambient pads, very peaceful, minimal, extremely gentle, no percussion, no vocals',
  },
  {
    id: 'confidence',
    name: 'Confidence',
    research:
      'Rising dynamics, brass timbre, and a major key read as power and momentum — the same cues film scores use for arrival scenes.',
    prompt:
      'epic cinematic, 105 BPM, D Major, brass, strings, powerful drums, powerful and driving, building momentum',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    research:
      'Mid-tempo acoustic major sits in the positive-valence, moderate-arousal quadrant — warm timbre, balanced energy, nothing forced.',
    prompt:
      'warm acoustic folk, 85 BPM, G Major, acoustic guitar, piano, soft strings, warm and comforting, balanced energy',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Free Suno Prompt Templates',
      description:
        'Nine free, copy-paste Suno style prompts from the Vibe OS research-backed state library.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      author: {
        '@type': 'Person',
        name: 'Frank Riemer',
        url: 'https://frankx.ai',
        jobTitle: 'AI Architect',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#templates`,
      name: 'Suno prompt templates by target state',
      itemListElement: templates.map((template, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: template.name,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Music', item: 'https://frankx.ai/music' },
        { '@type': 'ListItem', position: 3, name: 'Templates', item: PAGE_URL },
      ],
    },
  ],
}

const steps = [
  {
    title: 'Copy a template',
    body: 'Pick the state you want and copy the prompt. Each one is a complete Suno style description — no editing required.',
  },
  {
    title: 'Paste into Suno custom mode',
    body: 'In Suno, switch to custom mode and paste the template into the style field. Generate a few takes; tempo and mode stay locked while the details vary.',
  },
  {
    title: 'Match the track to its job',
    body: 'Use the track for the state it was engineered for — focus music while working, the sleep template at night. The parameters only pay off in context.',
  },
]

export default function MusicTemplatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            Vibe OS State Library
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Free Suno prompt templates
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/60">
            Nine copy-paste style prompts from the{' '}
            <a
              href="https://github.com/frankxai/vibe-os"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Vibe OS
            </a>{' '}
            research-backed state library. Each template fixes the parameters that matter — BPM,
            key, mode, and instrumentation — for one target state, so the generation varies but the
            effect holds.
          </p>
        </div>
      </section>

      {/* Templates */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Which state do you need?
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <h3 className="mb-2 text-base font-semibold text-white">{template.name}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-white/60">
                  {template.research}
                </p>
                <pre className="mb-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/[0.06] bg-black/40 p-4">
                  <code className="font-mono text-xs leading-relaxed text-emerald-200/90">
                    {template.prompt}
                  </code>
                </pre>
                <div>
                  <CopyButton text={template.prompt} label="Copy prompt" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe State Picker */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
            All 25 States
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Want a state that isn&apos;t in the nine above?
          </h2>
          <p className="mb-10 max-w-xl text-base text-white/60">
            The full Vibe OS state library covers 25 targets, from morning energy to grief
            processing. Pick one below to see its BPM, key, instrumentation, and a ready-made
            Suno prompt.
          </p>
          <VibeStatePicker />
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            How do you use them?
          </h2>
          <p className="mb-10 max-w-xl text-base text-white/60">
            Three steps from template to track. For the full prompting method, read the{' '}
            <Link
              href="/guides/suno-prompt-playbook"
              className="text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Suno Prompt Playbook
            </Link>
            .
          </p>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <span className="mb-3 block font-mono text-xs text-emerald-400/70">
                  Step {index + 1}
                </span>
                <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Upsell + back link */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
              Go Further
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
              Want the full Suno Music Mastery toolkit?
            </h2>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/60">
              Vibe OS is the paid companion to these templates: prompt packs across genres, emotion
              mapping, and production checklists — the complete system behind the nine states on
              this page.
            </p>
            <Link
              href="/products/vibe-os"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-400"
            >
              Explore Vibe OS
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-10 text-sm text-white/40">
            These templates are one piece of a larger system — see the{' '}
            <Link
              href="/music-intelligence"
              className="text-white/60 transition-colors hover:text-white"
            >
              Music Intelligence System
            </Link>{' '}
            for the research, agents, and tooling around them, or browse{' '}
            <Link href="/music" className="text-white/60 transition-colors hover:text-white">
              the music catalog
            </Link>
            .{' '}
            <a
              href="https://github.com/frankxai/vibe-os"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
            >
              Vibe OS on GitHub
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
