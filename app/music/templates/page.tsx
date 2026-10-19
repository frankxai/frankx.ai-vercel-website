import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { CopyButton } from '@/components/prompt-library/CopyButton'

const PAGE_URL = 'https://frankx.ai/music/templates'

export const metadata = createMetadata({
  title: 'Free Suno Prompt Templates — 9 Starting Points | FrankX',
  description:
    'Nine free, copy-paste Suno style prompts with BPM, key, mode, and instrumentation for focus, workout, sleep, and more.',
  path: '/music/templates',
  keywords: [
    'suno prompt templates',
    'free suno prompts',
    'suno style prompts',
    'ai music prompts',
    'focus music prompt',
  ],
})

type StateTemplate = {
  id: string
  name: string
  note: string
  prompt: string
}

const templates: StateTemplate[] = [
  {
    id: 'deep-focus',
    name: 'Deep Focus',
    note: 'A restrained arrangement with soft piano, ambient pads, and minimal percussion.',
    prompt:
      'study music, 90 BPM, C Major, soft piano, ambient synth pads, minimal percussion, warm, calm and relaxed, no drums, no vocals',
  },
  {
    id: 'morning-energy',
    name: 'Morning Energy',
    note: 'Acoustic guitar, light percussion, and piano at a steady mid-tempo pace.',
    prompt:
      'uplifting acoustic pop, 115 BPM, G Major, acoustic guitar, light percussion, piano, bright and uplifting, building momentum',
  },
  {
    id: 'workout',
    name: 'Workout',
    note: 'Driving drums, bass, and synth leads for a high-energy electronic track.',
    prompt:
      'energetic electronic, 145 BPM, E Minor, driving bass, powerful drums, synth leads, powerful and driving, explosive energy',
  },
  {
    id: 'creative-flow',
    name: 'Creative Flow',
    note: 'Warm synths and soft arpeggios with a light ambient texture.',
    prompt:
      'ambient electronic, 100 BPM, D Major, warm synths, soft arpeggios, light texture, warm and comforting, gently flowing',
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    note: 'A slow acoustic arrangement built from soft guitar, piano, and strings.',
    prompt:
      'calm acoustic, 70 BPM, F Major, soft guitar, gentle piano, strings, soft and gentle, calm and relaxed, no drums',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    note: 'A sparse ambient arrangement with bowls, pads, and nature sounds.',
    prompt:
      'meditation ambient, 60 BPM, C Major, singing bowls, soft pads, nature sounds, soft and gentle, very peaceful, minimal, no drums, no bass',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    note: 'Soft piano and ambient pads without percussion or vocals.',
    prompt:
      'sleep music, 50 BPM, F Major, soft piano, ambient pads, very peaceful, minimal, extremely gentle, no percussion, no vocals',
  },
  {
    id: 'confidence',
    name: 'Confidence',
    note: 'A cinematic arrangement with brass, strings, drums, and rising dynamics.',
    prompt:
      'epic cinematic, 105 BPM, D Major, brass, strings, powerful drums, powerful and driving, building momentum',
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    note: 'A mid-tempo acoustic arrangement with guitar, piano, and soft strings.',
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
        'Nine free, copy-paste Suno style prompts with defined tempo, key, and instrumentation.',
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
    body: 'Listen to the variations and keep the one that fits your project. These prompts are creative starting points, not promises about how a track will affect a listener.',
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
            Free music resources
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Free Suno prompt templates
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-white/60">
            Nine copy-paste style prompts with a defined BPM, key, mode, and instrument palette.
            Use them as starting points, generate a few variations, and judge the results by ear.
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
                  {template.note}
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

      {/* Next step + back link */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-400/60">
              Keep creating
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
              Want more music examples?
            </h2>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/60">
              Browse the released catalog to hear how different prompts, genres, and arrangements
              turned into finished tracks.
            </p>
            <Link
              href="/music"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-400"
            >
              Browse the music catalog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-10 text-sm text-white/40">
            See the{' '}
            <Link
              href="/music-intelligence"
              className="text-white/60 transition-colors hover:text-white"
            >
              music intelligence index
            </Link>{' '}
            for the open tools and learning resources around them, or read the{' '}
            <Link href="/music/create" className="text-white/60 transition-colors hover:text-white">
              AI music creation guide
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
